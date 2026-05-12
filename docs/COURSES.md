# Cursos

Este documento resume el dominio de cursos de SUClassroom y su conexion actual con progreso.

## Modelo

- `course_categories`: nombre, slug, descripcion, color, icono y estado activo.
- `courses`: categoria, titulo, slug, objetivo, resultado esperado, publico objetivo, nivel, estado, duracion, gratuidad, orden y fecha de publicacion.
- `course_modules`: modulos ordenados dentro de un curso.
- `lessons`: lecciones ordenadas dentro de un modulo, con tipo, contenido, video, preview y obligatoriedad.
- `lesson_resources`: recursos asociados a una leccion, con tipo, URL y descarga.

## Estados

- `draft`: visible solo para administracion.
- `published`: visible en catalogo publico y vistas de alumno.
- `archived`: conservado para administracion, fuera del catalogo publicado.

## Permisos

- `admin`: administra categorias, cursos, modulos, lecciones, recursos, publicacion y archivo.
- `student`: ve cursos publicados, estado de acceso, detalle, lecciones y recursos.
- `mentor` e `institution`: pueden consultar cursos publicados como referencia desde rutas publicas; no mutan contenido en esta fase.

## Rutas

Publico:

- `/courses`
- `/courses/[courseSlug]`
- `/courses/[courseSlug]/lessons/[lessonSlug]`

Alumno:

- `/dashboard/student/courses`
- `/dashboard/student/courses/[courseSlug]`
- `/dashboard/student/progress`

Admin:

- `/dashboard/admin/courses`
- `/dashboard/admin/courses/new`
- `/dashboard/admin/courses/[courseId]/edit`
- `/dashboard/admin/courses/[courseId]/builder`
- `/dashboard/admin/categories`
- `/dashboard/admin/course-unlock-rules`
- `/dashboard/admin/users/[userId]/progress`

## Datos demo

Sin `DATABASE_URL`, las lecturas usan `src/features/courses/data/demo-courses.ts`.

El seed SQL vive en `src/db/seed/courses.sql` e incluye:

- Categorias base: validacion de ideas, modelo de negocio, marketing y ventas, finanzas basicas, operaciones y programas sociales.
- Curso demo gratuito publicado: `De la idea a la validacion inicial`.
- Modulos iniciales: diagnostico de la idea, problema y cliente objetivo, propuesta de valor y primer entregable de validacion.

## Integracion con progreso

La Fase 7 agrega estado de acceso y avance sobre los cursos publicados:

- El primer curso gratuito queda disponible para el alumno.
- Un curso bloqueado no se puede iniciar desde el dashboard student.
- Las lecciones pueden marcarse como completadas.
- Las lecciones suman porcentaje, pero el curso se completa cuando el entregable requerido es aprobado.
- Las reglas de desbloqueo se administran en `/dashboard/admin/course-unlock-rules`.
- El progreso individual se revisa en `/dashboard/admin/users/[userId]/progress`.

## Limites

El modulo de cursos no implementa pagos, cohortes, certificados ni desbloqueos avanzados. La Fase 7 conecta progreso basico y reglas de avance; pagos, mentorias completas y reportes avanzados quedan para fases posteriores.
