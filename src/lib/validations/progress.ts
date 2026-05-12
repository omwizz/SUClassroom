import { z } from "zod";
import { UNLOCK_REASONS } from "@/constants/progress";

export const startCourseSchema = z.object({
  courseId: z.uuid(),
});

export const completeLessonSchema = z.object({
  courseId: z.uuid(),
  lessonId: z.uuid(),
});

export const unlockCourseSchema = z.object({
  studentId: z.uuid(),
  courseId: z.uuid(),
  unlockedByCourseId: z.uuid().nullable().optional(),
  unlockedByDeliverableId: z.uuid().nullable().optional(),
  unlockedByPaymentId: z.uuid().nullable().optional(),
  reason: z.enum(UNLOCK_REASONS),
});

export const courseUnlockRuleSchema = z.object({
  courseId: z.uuid(),
  requiredPreviousCourseId: z.uuid().nullable().optional(),
  requiresApprovedDeliverable: z.coerce.boolean().default(true),
  requiresPayment: z.coerce.boolean().default(false),
  requiresMentorship: z.coerce.boolean().default(false),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

export const manualUnlockSchema = z.object({
  studentId: z.uuid(),
  courseId: z.uuid(),
});

export const progressEventSchema = z.object({
  studentId: z.uuid(),
  courseId: z.uuid().nullable().optional(),
  lessonId: z.uuid().nullable().optional(),
  deliverableId: z.uuid().nullable().optional(),
  eventType: z.enum([
    "course_started",
    "lesson_completed",
    "deliverable_submitted",
    "deliverable_approved",
    "deliverable_rejected",
    "course_completed",
    "course_unlocked",
  ]),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type StartCourseInput = z.infer<typeof startCourseSchema>;
export type CompleteLessonInput = z.infer<typeof completeLessonSchema>;
export type UnlockCourseInput = z.infer<typeof unlockCourseSchema>;
export type CourseUnlockRuleInput = z.infer<typeof courseUnlockRuleSchema>;
export type ManualUnlockInput = z.infer<typeof manualUnlockSchema>;
