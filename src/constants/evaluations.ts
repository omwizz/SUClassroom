export const EVALUATION_STATUSES = [
  "pending",
  "in_progress",
  "completed",
] as const;

export const EVALUATION_DECISIONS = [
  "approved",
  "rejected",
  "changes_requested",
] as const;

export const FEEDBACK_PRIORITIES = ["low", "medium", "high"] as const;
export const ASSIGNMENT_STATUSES = ["active", "inactive"] as const;

export const NOTIFICATION_TYPES = [
  "deliverable_submitted",
  "deliverable_approved",
  "deliverable_rejected",
  "changes_requested",
  "feedback_received",
] as const;

export type EvaluationStatus = (typeof EVALUATION_STATUSES)[number];
export type EvaluationDecision = (typeof EVALUATION_DECISIONS)[number];
export type FeedbackPriority = (typeof FEEDBACK_PRIORITIES)[number];
export type AssignmentStatus = (typeof ASSIGNMENT_STATUSES)[number];
export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export const EVALUATION_STATUS_LABELS: Record<EvaluationStatus, string> = {
  pending: "Pendiente",
  in_progress: "En revision",
  completed: "Completada",
};

export const EVALUATION_DECISION_LABELS: Record<EvaluationDecision, string> = {
  approved: "Aprobado",
  rejected: "Rechazado",
  changes_requested: "Cambios solicitados",
};

export const FEEDBACK_PRIORITY_LABELS: Record<FeedbackPriority, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
};

export const ASSIGNMENT_STATUS_LABELS: Record<AssignmentStatus, string> = {
  active: "Activa",
  inactive: "Inactiva",
};

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  deliverable_submitted: "Entregable enviado",
  deliverable_approved: "Entregable aprobado",
  deliverable_rejected: "Entregable rechazado",
  changes_requested: "Cambios solicitados",
  feedback_received: "Feedback recibido",
};

export const REVIEWABLE_DELIVERABLE_STATUSES = [
  "submitted",
  "resubmitted",
  "under_review",
] as const;
