# Arquitectura

## Enfoque

SUClassroom usa arquitectura modular por dominios sobre Next.js App Router. La UI, validaciones, acciones server-side, queries y modelos de datos quedan separados para evitar mezclar lógica sensible en componentes cliente.

## Capas actuales

```text
src/app
  rutas públicas, auth, catálogo y dashboard
src/components
  ui shadcn, layout, shared y dashboard
src/features
  auth y courses
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
  roles, rutas y catálogos de cursos
```

## Auth y RBAC

La autenticación se apoya en Supabase Auth. El control de acceso tiene dos capas:

- `src/proxy.ts`: protege `/dashboard/*`, evita volver a `/login` o `/register` si hay sesión y redirige `/dashboard` según rol.
- `src/server/guards/role-guard.ts`: valida sesión y rol en server-side antes de renderizar dashboards.
- Server Actions sensibles vuelven a validar sesión y rol antes de mutar datos.

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
- Mutaciones de cursos/categorías/módulos/lecciones/recursos: solo `admin`

## Base de datos

Schema Drizzle base:

- `profiles`: perfil funcional conectado a Supabase Auth.
- `roles`: catálogo de roles del sistema.
- `user_roles`: relación entre perfil y roles.
- `audit_logs`: tabla preparada para auditoría de acciones críticas.

Schema Drizzle de Fase 3:

- `course_categories`: categorías activas/inactivas para ordenar cursos.
- `courses`: ficha de curso, estado `draft/published/archived`, nivel, duración, gratuidad y publicación.
- `course_modules`: módulos ordenables por curso.
- `lessons`: lecciones ordenables por módulo con tipo, proveedor de video, preview y obligatoriedad.
- `lesson_resources`: recursos por lección con tipo, URLs y descarga.

El cliente Drizzle se inicializa de forma lazy en `src/db/client.ts` para evitar fallos durante `next build` cuando no existen variables locales.

## Cursos

La Fase 3 vive en:

- `src/constants/courses.ts`
- `src/types/courses.ts`
- `src/lib/validations/courses.ts`
- `src/db/schema/courses.ts`
- `src/server/queries/courses.ts`
- `src/server/actions/course-actions.ts`
- `src/features/courses`

Las lecturas públicas usan `getPublishedCourses` y `getCourseBySlug`, filtrando solo cursos publicados. Si `DATABASE_URL` no está configurado, se usa un dataset demo para que el catálogo y las páginas de curso sigan funcionando en local.

Las mutaciones administrativas usan Server Actions, Zod y verificación de rol. Sin `DATABASE_URL`, devuelven un error claro y no intentan persistir.

## Supabase

Clientes:

- `src/lib/supabase/browser.ts`: cliente browser.
- `src/lib/supabase/server.ts`: cliente server con cookies async.
- `src/lib/supabase/middleware.ts`: cliente para proxy.

Storage queda preparado a nivel de variables y stack, pero la Fase 3 no implementa cargas de archivos; los recursos guardan URLs externas o de archivo.

## UI

La UI usa Tailwind CSS v4, shadcn/ui y Lucide React. La dirección visual es dark mode profesional con paneles compactos, sidebar por rol, topbar, cards de métricas, tablas, formularios, estados base, acordeones y diálogos de confirmación.

Componentes reutilizables base:

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
- `ConfirmDialog`
- `FormError`
- `FormSuccess`
- `SectionCard`

Componentes de cursos:

- `CourseCard`
- `CourseGrid`
- `CourseFilters`
- `CourseHeader`
- `CourseDetail`
- `CourseModuleAccordion`
- `LessonItem`
- `LessonViewer`
- `LessonResourceList`
- `AdminCourseTable`
- `CourseForm`
- `CourseCategoryForm`
- `CourseModuleForm`
- `LessonForm`
- `LessonResourceForm`
- `CourseBuilder`

## Límites de esta fase

No se implementan proyectos, entregables evaluables, rúbricas, feedback, aprobaciones, mentorías, pagos, instituciones avanzadas, reportes reales, certificados, IA ni comunidad. La lección `assignment_intro` solo prepara el contexto para futuros entregables.

