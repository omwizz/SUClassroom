import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {
  DELIVERABLE_STATUSES,
  RESOURCE_FILE_TYPES,
  type ResourceFileType,
} from "@/constants/deliverables";
import { profiles } from "@/db/schema/auth";
import { courses } from "@/db/schema/courses";
import { studentProjects } from "@/db/schema/projects";

export const deliverableStatusEnum = pgEnum(
  "deliverable_status",
  DELIVERABLE_STATUSES,
);
export const resourceFileTypeEnum = pgEnum(
  "resource_file_type",
  RESOURCE_FILE_TYPES,
);

export const courseDeliverableRequirements = pgTable(
  "course_deliverable_requirements",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 180 }).notNull(),
    description: text("description"),
    instructions: text("instructions").notNull(),
    requiredFileTypes: resourceFileTypeEnum("required_file_types")
      .array()
      .default(sql`ARRAY[]::resource_file_type[]`)
      .notNull(),
    maxFiles: integer("max_files").default(5).notNull(),
    isRequired: boolean("is_required").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("course_deliverable_requirements_course_idx").on(table.courseId),
    index("course_deliverable_requirements_required_idx").on(table.isRequired),
  ],
);

export const deliverables = pgTable(
  "deliverables",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => studentProjects.id, { onDelete: "cascade" }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    studentId: uuid("student_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 180 }).notNull(),
    description: text("description").notNull(),
    instructionsSnapshot: text("instructions_snapshot"),
    status: deliverableStatusEnum("status").default("draft").notNull(),
    version: integer("version").default(1).notNull(),
    submittedAt: timestamp("submitted_at", { withTimezone: true }),
    lastResubmittedAt: timestamp("last_resubmitted_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("deliverables_project_idx").on(table.projectId),
    index("deliverables_course_idx").on(table.courseId),
    index("deliverables_student_idx").on(table.studentId),
    index("deliverables_status_idx").on(table.status),
    index("deliverables_submitted_idx").on(table.submittedAt),
  ],
);

export const deliverableFiles = pgTable(
  "deliverable_files",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    deliverableId: uuid("deliverable_id")
      .notNull()
      .references(() => deliverables.id, { onDelete: "cascade" }),
    uploadedBy: uuid("uploaded_by")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    fileName: varchar("file_name", { length: 240 }).notNull(),
    filePath: text("file_path").notNull(),
    fileUrl: text("file_url"),
    fileType: resourceFileTypeEnum("file_type").default("other").notNull(),
    mimeType: varchar("mime_type", { length: 160 }).notNull(),
    sizeBytes: integer("size_bytes").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("deliverable_files_deliverable_idx").on(table.deliverableId),
    index("deliverable_files_uploaded_by_idx").on(table.uploadedBy),
    uniqueIndex("deliverable_files_path_idx").on(table.filePath),
  ],
);

export const deliverableLinks = pgTable(
  "deliverable_links",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    deliverableId: uuid("deliverable_id")
      .notNull()
      .references(() => deliverables.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 160 }).notNull(),
    url: text("url").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("deliverable_links_deliverable_idx").on(table.deliverableId)],
);

export const deliverableVersions = pgTable(
  "deliverable_versions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    deliverableId: uuid("deliverable_id")
      .notNull()
      .references(() => deliverables.id, { onDelete: "cascade" }),
    version: integer("version").notNull(),
    title: varchar("title", { length: 180 }).notNull(),
    description: text("description").notNull(),
    status: deliverableStatusEnum("status").notNull(),
    snapshot: jsonb("snapshot").$type<Record<string, unknown>>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("deliverable_versions_deliverable_version_idx").on(
      table.deliverableId,
      table.version,
    ),
    index("deliverable_versions_deliverable_idx").on(table.deliverableId),
  ],
);

export const courseDeliverableRequirementRelations = relations(
  courseDeliverableRequirements,
  ({ one }) => ({
    course: one(courses, {
      fields: [courseDeliverableRequirements.courseId],
      references: [courses.id],
    }),
  }),
);

export const deliverableRelations = relations(
  deliverables,
  ({ many, one }) => ({
    project: one(studentProjects, {
      fields: [deliverables.projectId],
      references: [studentProjects.id],
    }),
    course: one(courses, {
      fields: [deliverables.courseId],
      references: [courses.id],
    }),
    student: one(profiles, {
      fields: [deliverables.studentId],
      references: [profiles.id],
    }),
    files: many(deliverableFiles),
    links: many(deliverableLinks),
    versions: many(deliverableVersions),
  }),
);

export const deliverableFileRelations = relations(
  deliverableFiles,
  ({ one }) => ({
    deliverable: one(deliverables, {
      fields: [deliverableFiles.deliverableId],
      references: [deliverables.id],
    }),
    uploader: one(profiles, {
      fields: [deliverableFiles.uploadedBy],
      references: [profiles.id],
    }),
  }),
);

export const deliverableLinkRelations = relations(
  deliverableLinks,
  ({ one }) => ({
    deliverable: one(deliverables, {
      fields: [deliverableLinks.deliverableId],
      references: [deliverables.id],
    }),
  }),
);

export const deliverableVersionRelations = relations(
  deliverableVersions,
  ({ one }) => ({
    deliverable: one(deliverables, {
      fields: [deliverableVersions.deliverableId],
      references: [deliverables.id],
    }),
  }),
);

export type RequiredFileTypes = ResourceFileType[];

