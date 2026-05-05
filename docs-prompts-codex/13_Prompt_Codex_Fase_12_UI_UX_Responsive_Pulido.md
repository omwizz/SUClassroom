Actúa como Senior Frontend Engineer, UX Engineer y especialista en diseño SaaS moderno con Next.js, Tailwind CSS, shadcn/ui, accesibilidad, responsive design y dashboards profesionales.

Vas a continuar SUClassroom.

Lee primero:

1. 01_PRD_SUClassroom.md
2. 02_Arquitectura_Tecnica_Estructura_Fases_SUClassroom.md
3. docs/ARCHITECTURE.md
4. docs/PHASES.md
5. docs/ANALYTICS_REPORTS.md
6. docs/NOTIFICATIONS_EMAILS.md

OBJETIVO:

Implementar únicamente:

FASE 12: Pulido UI/UX, responsive, accesibilidad, estados visuales y consistencia de diseño.

CONTEXTO:

SUClassroom debe sentirse como una plataforma moderna, clara y orientada a acción. El alumno debe percibir avance. El mentor debe trabajar rápido. El admin debe tener control. La institución debe visualizar impacto.

NO IMPLEMENTES NUEVAS FEATURES DE NEGOCIO.

No agregues:
- IA.
- Pagos nuevos.
- Nuevos módulos funcionales.
- Nuevas entidades complejas.
- Chat.
- Certificados.
- Comunidad.

ALCANCE:

1. Revisar UI global.
2. Mejorar responsive.
3. Mejorar accesibilidad.
4. Estandarizar componentes.
5. Mejorar estados vacíos.
6. Mejorar loading states.
7. Mejorar error states.
8. Mejorar formularios.
9. Mejorar dashboards.
10. Mejorar landing.
11. Mejorar navegación mobile.
12. Mejorar consistencia visual por rol.
13. Optimizar experiencia sin cambiar reglas de negocio.

DIRECCIÓN VISUAL:

Landing:
- Clara.
- Moderna.
- Educativa.
- Confiable.
- CTA fuerte.

Alumno:
- Tema claro o híbrido.
- Motivador.
- Enfoque en progreso.
- Acciones claras.

Mentor:
- Productivo.
- Ordenado.
- Priorización de entregables.

Admin:
- Dashboard profesional.
- Puede usar modo oscuro/híbrido.
- Métricas claras.
- Tablas limpias.

Institución:
- Corporativo.
- Métricas e impacto.
- Reportes visibles.

TAREAS:

1. Revisar layout público:
- Header responsive.
- Hero claro.
- Sección cómo funciona.
- Sección beneficios.
- CTA final.
- Footer.
- SEO metadata básico.

2. Revisar dashboard shell:
- Sidebar desktop.
- Mobile drawer.
- Topbar.
- Breadcrumbs o page headers.
- User menu.
- Notificaciones.
- Consistencia de spacing.

3. Mejorar componentes:
- Button variants.
- Cards.
- Badges.
- Tables.
- Dialogs.
- Forms.
- EmptyState.
- LoadingState.
- ErrorState.
- SuccessState.
- LockedState.
- Progress components.

4. Mejorar responsive:
- Mobile first.
- Sidebar colapsable.
- Cards en grid responsive.
- Tablas con scroll horizontal.
- Formularios adaptados.
- Modales adaptados.
- Dashboards legibles en mobile.

5. Accesibilidad:
- Labels en inputs.
- aria-label donde corresponda.
- Contraste suficiente.
- Focus states visibles.
- Navegación por teclado razonable.
- Mensajes de error claros.
- Evitar solo color para estados.

6. UX copy:
- Microcopy claro.
- Mensajes de éxito.
- Mensajes de error.
- Mensajes de bloqueo.
- Mensajes de próximo paso.
- Mensajes de entregables rechazados.
- Mensajes de curso desbloqueado.

7. Estados obligatorios:
- Loading.
- Empty.
- Error.
- Success.
- Locked.
- Pending.
- Approved.
- Rejected.
- Changes requested.

8. Formularios:
- Validaciones visibles.
- Agrupación por secciones.
- Botones claros.
- Confirm dialogs para acciones críticas.
- Cancel/save consistentes.

9. Dashboards:
Student:
- Progreso destacado.
- Próximo paso.
- Cursos y entregables.

Mentor:
- Pendientes destacados.
- Agenda.
- Feedback.

Admin:
- KPIs.
- Actividad.
- Tablas.
- Filtros.

Institution:
- Cohortes.
- Avance.
- Impacto.

10. Performance UI:
- Evitar re-render innecesario.
- Usar skeletons.
- Optimizar imports.
- Revisar imágenes.
- Metadata básica.

COMPONENTES A REVISAR / CREAR:

- AppLogo
- PublicHeader
- PublicFooter
- DashboardShell
- DashboardSidebar
- MobileSidebar
- DashboardTopbar
- PageHeader
- SectionHeader
- EmptyState
- LoadingState
- ErrorState
- SuccessState
- LockedState
- StatusBadge
- RoleBadge
- MetricCard
- ActionCard
- ProgressCard
- ResponsiveTableWrapper
- ConfirmDialog
- FormSection
- FormActions
- Breadcrumbs

CRITERIOS DE ACEPTACIÓN:

- Landing responsive.
- Dashboards responsive.
- Sidebar mobile funciona.
- Tablas no rompen layout.
- Estados UI consistentes.
- Formularios claros.
- Accesibilidad básica mejorada.
- No se rompen funcionalidades existentes.
- TypeScript sin errores.
- Lint sin errores críticos.
- Build exitoso.
- Documentación actualizada.

DOCUMENTACIÓN:

Actualizar:
- README.md
- docs/ARCHITECTURE.md
- docs/PHASES.md

Crear o actualizar:
- docs/UI_UX_GUIDE.md

RESUMEN FINAL:

Al terminar, responde:

1. Qué mejoraste.
2. Archivos creados.
3. Archivos modificados.
4. Componentes nuevos.
5. Componentes refactorizados.
6. Cambios responsive.
7. Cambios accesibilidad.
8. Cómo probar manualmente.
9. Comandos ejecutados.
10. Errores.
11. Qué queda pendiente para Fase 13.

Empieza únicamente con Fase 12.