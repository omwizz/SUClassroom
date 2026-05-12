# Progreso y desbloqueos

Documento de referencia de la Fase 7.

## Alcance implementado

- Progreso de curso por alumno.
- Progreso de leccion por alumno.
- Estado de curso: bloqueado, disponible, en progreso, en revision, aprobado y completado.
- Primer curso gratuito disponible sin datos adicionales.
- Desbloqueo basico por curso previo completado.
- Desbloqueo manual desde admin.
- Reglas de desbloqueo administrables.
- Historial de eventos de progreso.
- Siguiente paso sugerido para alumno.
- Integracion con envio de entregables y evaluaciones aprobadas/rechazadas.

## Fuera de alcance

No se implementan pagos, Qulqi, mentorias completas, instituciones/cohortes avanzadas, reportes avanzados, IA, certificados ni gamificacion avanzada.

## Tablas

`user_course_progress`

- `id`
- `student_id`
- `course_id`
- `status`
- `progress_percentage`
- `started_at`
- `completed_at`
- `last_activity_at`
- `created_at`
- `updated_at`

`user_lesson_progress`

- `id`
- `student_id`
- `lesson_id`
- `course_id`
- `status`
- `completed_at`
- `created_at`
- `updated_at`

`course_unlocks`

- `id`
- `student_id`
- `course_id`
- `unlocked_by_course_id`
- `unlocked_by_deliverable_id`
- `unlocked_by_payment_id`
- `reason`
- `unlocked_at`
- `created_at`

`course_unlock_rules`

- `id`
- `course_id`
- `required_previous_course_id`
- `requires_approved_deliverable`
- `requires_payment`
- `requires_mentorship`
- `sort_order`
- `created_at`
- `updated_at`

`progress_events`

- `id`
- `student_id`
- `course_id`
- `lesson_id`
- `deliverable_id`
- `event_type`
- `metadata`
- `created_at`

## Estados y eventos

CourseProgressStatus:

- `locked`
- `available`
- `in_progress`
- `pending_review`
- `approved`
- `completed`

LessonProgressStatus:

- `not_started`
- `in_progress`
- `completed`

ProgressEventType:

- `course_started`
- `lesson_completed`
- `deliverable_submitted`
- `deliverable_approved`
- `deliverable_rejected`
- `course_completed`
- `course_unlocked`

UnlockReason:

- `first_free_course`
- `previous_course_completed`
- `admin_manual`
- `payment_confirmed`
- `mentorship_completed`

## Reglas de negocio

- Un alumno ve cursos publicados con estado de acceso.
- El primer curso gratuito queda disponible.
- Un curso bloqueado no puede iniciarse desde el dashboard student.
- Iniciar un curso crea o actualiza `user_course_progress`.
- Marcar lecciones como completadas crea o actualiza `user_lesson_progress`.
- Las lecciones suben porcentaje, pero no completan el curso por si solas.
- El curso se completa cuando el entregable requerido asociado al curso es aprobado.
- La aprobacion registra eventos, completa el curso y evalua reglas del siguiente curso.
- Rechazo o solicitud de cambios registra evento y mantiene el curso en progreso.
- Admin puede crear reglas y desbloquear manualmente cursos por alumno.
- Las reglas `requires_payment` y `requires_mentorship` quedan preparadas, pero no ejecutan pagos ni mentorias.

## Rutas

Alumno:

- `/dashboard/student/progress`
- `/dashboard/student/courses`
- `/dashboard/student/courses/[courseSlug]`

Admin:

- `/dashboard/admin/course-unlock-rules`
- `/dashboard/admin/users`
- `/dashboard/admin/users/[userId]/progress`

## Archivos principales

- `src/db/schema/progress.ts`
- `src/db/migrations/0011_progress_unlocks.sql`
- `src/constants/progress.ts`
- `src/types/progress.ts`
- `src/lib/validations/progress.ts`
- `src/server/queries/progress.ts`
- `src/server/actions/progress-actions.ts`
- `src/server/services/progress-service.ts`
- `src/server/services/course-unlock-service.ts`
- `src/server/services/next-step-service.ts`
- `src/features/progress/components`

## Seguridad

- Las Server Actions validan sesion y rol.
- Student/admin pueden iniciar curso y completar leccion sobre su propio perfil activo.
- Solo admin crea reglas y ejecuta desbloqueo manual.
- RLS esta activo en todas las tablas nuevas.
- `suclassroom_app` conserva acceso server-side.
- Usuarios autenticados solo leen su propio progreso, lecciones, desbloqueos y eventos.
- Las reglas de desbloqueo son legibles para cursos publicados.

## Como probar

1. Inicia sesion como alumno.
2. Abre `/dashboard/student/progress`.
3. Inicia el curso gratuito disponible.
4. Entra a `/dashboard/student/courses/[courseSlug]`.
5. Marca una leccion como completada.
6. Crea y envia el entregable del curso.
7. Inicia sesion como admin o mentor asignado y aprueba el entregable.
8. Vuelve como alumno y revisa que el curso quede completado y que el historial registre eventos.
9. Como admin, abre `/dashboard/admin/course-unlock-rules` para crear reglas o `/dashboard/admin/users/[userId]/progress` para revisar/desbloquear manualmente.

## Variables de entorno

No agrega variables nuevas. Requiere `DATABASE_URL` para persistir progreso y desbloqueos. La integracion con entregables sigue usando las variables documentadas en `docs/STORAGE.md`.
