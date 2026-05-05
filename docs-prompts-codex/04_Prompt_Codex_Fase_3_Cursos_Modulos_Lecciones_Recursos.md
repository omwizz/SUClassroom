Actúa como Senior Full Stack Engineer, Tech Lead y especialista en Next.js App Router, TypeScript, Supabase, Drizzle ORM, Tailwind CSS, shadcn/ui y Zod.

Vas a continuar el proyecto SUClassroom.

Antes de implementar, lee:

1. 01_PRD_SUClassroom.md
2. 02_Arquitectura_Tecnica_Estructura_Fases_SUClassroom.md
3. docs/PHASES.md
4. docs/ARCHITECTURE.md

OBJETIVO:

Implementar únicamente:

FASE 3: Cursos, módulos, lecciones y recursos.

NO IMPLEMENTES TODAVÍA:

- Proyectos del alumno.
- Entregables.
- Evaluaciones.
- Feedback.
- Mentorías.
- Pagos.
- Qulqi.
- Desbloqueos avanzados.
- Instituciones/cohortes.
- Reportes avanzados.
- Certificados.
- IA.
- Comunidad.

CONTEXTO:

SUClassroom no es una plataforma común de cursos. Cada curso debe estar diseñado como una ruta de ejecución. En esta fase solo se construye la base funcional de cursos, módulos, lecciones y recursos, dejando preparada la conexión futura con proyectos, entregables y evaluación.

ROLES Y PERMISOS:

admin:
- Crear cursos.
- Editar cursos.
- Publicar/despublicar cursos.
- Archivar cursos.
- Crear categorías.
- Crear módulos.
- Crear lecciones.
- Agregar recursos.
- Ordenar módulos y lecciones.

student:
- Ver cursos publicados.
- Ver detalle de curso publicado.
- Ver módulos y lecciones publicadas.
- Ver recursos disponibles.

mentor:
- Ver cursos publicados como referencia.
- No crear cursos en esta fase.

institution:
- Ver cursos publicados como referencia.
- No asignar cursos todavía.

MODELO DE DATOS:

Implementa con Drizzle:

course_categories:
- id
- name
- slug
- description
- color
- icon
- is_active
- created_at
- updated_at

courses:
- id
- category_id
- title
- slug
- subtitle
- description
- objective
- expected_result
- target_audience
- level
- status
- thumbnail_url
- estimated_duration_minutes
- is_free
- sort_order
- created_by
- created_at
- updated_at
- published_at

course_modules:
- id
- course_id
- title
- description
- sort_order
- is_required
- created_at
- updated_at

lessons:
- id
- module_id
- title
- slug
- description
- content
- video_url
- video_provider
- estimated_duration_minutes
- lesson_type
- sort_order
- is_preview
- is_required
- created_at
- updated_at

lesson_resources:
- id
- lesson_id
- title
- description
- resource_type
- file_url
- external_url
- sort_order
- is_downloadable
- created_at
- updated_at

course_resources, opcional:
- id
- course_id
- title
- description
- resource_type
- file_url
- external_url
- sort_order
- is_downloadable
- created_at
- updated_at

ENUMS / CONSTANTES:

CourseStatus:
- draft
- published
- archived

CourseLevel:
- beginner
- intermediate
- advanced

LessonType:
- video
- text
- mixed
- assignment_intro

VideoProvider:
- youtube
- vimeo
- external
- storage
- none

ResourceType:
- pdf
- document
- spreadsheet
- presentation
- template
- link
- image
- other

VALIDACIONES ZOD:

Crear:

- courseCategorySchema
- courseSchema
- courseModuleSchema
- lessonSchema
- lessonResourceSchema

SERVER ACTIONS / SERVICES:

Categorías:
- createCourseCategory
- updateCourseCategory
- getCourseCategories
- deactivateCourseCategory

Cursos:
- createCourse
- updateCourse
- publishCourse
- unpublishCourse
- archiveCourse
- getAdminCourses
- getPublishedCourses
- getCourseBySlug
- getCourseById

Módulos:
- createCourseModule
- updateCourseModule
- deleteCourseModule
- reorderCourseModules
- getModulesByCourse

