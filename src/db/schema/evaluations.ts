import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {
  ASSIGNMENT_STATUSES,
  EVALUATION_DECISIONS,
  EVALUATION_STATUSES,
  FEEDBACK_PRIORITIES,
  NOTIFICATION_TYPES,
} from "@/constants/evaluations";
import { profiles } from "@/db/schema/auth";
import { courses } from "@/db/schema/courses";
import { deliverables } from "@/db/schema/deliverables";
import { studentProjects } from "@/db/schema/projects";

export const assignmentStatusEnum = pgEnum(
  "assignment_status",
  ASSIGNMENT_STATUSES,
);
export const evaluationStatusEnum = pgEnum(
  "evaluation_status",
  EVALUATION_STATUSES,
);
export const evaluationDecisionEnum = pgEnum(
  "evaluation_decision",
  EVALUATION_DECISIONS,
);
export const feedbackPriorityEnum = pgEnum(
  "feedback_priority",
  FEEDBACK_PRIORITIES,
);
export const notificationTypeEnum = pgEnum(
  "notification_type",
  NOTIFICATION_TYPES,
);

export const mentorAssignments = pgTable(
  "mentor_assignments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    mentorId: uuid("mentor_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    studentId: uuid("student_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    projectId: uuid("project_id").references(() => studentProjects.id, {
      onDelete: "set null",
    }),
    courseId: uuid("course_id").references(() => courses.id, {
      onDelete: "set null",
    }),
    assignedBy: uuid("assigned_by").references(() => profiles.id, {
      onDelete: "set null",
    }),
    status: assignmentStatusEnum("status").default("active").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("mentor_assignments_mentor_idx").on(table.mentorId),
    index("mentor_assignments_student_idx").on(table.studentId),
    index("mentor_assignments_project_idx").on(table.projectId),
    index("mentor_assignments_course_idx").on(table.courseId),
    index("mentor_assignments_status_idx").on(table.status),
  ],
);

export const evaluationCriteria = pgTable(
  "evaluation_criteria",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 160 }).notNull(),
    description: text("description"),
    maxScore: integer("max_score").default(5).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    isRequired: boolean("is_required").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("evaluation_criteria_course_idx").on(table.courseId),
    index("evaluation_criteria_sort_idx").on(table.sortOrder),
  ],
);

export const evaluations = pgTable(
  "evaluations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    deliverableId: uuid("deliverable_id")
      .notNull()
      .references(() => deliverables.id, { onDelete: "cascade" }),
    mentorId: uuid("mentor_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    status: evaluationStatusEnum("status").default("pending").notNull(),
    decision: evaluationDecisionEnum("decision"),
    score: integer("score"),
    rubricSnapshot: jsonb("rubric_snapshot").$type<Record<string, unknown> | null>(),
    reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("evaluations_deliverable_idx").on(table.deliverableId),
    index("evaluations_mentor_idx").on(table.mentorId),
    index("evaluations_status_idx").on(table.status),
    index("evaluations_reviewed_idx").on(table.reviewedAt),
  ],
);

export const feedback = pgTable(
  "feedback",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    evaluationId: uuid("evaluation_id")
      .notNull()
      .references(() => evaluations.id, { onDelete: "cascade" }),
    deliverableId: uuid("deliverable_id")
      .notNull()
      .references(() => deliverables.id, { onDelete: "cascade" }),
    authorId: uuid("author_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    summary: text("summary").notNull(),
    strengths: text("strengths"),
    improvements: text("improvements"),
    nextSteps: text("next_steps").notNull(),
    priority: feedbackPriorityEnum("priority").default("medium").notNull(),
    isVisibleToStudent: boolean("is_visible_to_student")
      .default(true)
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("feedback_evaluation_idx").on(table.evaluationId),
    index("feedback_deliverable_idx").on(table.deliverableId),
    index("feedback_author_idx").on(table.authorId),
    index("feedback_visible_idx").on(table.isVisibleToStudent),
  ],
);

export const evaluationScores = pgTable(
  "evaluation_scores",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    evaluationId: uuid("evaluation_id")
      .notNull()
      .references(() => evaluations.id, { onDelete: "cascade" }),
    criteriaId: uuid("criteria_id")
      .notNull()
      .references(() => evaluationCriteria.id, { onDelete: "cascade" }),
    score: integer("score").notNull(),
    comment: text("comment"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("evaluation_scores_evaluation_idx").on(table.evaluationId),
    index("evaluation_scores_criteria_idx").on(table.criteriaId),
  ],
);

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    type: notificationTypeEnum("type").notNull(),
    title: varchar("title", { length: 160 }).notNull(),
    message: text("message").notNull(),
    href: text("href"),
    readAt: timestamp("read_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("notifications_user_idx").on(table.userId),
    index("notifications_read_idx").on(table.readAt),
    index("notifications_type_idx").on(table.type),
  ],
);

export const mentorAssignmentRelations = relations(
  mentorAssignments,
  ({ one }) => ({
    mentor: one(profiles, {
      fields: [mentorAssignments.mentorId],
      references: [profiles.id],
    }),
    student: one(profiles, {
      fields: [mentorAssignments.studentId],
      references: [profiles.id],
    }),
    project: one(studentProjects, {
      fields: [mentorAssignments.projectId],
      references: [studentProjects.id],
    }),
    course: one(courses, {
      fields: [mentorAssignments.courseId],
      references: [courses.id],
    }),
    assigner: one(profiles, {
      fields: [mentorAssignments.assignedBy],
      references: [profiles.id],
    }),
  }),
);

export const evaluationCriteriaRelations = relations(
  evaluationCriteria,
  ({ one, many }) => ({
    course: one(courses, {
      fields: [evaluationCriteria.courseId],
      references: [courses.id],
    }),
    scores: many(evaluationScores),
  }),
);

export const evaluationRelations = relations(
  evaluations,
  ({ one, many }) => ({
    deliverable: one(deliverables, {
      fields: [evaluations.deliverableId],
      references: [deliverables.id],
    }),
    mentor: one(profiles, {
      fields: [evaluations.mentorId],
      references: [profiles.id],
    }),
    feedback: many(feedback),
    scores: many(evaluationScores),
  }),
);

export const feedbackRelations = relations(feedback, ({ one }) => ({
  evaluation: one(evaluations, {
    fields: [feedback.evaluationId],
    references: [evaluations.id],
  }),
  deliverable: one(deliverables, {
    fields: [feedback.deliverableId],
    references: [deliverables.id],
  }),
  author: one(profiles, {
    fields: [feedback.authorId],
    references: [profiles.id],
  }),
}));

export const evaluationScoreRelations = relations(
  evaluationScores,
  ({ one }) => ({
    evaluation: one(evaluations, {
      fields: [evaluationScores.evaluationId],
      references: [evaluations.id],
    }),
    criteria: one(evaluationCriteria, {
      fields: [evaluationScores.criteriaId],
      references: [evaluationCriteria.id],
    }),
  }),
);

export const notificationRelations = relations(notifications, ({ one }) => ({
  user: one(profiles, {
    fields: [notifications.userId],
    references: [profiles.id],
  }),
}));
