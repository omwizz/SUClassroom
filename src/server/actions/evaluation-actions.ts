"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { hasDatabaseUrl } from "@/db/client";
import {
  evaluationSchema,
  feedbackIdSchema,
  feedbackSchema,
  mentorAssignmentSchema,
  notificationIdSchema,
  deliverableReviewIdSchema,
  type EvaluationInput,
  type FeedbackInput,
  type MentorAssignmentInput,
} from "@/lib/validations/evaluations";
import { getCurrentProfile } from "@/server/actions/auth-actions";
import { getAdminDeliverableById } from "@/server/queries/deliverables";
import {
  createNotification as insertNotification,
  getActiveAssignmentsForMentor,
  getEvaluationByDeliverable as queryEvaluationByDeliverable,
  getEvaluationCriteriaByCourse,
  getEvaluationHistory as queryEvaluationHistory,
  getFeedbackByDeliverable as queryFeedbackByDeliverable,
  getFeedbackRecordById,
  getMentorAssignments as queryMentorAssignments,
  getMentorDeliverables,
  getMentorEvaluationHistory,
  getReviewQueueForMentor,
  getStudentFeedback as queryStudentFeedback,
  getUserNotifications as queryUserNotifications,
  insertFeedbackRecord,
  insertMentorAssignment,
  markNotificationRead,
  startEvaluationRecord,
  submitEvaluationRecord,
  updateFeedbackRecord,
} from "@/server/queries/evaluations";
import { EvaluationService } from "@/server/services/evaluation-service";
import type { EvaluationActionState } from "@/types/evaluations";

const assignmentToDeliverableSchema = z.object({
  deliverableId: z.uuid(),
  mentorId: z.uuid(),
});

const feedbackWithContextSchema = feedbackSchema.extend({
  evaluationId: z.uuid(),
  deliverableId: z.uuid(),
});

const updateFeedbackWithIdSchema = feedbackSchema.extend({
  feedbackId: z.uuid(),
});

function validationError(error: z.ZodError): EvaluationActionState {
  return {
    ok: false,
    message: "Revisa los campos marcados.",
    fieldErrors: error.flatten().fieldErrors,
  };
}

function databaseMissing(): EvaluationActionState {
  return {
    ok: false,
    message:
      "DATABASE_URL no esta configurado. La fase queda preparada, pero evaluaciones y feedback requieren base de datos.",
  };
}

function actionError(error: unknown): EvaluationActionState {
  return {
    ok: false,
    message:
      error instanceof Error
        ? error.message
        : "No se pudo completar la accion.",
  };
}

async function requireProfileAction() {
  const profile = await getCurrentProfile();

  if (!profile) {
    return {
      profile: null,
      error: {
        ok: false,
        message: "Inicia sesion para continuar.",
        redirectTo: "/login",
      } satisfies EvaluationActionState,
    };
  }

  return { profile, error: null };
}

async function requireAdminAction() {
  const auth = await requireProfileAction();

  if (auth.error) {
    return auth;
  }

  if (auth.profile.activeRole !== "admin") {
    return {
      profile: null,
      error: {
        ok: false,
        message: "Solo admin puede gestionar asignaciones.",
      } satisfies EvaluationActionState,
    };
  }

  if (!hasDatabaseUrl()) {
    return { profile: null, error: databaseMissing() };
  }

  return auth;
}

async function requireReviewMutation(deliverableId: string) {
  const auth = await requireProfileAction();

  if (auth.error) {
    return { profile: null, deliverable: null, error: auth.error };
  }

  if (!hasDatabaseUrl()) {
    return { profile: null, deliverable: null, error: databaseMissing() };
  }

  if (!["mentor", "admin"].includes(auth.profile.activeRole)) {
    return {
      profile: null,
      deliverable: null,
      error: {
        ok: false,
        message: "Tu rol actual no puede evaluar entregables.",
      } satisfies EvaluationActionState,
    };
  }

  const deliverable = await getAdminDeliverableById(deliverableId);

  if (!deliverable) {
    return {
      profile: null,
      deliverable: null,
      error: { ok: false, message: "Entregable no encontrado." },
    };
  }

  if (auth.profile.activeRole === "mentor") {
    const assignments = await getActiveAssignmentsForMentor(auth.profile.id);
    const allowed = EvaluationService.canMentorReview(
      deliverable,
      assignments,
      auth.profile.id,
    );

    if (!allowed) {
      return {
        profile: null,
        deliverable: null,
        error: {
          ok: false,
          message: "No puedes revisar entregables que no tienes asignados.",
        } satisfies EvaluationActionState,
      };
    }
  }

  return { profile: auth.profile, deliverable, error: null };
}

