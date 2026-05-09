CREATE TYPE "assignment_status" AS ENUM ('active', 'inactive');
CREATE TYPE "evaluation_status" AS ENUM ('pending', 'in_progress', 'completed');
CREATE TYPE "evaluation_decision" AS ENUM (
  'approved',
  'rejected',
  'changes_requested'
);
CREATE TYPE "feedback_priority" AS ENUM ('low', 'medium', 'high');
CREATE TYPE "notification_type" AS ENUM (
  'deliverable_submitted',
  'deliverable_approved',
  'deliverable_rejected',
  'changes_requested',
  'feedback_received'
);

CREATE TABLE "mentor_assignments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "mentor_id" uuid NOT NULL,
  "student_id" uuid NOT NULL,
  "project_id" uuid,
  "course_id" uuid,
  "assigned_by" uuid,
  "status" "assignment_status" DEFAULT 'active' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "evaluation_criteria" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "course_id" uuid NOT NULL,
  "title" varchar(160) NOT NULL,
  "description" text,
  "max_score" integer DEFAULT 5 NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "is_required" boolean DEFAULT true NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "evaluations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "deliverable_id" uuid NOT NULL,
  "mentor_id" uuid NOT NULL,
  "status" "evaluation_status" DEFAULT 'pending' NOT NULL,
  "decision" "evaluation_decision",
  "score" integer,
  "rubric_snapshot" jsonb,
  "reviewed_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "feedback" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "evaluation_id" uuid NOT NULL,
  "deliverable_id" uuid NOT NULL,
  "author_id" uuid NOT NULL,
  "summary" text NOT NULL,
  "strengths" text,
  "improvements" text,
  "next_steps" text NOT NULL,
  "priority" "feedback_priority" DEFAULT 'medium' NOT NULL,
  "is_visible_to_student" boolean DEFAULT true NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "evaluation_scores" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "evaluation_id" uuid NOT NULL,
  "criteria_id" uuid NOT NULL,
  "score" integer NOT NULL,
  "comment" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "notifications" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL,
  "type" "notification_type" NOT NULL,
  "title" varchar(160) NOT NULL,
  "message" text NOT NULL,
  "href" text,
  "read_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "mentor_assignments"
ADD CONSTRAINT "mentor_assignments_mentor_id_profiles_id_fk"
FOREIGN KEY ("mentor_id") REFERENCES "public"."profiles"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "mentor_assignments"
ADD CONSTRAINT "mentor_assignments_student_id_profiles_id_fk"
FOREIGN KEY ("student_id") REFERENCES "public"."profiles"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "mentor_assignments"
ADD CONSTRAINT "mentor_assignments_project_id_student_projects_id_fk"
FOREIGN KEY ("project_id") REFERENCES "public"."student_projects"("id")
ON DELETE set null ON UPDATE no action;

ALTER TABLE "mentor_assignments"
ADD CONSTRAINT "mentor_assignments_course_id_courses_id_fk"
FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id")
ON DELETE set null ON UPDATE no action;

ALTER TABLE "mentor_assignments"
ADD CONSTRAINT "mentor_assignments_assigned_by_profiles_id_fk"
FOREIGN KEY ("assigned_by") REFERENCES "public"."profiles"("id")
ON DELETE set null ON UPDATE no action;

ALTER TABLE "evaluation_criteria"
ADD CONSTRAINT "evaluation_criteria_course_id_courses_id_fk"
FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "evaluations"
ADD CONSTRAINT "evaluations_deliverable_id_deliverables_id_fk"
FOREIGN KEY ("deliverable_id") REFERENCES "public"."deliverables"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "evaluations"
ADD CONSTRAINT "evaluations_mentor_id_profiles_id_fk"
FOREIGN KEY ("mentor_id") REFERENCES "public"."profiles"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "feedback"
ADD CONSTRAINT "feedback_evaluation_id_evaluations_id_fk"
FOREIGN KEY ("evaluation_id") REFERENCES "public"."evaluations"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "feedback"
ADD CONSTRAINT "feedback_deliverable_id_deliverables_id_fk"
FOREIGN KEY ("deliverable_id") REFERENCES "public"."deliverables"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "feedback"
ADD CONSTRAINT "feedback_author_id_profiles_id_fk"
FOREIGN KEY ("author_id") REFERENCES "public"."profiles"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "evaluation_scores"
ADD CONSTRAINT "evaluation_scores_evaluation_id_evaluations_id_fk"
FOREIGN KEY ("evaluation_id") REFERENCES "public"."evaluations"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "evaluation_scores"
ADD CONSTRAINT "evaluation_scores_criteria_id_evaluation_criteria_id_fk"
FOREIGN KEY ("criteria_id") REFERENCES "public"."evaluation_criteria"("id")
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "notifications"
ADD CONSTRAINT "notifications_user_id_profiles_id_fk"
FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id")
ON DELETE cascade ON UPDATE no action;

