# Arquitectura Técnica Completa — SUClassroom

**Producto:** SUClassroom
**Tipo:** Plataforma SaaS e-learning de ejecución guiada, mentorías, entregables, pagos y dashboards por rol
**Versión técnica:** v1.0
**Base funcional:** PRD maestro de SUClassroom generado a partir del formulario del cliente y referencias visuales. El formulario define el enfoque central: convertir conocimiento en ejecución empresarial mediante asesoría estratégica y validación de proyectos reales. 

---

# 1. Resumen técnico ejecutivo

## 1.1 Qué se va a construir

Se construirá **SUClassroom**, una plataforma SaaS e-learning donde los usuarios no solo consumen cursos, sino que desarrollan proyectos reales, envían entregables, reciben evaluación de mentores, corrigen observaciones, aprueban proyectos y desbloquean nuevos cursos o asesorías.

La lógica central del sistema será:

```text
aprender → aplicar → entregar → recibir feedback → mejorar → aprobar → desbloquear → asesoría / mentoría
```

La plataforma tendrá cuatro experiencias principales:

| Rol                             | Experiencia principal                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| **Alumno**                      | Aprender, aplicar, entregar proyectos, recibir feedback, solicitar asesoría y ver progreso. |
| **Mentor**                      | Revisar entregables, evaluar, aprobar/rechazar, brindar feedback y atender asesorías.       |
| **Administrador**               | Gestionar usuarios, cursos, módulos, mentores, pagos, reportes, métricas y configuración.   |
| **Institución / ONG / Empresa** | Gestionar cohortes, participantes, cursos asignados, avance e impacto.                      |

---

## 1.2 Arquitectura que se usará

La arquitectura recomendada será una **arquitectura modular por dominios**, usando **Next.js App Router** como framework principal, con separación estricta entre UI, validaciones, Server Actions, servicios, consultas, integraciones externas y base de datos.

Stack base:

| Capa               | Tecnología                                              |
| ------------------ | ------------------------------------------------------- |
| Frontend           | Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui |
| Formularios        | React Hook Form                                         |
| Validación         | Zod                                                     |
| Gráficos           | Recharts                                                |
| Iconos             | Lucide React                                            |
| Backend app        | Server Actions + Route Handlers                         |
| Base de datos      | Supabase PostgreSQL                                     |
| Auth               | Supabase Auth                                           |
| ORM                | Drizzle ORM                                             |
| Storage            | Supabase Storage                                        |
| Pagos              | Qulqi                                                   |
| Emails             | Resend o Brevo                                          |
| Hosting            | Vercel                                                  |
| Observabilidad     | Sentry                                                  |
| Analítica producto | PostHog                                                 |

---

## 1.3 Módulos críticos

Los módulos críticos para el MVP son:

1. Auth.
2. Roles & Permissions.
3. Users / Profiles.
4. Courses.
5. Modules.
6. Lessons.
7. Resources.
8. Student Projects.
9. Deliverables.
10. Evaluations.
11. Feedback.
12. Student Dashboard.
13. Mentor Dashboard.
14. Admin Dashboard.
15. Progress & Unlocks.
16. Notifications básicas.
17. Storage básico.
18. Payments preparado para Qulqi.

---

## 1.4 Qué se implementará primero

Orden recomendado:

1. Setup técnico.
2. Base visual y layouts.
3. Auth + roles.
4. Base de datos inicial.
5. Dashboard shell por rol.
6. Cursos, módulos y lecciones.
7. Proyecto del alumno.
8. Entregables.
9. Evaluación y feedback.
10. Progreso y desbloqueos.
11. Mentorías.
12. Pagos.
13. Instituciones.
14. Analítica y reportes.
15. Seguridad, observabilidad y deploy.

---

## 1.5 Qué se dejará para fases posteriores

No debe implementarse en el MVP inicial:

* IA avanzada.
* App móvil nativa.
* Marketplace abierto de mentores.
* Comunidad compleja.
* Certificados avanzados.
* Gamificación avanzada.
* Videollamadas internas propias.
* Multi-idioma.
* Suscripciones complejas.
* Automatización avanzada.
* Licencias institucionales completas.
* Analítica predictiva.

---

# 2. Arquitectura general del sistema

## 2.1 Visión general

SUClassroom debe funcionar como una aplicación web SaaS modular. Next.js actuará como frontend y backend de aplicación. Supabase proveerá autenticación, base de datos y almacenamiento. Drizzle ORM gestionará el acceso estructurado a PostgreSQL. Qulqi gestionará pagos. Resend o Brevo enviará emails. Sentry y PostHog permitirán observabilidad y analítica.

---

## 2.2 Diagrama textual de arquitectura

```text
Usuario
  ↓
Cliente Web / Navegador
  ↓
Next.js App Router
  ↓
Layouts por rol / Páginas / Componentes UI
  ↓
Feature Components + Forms
  ↓
React Hook Form + Zod Client-Side
  ↓
Server Actions / Route Handlers
  ↓
Zod Server-Side + RBAC + Validación de sesión
  ↓
Services de dominio
  ↓
Repositories / Queries
  ↓
Drizzle ORM
  ↓
Supabase PostgreSQL
```

Integraciones externas:

```text
Server Actions / Route Handlers
  ├── Supabase Auth
  ├── Supabase Storage
  ├── Qulqi
  ├── Resend / Brevo
  ├── Sentry
  └── PostHog
```

---

## 2.3 Componentes principales de arquitectura

| Componente                 | Responsabilidad                                                                   |
| -------------------------- | --------------------------------------------------------------------------------- |
| **Cliente web**            | Interfaz del usuario en navegador.                                                |
| **Next.js App Router**     | Routing, layouts, páginas, carga server/client, estructura principal.             |
| **UI Components**          | Componentes reutilizables: botones, cards, tablas, modales, badges.               |
| **Feature Components**     | Componentes por módulo: cursos, entregables, mentorías, pagos, dashboards.        |
| **Forms**                  | Formularios conectados con React Hook Form y Zod.                                 |
| **Schemas**                | Validaciones compartidas cliente/servidor.                                        |
| **Server Actions**         | Operaciones mutables del sistema: crear curso, enviar entregable, revisar, pagar. |
| **Route Handlers**         | Endpoints especiales: webhooks Qulqi, archivos firmados, callbacks.               |
| **Services**               | Lógica de negocio: desbloqueo, evaluación, pagos, progreso.                       |
| **Repositories / Queries** | Acceso a datos vía Drizzle.                                                       |
| **Database**               | Supabase PostgreSQL.                                                              |
| **Auth**                   | Supabase Auth + middleware + RBAC.                                                |
| **Storage**                | Supabase Storage para recursos y entregables.                                     |
| **Payments**               | Qulqi para pagos reales.                                                          |
| **Emails**                 | Resend o Brevo.                                                                   |
| **Analytics**              | PostHog para eventos de producto.                                                 |
| **Observability**          | Sentry para errores.                                                              |
| **Hosting**                | Vercel.                                                                           |

---

## 2.4 Patrón general de una operación

Ejemplo: alumno envía entregable.

```text
Alumno hace submit
  ↓
Formulario valida con Zod en cliente
  ↓
Server Action submitDeliverable
  ↓
Valida sesión y rol alumno
  ↓
Valida input con Zod en servidor
  ↓
Service: DeliverableService.submit()
  ↓
Repository: insert/update deliverables
  ↓
Storage: guarda archivos si aplica
  ↓
DB: cambia estado a submitted
  ↓
NotificationService: notifica mentor/admin
  ↓
PostHog: deliverable_submitted
  ↓
Respuesta al cliente
```

---

# 3. Arquitectura modular

## 3.1 Módulos del sistema

| Módulo                  | Responsabilidad                        | Entidades relacionadas              | Acciones principales                                            | Dependencias               | Prioridad MVP |
| ----------------------- | -------------------------------------- | ----------------------------------- | --------------------------------------------------------------- | -------------------------- | ------------- |
| **Auth**                | Registro, login, verificación, sesión. | profiles, roles, user_roles         | Registrar, iniciar sesión, cerrar sesión, recuperar contraseña. | Supabase Auth              | Alta          |
| **Users**               | Gestión de perfiles.                   | profiles                            | Crear perfil, editar, activar, suspender.                       | Auth, RBAC                 | Alta          |
| **Roles & Permissions** | Control de acceso.                     | roles, user_roles                   | Asignar rol, validar permisos.                                  | Auth                       | Alta          |
| **Courses**             | Gestión de cursos.                     | courses, course_categories          | Crear, editar, publicar, bloquear.                              | Admin, Modules             | Alta          |
| **Modules**             | Organización interna del curso.        | course_modules                      | Crear, editar, ordenar módulos.                                 | Courses                    | Alta          |
| **Lessons**             | Contenido educativo.                   | lessons                             | Crear, editar, completar lección.                               | Modules, Progress          | Alta          |
| **Resources**           | Plantillas y materiales.               | lesson_resources, files             | Subir, asociar, descargar.                                      | Storage, Courses           | Alta          |
| **Student Projects**    | Proyecto real del alumno.              | student_projects                    | Crear, editar, actualizar etapa.                                | Users, Courses             | Alta          |
| **Deliverables**        | Envío de entregables.                  | deliverables, deliverable_files     | Borrador, enviar, reenviar.                                     | Projects, Storage          | Alta          |
| **Evaluations**         | Evaluación de entregables.             | evaluations                         | Revisar, aprobar, rechazar.                                     | Deliverables, Mentor       | Alta          |
| **Feedback**            | Retroalimentación estructurada.        | feedback                            | Crear feedback, ver feedback.                                   | Evaluations                | Alta          |
| **Mentorship**          | Asesorías y sesiones.                  | mentorship_sessions                 | Solicitar, agendar, confirmar, registrar notas.                 | Users, Payments            | Media         |
| **Payments**            | Pagos por asesorías/revisión.          | payments, promotions                | Crear pago, confirmar, webhook.                                 | Qulqi, Mentorship          | Media         |
| **Subscriptions**       | Suscripciones futuras.                 | subscriptions                       | Crear plan, activar, cancelar.                                  | Payments                   | Futura        |
| **Institutions**        | Gestión B2B.                           | institutions, institution_members   | Crear institución, asignar usuarios.                            | Users                      | Fase 3        |
| **Cohorts**             | Grupos institucionales.                | cohorts, cohort_students            | Crear cohorte, invitar alumnos, medir avance.                   | Institutions, Courses      | Fase 3        |
| **Analytics**           | Métricas del producto.                 | user_progress, events externos      | Calcular KPIs, enviar eventos.                                  | PostHog, DB                | Media         |
| **Reports**             | Reportes descargables o visuales.      | reports                             | Generar, filtrar, exportar.                                     | Analytics, Institutions    | Media         |
| **Notifications**       | Alertas internas/email.                | notifications                       | Crear, marcar leído, enviar email.                              | Resend/Brevo               | Alta          |
| **File Manager**        | Administración de archivos.            | files, resources, deliverable_files | Subir, listar, eliminar lógico.                                 | Storage                    | Media         |
| **Dashboard**           | Vistas por rol.                        | varias                              | Métricas, acciones rápidas, tablas.                             | Analytics, Auth            | Alta          |
| **Settings**            | Configuración de cuenta/sistema.       | profiles, platform_settings futura  | Editar perfil, preferencias.                                    | Auth                       | Media         |
| **Audit Logs**          | Auditoría de acciones críticas.        | audit_logs                          | Registrar acciones sensibles.                                   | Todos los módulos críticos | Alta          |

---

# 4. Arquitectura por capas

## 4.1 Capas oficiales del proyecto

```text
UI Components
  ↓
Feature Components
  ↓
Pages / Routes
  ↓
Forms
  ↓
Schemas / Validations
  ↓
Server Actions
  ↓
Services
  ↓
Repositories / Queries
  ↓
Database
  ↓
External Integrations
```

---

## 4.2 UI Components

### Qué debe ir aquí

Componentes visuales reutilizables y genéricos:

* Button.
* Card.
* Badge.
* Dialog.
* Table.
* Input.
* Select.
* Progress.
* Tabs.
* Sidebar base.
* Loading skeleton.
* Empty state.
* Error state.

### Qué no debe ir aquí

* Lógica de negocio.
* Consultas a base de datos.
* Validación de permisos.
* Llamadas directas a Qulqi.
* Cálculo de desbloqueos.
* Reglas de evaluación.

