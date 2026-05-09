DROP INDEX IF EXISTS "profiles_auth_user_id_idx";

CREATE INDEX IF NOT EXISTS "courses_created_by_idx"
ON "courses" ("created_by");
