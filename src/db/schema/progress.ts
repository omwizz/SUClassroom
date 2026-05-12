import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import {
  COURSE_PROGRESS_STATUSES,
  LESSON_PROGRESS_STATUSES,
  PROGRESS_EVENT_TYPES,
  UNLOCK_REASONS,
} from "@/constants/progress";
import { profiles } from "@/db/schema/auth";
import { courses, lessons } from "@/db/schema/courses";
import { deliverables } from "@/db/schema/deliverables";

export const courseProgressStatusEnum = pgEnum(
  "course_progress_status",
  COURSE_PROGRESS_STATUSES,
);
export const lessonProgressStatusEnum = pgEnum(
  "lesson_progress_status",
  LESSON_PROGRESS_STATUSES,
);
export const progressEventTypeEnum = pgEnum(
  "progress_event_type",
  PROGRESS_EVENT_TYPES,
);
export const unlockReasonEnum = pgEnum("unlock_reason", UNLOCK_REASONS);

export const userCourseProgress = pgTable(
  "user_course_progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    studentId: uuid("student_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    status: courseProgressStatusEnum("status").default("available").notNull(),
    progressPercentage: integer("progress_percentage").default(0).notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    lastActivityAt: timestamp("last_activity_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("user_course_progress_student_course_idx").on(
      table.studentId,
      table.courseId,
    ),
    index("user_course_progress_student_idx").on(table.studentId),
    index("user_course_progress_course_idx").on(table.courseId),
    index("user_course_progress_status_idx").on(table.status),
  ],
);

export const userLessonProgress = pgTable(
  "user_lesson_progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    studentId: uuid("student_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    status: lessonProgressStatusEnum("status").default("not_started").notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("user_lesson_progress_student_lesson_idx").on(
      table.studentId,
      table.lessonId,
    ),
    index("user_lesson_progress_student_idx").on(table.studentId),
    index("user_lesson_progress_course_idx").on(table.courseId),
    index("user_lesson_progress_status_idx").on(table.status),
  ],
);

export const courseUnlocks = pgTable(
  "course_unlocks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    studentId: uuid("student_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    unlockedByCourseId: uuid("unlocked_by_course_id").references(
      () => courses.id,
      { onDelete: "set null" },
    ),
    unlockedByDeliverableId: uuid("unlocked_by_deliverable_id").references(
      () => deliverables.id,
      { onDelete: "set null" },
    ),
    unlockedByPaymentId: uuid("unlocked_by_payment_id"),
    reason: unlockReasonEnum("reason").notNull(),
    unlockedAt: timestamp("unlocked_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("course_unlocks_student_course_idx").on(
      table.studentId,
      table.courseId,
    ),
    index("course_unlocks_student_idx").on(table.studentId),
    index("course_unlocks_course_idx").on(table.courseId),
    index("course_unlocks_reason_idx").on(table.reason),
  ],
);

export const courseUnlockRules = pgTable(
  "course_unlock_rules",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    requiredPreviousCourseId: uuid("required_previous_course_id").references(
      () => courses.id,
      { onDelete: "set null" },
    ),
    requiresApprovedDeliverable: boolean("requires_approved_deliverable")
      .default(true)
      .notNull(),
    requiresPayment: boolean("requires_payment").default(false).notNull(),
    requiresMentorship: boolean("requires_mentorship").default(false).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("course_unlock_rules_course_idx").on(table.courseId),
    index("course_unlock_rules_previous_course_idx").on(
      table.requiredPreviousCourseId,
    ),
    index("course_unlock_rules_sort_idx").on(table.sortOrder),
  ],
);

export const progressEvents = pgTable(
  "progress_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    studentId: uuid("student_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    courseId: uuid("course_id").references(() => courses.id, {
      onDelete: "set null",
    }),
    lessonId: uuid("lesson_id").references(() => lessons.id, {
      onDelete: "set null",
    }),
    deliverableId: uuid("deliverable_id").references(() => deliverables.id, {
      onDelete: "set null",
    }),
    eventType: progressEventTypeEnum("event_type").notNull(),
    metadata: jsonb("metadata")
      .$type<Record<string, unknown>>()
      .default(sql`'{}'::jsonb`)
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("progress_events_student_idx").on(table.studentId),
    index("progress_events_course_idx").on(table.courseId),
    index("progress_events_lesson_idx").on(table.lessonId),
    index("progress_events_deliverable_idx").on(table.deliverableId),
    index("progress_events_type_idx").on(table.eventType),
    index("progress_events_created_idx").on(table.createdAt),
  ],
);

export const userCourseProgressRelations = relations(
  userCourseProgress,
  ({ one }) => ({
    student: one(profiles, {
      fields: [userCourseProgress.studentId],
      references: [profiles.id],
    }),
    course: one(courses, {
      fields: [userCourseProgress.courseId],
      references: [courses.id],
    }),
  }),
);

export const userLessonProgressRelations = relations(
  userLessonProgress,
  ({ one }) => ({
    student: one(profiles, {
      fields: [userLessonProgress.studentId],
      references: [profiles.id],
    }),
    lesson: one(lessons, {
      fields: [userLessonProgress.lessonId],
      references: [lessons.id],
    }),
    course: one(courses, {
      fields: [userLessonProgress.courseId],
      references: [courses.id],
    }),
  }),
);

export const courseUnlockRelations = relations(courseUnlocks, ({ one }) => ({
  student: one(profiles, {
    fields: [courseUnlocks.studentId],
    references: [profiles.id],
  }),
  course: one(courses, {
    fields: [courseUnlocks.courseId],
    references: [courses.id],
  }),
  unlockedByCourse: one(courses, {
    fields: [courseUnlocks.unlockedByCourseId],
    references: [courses.id],
  }),
  unlockedByDeliverable: one(deliverables, {
    fields: [courseUnlocks.unlockedByDeliverableId],
    references: [deliverables.id],
  }),
}));

export const courseUnlockRuleRelations = relations(
  courseUnlockRules,
  ({ one }) => ({
    course: one(courses, {
      fields: [courseUnlockRules.courseId],
      references: [courses.id],
    }),
    requiredPreviousCourse: one(courses, {
      fields: [courseUnlockRules.requiredPreviousCourseId],
      references: [courses.id],
    }),
  }),
);

export const progressEventRelations = relations(progressEvents, ({ one }) => ({
  student: one(profiles, {
    fields: [progressEvents.studentId],
    references: [profiles.id],
  }),
  course: one(courses, {
    fields: [progressEvents.courseId],
    references: [courses.id],
  }),
  lesson: one(lessons, {
    fields: [progressEvents.lessonId],
    references: [lessons.id],
  }),
  deliverable: one(deliverables, {
    fields: [progressEvents.deliverableId],
    references: [deliverables.id],
  }),
}));
