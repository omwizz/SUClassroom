Actúa como Senior Full Stack Engineer, Tech Lead y especialista en flujos de revisión, evaluación, feedback estructurado, RBAC, Server Actions, Drizzle ORM y UX para dashboards de mentores.

Vas a continuar SUClassroom.

Lee primero:

1. 01_PRD_SUClassroom.md
2. 02_Arquitectura_Tecnica_Estructura_Fases_SUClassroom.md
3. docs/PHASES.md
4. docs/ARCHITECTURE.md
5. docs/DELIVERABLES.md

OBJETIVO:

Implementar únicamente:

FASE 6: Evaluación de entregables y feedback estructurado por mentor/admin.

CONTEXTO:

En SUClassroom, el entregable enviado por el alumno debe revisarse con criterios definidos. El mentor o administrador puede aprobar, rechazar o solicitar cambios. El feedback debe ser claro, práctico y accionable.

NO IMPLEMENTES TODAVÍA:

- Pagos.
- Qulqi.
- Mentorías completas.
- Calendario avanzado.
- Desbloqueos automáticos avanzados.
- Reportes avanzados.
- Instituciones/cohortes.
- IA.
- Certificados.

ALCANCE:

1. Bandeja de entregables para mentor.
2. Asignación básica de mentor a entregables o proyectos.
3. Evaluación de entregables.
4. Feedback estructurado.
5. Aprobación.
6. Rechazo.
7. Solicitud de cambios.
8. Historial de evaluaciones.
9. Notificaciones internas básicas.
10. Preparar eventos para progreso/desbloqueo en la siguiente fase.

MODELO DE DATOS:

Implementa o ajusta:

mentor_assignments:
- id
- mentor_id
- student_id
- project_id
- course_id
- assigned_by
- status
- created_at
- updated_at

evaluations:
- id
- deliverable_id
- mentor_id
- status
- decision
- score
- rubric_snapshot
- reviewed_at
- created_at
- updated_at

feedback:
- id
- evaluation_id
- deliverable_id
- author_id
- summary
- strengths
- improvements
- next_steps
- priority
- is_visible_to_student
- created_at
- updated_at

evaluation_criteria:
- id
- course_id
- title
- description
- max_score
- sort_order
- is_required
- created_at
- updated_at

evaluation_scores:
- id
- evaluation_id
- criteria_id
- score
- comment
- created_at

notifications, si no existe:
- id
- user_id
- type
- title
- message
- href
- read_at
- created_at

ENUMS:

EvaluationStatus:
- pending
- in_progress
- completed

EvaluationDecision:
- approved
- rejected
- changes_requested

FeedbackPriority:
- low
- medium
- high

AssignmentStatus:
- active
- inactive

NotificationType:
- deliverable_submitted
- deliverable_approved
- deliverable_rejected
- changes_requested
- feedback_received

REGLAS:

- Solo mentor asignado o admin puede evaluar.
- Student no puede evaluar.
- Mentor no puede evaluar entregables no asignados.
- Admin puede evaluar todos.
- Si aprueba: deliverable.status = approved.
- Si rechaza: deliverable.status = rejected.
- Si solicita cambios: deliverable.status = changes_requested.
- Si hay rechazo o cambios, feedback debe ser obligatorio.
- Student puede ver feedback visible.
- Feedback no debe poder editarse por student.
- Historial debe mantenerse.
- No desbloquear curso todavía; solo disparar preparación para Fase 7.

VALIDACIONES ZOD:

Crear:

evaluationSchema:
- deliverable_id requerido.
- decision requerido.
- score opcional.
- criteria_scores opcional.

feedbackSchema:
- summary requerido.
- strengths opcional.
- improvements requerido si rejected o changes_requested.
- next_steps requerido.
- priority requerido.
- is_visible_to_student boolean.

mentorAssignmentSchema:
- mentor_id requerido.
- student_id requerido.
- project_id opcional.
- course_id opcional.

