# Setup

## Requisitos

- Node.js 20.9 o superior. El entorno usado en esta fase tiene Node 24.15.0.
- npm.
- Proyecto Supabase para probar autenticacion real.
- Base PostgreSQL compatible con `DATABASE_URL` para migraciones Drizzle.

## Instalacion

```bash
npm install
```

## Variables De Entorno

Crear `.env.local` a partir de `.env.example`:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_DELIVERABLES_BUCKET=deliverables
DATABASE_URL=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
SENTRY_DSN=
```

`NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` son obligatorias para probar registro/login/logout. `DATABASE_URL` es obligatoria para persistir perfiles, roles, cursos, onboarding, proyectos y entregables mediante Drizzle.

Para Supabase remoto, `DATABASE_URL` debe apuntar al Transaction Pooler o a una conexion Postgres valida. Se recomienda usar un usuario dedicado de base de datos con permisos sobre `public`, por ejemplo `suclassroom_app`, y no el usuario maestro `postgres` en desarrollo cotidiano.

## Desarrollo Local

```bash
npm run dev
```

Abrir `http://localhost:3000`.

## Validacion

```bash
npm run lint
npm run typecheck
npm run build
```

## Base De Datos

Los schemas Drizzle viven en `src/db/schema` y las migraciones SQL viven en `src/db/migrations`.

Tablas principales:

- `profiles`
- `roles`
- `user_roles`
- `audit_logs`
- `course_categories`
- `courses`
- `course_modules`
- `lessons`
- `lesson_resources`
- `student_onboarding`
- `student_projects`
- `course_deliverable_requirements`
- `deliverables`
- `deliverable_files`
- `deliverable_links`
- `deliverable_versions`

Roles base:

- `student`
- `mentor`
- `admin`
- `institution`

## Supabase Auth Y Seguridad

Los Server Actions usan Supabase Auth para:

- registro (`registerUser`)
- login (`loginUser`)
- logout (`logoutUser`)
- lectura de usuario actual (`getCurrentUser`)
- lectura de perfil actual (`getCurrentProfile`)
- actualizacion basica de perfil (`updateProfile`)

Si `DATABASE_URL` no esta configurado, el sistema construye un perfil temporal desde metadata de Supabase para no romper el flujo de UI durante setup.

En Supabase real:

- RLS debe estar activo en las tablas publicas.
- `public.handle_new_auth_user()` crea o actualiza `profiles` y `user_roles` cuando Supabase Auth crea un usuario.
- La funcion de sincronizacion Auth -> Profile no debe tener `EXECUTE` para `anon` ni `authenticated`.
- Activar leaked password protection desde el dashboard de Supabase Auth queda como ajuste operativo recomendado.