---

## 4.3 Feature Components

### Qué debe ir aquí

Componentes conectados a un dominio funcional:

* CourseCard.
* LessonList.
* DeliverableForm.
* EvaluationPanel.
* FeedbackCard.
* MentorDashboardStats.
* AdminPaymentsTable.
* InstitutionCohortProgress.

### Qué no debe ir aquí

* SQL.
* Drizzle queries directas.
* Secret keys.
* Webhooks.
* Reglas críticas únicamente en cliente.

---

## 4.4 Pages / Routes

### Qué debe ir aquí

Rutas de Next.js App Router:

* Landing.
* Login.
* Register.
* Dashboard por rol.
* Cursos.
* Proyectos.
* Entregables.
* Mentorías.
* Pagos.
* Settings.

### Qué no debe ir aquí

* Lógica de negocio extensa.
* Validaciones duplicadas.
* Queries complejas sin encapsular.
* Integraciones externas directas.

---

## 4.5 Forms

### Qué debe ir aquí

* Formularios de React Hook Form.
* Validación client-side con Zod.
* Estados de loading.
* Mensajes de error.
* Submit hacia Server Actions.

### Qué no debe ir aquí

* Validación final de seguridad.
* Permisos.
* Lógica crítica de negocio.
* Transformaciones sensibles de datos.

---

## 4.6 Schemas / Validations

### Qué debe ir aquí

Schemas Zod compartidos:

* Auth.
* Profile.
* Course.
* Lesson.
* Project.
* Deliverable.
* Evaluation.
* Feedback.
* Payment.
* Cohort.

### Qué no debe ir aquí

* Acceso a DB.
* Lógica de UI.
* Llamadas externas.

---

## 4.7 Server Actions

### Qué debe ir aquí

Operaciones que modifican datos:

* Crear curso.
* Actualizar perfil.
* Enviar entregable.
* Revisar entregable.
* Solicitar mentoría.
* Crear pago.
* Desbloquear curso.

### Qué debe validar siempre

* Sesión.
* Rol.
* Permiso.
* Input con Zod.
* Propiedad del recurso.
* Estado actual permitido.
* Transición válida.

---

## 4.8 Services

### Qué debe ir aquí

Reglas de negocio:

* Determinar si un curso se desbloquea.
* Calcular progreso.
* Validar transición de estados.
* Crear evaluación.
* Confirmar pago.
* Disparar notificación.
* Registrar auditoría.
* Emitir evento PostHog.

### Qué no debe ir aquí

* Render de UI.
* Uso de componentes React.
* Manipulación de formularios.

---

## 4.9 Repositories / Queries

### Qué debe ir aquí

Acceso a datos:

* createCourse.
* getCourseById.
* getStudentProgress.
* getDeliverablesByMentor.
* updatePaymentStatus.
* getInstitutionCohorts.

### Qué no debe ir aquí

* Reglas de negocio complejas.
* Envío de emails.
* Decisiones de UI.
* Webhooks.

---

## 4.10 Database

### Qué debe ir aquí

* Tablas.
* Relaciones.
* Índices.
* Constraints.
* Estados.
* RLS.
* Integridad referencial.

---

## 4.11 External Integrations

### Qué debe ir aquí

Clientes externos:

* Supabase Auth.
* Supabase Storage.
* Qulqi.
* Resend/Brevo.
* Sentry.
* PostHog.

---

# 5. Estructura de carpetas recomendada

## 5.1 Estructura general

```text
src/
  app/
    (public)/
      page
      about/
      pricing/
    (auth)/
      login/
      register/
      forgot-password/
      verify-email/
    onboarding/
    dashboard/
      layout
      page
      student/
      mentor/
      admin/
      institution/
    courses/
      page
      [courseId]/
      [courseId]/lessons/[lessonId]/
    projects/
      page
      [projectId]/
    deliverables/
      [deliverableId]/
    mentorship/
    payments/
    settings/
    api/
      webhooks/
        qulqi/
      storage/
        signed-url/
      health/
  components/
    ui/
    layout/
    data-display/
    feedback/
    forms/
    navigation/
  features/
    auth/
    users/
    roles/
    courses/
    modules/
    lessons/
    resources/
    projects/
    deliverables/
    evaluations/
    feedback/
    mentorship/
    payments/
    subscriptions/
    institutions/
    cohorts/
    analytics/
    reports/
    notifications/
    file-manager/
    dashboard/
    settings/
    audit/
  lib/
    supabase/
    drizzle/
    qulqi/
    resend/
    brevo/
    sentry/
    posthog/
    utils/
  server/
    actions/
    services/
    repositories/
    guards/
    errors/
  db/
    schema/
    migrations/
    seed/
  schemas/
    auth/
    users/
    courses/
    projects/
    deliverables/
    evaluations/
    mentorship/
    payments/
    institutions/
    cohorts/
  types/
    auth/
    users/
    courses/
    projects/
    deliverables/
    payments/
    common/
  hooks/
    use-current-user/
    use-toast/
    use-media-query/
    use-debounce/
  config/
    app/
    navigation/
    permissions/
    routes/
    storage/
    payments/
  constants/
    roles/
    permissions/
    statuses/
    limits/
  styles/
    globals
```

> Nota: los nombres anteriores son estructura conceptual. En la implementación real se usarán extensiones y archivos concretos según Next.js, pero en esta fase no se genera código.

---

## 5.2 Organización de rutas públicas

```text
app/(public)/
  page
  about/
  pricing/
```

### Responsabilidad

* Landing principal.
* Propuesta de valor.
* Cursos gratuitos como entrada.
* CTA para registro.
* Información comercial.
* SEO.

---

## 5.3 Organización de rutas de autenticación

```text
app/(auth)/
  login/
  register/
  forgot-password/
  verify-email/
```

### Responsabilidad

* Login.
* Registro.
* Recuperación.
* Verificación.

---

## 5.4 Organización de dashboard

```text
app/dashboard/
  layout
  page
  student/
    page
    courses/
    projects/
    deliverables/
    feedback/
    mentorship/
    payments/
  mentor/
    page
    students/
    deliverables/
    evaluations/
    schedule/
  admin/
    page
    users/
    courses/
    mentors/
    deliverables/
    payments/
    reports/
    analytics/
    file-manager/
    settings/
  institution/
    page
    cohorts/
    participants/
    progress/
    reports/
```

### Responsabilidad

Separar vistas por rol, manteniendo un layout dashboard común con sidebar, topbar y shell base.

---

## 5.5 Organización de features

Ejemplo conceptual:

```text
features/courses/
  components/
  forms/
  actions/
  services/
  repositories/
  schemas/
  types/
  constants/
```

### Regla

Cada feature puede tener su propia organización interna, pero las operaciones compartidas de servidor deben centralizarse en `server/` cuando sean transversales.

---

# 6. Convención de nombres

## 6.1 Carpetas

| Tipo               | Convención         | Ejemplo            |
| ------------------ | ------------------ | ------------------ |
| Carpetas generales | kebab-case         | `student-projects` |
| Features           | kebab-case         | `file-manager`     |
| Rutas dinámicas    | Next.js convention | `[courseId]`       |
| Configuración      | kebab-case         | `permissions`      |

---

## 6.2 Componentes

| Tipo              | Convención | Ejemplo                  |
| ----------------- | ---------- | ------------------------ |
| React components  | PascalCase | `CourseCard`             |
| Layout components | PascalCase | `DashboardShell`         |
| Badges            | PascalCase | `DeliverableStatusBadge` |
| Tables            | PascalCase | `UserTable`              |

---

## 6.3 Server Actions

| Convención                 | Ejemplo              |
| -------------------------- | -------------------- |
| verbo + entidad            | `createCourse`       |
| verbo + entidad + contexto | `submitDeliverable`  |
| verbo + resultado          | `approveDeliverable` |
| verbo + flujo              | `requestMentorship`  |

---

## 6.4 Services

| Convención            | Ejemplo               |
| --------------------- | --------------------- |
| Dominio + Service     | `CourseService`       |
| Dominio + proceso     | `ProgressService`     |
| Integración + Service | `QulqiPaymentService` |

---

## 6.5 Schemas

| Convención                | Ejemplo               |
| ------------------------- | --------------------- |
| entidad + Schema          | `courseSchema`        |
| acción + entidad + Schema | `createCourseSchema`  |
| actualización + Schema    | `updateProfileSchema` |

---

## 6.6 Tipos

| Convención | Ejemplo                |
| ---------- | ---------------------- |
| PascalCase | `Course`               |
| DTO        | `CreateCourseInput`    |
| View model | `StudentDashboardView` |
| Estado     | `DeliverableStatus`    |

---

## 6.7 Tablas

| Tipo        | Convención        | Ejemplo                    |
| ----------- | ----------------- | -------------------------- |
| Tablas      | snake_case plural | `student_projects`         |
| Join tables | entidad_entidad   | `cohort_students`          |
| Campos FK   | entidad_id        | `course_id`                |
| Timestamps  | snake_case        | `created_at`, `updated_at` |

---

## 6.8 Hooks

| Convención    | Ejemplo             |
| ------------- | ------------------- |
| use + nombre  | `useCurrentUser`    |
| use + dominio | `useCourseProgress` |
| use + UI      | `useMediaQuery`     |

---

## 6.9 Variables de entorno

| Convención       | Ejemplo                    |
| ---------------- | -------------------------- |
| UPPER_SNAKE_CASE | `NEXT_PUBLIC_SUPABASE_URL` |
| Públicas         | prefijo `NEXT_PUBLIC_`     |
| Privadas         | sin prefijo público        |

---

## 6.10 Estados

Todos los estados persistidos en DB deben usar **snake_case en inglés**.

Ejemplos:

```text
draft
submitted
under_review
approved
rejected
resubmitted
pending
paid
failed
cancelled
```

---

## 6.11 Permisos

Convención:

```text
domain:action
```

Ejemplos:

```text
courses:create
courses:update
deliverables:submit
deliverables:review
payments:manage
cohorts:read
```

---

# 7. Modelo de base de datos técnico

## 7.1 Principio base

Supabase Auth gestiona usuarios en `auth.users`. La aplicación debe usar una tabla pública `profiles` para los datos funcionales del usuario.

No se recomienda crear una tabla propia llamada `users` que duplique `auth.users`, salvo como vista o alias conceptual. Para claridad del producto, el dominio puede llamarse **Users**, pero técnicamente la tabla principal será `profiles`.

---

## 7.2 Tablas principales

### 7.2.1 profiles

| Campo                  | Detalle                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------- |
| **Propósito**          | Perfil funcional de cada usuario autenticado.                                         |
| **Campos principales** | id, auth_user_id, full_name, email, avatar_url, phone, status, created_at, updated_at |
| **Relaciones**         | user_roles, student_projects, deliverables, mentorship_sessions, payments             |
| **Índices sugeridos**  | auth_user_id único, email, status                                                     |
| **Reglas importantes** | Cada usuario autenticado debe tener un perfil.                                        |
| **RLS**                | Sí. Usuario puede leer/editar su perfil limitado. Admin puede gestionar todos.        |
| **Prioridad**          | MVP                                                                                   |

---

### 7.2.2 roles

| Campo                  | Detalle                                          |
| ---------------------- | ------------------------------------------------ |
| **Propósito**          | Catálogo de roles del sistema.                   |
| **Campos principales** | id, name, description, is_system, created_at     |
| **Relaciones**         | user_roles                                       |
| **Índices sugeridos**  | name único                                       |
| **Reglas importantes** | Roles base: student, mentor, admin, institution. |
| **RLS**                | Sí. Lectura controlada; escritura solo admin.    |
| **Prioridad**          | MVP                                              |

---

### 7.2.3 user_roles

| Campo                  | Detalle                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------- |
| **Propósito**          | Relación muchos a muchos entre perfiles y roles.                                        |
| **Campos principales** | id, profile_id, role_id, assigned_by, created_at                                        |
| **Relaciones**         | profiles, roles                                                                         |
| **Índices sugeridos**  | profile_id, role_id, profile_id + role_id único                                         |
| **Reglas importantes** | Un usuario puede tener más de un rol, pero debe existir rol principal para redirección. |
| **RLS**                | Sí. Admin gestiona. Usuario puede leer sus roles.                                       |
| **Prioridad**          | MVP                                                                                     |

---

