Actúa como Senior Full Stack Engineer y especialista en lógica de progreso, reglas de negocio, desbloqueos, estados, auditoría y arquitectura modular con Next.js, Supabase y Drizzle ORM.

Vas a continuar SUClassroom.

Lee primero:

1. 01_PRD_SUClassroom.md
2. 02_Arquitectura_Tecnica_Estructura_Fases_SUClassroom.md
3. docs/ARCHITECTURE.md
4. docs/PHASES.md
5. docs/COURSES.md
6. docs/DELIVERABLES.md
7. docs/EVALUATIONS_FEEDBACK.md

OBJETIVO:

Implementar únicamente:

FASE 7: Sistema de progreso y desbloqueo de cursos.

CONTEXTO:

En SUClassroom el avance no depende solo de ver videos. Un curso se considera completado cuando el alumno desarrolla un proyecto/entregable y este es aprobado. El sistema debe calcular progreso real, mostrar próximos pasos y desbloquear cursos según reglas.

NO IMPLEMENTES TODAVÍA:

- Pagos Qulqi.
- Mentorías completas.
- Instituciones/cohortes avanzadas.
- Reportes avanzados.
- IA.
- Certificados.
- Gamificación avanzada.

ALCANCE:

1. Progreso por curso.
2. Progreso por lección.
3. Estado de curso por alumno.
4. Desbloqueo básico de cursos.
5. Próximo paso recomendado.
6. Historial de eventos de progreso.
7. Integración con evaluación aprobada.
8. UI para cursos bloqueados/desbloqueados.
9. Preparación para regla futura de pago/asesoría.

MODELO DE DATOS:

Implementa o ajusta:

user_course_progress:
- id
- student_id
- course_id
- status
- progress_percentage
- started_at
- completed_at
- last_activity_at
- created_at
- updated_at

user_lesson_progress:
- id
- student_id
- lesson_id
- course_id
- status
- completed_at
- created_at
- updated_at

course_unlocks:
- id
- student_id
- course_id
- unlocked_by_course_id
- unlocked_by_deliverable_id
- unlocked_by_payment_id
- reason
- unlocked_at
- created_at

course_unlock_rules:
- id
- course_id
- required_previous_course_id
- requires_approved_deliverable
- requires_payment
- requires_mentorship
- sort_order
- created_at
- updated_at

progress_events:
- id
- student_id
- course_id
- lesson_id
- deliverable_id
- event_type
- metadata
- created_at

ENUMS:

CourseProgressStatus:
- locked
- available
- in_progress
- pending_review
- approved
- completed

LessonProgressStatus:
- not_started
- in_progress
- completed

ProgressEventType:
- course_started
- lesson_completed
- deliverable_submitted
- deliverable_approved
- deliverable_rejected
- course_completed
- course_unlocked

UnlockReason:
- first_free_course
- previous_course_completed
- admin_manual
- payment_confirmed
- mentorship_completed

REGLAS DE NEGOCIO:

- El primer curso gratuito debe estar disponible para student.
- Un curso bloqueado no puede ser iniciado por student.
- Un curso se inicia al acceder o presionar iniciar.
- Una lección puede marcarse como completada.
- Completar lecciones no completa el curso por sí solo.
- El curso se completa cuando el entregable requerido está aprobado.
- Cuando un entregable es aprobado, ProgressService debe evaluar si se completa el curso.
- Si el curso se completa, se puede desbloquear el siguiente según reglas.
- Si la regla requiere pago/mentoría y todavía no existe, dejar estado preparado.
- Admin puede desbloquear manualmente.
- Registrar eventos en progress_events.
- Mostrar al student por qué un curso está bloqueado.

VALIDACIONES ZOD:

Crear:

startCourseSchema
completeLessonSchema
unlockCourseSchema
courseUnlockRuleSchema
manualUnlockSchema

SERVER ACTIONS / SERVICES:

Progress:
- startCourse
- markLessonCompleted
- getStudentCourseProgress
- getStudentProgressSummary
- getCourseProgressStatus
- calculateCourseProgress
- recordProgressEvent

Unlocks:
- unlockCourseForStudent
- createCourseUnlockRule
- updateCourseUnlockRule
- getUnlockRules
- evaluateNextCourseUnlock
- manualUnlockCourse

Integration:
- onDeliverableApproved
- onDeliverableRejected
- onCourseCompleted

Services:
- ProgressService
- CourseUnlockService
- NextStepService

RUTAS:

Student:
- /dashboard/student/progress
- /dashboard/student/courses
- /dashboard/student/courses/[courseSlug]

Admin:
- /dashboard/admin/course-unlock-rules
- /dashboard/admin/users/[userId]/progress

UI / COMPONENTES:

Crear o actualizar:

- CourseProgressCard
- LessonProgressButton
- CourseLockedState
- CourseUnlockedState
- CourseProgressBar
- NextStepCard
- UnlockReasonCard
- StudentProgressTimeline
- AdminUserProgressView
- CourseUnlockRulesForm
- CourseUnlockRulesTable
- ManualUnlockButton

DASHBOARD STUDENT:

Actualizar:
- Progreso real.
- Cursos bloqueados.
- Cursos disponibles.
- Próximo paso recomendado.
- Mensaje claro: “Para desbloquear este curso necesitas aprobar el entregable anterior”.

DASHBOARD ADMIN:

Actualizar:
- Ver progreso por usuario.
- Desbloquear manualmente.
- Gestionar reglas básicas.

REQUISITOS FUNCIONALES:

RF-PROG-001: Student inicia curso disponible.
RF-PROG-002: Student marca lección como completada.
RF-PROG-003: Sistema calcula progreso.
RF-PROG-004: Curso no se completa solo con videos.
RF-PROG-005: Curso se completa con entregable aprobado.
RF-PROG-006: Sistema desbloquea siguiente curso según regla.
RF-PROG-007: Student ve motivo de bloqueo.
RF-PROG-008: Admin puede desbloquear manualmente.
RF-PROG-009: Sistema registra eventos de progreso.
RF-PROG-010: Dashboard muestra próximo paso.

CRITERIOS DE ACEPTACIÓN:

- Progreso se registra.
- Lecciones se completan.
- Cursos bloqueados no se inician.
- Curso aprobado completa progreso.
- Desbloqueo básico funciona.
- NextStep funciona.
- Admin ve progreso.
- TypeScript sin errores.
- Build exitoso.
- Documentación actualizada.

DOCUMENTACIÓN:

Actualizar:
- README.md
- docs/ARCHITECTURE.md
- docs/PHASES.md
- docs/COURSES.md
- docs/EVALUATIONS_FEEDBACK.md

Crear:
- docs/PROGRESS_UNLOCKS.md

RESUMEN FINAL:

Al terminar, responde:

1. Qué implementaste.
2. Archivos creados.
3. Archivos modificados.
4. Tablas nuevas.
5. Rutas nuevas.
6. Componentes nuevos.
7. Servicios creados.
8. Cómo probar.
9. Comandos ejecutados.
10. Errores.
11. Qué queda pendiente para Fase 8.

Empieza únicamente con Fase 7.