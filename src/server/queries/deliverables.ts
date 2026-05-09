import { and, asc, desc, eq } from "drizzle-orm";
import { getDb, hasDatabaseUrl } from "@/db/client";
import {
  courseDeliverableRequirements,
  courses,
  deliverableFiles,
  deliverableLinks,
  deliverableVersions,
  deliverables,
  profiles,
  studentProjects,
} from "@/db/schema";
import type {
  DeliverableInput,
  DeliverableLinkInput,
  DeliverableRequirementInput,
} from "@/lib/validations/deliverables";
import { DeliverableService } from "@/server/services/deliverable-service";
import { StorageService } from "@/server/services/storage-service";
import type {
  AdminDeliverable,
  Deliverable,
  DeliverableCourseSummary,
  DeliverableDetail,
  DeliverableFile,
  DeliverableFilters,
  DeliverableLink,
  DeliverableProjectSummary,
  DeliverableRequirement,
  DeliverableStudentSummary,
  DeliverableVersion,
} from "@/types/deliverables";

type DeliverableRow = typeof deliverables.$inferSelect;
type DeliverableFileRow = typeof deliverableFiles.$inferSelect;
type DeliverableLinkRow = typeof deliverableLinks.$inferSelect;
type DeliverableVersionRow = typeof deliverableVersions.$inferSelect;
type RequirementRow = typeof courseDeliverableRequirements.$inferSelect;
type ProfileRow = typeof profiles.$inferSelect;
type ProjectRow = typeof studentProjects.$inferSelect;
type CourseRow = typeof courses.$inferSelect;

function toIso(value: Date | null) {
  return value ? value.toISOString() : null;
}

function emptyToNull(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function mapDeliverable(row: DeliverableRow): Deliverable {
  return {
    id: row.id,
    projectId: row.projectId,
    courseId: row.courseId,
    studentId: row.studentId,
    title: row.title,
    description: row.description,
    instructionsSnapshot: row.instructionsSnapshot,
    status: row.status,
    version: row.version,
    submittedAt: toIso(row.submittedAt),
    lastResubmittedAt: toIso(row.lastResubmittedAt),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

async function mapFile(row: DeliverableFileRow): Promise<DeliverableFile> {
  return {
    id: row.id,
    deliverableId: row.deliverableId,
    uploadedBy: row.uploadedBy,
    fileName: row.fileName,
    filePath: row.filePath,
    fileUrl: row.fileUrl,
    fileType: row.fileType,
    mimeType: row.mimeType,
    sizeBytes: row.sizeBytes,
    signedUrl: await StorageService.createSignedUrl(row.filePath),
    createdAt: row.createdAt.toISOString(),
  };
}

function mapLink(row: DeliverableLinkRow): DeliverableLink {
  return {
    id: row.id,
    deliverableId: row.deliverableId,
    title: row.title,
    url: row.url,
    description: row.description,
    createdAt: row.createdAt.toISOString(),
  };
}

function mapVersion(row: DeliverableVersionRow): DeliverableVersion {
  return {
    id: row.id,
    deliverableId: row.deliverableId,
    version: row.version,
    title: row.title,
    description: row.description,
    status: row.status,
    snapshot: row.snapshot,
    createdAt: row.createdAt.toISOString(),
  };
}

function mapRequirement(row: RequirementRow | null): DeliverableRequirement | null {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    courseId: row.courseId,
    title: row.title,
    description: row.description,
    instructions: row.instructions,
    requiredFileTypes: row.requiredFileTypes,
    maxFiles: row.maxFiles,
    isRequired: row.isRequired,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function mapStudent(row: ProfileRow | null | undefined): DeliverableStudentSummary | null {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    fullName: row.fullName,
    email: row.email,
  };
}

function mapProject(row: ProjectRow | null | undefined): DeliverableProjectSummary | null {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
  };
}

function mapCourse(row: CourseRow | null | undefined): DeliverableCourseSummary | null {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
  };
}

async function findProfileById(profileId: string) {
  const db = getDb();
  const [row] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, profileId))
    .limit(1);

  return row ?? null;
}

async function findProjectById(projectId: string) {
  const db = getDb();
  const [row] = await db
    .select()
    .from(studentProjects)
    .where(eq(studentProjects.id, projectId))
    .limit(1);

  return row ?? null;
}

async function findCourseById(courseId: string) {
  const db = getDb();
  const [row] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1);

  return row ?? null;
}

export async function getDeliverableRequirementByCourseId(courseId: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const db = getDb();
  const [row] = await db
    .select()
    .from(courseDeliverableRequirements)
    .where(eq(courseDeliverableRequirements.courseId, courseId))
    .limit(1);

  return mapRequirement(row ?? null);
}

async function getDeliverableFilesById(deliverableId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(deliverableFiles)
    .where(eq(deliverableFiles.deliverableId, deliverableId))
    .orderBy(asc(deliverableFiles.createdAt));

  return Promise.all(rows.map(mapFile));
}

