export const COURSE_PROGRESS_STATUSES = [
  "locked",
  "available",
  "in_progress",
  "pending_review",
  "approved",
  "completed",
] as const;

export const LESSON_PROGRESS_STATUSES = [
  "not_started",
  "in_progress",
  "completed",
] as const;

export const PROGRESS_EVENT_TYPES = [
  "course_started",
  "lesson_completed",
  "deliverable_submitted",
  "deliverable_approved",
  "deliverable_rejected",
  "course_completed",
  "course_unlocked",
] as const;

export const UNLOCK_REASONS = [
  "first_free_course",
  "previous_course_completed",
  "admin_manual",
  "payment_confirmed",
  "mentorship_completed",
] as const;

export type CourseProgressStatus =
  (typeof COURSE_PROGRESS_STATUSES)[number];
export type LessonProgressStatus =
  (typeof LESSON_PROGRESS_STATUSES)[number];
export type ProgressEventType = (typeof PROGRESS_EVENT_TYPES)[number];
export type UnlockReason = (typeof UNLOCK_REASONS)[number];

export const COURSE_PROGRESS_STATUS_LABELS: Record<
  CourseProgressStatus,
  string
> = {
  locked: "Bloqueado",
  available: "Disponible",
  in_progress: "En progreso",
  pending_review: "En revision",
  approved: "Aprobado",
  completed: "Completado",
};

export const LESSON_PROGRESS_STATUS_LABELS: Record<
  LessonProgressStatus,
  string
> = {
  not_started: "No iniciada",
  in_progress: "En progreso",
  completed: "Completada",
};

export const PROGRESS_EVENT_TYPE_LABELS: Record<ProgressEventType, string> = {
  course_started: "Curso iniciado",
  lesson_completed: "Leccion completada",
  deliverable_submitted: "Entregable enviado",
  deliverable_approved: "Entregable aprobado",
  deliverable_rejected: "Entregable rechazado",
  course_completed: "Curso completado",
  course_unlocked: "Curso desbloqueado",
};

export const UNLOCK_REASON_LABELS: Record<UnlockReason, string> = {
  first_free_course: "Primer curso gratuito",
  previous_course_completed: "Curso anterior completado",
  admin_manual: "Desbloqueo manual admin",
  payment_confirmed: "Pago confirmado",
  mentorship_completed: "Mentoria completada",
};
