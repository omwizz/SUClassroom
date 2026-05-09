import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {
  COURSE_LEVELS,
  COURSE_STATUSES,
  LESSON_TYPES,
  RESOURCE_TYPES,
  VIDEO_PROVIDERS,
} from "@/constants/courses";
import { profiles } from "@/db/schema/auth";

export const courseStatusEnum = pgEnum("course_status", COURSE_STATUSES);
export const courseLevelEnum = pgEnum("course_level", COURSE_LEVELS);
export const lessonTypeEnum = pgEnum("lesson_type", LESSON_TYPES);
export const videoProviderEnum = pgEnum("video_provider", VIDEO_PROVIDERS);
export const resourceTypeEnum = pgEnum("resource_type", RESOURCE_TYPES);

export const courseCategories = pgTable(
  "course_categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    slug: varchar("slug", { length: 140 }).notNull(),
    description: text("description"),
    color: varchar("color", { length: 32 }),
    icon: varchar("icon", { length: 80 }),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("course_categories_slug_idx").on(table.slug),
    index("course_categories_active_idx").on(table.isActive),
  ],
);

export const courses = pgTable(
  "courses",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    categoryId: uuid("category_id").references(() => courseCategories.id, {
      onDelete: "set null",
    }),
    title: varchar("title", { length: 180 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull(),
    subtitle: varchar("subtitle", { length: 240 }),
    description: text("description"),
    objective: text("objective"),
    expectedResult: text("expected_result"),
    targetAudience: text("target_audience"),
    level: courseLevelEnum("level").default("beginner").notNull(),
    status: courseStatusEnum("status").default("draft").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    estimatedDurationMinutes: integer("estimated_duration_minutes")
      .default(0)
      .notNull(),
    isFree: boolean("is_free").default(false).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdBy: uuid("created_by").references(() => profiles.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("courses_slug_idx").on(table.slug),
    index("courses_category_idx").on(table.categoryId),
    index("courses_created_by_idx").on(table.createdBy),
    index("courses_status_idx").on(table.status),
    index("courses_sort_order_idx").on(table.sortOrder),
  ],
);

export const courseModules = pgTable(
  "course_modules",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 180 }).notNull(),
    description: text("description"),
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
    index("course_modules_course_idx").on(table.courseId),
    index("course_modules_sort_order_idx").on(table.sortOrder),
  ],
);

export const lessons = pgTable(
  "lessons",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    moduleId: uuid("module_id")
      .notNull()
      .references(() => courseModules.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 180 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull(),
    description: text("description"),
    content: text("content"),
    videoUrl: text("video_url"),
    videoProvider: videoProviderEnum("video_provider").default("none").notNull(),
    estimatedDurationMinutes: integer("estimated_duration_minutes")
      .default(0)
      .notNull(),
    lessonType: lessonTypeEnum("lesson_type").default("mixed").notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    isPreview: boolean("is_preview").default(false).notNull(),
    isRequired: boolean("is_required").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("lessons_module_slug_idx").on(table.moduleId, table.slug),
    index("lessons_module_idx").on(table.moduleId),
    index("lessons_sort_order_idx").on(table.sortOrder),
  ],
);

export const lessonResources = pgTable(
  "lesson_resources",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 180 }).notNull(),
    description: text("description"),
    resourceType: resourceTypeEnum("resource_type").default("other").notNull(),
    fileUrl: text("file_url"),
    externalUrl: text("external_url"),
    sortOrder: integer("sort_order").default(0).notNull(),
    isDownloadable: boolean("is_downloadable").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("lesson_resources_lesson_idx").on(table.lessonId),
    index("lesson_resources_sort_order_idx").on(table.sortOrder),
  ],
);

export const courseCategoryRelations = relations(
  courseCategories,
  ({ many }) => ({
    courses: many(courses),
  }),
);

export const courseRelations = relations(courses, ({ many, one }) => ({
  category: one(courseCategories, {
    fields: [courses.categoryId],
    references: [courseCategories.id],
  }),
  creator: one(profiles, {
    fields: [courses.createdBy],
    references: [profiles.id],
  }),
  modules: many(courseModules),
}));

export const courseModuleRelations = relations(
  courseModules,
  ({ many, one }) => ({
    course: one(courses, {
      fields: [courseModules.courseId],
      references: [courses.id],
    }),
    lessons: many(lessons),
  }),
);

export const lessonRelations = relations(lessons, ({ many, one }) => ({
  module: one(courseModules, {
    fields: [lessons.moduleId],
    references: [courseModules.id],
  }),
  resources: many(lessonResources),
}));

export const lessonResourceRelations = relations(lessonResources, ({ one }) => ({
  lesson: one(lessons, {
    fields: [lessonResources.lessonId],
    references: [lessons.id],
  }),
}));
