Actúa como Senior Full Stack Engineer especializado en dashboards analíticos, reportes, KPIs, PostHog, notificaciones, emails transaccionales, Supabase, Drizzle ORM y Recharts.

Vas a continuar SUClassroom.

Lee primero:

1. 01_PRD_SUClassroom.md
2. 02_Arquitectura_Tecnica_Estructura_Fases_SUClassroom.md
3. docs/ARCHITECTURE.md
4. docs/PHASES.md
5. docs/PROGRESS_UNLOCKS.md
6. docs/MENTORSHIPS.md
7. docs/PAYMENTS_QULQI.md
8. docs/INSTITUTIONS_COHORTS.md

OBJETIVO:

Implementar únicamente:

FASE 11: Reportes, analítica, KPIs, eventos PostHog y notificaciones.

CONTEXTO:

SUClassroom debe medir ejecución e impacto, no solo consumo de contenido. Los dashboards deben mostrar métricas de cursos, proyectos, entregables, aprobaciones, mentorías, pagos, conversión y progreso institucional.

NO IMPLEMENTES TODAVÍA:

- IA predictiva.
- Reportes PDF complejos.
- Data warehouse.
- BI externo.
- Automatizaciones avanzadas.
- Certificados.
- Comunidad.

ALCANCE:

1. KPIs por rol.
2. Dashboard analítico admin.
3. Dashboard analítico mentor.
4. Dashboard analítico institution.
5. Reportes básicos.
6. Eventos PostHog.
7. Notificaciones internas.
8. Emails transaccionales mínimos.
9. Filtros básicos.
10. Export CSV básico si es viable.

MODELO DE DATOS:

Implementa o ajusta:

analytics_snapshots:
- id
- scope
- scope_id
- metric_key
- metric_value
- metadata
- calculated_at
- created_at

reports:
- id
- created_by
- scope
- scope_id
- report_type
- status
- filters
- file_url
- created_at
- updated_at

notifications:
- id
- user_id
- type
- title
- message
- href
- read_at
- created_at

email_logs:
- id
- user_id
- email
- template
- status
- provider_message_id
- error_message
- sent_at
- created_at

ENUMS:

ReportScope:
- admin
- mentor
- student
- institution
- cohort

ReportType:
- progress
- deliverables
- payments
- mentorships
- institution_impact

ReportStatus:
- pending
- generated
- failed

NotificationType:
- deliverable_submitted
- deliverable_approved
- deliverable_rejected
- feedback_received
- course_unlocked
- mentorship_requested
- mentorship_confirmed
- payment_confirmed
- invitation_received

REGLAS:

- Admin ve métricas globales.
- Mentor ve métricas de sus alumnos/entregables.
- Institution ve métricas de sus cohortes.
- Student ve métricas personales.
- No exponer datos de otra institución.
- Eventos PostHog no deben incluir datos sensibles.
- Emails deben usar plantillas claras.
- Notificaciones deben marcarse como leídas.
- Reportes deben respetar permisos.

KPIs:

Admin:
- Usuarios registrados.
- Usuarios activos.
- Cursos publicados.
- Cursos iniciados.
- Cursos completados.
- Entregables enviados.
- Entregables aprobados.
- Entregables rechazados.
- Asesorías solicitadas.
- Asesorías realizadas.
- Ingresos.
- Conversión gratuito a pago.

Mentor:
- Entregables asignados.
- Entregables revisados.
- Tiempo promedio de revisión.
- Aprobados.
- Rechazados.
- Asesorías próximas.
- Asesorías completadas.

Institution:
- Cohortes activas.
- Participantes.
- Avance promedio.
- Cursos asignados.
- Proyectos enviados.
- Proyectos aprobados.
- Participantes activos.

Student:
- Cursos iniciados.
- Cursos completados.
- Entregables enviados.
- Feedback recibido.
- Cursos desbloqueados.
- Próximo paso.

POSTHOG EVENTS:

Implementar helper para eventos:

- user_registered
- onboarding_completed
- course_started
- lesson_completed
- deliverable_submitted
- deliverable_approved
- deliverable_rejected
- mentorship_requested
- payment_started
- payment_completed
- course_unlocked
- report_generated

Cada evento debe:
- Evitar datos sensibles.
- Incluir IDs internos cuando sea seguro.
- Incluir rol.
- Incluir timestamp.
- No romper si PostHog no está configurado.

EMAILS / NOTIFICACIONES:

Mínimo implementar o preparar:

- Entregable aprobado.
- Entregable rechazado.
- Feedback recibido.
- Curso desbloqueado.
- Mentoría confirmada.
- Pago confirmado.
- Invitación institucional.

SERVICES:

- AnalyticsService
- ReportService
- NotificationService
- EmailService
- PostHogService
- MetricsService

SERVER ACTIONS / QUERIES:

Analytics:
- getAdminDashboardMetrics
- getStudentDashboardMetrics
- getMentorDashboardMetrics
- getInstitutionDashboardMetrics
- getCohortMetrics

Reports:
- generateReport
- getReports
- getReportById
- exportReportCsv, si viable

Notifications:
- getUserNotifications
- markNotificationAsRead
- markAllNotificationsAsRead
- createNotification

Emails:
- sendTransactionalEmail
- getEmailLogs

RUTAS:

Admin:
- /dashboard/admin/analytics
- /dashboard/admin/reports
- /dashboard/admin/reports/[reportId]
- /dashboard/admin/notifications

Mentor:
- /dashboard/mentor/analytics

Institution:
- /dashboard/institution/reports
- /dashboard/institution/analytics

Student:
- /dashboard/student/progress
- /dashboard/student/notifications

UI / COMPONENTES:

Crear:

- AnalyticsMetricCard
- AnalyticsChartCard
- AdminAnalyticsDashboard
- MentorAnalyticsDashboard
- InstitutionAnalyticsDashboard
- StudentProgressAnalytics
- ReportsTable
- ReportFilters
- GenerateReportButton
- NotificationList
- NotificationItem
- NotificationDropdown
- EmailLogTable
- KpiGrid
- DateRangeFilter

CRITERIOS DE ACEPTACIÓN:

- Métricas admin reales.
- Métricas mentor reales.
- Métricas institution reales.
- Métricas student reales.
- Notificaciones visibles.
- Emails mínimos preparados o funcionales.
- PostHog helper implementado.
- Reportes básicos funcionan.
- Permisos correctos.
- TypeScript sin errores.
- Build exitoso.
- Documentación actualizada.

DOCUMENTACIÓN:

Actualizar:
- README.md
- docs/ARCHITECTURE.md
- docs/PHASES.md

Crear:
- docs/ANALYTICS_REPORTS.md
- docs/NOTIFICATIONS_EMAILS.md

RESUMEN FINAL:

Al terminar, responde:

1. Qué implementaste.
2. Archivos creados.
3. Archivos modificados.
4. Tablas nuevas.
5. Rutas nuevas.
6. Componentes nuevos.
7. Eventos PostHog agregados.
8. Notificaciones/emails implementados.
9. Cómo probar.
10. Comandos ejecutados.
11. Errores.
12. Qué queda pendiente para Fase 12.

Empieza únicamente con Fase 11.