CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_profile_id uuid;
  requested_role public.user_role := 'student';
  requested_full_name text;
BEGIN
  IF
    NEW.raw_user_meta_data ? 'active_role'
    AND NEW.raw_user_meta_data ->> 'active_role' IN (
      'student',
      'mentor',
      'institution'
    )
  THEN
    requested_role := (NEW.raw_user_meta_data ->> 'active_role')::public.user_role;
  END IF;

  requested_full_name := nullif(NEW.raw_user_meta_data ->> 'full_name', '');

  INSERT INTO public.profiles (
    auth_user_id,
    full_name,
    email,
    active_role,
    status,
    updated_at
  )
  VALUES (
    NEW.id,
    requested_full_name,
    coalesce(NEW.email, ''),
    requested_role,
    'active',
    now()
  )
  ON CONFLICT (auth_user_id) DO UPDATE
  SET
    full_name = coalesce(EXCLUDED.full_name, public.profiles.full_name),
    email = EXCLUDED.email,
    active_role = EXCLUDED.active_role,
    updated_at = now()
  RETURNING id INTO new_profile_id;

  INSERT INTO public.user_roles (profile_id, role)
  VALUES (new_profile_id, requested_role)
  ON CONFLICT (profile_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_create_profile ON auth.users;

CREATE TRIGGER on_auth_user_created_create_profile
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_auth_user();

WITH upserted_profiles AS (
  INSERT INTO public.profiles (
    auth_user_id,
    full_name,
    email,
    active_role,
    status,
    updated_at
  )
  SELECT
    auth_users.id,
    nullif(auth_users.raw_user_meta_data ->> 'full_name', ''),
    coalesce(auth_users.email, ''),
    CASE
      WHEN auth_users.raw_user_meta_data ->> 'active_role' IN (
        'student',
        'mentor',
        'institution'
      )
        THEN (auth_users.raw_user_meta_data ->> 'active_role')::public.user_role
      ELSE 'student'::public.user_role
    END,
    'active',
    now()
  FROM auth.users AS auth_users
  ON CONFLICT (auth_user_id) DO UPDATE
  SET
    full_name = coalesce(EXCLUDED.full_name, public.profiles.full_name),
    email = EXCLUDED.email,
    active_role = EXCLUDED.active_role,
    updated_at = now()
  RETURNING id, active_role
)
INSERT INTO public.user_roles (profile_id, role)
SELECT id, active_role
FROM upserted_profiles
ON CONFLICT (profile_id, role) DO NOTHING;