### 7.2.4 course_categories

| Campo                  | Detalle                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------- |
| **Propósito**          | Categorías de cursos.                                                                   |
| **Campos principales** | id, name, slug, description, status, created_at                                         |
| **Relaciones**         | courses                                                                                 |
| **Índices sugeridos**  | slug único, status                                                                      |
| **Reglas importantes** | Las categorías permiten ordenar cursos por área: marketing, finanzas, operaciones, etc. |
| **RLS**                | Sí. Lectura para usuarios autenticados; escritura admin.                                |
| **Prioridad**          | MVP                                                                                     |

---

### 7.2.5 courses

| Campo                  | Detalle                                                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Propósito**          | Cursos de ejecución guiada.                                                                                                                                   |
| **Campos principales** | id, category_id, title, slug, description, objective, expected_result, level, status, is_free, unlock_order, created_by, published_at, created_at, updated_at |
| **Relaciones**         | course_categories, course_modules, student_projects, user_progress, course_unlocks                                                                            |
| **Índices sugeridos**  | slug único, category_id, status, is_free, unlock_order                                                                                                        |
| **Reglas importantes** | Curso completado solo con proyecto aprobado.                                                                                                                  |
| **RLS**                | Sí. Lectura según disponibilidad/desbloqueo. Escritura admin.                                                                                                 |
| **Prioridad**          | MVP                                                                                                                                                           |

---

### 7.2.6 course_modules

| Campo                  | Detalle                                                                        |
| ---------------------- | ------------------------------------------------------------------------------ |
| **Propósito**          | Módulos dentro de un curso.                                                    |
| **Campos principales** | id, course_id, title, description, order_index, status, created_at, updated_at |
| **Relaciones**         | courses, lessons                                                               |
| **Índices sugeridos**  | course_id, course_id + order_index                                             |
| **Reglas importantes** | Deben estar ordenados.                                                         |
| **RLS**                | Sí. Lectura según acceso al curso. Escritura admin.                            |
| **Prioridad**          | MVP                                                                            |

---

### 7.2.7 lessons

| Campo                  | Detalle                                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Propósito**          | Lecciones del módulo.                                                                                                   |
| **Campos principales** | id, module_id, title, content, video_url, video_provider, duration_minutes, order_index, status, created_at, updated_at |
| **Relaciones**         | course_modules, lesson_resources, user_progress                                                                         |
| **Índices sugeridos**  | module_id, module_id + order_index                                                                                      |
| **Reglas importantes** | Puede tener video externo o link protegido.                                                                             |
| **RLS**                | Sí. Lectura según acceso al curso. Escritura admin.                                                                     |
| **Prioridad**          | MVP                                                                                                                     |

---

### 7.2.8 lesson_resources

| Campo                  | Detalle                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| **Propósito**          | Recursos o plantillas asociadas a lecciones.                                        |
| **Campos principales** | id, lesson_id, title, description, file_path, resource_type, visibility, created_at |
| **Relaciones**         | lessons                                                                             |
| **Índices sugeridos**  | lesson_id, resource_type                                                            |
| **Reglas importantes** | Puede ser público, privado o condicionado por progreso.                             |
| **RLS**                | Sí. Lectura según acceso al curso. Escritura admin.                                 |
| **Prioridad**          | MVP                                                                                 |

---

### 7.2.9 student_projects

| Campo                  | Detalle                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Propósito**          | Proyecto real del alumno.                                                                                    |
| **Campos principales** | id, student_id, name, description, problem, solution, target_audience, stage, status, created_at, updated_at |
| **Relaciones**         | profiles, deliverables, mentorship_sessions                                                                  |
| **Índices sugeridos**  | student_id, status, stage                                                                                    |
| **Reglas importantes** | Cada alumno debe poder tener al menos un proyecto activo.                                                    |
| **RLS**                | Sí. Alumno ve sus proyectos; mentor ve asignados; admin ve todos.                                            |
| **Prioridad**          | MVP                                                                                                          |

---

### 7.2.10 deliverables

| Campo                  | Detalle                                                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Propósito**          | Entregables enviados por el alumno.                                                                                           |
| **Campos principales** | id, project_id, course_id, student_id, title, description, status, version, submitted_at, reviewed_at, created_at, updated_at |
| **Relaciones**         | student_projects, courses, profiles, deliverable_files, evaluations                                                           |
| **Índices sugeridos**  | project_id, course_id, student_id, status, submitted_at                                                                       |
| **Reglas importantes** | Debe conservar historial de versiones y estados.                                                                              |
| **RLS**                | Sí. Alumno ve propios; mentor ve asignados; admin ve todos.                                                                   |
| **Prioridad**          | MVP                                                                                                                           |

---

### 7.2.11 deliverable_files

| Campo                  | Detalle                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| **Propósito**          | Archivos adjuntos a entregables.                                                         |
| **Campos principales** | id, deliverable_id, file_name, file_path, mime_type, size_bytes, uploaded_by, created_at |
| **Relaciones**         | deliverables, profiles                                                                   |
| **Índices sugeridos**  | deliverable_id, uploaded_by                                                              |
| **Reglas importantes** | Archivos privados, acceso con signed URLs.                                               |
| **RLS**                | Sí. Acceso solo autorizado.                                                              |
| **Prioridad**          | MVP                                                                                      |

---

### 7.2.12 evaluations

| Campo                  | Detalle                                                                         |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Propósito**          | Evaluación formal de un entregable.                                             |
| **Campos principales** | id, deliverable_id, mentor_id, status, score, decision, reviewed_at, created_at |
| **Relaciones**         | deliverables, profiles, feedback                                                |
| **Índices sugeridos**  | deliverable_id, mentor_id, status                                               |
| **Reglas importantes** | Solo mentor/admin autorizado puede evaluar.                                     |
| **RLS**                | Sí. Mentor ve propias/asignadas; alumno ve resultado; admin ve todas.           |
| **Prioridad**          | MVP                                                                             |

---

### 7.2.13 feedback

| Campo                  | Detalle                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| **Propósito**          | Feedback estructurado de una evaluación.                                                         |
| **Campos principales** | id, evaluation_id, author_id, summary, strengths, improvements, next_steps, priority, created_at |
| **Relaciones**         | evaluations, profiles                                                                            |
| **Índices sugeridos**  | evaluation_id, author_id                                                                         |
| **Reglas importantes** | Obligatorio cuando se rechaza o solicita corrección.                                             |
| **RLS**                | Sí. Alumno puede leer su feedback. Mentor/admin crea.                                            |
| **Prioridad**          | MVP                                                                                              |

---

### 7.2.14 mentorship_sessions

| Campo                  | Detalle                                                                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Propósito**          | Sesiones de asesoría/mentoría.                                                                                                                |
| **Campos principales** | id, student_id, mentor_id, project_id, type, status, scheduled_start, scheduled_end, meeting_url, price_amount, notes, next_steps, created_at |
| **Relaciones**         | profiles, student_projects, payments                                                                                                          |
| **Índices sugeridos**  | student_id, mentor_id, status, scheduled_start                                                                                                |
| **Reglas importantes** | Puede estar pendiente de pago, confirmada o realizada.                                                                                        |
| **RLS**                | Sí. Alumno y mentor ven sus sesiones; admin todas.                                                                                            |
| **Prioridad**          | Fase 2                                                                                                                                        |

---

### 7.2.15 payments

| Campo                  | Detalle                                                                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Propósito**          | Registro de pagos.                                                                                                               |
| **Campos principales** | id, payer_id, mentorship_session_id, amount, currency, provider, provider_payment_id, status, paid_at, failed_reason, created_at |
| **Relaciones**         | profiles, mentorship_sessions, promotions                                                                                        |
| **Índices sugeridos**  | payer_id, status, provider_payment_id, mentorship_session_id                                                                     |
| **Reglas importantes** | El pago confirmado puede desbloquear revisión + asesoría.                                                                        |
| **RLS**                | Sí. Usuario ve propios; admin todos.                                                                                             |
| **Prioridad**          | Fase 2                                                                                                                           |

---

### 7.2.16 subscriptions

| Campo                  | Detalle                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| **Propósito**          | Suscripciones futuras.                                                |
| **Campos principales** | id, user_id, plan_name, status, amount, currency, started_at, ends_at |
| **Relaciones**         | profiles, payments                                                    |
| **Índices sugeridos**  | user_id, status                                                       |
| **Reglas importantes** | No implementar completo en MVP.                                       |
| **RLS**                | Sí.                                                                   |
| **Prioridad**          | Futura                                                                |

---

### 7.2.17 institutions

| Campo                  | Detalle                                               |
| ---------------------- | ----------------------------------------------------- |
| **Propósito**          | Organizaciones B2B.                                   |
| **Campos principales** | id, name, type, status, contact_email, created_at     |
| **Relaciones**         | institution_members, cohorts                          |
| **Índices sugeridos**  | name, status                                          |
| **Reglas importantes** | Datos aislados por institución.                       |
| **RLS**                | Sí. Miembros ven solo su institución. Admin ve todas. |
| **Prioridad**          | Fase 3                                                |

---

### 7.2.18 institution_members

| Campo                  | Detalle                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| **Propósito**          | Relaciona usuarios con instituciones.                                   |
| **Campos principales** | id, institution_id, profile_id, role_in_institution, status, created_at |
| **Relaciones**         | institutions, profiles                                                  |
| **Índices sugeridos**  | institution_id, profile_id, status                                      |
| **Reglas importantes** | Define acceso a datos institucionales.                                  |
| **RLS**                | Sí.                                                                     |
| **Prioridad**          | Fase 3                                                                  |

---

### 7.2.19 cohorts

| Campo                  | Detalle                                                                       |
| ---------------------- | ----------------------------------------------------------------------------- |
| **Propósito**          | Grupos de alumnos dentro de una institución.                                  |
| **Campos principales** | id, institution_id, name, description, status, starts_at, ends_at, created_at |
| **Relaciones**         | institutions, cohort_students                                                 |
| **Índices sugeridos**  | institution_id, status                                                        |
| **Reglas importantes** | Una institución puede tener muchas cohortes.                                  |
| **RLS**                | Sí.                                                                           |
| **Prioridad**          | Fase 3                                                                        |

---

### 7.2.20 cohort_students

| Campo                  | Detalle                                      |
| ---------------------- | -------------------------------------------- |
| **Propósito**          | Participantes de una cohorte.                |
| **Campos principales** | id, cohort_id, student_id, status, joined_at |
| **Relaciones**         | cohorts, profiles                            |
| **Índices sugeridos**  | cohort_id, student_id, status                |
| **Reglas importantes** | Evitar duplicados por cohorte.               |
| **RLS**                | Sí.                                          |
| **Prioridad**          | Fase 3                                       |

---

### 7.2.21 notifications

| Campo                  | Detalle                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| **Propósito**          | Notificaciones internas.                                                                               |
| **Campos principales** | id, user_id, title, message, type, status, related_entity_type, related_entity_id, created_at, read_at |
| **Relaciones**         | profiles                                                                                               |
| **Índices sugeridos**  | user_id, status, created_at                                                                            |
| **Reglas importantes** | Usuario solo ve sus notificaciones.                                                                    |
| **RLS**                | Sí.                                                                                                    |
| **Prioridad**          | MVP                                                                                                    |

---

### 7.2.22 reports

| Campo                  | Detalle                                                                        |
| ---------------------- | ------------------------------------------------------------------------------ |
| **Propósito**          | Reportes generados o guardados.                                                |
| **Campos principales** | id, generated_by, institution_id, type, filters, file_path, status, created_at |
| **Relaciones**         | profiles, institutions                                                         |
| **Índices sugeridos**  | generated_by, institution_id, type, status                                     |
| **Reglas importantes** | Reportes institucionales deben aislarse por institución.                       |
| **RLS**                | Sí.                                                                            |
| **Prioridad**          | Fase 3 / Fase 10                                                               |

---

### 7.2.23 audit_logs

| Campo                  | Detalle                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| **Propósito**          | Auditoría de acciones críticas.                                                            |
| **Campos principales** | id, actor_id, action, entity_type, entity_id, metadata, ip_address, user_agent, created_at |
| **Relaciones**         | profiles                                                                                   |
| **Índices sugeridos**  | actor_id, action, entity_type, created_at                                                  |
| **Reglas importantes** | No editable por usuarios.                                                                  |
| **RLS**                | Sí. Lectura solo admin. Escritura solo servidor.                                           |
| **Prioridad**          | MVP                                                                                        |