Lecciones:
- createLesson
- updateLesson
- deleteLesson
- reorderLessons
- getLessonBySlug
- getLessonsByModule

Recursos:
- createLessonResource
- updateLessonResource
- deleteLessonResource
- getResourcesByLesson

Cada acción debe:
- Validar con Zod.
- Verificar sesión.
- Verificar rol.
- Verificar permisos.
- Usar services/queries.
- Retornar errores claros.

RUTAS:

Públicas/autenticadas:
- /courses
- /courses/[courseSlug]
- /courses/[courseSlug]/lessons/[lessonSlug]

Dashboard alumno:
- /dashboard/student/courses
- /dashboard/student/courses/[courseSlug]

Dashboard admin:
- /dashboard/admin/courses
- /dashboard/admin/courses/new
- /dashboard/admin/courses/[courseId]/edit
- /dashboard/admin/courses/[courseId]/builder
- /dashboard/admin/categories

UI / COMPONENTES:

Crear o completar:

- CourseCard
- CourseGrid
- CourseFilters
- CourseLevelBadge
- CourseStatusBadge
- CourseHeader
- CourseDetail
- CourseModuleAccordion
- LessonItem
- LessonViewer
- LessonResourceList
- ResourceBadge
- AdminCourseTable
- CourseForm
- CourseCategoryForm
- CourseModuleForm
- LessonForm
- LessonResourceForm
- CourseBuilder
- ModuleBuilderItem
- LessonBuilderItem
- CoursePublishActions
- ConfirmDialog
- FormError
- FormSuccess
- EmptyState
- LoadingState
- PageHeader
- SectionCard

REQUISITOS:

RF-CUR-001: Admin puede crear categoría.
RF-CUR-002: Admin puede editar categoría.
RF-CUR-003: Admin puede activar/desactivar categoría.
RF-CUR-004: Admin puede crear curso.
RF-CUR-005: Admin puede editar curso.
RF-CUR-006: Admin puede publicar/despublicar/archivar curso.
RF-CUR-007: Admin puede crear módulos.
RF-CUR-008: Admin puede editar módulos.
RF-CUR-009: Admin puede crear lecciones.
RF-CUR-010: Admin puede editar lecciones.
RF-CUR-011: Admin puede agregar recursos.
RF-CUR-012: Alumno puede ver cursos publicados.
RF-CUR-013: Alumno puede ver detalle.
RF-CUR-014: Alumno puede ver módulos/lecciones.
RF-CUR-015: Alumno puede abrir lección.
RF-CUR-016: Alumno puede ver recursos.
RF-CUR-017: Cursos draft no se muestran a alumnos.
RF-CUR-018: No admin no puede editar cursos.
RF-CUR-019: Formularios validados.
RF-CUR-020: Preparado para proyectos y entregables futuros.

SEED OPCIONAL:

Crear seed demo claro:

Categorías:
- Validación de ideas
- Modelo de negocio
- Marketing y ventas
- Finanzas básicas
- Operaciones
- Programas sociales

Curso demo:
- De la idea a la validación inicial
- Nivel: beginner
- Gratuito: true
- Estado: published

Módulos:
1. Diagnóstico de la idea
2. Problema y cliente objetivo
3. Propuesta de valor
4. Primer entregable de validación

DOCUMENTACIÓN:

Actualizar:
- README.md
- docs/ARCHITECTURE.md
- docs/PHASES.md

Crear si conviene:
- docs/COURSES.md

CRITERIOS DE ACEPTACIÓN:

- Tablas creadas.
- Relaciones correctas.
- Admin gestiona cursos.
- Student ve cursos publicados.
- Drafts no son visibles para student.
- Formularios funcionan.
- Validaciones funcionan.
- Rutas protegidas.
- UI responsive.
- TypeScript sin errores.
- Build exitoso.

RESUMEN FINAL:

Al terminar, responde:

1. Qué implementaste.
2. Archivos creados.
3. Archivos modificados.
4. Tablas nuevas.
5. Rutas nuevas.
6. Componentes nuevos.
7. Server Actions/services creados.
8. Validaciones creadas.
9. Cómo probar manualmente.
10. Comandos ejecutados.
11. Errores y soluciones.
12. Qué queda pendiente para Fase 4.

Empieza únicamente con Fase 3.