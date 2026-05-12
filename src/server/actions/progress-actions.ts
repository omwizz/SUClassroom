"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { hasDatabaseUrl } from "@/db/client";
import {
  completeLessonSchema,
  courseUnlockRuleSchema,
  manualUnlockSchema,
  startCourseSchema,
  type CourseUnlockRuleInput,
  type ManualUnlockInput,
  type StartCourseInput,
  type CompleteLessonInput,
} from "@/lib/validations/progress";
import { getCurrentProfile } from "@/server/actions/auth-actions";
import {
  createCourseUnlockRule as insertCourseUnlockRule,
  evaluateNextCourseUnlock,
  getCourseProgressStatus,
  getDeliverableProgressContext,
  manualUnlockCourse as insertManualUnlockCourse,
  markLessonCompletedProgress,
  startCourseProgress,
  updateCourseProgressAfterDeliverable,
  updateCourseUnlockRule as persistCourseUnlockRule,
} from "@/server/queries/progress";
import type { ProgressActionState } from "@/types/progress";

function validationError(error: z.ZodError): ProgressActionState {
  return {
    ok: false,
    message: "Revisa los campos marcados.",
    fieldErrors: error.flatten().fieldErrors,
  };
}

function databaseMissing(): ProgressActionState {
  return {
    ok: false,
    message:
      "DATABASE_URL no esta configurado. El progreso queda preparado, pero requiere base de datos.",
  };
}

function actionError(error: unknown): ProgressActionState {
  return {
    ok: false,
    message:
      error instanceof Error
        ? error.message
        : "No se pudo completar la accion.",
  };
}

async function requireProgressProfile() {
  const profile = await getCurrentProfile();

  if (!profile) {
    return {
      profile: null,
      error: {
        ok: false,
        message: "Inicia sesion para continuar.",
        redirectTo: "/login",
      } satisfies ProgressActionState,
    };
  }

  if (!["student", "admin"].includes(profile.activeRole)) {
    return {
      profile: null,
      error: {
        ok: false,
        message: "Tu rol actual no puede actualizar progreso de alumno.",
      } satisfies ProgressActionState,
    };
  }

  if (!hasDatabaseUrl()) {
    return { profile: null, error: databaseMissing() };
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
        message: "Inicia sesion para continuar.",
        redirectTo: "/login",
      } satisfies ProgressActionState,
    };
  }

  if (profile.activeRole !== "admin") {
    return {
      profile: null,
      error: {
        ok: false,
        message: "Solo administracion puede gestionar desbloqueos.",
      } satisfies ProgressActionState,
    };
  }

  if (!hasDatabaseUrl()) {
    return { profile: null, error: databaseMissing() };
  }

  return { profile, error: null };
}

function revalidateProgressSurfaces(input?: {
  studentId?: string;
  courseSlug?: string;
  courseId?: string;
  deliverableId?: string;
}) {
  revalidatePath("/dashboard/student");
  revalidatePath("/dashboard/student/progress");
  revalidatePath("/dashboard/student/courses");
  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/admin/course-unlock-rules");
  revalidatePath("/dashboard/admin/users");

  if (input?.studentId) {
    revalidatePath(`/dashboard/admin/users/${input.studentId}/progress`);
  }

  if (input?.courseSlug) {
    revalidatePath(`/dashboard/student/courses/${input.courseSlug}`);
    revalidatePath(`/courses/${input.courseSlug}`);
  }

  if (input?.deliverableId) {
    revalidatePath(`/dashboard/student/deliverables/${input.deliverableId}`);
    revalidatePath(`/dashboard/student/deliverables/${input.deliverableId}/feedback`);
    revalidatePath(`/dashboard/admin/deliverables/${input.deliverableId}`);
  }
}

