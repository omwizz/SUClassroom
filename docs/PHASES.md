# Fases de implementacion

## Fase 0: Setup tecnico

Estado: completada.

Incluye:

- Next.js App Router con `src/`.
- TypeScript estricto.
- Tailwind CSS.
- shadcn/ui inicializado.
- ESLint y Prettier.
- Dependencias base instaladas.
- `.env.example`.
- Estructura modular del proyecto.
- Drizzle configurado.
- Supabase preparado.

## Fase 1: Autenticacion y roles base

Estado: completada a nivel base.

Incluye:

- Roles `student`, `mentor`, `admin`, `institution`.
- Schema Drizzle para `profiles`, `roles`, `user_roles`, `audit_logs`.
- Migracion SQL inicial.
- Zod schemas para login, registro y perfil.
- Server Actions de auth.
- Proxy de autenticacion para rutas protegidas.
- Guards server-side por rol.
- Redireccion por rol.

Validacion real aplicada:

- Supabase conectado al proyecto real.
- `DATABASE_URL` configurado con usuario dedicado `suclassroom_app`.
- Migraciones aplicadas en la base real.
- Sincronizacion Auth -> Profile con trigger y backfill de usuarios existentes.
- RLS activado con politicas base para app server, usuarios autenticados y lectura publica de cursos publicados.

Pendiente operativo:

- Activar leaked password protection en Supabase Auth desde el dashboard.

## Fase 2: Layout base y dashboards iniciales

Estado: completada.

Incluye:

- Landing publica.
- Login.
- Register.
- Forgot password placeholder.
- Verify email placeholder.
- Dashboard shell.
- Sidebar por rol.
- Topbar.
- Dashboard inicial de alumno.
- Dashboard inicial de mentor.
- Dashboard inicial de admin con grafico Recharts.
- Dashboard inicial de institucion.
- Rutas placeholder con estado "Proxima fase".

## Fase 3: Cursos, modulos, lecciones y recursos

Estado: completada.

Incluye:

- Schema Drizzle y migracion para categorias, cursos, modulos, lecciones y recursos de leccion.
- Constantes y tipos para estados, niveles, tipos de leccion, proveedores de video y tipos de recurso.
- Zod schemas `courseCategorySchema`, `courseSchema`, `courseModuleSchema`, `lessonSchema` y `lessonResourceSchema`.
- Queries para cursos publicados, cursos admin, detalle por slug/id, modulos, lecciones y recursos.
- Server Actions protegidas para crear, editar, publicar, retirar, archivar, eliminar y reordenar contenido.
- Seed SQL con categorias base y curso demo gratuito publicado.
- Catalogo publico `/courses`.
- Detalle publico `/courses/[courseSlug]`.
- Visor publico de leccion `/courses/[courseSlug]/lessons/[lessonSlug]`.
- Vista de alumno `/dashboard/student/courses` y detalle `/dashboard/student/courses/[courseSlug]`.
- Admin de cursos `/dashboard/admin/courses`, alta, edicion y builder.
- Admin de categorias `/dashboard/admin/categories`.
- Componentes de tarjetas, filtros, badges, formularios, tabla admin, builder, acordeon, visor y lista de recursos.

Notas:

- Si `DATABASE_URL` no esta configurado, las lecturas de cursos usan datos demo publicados.
- Las mutaciones administrativas requieren sesion de `admin` y base de datos configurada.
- La fase no implementa entregables evaluables ni desbloqueos por avance; eso queda para fases posteriores.

## Fase 4: Onboarding, diagnostico inicial y proyecto del alumno

Estado: completada.

Incluye:

- Schema Drizzle y migracion para `student_onboarding` y `student_projects`.
- Constantes y tipos para perfil de alumno, experiencia, etapas, estados y areas de proyecto.
- Zod schemas `onboardingSchema`, `studentProjectSchema` y `onboardingWizardSchema`.
- Services `OnboardingService` y `StudentProjectService` para siguiente paso, slug y curso sugerido.
- Queries para onboarding, proyecto actual, detalle por id, listado admin y archivo basico.
- Server Actions protegidas para completar/actualizar onboarding, crear/editar proyecto, consultar proyecto y archivar desde admin.
- Ruta `/onboarding`.
- Bloqueo de `/dashboard/student/*` cuando el alumno no completo onboarding.
- Dashboard student conectado al proyecto actual, estado, etapa, area y CTA de curso recomendado.
- Vista `/dashboard/student/project` y edicion `/dashboard/student/project/edit`.
- Vista admin `/dashboard/admin/projects` con busqueda/filtros y detalle `/dashboard/admin/projects/[projectId]`.

Notas:

- Sin `DATABASE_URL`, las mutaciones devuelven un mensaje claro y no intentan persistir.
- Las acciones revalidan permisos y ownership aunque la UI ya este protegida por rutas.
- Esta fase no incluye entregables formales, revision por mentor, feedback, aprobaciones, pagos, instituciones/cohortes, reportes avanzados ni IA.

## Fase 5: Entregables, storage y reenvios

Estado: completada.

Incluye:

- Schema Drizzle y migracion para `course_deliverable_requirements`, `deliverables`, `deliverable_files`, `deliverable_links` y `deliverable_versions`.
- Constantes y tipos para estados de entregable y tipos de archivo permitidos.
- Zod schemas `deliverableSchema`, `deliverableFileSchema`, `deliverableLinkSchema`, `submitDeliverableSchema` y `deliverableRequirementSchema`.
- Services `DeliverableService` y `StorageService` para reglas de estado, snapshots, validacion de archivos, rutas de storage y signed URLs.
- Queries para detalle de entregable con evidencia, entregables por alumno, proyecto, curso y bandeja admin.
- Server Actions protegidas para crear/editar borrador, enviar, reenviar, adjuntar/quitar archivos, agregar/quitar links y preparar requisitos de curso.
- Rutas de alumno `/dashboard/student/deliverables`, `/dashboard/student/deliverables/new`, detalle y edicion por id.
- Rutas admin `/dashboard/admin/deliverables` y detalle por id.
- Dashboard student con metrica y CTA de entregables.
- Dashboard admin con metrica y actividad reciente de entregables.
- CTA "Preparar entregable" en detalle de curso para alumno.
- Bucket privado conceptual `deliverables` en Supabase Storage, creado bajo demanda desde servidor si `SUPABASE_SERVICE_ROLE_KEY` esta configurada.

Notas:

- Sin `DATABASE_URL`, las mutaciones devuelven un mensaje claro y no intentan persistir.
- Sin `SUPABASE_SERVICE_ROLE_KEY`, la UI y la DB quedan preparadas, pero la carga privada de archivos devuelve un error claro.
- Los alumnos solo acceden a sus propios entregables. Admin puede consultar todos.
- No se implementa evaluacion por mentor, aprobacion/rechazo formal, feedback avanzado, pagos, mentorias completas, instituciones/cohortes, reportes avanzados ni IA.

## Siguiente fase

Pendiente:

- Revision por mentor.
- Feedback estructurado.
- Aprobacion/rechazo formal.
- Criterios o rubricas de evaluacion.
- Integracion posterior con progreso y desbloqueos.
