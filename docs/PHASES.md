# Fases de implementacion

## Fase 0: Setup tecnico

Estado: completada.

Incluye:

- Next.js App Router con `src/`.
- TypeScript estricto.
- Tailwind CSS.
- shadcn/ui inicializado.
- ESLint y Prettier.
- Dependencias base instaladas.
- `.env.example`.
- Estructura modular del proyecto.
- Drizzle configurado.
- Supabase preparado.

## Fase 1: Autenticacion y roles base

Estado: completada a nivel base.

Incluye:

- Roles `student`, `mentor`, `admin`, `institution`.
- Schema Drizzle para `profiles`, `roles`, `user_roles`, `audit_logs`.
- Migracion SQL inicial.
- Zod schemas para login, registro y perfil.
- Server Actions de auth.
- Proxy de autenticacion para rutas protegidas.
- Guards server-side por rol.
- Redireccion por rol.

Pendiente para validacion real:

- Configurar Supabase y `DATABASE_URL`.
- Aplicar migraciones en la base real.
- Probar confirmacion de email con el proyecto Supabase del cliente.

## Fase 2: Layout base y dashboards iniciales

Estado: completada.

Incluye:

- Landing publica.
- Login.
- Register.
- Forgot password placeholder.
- Verify email placeholder.
- Dashboard shell.
- Sidebar por rol.
- Topbar.
- Dashboard inicial de alumno.
- Dashboard inicial de mentor.
- Dashboard inicial de admin con grafico Recharts.
- Dashboard inicial de institucion.
- Rutas placeholder con estado "Proxima fase".

## Fase 3: Cursos, modulos, lecciones y recursos

Estado: completada.

Incluye:

- Schema Drizzle y migracion para categorias, cursos, modulos, lecciones y recursos de leccion.
- Constantes y tipos para estados, niveles, tipos de leccion, proveedores de video y tipos de recurso.
- Zod schemas `courseCategorySchema`, `courseSchema`, `courseModuleSchema`, `lessonSchema` y `lessonResourceSchema`.
- Queries para cursos publicados, cursos admin, detalle por slug/id, modulos, lecciones y recursos.
- Server Actions protegidas para crear, editar, publicar, retirar, archivar, eliminar y reordenar contenido.
- Seed SQL con categorias base y curso demo gratuito publicado.
- Catalogo publico `/courses`.
- Detalle publico `/courses/[courseSlug]`.
- Visor publico de leccion `/courses/[courseSlug]/lessons/[lessonSlug]`.
- Vista de alumno `/dashboard/student/courses` y detalle `/dashboard/student/courses/[courseSlug]`.
- Admin de cursos `/dashboard/admin/courses`, alta, edicion y builder.
- Admin de categorias `/dashboard/admin/categories`.
- Componentes de tarjetas, filtros, badges, formularios, tabla admin, builder, acordeon, visor y lista de recursos.

Notas:

- Si `DATABASE_URL` no esta configurado, las lecturas de cursos usan datos demo publicados.
- Las mutaciones administrativas requieren sesion de `admin` y base de datos configurada.
- La fase no implementa entregables evaluables ni desbloqueos por avance; eso queda para fases posteriores.

## Fase 4: Onboarding, diagnostico inicial y proyecto del alumno

Estado: completada.

Incluye:

- Schema Drizzle y migracion para `student_onboarding` y `student_projects`.
- Constantes y tipos para perfil de alumno, experiencia, etapas, estados y areas de proyecto.
- Zod schemas `onboardingSchema`, `studentProjectSchema` y `onboardingWizardSchema`.
- Services `OnboardingService` y `StudentProjectService` para siguiente paso, slug y curso sugerido.
- Queries para onboarding, proyecto actual, detalle por id, listado admin y archivo basico.
- Server Actions protegidas para completar/actualizar onboarding, crear/editar proyecto, consultar proyecto y archivar desde admin.
- Ruta `/onboarding`.
- Bloqueo de `/dashboard/student/*` cuando el alumno no completo onboarding.
- Dashboard student conectado al proyecto actual, estado, etapa, area y CTA de curso recomendado.
- Vista `/dashboard/student/project` y edicion `/dashboard/student/project/edit`.
- Vista admin `/dashboard/admin/projects` con busqueda/filtros y detalle `/dashboard/admin/projects/[projectId]`.

Notas:

- Sin `DATABASE_URL`, las mutaciones devuelven un mensaje claro y no intentan persistir.
- Las acciones revalidan permisos y ownership aunque la UI ya este protegida por rutas.
- Esta fase no incluye entregables formales, revision por mentor, feedback, aprobaciones, pagos, instituciones/cohortes, reportes avanzados ni IA.

## Siguiente fase

Pendiente:

- Entregables reales asociados a cursos/lecciones.
- Revision, feedback y criterios de aprobacion.
- Flujos de mentoria y evaluacion.

