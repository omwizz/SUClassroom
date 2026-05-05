Actúa como Senior Full Stack Engineer y especialista en Next.js App Router, Supabase Storage, Drizzle ORM, Server Actions, Zod y flujos de carga segura de archivos.

Vas a continuar SUClassroom.

Lee primero:

1. 01_PRD_SUClassroom.md
2. 02_Arquitectura_Tecnica_Estructura_Fases_SUClassroom.md
3. docs/ARCHITECTURE.md
4. docs/PHASES.md
5. docs/PROJECTS_ONBOARDING.md
6. docs/COURSES.md

OBJETIVO:

Implementar únicamente:

FASE 5: Entregables del alumno, carga de archivos, links y reenvíos.

CONTEXTO:

En SUClassroom, un curso no se completa solo viendo videos. El alumno debe aplicar lo aprendido en su proyecto y enviar entregables estructurados. Esta fase conecta cursos + proyecto del alumno + entregables, pero todavía no implementa evaluación formal ni feedback avanzado.

NO IMPLEMENTES TODAVÍA:

- Evaluación por mentor.
- Aprobación/rechazo formal.
- Feedback estructurado avanzado.
- Pagos.
- Qulqi.
- Mentorías.
- Desbloqueos avanzados.
- Reportes.
- Instituciones/cohortes.
- IA.

ALCANCE:

1. Crear entregables asociados a proyecto, curso y alumno.
2. Permitir borrador.
3. Permitir envío.
4. Permitir adjuntar archivos y links.
5. Permitir reenvío básico si el estado lo permite.
6. Historial de versiones.
7. Vista del alumno.
8. Vista administrativa básica.
9. Preparar para revisión del mentor en Fase 6.

MODELO DE DATOS:

Implementa o ajusta:

deliverables:
- id
- project_id
- course_id
- student_id
- title
- description
- instructions_snapshot
- status
- version
- submitted_at
- last_resubmitted_at
- created_at
- updated_at

deliverable_files:
- id
- deliverable_id
- uploaded_by
- file_name
- file_path
- file_url
- mime_type
- size_bytes
- created_at

deliverable_links:
- id
- deliverable_id
- title
- url
- description
- created_at

deliverable_versions:
- id
- deliverable_id
- version
- title
- description
- status
- snapshot
- created_at

course_deliverable_requirements, si no existe:
- id
- course_id
- title
- description
- instructions
- required_file_types
- max_files
- is_required
- created_at
- updated_at

ENUMS:

DeliverableStatus:
- draft
- submitted
- under_review
- changes_requested
- rejected
- approved
- resubmitted

ResourceFileType:
- pdf
- doc
- docx
- ppt
- pptx
- xls
- xlsx
- image
- link
- other

REGLAS:

- Student solo puede crear entregables para su propio proyecto.
- Student puede guardar como borrador.
- Student puede enviar entregable.
- Al enviar, status = submitted.
- Si ya existe enviado, debe crear nueva versión o reenviar según estado.
- No se puede editar libremente un entregable under_review.
- Admin puede ver todos los entregables.
- Mentor aún no evalúa formalmente en esta fase.
- Archivos deben ir a Supabase Storage o quedar preparado el flujo si Storage no está configurado.
- No exponer rutas privadas sin control.
- Validar tamaño y tipo de archivo.
- Mantener signed URLs si se usa bucket privado.

STORAGE:

Configura bucket conceptual:

deliverables

Estructura sugerida:

deliverables/{studentId}/{projectId}/{deliverableId}/{fileName}

Permitir:
- PDF.
- DOC/DOCX.
- PPT/PPTX.
- XLS/XLSX.
- Imágenes.
- Links externos.

Límites sugeridos:
- Máximo 5 archivos por entregable.
- Máximo 10 MB por archivo.
- Validar MIME type.
- Validar extensión.

VALIDACIONES ZOD:

Crear:

deliverableSchema:
- project_id requerido.
- course_id requerido.
- title requerido.
- description requerido.
- links opcional.

