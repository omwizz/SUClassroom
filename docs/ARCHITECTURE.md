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
  auth, courses, projects, deliverables, evaluations y progress
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
  roles, rutas, catalogos de cursos, proyectos, entregables, evaluaciones y progreso
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
- Entregables: `student` crea/edita solo sus borradores y adjunta evidencia propia; `admin` consulta todos los entregables desde vistas administrativas.
- Evaluaciones: solo `mentor` asignado o `admin` puede iniciar revision, aprobar, rechazar, solicitar cambios y crear feedback. `student` solo lee feedback visible sobre sus propios entregables.
- Progreso: `student` actualiza su propio avance de curso/leccion; `admin` consulta progreso de usuarios y puede desbloquear cursos manualmente.
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

Schema Drizzle de Fase 5:

- `course_deliverable_requirements`: consigna base de entregable por curso, tipos sugeridos, maximo de archivos y obligatoriedad.
- `deliverables`: borrador/envio del alumno conectado a proyecto, curso y perfil, con estado y version actual.
- `deliverable_files`: metadatos de archivos privados subidos a Supabase Storage.
- `deliverable_links`: evidencia externa asociada al entregable.
- `deliverable_versions`: historial de snapshots cuando el alumno envia o reenvia.

Schema Drizzle de Fase 6:

- `mentor_assignments`: asignacion basica de mentor por alumno, proyecto y/o curso.
- `evaluation_criteria`: criterios o rubrica por curso.
- `evaluations`: registro de revision por entregable, mentor, decision, puntaje y snapshot de rubrica.
- `feedback`: feedback estructurado asociado a evaluacion y entregable.
- `evaluation_scores`: puntajes y comentarios por criterio.
- `notifications`: notificaciones internas basicas para alumnos.

Schema Drizzle de Fase 7:

- `user_course_progress`: estado del curso por alumno, porcentaje, inicio, cierre y ultima actividad.
- `user_lesson_progress`: avance por leccion y curso para cada alumno.
- `course_unlocks`: desbloqueos concedidos por curso gratuito, curso previo, admin, pago futuro o mentoria futura.
- `course_unlock_rules`: reglas basicas de avance entre cursos, preparadas para pago y mentoria sin implementar esos flujos.
- `progress_events`: historial de eventos de curso, leccion, entregable aprobado/rechazado, curso completado y desbloqueo.

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

El alumno puede registrar y editar su proyecto principal. El admin puede listar proyectos, filtrarlos por estado/etapa/busqueda, abrir una ficha basica y archivar un proyecto.

## Entregables

La Fase 5 vive en:

- `src/constants/deliverables.ts`
- `src/types/deliverables.ts`
- `src/lib/validations/deliverables.ts`
- `src/db/schema/deliverables.ts`
- `src/server/queries/deliverables.ts`
- `src/server/actions/deliverable-actions.ts`
- `src/server/services/deliverable-service.ts`
- `src/server/services/storage-service.ts`
- `src/features/deliverables`

El alumno puede crear borradores, editarlos mientras el estado lo permita, adjuntar archivos, agregar enlaces, enviar y reenviar cuando el estado sea `changes_requested` o `rejected`. Cada envio registra una version en `deliverable_versions`.

El admin puede listar y abrir entregables, ver alumno, curso, proyecto, evidencia y versiones. La revision formal, aprobacion, rechazo y feedback viven en el dominio de evaluaciones de Fase 6.

## Evaluaciones y feedback

La Fase 6 vive en:

- `src/constants/evaluations.ts`
- `src/types/evaluations.ts`
- `src/lib/validations/evaluations.ts`
- `src/db/schema/evaluations.ts`
- `src/server/queries/evaluations.ts`
- `src/server/actions/evaluation-actions.ts`
- `src/server/services/evaluation-service.ts`
- `src/server/services/feedback-service.ts`
- `src/server/services/mentor-assignment-service.ts`
- `src/server/services/notification-service.ts`
- `src/features/evaluations`

El admin asigna mentores a entregables desde `/dashboard/admin/mentor-assignments`. Un mentor solo ve y evalua entregables que coinciden con sus asignaciones activas. El admin puede revisar cualquier entregable.

La evaluacion cambia el estado operativo del entregable:

- `approved`: entregable aprobado.
- `rejected`: entregable rechazado.
- `changes_requested`: cambios solicitados y reenvio habilitado por la fase de entregables.

Cada evaluacion guarda historial, feedback estructurado visible u oculto para alumno, puntajes opcionales por criterio y una notificacion interna. La aprobacion se integra con progreso para completar el curso y evaluar reglas de desbloqueo.

