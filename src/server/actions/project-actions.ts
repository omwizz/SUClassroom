"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { hasDatabaseUrl } from "@/db/client";
import {
  onboardingSchema,
  onboardingWizardSchema,
  studentProjectSchema,
  type OnboardingInput,
  type OnboardingWizardInput,
  type StudentProjectInput,
} from "@/lib/validations/projects";
import { getCurrentProfile } from "@/server/actions/auth-actions";
import {
  archiveStudentProjectById,
  findCurrentStudentProject,
  findStudentOnboarding,
  findStudentProjectById,
  getAdminStudentProjectById,
  getAdminStudentProjectsByFilters,
  insertStudentProject,
  updateStudentProjectById,
  upsertPrimaryStudentProject,
  upsertStudentOnboardingByStudentId,
} from "@/server/queries/projects";
import type { ProjectFilters, ProjectActionState } from "@/types/projects";

const uuidSchema = z.uuid();

function validationError(error: z.ZodError): ProjectActionState {
  return {
    ok: false,
    message: "Revisa los campos marcados.",
    fieldErrors: error.flatten().fieldErrors,
  };
}

function databaseMissing(): ProjectActionState {
  return {
    ok: false,
    message:
      "DATABASE_URL no esta configurado. La fase queda preparada, pero las mutaciones requieren base de datos.",
  };
}

function actionError(error: unknown): ProjectActionState {
  return {
    ok: false,
    message:
      error instanceof Error
        ? error.message
        : "No se pudo completar la accion.",
  };
}

async function requireStudentAction() {
  const profile = await getCurrentProfile();

  if (!profile) {
    return {
      profile: null,
      error: {
        ok: false,
        message: "Inicia sesion para gestionar tu proyecto.",
        redirectTo: "/login",
      } satisfies ProjectActionState,
    };
  }

  if (profile.activeRole !== "student" && profile.activeRole !== "admin") {
    return {
      profile: null,
      error: {
        ok: false,
        message: "Tu rol actual no puede gestionar proyectos de alumno.",
      } satisfies ProjectActionState,
    };
  }

  return { profile, error: null };
}

async function requireAdminAction() {
  const profile = await getCurrentProfile();

  if (!profile) {
    return {
      profile: null,
      error: {
        ok: false,
        message: "Inicia sesion para administrar proyectos.",
        redirectTo: "/login",
      } satisfies ProjectActionState,
    };
  }

  if (profile.activeRole !== "admin") {
    return {
      profile: null,
      error: {
        ok: false,
        message: "No tienes permisos para administrar proyectos.",
      } satisfies ProjectActionState,
    };
  }

  return { profile, error: null };
}

async function guardStudentMutation() {
  const auth = await requireStudentAction();

  if (auth.error) {
    return auth;
  }

  if (!hasDatabaseUrl()) {
    return { profile: null, error: databaseMissing() };
  }

  return auth;
}

async function guardAdminMutation() {
  const auth = await requireAdminAction();

  if (auth.error) {
    return auth;
  }

  if (!hasDatabaseUrl()) {
    return { profile: null, error: databaseMissing() };
  }

  return auth;
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

export async function getStudentOnboarding() {
  const auth = await requireStudentAction();

  if (auth.error) {
    return null;
  }

  return findStudentOnboarding(auth.profile.id);
}

export async function completeStudentOnboarding(
  input: OnboardingWizardInput,
): Promise<ProjectActionState> {
  const parsed = onboardingWizardSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardStudentMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    await upsertStudentOnboardingByStudentId(
      guard.profile.id,
      parsed.data.onboarding,
    );
    const project = await upsertPrimaryStudentProject(
      guard.profile.id,
      parsed.data.project,
    );
    revalidateProjectSurfaces(project?.id);
    return {
      ok: true,
      message: "Onboarding completado. Tu proyecto inicial quedo registrado.",
      entityId: project?.id,
      slug: project?.slug,
      redirectTo: "/dashboard/student",
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateStudentOnboarding(
  input: OnboardingInput,
): Promise<ProjectActionState> {
  const parsed = onboardingSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardStudentMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    const onboarding = await upsertStudentOnboardingByStudentId(
      guard.profile.id,
      parsed.data,
    );
    revalidateProjectSurfaces();
    return {
      ok: true,
      message: "Diagnostico actualizado.",
      entityId: onboarding.id,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function isOnboardingCompleted() {
  const onboarding = await getStudentOnboarding();

  return Boolean(onboarding?.completedAt);
}

export async function createStudentProject(
  input: StudentProjectInput,
): Promise<ProjectActionState> {
  const parsed = studentProjectSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardStudentMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    const current = await findCurrentStudentProject(guard.profile.id);

    if (current && current.status !== "archived") {
      return {
        ok: false,
        message:
          "Ya tienes un proyecto activo. Usa la edicion para actualizarlo.",
        entityId: current.id,
      };
    }

    const project = await insertStudentProject(guard.profile.id, parsed.data);
    revalidateProjectSurfaces(project.id);
    return {
      ok: true,
      message: "Proyecto creado.",
      entityId: project.id,
      slug: project.slug,
      redirectTo: "/dashboard/student/project",
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateStudentProject(
  input: StudentProjectInput & { id: string },
): Promise<ProjectActionState> {
  const parsed = studentProjectSchema.extend({ id: z.uuid() }).safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardStudentMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    const current = await findStudentProjectById(parsed.data.id);

    if (!current) {
      return { ok: false, message: "Proyecto no encontrado." };
    }

    if (
      guard.profile.activeRole !== "admin" &&
      current.studentId !== guard.profile.id
    ) {
      return { ok: false, message: "No puedes editar este proyecto." };
    }

    const ownerId = current.studentId;
    const project = await updateStudentProjectById(
      parsed.data.id,
      ownerId,
      parsed.data,
    );
    revalidateProjectSurfaces(project?.id);
    return {
      ok: Boolean(project),
      message: project ? "Proyecto actualizado." : "Proyecto no encontrado.",
      entityId: project?.id,
      slug: project?.slug,
      redirectTo: "/dashboard/student/project",
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function getCurrentStudentProject() {
  const auth = await requireStudentAction();

  if (auth.error) {
    return null;
  }

  return findCurrentStudentProject(auth.profile.id);
}

export async function getStudentProjectById(projectId: string) {
  const parsed = uuidSchema.safeParse(projectId);

  if (!parsed.success) {
    return null;
  }

  const auth = await requireStudentAction();

  if (auth.error) {
    return null;
  }

  const project = await findStudentProjectById(parsed.data);

  if (!project) {
    return null;
  }

  if (auth.profile.activeRole !== "admin" && project.studentId !== auth.profile.id) {
    return null;
  }

  return project;
}

export async function getAdminStudentProjects(filters?: ProjectFilters) {
  const auth = await requireAdminAction();

  if (auth.error) {
    return [];
  }

  return getAdminStudentProjectsByFilters(filters);
}

export async function archiveStudentProject(
  projectId: string,
): Promise<ProjectActionState> {
  const parsed = uuidSchema.safeParse(projectId);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardAdminMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    const project = await getAdminStudentProjectById(parsed.data);

    if (!project) {
      return { ok: false, message: "Proyecto no encontrado." };
    }

    await archiveStudentProjectById(parsed.data);
    revalidateProjectSurfaces(parsed.data);
    return {
      ok: true,
      message: "Proyecto archivado.",
      entityId: parsed.data,
    };
  } catch (error) {
    return actionError(error);
  }
}

