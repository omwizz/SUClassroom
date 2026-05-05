Actúa como Senior Full Stack Engineer especializado en SaaS, calendarios, mentorías, agendas, disponibilidad, Server Actions, Supabase, Drizzle ORM y UX de reserva de sesiones.

Vas a continuar SUClassroom.

Lee primero:

1. 01_PRD_SUClassroom.md
2. 02_Arquitectura_Tecnica_Estructura_Fases_SUClassroom.md
3. docs/ARCHITECTURE.md
4. docs/PHASES.md
5. docs/EVALUATIONS_FEEDBACK.md
6. docs/PROGRESS_UNLOCKS.md

OBJETIVO:

Implementar únicamente:

FASE 8: Mentorías, asesorías y agenda básica.

CONTEXTO:

El modelo de monetización principal de SUClassroom se basa en asesorías y acompañamiento estratégico. Esta fase implementa la solicitud, agenda y gestión básica de mentorías, pero sin pagos reales todavía.

NO IMPLEMENTES TODAVÍA:

- Qulqi.
- Pagos reales.
- Webhooks.
- Instituciones/cohortes avanzadas.
- Reportes avanzados.
- Videollamadas internas propias.
- Chat avanzado.
- IA.

ALCANCE:

1. Solicitud de asesoría.
2. Selección de tipo de asesoría.
3. Selección de mentor.
4. Disponibilidad básica del mentor.
5. Agenda de sesiones.
6. Estados de sesión.
7. Notas posteriores del mentor.
8. Próximos pasos.
9. Preparación para pago en Fase 9.
10. Notificaciones internas/email básicas si ya existe sistema.

MODELO DE DATOS:

Implementa o ajusta:

mentor_profiles:
- id
- mentor_id
- bio
- expertise
- hourly_rate
- is_available
- created_at
- updated_at

mentor_availability:
- id
- mentor_id
- day_of_week
- start_time
- end_time
- timezone
- is_active
- created_at
- updated_at

mentorship_sessions:
- id
- student_id
- mentor_id
- project_id
- deliverable_id
- course_id
- type
- status
- scheduled_start
- scheduled_end
- meeting_url
- price_amount
- currency
- payment_required
- payment_status
- student_notes
- mentor_notes
- next_steps
- completed_at
- cancelled_at
- created_at
- updated_at

mentorship_session_events:
- id
- session_id
- event_type
- actor_id
- metadata
- created_at

ENUMS:

MentorshipType:
- project_review
- idea_validation
- marketing_sales
- finance
- operations
- social_program
- strategy
- other

MentorshipStatus:
- requested
- pending_payment
- scheduled
- confirmed
- completed
- cancelled
- rescheduled
- no_show

PaymentStatusForSession:
- not_required
- pending
- paid
- failed

REGLAS:

- Student puede solicitar asesoría.
- Student debe tener proyecto para solicitar asesoría.
- Student puede elegir tipo de asesoría.
- Student puede seleccionar mentor disponible.
- Mentor puede configurar disponibilidad básica.
- Mentor puede ver agenda.
- Mentor puede confirmar/completar sesión.
- Admin puede ver todas las sesiones.
- En esta fase no cobrar realmente.
- Si payment_required = true, dejar estado pending_payment, pero no procesar con Qulqi.
- Mentor registra notas y próximos pasos al completar sesión.
- Student puede ver conclusiones.
- No implementar videollamada propia; usar meeting_url externo manual.

VALIDACIONES ZOD:

Crear:

mentorProfileSchema
mentorAvailabilitySchema
requestMentorshipSchema
scheduleMentorshipSchema
completeMentorshipSchema
cancelMentorshipSchema
rescheduleMentorshipSchema

SERVER ACTIONS / SERVICES:

Mentor:
- updateMentorProfile
- setMentorAvailability
- getAvailableMentors
- getMentorAvailability
- getMentorSchedule

Sessions:
- requestMentorship
- scheduleMentorshipSession
- confirmMentorshipSession
- completeMentorshipSession
- cancelMentorshipSession
- rescheduleMentorshipSession
- getStudentMentorshipSessions
- getMentorMentorshipSessions
- getAdminMentorshipSessions

Services:
- MentorshipService
- MentorAvailabilityService
- MentorshipNotificationService

RUTAS:

Student:
- /dashboard/student/mentorship
- /dashboard/student/mentorship/request
- /dashboard/student/mentorship/[sessionId]

Mentor:
- /dashboard/mentor/mentorship
- /dashboard/mentor/schedule
- /dashboard/mentor/availability
- /dashboard/mentor/mentorship/[sessionId]

Admin:
- /dashboard/admin/mentorship
- /dashboard/admin/mentors
- /dashboard/admin/mentors/[mentorId]

UI / COMPONENTES:

Crear:

- MentorCard
- MentorProfileForm
- MentorAvailabilityForm
- MentorAvailabilityCalendar
- MentorshipRequestForm
- MentorshipTypeSelector
- MentorshipSessionCard
- MentorshipStatusBadge
- MentorshipScheduleTable
- MentorScheduleCalendar
- CompleteSessionForm
- SessionNotesCard
- NextStepsPanel
- AdminMentorshipTable

DASHBOARDS:

Student:
- Próxima asesoría.
- Historial de asesorías.
- CTA solicitar asesoría.
- Notas y próximos pasos.

Mentor:
- Agenda de hoy.
- Sesiones pendientes.
- Sesiones completadas.
- Disponibilidad.

Admin:
- Sesiones solicitadas.
- Sesiones programadas.
- Mentores disponibles.

REQUISITOS FUNCIONALES:

RF-MENT-001: Student solicita asesoría.
RF-MENT-002: Student selecciona tipo.
RF-MENT-003: Student selecciona mentor.
RF-MENT-004: Mentor configura disponibilidad.
RF-MENT-005: Mentor ve agenda.
RF-MENT-006: Mentor completa sesión.
RF-MENT-007: Mentor registra notas.
RF-MENT-008: Student ve próximos pasos.
RF-MENT-009: Admin ve sesiones.
RF-MENT-010: Sistema queda preparado para pago.

CRITERIOS DE ACEPTACIÓN:

- Solicitud funciona.
- Mentor disponible se muestra.
- Sesión se agenda.
- Estados funcionan.
- Mentor completa sesión.
- Notas visibles.
- Admin ve sesiones.
- No hay pagos reales.
- TypeScript sin errores.
- Build exitoso.
- Documentación actualizada.

DOCUMENTACIÓN:

Actualizar:
- README.md
- docs/ARCHITECTURE.md
- docs/PHASES.md

Crear:
- docs/MENTORSHIPS.md

RESUMEN FINAL:

Al terminar, responde:

1. Qué implementaste.
2. Archivos creados.
3. Archivos modificados.
4. Tablas nuevas.
5. Rutas nuevas.
6. Componentes nuevos.
7. Services/actions creados.
8. Cómo probar.
9. Comandos ejecutados.
10. Errores.
11. Qué queda pendiente para Fase 9.

Empieza únicamente con Fase 8.