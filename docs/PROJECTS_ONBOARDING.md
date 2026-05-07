# Onboarding y proyectos

Documento de referencia de la Fase 4.

## Alcance implementado

- Onboarding inicial del alumno en `/onboarding`.
- Diagnostico inicial con perfil, experiencia, objetivo, area, etapa, desafio y motivacion.
- Registro del proyecto inicial dentro del wizard.
- Edicion del proyecto en `/dashboard/student/project/edit`.
- Visualizacion del proyecto en `/dashboard/student/project`.
- Dashboard student conectado a proyecto, estado, etapa, area y siguiente paso.
- Vista administrativa basica en `/dashboard/admin/projects`.
- Detalle administrativo en `/dashboard/admin/projects/[projectId]`.

## Fuera de alcance

No se implementan entregables formales, revision por mentor, feedback, aprobaciones, reenvios, pagos, Qulqi, mentorias completas, desbloqueos avanzados, instituciones/cohortes, reportes avanzados ni IA.

## Tablas

`student_onboarding`

- `id`
- `student_id`
- `user_type`
- `experience_level`
- `main_goal`
- `business_area`
- `project_stage`
- `biggest_challenge`
- `motivation`
- `completed_at`
- `created_at`
- `updated_at`

`student_projects`

- `id`
- `student_id`
- `name`
- `slug`
- `description`
- `problem`
- `solution`
- `target_audience`
- `current_stage`
- `business_area`
- `social_impact`
- `status`
- `created_at`
- `updated_at`

## Seguridad

- Las paginas protegidas usan `requireRole`.
- El dashboard student redirige a `/onboarding` si el alumno no completo diagnostico.
- Las Server Actions vuelven a verificar sesion y rol.
- La edicion de proyecto valida ownership: un alumno no puede editar proyectos de otro alumno.
- El admin puede consultar y archivar proyectos, sin evaluar ni emitir feedback.
- `DATABASE_URL` es obligatorio para persistencia.
- No se expone `SUPABASE_SERVICE_ROLE_KEY` en codigo cliente ni variables `NEXT_PUBLIC`.

## Archivos principales

- `src/db/schema/projects.ts`
- `src/db/migrations/0003_onboarding_projects.sql`
- `src/lib/validations/projects.ts`
- `src/server/queries/projects.ts`
- `src/server/actions/project-actions.ts`
- `src/features/projects/components/onboarding-wizard.tsx`
- `src/features/projects/components/project-form.tsx`
- `src/features/projects/components/admin-projects-table.tsx`
- `src/features/projects/components/project-detail-view.tsx`

