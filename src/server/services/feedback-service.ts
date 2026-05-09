import type { FeedbackInput } from "@/lib/validations/evaluations";

function emptyToNull(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export const FeedbackService = {
  normalize(input: FeedbackInput) {
    return {
      summary: input.summary.trim(),
      strengths: emptyToNull(input.strengths),
      improvements: emptyToNull(input.improvements),
      nextSteps: input.nextSteps.trim(),
      priority: input.priority,
      isVisibleToStudent: input.isVisibleToStudent,
    };
  },
};
