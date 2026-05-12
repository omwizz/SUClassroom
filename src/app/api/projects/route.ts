import { revalidatePath } from "next/cache";
import {
  BUSINESS_AREAS,
  PROJECT_STAGES,
  PROJECT_STATUSES,
  type BusinessArea,
  type ProjectStage,
  type ProjectStatus,
} from "@/constants/projects";
import { hasDatabaseUrl } from "@/db/client";
import { studentProjectSchema } from "@/lib/validations/projects";
import { requireApiProfile } from "@/server/api/auth";
import { apiError, apiSuccess, readJsonBody } from "@/server/api/responses";
import {
  findCurrentStudentProject,
  getAdminStudentProjectsByFilters,
  upsertPrimaryStudentProject,
} from "@/server/queries/projects";

function asRecord(value: unknown) {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function resolveStage(value: unknown): ProjectStage {
  return PROJECT_STAGES.includes(value as ProjectStage)
    ? (value as ProjectStage)
    : "idea";
}

function resolveStatus(value: unknown): ProjectStatus | "all" | undefined {
  if (!value) {
    return undefined;
  }

  if (value === "all" || PROJECT_STATUSES.includes(value as ProjectStatus)) {
    return value as ProjectStatus | "all";
  }

  return undefined;
}

function resolveStageFilter(value: unknown): ProjectStage | "all" | undefined {
  if (!value) {
    return undefined;
  }

  if (value === "all" || PROJECT_STAGES.includes(value as ProjectStage)) {
    return value as ProjectStage | "all";
  }

  return undefined;
}

function resolveBusinessArea(value: unknown): BusinessArea {
  return BUSINESS_AREAS.includes(value as BusinessArea)
    ? (value as BusinessArea)
    : "other";
}

function normalizeProjectBody(body: Record<string, unknown>) {
  const title = asString(body.name) || asString(body.title);
  const description = asString(body.description);

  return {
    name: title,
    description,
    problem: asString(body.problem) || description || title,
    solution: asString(body.solution),
    targetAudience:
      asString(body.targetAudience) ||
      asString(body.audience) ||
      "Publico objetivo por definir",
    currentStage: resolveStage(body.currentStage || body.stage),
    businessArea: resolveBusinessArea(body.businessArea || body.area),
    socialImpact: asString(body.socialImpact),
  };
}

function revalidateProjectSurfaces(projectId?: string) {
  revalidatePath("/onboarding");
  revalidatePath("/dashboard/student");
  revalidatePath("/dashboard/student/project");
  revalidatePath("/dashboard/student/project/edit");
  revalidatePath("/dashboard/admin/projects");

  if (projectId) {
    revalidatePath(`/dashboard/admin/projects/${projectId}`);
  }
}

export async function GET(request: Request) {
  const auth = await requireApiProfile(request, ["student", "admin"]);

  if (!auth.ok) {
    return apiError(auth.message, { status: auth.status });
  }

  if (!hasDatabaseUrl()) {
    return apiError("DATABASE_URL no esta configurado.", { status: 503 });
  }

  if (auth.profile.activeRole === "admin") {
    const { searchParams } = new URL(request.url);
    const projects = await getAdminStudentProjectsByFilters({
      search: searchParams.get("search") ?? undefined,
      status: resolveStatus(searchParams.get("status")),
      stage: resolveStageFilter(searchParams.get("stage")),
    });

    return apiSuccess(projects);
  }

  return apiSuccess(await findCurrentStudentProject(auth.profile.id));
}

export async function POST(request: Request) {
  const auth = await requireApiProfile(request, ["student"]);

  if (!auth.ok) {
    return apiError(auth.message, { status: auth.status });
  }

  if (!hasDatabaseUrl()) {
    return apiError("DATABASE_URL no esta configurado.", { status: 503 });
  }

  const body = asRecord(await readJsonBody(request));

  if (!body) {
    return apiError("Envia un cuerpo JSON valido.", { status: 400 });
  }

  const parsed = studentProjectSchema.safeParse(normalizeProjectBody(body));

  if (!parsed.success) {
    return apiError("Revisa los campos del proyecto.", {
      details: parsed.error.flatten().fieldErrors,
      status: 400,
    });
  }

  const project = await upsertPrimaryStudentProject(
    auth.profile.id,
    parsed.data,
  );

  if (!project) {
    return apiError("No se pudo sincronizar el proyecto.", { status: 500 });
  }

  revalidateProjectSurfaces(project.id);

  return apiSuccess(project, {
    message: "Proyecto sincronizado.",
    status: 201,
  });
}
