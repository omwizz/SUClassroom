"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  DELIVERABLE_MAX_FILES,
  type DeliverableStatus,
} from "@/constants/deliverables";
import { hasDatabaseUrl } from "@/db/client";
import {
  deliverableFileIdSchema,
  deliverableIdSchema,
  deliverableLinkIdSchema,
  deliverableLinkSchema,
  deliverableRequirementSchema,
  deliverableSchema,
  submitDeliverableSchema,
  type DeliverableInput,
  type DeliverableLinkInput,
  type DeliverableRequirementInput,
  type SubmitDeliverableInput,
} from "@/lib/validations/deliverables";
import { getCurrentProfile } from "@/server/actions/auth-actions";
import { getCourseById } from "@/server/queries/courses";
import {
  deleteDeliverableFileById,
  deleteDeliverableLinkById,
  findDeliverableFileById,
  getAdminDeliverables as queryAdminDeliverables,
  getDeliverableWithFiles,
  getDeliverablesByCourse as queryDeliverablesByCourse,
  getStudentCourseDeliverable as queryStudentCourseDeliverable,
  getStudentDeliverableById,
  getStudentDeliverables as queryStudentDeliverables,
  insertDeliverableDraft,
  insertDeliverableFile,
  insertDeliverableLink,
  submitDeliverableById,
  updateDeliverableDraftById,
  upsertDeliverableRequirement,
} from "@/server/queries/deliverables";
import { findStudentProjectById } from "@/server/queries/projects";
import { DeliverableService } from "@/server/services/deliverable-service";
import { StorageService } from "@/server/services/storage-service";
import type {
  DeliverableActionState,
  DeliverableFilters,
} from "@/types/deliverables";

const draftWithIdSchema = deliverableSchema.extend({ id: z.uuid() });

function validationError(error: z.ZodError): DeliverableActionState {
  return {
    ok: false,
    message: "Revisa los campos marcados.",
    fieldErrors: error.flatten().fieldErrors,
  };
}

function databaseMissing(): DeliverableActionState {
  return {
    ok: false,
    message:
      "DATABASE_URL no esta configurado. La fase queda preparada, pero los entregables requieren base de datos.",
  };
}