export async function startCourse(
  input: StartCourseInput,
): Promise<ProgressActionState> {
  const parsed = startCourseSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await requireProgressProfile();

  if (guard.error) {
    return guard.error;
  }

  try {
    const item = await getCourseProgressStatus(
      guard.profile.id,
      parsed.data.courseId,
    );

    if (!item) {
      return { ok: false, message: "Curso no encontrado." };
    }

    if (item.status === "locked") {
      return {
        ok: false,
        message: item.unlockState.message,
      };
    }

    const progress = await startCourseProgress(
      guard.profile.id,
      parsed.data.courseId,
    );
    revalidateProgressSurfaces({
      studentId: guard.profile.id,
      courseSlug: item.course.slug,
      courseId: item.course.id,
    });

    return {
      ok: true,
      message: "Curso iniciado.",
      entityId: progress.id,
      redirectTo: `/dashboard/student/courses/${item.course.slug}`,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function markLessonCompleted(
  input: CompleteLessonInput,
): Promise<ProgressActionState> {
  const parsed = completeLessonSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await requireProgressProfile();

  if (guard.error) {
    return guard.error;
  }

  try {
    const item = await getCourseProgressStatus(
      guard.profile.id,
      parsed.data.courseId,
    );

    if (!item) {
      return { ok: false, message: "Curso no encontrado." };
    }

    if (item.status === "locked") {
      return { ok: false, message: item.unlockState.message };
    }

    const belongsToCourse = item.course.modules.some((moduleItem) =>
      moduleItem.lessons.some((lesson) => lesson.id === parsed.data.lessonId),
    );

    if (!belongsToCourse) {
      return { ok: false, message: "La leccion no pertenece al curso." };
    }

    const lessonProgress = await markLessonCompletedProgress({
      studentId: guard.profile.id,
      courseId: parsed.data.courseId,
      lessonId: parsed.data.lessonId,
    });
    revalidateProgressSurfaces({
      studentId: guard.profile.id,
      courseSlug: item.course.slug,
      courseId: item.course.id,
    });

    return {
      ok: true,
      message: "Leccion marcada como completada.",
      entityId: lessonProgress.id,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function createCourseUnlockRule(
  input: CourseUnlockRuleInput,
): Promise<ProgressActionState> {
  return saveCourseUnlockRule(input, "Regla de desbloqueo creada.");
}

export async function updateCourseUnlockRule(
  input: CourseUnlockRuleInput,
): Promise<ProgressActionState> {
  return saveCourseUnlockRule(input, "Regla de desbloqueo actualizada.");
}

async function saveCourseUnlockRule(
  input: CourseUnlockRuleInput,
  successMessage: string,
): Promise<ProgressActionState> {
  const parsed = courseUnlockRuleSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await requireAdminAction();

  if (guard.error) {
    return guard.error;
  }

  try {
    const rule = successMessage.includes("creada")
      ? await insertCourseUnlockRule(parsed.data)
      : await persistCourseUnlockRule(parsed.data);
    revalidateProgressSurfaces({ courseId: parsed.data.courseId });
    return {
      ok: true,
      message: successMessage,
      entityId: rule.id,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function manualUnlockCourse(
  input: ManualUnlockInput,
): Promise<ProgressActionState> {
  const parsed = manualUnlockSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await requireAdminAction();

  if (guard.error) {
    return guard.error;
  }

  try {
    const unlock = await insertManualUnlockCourse(parsed.data);
    revalidateProgressSurfaces({
      studentId: parsed.data.studentId,
      courseId: parsed.data.courseId,
    });
    return {
      ok: true,
      message: "Curso desbloqueado manualmente.",
      entityId: unlock.id,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function saveCourseUnlockRuleFromForm(
  formData: FormData,
): Promise<void> {
  const courseId = String(formData.get("courseId") ?? "");
  const requiredPreviousCourseId = String(
    formData.get("requiredPreviousCourseId") ?? "",
  );
  const sortOrder = Number(formData.get("sortOrder") ?? 0);

  await updateCourseUnlockRule({
    courseId,
    requiredPreviousCourseId: requiredPreviousCourseId || null,
    requiresApprovedDeliverable:
      formData.get("requiresApprovedDeliverable") === "on",
    requiresPayment: formData.get("requiresPayment") === "on",
    requiresMentorship: formData.get("requiresMentorship") === "on",
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
  });
}

export async function manualUnlockCourseFromForm(
  input: ManualUnlockInput,
  formData: FormData,
): Promise<void> {
  void formData;
  await manualUnlockCourse(input);
}

export async function onDeliverableSubmitted(deliverableId: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const context = await getDeliverableProgressContext(deliverableId);

  if (!context) {
    return null;
  }

  const progress = await updateCourseProgressAfterDeliverable({
    studentId: context.deliverable.studentId,
    courseId: context.deliverable.courseId,
    deliverableId: context.deliverable.id,
    status: context.deliverable.status,
  });

  revalidateProgressSurfaces({
    studentId: context.deliverable.studentId,
    courseSlug: context.course.slug,
    courseId: context.course.id,
    deliverableId: context.deliverable.id,
  });

  return progress;
}

export async function onDeliverableApproved(deliverableId: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const context = await getDeliverableProgressContext(deliverableId);

  if (!context) {
    return null;
  }

  const progress = await updateCourseProgressAfterDeliverable({
    studentId: context.deliverable.studentId,
    courseId: context.deliverable.courseId,
    deliverableId: context.deliverable.id,
    status: "approved",
  });

  await onCourseCompleted({
    studentId: context.deliverable.studentId,
    courseId: context.deliverable.courseId,
    deliverableId: context.deliverable.id,
  });
  revalidateProgressSurfaces({
    studentId: context.deliverable.studentId,
    courseSlug: context.course.slug,
    courseId: context.course.id,
    deliverableId: context.deliverable.id,
  });

  return progress;
}

export async function onDeliverableRejected(deliverableId: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const context = await getDeliverableProgressContext(deliverableId);

  if (!context) {
    return null;
  }

  const progress = await updateCourseProgressAfterDeliverable({
    studentId: context.deliverable.studentId,
    courseId: context.deliverable.courseId,
    deliverableId: context.deliverable.id,
    status: context.deliverable.status,
  });

  revalidateProgressSurfaces({
    studentId: context.deliverable.studentId,
    courseSlug: context.course.slug,
    courseId: context.course.id,
    deliverableId: context.deliverable.id,
  });

  return progress;
}

export async function onCourseCompleted(input: {
  studentId: string;
  courseId: string;
  deliverableId?: string | null;
}) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const unlocked = await evaluateNextCourseUnlock({
    studentId: input.studentId,
    completedCourseId: input.courseId,
    deliverableId: input.deliverableId,
  });

  revalidateProgressSurfaces({
    studentId: input.studentId,
    courseId: input.courseId,
    deliverableId: input.deliverableId ?? undefined,
  });

  return unlocked;
}

export async function startCourseFromForm(
  input: StartCourseInput,
  formData: FormData,
): Promise<void> {
  void formData;
  await startCourse(input);
}

export async function markLessonCompletedFromForm(
  input: CompleteLessonInput,
  formData: FormData,
): Promise<void> {
  void formData;
  await markLessonCompleted(input);
}