async function getDeliverableLinksById(deliverableId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(deliverableLinks)
    .where(eq(deliverableLinks.deliverableId, deliverableId))
    .orderBy(asc(deliverableLinks.createdAt));

  return rows.map(mapLink);
}

async function getDeliverableVersionsById(deliverableId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(deliverableVersions)
    .where(eq(deliverableVersions.deliverableId, deliverableId))
    .orderBy(desc(deliverableVersions.version));

  return rows.map(mapVersion);
}

async function hydrateDeliverable(row: DeliverableRow): Promise<DeliverableDetail> {
  const [files, links, versions, requirement, project, course] =
    await Promise.all([
      getDeliverableFilesById(row.id),
      getDeliverableLinksById(row.id),
      getDeliverableVersionsById(row.id),
      getDeliverableRequirementByCourseId(row.courseId),
      findProjectById(row.projectId),
      findCourseById(row.courseId),
    ]);

  return {
    ...mapDeliverable(row),
    files,
    links,
    versions,
    requirement,
    project: mapProject(project),
    course: mapCourse(course),
  };
}

export async function getDeliverableWithFiles(deliverableId: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const db = getDb();
  const [row] = await db
    .select()
    .from(deliverables)
    .where(eq(deliverables.id, deliverableId))
    .limit(1);

  return row ? hydrateDeliverable(row) : null;
}

export async function getStudentDeliverableById(
  deliverableId: string,
  studentId: string,
) {
  const deliverable = await getDeliverableWithFiles(deliverableId);

  if (!deliverable || deliverable.studentId !== studentId) {
    return null;
  }

  return deliverable;
}

export async function getAdminDeliverableById(deliverableId: string) {
  const deliverable = await getDeliverableWithFiles(deliverableId);

  if (!deliverable) {
    return null;
  }

  return {
    ...deliverable,
    student: mapStudent(await findProfileById(deliverable.studentId)),
  };
}

export async function getStudentDeliverables(studentId: string) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(deliverables)
    .where(eq(deliverables.studentId, studentId))
    .orderBy(desc(deliverables.updatedAt));

  return Promise.all(rows.map(hydrateDeliverable));
}

export async function getStudentCourseDeliverable(
  studentId: string,
  courseId: string,
) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const db = getDb();
  const [row] = await db
    .select()
    .from(deliverables)
    .where(
      and(
        eq(deliverables.studentId, studentId),
        eq(deliverables.courseId, courseId),
      ),
    )
    .orderBy(desc(deliverables.updatedAt))
    .limit(1);

  if (!row) {
    return null;
  }

  return hydrateDeliverable(row);
}

export async function getProjectDeliverables(projectId: string) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(deliverables)
    .where(eq(deliverables.projectId, projectId))
    .orderBy(desc(deliverables.updatedAt));

  return Promise.all(rows.map(hydrateDeliverable));
}

function filterAdminDeliverables(
  items: AdminDeliverable[],
  filters?: DeliverableFilters,
) {
  const search = filters?.search?.trim().toLowerCase();
  const status = filters?.status;
  const courseId = filters?.courseId;

  return items.filter((item) => {
    const matchesSearch = search
      ? [
          item.title,
          item.description,
          item.student?.fullName,
          item.student?.email,
          item.project?.name,
          item.course?.title,
        ]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(search))
      : true;
    const matchesStatus =
      status && status !== "all" ? item.status === status : true;
    const matchesCourse =
      courseId && courseId !== "all" ? item.courseId === courseId : true;

    return matchesSearch && matchesStatus && matchesCourse;
  });
}

async function toAdminDeliverable(row: DeliverableRow): Promise<AdminDeliverable> {
  const [student, project, course, files, links] = await Promise.all([
    findProfileById(row.studentId),
    findProjectById(row.projectId),
    findCourseById(row.courseId),
    getDeliverableFilesById(row.id),
    getDeliverableLinksById(row.id),
  ]);

  return {
    ...mapDeliverable(row),
    student: mapStudent(student),
    project: mapProject(project),
    course: mapCourse(course),
    filesCount: files.length,
    linksCount: links.length,
  };
}

export async function getAdminDeliverables(filters?: DeliverableFilters) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(deliverables)
    .orderBy(desc(deliverables.updatedAt));
  const hydrated = await Promise.all(rows.map(toAdminDeliverable));

  return filterAdminDeliverables(hydrated, filters);
}

export async function getDeliverablesByCourse(courseId: string) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(deliverables)
    .where(eq(deliverables.courseId, courseId))
    .orderBy(desc(deliverables.updatedAt));

  return Promise.all(rows.map(toAdminDeliverable));
}

export async function getPendingDeliverablesForAdmin() {
  const items = await getAdminDeliverables();

  return items.filter((item) =>
    ["submitted", "resubmitted", "under_review"].includes(item.status),
  );
}

