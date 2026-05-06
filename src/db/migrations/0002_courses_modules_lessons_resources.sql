CREATE TYPE "course_status" AS ENUM ('draft', 'published', 'archived');
CREATE TYPE "course_level" AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE "lesson_type" AS ENUM ('video', 'text', 'mixed', 'assignment_intro');
CREATE TYPE "video_provider" AS ENUM ('youtube', 'vimeo', 'external', 'storage', 'none');
CREATE TYPE "resource_type" AS ENUM ('pdf', 'document', 'spreadsheet', 'presentation', 'template', 'link', 'image', 'other');

CREATE TABLE IF NOT EXISTS "course_categories" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" varchar(120) NOT NULL,
  "slug" varchar(140) NOT NULL,
  "description" text,
  "color" varchar(32),
  "icon" varchar(80),
  "is_active" boolean DEFAULT true NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "courses" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "category_id" uuid REFERENCES "course_categories"("id") ON DELETE set null,
  "title" varchar(180) NOT NULL,
  "slug" varchar(200) NOT NULL,
  "subtitle" varchar(240),
  "description" text,
  "objective" text,
  "expected_result" text,
  "target_audience" text,
  "level" "course_level" DEFAULT 'beginner' NOT NULL,
  "status" "course_status" DEFAULT 'draft' NOT NULL,
  "thumbnail_url" text,
  "estimated_duration_minutes" integer DEFAULT 0 NOT NULL,
  "is_free" boolean DEFAULT false NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "created_by" uuid REFERENCES "profiles"("id") ON DELETE set null,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "published_at" timestamp with time zone
);

CREATE TABLE IF NOT EXISTS "course_modules" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "course_id" uuid NOT NULL REFERENCES "courses"("id") ON DELETE cascade,
  "title" varchar(180) NOT NULL,
  "description" text,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "is_required" boolean DEFAULT true NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "lessons" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "module_id" uuid NOT NULL REFERENCES "course_modules"("id") ON DELETE cascade,
  "title" varchar(180) NOT NULL,
  "slug" varchar(200) NOT NULL,
  "description" text,
  "content" text,
  "video_url" text,
  "video_provider" "video_provider" DEFAULT 'none' NOT NULL,
  "estimated_duration_minutes" integer DEFAULT 0 NOT NULL,
  "lesson_type" "lesson_type" DEFAULT 'mixed' NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "is_preview" boolean DEFAULT false NOT NULL,
  "is_required" boolean DEFAULT true NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "lesson_resources" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "lesson_id" uuid NOT NULL REFERENCES "lessons"("id") ON DELETE cascade,
  "title" varchar(180) NOT NULL,
  "description" text,
  "resource_type" "resource_type" DEFAULT 'other' NOT NULL,
  "file_url" text,
  "external_url" text,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "is_downloadable" boolean DEFAULT true NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "course_categories_slug_idx" ON "course_categories" ("slug");
CREATE INDEX IF NOT EXISTS "course_categories_active_idx" ON "course_categories" ("is_active");
CREATE UNIQUE INDEX IF NOT EXISTS "courses_slug_idx" ON "courses" ("slug");
CREATE INDEX IF NOT EXISTS "courses_category_idx" ON "courses" ("category_id");
CREATE INDEX IF NOT EXISTS "courses_status_idx" ON "courses" ("status");
CREATE INDEX IF NOT EXISTS "courses_sort_order_idx" ON "courses" ("sort_order");
CREATE INDEX IF NOT EXISTS "course_modules_course_idx" ON "course_modules" ("course_id");
CREATE INDEX IF NOT EXISTS "course_modules_sort_order_idx" ON "course_modules" ("sort_order");
CREATE UNIQUE INDEX IF NOT EXISTS "lessons_module_slug_idx" ON "lessons" ("module_id", "slug");
CREATE INDEX IF NOT EXISTS "lessons_module_idx" ON "lessons" ("module_id");
CREATE INDEX IF NOT EXISTS "lessons_sort_order_idx" ON "lessons" ("sort_order");
CREATE INDEX IF NOT EXISTS "lesson_resources_lesson_idx" ON "lesson_resources" ("lesson_id");
CREATE INDEX IF NOT EXISTS "lesson_resources_sort_order_idx" ON "lesson_resources" ("sort_order");

