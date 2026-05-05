Actúa como Senior Full Stack Engineer especializado en SaaS B2B, multi-tenant básico, instituciones, cohortes, permisos por organización, dashboards y reportes institucionales.

Vas a continuar SUClassroom.

Lee primero:

1. 01_PRD_SUClassroom.md
2. 02_Arquitectura_Tecnica_Estructura_Fases_SUClassroom.md
3. docs/ARCHITECTURE.md
4. docs/PHASES.md
5. docs/PROGRESS_UNLOCKS.md
6. docs/MENTORSHIPS.md
7. docs/PAYMENTS_QULQI.md, si existe

OBJETIVO:

Implementar únicamente:

FASE 10: Instituciones, empresas, ONGs y cohortes.

CONTEXTO:

SUClassroom tendrá modelo B2C y B2B. En B2B, instituciones, ONGs, universidades o empresas podrán gestionar grupos/cohortes, invitar participantes, asignar cursos y monitorear avance.

NO IMPLEMENTES TODAVÍA:

- Licencias institucionales complejas.
- Facturación institucional avanzada.
- Contratos.
- Multi-tenant complejo con dominios personalizados.
- Reportes PDF avanzados.
- IA.
- Certificados avanzados.

ALCANCE:

1. Crear instituciones.
2. Gestionar miembros institucionales.
3. Crear cohortes.
4. Invitar participantes.
5. Asignar cursos a cohorte.
6. Ver progreso básico de participantes.
7. Dashboard institucional.
8. Admin gestiona instituciones.
9. Permisos por institución.
10. Preparar reportes avanzados para Fase 11.

MODELO DE DATOS:

Implementa o ajusta:

institutions:
- id
- name
- slug
- type
- status
- contact_name
- contact_email
- contact_phone
- created_by
- created_at
- updated_at

institution_members:
- id
- institution_id
- user_id
- role
- status
- invited_by
- joined_at
- created_at
- updated_at

cohorts:
- id
- institution_id
- name
- description
- status
- starts_at
- ends_at
- created_by
- created_at
- updated_at

cohort_students:
- id
- cohort_id
- student_id
- status
- invited_email
- joined_at
- created_at
- updated_at

cohort_courses:
- id
- cohort_id
- course_id
- assigned_by
- starts_at
- ends_at
- created_at

institution_invitations:
- id
- institution_id
- cohort_id
- email
- role
- token
- status
- expires_at
- accepted_at
- created_at

ENUMS:

InstitutionType:
- company
- ngo
- university
- incubator
- government
- other

InstitutionStatus:
- pending
- active
- suspended
- archived

InstitutionMemberRole:
- owner
- manager
- viewer

CohortStatus:
- draft
- active
- completed
- archived

InvitationStatus:
- pending
- accepted
- expired
- cancelled

REGLAS:

- Admin puede crear y gestionar instituciones.
- Usuario institution solo ve su institución.
- Institution owner/manager puede crear cohortes.
- Institution puede invitar participantes.
- Institution solo ve participantes de sus cohortes.
- Student invitado puede aceptar invitación.
- Cursos asignados a cohorte deben existir y estar publicados.
- Admin ve todas las instituciones/cohortes.
- No exponer datos de otras instituciones.
- Preparar RLS/RBAC para aislamiento de datos.

VALIDACIONES ZOD:

Crear:

institutionSchema
institutionMemberSchema
cohortSchema
cohortStudentSchema
cohortCourseSchema
institutionInvitationSchema
acceptInvitationSchema

SERVER ACTIONS / SERVICES:

Institutions:
- createInstitution
- updateInstitution
- getAdminInstitutions
- getMyInstitution
- suspendInstitution
- archiveInstitution

Members:
- addInstitutionMember
- updateInstitutionMemberRole
- removeInstitutionMember
- getInstitutionMembers

Cohorts:
- createCohort
- updateCohort
- archiveCohort
- getInstitutionCohorts
- getCohortById

Participants:
- inviteParticipantToCohort
- acceptCohortInvitation
- removeParticipantFromCohort
- getCohortParticipants

Courses:
- assignCourseToCohort
- removeCourseFromCohort
- getCohortCourses

Services:
- InstitutionService
- CohortService
- InvitationService
- InstitutionPermissionService

RUTAS:

Institution:
- /dashboard/institution
- /dashboard/institution/cohorts
- /dashboard/institution/cohorts/new
- /dashboard/institution/cohorts/[cohortId]
- /dashboard/institution/participants
- /dashboard/institution/courses
- /dashboard/institution/reports

Admin:
- /dashboard/admin/institutions
- /dashboard/admin/institutions/new
- /dashboard/admin/institutions/[institutionId]
- /dashboard/admin/institutions/[institutionId]/cohorts

Public/Auth:
- /invite/[token] o /invitations/[token]

UI / COMPONENTES:

Crear:

- InstitutionForm
- InstitutionStatusBadge
- InstitutionTable
- InstitutionMemberTable
- CohortForm
- CohortCard
- CohortTable
- CohortParticipantsTable
- InviteParticipantForm
- CohortCourseAssignment
- InstitutionDashboardStats
- InstitutionProgressOverview
- InvitationAcceptCard
- AdminInstitutionDetail

DASHBOARD INSTITUTION:

Mostrar:
- Cohortes activas.
- Participantes.
- Cursos asignados.
- Avance promedio.
- Proyectos enviados.
- Proyectos aprobados.
- CTA crear cohorte.
- CTA invitar participante.

DASHBOARD ADMIN:

Mostrar:
- Instituciones activas.
- Cohortes activas.
- Participantes institucionales.
- Actividad reciente.

REQUISITOS FUNCIONALES:

RF-INS-001: Admin crea institución.
RF-INS-002: Admin edita institución.
RF-INS-003: Institution manager crea cohorte.
RF-INS-004: Institution invita participante.
RF-INS-005: Participante acepta invitación.
RF-INS-006: Institution asigna curso a cohorte.
RF-INS-007: Institution ve progreso básico.
RF-INS-008: Institution no ve otras instituciones.
RF-INS-009: Admin ve todo.
RF-INS-010: Sistema prepara reportes institucionales.

CRITERIOS DE ACEPTACIÓN:

- Instituciones funcionan.
- Cohortes funcionan.
- Invitaciones funcionan.
- Participantes asociados.
- Cursos asignados.
- Permisos aislados.
- Dashboard institucional funcional.
- TypeScript sin errores.
- Build exitoso.
- Documentación actualizada.

DOCUMENTACIÓN:

Actualizar:
- README.md
- docs/ARCHITECTURE.md
- docs/PHASES.md

Crear:
- docs/INSTITUTIONS_COHORTS.md

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
10. Riesgos de permisos.
11. Errores.
12. Qué queda pendiente para Fase 11.

Empieza únicamente con Fase 10.