## Progreso y desbloqueos

La Fase 7 vive en:

- `src/constants/progress.ts`
- `src/types/progress.ts`
- `src/lib/validations/progress.ts`
- `src/db/schema/progress.ts`
- `src/server/queries/progress.ts`
- `src/server/actions/progress-actions.ts`
- `src/server/services/progress-service.ts`
- `src/server/services/course-unlock-service.ts`
- `src/server/services/next-step-service.ts`
- `src/features/progress`

El primer curso gratuito queda disponible sin crear datos extra. Los cursos no gratuitos requieren regla o desbloqueo manual. Completar lecciones actualiza porcentaje, pero el curso se marca como completado cuando el entregable requerido queda aprobado. La aprobacion de un entregable registra evento, completa el curso y evalua reglas para desbloquear el siguiente curso.

Las reglas con `requires_payment` o `requires_mentorship` solo quedan preparadas para fases futuras; no implementan Qulqi, pagos ni mentorias completas.

## Supabase

Clientes:

- `src/lib/supabase/browser.ts`: cliente browser.
- `src/lib/supabase/server.ts`: cliente server con cookies async.
- `src/lib/supabase/middleware.ts`: cliente para proxy.

Base de datos y seguridad:

- `DATABASE_URL` debe usar un usuario dedicado de base de datos, no una clave publica ni service role. En el entorno Supabase actual se usa `suclassroom_app` por Transaction Pooler.
- `src/db/client.ts` usa SSL, timeout y `prepare: false` para ser compatible con Supabase Pooler.
- RLS esta activo en las tablas publicas de la app. El rol `suclassroom_app` conserva acceso server-side; usuarios autenticados solo pueden leer/editar datos propios en perfiles, onboarding, proyectos y entregables.
- Las tablas de evaluaciones, feedback, asignaciones y notificaciones tienen RLS activo. El servidor usa `suclassroom_app`; alumnos, mentores y admins tienen politicas de lectura acotadas segun ownership/asignacion.
- Las tablas de progreso y desbloqueos tienen RLS activo. El servidor usa `suclassroom_app`; usuarios autenticados solo leen su propio progreso/desbloqueos/eventos y las reglas publicadas de cursos.
- El contenido publicado de cursos queda disponible en lectura para `anon` y `authenticated` mediante politicas RLS.
- `public.handle_new_auth_user()` sincroniza nuevos usuarios de Supabase Auth hacia `profiles` y `user_roles` mediante trigger interno sobre `auth.users`.
- La funcion de sincronizacion no es invocable desde la API publica (`anon`/`authenticated` no tienen `EXECUTE`).

Storage usa un bucket privado llamado `deliverables` por defecto. La carga y eliminacion de archivos ocurre en Server Actions mediante `StorageService`, con `SUPABASE_SERVICE_ROLE_KEY` solo en servidor. La UI recibe signed URLs temporales para abrir archivos privados cuando el entorno esta configurado.

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

Componentes de entregables:

- `DeliverableForm`
- `DeliverableDraftEditor`
- `DeliverableSubmitButton`
- `DeliverableStatusBadge`
- `DeliverableFileUploader`
- `DeliverableFileList`
- `DeliverableLinkForm`
- `DeliverableLinkList`
- `DeliverableVersionTimeline`
- `StudentDeliverablesTable`
- `AdminDeliverablesTable`
- `DeliverableDetailView`
- `DeliverableRequirementCard`
- `SubmitConfirmationDialog`

Componentes de evaluaciones y feedback:

- `MentorDeliverablesTable`
- `MentorAssignmentPanel`
- `EvaluationForm`
- `EvaluationCriteriaList`
- `EvaluationDecisionButtons`
- `FeedbackForm`
- `FeedbackCard`
- `FeedbackTimeline`
- `EvaluationHistory`
- `ReviewStatusBadge`
- `StudentFeedbackList`
- `NotificationDropdown`
- `DeliverableReviewLayout`

Componentes de progreso y desbloqueos:

- `CourseProgressCard`
- `LessonProgressButton`
- `CourseLockedState`
- `CourseUnlockedState`
- `CourseProgressBar`
- `NextStepCard`
- `UnlockReasonCard`
- `StudentProgressTimeline`
- `AdminUserProgressView`
- `CourseUnlockRulesForm`
- `CourseUnlockRulesTable`
- `ManualUnlockButton`

## Limites actuales

No se implementan mentorias completas, pagos, instituciones avanzadas, reportes reales, certificados, IA, comunidad ni desbloqueos avanzados por cohortes.
