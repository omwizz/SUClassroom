Actúa como Senior Full Stack Engineer, Product Engineer y especialista en Next.js App Router, Supabase, Drizzle ORM, Zod, React Hook Form y diseño de flujos SaaS.

Vas a continuar SUClassroom.

Antes de implementar, lee:

1. 01_PRD_SUClassroom.md
2. 02_Arquitectura_Tecnica_Estructura_Fases_SUClassroom.md
3. docs/ARCHITECTURE.md
4. docs/PHASES.md
5. docs/COURSES.md, si existe

OBJETIVO:

Implementar únicamente:

FASE 4: Onboarding del alumno, diagnóstico inicial y proyecto del alumno.

CONTEXTO:

SUClassroom debe lograr que el alumno no solo vea cursos, sino que construya un proyecto real. Esta fase debe crear el flujo inicial donde el alumno registra su perfil emprendedor, responde diagnóstico inicial y crea su proyecto base.

NO IMPLEMENTES TODAVÍA:

- Entregables formales.
- Revisión por mentor.
- Feedback.
- Aprobaciones.
- Reenvíos.
- Pagos.
- Qulqi.
- Mentorías completas.
- Desbloqueos avanzados.
- Instituciones/cohortes.
- Reportes avanzados.
- IA.

ALCANCE DE ESTA FASE:

1. Onboarding inicial del alumno.
2. Diagnóstico inicial.
3. Registro de proyecto del alumno.
4. Dashboard student conectado parcialmente con proyecto real.
5. Estados básicos del proyecto.
6. Preparación para entregables en Fase 5.

ROLES:

student:
- Completa onboarding.
- Crea proyecto.
- Edita su proyecto.
- Ve su proyecto.
- Ve diagnóstico inicial.

admin:
- Puede ver proyectos de alumnos.
- Puede ver detalle básico.
- No evalúa todavía.

mentor:
- Puede ver proyectos asignados solo si la estructura ya permite asignación simple.
- Si no existe asignación todavía, dejar placeholder.

institution:
- No implementar flujo institucional todavía.

MODELO DE DATOS:

Implementa o ajusta tablas:

student_onboarding:
- id
- student_id
- user_type
- experience_level
- main_goal
- business_area
- project_stage
- biggest_challenge
- motivation
- completed_at
- created_at
- updated_at

student_projects:
- id
- student_id
- name
- slug
- description
- problem
- solution
- target_audience
- current_stage
- business_area
- social_impact
- status
- created_at
- updated_at

project_notes, opcional:
- id
- project_id
- author_id
- note
- visibility
- created_at

ENUMS / CONSTANTES:

UserType:
- entrepreneur
- social_leader
- social_entrepreneur
- institution_participant
- other

ExperienceLevel:
- beginner
- intermediate
- advanced

ProjectStage:
- idea
- validation
- early_execution
- growth
- paused

ProjectStatus:
- draft
- active
- paused
- completed
- archived

BusinessArea:
- validation
- business_model
- marketing_sales
- finance
- operations
- social_programs
- sustainability
- other

VALIDACIONES ZOD:

Crear:

onboardingSchema:
- user_type requerido.
- experience_level requerido.
- main_goal requerido.
- business_area requerido.
- project_stage requerido.
- biggest_challenge opcional.
- motivation opcional.

studentProjectSchema:
- name requerido.
- description requerido.
- problem requerido.
- solution opcional.
- target_audience requerido.
- current_stage requerido.
- business_area requerido.
- social_impact opcional.

SERVER ACTIONS / SERVICES:

Onboarding:
- getStudentOnboarding
- completeStudentOnboarding
- updateStudentOnboarding
- isOnboardingCompleted

Projects:
- createStudentProject
- updateStudentProject
- getCurrentStudentProject
- getStudentProjectById
- getAdminStudentProjects
- archiveStudentProject

Servicios:
- OnboardingService
- StudentProjectService

Reglas:
- Un student debe completar onboarding antes de acceder plenamente al dashboard.
- Si no tiene onboarding completo, redirigir a /onboarding.
- Un student debe poder tener al menos un proyecto activo.
- Para MVP, permitir un proyecto activo principal por alumno.
- No permitir que un student edite proyectos de otro student.
- Admin puede ver todos.

RUTAS:

- /onboarding
- /dashboard/student/project
- /dashboard/student/project/edit
- /dashboard/admin/projects
- /dashboard/admin/projects/[projectId]

UI / COMPONENTES:

Crear:

- OnboardingWizard
- OnboardingStep
- OnboardingProgress
- ProjectForm
- ProjectSummaryCard
- ProjectStageBadge
- ProjectStatusBadge
- StudentProjectPanel
- AdminProjectsTable
- ProjectDetailView
- NextStepCard

Onboarding debe tener pasos:

Paso 1:
- Tipo de usuario.
- Nivel.

Paso 2:
- Objetivo principal.
- Área donde necesita ayuda.

Paso 3:
- Información del proyecto:
  - Nombre.
  - Descripción.
  - Problema.
  - Público objetivo.
  - Etapa.

Paso 4:
- Resumen.
- Confirmar y entrar al dashboard.

DASHBOARD STUDENT:

Actualizar /dashboard/student para mostrar:

- Proyecto actual.
- Estado del proyecto.
- Etapa.
- Próximo paso recomendado.
- Curso sugerido.
- CTA: “Continuar con mi primer curso”.
- Si no hay proyecto, mostrar EmptyState para crear proyecto.
- Si onboarding incompleto, redirigir.

DASHBOARD ADMIN:

Crear o completar /dashboard/admin/projects:

- Tabla de proyectos.
- Filtro por estado.
- Filtro por etapa.
- Buscar por nombre/alumno.
- Ver detalle.

REQUISITOS FUNCIONALES:

RF-PROJ-001: Student completa onboarding.
RF-PROJ-002: Student crea proyecto inicial.
RF-PROJ-003: Student edita su proyecto.
RF-PROJ-004: Student ve su proyecto en dashboard.
RF-PROJ-005: Admin ve proyectos registrados.
RF-PROJ-006: Admin ve detalle de proyecto.
RF-PROJ-007: Sistema redirige a onboarding si falta.
RF-PROJ-008: Proyecto queda preparado para entregables.
RF-PROJ-009: No se permite editar proyecto ajeno.
RF-PROJ-010: Dashboard muestra próximo paso.

CRITERIOS DE ACEPTACIÓN:

- Onboarding funciona.
- Proyecto se crea correctamente.
- Proyecto se asocia al student autenticado.
- Dashboard student muestra proyecto real.
- Admin ve lista de proyectos.
- Zod valida formularios.
- Rutas protegidas.
- RBAC respetado.
- TypeScript sin errores.
- Build exitoso.
- Documentación actualizada.

DOCUMENTACIÓN:

Actualizar:
- README.md
- docs/ARCHITECTURE.md
- docs/PHASES.md

Crear:
- docs/PROJECTS_ONBOARDING.md

RESUMEN FINAL:

Al terminar, responde:

1. Qué implementaste.
2. Archivos creados.
3. Archivos modificados.
4. Tablas nuevas.
5. Rutas nuevas.
6. Componentes creados.
7. Server Actions/services creados.
8. Validaciones creadas.
9. Cómo probar manualmente.
10. Comandos ejecutados.
11. Errores encontrados.
12. Qué queda pendiente para Fase 5.

Empieza únicamente con Fase 4.