CREATE INDEX "mentor_assignments_mentor_idx"
ON "mentor_assignments" USING btree ("mentor_id");

CREATE INDEX "mentor_assignments_student_idx"
ON "mentor_assignments" USING btree ("student_id");

CREATE INDEX "mentor_assignments_project_idx"
ON "mentor_assignments" USING btree ("project_id");

CREATE INDEX "mentor_assignments_course_idx"
ON "mentor_assignments" USING btree ("course_id");

CREATE INDEX "mentor_assignments_status_idx"
ON "mentor_assignments" USING btree ("status");

CREATE INDEX "evaluation_criteria_course_idx"
ON "evaluation_criteria" USING btree ("course_id");

CREATE INDEX "evaluation_criteria_sort_idx"
ON "evaluation_criteria" USING btree ("sort_order");

CREATE INDEX "evaluations_deliverable_idx"
ON "evaluations" USING btree ("deliverable_id");

CREATE INDEX "evaluations_mentor_idx"
ON "evaluations" USING btree ("mentor_id");

CREATE INDEX "evaluations_status_idx"
ON "evaluations" USING btree ("status");

CREATE INDEX "evaluations_reviewed_idx"
ON "evaluations" USING btree ("reviewed_at");

CREATE INDEX "feedback_evaluation_idx"
ON "feedback" USING btree ("evaluation_id");

CREATE INDEX "feedback_deliverable_idx"
ON "feedback" USING btree ("deliverable_id");

CREATE INDEX "feedback_author_idx"
ON "feedback" USING btree ("author_id");

CREATE INDEX "feedback_visible_idx"
ON "feedback" USING btree ("is_visible_to_student");

CREATE INDEX "evaluation_scores_evaluation_idx"
ON "evaluation_scores" USING btree ("evaluation_id");

CREATE INDEX "evaluation_scores_criteria_idx"
ON "evaluation_scores" USING btree ("criteria_id");

CREATE INDEX "notifications_user_idx"
ON "notifications" USING btree ("user_id");

CREATE INDEX "notifications_read_idx"
ON "notifications" USING btree ("read_at");

CREATE INDEX "notifications_type_idx"
ON "notifications" USING btree ("type");

ALTER TABLE public.mentor_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY mentor_assignments_app_all
ON public.mentor_assignments
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY mentor_assignments_participant_select
ON public.mentor_assignments
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id IN (
      mentor_assignments.mentor_id,
      mentor_assignments.student_id
    )
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY evaluation_criteria_app_all
ON public.evaluation_criteria
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY evaluation_criteria_public_read
ON public.evaluation_criteria
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.courses
    WHERE courses.id = evaluation_criteria.course_id
      AND courses.status = 'published'
  )
);

CREATE POLICY evaluations_app_all
ON public.evaluations
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY evaluations_participant_select
ON public.evaluations
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = evaluations.mentor_id
      AND profiles.auth_user_id = auth.uid()
  )
  OR EXISTS (
    SELECT 1
    FROM public.deliverables
    INNER JOIN public.profiles ON profiles.id = deliverables.student_id
    WHERE deliverables.id = evaluations.deliverable_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY feedback_app_all
ON public.feedback
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY feedback_visible_student_select
ON public.feedback
FOR SELECT
TO authenticated
USING (
  is_visible_to_student = true
  AND EXISTS (
    SELECT 1
    FROM public.deliverables
    INNER JOIN public.profiles ON profiles.id = deliverables.student_id
    WHERE deliverables.id = feedback.deliverable_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY feedback_author_select
ON public.feedback
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = feedback.author_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY evaluation_scores_app_all
ON public.evaluation_scores
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY evaluation_scores_participant_select
ON public.evaluation_scores
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.evaluations
    WHERE evaluations.id = evaluation_scores.evaluation_id
      AND (
        EXISTS (
          SELECT 1
          FROM public.profiles
          WHERE profiles.id = evaluations.mentor_id
            AND profiles.auth_user_id = auth.uid()
        )
        OR EXISTS (
          SELECT 1
          FROM public.deliverables
          INNER JOIN public.profiles ON profiles.id = deliverables.student_id
          WHERE deliverables.id = evaluations.deliverable_id
            AND profiles.auth_user_id = auth.uid()
        )
      )
  )
);

CREATE POLICY notifications_app_all
ON public.notifications
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY notifications_own_select
ON public.notifications
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = notifications.user_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY notifications_own_update
ON public.notifications
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = notifications.user_id
      AND profiles.auth_user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = notifications.user_id
      AND profiles.auth_user_id = auth.uid()
  )
);
