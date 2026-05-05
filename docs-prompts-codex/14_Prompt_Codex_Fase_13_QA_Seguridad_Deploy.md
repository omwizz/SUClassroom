Actúa como Senior Full Stack Engineer, Security Engineer, QA Engineer y DevOps Engineer especializado en Next.js, Supabase, Drizzle ORM, Vercel, Sentry, PostHog, seguridad web, auditoría y despliegue de SaaS.

Vas a continuar SUClassroom.

Lee primero:

1. 01_PRD_SUClassroom.md
2. 02_Arquitectura_Tecnica_Estructura_Fases_SUClassroom.md
3. docs/ARCHITECTURE.md
4. docs/PHASES.md
5. Todos los documentos técnicos creados en docs/

OBJETIVO:

Implementar únicamente:

FASE 13: QA final, seguridad, hardening, observabilidad y preparación para deploy.

CONTEXTO:

SUClassroom ya debe tener las fases principales implementadas. Esta fase no busca agregar funcionalidades grandes, sino revisar, asegurar, probar, documentar y preparar el proyecto para despliegue.

NO IMPLEMENTES NUEVAS FEATURES GRANDES.

No agregues:
- IA.
- Comunidad.
- Nuevos módulos de negocio.
- Nuevas pasarelas.
- Nuevos dashboards grandes.
- Refactors riesgosos sin necesidad.

ALCANCE:

1. Revisión de seguridad.
2. RBAC.
3. Protección de rutas.
4. Protección de Server Actions.
5. Validaciones server-side.
6. Variables de entorno.
7. Supabase RLS documentado/preparado.
8. Storage seguro.
9. Webhooks seguros.
10. Manejo de errores.
11. Sentry.
12. PostHog.
13. Logs/auditoría.
14. QA manual.
15. Build.
16. Preparación para Vercel.
17. Documentación final.

CHECKLIST DE SEGURIDAD:

Auth:
- Rutas privadas protegidas.
- Rutas públicas correctas.
- Redirección por rol.
- Session handling correcto.
- No confiar en rol del cliente.

RBAC:
- Admin protegido.
- Mentor protegido.
- Student protegido.
- Institution protegido.
- Server Actions validan permisos.

Inputs:
- Todos los formularios importantes usan Zod.
- Validaciones server-side.
- Errores claros.
- Sanitización básica si aplica.

DB:
- Relaciones correctas.
- Índices mínimos.
- Constraints básicas.
- No duplicados críticos.
- Migrations ordenadas.

RLS:
- Documentar políticas necesarias.
- Si es posible, aplicar políticas básicas.
- Profiles: usuario ve propio.
- Courses: published visible.
- Deliverables: student propio, mentor asignado, admin todos.
- Payments: payer propio, admin todos.
- Institutions: miembros propios, admin todos.

Storage:
- Buckets privados cuando corresponda.
- No exponer archivos privados.
- Signed URLs si aplica.
- Validar tamaño.
- Validar tipo.

Payments:
- Qulqi private key no expuesta.
- Webhook protegido.
- Idempotencia.
- Logs de eventos.
- Payment status no se confirma desde frontend únicamente.

Variables:
- .env.example completo.
- No hay claves reales.
- No hay console logs sensibles.
- No hay service role en cliente.

OBSERVABILIDAD:

Sentry:
- Configurar si no está.
- Capturar errores críticos.
- No enviar datos sensibles.

PostHog:
- Configurar helper.
- Eventos básicos.
- No enviar datos sensibles.

Audit logs:
- Acciones críticas:
  - cambios de rol
  - aprobación/rechazo
  - pagos
  - desbloqueo manual
  - cambios admin

QA FUNCIONAL:

Probar flujos:

1. Registro student.
2. Login.
3. Onboarding.
4. Crear proyecto.
5. Ver curso.
6. Crear entregable.
7. Enviar entregable.
8. Mentor revisa.
9. Mentor aprueba/rechaza.
10. Student ve feedback.
11. Progreso se actualiza.
12. Curso se desbloquea.
13. Solicitar mentoría.
14. Pagar mentoría, si Qulqi está configurado.
15. Admin gestiona cursos.
16. Admin ve usuarios.
17. Institution ve cohortes.
18. Reportes básicos.
19. Notificaciones.

QA UI:

- Mobile.
- Desktop.
- Formularios.
- Empty states.
- Loading states.
- Error states.
- Tablas.
- Modales.
- Sidebar.
- Topbar.

DEPLOY VERCEL:

Preparar:

- next build.
- Variables necesarias.
- Configuración Vercel.
- Supabase URL/keys.
- Database URL.
- Qulqi keys.
- Sentry DSN.
- PostHog keys.
- App URL.
- Webhook URL de Qulqi.

DOCUMENTACIÓN FINAL:

Actualizar:

README.md:
- Descripción.
- Stack.
- Instalación.
- Variables.
- Scripts.
- Desarrollo local.
- Build.
- Deploy.

docs/SETUP.md:
- Setup completo.

docs/ARCHITECTURE.md:
- Arquitectura final.

docs/PHASES.md:
- Estado de fases.

Crear:

docs/QA_CHECKLIST.md
docs/SECURITY_CHECKLIST.md
docs/DEPLOYMENT.md
docs/ENVIRONMENT_VARIABLES.md
docs/KNOWN_LIMITATIONS.md

SCRIPTS:

Verificar o agregar scripts:

- dev
- build
- start
- lint
- typecheck
- db:generate
- db:migrate
- db:seed, si aplica

No rompas scripts existentes.

CRITERIOS DE ACEPTACIÓN:

- Build exitoso.
- TypeScript sin errores.
- Lint sin errores críticos.
- Rutas protegidas.
- Server Actions protegidas.
- Variables documentadas.
- No hay secrets expuestos.
- Storage revisado.
- Webhooks revisados.
- Sentry preparado.
- PostHog preparado.
- Documentación final completa.
- Proyecto listo para deploy en Vercel.

RESUMEN FINAL:

Al terminar, responde:

1. Qué revisaste.
2. Qué corregiste.
3. Archivos creados.
4. Archivos modificados.
5. Riesgos encontrados.
6. Riesgos pendientes.
7. Checklist de seguridad completado.
8. Resultado de lint.
9. Resultado de typecheck.
10. Resultado de build.
11. Variables necesarias para Vercel.
12. Pasos para deploy.
13. Limitaciones conocidas.
14. Recomendaciones finales antes de producción.

Empieza únicamente con Fase 13.