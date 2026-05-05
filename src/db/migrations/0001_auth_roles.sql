CREATE TYPE "user_role" AS ENUM ('student', 'mentor', 'admin', 'institution');
CREATE TYPE "profile_status" AS ENUM ('active', 'pending', 'suspended');

CREATE TABLE IF NOT EXISTS "profiles" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "auth_user_id" uuid NOT NULL UNIQUE,
  "full_name" varchar(120),
  "email" varchar(255) NOT NULL,
  "avatar_url" text,
  "active_role" "user_role" DEFAULT 'student' NOT NULL,
  "status" "profile_status" DEFAULT 'active' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "roles" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" "user_role" NOT NULL UNIQUE,
  "description" text NOT NULL,
  "is_system" boolean DEFAULT true NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_roles" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "profile_id" uuid NOT NULL REFERENCES "profiles"("id") ON DELETE cascade,
  "role" "user_role" NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "audit_logs" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid REFERENCES "profiles"("id") ON DELETE set null,
  "action" varchar(120) NOT NULL,
  "entity_type" varchar(120) NOT NULL,
  "entity_id" uuid,
  "metadata" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "profiles_auth_user_id_idx" ON "profiles" ("auth_user_id");
CREATE INDEX IF NOT EXISTS "profiles_email_idx" ON "profiles" ("email");
CREATE UNIQUE INDEX IF NOT EXISTS "user_roles_profile_role_idx" ON "user_roles" ("profile_id", "role");
CREATE INDEX IF NOT EXISTS "user_roles_profile_idx" ON "user_roles" ("profile_id");
CREATE INDEX IF NOT EXISTS "audit_logs_user_idx" ON "audit_logs" ("user_id");

INSERT INTO "roles" ("name", "description", "is_system")
VALUES
  ('student', 'Aprende, aplica y entrega proyectos reales.', true),
  ('mentor', 'Revisa entregables y brinda feedback estructurado.', true),
  ('admin', 'Administra usuarios, cursos, operación y métricas.', true),
  ('institution', 'Gestiona cohortes, participantes y avance institucional.', true)
ON CONFLICT ("name") DO NOTHING;
