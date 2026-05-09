# Evaluaciones y feedback

Documento de referencia de la Fase 6.

## Alcance implementado

- Bandeja de entregables asignados para mentor.
- Asignacion basica de mentor a alumno/proyecto/curso desde admin.
- Revision de entregables por mentor asignado o admin.
- Evaluacion con decision, puntaje opcional y criterios por curso.
- Feedback estructurado con resumen, fortalezas, mejoras, siguientes pasos, prioridad y visibilidad para alumno.
- Aprobacion, rechazo y solicitud de cambios.
- Historial de evaluaciones y feedback.
- Notificaciones internas basicas para alumnos.
- Dashboards student, mentor y admin conectados a estados reales.

## Fuera de alcance

No se implementan pagos, Qulqi, mentorias completas, calendario avanzado, desbloqueos automaticos avanzados, reportes avanzados, instituciones/cohortes, IA ni certificados.

## Tablas

`mentor_assignments`

- `id`
- `mentor_id`
- `student_id`
- `project_id`
- `course_id`
- `assigned_by`
- `status`
- `created_at`
- `updated_at`

`evaluation_criteria`

- `id`
- `course_id`
- `title`
- `description`
- `max_score`
- `sort_order`
- `is_required`
- `created_at`
- `updated_at`

`evaluations`

- `id`
- `deliverable_id`
- `mentor_id`
- `status`
- `decision`
- `score`
- `rubric_snapshot`
- `reviewed_at`
- `created_at`
- `updated_at`

`feedback`

- `id`
- `evaluation_id`
- `deliverable_id`
- `author_id`
- `summary`
- `strengths`
- `improvements`
- `next_steps`
- `priority`
- `is_visible_to_student`
- `created_at`
- `updated_at`

`evaluation_scores`

- `id`
- `evaluation_id`
- `criteria_id`
- `score`
- `comment`
- `created_at`

`notifications`

- `id`
- `user_id`
- `type`
- `title`
- `message`
- `href`
- `read_at`
- `created_at`

## Estados y decisiones

EvaluationStatus:

- `pending`
- `in_progress`
- `completed`

EvaluationDecision:

- `approved`
- `rejected`
- `changes_requested`

FeedbackPriority:

- `low`
- `medium`
- `high`

AssignmentStatus:

- `active`
- `inactive`

## Reglas de negocio

- Student no puede evaluar entregables.
- Mentor solo puede evaluar entregables cubiertos por una asignacion activa.
- Admin puede evaluar cualquier entregable y asignar mentores.
- `approved` cambia el entregable a `approved`.
- `rejected` cambia el entregable a `rejected`.
- `changes_requested` cambia el entregable a `changes_requested`.
- Rechazo y solicitud de cambios requieren mejoras accionables en el feedback.
- Student solo ve feedback marcado como visible.
- Feedback no puede editarse por student.
- Cada evaluacion y feedback queda en historial.
- La notificacion interna apunta al detalle de feedback del entregable.

## Rutas

Mentor:

- `/dashboard/mentor/deliverables`
- `/dashboard/mentor/deliverables/[deliverableId]`
- `/dashboard/mentor/evaluations`
- `/dashboard/mentor/feedback`
- `/dashboard/mentor/students`

Student:

- `/dashboard/student/feedback`
- `/dashboard/student/deliverables/[deliverableId]/feedback`

Admin:

- `/dashboard/admin/deliverables/[deliverableId]/review`
- `/dashboard/admin/mentor-assignments`

## Archivos principales

- `src/db/schema/evaluations.ts`
- `src/db/migrations/0009_evaluations_feedback_mentor.sql`
- `src/constants/evaluations.ts`
- `src/types/evaluations.ts`
- `src/lib/validations/evaluations.ts`
- `src/server/queries/evaluations.ts`
- `src/server/actions/evaluation-actions.ts`
- `src/server/services/evaluation-service.ts`
- `src/server/services/feedback-service.ts`
- `src/server/services/mentor-assignment-service.ts`
- `src/server/services/notification-service.ts`
- `src/features/evaluations/components`

## Como probar

1. Inicia sesion como admin.
2. Abre `/dashboard/admin/mentor-assignments`.
3. Asigna un mentor a un entregable existente.
4. Inicia sesion como mentor y abre `/dashboard/mentor/deliverables`.
5. Entra al detalle del entregable, inicia revision y registra decision con feedback.
6. Inicia sesion como alumno y revisa `/dashboard/student/feedback` o el detalle `/dashboard/student/deliverables/[deliverableId]/feedback`.

## Variables de entorno

La fase requiere `DATABASE_URL` para persistir datos. No agrega nuevas variables. La carga de archivos sigue dependiendo de la configuracion de Storage documentada en `docs/STORAGE.md`.