---

### 7.2.24 promotions

| Campo                  | Detalle                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| **Propósito**          | Cupones y descuentos.                                                               |
| **Campos principales** | id, code, type, value, status, starts_at, ends_at, max_uses, used_count, created_at |
| **Relaciones**         | payments                                                                            |
| **Índices sugeridos**  | code único, status                                                                  |
| **Reglas importantes** | Validar vigencia y límite antes de pago.                                            |
| **RLS**                | Sí. Lectura limitada; escritura admin.                                              |
| **Prioridad**          | Fase 2                                                                              |

---

### 7.2.25 user_progress

| Campo                  | Detalle                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------- |
| **Propósito**          | Progreso del alumno por curso/lección.                                                |
| **Campos principales** | id, user_id, course_id, lesson_id, progress_percent, status, completed_at, updated_at |
| **Relaciones**         | profiles, courses, lessons                                                            |
| **Índices sugeridos**  | user_id, course_id, lesson_id, status                                                 |
| **Reglas importantes** | No debe marcar curso completado sin proyecto aprobado.                                |
| **RLS**                | Sí. Alumno ve propio; mentor/admin según permiso.                                     |
| **Prioridad**          | MVP                                                                                   |

---

### 7.2.26 course_unlocks

| Campo                  | Detalle                                                              |
| ---------------------- | -------------------------------------------------------------------- |
| **Propósito**          | Control de cursos desbloqueados por usuario.                         |
| **Campos principales** | id, user_id, course_id, unlocked_by, reason, unlocked_at, created_at |
| **Relaciones**         | profiles, courses                                                    |
| **Índices sugeridos**  | user_id, course_id, user_id + course_id único                        |
| **Reglas importantes** | Desbloqueo solo por reglas de negocio o admin autorizado.            |
| **RLS**                | Sí. Usuario lee propios; admin gestiona.                             |
| **Prioridad**          | MVP                                                                  |

---

# 8. Relaciones entre entidades

## 8.1 Relaciones principales

* Un usuario autenticado tiene un perfil.
* Un perfil puede tener uno o más roles.
* Un rol puede estar asignado a muchos perfiles.
* Un curso pertenece a una categoría.
* Un curso tiene muchos módulos.
* Un módulo tiene muchas lecciones.
* Una lección puede tener muchos recursos.
* Un alumno puede tener muchos proyectos.
* Un proyecto puede tener muchos entregables.
* Un entregable pertenece a un proyecto y a un curso.
* Un entregable puede tener muchos archivos.
* Un entregable puede tener una o muchas evaluaciones según historial.
* Una evaluación pertenece a un mentor.
* Una evaluación puede tener feedback.
* Una mentoría relaciona alumno, mentor y proyecto.
* Un pago puede asociarse a una mentoría.
* Un pago confirmado puede desbloquear revisión, asesoría o curso.
* Una institución puede tener muchos miembros.
* Una institución puede tener muchas cohortes.
* Una cohorte puede tener muchos alumnos.
* Un alumno puede tener progreso por curso y lección.
* Un alumno puede tener desbloqueos por curso.

---

## 8.2 Diagrama textual entidad-relación

```text
auth.users
  └── profiles
        ├── user_roles
        │     └── roles
        ├── student_projects
        │     └── deliverables
        │           ├── deliverable_files
        │           └── evaluations
        │                 └── feedback
        ├── user_progress
        │     ├── courses
        │     └── lessons
        ├── course_unlocks
        │     └── courses
        ├── mentorship_sessions
        │     ├── mentor profile
        │     └── payments
        ├── notifications
        └── audit_logs

course_categories
  └── courses
        └── course_modules
              └── lessons
                    └── lesson_resources

institutions
  ├── institution_members
  │     └── profiles
  └── cohorts
        └── cohort_students
              └── profiles

reports
  ├── profiles
  └── institutions
```

---

# 9. Autenticación y autorización

## 9.1 Autenticación

SUClassroom usará **Supabase Auth** para:

* Registro con email y contraseña.
* Registro con Google.
* Verificación de email.
* Login.
* Logout.
* Recuperación de contraseña.
* Manejo de sesión.

---

## 9.2 Flujo de registro

```text
Usuario completa registro
  ↓
Supabase Auth crea usuario
  ↓
Se envía email de verificación
  ↓
Se crea profile asociado
  ↓
Se asigna rol student por defecto
  ↓
Usuario verifica email
  ↓
Middleware permite acceso
  ↓
Redirección a onboarding
```

---

## 9.3 Redirección según rol

| Rol         | Ruta destino             |
| ----------- | ------------------------ |
| student     | `/dashboard/student`     |
| mentor      | `/dashboard/mentor`      |
| admin       | `/dashboard/admin`       |
| institution | `/dashboard/institution` |

Si un usuario tiene múltiples roles, se debe definir:

1. Rol principal.
2. Selector de contexto en fase posterior.
3. Redirección por prioridad en MVP.

Prioridad sugerida:

```text
admin → mentor → institution → student
```

---

## 9.4 Middleware de protección

El middleware debe proteger:

| Ruta                     | Acceso                      |
| ------------------------ | --------------------------- |
| `/dashboard`             | Autenticado                 |
| `/dashboard/student`     | student                     |
| `/dashboard/mentor`      | mentor                      |
| `/dashboard/admin`       | admin                       |
| `/dashboard/institution` | institution                 |
| `/courses`               | Autenticado                 |
| `/projects`              | student                     |
| `/deliverables`          | student, mentor, admin      |
| `/payments`              | student, admin, institution |
| `/settings`              | Autenticado                 |

---

## 9.5 RBAC

El sistema debe tener RBAC en tres niveles:

1. **Ruta:** middleware.
2. **UI:** ocultar/mostrar acciones.
3. **Servidor:** validación obligatoria en Server Actions.

La validación server-side es obligatoria. La UI no es seguridad.

---

## 9.6 RLS en Supabase

Todas las tablas sensibles deben tener RLS activado.

Principios:

* Alumno solo ve sus propios proyectos, entregables, pagos y progreso.
* Mentor solo ve entregables y alumnos asignados.
* Institución solo ve usuarios/cohortes/reportes de su institución.
* Admin puede ver todo.
* Archivos privados requieren signed URLs.
* Audit logs solo para admin.

---

## 9.7 Matriz técnica de permisos

| Permiso                  |     Student |      Mentor | Admin | Institution |
| ------------------------ | ----------: | ----------: | ----: | ----------: |
| `courses:read`           |          Sí |          Sí |    Sí |          Sí |
| `courses:create`         |          No |      No MVP |    Sí |          No |
| `courses:update`         |          No |      No MVP |    Sí |          No |
| `courses:publish`        |          No |          No |    Sí |          No |
| `lessons:complete`       |          Sí |          No |    No |          No |
| `projects:create`        |          Sí |          No |    Sí |          No |
| `projects:read-own`      |          Sí |          No |    Sí |          No |
| `projects:read-assigned` |          No |          Sí |    Sí |          No |
| `deliverables:submit`    |          Sí |          No |    No |          No |
| `deliverables:review`    |          No |          Sí |    Sí |          No |
| `deliverables:approve`   |          No |          Sí |    Sí |          No |
| `deliverables:reject`    |          No |          Sí |    Sí |          No |
| `feedback:create`        |          No |          Sí |    Sí |          No |
| `feedback:read-own`      |          Sí |          Sí |    Sí |          No |
| `mentorship:request`     |          Sí |          No |    Sí |          Sí |
| `mentorship:manage-own`  |          Sí |          Sí |    Sí | Sí limitado |
| `payments:create`        |          Sí |          No |    Sí |          Sí |
| `payments:manage`        |          No |          No |    Sí |          No |
| `users:manage`           |          No |          No |    Sí |          No |
| `cohorts:create`         |          No |          No |    Sí |          Sí |
| `cohorts:read-own`       |          No |          No |    Sí |          Sí |
| `reports:read-own`       | Sí limitado | Sí limitado |    Sí |          Sí |
| `reports:generate`       |      No MVP | Sí limitado |    Sí |          Sí |
| `settings:update-own`    |          Sí |          Sí |    Sí |          Sí |

---

# 10. Seguridad

## 10.1 Validación con Zod

Toda entrada debe validarse dos veces:

1. Client-side para UX.
2. Server-side para seguridad real.

Aplica a:

* Registro.
* Perfil.
* Cursos.
* Módulos.
* Lecciones.
* Proyectos.
* Entregables.
* Evaluaciones.
* Feedback.
* Mentorías.
* Pagos.
* Instituciones.
* Cohortes.

---

## 10.2 Sanitización de inputs

Debe aplicarse en:

* Campos de texto extensos.
* Descripciones de proyecto.
* Feedback.
* Notas de mentoría.
* Contenido de cursos.
* Links enviados por alumnos.

Medidas:

* Limitar longitud.
* Validar URLs.
* Bloquear HTML peligroso.
* Evitar scripts embebidos.
* Normalizar strings.

---

## 10.3 Protección contra acceso no autorizado

Cada Server Action debe verificar:

1. Usuario autenticado.
2. Rol autorizado.
3. Permiso requerido.
4. Propiedad del recurso.
5. Estado válido del recurso.
6. RLS como segunda barrera.

---

## 10.4 Rate limiting

Aplicar rate limiting a:

* Login.
* Registro.
* Recuperación de contraseña.
* Envío de entregables.
* Solicitud de asesoría.
* Creación de pagos.
* Webhooks.
* Subida de archivos.

---

## 10.5 Protección de archivos privados

* No exponer URLs públicas de entregables.
* Usar signed URLs con expiración.
* Separar buckets públicos y privados.
* Validar permisos antes de generar URL.
* Auditar descarga de archivos sensibles en fases posteriores.

---

## 10.6 Control de subida de archivos

Validar:

* Tamaño máximo.
* Tipo MIME.
* Extensión.
* Usuario propietario.
* Entidad asociada.
* Límite por entregable.
* Nombre de archivo normalizado.

Tipos permitidos MVP:

```text
PDF
DOC/DOCX
PPT/PPTX
XLS/XLSX
PNG/JPG
Links externos validados
```

---

## 10.7 Protección de pagos

* Crear pagos solo server-side.
* No confiar en montos enviados desde cliente.
* Recalcular precio en servidor.
* Verificar firma de webhook Qulqi.
* Confirmar estado con Qulqi antes de marcar como paid.
* Registrar provider_payment_id.
* Evitar doble confirmación idempotente.
* Auditar cambios de estado.

---

## 10.8 Webhooks seguros de Qulqi

El Route Handler de webhook debe:

1. Verificar firma/secreto.
2. Validar evento.
3. Buscar pago interno.
4. Verificar idempotencia.
5. Actualizar estado.
6. Desbloquear servicio si corresponde.
7. Registrar audit log.
8. Capturar errores con Sentry.

---

## 10.9 Manejo de errores

Clasificar errores:

| Tipo                | Acción                                         |
| ------------------- | ---------------------------------------------- |
| Error de validación | Mostrar mensaje claro al usuario.              |
| Error de permiso    | Mostrar acceso denegado.                       |
| Error de pago       | Permitir reintento.                            |
| Error de storage    | Mantener entregable como borrador si aplica.   |
| Error inesperado    | Capturar en Sentry y mostrar mensaje genérico. |

---

## 10.10 Variables de entorno

* Nunca exponer service role key al cliente.
* Separar variables públicas y privadas.
* Usar Vercel Environment Variables.
* Rotar claves si hay exposición.
* No subir `.env` al repositorio.

---

# 11. Storage y archivos

## 11.1 Tipos de archivos

| Tipo                       | Uso                           | Acceso                                    |
| -------------------------- | ----------------------------- | ----------------------------------------- |
| Recursos de cursos         | Plantillas, guías, documentos | Público autenticado o privado según curso |
| Entregables                | Archivos enviados por alumnos | Privado                                   |
| Documentos institucionales | Reportes, documentos B2B      | Privado                                   |
| Imágenes de perfil         | Avatares                      | Público o firmado                         |
| Reportes exportados        | PDF/CSV/XLSX                  | Privado                                   |

---

## 11.2 Buckets sugeridos

```text
course-resources
deliverable-files
profile-avatars
institution-documents
generated-reports
```

