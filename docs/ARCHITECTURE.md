# Arquitectura

## Enfoque

SUClassroom usa arquitectura modular por dominios sobre Next.js App Router. La UI, validaciones, acciones server-side, queries y modelos de datos quedan separados para evitar mezclar logica sensible en componentes cliente.

## Capas actuales

```text
src/app
  rutas publicas, auth, catalogo, onboarding y dashboard
src/components
  ui shadcn, layout, shared y dashboard
src/features
  auth, courses y projects
src/lib
  supabase, utils y validaciones
src/server
  actions, services, queries y guards
src/db
  schema, migrations y seed
src/types
  tipos compartidos
src/config
  navegacion de dashboard
src/constants
  roles, rutas, catalogos de cursos y catalogos de proyectos
```

## Auth y RBAC

La autenticacion se apoya en Supabase Auth. El control de acceso tiene dos capas:

- `src/proxy.ts`: protege `/dashboard/*`, evita volver a `/login` o `/register` si hay sesion y redirige `/dashboard` segun rol.
- `src/server/guards/role-guard.ts`: valida sesion y rol en server-side antes de renderizar dashboards.
- Server Actions sensibles vuelven a validar sesion, rol y ownership antes de mutar datos.

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
- Mutaciones de cursos/categorias/modulos/lecciones/recursos: solo `admin`
- Onboarding y proyecto de alumno: `student` sobre su propia ficha. `admin` solo para consulta y archivo basico desde vistas administrativas.
- Dashboard student redirige a `/onboarding` cuando el alumno no completo diagnostico inicial.

## Base de datos

Schema Drizzle base:

- `profiles`: perfil funcional conectado a Supabase Auth.
- `roles`: catalogo de roles del sistema.
- `user_roles`: relacion entre perfil y roles.
- `audit_logs`: tabla preparada para auditoria de acciones criticas.

Schema Drizzle de Fase 3:

- `course_categories`: categorias activas/inactivas para ordenar cursos.
- `courses`: ficha de curso, estado `draft/published/archived`, nivel, duracion, gratuidad y publicacion.
- `course_modules`: modulos ordenables por curso.
- `lessons`: lecciones ordenables por modulo con tipo, proveedor de video, preview y obligatoriedad.
- `lesson_resources`: recursos por leccion con tipo, URLs y descarga.

Schema Drizzle de Fase 4:

- `student_onboarding`: diagnostico inicial por alumno con perfil, experiencia, objetivo, area, etapa, desafio, motivacion y fecha de completado.
- `student_projects`: ficha base del proyecto del alumno con nombre, slug, descripcion, problema, solucion, publico, etapa, area, impacto social y estado `draft/active/paused/completed/archived`.

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

Las lecturas publicas usan `getPublishedCourses` y `getCourseBySlug`, filtrando solo cursos publicados. Si `DATABASE_URL` no esta configurado, se usa un dataset demo para que el catalogo y las paginas de curso sigan funcionando en local.

Las mutaciones administrativas usan Server Actions, Zod y verificacion de rol. Sin `DATABASE_URL`, devuelven un error claro y no intentan persistir.

## Onboarding y proyectos

La Fase 4 vive en:

- `src/constants/projects.ts`
- `src/types/projects.ts`
- `src/lib/validations/projects.ts`
- `src/db/schema/projects.ts`
- `src/server/queries/projects.ts`
- `src/server/actions/project-actions.ts`
- `src/server/services/onboarding-service.ts`
- `src/server/services/student-project-service.ts`
- `src/features/projects`

El onboarding usa un wizard client-side con React Hook Form y Zod, pero las mutaciones se hacen mediante Server Actions. Cada accion vuelve a verificar sesion, rol y ownership antes de escribir.

El alumno puede registrar y editar su proyecto principal. El admin puede listar proyectos, filtrarlos por estado/etapa/busqueda, abrir una ficha basica y archivar un proyecto. No se implementan revision, feedback, aprobacion ni entregables formales en esta fase.

## Supabase

Clientes:

- `src/lib/supabase/browser.ts`: cliente browser.
- `src/lib/supabase/server.ts`: cliente server con cookies async.
- `src/lib/supabase/middleware.ts`: cliente para proxy.

Storage queda preparado a nivel de variables y stack, pero la Fase 4 no implementa cargas de archivos ni usa service role key en cliente.

## UI

La UI usa Tailwind CSS v4, shadcn/ui y Lucide React. La direccion visual es dark mode profesional con paneles compactos, sidebar por rol, topbar, cards de metricas, tablas, formularios, estados base, acordeones y dialogos de confirmacion.

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

Componentes de onboarding y proyectos:

- `OnboardingWizard`
- `OnboardingStep`
- `OnboardingProgress`
- `ProjectForm`
- `ProjectSummaryCard`
- `ProjectStageBadge`
- `ProjectStatusBadge`
- `StudentProjectPanel`
- `AdminProjectsTable`
- `ProjectDetailView`
- `NextStepCard`

## Limites de esta fase

No se implementan entregables evaluables, rubricas, feedback, aprobaciones, mentorias completas, pagos, instituciones avanzadas, reportes reales, certificados, IA ni comunidad. La leccion `assignment_intro` solo prepara el contexto para futuros entregables.