deliverableFileSchema:
- file_name requerido.
- mime_type requerido.
- size_bytes número positivo.
- file_path requerido.

deliverableLinkSchema:
- title requerido.
- url válida.
- description opcional.

submitDeliverableSchema:
- deliverable_id requerido.
- confirm boolean requerido.

SERVER ACTIONS / SERVICES:

- createDeliverableDraft
- updateDeliverableDraft
- submitDeliverable
- resubmitDeliverable
- addDeliverableFile
- removeDeliverableFile
- addDeliverableLink
- removeDeliverableLink
- getStudentDeliverables
- getDeliverableById
- getAdminDeliverables
- getDeliverablesByCourse
- createDeliverableRequirement
- updateDeliverableRequirement

Services:
- DeliverableService
- DeliverableVersionService
- StorageService

QUERIES:

- getDeliverableWithFiles
- getStudentCourseDeliverable
- getProjectDeliverables
- getPendingDeliverablesForAdmin

RUTAS:

Student:
- /dashboard/student/deliverables
- /dashboard/student/deliverables/new
- /dashboard/student/deliverables/[deliverableId]
- /dashboard/student/deliverables/[deliverableId]/edit

Admin:
- /dashboard/admin/deliverables
- /dashboard/admin/deliverables/[deliverableId]

Course:
- En detalle de curso, agregar CTA “Preparar entregable” si aplica.

UI / COMPONENTES:

Crear:

- DeliverableForm
- DeliverableDraftEditor
- DeliverableSubmitButton
- DeliverableStatusBadge
- DeliverableFileUploader
- DeliverableFileList
- DeliverableLinkForm
- DeliverableLinkList
- DeliverableVersionTimeline
- StudentDeliverablesTable
- AdminDeliverablesTable
- DeliverableDetailView
- DeliverableRequirementCard
- SubmitConfirmationDialog

DASHBOARD STUDENT:

Actualizar:
- Mostrar entregables pendientes.
- Mostrar último entregable enviado.
- Mostrar estado.
- CTA: Crear/continuar entregable.

DASHBOARD ADMIN:

Actualizar:
- Métrica de entregables enviados.
- Tabla de entregables recientes.

REQUISITOS FUNCIONALES:

RF-DEL-001: Student crea borrador.
RF-DEL-002: Student edita borrador.
RF-DEL-003: Student adjunta archivos.
RF-DEL-004: Student agrega links.
RF-DEL-005: Student envía entregable.
RF-DEL-006: Sistema crea versión.
RF-DEL-007: Student ve historial.
RF-DEL-008: Admin ve entregables.
RF-DEL-009: No se edita entregable under_review.
RF-DEL-010: Sistema valida archivos.
RF-DEL-011: Sistema impide acceso a entregables ajenos.
RF-DEL-012: Entregables quedan listos para evaluación futura.

CRITERIOS DE ACEPTACIÓN:

- Entregables funcionan.
- Archivos o flujo de storage preparado.
- Links funcionan.
- Estados funcionan.
- Versiones se registran.
- Student solo accede a lo suyo.
- Admin ve todos.
- UI responsive.
- TypeScript sin errores.
- Build exitoso.
- Documentación actualizada.

DOCUMENTACIÓN:

Actualizar:
- README.md
- docs/ARCHITECTURE.md
- docs/PHASES.md

Crear:
- docs/DELIVERABLES.md
- docs/STORAGE.md, si aplica

RESUMEN FINAL:

Al terminar, responde:

1. Qué implementaste.
2. Archivos creados.
3. Archivos modificados.
4. Tablas nuevas.
5. Buckets/configuración storage.
6. Rutas nuevas.
7. Componentes nuevos.
8. Server Actions/services creados.
9. Cómo probar.
10. Comandos ejecutados.
11. Errores encontrados.
12. Qué queda pendiente para Fase 6.

Empieza únicamente con Fase 5.