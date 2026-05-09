CREATE TYPE "deliverable_status" AS ENUM (
  'draft',
  'submitted',
  'under_review',
  'changes_requested',
  'rejected',
  'approved',
  'resubmitted'
);

CREATE TYPE "resource_file_type" AS ENUM (
  'pdf',
  'doc',
  'docx',
  'ppt',
  'pptx',
  'xls',
  'xlsx',
  'image',
  'link',
  'other'
);

CREATE TABLE "course_deliverable_requirements" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "course_id" uuid NOT NULL,
  "title" varchar(180) NOT NULL,
  "description" text,
  "instructions" text NOT NULL,
  "required_file_types" "resource_file_type"[] DEFAULT ARRAY[]::resource_file_type[] NOT NULL,
  "max_files" integer DEFAULT 5 NOT NULL,
  "is_required" boolean DEFAULT true NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "deliverables" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "project_id" uuid NOT NULL,
  "course_id" uuid NOT NULL,
  "student_id" uuid NOT NULL,
  "title" varchar(180) NOT NULL,
  "description" text NOT NULL,
  "instructions_snapshot" text,
  "status" "deliverable_status" DEFAULT 'draft' NOT NULL,
  "version" integer DEFAULT 1 NOT NULL,
  "submitted_at" timestamp with time zone,
  "last_resubmitted_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "deliverable_files" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "deliverable_id" uuid NOT NULL,
  "uploaded_by" uuid NOT NULL,
  "file_name" varchar(240) NOT NULL,
  "file_path" text NOT NULL,
  "file_url" text,
  "file_type" "resource_file_type" DEFAULT 'other' NOT NULL,
  "mime_type" varchar(160) NOT NULL,
  "size_bytes" integer NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "deliverable_links" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "deliverable_id" uuid NOT NULL,
  "title" varchar(160) NOT NULL,
  "url" text NOT NULL,
  "description" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "deliverable_versions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "deliverable_id" uuid NOT NULL,
  "version" integer NOT NULL,
  "title" varchar(180) NOT NULL,
  "description" text NOT NULL,
  "status" "deliverable_status" NOT NULL,
  "snapshot" jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "course_deliverable_requirements"
ADD CONSTRAINT "course_deliverable_requirements_course_id_courses_id_fk"
FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "deliverables"
ADD CONSTRAINT "deliverables_project_id_student_projects_id_fk"
FOREIGN KEY ("project_id") REFERENCES "public"."student_projects"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "deliverables"
ADD CONSTRAINT "deliverables_course_id_courses_id_fk"
FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "deliverables"
ADD CONSTRAINT "deliverables_student_id_profiles_id_fk"
FOREIGN KEY ("student_id") REFERENCES "public"."profiles"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "deliverable_files"
ADD CONSTRAINT "deliverable_files_deliverable_id_deliverables_id_fk"
FOREIGN KEY ("deliverable_id") REFERENCES "public"."deliverables"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "deliverable_files"
ADD CONSTRAINT "deliverable_files_uploaded_by_profiles_id_fk"
FOREIGN KEY ("uploaded_by") REFERENCES "public"."profiles"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "deliverable_links"
ADD CONSTRAINT "deliverable_links_deliverable_id_deliverables_id_fk"
FOREIGN KEY ("deliverable_id") REFERENCES "public"."deliverables"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "deliverable_versions"
ADD CONSTRAINT "deliverable_versions_deliverable_id_deliverables_id_fk"
FOREIGN KEY ("deliverable_id") REFERENCES "public"."deliverables"("id")
ON DELETE cascade ON UPDATE no action;

CREATE UNIQUE INDEX "course_deliverable_requirements_course_idx"
ON "course_deliverable_requirements" USING btree ("course_id");

CREATE INDEX "course_deliverable_requirements_required_idx"
ON "course_deliverable_requirements" USING btree ("is_required");

CREATE INDEX "deliverables_project_idx"
ON "deliverables" USING btree ("project_id");

CREATE INDEX "deliverables_course_idx"
ON "deliverables" USING btree ("course_id");

CREATE INDEX "deliverables_student_idx"
ON "deliverables" USING btree ("student_id");

CREATE INDEX "deliverables_status_idx"
ON "deliverables" USING btree ("status");

CREATE INDEX "deliverables_submitted_idx"
ON "deliverables" USING btree ("submitted_at");

CREATE INDEX "deliverable_files_deliverable_idx"
ON "deliverable_files" USING btree ("deliverable_id");

CREATE INDEX "deliverable_files_uploaded_by_idx"
ON "deliverable_files" USING btree ("uploaded_by");

CREATE UNIQUE INDEX "deliverable_files_path_idx"
ON "deliverable_files" USING btree ("file_path");

CREATE INDEX "deliverable_links_deliverable_idx"
ON "deliverable_links" USING btree ("deliverable_id");

CREATE UNIQUE INDEX "deliverable_versions_deliverable_version_idx"
ON "deliverable_versions" USING btree ("deliverable_id", "version");

CREATE INDEX "deliverable_versions_deliverable_idx"
ON "deliverable_versions" USING btree ("deliverable_id");

ALTER TABLE public.course_deliverable_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliverable_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliverable_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliverable_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY course_deliverable_requirements_app_all
ON public.course_deliverable_requirements
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY course_deliverable_requirements_public_read
ON public.course_deliverable_requirements
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.courses
    WHERE courses.id = course_deliverable_requirements.course_id
      AND courses.status = 'published'
  )
);

CREATE POLICY deliverables_app_all
ON public.deliverables
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY deliverables_own_select
ON public.deliverables
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = deliverables.student_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY deliverables_own_insert
ON public.deliverables
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = deliverables.student_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY deliverables_own_update
ON public.deliverables
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = deliverables.student_id
      AND profiles.auth_user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = deliverables.student_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY deliverable_files_app_all
ON public.deliverable_files
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY deliverable_files_own_select
ON public.deliverable_files
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.deliverables
    INNER JOIN public.profiles ON profiles.id = deliverables.student_id
    WHERE deliverables.id = deliverable_files.deliverable_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY deliverable_links_app_all
ON public.deliverable_links
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY deliverable_links_own_select
ON public.deliverable_links
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.deliverables
    INNER JOIN public.profiles ON profiles.id = deliverables.student_id
    WHERE deliverables.id = deliverable_links.deliverable_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY deliverable_versions_app_all
ON public.deliverable_versions
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY deliverable_versions_own_select
ON public.deliverable_versions
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.deliverables
    INNER JOIN public.profiles ON profiles.id = deliverables.student_id
    WHERE deliverables.id = deliverable_versions.deliverable_id
      AND profiles.auth_user_id = auth.uid()
  )
);
