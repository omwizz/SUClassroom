Actúa como Senior Full Stack Engineer especializado en integraciones de pagos, Qulqi, webhooks seguros, Server Actions, Route Handlers, Supabase, Drizzle ORM, auditoría y seguridad.

Vas a continuar SUClassroom.

Lee primero:

1. 01_PRD_SUClassroom.md
2. 02_Arquitectura_Tecnica_Estructura_Fases_SUClassroom.md
3. docs/ARCHITECTURE.md
4. docs/PHASES.md
5. docs/MENTORSHIPS.md
6. docs/PROGRESS_UNLOCKS.md

OBJETIVO:

Implementar únicamente:

FASE 9: Pagos con Qulqi, promociones y desbloqueo asociado a pago.

CONTEXTO:

En SUClassroom, los cursos pueden ser gratuitos, pero la monetización principal viene por asesorías, revisión + asesoría, validación de proyectos y posiblemente suscripciones futuras. En esta fase implementa pagos para asesorías/revisión usando Qulqi.

NO IMPLEMENTES TODAVÍA:

- Suscripciones complejas.
- Facturación avanzada.
- Instituciones con licencias completas.
- Marketplace abierto.
- IA.
- Certificados.
- Reportes financieros avanzados.

ALCANCE:

1. Configurar variables de entorno Qulqi.
2. Crear flujo de pago para mentoría/asesoría.
3. Crear payments.
4. Confirmación de pago.
5. Webhook seguro de Qulqi.
6. Estados de pago.
7. Historial de pagos.
8. Promociones/cupones básicos.
9. Asociar pago a mentorship_session.
10. Actualizar payment_status de sesión.
11. Preparar desbloqueo por pago.
12. Auditoría.

VARIABLES DE ENTORNO:

Agregar a .env.example:

QULQI_PUBLIC_KEY=
QULQI_PRIVATE_KEY=
QULQI_WEBHOOK_SECRET=
NEXT_PUBLIC_QULQI_PUBLIC_KEY=

Nunca exponer private key en frontend.

MODELO DE DATOS:

Implementa o ajusta:

payments:
- id
- payer_id
- mentorship_session_id
- deliverable_id
- course_id
- amount
- discount_amount
- final_amount
- currency
- provider
- provider_payment_id
- provider_charge_id
- status
- paid_at
- failed_reason
- metadata
- created_at
- updated_at

payment_events:
- id
- payment_id
- provider
- event_type
- payload
- processed_at
- created_at

promotions:
- id
- code
- name
- description
- discount_type
- discount_value
- max_uses
- used_count
- starts_at
- ends_at
- is_active
- created_at
- updated_at

promotion_redemptions:
- id
- promotion_id
- user_id
- payment_id
- redeemed_at

ENUMS:

PaymentStatus:
- pending
- processing
- paid
- failed
- refunded
- cancelled

PaymentProvider:
- qulqi
- manual
- simulated

DiscountType:
- percentage
- fixed_amount

REGLAS:

- Solo student paga sus propias asesorías.
- Admin puede ver todos los pagos.
- Mentor no gestiona pagos.
- Pago se asocia a mentorship_session.
- Si pago es paid:
  - mentorship_session.payment_status = paid
  - mentorship_session.status puede pasar a confirmed o scheduled según flujo.
- Si pago falla:
  - payment.status = failed
  - mostrar mensaje claro.
- Webhook debe validar firma/secreto.
- Webhook debe ser idempotente.
- Nunca confiar solo en frontend para confirmar pago.
- Registrar payment_events.
- Registrar audit_logs en acciones críticas.
- Promoción válida debe aplicarse antes del pago.
- No permitir reutilizar cupón si supera límite.
- No permitir descuento inválido.

VALIDACIONES ZOD:

Crear:

createPaymentSchema
confirmPaymentSchema
paymentWebhookSchema
promotionSchema
applyPromotionSchema

SERVER ACTIONS / ROUTE HANDLERS:

Server Actions:
- createPaymentForMentorship
- applyPromotionToPayment
- getStudentPayments
- getAdminPayments
- cancelPendingPayment
- createPromotion
- updatePromotion
- deactivatePromotion

Route Handlers:
- POST /api/webhooks/qulqi
- GET /api/payments/[paymentId]/status, si es necesario

Services:
- PaymentService
- QulqiService
- PromotionService
- PaymentWebhookService
- PaymentAuditService

RUTAS:

Student:
- /dashboard/student/payments
- /dashboard/student/payments/[paymentId]
- /dashboard/student/mentorship/[sessionId]/payment

Admin:
- /dashboard/admin/payments
- /dashboard/admin/payments/[paymentId]
- /dashboard/admin/promotions

UI / COMPONENTES:

Crear:

- PaymentCheckoutCard
- PaymentSummary
- PaymentStatusBadge
- PaymentHistoryTable
- PaymentDetailView
- PromotionCodeInput
- AdminPaymentsTable
- PromotionForm
- PromotionsTable
- PaymentErrorState
- PaymentSuccessState

DASHBOARDS:

Student:
- Historial de pagos.
- Estado de pago.
- CTA pagar asesoría pendiente.

Admin:
- Pagos recientes.
- Ingresos básicos.
- Pagos fallidos.
- Promociones activas.

REQUISITOS FUNCIONALES:

RF-PAY-001: Student inicia pago de asesoría.
RF-PAY-002: Sistema crea payment pending.
RF-PAY-003: Sistema integra Qulqi.
RF-PAY-004: Webhook confirma pago.
RF-PAY-005: Pago paid actualiza sesión.
RF-PAY-006: Pago failed muestra error.
RF-PAY-007: Admin ve pagos.
RF-PAY-008: Student ve historial.
RF-PAY-009: Admin crea promociones.
RF-PAY-010: Student aplica cupón.
RF-PAY-011: Sistema audita pagos.
RF-PAY-012: Webhook idempotente.

CRITERIOS DE ACEPTACIÓN:

- Variables Qulqi documentadas.
- Payment pending se crea.
- Checkout funciona o queda integrado según SDK/API disponible.
- Webhook implementado.
- Estados funcionan.
- Promociones funcionan.
- Historial visible.
- Sesión se actualiza al pago.
- No se exponen claves privadas.
- TypeScript sin errores.
- Build exitoso.
- Documentación actualizada.

DOCUMENTACIÓN:

Actualizar:
- README.md
- docs/ARCHITECTURE.md
- docs/PHASES.md
- docs/MENTORSHIPS.md

Crear:
- docs/PAYMENTS_QULQI.md
- docs/PROMOTIONS.md

RESUMEN FINAL:

Al terminar, responde:

1. Qué implementaste.
2. Archivos creados.
3. Archivos modificados.
4. Tablas nuevas.
5. Rutas/API nuevas.
6. Variables nuevas.
7. Componentes nuevos.
8. Services/actions creados.
9. Cómo probar en local.
10. Consideraciones de seguridad.
11. Comandos ejecutados.
12. Errores.
13. Qué queda pendiente para Fase 10.

Empieza únicamente con Fase 9.