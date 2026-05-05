# Setup

## Requisitos

- Node.js 20.9 o superior. El entorno usado en esta fase tiene Node 24.15.0.
- npm.
- Proyecto Supabase para probar autenticación real.
- Base PostgreSQL compatible con `DATABASE_URL` para migraciones Drizzle.

## Instalación

```bash
npm install
```

## Variables de entorno

Crear `.env.local` a partir de `.env.example`:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
SENTRY_DSN=
```

`NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` son obligatorias para probar registro/login/logout. `DATABASE_URL` es obligatoria para persistir perfiles, roles y auditoría mediante Drizzle.

## Desarrollo local

```bash
npm run dev
```

Abrir `http://localhost:3000`.

## Validación

```bash
npm run lint
npm run typecheck
npm run build
```

## Base de datos

El schema inicial está en `src/db/schema/auth.ts` y la migración SQL base en `src/db/migrations/0001_auth_roles.sql`.

Tablas preparadas:

- `profiles`
- `roles`
- `user_roles`
- `audit_logs`

Roles base:

- `student`
- `mentor`
- `admin`
- `institution`

## Supabase Auth

Los Server Actions usan Supabase Auth para:

- registro (`registerUser`)
- login (`loginUser`)
- logout (`logoutUser`)
- lectura de usuario actual (`getCurrentUser`)
- lectura de perfil actual (`getCurrentProfile`)
- actualización básica de perfil (`updateProfile`)

Si `DATABASE_URL` no está configurado, el sistema construye un perfil temporal desde metadata de Supabase para no romper el flujo de UI durante setup.
