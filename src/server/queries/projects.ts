import { asc, desc, eq } from "drizzle-orm";
import { getDb, hasDatabaseUrl } from "@/db/client";
import { profiles, studentOnboarding, studentProjects } from "@/db/schema";
import type {
  OnboardingInput,
  StudentProjectInput,
} from "@/lib/validations/projects";
import { StudentProjectService } from "@/server/services/student-project-service";
import type {
  AdminStudentProject,
  ProjectFilters,
  ProjectStudentSummary,
  StudentOnboarding,
  StudentProject,
} from "@/types/projects";

type OnboardingRow = typeof studentOnboarding.$inferSelect;
type ProjectRow = typeof studentProjects.$inferSelect;
type ProfileRow = typeof profiles.$inferSelect;

function toIso(value: Date) {
  return value.toISOString();
}

function emptyToNull(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function mapOnboarding(row: OnboardingRow): StudentOnboarding {
  return {
    id: row.id,
    studentId: row.studentId,
    userType: row.userType,
    experienceLevel: row.experienceLevel,
    mainGoal: row.mainGoal,
    businessArea: row.businessArea,
    projectStage: row.projectStage,
    biggestChallenge: row.biggestChallenge,
    motivation: row.motivation,
    completedAt: toIso(row.completedAt),
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
  };
}

function mapProject(row: ProjectRow): StudentProject {
  return {
    id: row.id,
    studentId: row.studentId,
    name: row.name,
    slug: row.slug,
    description: row.description,
    problem: row.problem,
    solution: row.solution,
    targetAudience: row.targetAudience,
    currentStage: row.currentStage,
    businessArea: row.businessArea,
    socialImpact: row.socialImpact,
    status: row.status,
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
  };
}

function mapStudent(row: ProfileRow | null | undefined): ProjectStudentSummary | null {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    fullName: row.fullName,
    email: row.email,
  };
}

function filterAdminProjects(
  projects: AdminStudentProject[],
  filters?: ProjectFilters,
) {
  const search = filters?.search?.trim().toLowerCase();
  const status = filters?.status;
  const stage = filters?.stage;

  return projects.filter((project) => {
    const matchesSearch = search
      ? [
          project.name,
          project.description,
          project.student?.fullName,
          project.student?.email,
        ]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(search))
      : true;
    const matchesStatus =
      status && status !== "all" ? project.status === status : true;
    const matchesStage =
      stage && stage !== "all" ? project.currentStage === stage : true;

    return matchesSearch && matchesStatus && matchesStage;
  });
}

async function findProfileById(profileId: string) {
  const db = getDb();
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, profileId))
    .limit(1);

  return profile ?? null;
}

async function resolveProjectSlug(
  studentId: string,
  name: string,
  currentProjectId?: string,
) {
  const db = getDb();
  const base = StudentProjectService.resolveSlug(name);
  const rows = await db
    .select()
    .from(studentProjects)
    .where(eq(studentProjects.studentId, studentId));
  const used = new Map(rows.map((row) => [row.slug, row.id]));

  if (!used.has(base) || used.get(base) === currentProjectId) {
    return base;
  }

  for (let index = 2; index < 100; index += 1) {
    const slug = `${base}-${index}`;
    if (!used.has(slug) || used.get(slug) === currentProjectId) {
      return slug;
    }
  }

  return `${base}-${Date.now()}`;
}

export async function findStudentOnboarding(studentId: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const db = getDb();
  const [row] = await db
    .select()
    .from(studentOnboarding)
    .where(eq(studentOnboarding.studentId, studentId))
    .limit(1);

  return row ? mapOnboarding(row) : null;
}

