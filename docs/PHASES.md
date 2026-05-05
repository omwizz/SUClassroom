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
- Aplicar migración en la base real.
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

Estado: pendiente.

Debe implementar:

- CRUD de cursos para admin.
- Categorías, módulos y lecciones.
- Recursos y plantillas.
- Vista de catálogo para alumno.
- Primer curso gratuito disponible.
- Reglas iniciales de publicación y bloqueo.

No iniciar Fase 3 hasta tener build estable de Fase 0-2.