---

## 11.3 Política por bucket

| Bucket                  | Público |  Privado | Regla                                                |
| ----------------------- | ------: | -------: | ---------------------------------------------------- |
| `course-resources`      | Parcial |       Sí | Recursos públicos autenticados o privados por curso. |
| `deliverable-files`     |      No |       Sí | Solo alumno dueño, mentor asignado y admin.          |
| `profile-avatars`       |      Sí | Opcional | Avatares públicos si no hay datos sensibles.         |
| `institution-documents` |      No |       Sí | Solo institución correspondiente y admin.            |
| `generated-reports`     |      No |       Sí | Signed URLs con expiración.                          |

---

## 11.4 Límites recomendados

| Recurso                             | Límite inicial |
| ----------------------------------- | -------------- |
| Archivo de entregable               | 20 MB          |
| Recursos de curso                   | 50 MB          |
| Imagen de perfil                    | 2 MB           |
| Reporte generado                    | 25 MB          |
| Cantidad de archivos por entregable | 5              |

---

## 11.5 Estructura de paths

```text
deliverable-files/
  {studentId}/
    {projectId}/
      {deliverableId}/
        {version}/
          filename.ext

course-resources/
  {courseId}/
    {moduleId}/
      {lessonId}/
        filename.ext

institution-documents/
  {institutionId}/
    {cohortId}/
      filename.ext

generated-reports/
  {institutionId-or-admin}/
    {reportId}/
      report.ext
```

---

# 12. Videos de cursos

## 12.1 Opciones técnicas

### Opción A: Videos externos embebidos

Ejemplos:

* YouTube no listado.
* Vimeo.
* Bunny Stream.
* Mux.
* Loom privado.

**Ventajas:**

* Menor costo inicial.
* Menos complejidad.
* Mejor streaming.
* Rápido para MVP.

**Desventajas:**

* Menor control.
* Riesgo de enlaces compartidos.
* Protección limitada.

---

### Opción B: Videos en Supabase Storage

**Ventajas:**

* Mayor control de acceso.
* Centralización.

**Desventajas:**

* Costos y performance.
* Streaming menos especializado.
* Mayor complejidad.

---

### Opción C: Plataforma especializada

Ejemplos:

* Mux.
* Bunny Stream.
* Vimeo OTT.

**Ventajas:**

* Streaming profesional.
* Protección avanzada.
* Mejor experiencia.

**Desventajas:**

* Costo adicional.
* Integración adicional.

---

## 12.2 Recomendación para MVP

Para MVP se recomienda:

```text
Videos externos embebidos + control de acceso a nivel de plataforma
```

Guardar en `lessons`:

* `video_url`.
* `video_provider`.
* `duration_minutes`.
* `is_required`.

No construir sistema de hosting propio de video en MVP.

---

# 13. Pagos con Qulqi

## 13.1 Arquitectura de pagos

```text
Alumno solicita asesoría
  ↓
Sistema calcula monto
  ↓
Server Action createPayment
  ↓
Se crea payment en estado pending
  ↓
Se llama a Qulqi
  ↓
Usuario completa pago
  ↓
Qulqi confirma / webhook
  ↓
Route Handler verifica webhook
  ↓
Payment pasa a paid
  ↓
Mentoría pasa a confirmed
  ↓
Se desbloquea revisión + asesoría
  ↓
Notificación al alumno y mentor
```

---

## 13.2 Estados del pago

| Estado       | Descripción                    |
| ------------ | ------------------------------ |
| `pending`    | Pago creado, aún no procesado. |
| `processing` | Qulqi está procesando.         |
| `paid`       | Pago confirmado.               |
| `failed`     | Pago fallido.                  |
| `refunded`   | Pago reembolsado.              |
| `cancelled`  | Pago cancelado.                |

---

## 13.3 Reglas de pago

* El cliente no define el monto.
* El servidor calcula el monto.
* El pago se asocia a:

  * Usuario.
  * Mentoría.
  * Revisión.
  * Promoción si aplica.
* El pago confirmado puede:

  * Confirmar asesoría.
  * Desbloquear revisión.
  * Habilitar siguiente paso.
* Todo cambio de estado debe auditarse.

---

## 13.4 Webhook

El webhook debe manejar:

* Pago completado.
* Pago fallido.
* Reembolso.
* Cancelación.

Debe ser idempotente:

```text
Si el pago ya está paid, no volver a ejecutar desbloqueos.
```

---

## 13.5 Errores y reintentos

| Caso                | Manejo                                         |
| ------------------- | ---------------------------------------------- |
| Pago fallido        | Mostrar mensaje y permitir reintento.          |
| Webhook llega tarde | Consultar estado al cargar historial.          |
| Doble webhook       | Ignorar si ya procesado.                       |
| Monto alterado      | Rechazar y auditar.                            |
| Error Qulqi         | Registrar en Sentry y mantener pending/failed. |

---

# 14. Sistema de progreso y desbloqueo

## 14.1 Cálculo de progreso

El progreso debe calcularse combinando:

* Lecciones completadas.
* Recursos revisados si aplica.
* Proyecto creado.
* Entregable enviado.
* Evaluación recibida.
* Proyecto aprobado.
* Asesoría pagada/realizada si el curso lo exige.

Pero la regla crítica es:

```text
Un curso solo se considera completado cuando el proyecto/entregable final es aprobado.
```

---

## 14.2 Eventos que cambian progreso

| Evento                    | Efecto                                             |
| ------------------------- | -------------------------------------------------- |
| `lesson_completed`        | Aumenta progreso parcial.                          |
| `project_created`         | Marca avance de aplicación.                        |
| `deliverable_submitted`   | Cambia estado a proyecto enviado.                  |
| `deliverable_rejected`    | Mantiene curso en progreso/corrección.             |
| `deliverable_resubmitted` | Regresa a revisión.                                |
| `deliverable_approved`    | Marca curso como completado.                       |
| `payment_completed`       | Habilita asesoría/revisión si aplica.              |
| `mentorship_completed`    | Puede habilitar siguiente curso si regla lo exige. |
| `course_unlocked`         | Crea registro en course_unlocks.                   |

---

## 14.3 Reglas de desbloqueo

Un curso puede desbloquearse si:

1. Es el primer curso gratuito.
2. El curso anterior está completado.
3. El entregable requerido está aprobado.
4. El pago requerido está confirmado.
5. La asesoría requerida está completada.
6. Un admin autoriza manualmente con audit log.

---

## 14.4 Rechazo y reenvío

Si un proyecto es rechazado:

* El entregable pasa a `rejected`.
* El progreso no se marca completado.
* Se crea feedback obligatorio.
* El alumno puede reenviar.
* El reenvío crea nueva versión.
* El estado pasa a `resubmitted` o `submitted`.
* El mentor vuelve a evaluar.

---

## 14.5 Prevención de desbloqueos no autorizados

* Solo `ProgressService` o `UnlockService` debe crear unlocks.
* Validar rol admin si desbloqueo manual.
* Registrar audit log siempre.
* No permitir actualización directa desde cliente.
* Validar server-side el estado del entregable/evaluación/pago.

---

# 15. Sistema de entregables y evaluación

## 15.1 Estados del entregable

| Estado         | Descripción                              |
| -------------- | ---------------------------------------- |
| `draft`        | El alumno está preparando el entregable. |
| `submitted`    | Fue enviado para revisión.               |
| `under_review` | Mentor inició revisión.                  |
| `approved`     | Entregable aprobado.                     |
| `rejected`     | Entregable rechazado con feedback.       |
| `resubmitted`  | Alumno reenvió corrección.               |

---

## 15.2 Estados de evaluación

| Estado              | Descripción                |
| ------------------- | -------------------------- |
| `pending`           | Aún no evaluado.           |
| `in_progress`       | Mentor evaluando.          |
| `approved`          | Evaluación aprobatoria.    |
| `rejected`          | Evaluación no aprobatoria. |
| `changes_requested` | Requiere correcciones.     |

---

## 15.3 Flujo técnico de revisión

```text
Entregable submitted
  ↓
Mentor abre entregable
  ↓
Estado under_review
  ↓
Mentor completa evaluationSchema
  ↓
Mentor crea feedback
  ↓
Decisión:
  ├── approved
  │     ├── course completed
  │     ├── progress updated
  │     └── unlock next course
  └── rejected / changes_requested
        ├── feedback required
        ├── student notified
        └── resubmission enabled
```

---

## 15.4 Criterios de aprobación

Cada curso debe definir criterios como:

* Entregable completo.
* Claridad del modelo.
* Validación mínima.
* Aplicabilidad.
* Coherencia con objetivo del curso.
* Evidencia adjunta.
* Próximos pasos definidos.

En MVP, los criterios pueden manejarse como texto estructurado por curso. En fase posterior, como rúbricas configurables.

---

## 15.5 Historial de revisiones

Debe conservar:

* Versión enviada.
* Archivos asociados.
* Mentor evaluador.
* Fecha.
* Decisión.
* Feedback.
* Próximos pasos.

No se debe sobrescribir el historial anterior.

---

# 16. Sistema de mentorías

## 16.1 Flujo técnico

```text
Alumno solicita mentoría
  ↓
Selecciona tipo de asesoría
  ↓
Selecciona mentor o sistema asigna
  ↓
Selecciona horario
  ↓
Se crea mentorship_session pending_payment
  ↓
Se crea payment pending
  ↓
Pago confirmado
  ↓
Mentoría confirmed
  ↓
Se notifica a mentor y alumno
  ↓
Se realiza sesión
  ↓
Mentor registra notas y próximos pasos
  ↓
Mentoría completed
```

---

## 16.2 Estados de mentoría

| Estado            | Descripción                        |
| ----------------- | ---------------------------------- |
| `requested`       | Solicitud creada.                  |
| `pending_payment` | Esperando pago.                    |
| `confirmed`       | Pago confirmado y sesión agendada. |
| `completed`       | Sesión realizada.                  |
| `cancelled`       | Cancelada.                         |
| `rescheduled`     | Reprogramada.                      |
| `no_show`         | Usuario no asistió.                |

---

## 16.3 Disponibilidad

Para MVP:

* Agenda básica por bloques.
* Mentor define disponibilidad manual o admin la configura.
* No construir calendario complejo al inicio.
* Se puede integrar herramienta externa en primera versión operativa.

---

## 16.4 Notas posteriores

Después de la sesión, el mentor debe registrar:

* Resumen.
* Problemas detectados.
* Recomendaciones.
* Próximos pasos.
* Fecha sugerida de seguimiento.
* Relación con proyecto/entregable.

---

# 17. Dashboards por rol

## 17.1 Dashboard del alumno

### Datos necesarios

* Cursos activos.
* Curso actual.
* Progreso por curso.
* Entregables pendientes.
* Último feedback.
* Próxima asesoría.
* Cursos bloqueados.
* Próxima acción recomendada.
* Pagos recientes.

### Consultas principales

* `getStudentDashboardSummary`
* `getStudentActiveCourses`
* `getStudentProgress`
* `getStudentDeliverables`
* `getStudentRecentFeedback`
* `getStudentUpcomingMentorship`

### Acciones rápidas

* Continuar curso.
* Ver proyecto.
* Enviar entregable.
* Ver feedback.
* Solicitar asesoría.
* Ver cursos bloqueados.

---

## 17.2 Dashboard del mentor

### Datos necesarios

* Entregables pendientes.
* Entregables en revisión.
* Alumnos asignados.
* Asesorías próximas.
* Proyectos aprobados.
* Proyectos rechazados.
* Tiempo promedio de revisión.

### Consultas principales

* `getMentorDashboardSummary`
* `getAssignedDeliverables`
* `getMentorStudents`
* `getMentorUpcomingSessions`
* `getMentorReviewStats`

### Acciones rápidas

* Revisar entregable.
* Aprobar.
* Rechazar.
* Ver historial.
* Registrar notas de asesoría.

---

## 17.3 Dashboard del administrador

### Datos necesarios

* Usuarios activos.
* Nuevos usuarios.
* Cursos publicados.
* Entregables enviados.
* Entregables pendientes.
* Pagos confirmados.
* Pagos fallidos.
* Asesorías solicitadas.
* Reportes.
* Métricas de impacto.
* Actividad reciente.

### Consultas principales

