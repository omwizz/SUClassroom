import { asc, desc, eq } from "drizzle-orm";
import type { DeliverableStatus } from "@/constants/deliverables";
import { hasDatabaseUrl, getDb } from "@/db/client";
import {
  courseUnlockRules,
  courseUnlocks,
  progressEvents,
  userCourseProgress,
  userLessonProgress,
} from "@/db/schema";
import type { CourseProgressStatus, ProgressEventType } from "@/constants/progress";
import type { Course } from "@/types/courses";
import type {
  CourseProgressItem,
  LessonProgressItem,
  CourseUnlock,
  CourseUnlockRule,
  ProgressEvent,
  StudentProgressSummary,
  UserCourseProgress,
  UserLessonProgress,
} from "@/types/progress";
import type {
  CourseUnlockRuleInput,
  UnlockCourseInput,
} from "@/lib/validations/progress";
import { getCourseById, getPublishedCourses } from "@/server/queries/courses";
import {
  getDeliverableRequirementByCourseId,
  getDeliverableWithFiles,
  getStudentCourseDeliverable,
} from "@/server/queries/deliverables";
import { CourseUnlockService } from "@/server/services/course-unlock-service";
import { ProgressService } from "@/server/services/progress-service";

type CourseProgressRow = typeof userCourseProgress.$inferSelect;
type LessonProgressRow = typeof userLessonProgress.$inferSelect;
type UnlockRow = typeof courseUnlocks.$inferSelect;
type UnlockRuleRow = typeof courseUnlockRules.$inferSelect;
type ProgressEventRow = typeof progressEvents.$inferSelect;

function toIso(value: Date | null) {
  return value ? value.toISOString() : null;
}

