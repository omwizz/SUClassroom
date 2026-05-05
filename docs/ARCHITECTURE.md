# Arquitectura

## Enfoque

SUClassroom usa arquitectura modular por dominios sobre Next.js App Router. La UI, validaciones, acciones server-side, queries y modelos de datos quedan separados para evitar mezclar lógica sensible en componentes cliente.

## Capas actuales

```text
src/app
  rutas públicas, auth y dashboard
src/components
  ui shadcn, layout, shared y dashboard
src/features
  auth, users y dashboard
src/lib
  supabase, utils y validaciones
src/server
  actions, services, queries y guards
src/db
  schema, migrations y seed
src/types
  tipos compartidos
src/config
  navegación de dashboard
src/constants
  roles y rutas
```

## Auth y RBAC

La autenticación se apoya en Supabase Auth. El control de acceso tiene dos capas:

- `src/proxy.ts`: protege `/dashboard/*`, evita volver a `/login` o `/register` si hay sesión y redirige `/dashboard` según rol.
- `src/server/guards/role-guard.ts`: valida sesión y rol en server-side antes de renderizar dashboards.

Rutas por rol:

- `student -> /dashboard/student`
- `mentor -> /dashboard/mentor`
- `admin -> /dashboard/admin`
- `institution -> /dashboard/institution`

Permisos base:

- Dashboard student: `student` o `admin`
- Dashboard mentor: `mentor` o `admin`
- Dashboard admin: solo `admin`
- Dashboard institution: `institution` o `admin`

## Base de datos

Schema Drizzle inicial:

- `profiles`: perfil funcional conectado a Supabase Auth.
- `roles`: catálogo de roles del sistema.
- `user_roles`: relación entre perfil y roles.
- `audit_logs`: tabla preparada para auditoría de acciones críticas.

El cliente Drizzle se inicializa de forma lazy en `src/db/client.ts` para evitar fallos durante `next build` cuando no existen variables locales.

## Supabase

Clientes:

- `src/lib/supabase/browser.ts`: cliente browser.
- `src/lib/supabase/server.ts`: cliente server con cookies async.
- `src/lib/supabase/middleware.ts`: cliente para proxy.

Storage queda preparado a nivel de variables y stack, pero no se implementan cargas de archivos en esta fase.

## UI

La UI usa Tailwind CSS v4, shadcn/ui y Lucide React. La dirección visual es dark mode profesional con paneles compactos, sidebar por rol, topbar, cards de métricas, tablas y estados base.

Componentes reutilizables creados:

- `DashboardShell`
- `DashboardSidebar`
- `DashboardTopbar`
- `MobileSidebar`
- `UserMenu`
- `NotificationButton`
- `SearchBox`
- `MetricCard`
- `DashboardSection`
- `ActionCard`
- `DataTable`
- `ChartCard`
- `PageHeader`
- `EmptyState`
- `StatusBadge`
- `RoleBadge`
- `ProgressBar`
- `LoadingState`
- `ErrorState`

## Límites de esta fase

No se implementa lógica funcional de cursos, módulos, lecciones, proyectos, entregables, evaluaciones, mentorías, pagos, instituciones avanzadas ni reportes reales. Las rutas existen como placeholders para sostener navegación y permisos.