* `getAdminDashboardSummary`
* `getRecentUsers`
* `getPendingDeliverables`
* `getPaymentStats`
* `getCourseCompletionStats`
* `getImpactMetrics`
* `getAuditActivity`

### Acciones rápidas

* Crear curso.
* Crear usuario.
* Asignar mentor.
* Generar reporte.
* Crear promoción.
* Revisar pagos.

---

## 17.4 Dashboard institucional

### Datos necesarios

* Cohortes.
* Participantes.
* Avance grupal.
* Proyectos enviados.
* Proyectos aprobados.
* Usuarios inactivos.
* Cursos asignados.
* Reportes descargables.

### Consultas principales

* `getInstitutionDashboardSummary`
* `getInstitutionCohorts`
* `getCohortProgress`
* `getInstitutionParticipants`
* `getInstitutionImpactReports`

### Acciones rápidas

* Crear cohorte.
* Invitar alumno.
* Ver progreso.
* Descargar reporte.
* Solicitar programa personalizado.

---

# 18. Analítica y eventos

## 18.1 Eventos PostHog

| Evento                  | Cuándo se dispara                | Propiedades                                | Utilidad                 |
| ----------------------- | -------------------------------- | ------------------------------------------ | ------------------------ |
| `user_registered`       | Usuario crea cuenta.             | user_id, method, role                      | Medir adquisición.       |
| `onboarding_completed`  | Alumno termina diagnóstico.      | user_id, level, project_stage              | Medir activación.        |
| `course_started`        | Alumno inicia curso.             | user_id, course_id, is_free                | Medir interés.           |
| `lesson_completed`      | Alumno completa lección.         | user_id, course_id, lesson_id              | Medir avance parcial.    |
| `deliverable_submitted` | Alumno envía entregable.         | user_id, course_id, project_id             | Medir ejecución real.    |
| `deliverable_approved`  | Mentor aprueba.                  | user_id, course_id, mentor_id              | Medir éxito.             |
| `deliverable_rejected`  | Mentor rechaza.                  | user_id, course_id, mentor_id, reason_type | Detectar fricción.       |
| `mentorship_requested`  | Alumno solicita asesoría.        | user_id, mentor_id, type                   | Medir intención de pago. |
| `payment_started`       | Se inicia pago.                  | user_id, amount, concept                   | Medir funnel de pago.    |
| `payment_completed`     | Pago confirmado.                 | user_id, amount, provider                  | Medir ingresos.          |
| `course_unlocked`       | Se desbloquea curso.             | user_id, course_id, reason                 | Medir progresión.        |
| `user_inactive`         | Usuario sin actividad relevante. | user_id, last_activity                     | Detectar abandono.       |
| `report_generated`      | Se genera reporte.               | user_id, report_type, role                 | Medir uso B2B/admin.     |

---

## 18.2 Eventos críticos para MVP

Prioridad inicial:

1. `user_registered`
2. `onboarding_completed`
3. `course_started`
4. `lesson_completed`
5. `deliverable_submitted`
6. `deliverable_approved`
7. `deliverable_rejected`
8. `course_unlocked`

---

# 19. Observabilidad y errores

## 19.1 Sentry debe capturar

* Errores en Server Actions.
* Errores de Route Handlers.
* Fallos de Qulqi.
* Fallos de Supabase Storage.
* Fallos de Drizzle/DB.
* Fallos de permisos inesperados.
* Errores en render de dashboards.
* Errores de carga de archivos.
* Errores de generación de reportes.

---

## 19.2 Logs importantes

| Acción                 | Log                           |
| ---------------------- | ----------------------------- |
| Registro               | Usuario creado, rol asignado. |
| Login fallido repetido | Posible abuso.                |
| Envío de entregable    | Entidad, usuario, estado.     |
| Evaluación             | Mentor, decisión, entregable. |
| Pago                   | Creado, confirmado, fallido.  |
| Desbloqueo             | Usuario, curso, razón.        |
| Cambio de rol          | Actor, usuario afectado.      |
| Descarga de reporte    | Usuario, reporte.             |

---

## 19.3 Errores esperados

| Error                  | Mensaje usuario                                                          |
| ---------------------- | ------------------------------------------------------------------------ |
| Entregable incompleto  | “Completa los campos requeridos antes de enviar.”                        |
| Sin permisos           | “No tienes permisos para realizar esta acción.”                          |
| Curso bloqueado        | “Este curso aún está bloqueado. Completa el paso anterior para acceder.” |
| Pago fallido           | “No se pudo completar el pago. Intenta nuevamente.”                      |
| Archivo inválido       | “El archivo no cumple el formato o tamaño permitido.”                    |
| Mentoría no disponible | “Ese horario ya no está disponible. Selecciona otro.”                    |

---

## 19.4 Auditoría

Acciones que siempre deben auditarse:

* Asignación de roles.
* Creación/edición/publicación de cursos.
* Aprobación/rechazo de entregables.
* Cambio de estado de pagos.
* Desbloqueo manual de cursos.
* Creación de promociones.
* Generación de reportes.
* Cambios en instituciones/cohortes.

---

# 20. Emails y notificaciones

## 20.1 Matriz de notificaciones

| Evento                   | Canal         | Receptor       | Contenido general                     |
| ------------------------ | ------------- | -------------- | ------------------------------------- |
| Registro                 | Email         | Usuario        | Bienvenida y verificación.            |
| Verificación de email    | Email         | Usuario        | Confirmación de cuenta.               |
| Proyecto enviado         | Interna/email | Mentor/admin   | Nuevo entregable pendiente.           |
| Proyecto aprobado        | Interna/email | Alumno         | Entregable aprobado y siguiente paso. |
| Proyecto rechazado       | Interna/email | Alumno         | Feedback disponible y correcciones.   |
| Feedback recibido        | Interna       | Alumno         | Nuevo feedback del mentor.            |
| Asesoría solicitada      | Interna/email | Mentor         | Nueva solicitud de asesoría.          |
| Pago confirmado          | Email/interna | Alumno, admin  | Confirmación de pago.                 |
| Curso desbloqueado       | Interna/email | Alumno         | Nuevo curso disponible.               |
| Recordatorio de asesoría | Email         | Alumno, mentor | Recordatorio de sesión próxima.       |
| Invitación institucional | Email         | Participante   | Invitación a cohorte/programa.        |

---

## 20.2 Recomendación MVP

Para MVP:

* Email de verificación por Supabase.
* Notificaciones internas para feedback y entregables.
* Emails transaccionales mínimos:

  * Entregable aprobado.
  * Entregable rechazado.
  * Pago confirmado.
  * Asesoría confirmada.

---

# 21. Diseño UI técnico

## 21.1 Sistema de diseño

SUClassroom debe tener un sistema de diseño basado en:

* Tailwind CSS.
* shadcn/ui.
* Componentes reutilizables.
* Tokens de color.
* Estados semánticos.
* Tema claro y oscuro.
* Layouts por contexto.

---

## 21.2 Tema claro

Uso recomendado:

* Landing.
* Registro.
* Login.
* Onboarding.
* Vista de cursos.
* Vista de lección.
* Panel del alumno.

Características:

* Fondo claro.
* Cards limpias.
* CTA visible.
* Mucho espacio.
* Enfoque motivador.

---

## 21.3 Tema oscuro

Uso recomendado:

* Dashboard admin.
* Dashboard mentor.
* Analítica.
* Reportes.
* File manager.
* Panel institucional si se busca estilo corporativo premium.

Características:

* Fondo azul noche.
* Cards con glassmorphism moderado.
* Bordes sutiles.
* Badges de estado.
* Gráficas con alto contraste.
* Topbar y sidebar fijas.

---

## 21.4 Layout público

Debe incluir:

* Header.
* Hero.
* Propuesta de valor.
* Cursos destacados.
* Cómo funciona.
* Beneficios.
* Planes o asesorías.
* Testimonios.
* FAQ.
* CTA final.
* Footer.

---

## 21.5 Layout dashboard

Debe incluir:

* Sidebar lateral.
* Topbar.
* Breadcrumb o título.
* Área de contenido.
* Acciones rápidas.
* Responsive sidebar en móvil.
* Notificaciones.
* Perfil.

---

## 21.6 Estados UI obligatorios

| Estado        | Uso                                                      |
| ------------- | -------------------------------------------------------- |
| Loading       | Carga de tablas, dashboards, formularios.                |
| Empty state   | Sin cursos, sin entregables, sin feedback.               |
| Error state   | Fallos controlados.                                      |
| Success state | Pago confirmado, entregable enviado, curso desbloqueado. |
| Locked state  | Cursos bloqueados.                                       |
| Pending state | Entregable o pago pendiente.                             |

---

# 22. Componentes principales

| Componente                 | Uso                               | Props conceptuales                    | Módulos                    | Prioridad |
| -------------------------- | --------------------------------- | ------------------------------------- | -------------------------- | --------- |
| **AppSidebar**             | Navegación lateral por rol.       | role, items, activePath, user         | Dashboard                  | Alta      |
| **DashboardShell**         | Layout base dashboard.            | user, role, children                  | Dashboard                  | Alta      |
| **DashboardHeader**        | Encabezado con título y acciones. | title, description, actions           | Dashboard                  | Alta      |
| **MetricCard**             | Mostrar KPI.                      | title, value, trend, icon             | Admin, Mentor, Institution | Alta      |
| **ProgressCard**           | Avance del alumno.                | course, percent, status, nextAction   | Student                    | Alta      |
| **CourseCard**             | Card de curso.                    | title, status, progress, lockedReason | Courses                    | Alta      |
| **LessonList**             | Lista de lecciones.               | lessons, activeLessonId, progress     | Lessons                    | Alta      |
| **DeliverableStatusBadge** | Estado del entregable.            | status                                | Deliverables               | Alta      |
| **EvaluationPanel**        | Evaluación de mentor.             | deliverable, criteria, status         | Evaluations                | Alta      |
| **FeedbackCard**           | Mostrar feedback.                 | summary, improvements, nextSteps      | Feedback                   | Alta      |
| **PaymentStatusBadge**     | Estado de pago.                   | status                                | Payments                   | Media     |
| **UserTable**              | Gestión de usuarios.              | users, filters, actions               | Admin                      | Alta      |
| **CourseTable**            | Gestión cursos.                   | courses, filters, actions             | Admin                      | Alta      |
| **MentorAssignmentPanel**  | Asignar mentor.                   | student, mentors, currentMentor       | Admin                      | Media     |
| **InstitutionCohortTable** | Cohortes.                         | cohorts, progress, actions            | Institution                | Fase 3    |
| **ReportCard**             | Resumen de reporte.               | title, type, date, status             | Reports                    | Media     |
| **FileUploader**           | Subir archivos.                   | maxSize, allowedTypes, entity         | Resources, Deliverables    | Alta      |
| **CalendarPanel**          | Agenda básica.                    | sessions, availability, mode          | Mentorship                 | Media     |
| **NotificationDropdown**   | Notificaciones.                   | notifications, unreadCount            | Dashboard                  | Media     |
| **RoleGuard**              | Protección UI por rol.            | allowedRoles, children                | Shared                     | Alta      |

---

# 23. Server Actions y servicios

## 23.1 Auth / Users

### Acciones

| Acción           | Qué hace             | Validaciones            | Permisos             | Tablas               |
| ---------------- | -------------------- | ----------------------- | -------------------- | -------------------- |
| `registerUser`   | Crea usuario/perfil. | email, password, nombre | Público              | profiles, user_roles |
| `updateProfile`  | Actualiza perfil.    | profileSchema           | Usuario propio/admin | profiles             |
| `assignRole`     | Asigna rol.          | role válido             | Admin                | user_roles           |
| `deactivateUser` | Desactiva usuario.   | usuario existente       | Admin                | profiles             |

---

## 23.2 Courses

| Acción          | Qué hace       | Validaciones    | Permisos | Tablas  |
| --------------- | -------------- | --------------- | -------- | ------- |
| `createCourse`  | Crea curso.    | courseSchema    | Admin    | courses |
| `updateCourse`  | Edita curso.   | courseSchema    | Admin    | courses |
| `publishCourse` | Publica curso. | estado válido   | Admin    | courses |
| `archiveCourse` | Archiva curso. | curso existente | Admin    | courses |

---

## 23.3 Modules / Lessons