function mapCourseProgress(row: CourseProgressRow): UserCourseProgress {
  return {
    id: row.id,
    studentId: row.studentId,
    courseId: row.courseId,
    status: row.status,
    progressPercentage: row.progressPercentage,
    startedAt: toIso(row.startedAt),
    completedAt: toIso(row.completedAt),
    lastActivityAt: toIso(row.lastActivityAt),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function mapLessonProgress(row: LessonProgressRow): UserLessonProgress {
  return {
    id: row.id,
    studentId: row.studentId,
    lessonId: row.lessonId,
    courseId: row.courseId,
    status: row.status,
    completedAt: toIso(row.completedAt),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function mapUnlock(row: UnlockRow): CourseUnlock {
  return {
    id: row.id,
    studentId: row.studentId,
    courseId: row.courseId,
    unlockedByCourseId: row.unlockedByCourseId,
    unlockedByDeliverableId: row.unlockedByDeliverableId,
    unlockedByPaymentId: row.unlockedByPaymentId,
    reason: row.reason,
    unlockedAt: row.unlockedAt.toISOString(),
    createdAt: row.createdAt.toISOString(),
  };
}

function mapUnlockRule(row: UnlockRuleRow): CourseUnlockRule {
  return {
    id: row.id,
    courseId: row.courseId,
    requiredPreviousCourseId: row.requiredPreviousCourseId,
    requiresApprovedDeliverable: row.requiresApprovedDeliverable,
    requiresPayment: row.requiresPayment,
    requiresMentorship: row.requiresMentorship,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function mapProgressEvent(row: ProgressEventRow): ProgressEvent {
  return {
    id: row.id,
    studentId: row.studentId,
    courseId: row.courseId,
    lessonId: row.lessonId,
    deliverableId: row.deliverableId,
    eventType: row.eventType,
    metadata: row.metadata,
    createdAt: row.createdAt.toISOString(),
  };
}

async function getCourseProgressRows(studentId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(userCourseProgress)
    .where(eq(userCourseProgress.studentId, studentId));

  return rows.map(mapCourseProgress);
}

async function getLessonProgressRows(studentId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(userLessonProgress)
    .where(eq(userLessonProgress.studentId, studentId));

  return rows.map(mapLessonProgress);
}

async function getUnlockRows(studentId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(courseUnlocks)
    .where(eq(courseUnlocks.studentId, studentId));

  return rows.map(mapUnlock);
}

export async function getUnlockRules() {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(courseUnlockRules)
    .orderBy(asc(courseUnlockRules.sortOrder), asc(courseUnlockRules.createdAt));

  return rows.map(mapUnlockRule);
}

export async function getCourseUnlockRule(courseId: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const db = getDb();
  const [row] = await db
    .select()
    .from(courseUnlockRules)
    .where(eq(courseUnlockRules.courseId, courseId))
    .limit(1);

  return row ? mapUnlockRule(row) : null;
}

function buildCourseProgressItem(input: {
  course: Course;
  progressRows: UserCourseProgress[];
  lessonRows: UserLessonProgress[];
  unlockRows: CourseUnlock[];
  rules: CourseUnlockRule[];
}): CourseProgressItem {
  const progress =
    input.progressRows.find((item) => item.courseId === input.course.id) ?? null;
  const unlock =
    input.unlockRows.find((item) => item.courseId === input.course.id) ?? null;
  const rule = input.rules.find((item) => item.courseId === input.course.id) ?? null;
  const previousProgress = rule?.requiredPreviousCourseId
    ? input.progressRows.find(
        (item) => item.courseId === rule.requiredPreviousCourseId,
      ) ?? null
    : null;
  const unlockState = CourseUnlockService.getUnlockState({
    course: input.course,
    unlock,
    rule,
    previousProgress,
  });
  const requiredLessons = ProgressService.getRequiredLessons(input.course);
  const completedLessons = input.lessonRows.filter(
    (item) =>
      item.courseId === input.course.id &&
      item.status === "completed" &&
      requiredLessons.some((lesson) => lesson.id === item.lessonId),
  ).length;
  const status: CourseProgressStatus = unlockState.isUnlocked
    ? progress?.status ?? "available"
    : "locked";

  return {
    course: input.course,
    progress,
    status,
    progressPercentage: progress?.progressPercentage ?? 0,
    completedLessons,
    totalRequiredLessons: requiredLessons.length,
    unlockState,
  };
}

export async function getStudentCourseProgress(studentId: string) {
  const coursesList = await getPublishedCourses();

  if (!hasDatabaseUrl()) {
    return coursesList.map((course) =>
      buildCourseProgressItem({
        course,
        progressRows: [],
        lessonRows: [],
        unlockRows: [],
        rules: [],
      }),
    );
  }

  const [progressRows, lessonRows, unlockRows, rules] = await Promise.all([
    getCourseProgressRows(studentId),
    getLessonProgressRows(studentId),
    getUnlockRows(studentId),
    getUnlockRules(),
  ]);

  return coursesList.map((course) =>
    buildCourseProgressItem({
      course,
      progressRows,
      lessonRows,
      unlockRows,
      rules,
    }),
  );
}

export async function getCourseProgressStatus(
  studentId: string,
  courseId: string,
) {
  const items = await getStudentCourseProgress(studentId);
  return items.find((item) => item.course.id === courseId) ?? null;
}

export async function getCourseLessonProgress(
  studentId: string,
  courseId: string,
): Promise<LessonProgressItem[]> {
  const course = await getCourseById(courseId);

  if (!course) {
    return [];
  }

  const rows = hasDatabaseUrl() ? await getLessonProgressRows(studentId) : [];
  const lessons = course.modules.flatMap((moduleItem) => moduleItem.lessons);

  return lessons.map((lesson) => {
    const progress =
      rows.find((item) => item.lessonId === lesson.id && item.courseId === courseId) ??
      null;

    return {
      lesson,
      progress,
      status: progress?.status ?? "not_started",
    };
  });
}

export async function getStudentProgressSummary(
  studentId: string,
): Promise<StudentProgressSummary> {
  const items = await getStudentCourseProgress(studentId);
  const averageProgress = items.length
    ? Math.round(
        items.reduce((total, item) => total + item.progressPercentage, 0) /
          items.length,
      )
    : 0;
  const nextCourse =
    items.find((item) => item.status === "in_progress") ??
    items.find((item) => item.status === "pending_review") ??
    items.find((item) => item.status === "available") ??
    null;

  return {
    totalCourses: items.length,
    availableCourses: items.filter((item) => item.status === "available").length,
    lockedCourses: items.filter((item) => item.status === "locked").length,
    inProgressCourses: items.filter((item) =>
      ["in_progress", "pending_review"].includes(item.status),
    ).length,
    completedCourses: items.filter((item) => item.status === "completed").length,
    averageProgress,
    nextCourse,
  };
}

export async function calculateCourseProgress(
  studentId: string,
  courseId: string,
) {
  const course = await getCourseById(courseId);

  if (!course || !hasDatabaseUrl()) {
    return 0;
  }

  const [lessonRows, requirement, deliverable] = await Promise.all([
    getLessonProgressRows(studentId),
    getDeliverableRequirementByCourseId(courseId),
    getStudentCourseDeliverable(studentId, courseId),
  ]);
  const requiredLessons = ProgressService.getRequiredLessons(course);
  const completedLessons = lessonRows.filter(
    (item) =>
      item.courseId === courseId &&
      item.status === "completed" &&
      requiredLessons.some((lesson) => lesson.id === item.lessonId),
  ).length;

  return ProgressService.calculateCourseProgress({
    completedLessons,
    totalRequiredLessons: requiredLessons.length,
    hasApprovedDeliverable: deliverable?.status === "approved",
    hasRequiredDeliverable: Boolean(requirement?.isRequired),
  });
}

export async function startCourseProgress(
  studentId: string,
  courseId: string,
) {
  const db = getDb();
  const now = new Date();
  const percent = await calculateCourseProgress(studentId, courseId);
  const [row] = await db
    .insert(userCourseProgress)
    .values({
      studentId,
      courseId,
      status: "in_progress",
      progressPercentage: percent,
      startedAt: now,
      lastActivityAt: now,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: [userCourseProgress.studentId, userCourseProgress.courseId],
      set: {
        status: "in_progress",
        progressPercentage: percent,
        lastActivityAt: now,
        updatedAt: now,
      },
    })
    .returning();

  await recordProgressEvent({
    studentId,
    courseId,
    eventType: "course_started",
  });

  return mapCourseProgress(row);
}

export async function markLessonCompletedProgress(input: {
  studentId: string;
  courseId: string;
  lessonId: string;
}) {
  const db = getDb();
  const now = new Date();
  const [row] = await db
    .insert(userLessonProgress)
    .values({
      studentId: input.studentId,
      courseId: input.courseId,
      lessonId: input.lessonId,
      status: ProgressService.lessonStatusAfterCompletion(),
      completedAt: now,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: [userLessonProgress.studentId, userLessonProgress.lessonId],
      set: {
        status: "completed",
        completedAt: now,
        updatedAt: now,
      },
    })
    .returning();

  const percentage = await calculateCourseProgress(input.studentId, input.courseId);

  await db
    .insert(userCourseProgress)
    .values({
      studentId: input.studentId,
      courseId: input.courseId,
      status: "in_progress",
      progressPercentage: percentage,
      startedAt: now,
      lastActivityAt: now,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: [userCourseProgress.studentId, userCourseProgress.courseId],
      set: {
        status: "in_progress",
        progressPercentage: percentage,
        lastActivityAt: now,
        updatedAt: now,
      },
    });

  await recordProgressEvent({
    studentId: input.studentId,
    courseId: input.courseId,
    lessonId: input.lessonId,
    eventType: "lesson_completed",
  });

  return mapLessonProgress(row);
}

export async function updateCourseProgressAfterDeliverable(input: {
  studentId: string;
  courseId: string;
  deliverableId: string;
  status: DeliverableStatus;
}) {
  const db = getDb();
  const now = new Date();
  const percentage =
    input.status === "approved"
      ? 100
      : await calculateCourseProgress(input.studentId, input.courseId);
  const nextStatus = ProgressService.statusAfterDeliverable(input.status);

  const [row] = await db
    .insert(userCourseProgress)
    .values({
      studentId: input.studentId,
      courseId: input.courseId,
      status: nextStatus,
      progressPercentage: percentage,
      startedAt: now,
      completedAt: nextStatus === "completed" ? now : null,
      lastActivityAt: now,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: [userCourseProgress.studentId, userCourseProgress.courseId],
      set: {
        status: nextStatus,
        progressPercentage: percentage,
        completedAt: nextStatus === "completed" ? now : null,
        lastActivityAt: now,
        updatedAt: now,
      },
    })
    .returning();

  const eventType: ProgressEventType =
    input.status === "approved"
      ? "deliverable_approved"
      : input.status === "submitted" || input.status === "resubmitted"
        ? "deliverable_submitted"
        : "deliverable_rejected";

  await recordProgressEvent({
    studentId: input.studentId,
    courseId: input.courseId,
    deliverableId: input.deliverableId,
    eventType,
    metadata: { deliverableStatus: input.status },
  });

  if (nextStatus === "completed") {
    await recordProgressEvent({
      studentId: input.studentId,
      courseId: input.courseId,
      deliverableId: input.deliverableId,
      eventType: "course_completed",
    });
  }

  return mapCourseProgress(row);
}

export async function unlockCourseForStudent(input: UnlockCourseInput) {
  const db = getDb();
  const [row] = await db
    .insert(courseUnlocks)
    .values({
      studentId: input.studentId,
      courseId: input.courseId,
      unlockedByCourseId: input.unlockedByCourseId ?? null,
      unlockedByDeliverableId: input.unlockedByDeliverableId ?? null,
      unlockedByPaymentId: input.unlockedByPaymentId ?? null,
      reason: input.reason,
    })
    .onConflictDoUpdate({
      target: [courseUnlocks.studentId, courseUnlocks.courseId],
      set: {
        unlockedByCourseId: input.unlockedByCourseId ?? null,
        unlockedByDeliverableId: input.unlockedByDeliverableId ?? null,
        unlockedByPaymentId: input.unlockedByPaymentId ?? null,
        reason: input.reason,
        unlockedAt: new Date(),
      },
    })
    .returning();

  await recordProgressEvent({
    studentId: input.studentId,
    courseId: input.courseId,
    deliverableId: input.unlockedByDeliverableId ?? undefined,
    eventType: "course_unlocked",
    metadata: { reason: input.reason },
  });

  return mapUnlock(row);
}

export async function createCourseUnlockRule(input: CourseUnlockRuleInput) {
  return upsertCourseUnlockRule(input);
}

export async function updateCourseUnlockRule(input: CourseUnlockRuleInput) {
  return upsertCourseUnlockRule(input);
}

export async function upsertCourseUnlockRule(input: CourseUnlockRuleInput) {
  const db = getDb();
  const now = new Date();
  const [row] = await db
    .insert(courseUnlockRules)
    .values({
      courseId: input.courseId,
      requiredPreviousCourseId: input.requiredPreviousCourseId ?? null,
      requiresApprovedDeliverable: input.requiresApprovedDeliverable,
      requiresPayment: input.requiresPayment,
      requiresMentorship: input.requiresMentorship,
      sortOrder: input.sortOrder,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: courseUnlockRules.courseId,
      set: {
        requiredPreviousCourseId: input.requiredPreviousCourseId ?? null,
        requiresApprovedDeliverable: input.requiresApprovedDeliverable,
        requiresPayment: input.requiresPayment,
        requiresMentorship: input.requiresMentorship,
        sortOrder: input.sortOrder,
        updatedAt: now,
      },
    })
    .returning();

  return mapUnlockRule(row);
}

export async function evaluateNextCourseUnlock(input: {
  studentId: string;
  completedCourseId: string;
  deliverableId?: string | null;
}) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(courseUnlockRules)
    .where(eq(courseUnlockRules.requiredPreviousCourseId, input.completedCourseId))
    .orderBy(asc(courseUnlockRules.sortOrder), asc(courseUnlockRules.createdAt));
  const created: CourseUnlock[] = [];

  for (const row of rows) {
    const rule = mapUnlockRule(row);

    if (rule.requiresPayment || rule.requiresMentorship) {
      continue;
    }

    const unlock = await unlockCourseForStudent({
      studentId: input.studentId,
      courseId: rule.courseId,
      unlockedByCourseId: input.completedCourseId,
      unlockedByDeliverableId: input.deliverableId ?? null,
      reason: "previous_course_completed",
    });
    created.push(unlock);
  }

  return created;
}

export async function manualUnlockCourse(input: {
  studentId: string;
  courseId: string;
}) {
  return unlockCourseForStudent({
    ...input,
    reason: "admin_manual",
  });
}

export async function recordProgressEvent(input: {
  studentId: string;
  eventType: ProgressEventType;
  courseId?: string | null;
  lessonId?: string | null;
  deliverableId?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const db = getDb();
  const [row] = await db
    .insert(progressEvents)
    .values({
      studentId: input.studentId,
      courseId: input.courseId ?? null,
      lessonId: input.lessonId ?? null,
      deliverableId: input.deliverableId ?? null,
      eventType: input.eventType,
      metadata: {
        title: ProgressService.eventTitle(input.eventType),
        ...(input.metadata ?? {}),
      },
    })
    .returning();

  return mapProgressEvent(row);
}

export async function getStudentProgressEvents(
  studentId: string,
  limit = 20,
) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(progressEvents)
    .where(eq(progressEvents.studentId, studentId))
    .orderBy(desc(progressEvents.createdAt))
    .limit(limit);

  return rows.map(mapProgressEvent);
}

export async function getCourseByLessonId(lessonId: string) {
  const published = await getPublishedCourses();
  return (
    published.find((course) =>
      course.modules.some((moduleItem) =>
        moduleItem.lessons.some((lesson) => lesson.id === lessonId),
      ),
    ) ?? null
  );
}

export async function getDeliverableProgressContext(deliverableId: string) {
  const deliverable = await getDeliverableWithFiles(deliverableId);

  if (!deliverable) {
    return null;
  }

  const course = await getCourseById(deliverable.courseId);

  if (!course) {
    return null;
  }

  return { deliverable, course };
}
