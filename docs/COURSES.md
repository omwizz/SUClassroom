# Cursos

Este documento resume la Fase 3 de SUClassroom: cursos, categorías, módulos, lecciones y recursos.

## Modelo

- `course_categories`: nombre, slug, descripción, color, icono y estado activo.
- `courses`: categoría, título, slug, objetivo, resultado esperado, público objetivo, nivel, estado, duración, gratuidad, orden y fecha de publicación.
- `course_modules`: módulos ordenados dentro de un curso.
- `lessons`: lecciones ordenadas dentro de un módulo, con tipo, contenido, video, preview y obligatoriedad.
- `lesson_resources`: recursos asociados a una lección, con tipo, URL y descarga.

## Estados

- `draft`: visible solo para administración.
- `published`: visible en catálogo público y vistas de alumno.
- `archived`: conservado para administración, fuera del catálogo publicado.

## Permisos

- `admin`: administra categorías, cursos, módulos, lecciones, recursos, publicación y archivo.
- `student`: ve cursos publicados, detalle, lecciones y recursos.
- `mentor` e `institution`: pueden consultar cursos publicados como referencia desde rutas públicas; no mutan contenido en esta fase.

## Rutas

- Público:
  - `/courses`
  - `/courses/[courseSlug]`
  - `/courses/[courseSlug]/lessons/[lessonSlug]`
- Alumno:
  - `/dashboard/student/courses`
  - `/dashboard/student/courses/[courseSlug]`
- Admin:
  - `/dashboard/admin/courses`
  - `/dashboard/admin/courses/new`
  - `/dashboard/admin/courses/[courseId]/edit`
  - `/dashboard/admin/courses/[courseId]/builder`
  - `/dashboard/admin/categories`

## Datos demo

Sin `DATABASE_URL`, las lecturas usan `src/features/courses/data/demo-courses.ts`.

El seed SQL vive en `src/db/seed/courses.sql` e incluye:

- Categorías base: validación de ideas, modelo de negocio, marketing y ventas, finanzas básicas, operaciones y programas sociales.
- Curso demo gratuito publicado: `De la idea a la validación inicial`.
- Módulos iniciales: diagnóstico de la idea, problema y cliente objetivo, propuesta de valor y primer entregable de validación.

## Límites

La Fase 3 no registra progreso, entregables, revisión de mentor, pagos, cohortes, certificados ni desbloqueos avanzados. La estructura queda lista para conectar esos flujos en fases posteriores.