| Acción           | Qué hace                  | Validaciones    | Permisos | Tablas         |
| ---------------- | ------------------------- | --------------- | -------- | -------------- |
| `createModule`   | Crea módulo.              | moduleSchema    | Admin    | course_modules |
| `updateModule`   | Edita módulo.             | moduleSchema    | Admin    | course_modules |
| `createLesson`   | Crea lección.             | lessonSchema    | Admin    | lessons        |
| `completeLesson` | Marca lección completada. | acceso al curso | Student  | user_progress  |

---

## 23.4 Projects / Deliverables

| Acción                   | Qué hace            | Validaciones            | Permisos    | Tablas                          |
| ------------------------ | ------------------- | ----------------------- | ----------- | ------------------------------- |
| `createStudentProject`   | Crea proyecto.      | projectSchema           | Student     | student_projects                |
| `updateStudentProject`   | Actualiza proyecto. | projectSchema           | Dueño/admin | student_projects                |
| `createDeliverableDraft` | Crea borrador.      | deliverableSchema       | Student     | deliverables                    |
| `submitDeliverable`      | Envía entregable.   | estado válido, archivos | Student     | deliverables, deliverable_files |
| `resubmitDeliverable`    | Reenvía corrección. | feedback previo         | Student     | deliverables                    |

---

## 23.5 Evaluations / Feedback

| Acción                   | Qué hace               | Validaciones                  | Permisos     | Tablas                    |
| ------------------------ | ---------------------- | ----------------------------- | ------------ | ------------------------- |
| `startReviewDeliverable` | Cambia a under_review. | asignación mentor             | Mentor/Admin | deliverables              |
| `approveDeliverable`     | Aprueba entregable.    | feedback opcional, evaluación | Mentor/Admin | evaluations, deliverables |
| `rejectDeliverable`      | Rechaza entregable.    | feedback obligatorio          | Mentor/Admin | evaluations, feedback     |
| `createFeedback`         | Crea feedback.         | feedbackSchema                | Mentor/Admin | feedback                  |

---

## 23.6 Mentorship

| Acción               | Qué hace           | Validaciones         | Permisos             | Tablas              |
| -------------------- | ------------------ | -------------------- | -------------------- | ------------------- |
| `requestMentorship`  | Solicita asesoría. | mentorshipSchema     | Student              | mentorship_sessions |
| `scheduleMentorship` | Agenda sesión.     | disponibilidad       | Student/Mentor/Admin | mentorship_sessions |
| `completeMentorship` | Marca realizada.   | notas requeridas     | Mentor/Admin         | mentorship_sessions |
| `cancelMentorship`   | Cancela sesión.    | regla de cancelación | Student/Mentor/Admin | mentorship_sessions |

---

## 23.7 Payments

| Acción           | Qué hace                         | Validaciones      | Permisos            | Tablas               |
| ---------------- | -------------------------------- | ----------------- | ------------------- | -------------------- |
| `createPayment`  | Crea pago.                       | monto server-side | Student/Institution | payments             |
| `confirmPayment` | Confirma pago manual o callback. | provider id       | Server/Admin        | payments             |
| `applyPromotion` | Aplica cupón.                    | vigencia, límite  | Student             | promotions, payments |
| `refundPayment`  | Marca reembolso.                 | pago paid         | Admin               | payments             |

---

## 23.8 Institutions / Cohorts

| Acción                  | Qué hace          | Validaciones      | Permisos          | Tablas                |
| ----------------------- | ----------------- | ----------------- | ----------------- | --------------------- |
| `createInstitution`     | Crea institución. | institutionSchema | Admin             | institutions          |
| `createCohort`          | Crea cohorte.     | cohortSchema      | Admin/Institution | cohorts               |
| `inviteStudentToCohort` | Invita alumno.    | email válido      | Institution/Admin | cohort_students       |
| `assignCourseToCohort`  | Asigna curso.     | curso publicado   | Institution/Admin | cohort_courses futura |

---

## 23.9 Reports / Analytics

| Acción                | Qué hace          | Validaciones     | Permisos          | Tablas  |
| --------------------- | ----------------- | ---------------- | ----------------- | ------- |
| `generateReport`      | Genera reporte.   | filtros válidos  | Admin/Institution | reports |
| `getDashboardMetrics` | Obtiene métricas. | rol/contexto     | Según rol         | varias  |
| `trackProductEvent`   | Envía evento.     | evento permitido | Server            | PostHog |

---

# 24. Validaciones con Zod

## 24.1 Schemas necesarios

| Schema                | Campos y reglas                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| **authSchema**        | email válido, password mínimo, nombre requerido.                                                   |
| **profileSchema**     | nombre, teléfono opcional, avatar opcional, bio opcional.                                          |
| **courseSchema**      | título requerido, slug único, descripción, objetivo, resultado esperado, categoría, nivel, estado. |
| **moduleSchema**      | course_id requerido, título, orden, estado.                                                        |
| **lessonSchema**      | module_id requerido, título, contenido, video_url opcional, duración, orden.                       |
| **projectSchema**     | nombre, descripción, problema, solución, público objetivo, etapa.                                  |
| **deliverableSchema** | project_id, course_id, título, descripción, archivos/links, estado.                                |
| **evaluationSchema**  | deliverable_id, decision, score opcional, criterios, estado.                                       |
| **feedbackSchema**    | summary, strengths, improvements, next_steps; requerido si rechazo.                                |
| **mentorshipSchema**  | student_id, mentor_id opcional, type, fecha, precio calculado server-side.                         |
| **paymentSchema**     | concept, related_entity_id, promotion_code opcional. Monto no viene del cliente.                   |
| **institutionSchema** | nombre, tipo, email contacto, estado.                                                              |
| **cohortSchema**      | institution_id, nombre, fecha inicio, fecha fin, estado.                                           |

---

## 24.2 Reglas transversales

* IDs deben ser UUID válidos.
* Emails deben normalizarse.
* Textos deben tener límites máximos.
* URLs deben validarse.
* Estados deben pertenecer a enums permitidos.
* Fechas no pueden ser inválidas.
* Montos deben calcularse en servidor.
* Archivos deben validarse fuera y dentro del flujo de upload.

---

# 25. Variables de entorno

