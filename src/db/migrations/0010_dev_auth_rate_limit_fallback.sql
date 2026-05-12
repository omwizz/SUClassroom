CREATE SCHEMA IF NOT EXISTS private;

REVOKE ALL ON SCHEMA private FROM PUBLIC;

GRANT USAGE ON SCHEMA private TO suclassroom_app;

CREATE OR REPLACE FUNCTION private.dev_create_confirmed_auth_user(
  user_email text,
  user_password text,
  user_full_name text,
  user_role public.user_role
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth, public, extensions
AS $$
DECLARE
  normalized_email text := lower(trim(user_email));
  existing_user auth.users%ROWTYPE;
  new_user_id uuid := gen_random_uuid();
BEGIN
  IF session_user <> 'suclassroom_app' THEN
    RAISE EXCEPTION 'DEV_AUTH_FALLBACK_FORBIDDEN';
  END IF;

  IF user_role NOT IN ('student', 'mentor', 'institution') THEN
    RAISE EXCEPTION 'DEV_AUTH_FALLBACK_INVALID_ROLE';
  END IF;

  SELECT *
  INTO existing_user
  FROM auth.users
  WHERE lower(email) = normalized_email
    AND deleted_at IS NULL
  ORDER BY created_at DESC
  LIMIT 1;

  IF existing_user.id IS NOT NULL THEN
    IF existing_user.email_confirmed_at IS NOT NULL THEN
      RAISE EXCEPTION 'DEV_AUTH_FALLBACK_USER_ALREADY_CONFIRMED';
    END IF;

    UPDATE auth.users
    SET
      encrypted_password = crypt(user_password, gen_salt('bf')),
      email_confirmed_at = now(),
      raw_app_meta_data = jsonb_build_object(
        'provider',
        'email',
        'providers',
        jsonb_build_array('email')
      ),
      raw_user_meta_data = jsonb_build_object(
        'full_name',
        nullif(user_full_name, ''),
        'active_role',
        user_role::text
      ),
      updated_at = now(),
      confirmation_token = '',
      confirmation_sent_at = NULL
    WHERE id = existing_user.id;

    RETURN existing_user.id;
  END IF;

  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    email_change_token_new,
    email_change,
    email_change_token_current,
    phone_change,
    phone_change_token,
    reauthentication_token,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    is_sso_user,
    is_anonymous,
    created_at,
    updated_at
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated',
    'authenticated',
    normalized_email,
    crypt(user_password, gen_salt('bf')),
    now(),
    '',
    NULL,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    jsonb_build_object(
      'provider',
      'email',
      'providers',
      jsonb_build_array('email')
    ),
    jsonb_build_object(
      'full_name',
      nullif(user_full_name, ''),
      'active_role',
      user_role::text
    ),
    NULL,
    false,
    false,
    now(),
    now()
  );

  INSERT INTO auth.identities (
    id,
    provider_id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  )
  VALUES (
    gen_random_uuid(),
    new_user_id::text,
    new_user_id,
    jsonb_build_object(
      'sub',
      new_user_id::text,
      'email',
      normalized_email,
      'email_verified',
      true,
      'phone_verified',
      false
    ),
    'email',
    now(),
    now(),
    now()
  )
  ON CONFLICT (provider_id, provider) DO NOTHING;

  RETURN new_user_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION private.dev_create_confirmed_auth_user(
  text,
  text,
  text,
  public.user_role
) FROM PUBLIC;

REVOKE EXECUTE ON FUNCTION private.dev_create_confirmed_auth_user(
  text,
  text,
  text,
  public.user_role
) FROM anon;

REVOKE EXECUTE ON FUNCTION private.dev_create_confirmed_auth_user(
  text,
  text,
  text,
  public.user_role
) FROM authenticated;

GRANT EXECUTE ON FUNCTION private.dev_create_confirmed_auth_user(
  text,
  text,
  text,
  public.user_role
) TO suclassroom_app;

DROP FUNCTION IF EXISTS public.dev_create_confirmed_auth_user(
  text,
  text,
  text,
  public.user_role
);
