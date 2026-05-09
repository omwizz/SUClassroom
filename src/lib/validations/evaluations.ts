import { z } from "zod";
import {
  ASSIGNMENT_STATUSES,
  EVALUATION_DECISIONS,
  FEEDBACK_PRIORITIES,
} from "@/constants/evaluations";

const optionalLongText = z.string().trim().max(4000).optional();

export const evaluationScoreSchema = z.object({
  criteriaId: z.uuid(),
  score: z.coerce.number().int().min(0).max(100),
  comment: optionalLongText,
});

export const feedbackSchema = z.object({
  summary: z
    .string()
    .trim()
    .min(12, "Resume el feedback con al menos 12 caracteres.")
    .max(1200),
  strengths: optionalLongText,
  improvements: optionalLongText,
  nextSteps: z
    .string()
    .trim()
    .min(12, "Define un siguiente paso accionable.")
    .max(2000),
  priority: z.enum(FEEDBACK_PRIORITIES),
  isVisibleToStudent: z.boolean(),
});

export const evaluationSchema = z
  .object({
    deliverableId: z.uuid(),
    decision: z.enum(EVALUATION_DECISIONS),
    score: z.coerce.number().int().min(0).max(100).optional(),
    criteriaScores: z.array(evaluationScoreSchema).max(20).optional(),
    feedback: feedbackSchema,
  })
  .superRefine((value, ctx) => {
    if (
      ["rejected", "changes_requested"].includes(value.decision) &&
      !value.feedback.improvements?.trim()
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["feedback", "improvements"],
        message: "El rechazo o solicitud de cambios requiere mejoras.",
      });
    }
  });

export const mentorAssignmentSchema = z.object({
  mentorId: z.uuid(),
  studentId: z.uuid(),
  projectId: z.uuid().optional(),
  courseId: z.uuid().optional(),
  status: z.enum(ASSIGNMENT_STATUSES).default("active"),
});

export const deliverableReviewIdSchema = z.object({
  deliverableId: z.uuid(),
});

export const evaluationIdSchema = z.object({
  evaluationId: z.uuid(),
});

export const feedbackIdSchema = z.object({
  feedbackId: z.uuid(),
});

export const notificationIdSchema = z.object({
  notificationId: z.uuid(),
});

export type EvaluationInput = z.infer<typeof evaluationSchema>;
export type FeedbackInput = z.infer<typeof feedbackSchema>;
export type MentorAssignmentInput = z.infer<typeof mentorAssignmentSchema>;
export type EvaluationScoreInput = z.infer<typeof evaluationScoreSchema>;
