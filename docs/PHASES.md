# Fases de implementación

## Fase 0: Setup técnico

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

## Fase 1: Autenticación y roles base

Estado: completada a nivel base.

Incluye:

- Roles `student`, `mentor`, `admin`, `institution`.
- Schema Drizzle para `profiles`, `roles`, `user_roles`, `audit_logs`.
- Migración SQL inicial.
- Zod schemas para login, registro y perfil.
- Server Actions de auth.
- Proxy de autenticación para rutas protegidas.
- Guards server-side por rol.
- Redirección por rol.

Pendiente para validación real:

- Configurar Supabase y `DATABASE_URL`.
- Aplicar migraciones en la base real.
- Probar confirmación de email con el proyecto Supabase del cliente.

## Fase 2: Layout base y dashboards iniciales

Estado: completada.

Incluye:

- Landing pública.
- Login.
- Register.
- Forgot password placeholder.
- Verify email placeholder.
- Dashboard shell.
- Sidebar por rol.
- Topbar.
- Dashboard inicial de alumno.
- Dashboard inicial de mentor.
- Dashboard inicial de admin con gráfico Recharts.
- Dashboard inicial de institución.
- Rutas placeholder con estado "Próxima fase".

## Fase 3: Cursos, módulos, lecciones y recursos

Estado: completada.

Incluye:

- Schema Drizzle y migración para categorías, cursos, módulos, lecciones y recursos de lección.
- Constantes y tipos para estados, niveles, tipos de lección, proveedores de video y tipos de recurso.
- Zod schemas `courseCategorySchema`, `courseSchema`, `courseModuleSchema`, `lessonSchema` y `lessonResourceSchema`.
- Queries para cursos publicados, cursos admin, detalle por slug/id, módulos, lecciones y recursos.
- Server Actions protegidas para crear, editar, publicar, retirar, archivar, eliminar y reordenar contenido.
- Seed SQL con categorías base y curso demo gratuito publicado.
- Catálogo público `/courses`.
- Detalle público `/courses/[courseSlug]`.
- Visor público de lección `/courses/[courseSlug]/lessons/[lessonSlug]`.
- Vista de alumno `/dashboard/student/courses` y detalle `/dashboard/student/courses/[courseSlug]`.
- Admin de cursos `/dashboard/admin/courses`, alta, edición y builder.
- Admin de categorías `/dashboard/admin/categories`.
- Componentes de tarjetas, filtros, badges, formularios, tabla admin, builder, acordeón, visor y lista de recursos.

Notas:

- Si `DATABASE_URL` no está configurado, las lecturas de cursos usan datos demo publicados.
- Las mutaciones administrativas requieren sesión de `admin` y base de datos configurada.
- La fase no implementa entregables evaluables ni desbloqueos por avance; eso queda para fases posteriores.

## Siguiente fase

Pendiente:

- Proyectos de estudiante.
- Entregables reales asociados a cursos/lecciones.
- Revisión, feedback y criterios de aprobación.
- Flujos de mentoría y evaluación.