function actionError(error: unknown): DeliverableActionState {
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
        message: "Inicia sesion para gestionar entregables.",
        redirectTo: "/login",
      } satisfies DeliverableActionState,
    };
  }

  if (profile.activeRole !== "student") {
    return {
      profile: null,
      error: {
        ok: false,
        message: "Tu rol actual no puede crear entregables de alumno.",
      } satisfies DeliverableActionState,
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
        message: "Inicia sesion para administrar entregables.",
        redirectTo: "/login",
      } satisfies DeliverableActionState,
    };
  }

  if (profile.activeRole !== "admin") {
    return {
      profile: null,
      error: {
        ok: false,
        message: "No tienes permisos para administrar entregables.",
      } satisfies DeliverableActionState,
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

function revalidateDeliverableSurfaces(deliverableId?: string) {
  revalidatePath("/dashboard/student");
  revalidatePath("/dashboard/student/deliverables");
  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/admin/deliverables");

  if (deliverableId) {
    revalidatePath(`/dashboard/student/deliverables/${deliverableId}`);
    revalidatePath(`/dashboard/student/deliverables/${deliverableId}/edit`);
    revalidatePath(`/dashboard/admin/deliverables/${deliverableId}`);
  }
}

async function validateStudentDraftInput(
  studentId: string,
  input: DeliverableInput,
) {
  const project = await findStudentProjectById(input.projectId);

  if (!project || project.studentId !== studentId) {
    return "No puedes crear entregables para un proyecto ajeno.";
  }

  const course = await getCourseById(input.courseId);

  if (!course || course.status !== "published") {
    return "Selecciona un curso publicado.";
  }

  return null;
}

async function ensureStudentEditableDeliverable(
  deliverableId: string,
  studentId: string,
) {
  const deliverable = await getStudentDeliverableById(deliverableId, studentId);

  if (!deliverable) {
    return {
      deliverable: null,
      error: "Entregable no encontrado.",
    };
  }

  if (!DeliverableService.canEdit(deliverable.status)) {
    return {
      deliverable: null,
      error: "Este entregable ya esta enviado o en revision y no se puede editar libremente.",
    };
  }

  return { deliverable, error: null };
}

export async function createDeliverableDraft(
  input: DeliverableInput,
): Promise<DeliverableActionState> {
  const parsed = deliverableSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardStudentMutation();

  if (guard.error) {
    return guard.error;
  }

  const inputError = await validateStudentDraftInput(
    guard.profile.id,
    parsed.data,
  );

  if (inputError) {
    return { ok: false, message: inputError };
  }

  try {
    const draft = await insertDeliverableDraft(guard.profile.id, parsed.data);
    revalidateDeliverableSurfaces(draft.id);
    return {
      ok: true,
      message: "Borrador creado.",
      entityId: draft.id,
      redirectTo: `/dashboard/student/deliverables/${draft.id}/edit`,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateDeliverableDraft(
  input: DeliverableInput & { id: string },
): Promise<DeliverableActionState> {
  const parsed = draftWithIdSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardStudentMutation();

  if (guard.error) {
    return guard.error;
  }

  const current = await ensureStudentEditableDeliverable(
    parsed.data.id,
    guard.profile.id,
  );

  if (current.error) {
    return { ok: false, message: current.error };
  }

  const inputError = await validateStudentDraftInput(
    guard.profile.id,
    parsed.data,
  );

  if (inputError) {
    return { ok: false, message: inputError };
  }

  try {
    const deliverable = await updateDeliverableDraftById(
      parsed.data.id,
      parsed.data,
    );
    revalidateDeliverableSurfaces(parsed.data.id);
    return {
      ok: Boolean(deliverable),
      message: deliverable ? "Borrador actualizado." : "Entregable no encontrado.",
      entityId: deliverable?.id,
      redirectTo: `/dashboard/student/deliverables/${parsed.data.id}`,
    };
  } catch (error) {
    return actionError(error);
  }
}

async function submitStudentDeliverable(
  input: SubmitDeliverableInput,
  allowedStatuses: DeliverableStatus[],
) {
  const parsed = submitDeliverableSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardStudentMutation();

  if (guard.error) {
    return guard.error;
  }

  const deliverable = await getStudentDeliverableById(
    parsed.data.deliverableId,
    guard.profile.id,
  );

  if (!deliverable) {
    return { ok: false, message: "Entregable no encontrado." };
  }

  if (!allowedStatuses.includes(deliverable.status)) {
    return {
      ok: false,
      message: "El estado actual no permite enviar o reenviar este entregable.",
    };
  }

  if (deliverable.files.length === 0 && deliverable.links.length === 0) {
    return {
      ok: false,
      message: "Agrega al menos un archivo o enlace antes de enviar.",
    };
  }

  try {
    const submitted = await submitDeliverableById(deliverable.id);
    revalidateDeliverableSurfaces(deliverable.id);
    return {
      ok: Boolean(submitted),
      message:
        submitted?.status === "resubmitted"
          ? "Entregable reenviado."
          : "Entregable enviado.",
      entityId: submitted?.id,
      redirectTo: `/dashboard/student/deliverables/${deliverable.id}`,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function submitDeliverable(input: SubmitDeliverableInput) {
  return submitStudentDeliverable(input, ["draft"]);
}

export async function resubmitDeliverable(input: SubmitDeliverableInput) {
  return submitStudentDeliverable(input, ["changes_requested", "rejected"]);
}

export async function addDeliverableFile(
  formData: FormData,
): Promise<DeliverableActionState> {
  const deliverableId = String(formData.get("deliverableId") ?? "");
  const file = formData.get("file");
  const parsed = deliverableIdSchema.safeParse({ deliverableId });

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  if (!(file instanceof File)) {
    return { ok: false, message: "Selecciona un archivo." };
  }

  const guard = await guardStudentMutation();

  if (guard.error) {
    return guard.error;
  }

  const current = await ensureStudentEditableDeliverable(
    parsed.data.deliverableId,
    guard.profile.id,
  );

  if (current.error || !current.deliverable) {
    return { ok: false, message: current.error ?? "Entregable no encontrado." };
  }

  const maxFiles =
    current.deliverable.requirement?.maxFiles ?? DELIVERABLE_MAX_FILES;

  if (current.deliverable.files.length >= maxFiles) {
    return {
      ok: false,
      message: `Este entregable permite hasta ${maxFiles} archivos.`,
    };
  }

  const fileError = DeliverableService.validateFile(file);

  if (fileError) {
    return { ok: false, message: fileError };
  }

  const path = DeliverableService.buildStoragePath({
    studentId: guard.profile.id,
    projectId: current.deliverable.projectId,
    deliverableId: current.deliverable.id,
    fileName: file.name,
  });

  try {
    const uploaded = await StorageService.uploadPrivateFile({ path, file });

    if (!uploaded.ok) {
      return { ok: false, message: uploaded.message };
    }

    const record = await insertDeliverableFile({
      deliverableId: current.deliverable.id,
      uploadedBy: guard.profile.id,
      fileName: file.name,
      filePath: uploaded.path,
      mimeType: file.type,
      sizeBytes: file.size,
    });

    revalidateDeliverableSurfaces(current.deliverable.id);
    return {
      ok: true,
      message: "Archivo adjuntado.",
      entityId: record.id,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function removeDeliverableFile(input: {
  deliverableId: string;
  fileId: string;
}): Promise<DeliverableActionState> {
  const parsed = deliverableFileIdSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardStudentMutation();

  if (guard.error) {
    return guard.error;
  }

  const current = await ensureStudentEditableDeliverable(
    parsed.data.deliverableId,
    guard.profile.id,
  );

  if (current.error || !current.deliverable) {
    return { ok: false, message: current.error ?? "Entregable no encontrado." };
  }

  const file = await findDeliverableFileById(parsed.data.fileId);

  if (!file || file.deliverableId !== current.deliverable.id) {
    return { ok: false, message: "Archivo no encontrado." };
  }

  try {
    await StorageService.removePrivateFile(file.filePath);
    await deleteDeliverableFileById(file.id);
    revalidateDeliverableSurfaces(current.deliverable.id);
    return { ok: true, message: "Archivo eliminado." };
  } catch (error) {
    return actionError(error);
  }
}

export async function addDeliverableLink(
  deliverableId: string,
  input: DeliverableLinkInput,
): Promise<DeliverableActionState> {
  const parsed = deliverableLinkSchema.safeParse(input);
  const deliverable = deliverableIdSchema.safeParse({ deliverableId });

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  if (!deliverable.success) {
    return validationError(deliverable.error);
  }

  const guard = await guardStudentMutation();

  if (guard.error) {
    return guard.error;
  }

  const current = await ensureStudentEditableDeliverable(
    deliverable.data.deliverableId,
    guard.profile.id,
  );

  if (current.error || !current.deliverable) {
    return { ok: false, message: current.error ?? "Entregable no encontrado." };
  }

  try {
    const link = await insertDeliverableLink(current.deliverable.id, parsed.data);
    revalidateDeliverableSurfaces(current.deliverable.id);
    return { ok: true, message: "Enlace agregado.", entityId: link.id };
  } catch (error) {
    return actionError(error);
  }
}

export async function removeDeliverableLink(input: {
  deliverableId: string;
  linkId: string;
}): Promise<DeliverableActionState> {
  const parsed = deliverableLinkIdSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardStudentMutation();

  if (guard.error) {
    return guard.error;
  }

  const current = await ensureStudentEditableDeliverable(
    parsed.data.deliverableId,
    guard.profile.id,
  );

  if (current.error || !current.deliverable) {
    return { ok: false, message: current.error ?? "Entregable no encontrado." };
  }

  try {
    await deleteDeliverableLinkById(parsed.data.linkId);
    revalidateDeliverableSurfaces(current.deliverable.id);
    return { ok: true, message: "Enlace eliminado." };
  } catch (error) {
    return actionError(error);
  }
}

export async function getStudentDeliverables() {
  const auth = await requireStudentAction();

  if (auth.error) {
    return [];
  }

  return queryStudentDeliverables(auth.profile.id);
}

export async function getDeliverableById(deliverableId: string) {
  const parsed = deliverableIdSchema.safeParse({ deliverableId });

  if (!parsed.success) {
    return null;
  }

  const profile = await getCurrentProfile();

  if (!profile) {
    return null;
  }

  if (profile.activeRole === "admin") {
    return getDeliverableWithFiles(parsed.data.deliverableId);
  }

  return getStudentDeliverableById(parsed.data.deliverableId, profile.id);
}

export async function getAdminDeliverables(filters?: DeliverableFilters) {
  const auth = await requireAdminAction();

  if (auth.error) {
    return [];
  }

  return queryAdminDeliverables(filters);
}

export async function getDeliverablesByCourse(courseId: string) {
  const auth = await requireAdminAction();

  if (auth.error) {
    return [];
  }

  return queryDeliverablesByCourse(courseId);
}

export async function getStudentCourseDeliverable(courseId: string) {
  const auth = await requireStudentAction();

  if (auth.error) {
    return null;
  }

  return queryStudentCourseDeliverable(auth.profile.id, courseId);
}

export async function createDeliverableRequirement(
  input: DeliverableRequirementInput,
): Promise<DeliverableActionState> {
  return updateDeliverableRequirement(input);
}

export async function updateDeliverableRequirement(
  input: DeliverableRequirementInput,
): Promise<DeliverableActionState> {
  const parsed = deliverableRequirementSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardAdminMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    const requirement = await upsertDeliverableRequirement(parsed.data);
    revalidatePath("/dashboard/admin/courses");
    revalidatePath(`/dashboard/admin/courses/${parsed.data.courseId}/builder`);
    revalidatePath("/dashboard/admin/deliverables");
    return {
      ok: Boolean(requirement),
      message: "Requisito de entregable actualizado.",
      entityId: requirement?.id,
    };
  } catch (error) {
    return actionError(error);
  }
}
