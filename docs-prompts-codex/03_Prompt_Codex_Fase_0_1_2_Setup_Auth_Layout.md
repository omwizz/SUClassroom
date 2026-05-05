Actúa como Senior Full Stack Engineer, Tech Lead y especialista en Next.js App Router, TypeScript, Supabase, Drizzle ORM, Tailwind CSS y shadcn/ui.

Vas a trabajar en el proyecto SUClassroom.

Antes de implementar, lee obligatoriamente estos archivos del repositorio:

1. 01_PRD_SUClassroom.md
2. 02_Arquitectura_Tecnica_Estructura_Fases_SUClassroom.md

CONTEXTO DEL PRODUCTO:

SUClassroom es una plataforma SaaS e-learning de ejecución guiada para emprendedores, líderes de programas sociales, mentores, administradores e instituciones.

No es una plataforma común de cursos. La lógica principal del producto es:

aprender → aplicar → entregar → recibir feedback → mejorar → aprobar → desbloquear siguiente curso → acceder a asesoría o mentoría

OBJETIVO DE ESTA TAREA:

Implementar únicamente:

FASE 0: Setup técnico del proyecto.
FASE 1: Autenticación y roles base.
FASE 2: Layout base y dashboards iniciales por rol.

NO IMPLEMENTES TODAVÍA:

- Cursos funcionales.
- Módulos reales.
- Lecciones reales.
- Proyectos.
- Entregables.
- Evaluaciones.
- Feedback.
- Progreso/desbloqueos avanzados.
- Mentorías.
- Pagos.
- Qulqi.
- Instituciones/cohortes.
- Reportes avanzados.
- IA.
- Certificados.
- Comunidad.
- Chat interno.
- Videollamadas.

STACK OBLIGATORIO:

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Supabase Auth.
- Supabase PostgreSQL.
- Supabase Storage preparado, sin carga de archivos todavía.
- Drizzle ORM.
- Zod.
- React Hook Form.
- Lucide React.
- Recharts preparado para dashboards básicos.
- ESLint.
- Prettier.
- Middleware de autenticación.
- RBAC por roles.

ROLES BASE:

Implementa estos roles:

1. student
2. mentor
3. admin
4. institution

REGLAS GENERALES:

- No mezcles UI, lógica de negocio, validaciones y acceso a datos en un solo archivo.
- No pongas lógica sensible en componentes cliente.
- No expongas claves privadas.
- No uses datos hardcodeados como solución final.
- No elimines archivos existentes sin revisar.
- No rompas estructura existente.
- No generes una SPA desordenada.
- Usa arquitectura modular.
- Usa Server Actions cuando corresponda.
- Usa Zod para validaciones.
- Usa RBAC para proteger rutas.
- Mantén TypeScript estricto.

FASE 0 — SETUP DEL PROYECTO

Tareas:

1. Verifica si el proyecto ya existe.
   - Si existe, analiza estructura actual antes de modificar.
   - Si no existe, crea proyecto Next.js con App Router, TypeScript y Tailwind.

2. Instala o verifica dependencias:
   - shadcn/ui
   - lucide-react
   - zod
   - react-hook-form
   - @hookform/resolvers
   - drizzle-orm
   - postgres o driver compatible
   - @supabase/supabase-js
   - @supabase/ssr
   - recharts
   - clsx
   - tailwind-merge
   - class-variance-authority

3. Configura Tailwind y shadcn/ui.

4. Crea o ajusta esta estructura:

src/
  app/
    (public)/
    (auth)/
    dashboard/
      student/
      mentor/
      admin/
      institution/
  components/
    ui/
    layout/
    shared/
    dashboard/
  features/
    auth/
    users/
    dashboard/
  lib/
    supabase/
    utils/
    validations/
  server/
    actions/
    services/
    queries/
    guards/
  db/
    schema/
    migrations/
    seed/
  types/
  hooks/
  config/
  constants/
  styles/

5. Crea o actualiza .env.example:

NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
SENTRY_DSN=

6. Crea utilidades base:
   - cn()
   - constantes de roles
   - rutas públicas
   - rutas protegidas
   - helper de redirección por rol
   - tipos globales

FASE 1 — AUTH Y ROLES

Tareas:

1. Configura Supabase:
   - Cliente browser.
   - Cliente server.
   - Cliente middleware si aplica.
   - Cliente admin solo si es necesario y nunca en frontend.

2. Crea modelo base con Drizzle:

profiles:
- id
- auth_user_id
- full_name
- email
- avatar_url
- active_role
- status
- created_at
- updated_at

roles:
- id
- name
- description
- is_system
- created_at

user_roles:
- id
- profile_id
- role
- created_at

audit_logs, opcional:
- id
- user_id
- action
- entity_type
- entity_id
- metadata
- created_at

3. Define roles:
- student
- mentor
- admin
- institution

4. Crea tipos:
- UserRole
- Profile
- AuthUser
- Permission
- DashboardRoute