export async function upsertStudentOnboardingByStudentId(
  studentId: string,
  input: OnboardingInput,
) {
  const db = getDb();
  const now = new Date();
  const [row] = await db
    .insert(studentOnboarding)
    .values({
      studentId,
      userType: input.userType,
      experienceLevel: input.experienceLevel,
      mainGoal: input.mainGoal,
      businessArea: input.businessArea,
      projectStage: input.projectStage,
      biggestChallenge: emptyToNull(input.biggestChallenge),
      motivation: emptyToNull(input.motivation),
      completedAt: now,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: studentOnboarding.studentId,
      set: {
        userType: input.userType,
        experienceLevel: input.experienceLevel,
        mainGoal: input.mainGoal,
        businessArea: input.businessArea,
        projectStage: input.projectStage,
        biggestChallenge: emptyToNull(input.biggestChallenge),
        motivation: emptyToNull(input.motivation),
        completedAt: now,
        updatedAt: now,
      },
    })
    .returning();

  return mapOnboarding(row);
}

export async function findCurrentStudentProject(studentId: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(studentProjects)
    .where(eq(studentProjects.studentId, studentId))
    .orderBy(asc(studentProjects.createdAt));

  const current =
    rows.find((row) => ["active", "draft", "paused"].includes(row.status)) ??
    rows[0];

  return current ? mapProject(current) : null;
}

export async function insertStudentProject(
  studentId: string,
  input: StudentProjectInput,
) {
  const db = getDb();
  const [project] = await db
    .insert(studentProjects)
    .values({
      studentId,
      name: input.name,
      slug: await resolveProjectSlug(studentId, input.name),
      description: input.description,
      problem: input.problem,
      solution: emptyToNull(input.solution),
      targetAudience: input.targetAudience,
      currentStage: input.currentStage,
      businessArea: input.businessArea,
      socialImpact: emptyToNull(input.socialImpact),
      status: "active",
      updatedAt: new Date(),
    })
    .returning();

  return mapProject(project);
}

export async function upsertPrimaryStudentProject(
  studentId: string,
  input: StudentProjectInput,
) {
  const current = await findCurrentStudentProject(studentId);

  if (current && current.status !== "archived") {
    return updateStudentProjectById(current.id, studentId, input);
  }

  return insertStudentProject(studentId, input);
}

export async function updateStudentProjectById(
  projectId: string,
  studentId: string,
  input: StudentProjectInput,
) {
  const db = getDb();
  const [project] = await db
    .update(studentProjects)
    .set({
      name: input.name,
      slug: await resolveProjectSlug(studentId, input.name, projectId),
      description: input.description,
      problem: input.problem,
      solution: emptyToNull(input.solution),
      targetAudience: input.targetAudience,
      currentStage: input.currentStage,
      businessArea: input.businessArea,
      socialImpact: emptyToNull(input.socialImpact),
      status: "active",
      updatedAt: new Date(),
    })
    .where(eq(studentProjects.id, projectId))
    .returning();

  return project ? mapProject(project) : null;
}

export async function findStudentProjectById(projectId: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const db = getDb();
  const [row] = await db
    .select()
    .from(studentProjects)
    .where(eq(studentProjects.id, projectId))
    .limit(1);

  return row ? mapProject(row) : null;
}

export async function getAdminStudentProjectsByFilters(
  filters?: ProjectFilters,
) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(studentProjects)
    .orderBy(desc(studentProjects.updatedAt));

  const projects = await Promise.all(
    rows.map(async (row) => ({
      ...mapProject(row),
      student: mapStudent(await findProfileById(row.studentId)),
    })),
  );

  return filterAdminProjects(projects, filters);
}

export async function getAdminStudentProjectById(projectId: string) {
  const project = await findStudentProjectById(projectId);

  if (!project) {
    return null;
  }

  return {
    ...project,
    student: mapStudent(await findProfileById(project.studentId)),
  } satisfies AdminStudentProject;
}

export async function archiveStudentProjectById(projectId: string) {
  const db = getDb();
  await db
    .update(studentProjects)
    .set({
      status: "archived",
      updatedAt: new Date(),
    })
    .where(eq(studentProjects.id, projectId));
}

