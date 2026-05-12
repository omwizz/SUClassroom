CREATE TYPE "course_progress_status" AS ENUM (
  'locked',
  'available',
  'in_progress',
  'pending_review',
  'approved',
  'completed'
);

CREATE TYPE "lesson_progress_status" AS ENUM (
  'not_started',
  'in_progress',
  'completed'
);

CREATE TYPE "progress_event_type" AS ENUM (
  'course_started',
  'lesson_completed',
  'deliverable_submitted',
  'deliverable_approved',
  'deliverable_rejected',
  'course_completed',
  'course_unlocked'
);

CREATE TYPE "unlock_reason" AS ENUM (
  'first_free_course',
  'previous_course_completed',
  'admin_manual',
  'payment_confirmed',
  'mentorship_completed'
);

CREATE TABLE "user_course_progress" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "student_id" uuid NOT NULL,
  "course_id" uuid NOT NULL,
  "status" "course_progress_status" DEFAULT 'available' NOT NULL,
  "progress_percentage" integer DEFAULT 0 NOT NULL,
  "started_at" timestamp with time zone,
  "completed_at" timestamp with time zone,
  "last_activity_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "user_lesson_progress" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "student_id" uuid NOT NULL,
  "lesson_id" uuid NOT NULL,
  "course_id" uuid NOT NULL,
  "status" "lesson_progress_status" DEFAULT 'not_started' NOT NULL,
  "completed_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "course_unlocks" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "student_id" uuid NOT NULL,
  "course_id" uuid NOT NULL,
  "unlocked_by_course_id" uuid,
  "unlocked_by_deliverable_id" uuid,
  "unlocked_by_payment_id" uuid,
  "reason" "unlock_reason" NOT NULL,
  "unlocked_at" timestamp with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "course_unlock_rules" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "course_id" uuid NOT NULL,
  "required_previous_course_id" uuid,
  "requires_approved_deliverable" boolean DEFAULT true NOT NULL,
  "requires_payment" boolean DEFAULT false NOT NULL,
  "requires_mentorship" boolean DEFAULT false NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "progress_events" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "student_id" uuid NOT NULL,
  "course_id" uuid,
  "lesson_id" uuid,
  "deliverable_id" uuid,
  "event_type" "progress_event_type" NOT NULL,
  "metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "user_course_progress"
ADD CONSTRAINT "user_course_progress_student_id_profiles_id_fk"
FOREIGN KEY ("student_id") REFERENCES "public"."profiles"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "user_course_progress"
ADD CONSTRAINT "user_course_progress_course_id_courses_id_fk"
FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "user_lesson_progress"
ADD CONSTRAINT "user_lesson_progress_student_id_profiles_id_fk"
FOREIGN KEY ("student_id") REFERENCES "public"."profiles"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "user_lesson_progress"
ADD CONSTRAINT "user_lesson_progress_lesson_id_lessons_id_fk"
FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "user_lesson_progress"
ADD CONSTRAINT "user_lesson_progress_course_id_courses_id_fk"
FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "course_unlocks"
ADD CONSTRAINT "course_unlocks_student_id_profiles_id_fk"
FOREIGN KEY ("student_id") REFERENCES "public"."profiles"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "course_unlocks"
ADD CONSTRAINT "course_unlocks_course_id_courses_id_fk"
FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "course_unlocks"
ADD CONSTRAINT "course_unlocks_unlocked_by_course_id_courses_id_fk"
FOREIGN KEY ("unlocked_by_course_id") REFERENCES "public"."courses"("id")
ON DELETE set null ON UPDATE no action;

ALTER TABLE "course_unlocks"
ADD CONSTRAINT "course_unlocks_unlocked_by_deliverable_id_deliverables_id_fk"
FOREIGN KEY ("unlocked_by_deliverable_id") REFERENCES "public"."deliverables"("id")
ON DELETE set null ON UPDATE no action;

ALTER TABLE "course_unlock_rules"
ADD CONSTRAINT "course_unlock_rules_course_id_courses_id_fk"
FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "course_unlock_rules"
ADD CONSTRAINT "course_unlock_rules_required_previous_course_id_courses_id_fk"
FOREIGN KEY ("required_previous_course_id") REFERENCES "public"."courses"("id")
ON DELETE set null ON UPDATE no action;