5. Crea schemas Zod:
- loginSchema
- registerSchema
- profileSchema

6. Implementa rutas:
- /login
- /register
- /forgot-password, placeholder permitido
- /verify-email, placeholder permitido

7. Implementa:
- registerUser
- loginUser
- logoutUser
- getCurrentUser
- getCurrentProfile
- updateProfile básico

8. Middleware:
- Usuario no autenticado no puede entrar a /dashboard/*
- Usuario autenticado no vuelve a /login o /register
- Redirección según active_role
- Si no tiene perfil, crear perfil o enviarlo a completar perfil

9. Redirección por rol:
- student → /dashboard/student
- mentor → /dashboard/mentor
- admin → /dashboard/admin
- institution → /dashboard/institution

10. RoleGuard:
- student dashboard: student o admin
- mentor dashboard: mentor o admin
- admin dashboard: solo admin
- institution dashboard: institution o admin

FASE 2 — LAYOUT Y DASHBOARDS INICIALES

Tareas:

1. Landing pública en /
   Debe incluir:
   - Hero.
   - Propuesta de valor.
   - Flujo: aprender, aplicar, entregar, recibir feedback, avanzar.
   - CTA a registro.
   - CTA a login.
   - Sección de beneficios.
   - Diseño moderno, claro y responsive.

2. Crear DashboardShell:
   - DashboardSidebar
   - DashboardTopbar
   - DashboardContent
   - UserMenu
   - NotificationButton
   - SearchBox
   - MobileSidebar

3. Sidebar por rol:

student:
- Mi progreso
- Cursos
- Mi proyecto
- Entregables
- Feedback
- Asesorías
- Recursos
- Perfil

mentor:
- Panel
- Entregables
- Alumnos
- Evaluaciones
- Asesorías
- Feedback
- Perfil

admin:
- Panel
- Usuarios
- Cursos
- Mentores
- Proyectos
- Entregables
- Pagos
- Reportes
- Configuración

institution:
- Panel
- Cohortes
- Participantes
- Cursos asignados
- Progreso
- Reportes
- Configuración

4. Crear dashboards iniciales:

/dashboard/student
- Bienvenida personalizada.
- Progreso general placeholder.
- Curso actual placeholder.
- Entregable pendiente placeholder.
- Próxima asesoría placeholder.
- Próximos pasos.

/dashboard/mentor
- Entregables pendientes placeholder.
- Alumnos asignados placeholder.
- Asesorías próximas placeholder.
- Métricas básicas placeholder.

/dashboard/admin
- Usuarios placeholder.
- Cursos placeholder.
- Entregables placeholder.
- Asesorías placeholder.
- Ingresos placeholder.
- Gráfico básico con Recharts.
- Actividad reciente placeholder.

/dashboard/institution
- Cohortes placeholder.
- Participantes placeholder.
- Avance promedio placeholder.
- Proyectos aprobados placeholder.
- Reportes placeholder.

5. Componentes reutilizables:
- MetricCard
- DashboardSection
- EmptyState
- StatusBadge
- RoleBadge
- ProgressBar
- ActionCard
- DataTable básica
- ChartCard
- PageHeader
- LoadingState
- ErrorState

6. Rutas placeholder:
- /dashboard/student/courses
- /dashboard/student/project
- /dashboard/student/deliverables
- /dashboard/student/feedback
- /dashboard/student/mentorship
- /dashboard/mentor/deliverables
- /dashboard/mentor/students
- /dashboard/mentor/evaluations
- /dashboard/admin/users
- /dashboard/admin/courses
- /dashboard/admin/reports
- /dashboard/institution/cohorts
- /dashboard/institution/participants
- /dashboard/institution/reports

Cada ruta placeholder debe tener:
- Título.
- Descripción.
- Estado “Próxima fase”.

CRITERIOS DE ACEPTACIÓN:

- Proyecto corre sin errores.
- Auth funciona.
- Login funciona.
- Registro funciona.
- Logout funciona.
- Roles base definidos.
- Redirección por rol funciona.
- Rutas protegidas funcionan.
- Dashboard por rol existe.
- Sidebar por rol existe.
- Landing existe.
- UI responsive.
- TypeScript sin errores críticos.
- Lint sin errores críticos.
- Build exitoso.
- .env.example creado.
- Documentación actualizada.

DOCUMENTACIÓN:

Actualiza o crea:

README.md
docs/SETUP.md
docs/ARCHITECTURE.md
docs/PHASES.md

RESUMEN FINAL OBLIGATORIO:

Al terminar, responde con:

1. Qué implementaste.
2. Archivos creados.
3. Archivos modificados.
4. Tablas creadas.
5. Rutas creadas.
6. Componentes creados.
7. Variables de entorno necesarias.
8. Comandos ejecutados.
9. Cómo probar manualmente.
10. Errores encontrados y solución.
11. Qué queda pendiente para Fase 3.

Empieza ahora solo con Fase 0, Fase 1 y Fase 2.