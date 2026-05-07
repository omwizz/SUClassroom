import { relations } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {
  BUSINESS_AREAS,
  EXPERIENCE_LEVELS,
  PROJECT_STAGES,
  PROJECT_STATUSES,
  USER_TYPES,
} from "@/constants/projects";
import { profiles } from "@/db/schema/auth";

export const userTypeEnum = pgEnum("user_type", USER_TYPES);
export const experienceLevelEnum = pgEnum(
  "experience_level",
  EXPERIENCE_LEVELS,
);
export const projectStageEnum = pgEnum("project_stage", PROJECT_STAGES);
export const projectStatusEnum = pgEnum("project_status", PROJECT_STATUSES);
export const businessAreaEnum = pgEnum("business_area", BUSINESS_AREAS);

export const studentOnboarding = pgTable(
  "student_onboarding",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    studentId: uuid("student_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    userType: userTypeEnum("user_type").notNull(),
    experienceLevel: experienceLevelEnum("experience_level").notNull(),
    mainGoal: text("main_goal").notNull(),
    businessArea: businessAreaEnum("business_area").notNull(),
    projectStage: projectStageEnum("project_stage").notNull(),
    biggestChallenge: text("biggest_challenge"),
    motivation: text("motivation"),
    completedAt: timestamp("completed_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("student_onboarding_student_idx").on(table.studentId),
    index("student_onboarding_completed_idx").on(table.completedAt),
  ],
);

export const studentProjects = pgTable(
  "student_projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    studentId: uuid("student_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 120 }).notNull(),
    slug: varchar("slug", { length: 140 }).notNull(),
    description: text("description").notNull(),
    problem: text("problem").notNull(),
    solution: text("solution"),
    targetAudience: text("target_audience").notNull(),
    currentStage: projectStageEnum("current_stage").notNull(),
    businessArea: businessAreaEnum("business_area").notNull(),
    socialImpact: text("social_impact"),
    status: projectStatusEnum("status").default("active").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("student_projects_student_slug_idx").on(
      table.studentId,
      table.slug,
    ),
    index("student_projects_student_idx").on(table.studentId),
    index("student_projects_status_idx").on(table.status),
    index("student_projects_stage_idx").on(table.currentStage),
  ],
);

export const studentOnboardingRelations = relations(
  studentOnboarding,
  ({ one }) => ({
    student: one(profiles, {
      fields: [studentOnboarding.studentId],
      references: [profiles.id],
    }),
  }),
);

export const studentProjectRelations = relations(
  studentProjects,
  ({ one }) => ({
    student: one(profiles, {
      fields: [studentProjects.studentId],
      references: [profiles.id],
    }),
  }),
);

