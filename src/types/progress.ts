import type {
  CourseProgressStatus,
  LessonProgressStatus,
  ProgressEventType,
  UnlockReason,
} from "@/constants/progress";
import type { Course, Lesson } from "@/types/courses";

export type UserCourseProgress = {
  id: string;
  studentId: string;
  courseId: string;
  status: CourseProgressStatus;
  progressPercentage: number;
  startedAt: string | null;
  completedAt: string | null;
  lastActivityAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserLessonProgress = {
  id: string;
  studentId: string;
  lessonId: string;
  courseId: string;
  status: LessonProgressStatus;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CourseUnlock = {
  id: string;
  studentId: string;
  courseId: string;
  unlockedByCourseId: string | null;
  unlockedByDeliverableId: string | null;
  unlockedByPaymentId: string | null;
  reason: UnlockReason;
  unlockedAt: string;
  createdAt: string;
};

export type CourseUnlockRule = {
  id: string;
  courseId: string;
  requiredPreviousCourseId: string | null;
  requiresApprovedDeliverable: boolean;
  requiresPayment: boolean;
  requiresMentorship: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type ProgressEvent = {
  id: string;
  studentId: string;
  courseId: string | null;
  lessonId: string | null;
  deliverableId: string | null;
  eventType: ProgressEventType;
  metadata: Record<string, unknown>;
  createdAt: string;
};

export type CourseUnlockState = {
  isUnlocked: boolean;
  reason: UnlockReason | "rule_pending" | "no_rule";
  message: string;
  rule?: CourseUnlockRule | null;
  unlock?: CourseUnlock | null;
};

export type CourseProgressItem = {
  course: Course;
  progress: UserCourseProgress | null;
  status: CourseProgressStatus;
  progressPercentage: number;
  completedLessons: number;
  totalRequiredLessons: number;
  unlockState: CourseUnlockState;
};

export type LessonProgressItem = {
  lesson: Lesson;
  progress: UserLessonProgress | null;
  status: LessonProgressStatus;
};

export type StudentProgressSummary = {
  totalCourses: number;
  availableCourses: number;
  lockedCourses: number;
  inProgressCourses: number;
  completedCourses: number;
  averageProgress: number;
  nextCourse: CourseProgressItem | null;
};

export type ProgressActionState = {
  ok: boolean;
  message: string;
  redirectTo?: string;
  entityId?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};
