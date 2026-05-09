import {
  EVALUATION_DECISION_LABELS,
  type EvaluationDecision,
  type NotificationType,
} from "@/constants/evaluations";
import type { Deliverable } from "@/types/deliverables";

const typeByDecision: Record<EvaluationDecision, NotificationType> = {
  approved: "deliverable_approved",
  rejected: "deliverable_rejected",
  changes_requested: "changes_requested",
};

export const NotificationService = {
  typeForDecision(decision: EvaluationDecision) {
    return typeByDecision[decision];
  },

  titleForDecision(decision: EvaluationDecision) {
    return EVALUATION_DECISION_LABELS[decision];
  },

  messageForDecision(decision: EvaluationDecision, deliverable: Deliverable) {
    if (decision === "approved") {
      return `Tu entregable "${deliverable.title}" fue aprobado.`;
    }

    if (decision === "rejected") {
      return `Tu entregable "${deliverable.title}" fue rechazado. Revisa el feedback antes de reenviar.`;
    }

    return `Tu entregable "${deliverable.title}" requiere cambios. Revisa el feedback y ajusta tu evidencia.`;
  },

  hrefForDeliverableFeedback(deliverableId: string) {
    return `/dashboard/student/deliverables/${deliverableId}/feedback`;
  },
};