| Variable                          | Tipo                         | Uso                                                      |
| --------------------------------- | ---------------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`        | Pública                      | URL pública de Supabase.                                 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Pública                      | Clave pública para cliente Supabase.                     |
| `SUPABASE_SERVICE_ROLE_KEY`       | Privada                      | Operaciones server-side privilegiadas. Nunca en cliente. |
| `DATABASE_URL`                    | Privada                      | Conexión PostgreSQL para Drizzle.                        |
| `NEXT_PUBLIC_QULQI_PUBLIC_KEY`    | Pública                      | Inicialización cliente Qulqi si aplica.                  |
| `QULQI_PRIVATE_KEY`               | Privada                      | Crear/confirmar pagos server-side.                       |
| `QULQI_WEBHOOK_SECRET`            | Privada                      | Verificar webhooks.                                      |
| `RESEND_API_KEY`                  | Privada                      | Envío de emails con Resend.                              |
| `BREVO_API_KEY`                   | Privada                      | Alternativa para emails con Brevo.                       |
| `SENTRY_DSN`                      | Privada/pública según config | Captura de errores.                                      |
| `NEXT_PUBLIC_POSTHOG_KEY`         | Pública                      | Eventos cliente PostHog.                                 |
| `POSTHOG_HOST`                    | Pública                      | Host de PostHog.                                         |
| `APP_URL`                         | Privada/pública              | URLs absolutas para emails/callbacks.                    |
| `STORAGE_BUCKET_COURSE_RESOURCES` | Privada                      | Nombre bucket recursos.                                  |
| `STORAGE_BUCKET_DELIVERABLES`     | Privada                      | Nombre bucket entregables.                               |
| `STORAGE_BUCKET_REPORTS`          | Privada                      | Nombre bucket reportes.                                  |
| `MAX_UPLOAD_SIZE_MB`              | Privada/pública              | Límite de archivos.                                      |

---

# 26. Estrategia de implementación por fases

## Fase 0: Setup del proyecto

| Campo                       | Detalle                                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Objetivo**                | Crear base técnica limpia y escalable.                                                                            |
| **Tareas principales**      | Next.js, TypeScript, Tailwind, shadcn/ui, Supabase, Drizzle, ESLint, Prettier, variables de entorno, layout base. |
| **Dependencias**            | Repositorio Git, proyecto Supabase, Vercel.                                                                       |
| **Criterios de aceptación** | App corre localmente, build exitoso, estilos base, conexión DB preparada.                                         |
| **Riesgos técnicos**        | Mala configuración inicial genera deuda técnica.                                                                  |
| **Resultado esperado**      | Base lista para módulos reales.                                                                                   |

---

## Fase 1: Autenticación y roles

| Campo                       | Detalle                                                                                |
| --------------------------- | -------------------------------------------------------------------------------------- |
| **Objetivo**                | Implementar acceso seguro por rol.                                                     |
| **Tareas principales**      | Registro, login, Google, verificación, perfiles, roles, middleware, RBAC, redirección. |
| **Dependencias**            | Supabase Auth, tablas profiles/roles/user_roles.                                       |
| **Criterios de aceptación** | Cada rol entra a su dashboard correcto.                                                |
| **Riesgos técnicos**        | Roles mal protegidos o rutas accesibles indebidamente.                                 |
| **Resultado esperado**      | Seguridad base lista.                                                                  |

---

## Fase 2: Layouts y dashboards base

| Campo                       | Detalle                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| **Objetivo**                | Crear estructura visual por rol.                                                             |
| **Tareas principales**      | Landing básica, DashboardShell, Sidebar, Topbar, dashboard student/mentor/admin/institution. |
| **Dependencias**            | Auth y roles.                                                                                |
| **Criterios de aceptación** | Cada rol ve navegación y layout correcto.                                                    |
| **Riesgos técnicos**        | Mezclar lógica de dashboards antes de datos reales.                                          |
| **Resultado esperado**      | Base UI funcional para conectar módulos.                                                     |

---

## Fase 3: Cursos y contenido

| Campo                       | Detalle                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| **Objetivo**                | Gestionar cursos, módulos, lecciones y recursos.                                            |
| **Tareas principales**      | CRUD cursos admin, categorías, módulos, lecciones, recursos, vista de curso, vista lección. |
| **Dependencias**            | Storage, roles admin/student.                                                               |
| **Criterios de aceptación** | Admin crea curso y alumno lo visualiza.                                                     |
| **Riesgos técnicos**        | No definir bien estados de publicación.                                                     |
| **Resultado esperado**      | Primer curso gratuito disponible.                                                           |

---

## Fase 4: Proyectos y entregables

| Campo                       | Detalle                                                                     |
| --------------------------- | --------------------------------------------------------------------------- |
| **Objetivo**                | Permitir que alumno aplique y envíe evidencia.                              |
| **Tareas principales**      | Proyecto del alumno, formularios guiados, upload, borrador, envío, estados. |
| **Dependencias**            | Cursos, storage, profiles.                                                  |
| **Criterios de aceptación** | Alumno crea proyecto y envía entregable.                                    |
| **Riesgos técnicos**        | Archivos inseguros o estados mal controlados.                               |
| **Resultado esperado**      | Flujo de entrega activo.                                                    |

---

## Fase 5: Evaluación y feedback

| Campo                       | Detalle                                                                             |
| --------------------------- | ----------------------------------------------------------------------------------- |
| **Objetivo**                | Habilitar revisión por mentor.                                                      |
| **Tareas principales**      | Panel mentor, lista pendientes, evaluación, aprobar, rechazar, feedback, historial. |
| **Dependencias**            | Entregables, roles mentor/admin.                                                    |
| **Criterios de aceptación** | Mentor revisa y alumno recibe feedback.                                             |
| **Riesgos técnicos**        | Feedback sin trazabilidad o pérdida de historial.                                   |
| **Resultado esperado**      | Ciclo entregar-feedback-corregir funcional.                                         |

---

## Fase 6: Progreso y desbloqueos

| Campo                       | Detalle                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------- |
| **Objetivo**                | Controlar avance real del alumno.                                                     |
| **Tareas principales**      | user_progress, course_unlocks, reglas de desbloqueo, curso completado por aprobación. |
| **Dependencias**            | Evaluaciones, cursos, entregables.                                                    |
| **Criterios de aceptación** | Curso solo se completa con entregable aprobado.                                       |
| **Riesgos técnicos**        | Desbloqueos manuales o inconsistentes.                                                |
| **Resultado esperado**      | Ruta progresiva validada.                                                             |

---

## Fase 7: Mentorías

| Campo                       | Detalle                                                       |
| --------------------------- | ------------------------------------------------------------- |
| **Objetivo**                | Solicitar y gestionar asesorías.                              |
| **Tareas principales**      | Solicitud, mentor, agenda básica, estados, notas posteriores. |
| **Dependencias**            | Usuarios, mentores, proyectos.                                |
| **Criterios de aceptación** | Alumno solicita asesoría y mentor registra conclusiones.      |
| **Riesgos técnicos**        | Agenda demasiado compleja para MVP.                           |
| **Resultado esperado**      | Mentoría funcional sin sobreingeniería.                       |

---

## Fase 8: Pagos con Qulqi

| Campo                       | Detalle                                                               |
| --------------------------- | --------------------------------------------------------------------- |
| **Objetivo**                | Monetizar revisión + asesoría.                                        |
| **Tareas principales**      | Crear pago, Qulqi, confirmación, webhook, historial, unlock asociado. |
| **Dependencias**            | Mentorías, pagos, promociones.                                        |
| **Criterios de aceptación** | Pago confirmado actualiza estado y desbloquea servicio.               |
| **Riesgos técnicos**        | Webhooks inseguros o doble procesamiento.                             |
| **Resultado esperado**      | Flujo de pago real o preparado para producción.                       |

---

## Fase 9: Instituciones y cohortes

| Campo                       | Detalle                                                                        |
| --------------------------- | ------------------------------------------------------------------------------ |
| **Objetivo**                | Habilitar modelo B2B.                                                          |
| **Tareas principales**      | Institución, miembros, cohortes, participantes, cursos asignados, seguimiento. |
| **Dependencias**            | Users, courses, progress.                                                      |
| **Criterios de aceptación** | Institución ve progreso de su cohorte.                                         |
| **Riesgos técnicos**        | Filtración de datos entre instituciones.                                       |
| **Resultado esperado**      | Panel institucional básico seguro.                                             |

---

## Fase 10: Reportes y analítica

| Campo                       | Detalle                                                                 |
| --------------------------- | ----------------------------------------------------------------------- |
| **Objetivo**                | Medir ejecución, negocio e impacto.                                     |
| **Tareas principales**      | Métricas admin, mentor, institución, eventos PostHog, reportes básicos. |
| **Dependencias**            | Datos reales de cursos, entregables, pagos.                             |
| **Criterios de aceptación** | Dashboards muestran KPIs útiles.                                        |
| **Riesgos técnicos**        | Métricas incorrectas o costosas.                                        |
| **Resultado esperado**      | Analítica funcional para decisiones.                                    |

---

## Fase 11: Pulido UI, seguridad y despliegue

| Campo                       | Detalle                                                                                  |
| --------------------------- | ---------------------------------------------------------------------------------------- |
| **Objetivo**                | Preparar para uso real.                                                                  |
| **Tareas principales**      | Responsive, empty states, loading, errores, Sentry, PostHog, Vercel, revisión seguridad. |
| **Dependencias**            | Todas las fases anteriores.                                                              |
| **Criterios de aceptación** | Build estable, rutas protegidas, errores controlados, deploy exitoso.                    |
| **Riesgos técnicos**        | Publicar sin probar permisos o pagos.                                                    |
| **Resultado esperado**      | MVP listo para validación con usuarios.                                                  |

---

# 27. Guía exacta para Codex

## 27.1 Qué debe implementar primero

Codex debe seguir este orden estricto:

1. Crear setup base Next.js + TypeScript.
2. Configurar Tailwind + shadcn/ui.
3. Configurar estructura de carpetas.
4. Configurar Supabase client/server.
5. Configurar Drizzle.
6. Crear tablas base conceptuales en schema Drizzle cuando llegue la fase de código.
7. Implementar auth.
8. Implementar roles.
9. Implementar middleware.
10. Implementar layouts base.
11. Implementar dashboards vacíos por rol.
12. Implementar cursos.
13. Implementar proyectos.
14. Implementar entregables.
15. Implementar evaluación.
16. Implementar progreso.
17. Implementar mentorías.
18. Implementar pagos.
19. Implementar instituciones.
20. Implementar reportes.
21. Pulir seguridad y deploy.

---

## 27.2 Qué carpetas debe crear primero

Primero:

```text
src/app
src/components
src/features
src/lib
src/server
src/db
src/schemas
src/types
src/config
src/constants
src/styles
```

Luego crear progresivamente:

```text
features/auth
features/users
features/roles
features/dashboard
features/courses
features/projects
features/deliverables
features/evaluations
features/feedback
```

No crear todas las carpetas avanzadas vacías si no se usarán aún.

---

## 27.3 Qué módulos no debe tocar todavía

No tocar en las primeras fases:

* IA.
* Certificados.
* Comunidad.
* Marketplace de mentores.
* Suscripciones avanzadas.
* Reportes exportables complejos.
* App móvil.
* Automatización avanzada.
* Videollamadas propias.

---

## 27.4 Reglas que no debe romper

Codex no debe romper estas reglas:

1. El usuario debe estar autenticado para acceder al dashboard.
2. El rol debe proteger rutas y acciones.
3. El alumno solo ve sus datos.
4. El mentor solo revisa entregables asignados.
5. El admin gestiona todo.
6. Un curso no se completa solo por ver lecciones.
7. Un curso se completa cuando el entregable/proyecto es aprobado.
8. El rechazo exige feedback.
9. El alumno puede reenviar.
10. El desbloqueo debe ser server-side.
11. El pago no debe confiar en montos del cliente.
12. Los archivos de entregables son privados.
13. Toda acción crítica debe auditarse.
14. Toda mutación debe validar Zod server-side.
15. La UI no reemplaza permisos server-side.

---

## 27.5 Cómo debe avanzar por fases

Cada fase debe cerrarse con:

* Build exitoso.
* Lint sin errores críticos.
* Rutas protegidas.
* Validaciones aplicadas.
* Server Actions con permisos.
* Estados de loading/error.
* Documentación corta de lo implementado.
* Prueba manual del flujo principal.

---

## 27.6 Cómo validar cada fase antes de continuar

| Fase          | Validación                             |
| ------------- | -------------------------------------- |
| Setup         | App corre local y build pasa.          |
| Auth          | Registro/login/logout funcionan.       |
| Roles         | Cada rol entra solo a su dashboard.    |
| Layouts       | Sidebar/topbar correctos por rol.      |
| Cursos        | Admin crea curso, alumno lo ve.        |
| Proyectos     | Alumno crea proyecto.                  |
| Entregables   | Alumno envía entregable con archivo.   |
| Evaluación    | Mentor aprueba/rechaza.                |
| Progreso      | Curso se completa solo por aprobación. |
| Mentorías     | Alumno solicita y mentor gestiona.     |
| Pagos         | Pago cambia estado correctamente.      |
| Instituciones | Institución ve solo sus cohortes.      |
| Reportes      | KPIs coinciden con datos.              |
| Deploy        | Vercel estable y variables correctas.  |

---

## 27.7 Archivos de documentación que debe generar

Codex debe mantener:

```text
README.md
docs/ARCHITECTURE.md
docs/DATABASE_MODEL.md
docs/RBAC.md
docs/ENVIRONMENT.md
docs/IMPLEMENTATION_PHASES.md
docs/TESTING_CHECKLIST.md
docs/DEPLOYMENT.md
```

---

# 28. Supuestos técnicos y puntos por confirmar

## 28.1 Supuestos técnicos

* Supabase Auth será el proveedor principal de autenticación.
* `profiles` será la tabla funcional del usuario.
* Drizzle ORM será usado para acceso estructurado a PostgreSQL.
* Supabase Storage se usará para recursos y entregables.
* Qulqi se integrará para pagos reales.
* Resend o Brevo se usará para emails.
* PostHog será usado para eventos de producto.
* Sentry capturará errores.
* Vercel será hosting principal.
* Videos se manejarán inicialmente como externos embebidos.
* El primer curso gratuito estará desbloqueado por defecto.
* El desbloqueo de cursos se gestionará server-side.
* Instituciones/cohortes pueden quedar para fase posterior.

---

## 28.2 Puntos por confirmar

| Tema              | Pregunta pendiente                                                 |
| ----------------- | ------------------------------------------------------------------ |
| Videos            | ¿Se usarán YouTube no listado, Vimeo, Mux, Bunny o storage propio? |
| Mentorías         | ¿La agenda será propia o integrada con Calendly/Google Calendar?   |
| Pagos             | ¿Qulqi se implementa en MVP o primero pago simulado?               |
| Revisión gratuita | ¿El primer entregable incluye revisión gratuita o requiere pago?   |
| Desbloqueo        | ¿Siempre requiere asesoría pagada o solo en cursos específicos?    |
| Mentores          | ¿Quién asigna mentor: admin, alumno o automático?                  |
| Reenvíos          | ¿Cuántos reenvíos se permiten por entregable?                      |
| SLA               | ¿Tiempo máximo de revisión por mentor?                             |
| Instituciones     | ¿Entran en MVP o fase 3?                                           |
| Suscripciones     | ¿Habrá planes mensuales desde el inicio o después?                 |
| Certificados      | ¿Se emitirán certificados al aprobar cursos?                       |
| Promociones       | ¿Cupones simples o campañas avanzadas?                             |
| Reportes          | ¿Qué formatos se necesitan: PDF, Excel, CSV?                       |
| WhatsApp          | ¿Solo enlace externo o integración oficial?                        |
| Roles múltiples   | ¿Un usuario puede ser mentor y admin simultáneamente?              |

---

# 29. Checklist técnico final

| Categoría                      | Estado esperado |
| ------------------------------ | --------------- |
| Auth definido                  | Sí              |
| Registro con email definido    | Sí              |
| Registro con Google definido   | Sí              |
| Verificación de email definida | Sí              |
| Roles definidos                | Sí              |
| RBAC definido                  | Sí              |
| Middleware definido            | Sí              |
| Rutas protegidas definidas     | Sí              |
| Rutas públicas definidas       | Sí              |
| Rutas dashboard definidas      | Sí              |
| Base de datos definida         | Sí              |
| Tablas MVP definidas           | Sí              |
| Tablas futuras definidas       | Sí              |
| Relaciones definidas           | Sí              |
| RLS definida                   | Sí              |
| Storage definido               | Sí              |
| Buckets definidos              | Sí              |
| Videos definidos               | Sí              |
| Pagos Qulqi definidos          | Sí              |
| Webhook definido               | Sí              |
| Estados de pago definidos      | Sí              |
| Progreso definido              | Sí              |
| Desbloqueos definidos          | Sí              |
| Entregables definidos          | Sí              |
| Evaluaciones definidas         | Sí              |
| Feedback definido              | Sí              |
| Mentorías definidas            | Sí              |
| Dashboards definidos           | Sí              |
| Analítica definida             | Sí              |
| Eventos PostHog definidos      | Sí              |
| Sentry definido                | Sí              |
| Emails definidos               | Sí              |
| Notificaciones definidas       | Sí              |
| UI técnica definida            | Sí              |
| Componentes definidos          | Sí              |
| Server Actions definidas       | Sí              |
| Services definidos             | Sí              |
| Validaciones Zod definidas     | Sí              |
| Variables de entorno definidas | Sí              |
| Fases definidas                | Sí              |
| Guía para Codex definida       | Sí              |
| MVP delimitado                 | Sí              |

---

# 30. Resumen final de arquitectura

SUClassroom debe construirse como una plataforma SaaS modular con **Next.js App Router**, **Supabase**, **Drizzle ORM**, **RBAC**, **RLS**, **Server Actions**, **Storage privado**, **Qulqi**, **emails transaccionales**, **dashboards por rol**, **analítica de eventos** y **observabilidad**.

El núcleo técnico no debe ser “cursos y videos”, sino:

```text
usuarios + roles
  ↓
cursos progresivos
  ↓
proyectos reales
  ↓
entregables
  ↓
evaluación de mentor
  ↓
feedback
  ↓
aprobación/rechazo
  ↓
progreso y desbloqueo
  ↓
asesoría/pago
  ↓
impacto medible
```

La implementación debe avanzar por fases, validando primero el flujo central del producto antes de construir funcionalidades comerciales avanzadas.
