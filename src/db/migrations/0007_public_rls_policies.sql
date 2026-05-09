ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY profiles_app_all
ON public.profiles
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY profiles_own_select
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = auth_user_id);

CREATE POLICY profiles_own_update
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = auth_user_id)
WITH CHECK (auth.uid() = auth_user_id);

CREATE POLICY roles_app_all
ON public.roles
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY roles_public_read
ON public.roles
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY user_roles_app_all
ON public.user_roles
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY user_roles_own_select
ON public.user_roles
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = user_roles.profile_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY audit_logs_app_all
ON public.audit_logs
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY course_categories_app_all
ON public.course_categories
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY course_categories_public_read
ON public.course_categories
FOR SELECT
TO anon, authenticated
USING (is_active = true);

CREATE POLICY courses_app_all
ON public.courses
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY courses_public_read
ON public.courses
FOR SELECT
TO anon, authenticated
USING (status = 'published');

CREATE POLICY course_modules_app_all
ON public.course_modules
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY course_modules_public_read
ON public.course_modules
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.courses
    WHERE courses.id = course_modules.course_id
      AND courses.status = 'published'
  )
);

CREATE POLICY lessons_app_all
ON public.lessons
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY lessons_public_read
ON public.lessons
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.course_modules
    INNER JOIN public.courses ON courses.id = course_modules.course_id
    WHERE course_modules.id = lessons.module_id
      AND courses.status = 'published'
  )
);

CREATE POLICY lesson_resources_app_all
ON public.lesson_resources
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY lesson_resources_public_read
ON public.lesson_resources
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.lessons
    INNER JOIN public.course_modules ON course_modules.id = lessons.module_id
    INNER JOIN public.courses ON courses.id = course_modules.course_id
    WHERE lessons.id = lesson_resources.lesson_id
      AND courses.status = 'published'
  )
);

CREATE POLICY student_onboarding_app_all
ON public.student_onboarding
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY student_onboarding_own_select
ON public.student_onboarding
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = student_onboarding.student_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY student_onboarding_own_insert
ON public.student_onboarding
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = student_onboarding.student_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY student_onboarding_own_update
ON public.student_onboarding
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = student_onboarding.student_id
      AND profiles.auth_user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = student_onboarding.student_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY student_projects_app_all
ON public.student_projects
FOR ALL
TO suclassroom_app
USING (true)
WITH CHECK (true);

CREATE POLICY student_projects_own_select
ON public.student_projects
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = student_projects.student_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY student_projects_own_insert
ON public.student_projects
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = student_projects.student_id
      AND profiles.auth_user_id = auth.uid()
  )
);

CREATE POLICY student_projects_own_update
ON public.student_projects
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = student_projects.student_id
      AND profiles.auth_user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = student_projects.student_id
      AND profiles.auth_user_id = auth.uid()
  )
);
