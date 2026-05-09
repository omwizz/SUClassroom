import type { DeliverableStatus } from "@/constants/deliverables";
import {
  REVIEWABLE_DELIVERABLE_STATUSES,
  type EvaluationDecision,
} from "@/constants/evaluations";
import type { EvaluationInput } from "@/lib/validations/evaluations";
import type { Deliverable } from "@/types/deliverables";
import type { MentorAssignment } from "@/types/evaluations";
import { MentorAssignmentService } from "@/server/services/mentor-assignment-service";

export const EvaluationService = {
  canStartReview(status: DeliverableStatus) {
    return REVIEWABLE_DELIVERABLE_STATUSES.includes(
      status as (typeof REVIEWABLE_DELIVERABLE_STATUSES)[number],
    );
  },

  canMentorReview(
    deliverable: Deliverable,
    assignments: MentorAssignment[],
    mentorId: string,
  ) {
    return assignments.some(
      (assignment) =>
        assignment.mentorId === mentorId &&
        MentorAssignmentService.matchesDeliverable(assignment, deliverable),
    );
  },

  deliverableStatusForDecision(decision: EvaluationDecision): DeliverableStatus {
    const statusByDecision: Record<EvaluationDecision, DeliverableStatus> = {
      approved: "approved",
      rejected: "rejected",
      changes_requested: "changes_requested",
    };

    return statusByDecision[decision];
  },

  requiresFeedback(decision: EvaluationDecision) {
    return decision === "rejected" || decision === "changes_requested";
  },

  buildRubricSnapshot(input: EvaluationInput) {
    return {
      decision: input.decision,
      score: input.score ?? null,
      criteriaScores: input.criteriaScores ?? [],
      feedbackPriority: input.feedback.priority,
    };
  },
};
