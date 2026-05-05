# SUClassroom

SUClassroom es una plataforma SaaS e-learning orientada a ejecución guiada. El objetivo del producto no es solo entregar cursos, sino acompañar el ciclo:

```text
aprender -> aplicar -> entregar -> recibir feedback -> mejorar -> aprobar -> avanzar
```

## Estado actual

Fase implementada:

- Fase 0: setup técnico con Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, ESLint, Prettier, Supabase y Drizzle preparado.
- Fase 1: autenticación base con Supabase Auth, roles, helpers de sesión, Server Actions, schema Drizzle y guards server-side.
- Fase 2: landing pública, layout de dashboard, sidebar/topbar por rol y dashboards iniciales para alumno, mentor, admin e institución.

No están implementados todavía cursos funcionales, lecciones, proyectos, entregables reales, evaluaciones, mentorías, pagos ni reportes avanzados.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase Auth / PostgreSQL / Storage preparado
- Drizzle ORM
- Zod
- React Hook Form
- Lucide React
- Recharts
- ESLint + Prettier

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Variables de entorno

Copia `.env.example` a `.env.local` y completa:

```bash
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
SENTRY_DSN=
```

Sin Supabase configurado, las rutas protegidas redirigen a `/login` y los formularios muestran un mensaje de configuración pendiente.

## Rutas principales

- `/`
- `/login`
- `/register`
- `/forgot-password`
- `/verify-email`
- `/dashboard/student`
- `/dashboard/mentor`
- `/dashboard/admin`
- `/dashboard/institution`

## Documentación

- [Setup](./docs/SETUP.md)
- [Arquitectura](./docs/ARCHITECTURE.md)
- [Fases](./docs/PHASES.md)
