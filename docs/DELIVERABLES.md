# Entregables

Documento de referencia de la Fase 5, actualizado con la conexion a Fase 6.

## Alcance implementado

- Borradores de entregables por alumno.
- Conexion con proyecto del alumno y curso publicado.
- Edicion solo mientras el estado sea editable.
- Envio de entregable con versionado.
- Reenvio basico preparado para estados `changes_requested` y `rejected`.
- Archivos adjuntos privados mediante Supabase Storage.
- Enlaces externos como evidencia.
- Historial de versiones.
- Vista del alumno.
- Vista administrativa basica.
- Conexion con revision, evaluacion y feedback de Fase 6.

## Fuera de alcance

No se implementan pagos, Qulqi, mentorias completas, desbloqueos avanzados, reportes, instituciones/cohortes ni IA.

## Tablas

`course_deliverable_requirements`

- `id`
- `course_id`
- `title`
- `description`
- `instructions`
- `required_file_types`
- `max_files`
- `is_required`
- `created_at`
- `updated_at`

`deliverables`

- `id`
- `project_id`
- `course_id`
- `student_id`
- `title`
- `description`
- `instructions_snapshot`
- `status`
- `version`
- `submitted_at`
- `last_resubmitted_at`
- `created_at`
- `updated_at`

`deliverable_files`

- `id`
- `deliverable_id`
- `uploaded_by`
- `file_name`
- `file_path`
- `file_url`
- `file_type`
- `mime_type`
- `size_bytes`
- `created_at`

`deliverable_links`

- `id`
- `deliverable_id`
- `title`
- `url`
- `description`
- `created_at`

`deliverable_versions`

- `id`
- `deliverable_id`
- `version`
- `title`
- `description`
- `status`
- `snapshot`
- `created_at`

## Estados

- `draft`: editable por el alumno.
- `submitted`: enviado y bloqueado para edicion libre.
- `under_review`: revision iniciada por mentor/admin.
- `changes_requested`: permite reenvio.
- `rejected`: permite reenvio.
- `approved`: aprobado por mentor/admin.
- `resubmitted`: reenviado y bloqueado para edicion libre.

La Fase 6 actualiza estos estados desde evaluaciones:

- Decision `approved` -> `deliverables.status = approved`.
- Decision `rejected` -> `deliverables.status = rejected`.
- Decision `changes_requested` -> `deliverables.status = changes_requested`.

## Seguridad

- Cada Server Action valida sesion, rol e ownership.
- El alumno solo crea entregables para su propio proyecto.
- El alumno solo ve y edita sus entregables.
- El admin puede listar y abrir todos los entregables.
- Solo mentor asignado o admin puede revisar/evaluar un entregable.
- El alumno no puede evaluar ni editar feedback.
- Los archivos se guardan en bucket privado y se abren con signed URLs temporales.

## Rutas

Alumno:

- `/dashboard/student/deliverables`
- `/dashboard/student/deliverables/new`
- `/dashboard/student/deliverables/[deliverableId]`
- `/dashboard/student/deliverables/[deliverableId]/edit`

Admin:

- `/dashboard/admin/deliverables`
- `/dashboard/admin/deliverables/[deliverableId]`
- `/dashboard/admin/deliverables/[deliverableId]/review`

Mentor:

- `/dashboard/mentor/deliverables`
- `/dashboard/mentor/deliverables/[deliverableId]`

Feedback alumno:

- `/dashboard/student/feedback`
- `/dashboard/student/deliverables/[deliverableId]/feedback`

## Archivos principales

- `src/db/schema/deliverables.ts`
- `src/db/migrations/0008_deliverables_storage_reenvios.sql`
- `src/constants/deliverables.ts`
- `src/types/deliverables.ts`
- `src/lib/validations/deliverables.ts`
- `src/server/queries/deliverables.ts`
- `src/server/actions/deliverable-actions.ts`
- `src/server/services/deliverable-service.ts`
- `src/server/services/storage-service.ts`
- `src/features/deliverables/components`

## Integracion con evaluaciones

La revision de un entregable no muta directamente desde los componentes de entregables. La decision se registra mediante `src/server/actions/evaluation-actions.ts`, que valida rol, asignacion de mentor y estado revisable antes de llamar a queries de evaluacion.

El historial del alumno se conserva en dos niveles:

- `deliverable_versions`: snapshots de cada envio o reenvio.
- `evaluations`, `feedback` y `evaluation_scores`: historial de revision, feedback y criterios.