ALTER TABLE "progress_events"
ADD CONSTRAINT "progress_events_student_id_profiles_id_fk"
FOREIGN KEY ("student_id") REFERENCES "public"."profiles"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "progress_events"
ADD CONSTRAINT "progress_events_course_id_courses_id_fk"
FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id")
ON DELETE set null ON UPDATE no action;

ALTER TABLE "progress_events"
ADD CONSTRAINT "progress_events_lesson_id_lessons_id_fk"
FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id")
ON DELETE set null ON UPDATE no action;

ALTER TABLE "progress_events"
ADD CONSTRAINT "progress_events_deliverable_id_deliverables_id_fk"
FOREIGN KEY ("deliverable_id") REFERENCES "public"."deliverables"("id")
ON DELETE set null ON UPDATE no action;

CREATE UNIQUE INDEX "user_course_progress_student_course_idx"
ON "user_course_progress" USING btree ("student_id", "course_id");

CREATE INDEX "user_course_progress_student_idx"
ON "user_course_progress" USING btree ("student_id");

CREATE INDEX "user_course_progress_course_idx"
ON "user_course_progress" USING btree ("course_id");

CREATE INDEX "user_course_progress_status_idx"
ON "user_course_progress" USING btree ("status");

CREATE UNIQUE INDEX "user_lesson_progress_student_lesson_idx"
ON "user_lesson_progress" USING btree ("student_id", "lesson_id");

CREATE INDEX "user_lesson_progress_student_idx"
ON "user_lesson_progress" USING btree ("student_id");

CREATE INDEX "user_lesson_progress_course_idx"
ON "user_lesson_progress" USING btree ("course_id");

CREATE INDEX "user_lesson_progress_status_idx"
ON "user_lesson_progress" USING btree ("status");

CREATE UNIQUE INDEX "course_unlocks_student_course_idx"
ON "course_unlocks" USING btree ("student_id", "course_id");

CREATE INDEX "course_unlocks_student_idx"
ON "course_unlocks" USING btree ("student_id");

CREATE INDEX "course_unlocks_course_idx"
ON "course_unlocks" USING btree ("course_id");

CREATE INDEX "course_unlocks_reason_idx"
ON "course_unlocks" USING btree ("reason");

CREATE UNIQUE INDEX "course_unlock_rules_course_idx"
ON "course_unlock_rules" USING btree ("course_id");

CREATE INDEX "course_unlock_rules_previous_course_idx"
ON "course_unlock_rules" USING btree ("required_previous_course_id");

CREATE INDEX "course_unlock_rules_sort_idx"
ON "course_unlock_rules" USING btree ("sort_order");

CREATE INDEX "progress_events_student_idx"
ON "progress_events" USING btree ("student_id");

CREATE INDEX "progress_events_course_idx"
ON "progress_events" USING btree ("course_id");

CREATE INDEX "progress_events_lesson_idx"
ON "progress_events" USING btree ("lesson_id");

CREATE INDEX "progress_events_deliverable_idx"
ON "progress_events" USING btree ("deliverable_id");

CREATE INDEX "progress_events_type_idx"
ON "progress_events" USING btree ("event_type");

CREATE INDEX "progress_events_created_idx"
ON "progress_events" USING btree ("created_at");

ALTER TABLE public.user_course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_unlocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_unlock_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_course_progress_app_all
ON public.user_course_progress
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY user_course_progress_own_select
ON public.user_course_progress
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = user_course_progress.student_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY user_lesson_progress_app_all
ON public.user_lesson_progress
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY user_lesson_progress_own_select
ON public.user_lesson_progress
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = user_lesson_progress.student_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY course_unlocks_app_all
ON public.course_unlocks
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY course_unlocks_own_select
ON public.course_unlocks
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = course_unlocks.student_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY course_unlock_rules_app_all
ON public.course_unlock_rules
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY course_unlock_rules_public_read
ON public.course_unlock_rules
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.courses
    WHERE courses.id = course_unlock_rules.course_id
      AND courses.status = 'published'
  )
);

CREATE POLICY progress_events_app_all
ON public.progress_events
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY progress_events_own_select
ON public.progress_events
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = progress_events.student_id
      AND profiles.auth_user_id = auth.uid()
  )
);