SERVER ACTIONS / SERVICES:

Assignments:
- assignMentorToStudent
- assignMentorToDeliverable
- getMentorAssignments

Evaluations:
- startEvaluation
- submitEvaluation
- approveDeliverable
- rejectDeliverable
- requestChanges
- getEvaluationByDeliverable
- getEvaluationHistory

Feedback:
- createFeedback
- updateFeedback, solo si permitido
- getStudentFeedback
- getFeedbackByDeliverable

Notifications:
- createNotification
- markNotificationAsRead
- getUserNotifications

Services:
- EvaluationService
- FeedbackService
- MentorAssignmentService
- NotificationService

RUTAS:

Mentor:
- /dashboard/mentor/deliverables
- /dashboard/mentor/deliverables/[deliverableId]
- /dashboard/mentor/evaluations
- /dashboard/mentor/students

Student:
- /dashboard/student/feedback
- /dashboard/student/deliverables/[deliverableId]/feedback

Admin:
- /dashboard/admin/deliverables/[deliverableId]/review
- /dashboard/admin/mentor-assignments

UI / COMPONENTES:

Crear:

- MentorDeliverablesTable
- MentorAssignmentPanel
- EvaluationForm
- EvaluationCriteriaList
- EvaluationDecisionButtons
- FeedbackForm
- FeedbackCard
- FeedbackTimeline
- EvaluationHistory
- ReviewStatusBadge
- StudentFeedbackList
- NotificationDropdown, si no existe
- DeliverableReviewLayout

DASHBOARD MENTOR:

Actualizar:
- Entregables pendientes reales.
- Entregables en revisión.
- Entregables aprobados/rechazados.
- Alumnos asignados.
- CTA “Revisar entregables”.

DASHBOARD STUDENT:

Actualizar:
- Feedback reciente.
- Estado de entregables.
- Próximos pasos si requiere cambios.

DASHBOARD ADMIN:

Actualizar:
- Entregables pendientes.
- Evaluaciones recientes.
- Asignaciones de mentor.

REQUISITOS FUNCIONALES:

RF-EVAL-001: Mentor ve entregables asignados.
RF-EVAL-002: Admin ve todos los entregables.
RF-EVAL-003: Mentor puede iniciar revisión.
RF-EVAL-004: Mentor puede aprobar entregable.
RF-EVAL-005: Mentor puede rechazar entregable.
RF-EVAL-006: Mentor puede solicitar cambios.
RF-EVAL-007: Feedback obligatorio en rechazo/cambios.
RF-EVAL-008: Student ve feedback.
RF-EVAL-009: Sistema registra historial.
RF-EVAL-010: Sistema notifica al alumno.
RF-EVAL-011: Mentor no evalúa entregables no asignados.
RF-EVAL-012: Admin puede asignar mentor.

CRITERIOS DE ACEPTACIÓN:

- Mentor revisa entregables asignados.
- Admin asigna mentores.
- Evaluation se crea.
- Feedback se crea.
- Estados cambian correctamente.
- Student ve feedback.
- Notificaciones internas funcionan.
- RBAC protegido.
- TypeScript sin errores.
- Build exitoso.
- Documentación actualizada.

DOCUMENTACIÓN:

Actualizar:
- README.md
- docs/ARCHITECTURE.md
- docs/PHASES.md
- docs/DELIVERABLES.md

Crear:
- docs/EVALUATIONS_FEEDBACK.md

RESUMEN FINAL:

Al terminar, responde:

1. Qué implementaste.
2. Archivos creados.
3. Archivos modificados.
4. Tablas nuevas.
5. Rutas nuevas.
6. Componentes nuevos.
7. Server Actions/services creados.
8. Cómo probar.
9. Comandos ejecutados.
10. Errores.
11. Qué queda pendiente para Fase 7.

Empieza únicamente con Fase 6.