export async function insertDeliverableDraft(
  studentId: string,
  input: DeliverableInput,
) {
  const db = getDb();
  const requirement = await getDeliverableRequirementByCourseId(input.courseId);
  const [row] = await db
    .insert(deliverables)
    .values({
      projectId: input.projectId,
      courseId: input.courseId,
      studentId,
      title: input.title,
      description: input.description,
      instructionsSnapshot: requirement?.instructions ?? null,
      status: "draft",
      version: 1,
      updatedAt: new Date(),
    })
    .returning();

  return hydrateDeliverable(row);
}

export async function updateDeliverableDraftById(
  deliverableId: string,
  input: DeliverableInput,
) {
  const db = getDb();
  const requirement = await getDeliverableRequirementByCourseId(input.courseId);
  const [row] = await db
    .update(deliverables)
    .set({
      projectId: input.projectId,
      courseId: input.courseId,
      title: input.title,
      description: input.description,
      instructionsSnapshot: requirement?.instructions ?? null,
      updatedAt: new Date(),
    })
    .where(eq(deliverables.id, deliverableId))
    .returning();

  return row ? hydrateDeliverable(row) : null;
}

export async function submitDeliverableById(deliverableId: string) {
  const current = await getDeliverableWithFiles(deliverableId);

  if (!current) {
    return null;
  }

  const now = new Date();
  const nextVersion = DeliverableService.shouldIncrementVersion(current.status)
    ? current.version + 1
    : current.version;
  const nextStatus = DeliverableService.nextSubmittedStatus(current.status);
  const db = getDb();
  const [row] = await db
    .update(deliverables)
    .set({
      status: nextStatus,
      version: nextVersion,
      submittedAt: current.submittedAt ? new Date(current.submittedAt) : now,
      lastResubmittedAt: nextStatus === "resubmitted" ? now : current.lastResubmittedAt ? new Date(current.lastResubmittedAt) : null,
      updatedAt: now,
    })
    .where(eq(deliverables.id, deliverableId))
    .returning();

  if (!row) {
    return null;
  }

  const updated = await hydrateDeliverable(row);
  await db.insert(deliverableVersions).values({
    deliverableId,
    version: updated.version,
    title: updated.title,
    description: updated.description,
    status: updated.status,
    snapshot: DeliverableService.buildVersionSnapshot(updated),
  });

  return getDeliverableWithFiles(deliverableId);
}

export async function insertDeliverableFile(input: {
  deliverableId: string;
  uploadedBy: string;
  fileName: string;
  filePath: string;
  fileUrl?: string | null;
  mimeType: string;
  sizeBytes: number;
}) {
  const db = getDb();
  const [row] = await db
    .insert(deliverableFiles)
    .values({
      deliverableId: input.deliverableId,
      uploadedBy: input.uploadedBy,
      fileName: input.fileName,
      filePath: input.filePath,
      fileUrl: input.fileUrl ?? null,
      fileType: DeliverableService.inferFileType(
        input.fileName,
        input.mimeType,
      ),
      mimeType: input.mimeType,
      sizeBytes: input.sizeBytes,
    })
    .returning();

  return mapFile(row);
}

export async function findDeliverableFileById(fileId: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const db = getDb();
  const [row] = await db
    .select()
    .from(deliverableFiles)
    .where(eq(deliverableFiles.id, fileId))
    .limit(1);

  return row ? mapFile(row) : null;
}

export async function deleteDeliverableFileById(fileId: string) {
  const db = getDb();
  await db.delete(deliverableFiles).where(eq(deliverableFiles.id, fileId));
}

export async function insertDeliverableLink(
  deliverableId: string,
  input: DeliverableLinkInput,
) {
  const db = getDb();
  const [row] = await db
    .insert(deliverableLinks)
    .values({
      deliverableId,
      title: input.title,
      url: input.url,
      description: emptyToNull(input.description),
    })
    .returning();

  return mapLink(row);
}

export async function deleteDeliverableLinkById(linkId: string) {
  const db = getDb();
  await db.delete(deliverableLinks).where(eq(deliverableLinks.id, linkId));
}

export async function upsertDeliverableRequirement(
  input: DeliverableRequirementInput,
) {
  const db = getDb();
  const [row] = await db
    .insert(courseDeliverableRequirements)
    .values({
      courseId: input.courseId,
      title: input.title,
      description: emptyToNull(input.description),
      instructions: input.instructions,
      requiredFileTypes: input.requiredFileTypes,
      maxFiles: input.maxFiles,
      isRequired: input.isRequired,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: courseDeliverableRequirements.courseId,
      set: {
        title: input.title,
        description: emptyToNull(input.description),
        instructions: input.instructions,
        requiredFileTypes: input.requiredFileTypes,
        maxFiles: input.maxFiles,
        isRequired: input.isRequired,
        updatedAt: new Date(),
      },
    })
    .returning();

  return mapRequirement(row);
}