function revalidateReviewSurfaces(deliverableId?: string) {
  revalidatePath("/dashboard/mentor");
  revalidatePath("/dashboard/mentor/deliverables");
  revalidatePath("/dashboard/mentor/evaluations");
  revalidatePath("/dashboard/mentor/feedback");
  revalidatePath("/dashboard/mentor/students");
  revalidatePath("/dashboard/student");
  revalidatePath("/dashboard/student/feedback");
  revalidatePath("/dashboard/student/deliverables");
  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/admin/deliverables");
  revalidatePath("/dashboard/admin/mentor-assignments");

  if (deliverableId) {
    revalidatePath(`/dashboard/mentor/deliverables/${deliverableId}`);
    revalidatePath(`/dashboard/admin/deliverables/${deliverableId}`);
    revalidatePath(`/dashboard/admin/deliverables/${deliverableId}/review`);
    revalidatePath(`/dashboard/student/deliverables/${deliverableId}`);
    revalidatePath(`/dashboard/student/deliverables/${deliverableId}/feedback`);
  }
}

export async function assignMentorToStudent(
  input: MentorAssignmentInput,
): Promise<EvaluationActionState> {
  const parsed = mentorAssignmentSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await requireAdminAction();

  if (guard.error) {
    return guard.error;
  }

  try {
    const assignment = await insertMentorAssignment(parsed.data, guard.profile.id);
    revalidateReviewSurfaces();
    return {
      ok: true,
      message: "Mentor asignado.",
      entityId: assignment.id,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function assignMentorToDeliverable(input: {
  deliverableId: string;
  mentorId: string;
}): Promise<EvaluationActionState> {
  const parsed = assignmentToDeliverableSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await requireAdminAction();

  if (guard.error) {
    return guard.error;
  }

  const deliverable = await getAdminDeliverableById(parsed.data.deliverableId);

  if (!deliverable) {
    return { ok: false, message: "Entregable no encontrado." };
  }

  try {
    const assignment = await insertMentorAssignment(
      {
        mentorId: parsed.data.mentorId,
        studentId: deliverable.studentId,
        projectId: deliverable.projectId,
        courseId: deliverable.courseId,
        status: "active",
      },
      guard.profile.id,
    );
    revalidateReviewSurfaces(deliverable.id);
    return {
      ok: true,
      message: "Mentor asignado al entregable.",
      entityId: assignment.id,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function getMentorAssignments() {
  const auth = await requireProfileAction();

  if (auth.error || !hasDatabaseUrl()) {
    return [];
  }

  if (auth.profile.activeRole === "admin") {
    return queryMentorAssignments();
  }

  if (auth.profile.activeRole === "mentor") {
    return queryMentorAssignments(auth.profile.id);
  }

  return [];
}

export async function startEvaluation(input: {
  deliverableId: string;
}): Promise<EvaluationActionState> {
  const parsed = deliverableReviewIdSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await requireReviewMutation(parsed.data.deliverableId);

  if (guard.error || !guard.profile || !guard.deliverable) {
    return guard.error ?? { ok: false, message: "No se pudo iniciar revision." };
  }

  if (!EvaluationService.canStartReview(guard.deliverable.status)) {
    return {
      ok: false,
      message: "Este entregable no esta listo para revision.",
    };
  }

  try {
    const evaluation = await startEvaluationRecord(
      guard.deliverable.id,
      guard.profile.id,
    );
    revalidateReviewSurfaces(guard.deliverable.id);
    return {
      ok: true,
      message: "Revision iniciada.",
      entityId: evaluation.id,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function startEvaluationFromForm(
  input: { deliverableId: string },
  formData: FormData,
): Promise<void> {
  void formData;
  await startEvaluation(input);
}

export async function submitEvaluation(
  input: EvaluationInput,
): Promise<EvaluationActionState> {
  const parsed = evaluationSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await requireReviewMutation(parsed.data.deliverableId);

  if (guard.error || !guard.profile || !guard.deliverable) {
    return guard.error ?? { ok: false, message: "No se pudo evaluar." };
  }

  if (!EvaluationService.canStartReview(guard.deliverable.status)) {
    return {
      ok: false,
      message: "Este entregable ya no esta en estado revisable.",
    };
  }

  try {
    const criteria = await getEvaluationCriteriaByCourse(
      guard.deliverable.courseId,
    );
    const requiredCriteriaIds = new Set(
      criteria.filter((item) => item.isRequired).map((item) => item.id),
    );
    const providedCriteriaIds = new Set(
      parsed.data.criteriaScores?.map((item) => item.criteriaId) ?? [],
    );
    const missingRequired = [...requiredCriteriaIds].some(
      (criteriaId) => !providedCriteriaIds.has(criteriaId),
    );

    if (missingRequired) {
      return {
        ok: false,
        message: "Completa los criterios obligatorios de evaluacion.",
      };
    }

    const evaluation = await submitEvaluationRecord(
      guard.deliverable.id,
      guard.profile.id,
      parsed.data,
    );
    revalidateReviewSurfaces(guard.deliverable.id);
    return {
      ok: Boolean(evaluation),
      message: evaluation
        ? "Evaluacion registrada y alumno notificado."
        : "No se pudo registrar la evaluacion.",
      entityId: evaluation?.id,
      redirectTo:
        guard.profile.activeRole === "admin"
          ? `/dashboard/admin/deliverables/${guard.deliverable.id}`
          : `/dashboard/mentor/deliverables/${guard.deliverable.id}`,
    };
  } catch (error) {
    return actionError(error);
  }
}

function withDecision(
  input: Omit<EvaluationInput, "decision">,
  decision: EvaluationInput["decision"],
) {
  return submitEvaluation({ ...input, decision });
}

export async function approveDeliverable(
  input: Omit<EvaluationInput, "decision">,
) {
  return withDecision(input, "approved");
}

export async function rejectDeliverable(
  input: Omit<EvaluationInput, "decision">,
) {
  return withDecision(input, "rejected");
}

export async function requestChanges(
  input: Omit<EvaluationInput, "decision">,
) {
  return withDecision(input, "changes_requested");
}

export async function getEvaluationByDeliverable(deliverableId: string) {
  const parsed = deliverableReviewIdSchema.safeParse({ deliverableId });

  if (!parsed.success) {
    return null;
  }

  const auth = await requireProfileAction();

  if (auth.error || !hasDatabaseUrl()) {
    return null;
  }

  return queryEvaluationByDeliverable(parsed.data.deliverableId);
}

export async function getEvaluationHistory(deliverableId: string) {
  const parsed = deliverableReviewIdSchema.safeParse({ deliverableId });

  if (!parsed.success) {
    return [];
  }

  const auth = await requireProfileAction();

  if (auth.error || !hasDatabaseUrl()) {
    return [];
  }

  return queryEvaluationHistory(parsed.data.deliverableId);
}

export async function createFeedback(input: {
  evaluationId: string;
  deliverableId: string;
  summary: string;
  strengths?: string;
  improvements?: string;
  nextSteps: string;
  priority: FeedbackInput["priority"];
  isVisibleToStudent: boolean;
}): Promise<EvaluationActionState> {
  const parsed = feedbackWithContextSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await requireReviewMutation(parsed.data.deliverableId);

  if (guard.error || !guard.profile) {
    return guard.error ?? { ok: false, message: "No se pudo crear feedback." };
  }

  try {
    const created = await insertFeedbackRecord({
      evaluationId: parsed.data.evaluationId,
      deliverableId: parsed.data.deliverableId,
      authorId: guard.profile.id,
      feedback: parsed.data,
    });
    revalidateReviewSurfaces(parsed.data.deliverableId);
    return { ok: true, message: "Feedback creado.", entityId: created.id };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateFeedback(input: {
  feedbackId: string;
  summary: string;
  strengths?: string;
  improvements?: string;
  nextSteps: string;
  priority: FeedbackInput["priority"];
  isVisibleToStudent: boolean;
}): Promise<EvaluationActionState> {
  const parsed = updateFeedbackWithIdSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const auth = await requireProfileAction();

  if (auth.error) {
    return auth.error;
  }

  if (!hasDatabaseUrl()) {
    return databaseMissing();
  }

  const current = await getFeedbackRecordById(parsed.data.feedbackId);

  if (!current) {
    return { ok: false, message: "Feedback no encontrado." };
  }

  const canUpdate =
    auth.profile.activeRole === "admin" || current.authorId === auth.profile.id;

  if (!canUpdate || auth.profile.activeRole === "student") {
    return {
      ok: false,
      message: "No tienes permiso para editar este feedback.",
    };
  }

  try {
    const updated = await updateFeedbackRecord(parsed.data.feedbackId, parsed.data);
    revalidateReviewSurfaces(current.deliverableId);
    return {
      ok: Boolean(updated),
      message: updated ? "Feedback actualizado." : "Feedback no encontrado.",
      entityId: updated?.id,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function getStudentFeedback() {
  const auth = await requireProfileAction();

  if (auth.error || !hasDatabaseUrl()) {
    return [];
  }

  if (auth.profile.activeRole === "student") {
    return queryStudentFeedback(auth.profile.id);
  }

  return [];
}

export async function getFeedbackByDeliverable(deliverableId: string) {
  const parsed = deliverableReviewIdSchema.safeParse({ deliverableId });

  if (!parsed.success) {
    return [];
  }

  const auth = await requireProfileAction();

  if (auth.error || !hasDatabaseUrl()) {
    return [];
  }

  return queryFeedbackByDeliverable(parsed.data.deliverableId);
}

export async function createNotification(input: {
  userId: string;
  type: string;
  title: string;
  message: string;
  href?: string | null;
}) {
  const auth = await requireAdminAction();

  if (auth.error) {
    return auth.error;
  }

  const parsed = z
    .object({
      userId: z.uuid(),
      type: z.enum([
        "deliverable_submitted",
        "deliverable_approved",
        "deliverable_rejected",
        "changes_requested",
        "feedback_received",
      ]),
      title: z.string().trim().min(3).max(160),
      message: z.string().trim().min(3).max(1200),
      href: z.string().trim().optional(),
    })
    .safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  try {
    const notification = await insertNotification(parsed.data);
    revalidatePath("/dashboard");
    return {
      ok: true,
      message: "Notificacion creada.",
      entityId: notification.id,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function markNotificationAsRead(notificationId: string) {
  const parsed = notificationIdSchema.safeParse({ notificationId });

  if (!parsed.success) {
    return { ok: false, message: "Notificacion invalida." };
  }

  const auth = await requireProfileAction();

  if (auth.error) {
    return auth.error;
  }

  if (!hasDatabaseUrl()) {
    return databaseMissing();
  }

  try {
    await markNotificationRead(parsed.data.notificationId, auth.profile.id);
    revalidatePath("/dashboard");
    return { ok: true, message: "Notificacion marcada como leida." };
  } catch (error) {
    return actionError(error);
  }
}

export async function markNotificationAsReadFromForm(
  notificationId: string,
  formData: FormData,
): Promise<void> {
  void formData;
  await markNotificationAsRead(notificationId);
}

export async function getUserNotifications() {
  const auth = await requireProfileAction();

  if (auth.error || !hasDatabaseUrl()) {
    return [];
  }

  return queryUserNotifications(auth.profile.id);
}

export async function getMentorReviewQueue() {
  const auth = await requireProfileAction();

  if (auth.error || !hasDatabaseUrl() || auth.profile.activeRole !== "mentor") {
    return [];
  }

  return getReviewQueueForMentor(auth.profile.id);
}

export async function getMentorAllDeliverables() {
  const auth = await requireProfileAction();

  if (auth.error || !hasDatabaseUrl()) {
    return [];
  }

  if (auth.profile.activeRole === "mentor") {
    return getMentorDeliverables(auth.profile.id);
  }

  return [];
}

export async function getMentorEvaluations() {
  const auth = await requireProfileAction();

  if (auth.error || !hasDatabaseUrl()) {
    return [];
  }

  if (auth.profile.activeRole === "mentor") {
    return getMentorEvaluationHistory(auth.profile.id);
  }

  return [];
}

export async function validateFeedbackOwnership(feedbackId: string) {
  const parsed = feedbackIdSchema.safeParse({ feedbackId });

  if (!parsed.success) {
    return null;
  }

  return getFeedbackRecordById(parsed.data.feedbackId);
}
