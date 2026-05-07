# SUClassroom

SUClassroom es una plataforma SaaS e-learning orientada a ejecucion guiada. El objetivo del producto no es solo entregar cursos, sino acompanar el ciclo:

```text
aprender -> aplicar -> entregar -> recibir feedback -> mejorar -> aprobar -> avanzar
```

## Estado actual

Fases implementadas:

- Fase 0: setup tecnico con Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, ESLint, Prettier, Supabase y Drizzle preparado.
- Fase 1: autenticacion base con Supabase Auth, roles, helpers de sesion, Server Actions, schema Drizzle y guards server-side.
- Fase 2: landing publica, layout de dashboard, sidebar/topbar por rol y dashboards iniciales para alumno, mentor, admin e institucion.
- Fase 3: cursos, categorias, modulos, lecciones y recursos con catalogo publico, vista de alumno, CRUD administrativo y builder de contenido.
- Fase 4: onboarding inicial del alumno, diagnostico inicial, registro/edicion de proyecto, dashboard student conectado y vista administrativa basica de proyectos.

No estan implementados todavia entregables reales, evaluaciones, feedback de mentor, mentorias completas, pagos, reportes avanzados, certificados, IA ni comunidad.

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

Sin Supabase configurado, las rutas protegidas redirigen a `/login` y los formularios muestran un mensaje de configuracion pendiente. Sin `DATABASE_URL`, el catalogo usa datos demo publicados, pero las mutaciones administrativas no persisten.

La Fase 4 tambien requiere `DATABASE_URL` para persistir onboarding y proyectos. No se usa ninguna service role key en componentes client-side ni variables `NEXT_PUBLIC`.

## Rutas principales

- `/`
- `/courses`
- `/courses/[courseSlug]`
- `/courses/[courseSlug]/lessons/[lessonSlug]`
- `/login`
- `/register`
- `/forgot-password`
- `/verify-email`
- `/onboarding`
- `/dashboard/student`
- `/dashboard/student/courses`
- `/dashboard/student/courses/[courseSlug]`
- `/dashboard/student/project`
- `/dashboard/student/project/edit`
- `/dashboard/mentor`
- `/dashboard/admin`
- `/dashboard/admin/courses`
- `/dashboard/admin/courses/new`
- `/dashboard/admin/courses/[courseId]/edit`
- `/dashboard/admin/courses/[courseId]/builder`
- `/dashboard/admin/categories`
- `/dashboard/admin/projects`
- `/dashboard/admin/projects/[projectId]`
- `/dashboard/institution`

## Documentacion

- [Setup](./docs/SETUP.md)
- [Arquitectura](./docs/ARCHITECTURE.md)
- [Fases](./docs/PHASES.md)
- [Cursos](./docs/COURSES.md)
- [Onboarding y proyectos](./docs/PROJECTS_ONBOARDING.md)

