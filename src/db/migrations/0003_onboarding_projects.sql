CREATE TYPE "user_type" AS ENUM (
  'entrepreneur',
  'social_leader',
  'social_entrepreneur',
  'institution_participant',
  'other'
);

CREATE TYPE "experience_level" AS ENUM (
  'beginner',
  'intermediate',
  'advanced'
);

CREATE TYPE "project_stage" AS ENUM (
  'idea',
  'validation',
  'early_execution',
  'growth',
  'paused'
);

CREATE TYPE "project_status" AS ENUM (
  'draft',
  'active',
  'paused',
  'completed',
  'archived'
);

CREATE TYPE "business_area" AS ENUM (
  'validation',
  'business_model',
  'marketing_sales',
  'finance',
  'operations',
  'social_programs',
  'sustainability',
  'other'
);

CREATE TABLE "student_onboarding" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "student_id" uuid NOT NULL,
  "user_type" "user_type" NOT NULL,
  "experience_level" "experience_level" NOT NULL,
  "main_goal" text NOT NULL,
  "business_area" "business_area" NOT NULL,
  "project_stage" "project_stage" NOT NULL,
  "biggest_challenge" text,
  "motivation" text,
  "completed_at" timestamp with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "student_projects" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "student_id" uuid NOT NULL,
  "name" varchar(120) NOT NULL,
  "slug" varchar(140) NOT NULL,
  "description" text NOT NULL,
  "problem" text NOT NULL,
  "solution" text,
  "target_audience" text NOT NULL,
  "current_stage" "project_stage" NOT NULL,
  "business_area" "business_area" NOT NULL,
  "social_impact" text,
  "status" "project_status" DEFAULT 'active' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "student_onboarding"
ADD CONSTRAINT "student_onboarding_student_id_profiles_id_fk"
FOREIGN KEY ("student_id") REFERENCES "public"."profiles"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "student_projects"
ADD CONSTRAINT "student_projects_student_id_profiles_id_fk"
FOREIGN KEY ("student_id") REFERENCES "public"."profiles"("id")
ON DELETE cascade ON UPDATE no action;

CREATE UNIQUE INDEX "student_onboarding_student_idx"
ON "student_onboarding" USING btree ("student_id");

CREATE INDEX "student_onboarding_completed_idx"
ON "student_onboarding" USING btree ("completed_at");

CREATE UNIQUE INDEX "student_projects_student_slug_idx"
ON "student_projects" USING btree ("student_id", "slug");

CREATE INDEX "student_projects_student_idx"
ON "student_projects" USING btree ("student_id");

CREATE INDEX "student_projects_status_idx"
ON "student_projects" USING btree ("status");

CREATE INDEX "student_projects_stage_idx"
ON "student_projects" USING btree ("current_stage");
