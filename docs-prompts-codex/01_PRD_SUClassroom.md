# PRD — SUClassroom

## Plataforma e-learning de ejecución guiada para emprendedores, líderes sociales, empresas, ONGs e instituciones

> Documento construido a partir del PDF de respuestas reales del formulario del cliente y de las referencias visuales/UI adjuntas. El PDF define SUClassroom como una plataforma que convierte conocimiento en ejecución empresarial mediante asesoría estratégica y validación de proyectos reales. 
> Las imágenes adjuntas se toman únicamente como referencia visual: dashboards oscuros tipo glassmorphism, paneles administrativos, tablas, modales, reportes, calendario, file manager, mensajes, gestión de usuarios y landing educativa moderna.   

---

# 1. Portada del PRD

| Campo                     | Información                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| **Nombre del producto**   | SUClassroom                                                                                       |
| **Tipo de producto**      | Plataforma SaaS e-learning orientada a ejecución, mentoría, entregables y validación de proyectos |
| **Versión del documento** | v1.0                                                                                              |
| **Fecha**                 | 05 de mayo de 2026                                                                                |
| **Preparado para**        | Cliente / Equipo SUClassroom / SUCooperative                                                      |
| **Preparado por**         | Equipo de Producto                                                                                |
| **Estado del documento**  | Borrador profesional para validación funcional                                                    |
| **Uso previsto**          | Documento maestro para posterior arquitectura técnica e implementación por fases con Codex        |
| **Idioma**                | Español                                                                                           |
| **Nivel de detalle**      | Extenso, funcional, accionable y orientado a desarrollo posterior                                 |

---

# 2. Resumen ejecutivo

## 2.1 Qué es SUClassroom

**SUClassroom** es una plataforma e-learning orientada a emprendedores, líderes de programas sociales, empresas, ONGs e instituciones. Su objetivo no es limitarse a entregar cursos o videos, sino convertir el aprendizaje en ejecución real mediante proyectos prácticos, entregables obligatorios, feedback de mentores, asesorías pagadas y desbloqueo progresivo de nuevos cursos.

La propuesta central es:

**aprender → aplicar → entregar → recibir feedback → mejorar → aprobar → desbloquear siguiente curso → acceder a asesoría o mentoría**

## 2.2 Qué problema resuelve

El problema principal identificado es que muchas personas consumen cursos, capacitaciones o contenido gratuito, pero no logran convertir ese conocimiento en proyectos reales, emprendimientos sostenibles o programas sociales ejecutables. El PDF del cliente plantea que el núcleo del problema no es la falta de educación, sino la falta de ejecución. 

SUClassroom busca resolver esa brecha entre **aprendizaje** y **ejecución**.

## 2.3 Para quién está dirigido

El producto está dirigido principalmente a:

* Emprendedores principiantes.
* Emprendedores en etapa inicial.
* Líderes de programas sociales.
* Líderes de emprendimientos sociales.
* Empresas, ONGs e instituciones que gestionan grupos o cohortes.
* Mentores y expertos que brindan revisión, validación y acompañamiento.

## 2.4 Propuesta diferencial

SUClassroom no debe posicionarse como una plataforma tradicional de cursos. Su diferencial es que el avance del usuario no depende únicamente de ver videos, sino de **aplicar lo aprendido en un proyecto real y lograr que ese proyecto sea revisado, corregido y aprobado**.

La plataforma no vende únicamente contenido. Vende **avance real, validación, acompañamiento estratégico y ejecución**.

## 2.5 Cómo generará ingresos

El modelo de negocio será principalmente freemium:

* Cursos gratuitos como puerta de entrada.
* Asesorías pagadas.
* Revisión + asesoría.
* Validación de entregables.
* Paquetes de asesorías.
* Suscripciones futuras.
* Licencias institucionales.
* Programas personalizados para empresas, ONGs e instituciones.
* Promociones y descuentos.
* Pagos integrados con Qulqi, según la respuesta del cliente.

El precio sugerido por asesoría en el formulario está entre **S/ 40 y S/ 120 por sesión**, dependiendo de especialización, duración y experiencia del mentor. 

## 2.6 Qué se busca validar con el MVP

El MVP debe validar:

1. Que los usuarios se registren.
2. Que completen el onboarding inicial.
3. Que accedan al primer curso gratuito.
4. Que desarrollen un entregable real.
5. Que envíen su proyecto.
6. Que acepten recibir feedback.
7. Que corrijan y reenvíen si es necesario.
8. Que perciban valor en la asesoría.
9. Que algunos usuarios conviertan de gratuito a pagado.
10. Que el modelo de ejecución guiada genere mayor compromiso que una plataforma tradicional de cursos.

---

# 3. Visión del producto

## 3.1 Visión a corto plazo

Construir una plataforma funcional que permita validar el núcleo del modelo:

* Registro de usuarios.
* Onboarding inicial.
* Curso gratuito inicial.
* Módulos de aprendizaje.
* Recursos descargables.
* Proyecto práctico obligatorio.
* Envío de entregables.
* Revisión por mentor.
* Feedback estructurado.
* Estados de avance.
* Dashboard básico del alumno.
* Dashboard básico del mentor.
* Panel administrativo básico.

El corto plazo debe enfocarse en validar si el usuario realmente ejecuta.

## 3.2 Visión a mediano plazo

Convertir SUClassroom en una plataforma de aprendizaje aplicado y mentoría donde:

* Los cursos estén organizados como rutas de ejecución.
* Existan múltiples cursos desbloqueables.
* Se integren pagos reales con Qulqi.
* Los usuarios puedan agendar asesorías.
* Los mentores puedan gestionar entregables y sesiones.
* Las instituciones puedan crear cohortes.
* El administrador pueda medir avance, impacto e ingresos.
* Se puedan generar reportes de progreso.

## 3.3 Visión a largo plazo

Escalar SUClassroom como un SaaS de formación aplicada para emprendimiento, programas sociales y desarrollo empresarial, con capacidad de operar en:

* Modelo B2C para usuarios individuales.
* Modelo B2B para instituciones, ONGs, universidades, incubadoras y empresas.
* Programas personalizados.
* Rutas de aprendizaje por industria.
* Analítica avanzada.
* Automatización de seguimiento.
* Recomendaciones inteligentes.
* Certificaciones o constancias.
* Comunidad.
* Marketplace de mentorías.

## 3.4 Diferenciación frente a plataformas tradicionales

| Plataforma tradicional de cursos                        | SUClassroom                                                            |
| ------------------------------------------------------- | ---------------------------------------------------------------------- |
| El usuario consume videos                               | El usuario ejecuta proyectos                                           |
| El avance suele depender de completar lecciones         | El avance depende de entregables aprobados                             |
| El feedback puede ser limitado o inexistente            | El feedback es parte central del producto                              |
| El contenido es el producto                             | El progreso validado es el producto                                    |
| El usuario aprende de forma pasiva                      | El usuario aprende aplicando                                           |
| La medición se centra en visualizaciones o finalización | La medición se centra en proyectos enviados, aprobados e implementados |

## 3.5 Enfoque en ejecución, entregables, mentoría y validación

La experiencia debe diseñarse para que cada usuario sienta que está construyendo algo real. Cada módulo debe empujar a una acción concreta. Cada curso debe terminar con un entregable. Cada entregable debe poder revisarse. Cada revisión debe generar mejora. Cada aprobación debe desbloquear avance.

---

# 4. Problema y oportunidad

## 4.1 Problema principal

Los emprendedores y líderes de programas sociales acceden a información, cursos y capacitaciones, pero no logran estructurar, implementar ni sostener sus ideas en el tiempo.

## 4.2 Problemas secundarios

* Consumo pasivo de contenido.
* Baja aplicación práctica.
* Falta de metodología clara.
* Falta de acompañamiento experto.
* Falta de validación externa.
* Desorden en finanzas, marketing, ventas y operaciones.
* Toma de decisiones por intuición.
* Baja disciplina de ejecución.
* Frustración por no ver resultados concretos.
* Alta probabilidad de abandono.
* Programas sociales con poca sostenibilidad.

## 4.3 Dolor del usuario

El usuario siente que:

* Ya ha aprendido mucho, pero no avanza.
* Tiene una idea, pero no sabe cómo estructurarla.
* No sabe si su proyecto está bien planteado.
* Necesita orientación, pero no sabe a quién acudir.
* Le falta claridad para pasar de la teoría a la acción.
* Puede encontrar contenido gratuito, pero no acompañamiento real.
* No quiere otro curso más; quiere resultados.

## 4.4 Oportunidad de mercado

Existe una oportunidad clara en unir:

* Educación online.
* Mentoría estratégica.
* Gestión de proyectos.
* Validación de entregables.
* Programas institucionales.
* Formación para emprendimiento y programas sociales.

El PDF señala que el modelo tiene potencial B2C y B2B, especialmente con universidades, incubadoras, ONGs y programas de cooperación. 

## 4.5 Brecha entre aprendizaje y ejecución

La brecha principal es:

**Saber qué hacer no significa hacerlo bien.**

SUClassroom debe cerrar esa brecha con:

* Rutas guiadas.
* Plantillas.
* Entregables.
* Revisiones.
* Feedback.
* Mentorías.
* Estados de avance.
* Desbloqueos.
* Reportes de impacto.

## 4.6 Riesgos del consumo pasivo de contenido

* Usuarios que ven videos sin aplicar.
* Baja transformación real.
* Falsa sensación de progreso.
* Pérdida de motivación.
* Abandono.
* Baja conversión a asesorías.
* Poca diferenciación frente a plataformas gratuitas.

---

# 5. Público objetivo

## 5.1 Usuario ideal

El usuario ideal es un emprendedor o líder de programa social que tiene una idea en marcha o en etapa inicial, pero enfrenta dificultades para estructurarla, ejecutarla y hacerla sostenible. Busca claridad, orden, acompañamiento y resultados reales.

## 5.2 Segmentos principales

| Segmento                        | Descripción                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------ |
| **Emprendedor principiante**    | Tiene una idea, negocio inicial o iniciativa, pero necesita estructura y guía. |
| **Líder de programa social**    | Gestiona o quiere crear una iniciativa social sostenible.                      |
| **Emprendedor social**          | Busca impacto social y sostenibilidad económica.                               |
| **Institución / ONG / empresa** | Quiere capacitar y monitorear grupos de beneficiarios o participantes.         |

## 5.3 Segmentos secundarios

* Mentores.
* Consultores.
* Universidades.
* Incubadoras.
* Programas de cooperación.
* Comunidades de emprendedores.
* Organizaciones educativas.

## 5.4 Nivel del usuario

El formulario marca como principal el nivel **principiante**, pero también se debe dejar preparada la plataforma para usuarios intermedios y avanzados en fases posteriores.

## 5.5 Necesidades

* Estructurar una idea.
* Validar un modelo de negocio.
* Crear una propuesta de valor.
* Ordenar finanzas.
* Mejorar marketing y ventas.
* Diseñar operaciones.
* Desarrollar sostenibilidad.
* Recibir feedback experto.
* Medir avance.
* Tener próximos pasos claros.

## 5.6 Motivaciones

* Generar ingresos.
* Lograr independencia económica.
* Crear impacto social.
* Dejar de improvisar.
* Construir con orden.
* Ver resultados concretos.
* Validar su idea.
* Reducir errores.
* Recibir acompañamiento.

## 5.7 Frustraciones

* Haber llevado cursos sin resultados.
* No saber por dónde empezar.
* Falta de claridad.
* Falta de validación.
* No recibir feedback útil.
* Sentir que avanza solo.
* Perder motivación.
* No lograr implementar.

## 5.8 Resultados esperados después de usar la plataforma

* Modelo de negocio estructurado.
* Propuesta de valor definida.
* Primeras validaciones de mercado.
* Proyecto social o emprendimiento mejor organizado.
* Entregables revisados.
* Feedback accionable.
* Mayor claridad estratégica.
* Primeros avances reales hacia implementación.

---

# 6. Personas de usuario

## 6.1 Persona 1: Alumno emprendedor principiante

| Campo                     | Descripción                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| **Nombre referencial**    | Emprendedor principiante                                                                          |
| **Descripción**           | Persona con una idea de negocio o emprendimiento inicial. Tiene motivación, pero poca estructura. |
| **Objetivos**             | Convertir su idea en un negocio viable, ordenado y validado.                                      |
| **Necesidades**           | Guía paso a paso, plantillas, feedback, claridad de avance.                                       |
| **Dolores**               | Desorden, improvisación, falta de validación, miedo a equivocarse.                                |
| **Motivaciones**          | Generar ingresos, independencia económica, transformar su idea en realidad.                       |
| **Comportamientos**       | Consume contenido gratuito, prueba herramientas, abandona si no ve avances rápidos.               |
| **Qué espera lograr**     | Tener su modelo de negocio, propuesta de valor y primeras validaciones.                           |
| **Funcionalidades clave** | Onboarding, curso inicial gratuito, entregables, feedback, dashboard de progreso, asesoría.       |

## 6.2 Persona 2: Líder de programa social

| Campo                     | Descripción                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------- |
| **Nombre referencial**    | Líder de programa social                                                               |
| **Descripción**           | Persona que lidera una iniciativa social, asociación, comunidad o programa de impacto. |
| **Objetivos**             | Estructurar un programa sostenible y medible.                                          |
| **Necesidades**           | Metodología, indicadores, sostenibilidad, recursos, mentoría.                          |
| **Dolores**               | Falta de fondos, baja organización, impacto difícil de medir.                          |
| **Motivaciones**          | Generar impacto social real y sostener el programa en el tiempo.                       |
| **Comportamientos**       | Participa en capacitaciones, busca aliados, necesita evidencia de resultados.          |
| **Qué espera lograr**     | Programa social estructurado, validado y con plan de sostenibilidad.                   |
| **Funcionalidades clave** | Cursos de sostenibilidad, entregables, reportes de impacto, mentoría, recursos.        |

## 6.3 Persona 3: Mentor

| Campo                     | Descripción                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| **Nombre referencial**    | Mentor estratégico                                                                       |
| **Descripción**           | Experto que revisa proyectos, evalúa entregables y guía al usuario.                      |
| **Objetivos**             | Ayudar a los alumnos a mejorar sus proyectos y avanzar con criterios claros.             |
| **Necesidades**           | Bandeja de entregables, criterios de evaluación, historial, agenda.                      |
| **Dolores**               | Entregables incompletos, falta de contexto, exceso de revisiones manuales.               |
| **Motivaciones**          | Generar impacto, monetizar experiencia, acompañar proyectos reales.                      |
| **Comportamientos**       | Evalúa, comenta, aprueba, rechaza, agenda sesiones.                                      |
| **Qué espera lograr**     | Revisar eficientemente y ofrecer feedback útil.                                          |
| **Funcionalidades clave** | Dashboard de mentor, entregables pendientes, formulario de evaluación, agenda, feedback. |

## 6.4 Persona 4: Administrador

| Campo                     | Descripción                                                                 |
| ------------------------- | --------------------------------------------------------------------------- |
| **Nombre referencial**    | Administrador de plataforma                                                 |
| **Descripción**           | Usuario responsable de operar, configurar y supervisar SUClassroom.         |
| **Objetivos**             | Mantener calidad, gestionar cursos, usuarios, mentores, pagos y reportes.   |
| **Necesidades**           | Panel centralizado, métricas, gestión de contenido, gestión de usuarios.    |
| **Dolores**               | Falta de visibilidad, procesos manuales, dificultad para medir impacto.     |
| **Motivaciones**          | Escalar el modelo y mantener control operativo.                             |
| **Comportamientos**       | Crea cursos, asigna mentores, revisa métricas, genera reportes.             |
| **Qué espera lograr**     | Operar la plataforma con eficiencia y control.                              |
| **Funcionalidades clave** | Dashboard admin, usuarios, cursos, pagos, reportes, analítica, promociones. |

## 6.5 Persona 5: Institución / ONG / empresa

| Campo                     | Descripción                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| **Nombre referencial**    | Organización aliada                                                                          |
| **Descripción**           | Empresa, ONG o institución que gestiona grupos de participantes.                             |
| **Objetivos**             | Capacitar, monitorear y medir el avance de beneficiarios o colaboradores.                    |
| **Necesidades**           | Cohortes, invitaciones, reportes, métricas de impacto, pagos institucionales.                |
| **Dolores**               | Falta de seguimiento, baja trazabilidad, reportes manuales.                                  |
| **Motivaciones**          | Medir resultados, escalar programas, justificar inversión.                                   |
| **Comportamientos**       | Invita participantes, revisa avance, solicita reportes, coordina mentorías.                  |
| **Qué espera lograr**     | Evidencia de progreso e impacto real.                                                        |
| **Funcionalidades clave** | Dashboard institucional, cohortes, reportes, progreso por usuario, programas personalizados. |

---

# 7. Propuesta de valor

## 7.1 Propuesta de valor general

SUClassroom transforma el aprendizaje en ejecución real mediante cursos prácticos, entregables obligatorios, feedback experto, asesorías estratégicas y desbloqueo progresivo de rutas de formación.

## 7.2 Para alumnos

* Aprenden aplicando.
* Construyen un proyecto real.
* Reciben feedback accionable.
* Tienen claridad de progreso.
* Evitan quedarse solo en teoría.
* Acceden a mentorías cuando necesitan apoyo.
* Desbloquean nuevos cursos según avance real.

## 7.3 Para mentores

* Pueden revisar proyectos con estructura.
* Tienen criterios claros de evaluación.
* Organizan su agenda.
* Registran feedback.
* Acompañan proyectos con impacto.
* Pueden monetizar su experiencia.

## 7.4 Para instituciones

* Gestionan grupos o cohortes.
* Monitorean avance real.
* Acceden a reportes de impacto.
* Miden proyectos implementados.
* Coordinan programas personalizados.
* Pueden justificar inversión en formación.

## 7.5 Para administradores

* Controlan usuarios, cursos, mentores, pagos y reportes.
* Miden métricas de ejecución.
* Supervisan calidad.
* Gestionan contenido.
* Escalan el modelo B2C y B2B.

## 7.6 Diferencial competitivo

**No vendemos cursos. Vendemos progreso validado.**

---

# 8. Modelo de negocio y monetización

## 8.1 Modelo base

| Elemento                    | Descripción                                         |
| --------------------------- | --------------------------------------------------- |
| **Entrada gratuita**        | El usuario accede a un primer curso gratuito.       |
| **Monetización principal**  | Asesorías pagadas y revisión + asesoría.            |
| **Monetización secundaria** | Suscripciones, paquetes, licencias institucionales. |
| **Pagos**                   | Qulqi como integración deseada.                     |
| **Promociones**             | Sí, se manejarán descuentos/promociones.            |
| **Suscripciones**           | Mencionadas como opción futura o complementaria.    |

## 8.2 Cursos gratuitos como entrada

El primer curso debe funcionar como herramienta de adquisición y validación. Su objetivo no es maximizar ingresos inmediatos, sino demostrar valor al usuario.

El curso gratuito debe llevar al usuario a un primer entregable concreto.

## 8.3 Asesorías pagadas

El pago debe estar conectado con valor real:

* Revisión del proyecto.
* Análisis de avance.
* Identificación de errores.
* Recomendaciones estratégicas.
* Resolución de dudas.
* Próximos pasos concretos.

## 8.4 Revisión + asesoría

Según el formulario, el pago desbloquea revisión + asesoría y luego de la asesoría se puede desbloquear el siguiente curso. Esta regla debe considerarse crítica para el modelo funcional. 

## 8.5 Suscripciones futuras

Las suscripciones pueden incluir:

* Cantidad mensual de asesorías.
* Acceso a múltiples cursos.
* Revisión prioritaria.
* Recursos premium.
* Comunidad.
* Reportes de progreso.
* Mentorías grupales.

## 8.6 Licencias institucionales

Para empresas, ONGs e instituciones:

* Pago por cohorte.
* Pago por participante.
* Pago por programa.
* Licencia mensual o anual.
* Reportes de impacto incluidos.
* Mentorías grupales.
* Programas personalizados.

## 8.7 Promociones y descuentos

El sistema debe permitir:

* Cupón de descuento.
* Promoción por campaña.
* Descuento por paquete.
* Descuento institucional.
* Descuento por lanzamiento.
* Descuento por referidos en fases futuras.

## 8.8 Rango de precios sugerido

| Servicio                   | Rango sugerido |
| -------------------------- | -------------- |
| Asesoría individual básica | S/ 40 – S/ 60  |
| Asesoría especializada     | S/ 70 – S/ 120 |
| Paquete de asesorías       | Por confirmar  |
| Suscripción mensual        | Por confirmar  |
| Licencia institucional     | Por confirmar  |

## 8.9 Momento exacto del pago

Según las respuestas del cliente:

* El pago se realiza **después de enviar el proyecto**.
* El pago desbloquea **revisión + asesoría**.
* Luego de la asesoría o aprobación se puede desbloquear el siguiente curso.

## 8.10 Flujo gratuito vs flujo pagado

| Etapa                         | Gratuito                | Pagado               |
| ----------------------------- | ----------------------- | -------------------- |
| Registro                      | Sí                      | Sí                   |
| Onboarding                    | Sí                      | Sí                   |
| Primer curso                  | Sí                      | Sí                   |
| Recursos base                 | Sí                      | Sí                   |
| Enviar proyecto               | Sí                      | Sí                   |
| Revisión avanzada             | Limitada o condicionada | Sí                   |
| Asesoría                      | No o limitada           | Sí                   |
| Desbloqueo de siguiente curso | Condicionado            | Sí, si cumple reglas |
| Reporte de avance avanzado    | Básico                  | Completo             |

---

# 9. Alcance del producto

## 9.1 Alcance MVP

El MVP debe incluir obligatoriamente:

1. Landing pública.
2. Registro con email y Google.
3. Verificación de email.
4. Login.
5. Roles base:

   * Alumno.
   * Mentor.
   * Administrador.
6. Onboarding inicial del alumno.
7. Diagnóstico inicial del proyecto.
8. Primer curso gratuito.
9. Catálogo básico de cursos.
10. Detalle de curso.
11. Módulos y lecciones.
12. Recursos descargables.
13. Proyecto práctico obligatorio.
14. Envío de entregables.
15. Estados de entregable.
16. Revisión por mentor.
17. Feedback estructurado.
18. Reenvío de entregables.
19. Aprobación o rechazo.
20. Desbloqueo básico de siguiente curso.
21. Solicitud básica de asesoría.
22. Registro manual o simulado de pago si Qulqi no se implementa inmediatamente.
23. Dashboard del alumno.
24. Dashboard del mentor.
25. Dashboard administrativo.
26. Gestión de usuarios.
27. Gestión de cursos por administrador.
28. Gestión de recursos.
29. Reportes básicos.
30. Notificaciones básicas.
31. Perfil de usuario.
32. Soporte básico.

## 9.2 Fuera de alcance para MVP

No debe construirse al inicio:

* Marketplace abierto de mentores.
* Comunidad social compleja.
* IA para feedback automático.
* Certificados avanzados.
* App móvil nativa.
* Automatización avanzada de rutas.
* Integración compleja con múltiples pasarelas de pago.
* Integración completa con WhatsApp Business API.
* Analítica predictiva.
* Gamificación avanzada.
* Sistema de afiliados.
* Multi-idioma.
* Constructor visual avanzado de cursos.
* Gestión financiera institucional avanzada.
* Marketplace público de cursos creados por terceros.
* Videollamadas internas desarrolladas desde cero.

## 9.3 Fase 2

Debe incluir:

* Pagos reales con Qulqi.
* Agenda de asesorías.
* Selección de mentor.
* Notificaciones más completas.
* Reportes administrativos mejorados.
* Historial de pagos.
* Sistema de promociones.
* Asignación avanzada de mentores.
* Mejoras en evaluación y rúbricas.
* Gestión de disponibilidad de mentores.

## 9.4 Fase 3

Debe incluir:

* Panel institucional.
* Cohortes.
* Invitación de participantes.
* Reportes de impacto.
* Mentorías grupales.
* Licencias institucionales.
* Programas personalizados.
* Comparativas por cohorte.
* Exportación de reportes.

## 9.5 Fases posteriores

* IA para recomendaciones.
* IA para detección de usuarios en riesgo.
* Automatización de seguimiento.
* Certificaciones.
* Comunidad.
* Marketplace de mentores.
* Suscripciones avanzadas.
* Mobile app.
* Analítica avanzada.

---

# 10. Roles y permisos

## 10.1 Matriz de permisos

| Acción / Permiso                  |    Alumno |             Mentor |            Administrador | Institución / ONG / Empresa |
| --------------------------------- | --------: | -----------------: | -----------------------: | --------------------------: |
| Ver landing pública               |        Sí |                 Sí |                       Sí |                          Sí |
| Registrarse                       |        Sí | Sí, con aprobación |                       Sí |          Sí, con validación |
| Iniciar sesión                    |        Sí |                 Sí |                       Sí |                          Sí |
| Ver cursos                        |        Sí |                 Sí |                       Sí |                          Sí |
| Crear cursos                      |        No |          No en MVP |                       Sí |                          No |
| Editar cursos                     |        No |          No en MVP |                       Sí |                          No |
| Publicar cursos                   |        No |                 No |                       Sí |                          No |
| Ver módulos                       |        Sí |                 Sí |                       Sí |      Según cursos asignados |
| Completar módulos                 |        Sí |                 No |                       No |                          No |
| Descargar recursos                |        Sí |                 Sí |                       Sí |              Según permisos |
| Enviar proyectos                  |        Sí |                 No |                       No |                          No |
| Revisar proyectos                 |        No |                 Sí |                       Sí |                          No |
| Aprobar entregables               |        No |                 Sí |                       Sí |                          No |
| Rechazar entregables              |        No |                 Sí |                       Sí |                          No |
| Reenviar entregables              |        Sí |                 No |                       No |                          No |
| Solicitar asesorías               |        Sí |                 No | Sí en nombre del usuario |              Sí, para grupo |
| Agendar asesorías                 |        Sí |                 Sí |                       Sí |                          Sí |
| Gestionar pagos propios           |        Sí |                 No |                       Sí |                          Sí |
| Gestionar todos los pagos         |        No |                 No |                       Sí |                          No |
| Ver reportes personales           |        Sí |                 No |                       Sí |                          No |
| Ver reportes de alumnos asignados |        No |                 Sí |                       Sí |                          No |
| Ver reportes institucionales      |        No |                 No |                       Sí |                          Sí |
| Gestionar usuarios                |        No |                 No |                       Sí | Participantes de su cohorte |
| Gestionar cohortes                |        No |                 No |                       Sí |                          Sí |
| Descargar reportes                | No en MVP |      Sí, asignados |                       Sí |                          Sí |
| Acceder a dashboard               |        Sí |                 Sí |                       Sí |                          Sí |
| Subir recursos                    |        No |          No en MVP |                       Sí |                          No |
| Editar perfil                     |        Sí |                 Sí |                       Sí |                          Sí |
| Enviar feedback                   |        No |                 Sí |                       Sí |                          No |
| Ver feedback recibido             |        Sí |        Sí, emitido |                       Sí |              Según permisos |
| Crear promociones                 |        No |                 No |                       Sí |                          No |
| Usar file manager                 |  Limitado |           Limitado |                       Sí |                    Limitado |
| Usar mensajería                   |        Sí |                 Sí |                       Sí |        Sí en fase posterior |
| Usar soporte                      |        Sí |                 Sí |                       Sí |                          Sí |

---

# 11. Flujos principales del sistema

## 11.1 Registro e inicio de sesión

### Flujo esperado

1. Usuario ingresa a la landing pública.
2. Hace clic en **Crear cuenta**.
3. Selecciona método:

   * Email y contraseña.
   * Google.
   * Redes sociales en fase posterior.
4. Acepta términos y condiciones.
5. El sistema crea la cuenta.
6. El sistema solicita verificación de email.
7. Usuario verifica su correo.
8. Usuario inicia sesión.
9. El sistema identifica o solicita rol.
10. Si es alumno, se dirige al onboarding.
11. Si es mentor, queda pendiente de validación administrativa.
12. Si es institución, requiere aprobación o configuración administrativa.
13. Si es administrador, accede al panel administrativo.

### Reglas

* El registro es obligatorio.
* No se permite compartir cuentas.
* Se requiere verificación de email.
* El rol alumno puede ser automático.
* Los roles mentor, administrador e institución deben estar controlados.

---

## 11.2 Onboarding del alumno

### Objetivo

Entender el perfil, nivel, proyecto e intención del usuario para recomendarle una ruta inicial.

### Flujo

1. Alumno ingresa por primera vez.
2. Visualiza mensaje de bienvenida.
3. Completa diagnóstico inicial:

   * Tipo de usuario.
   * Nivel.
   * Tipo de proyecto.
   * Etapa del proyecto.
   * Objetivo principal.
   * Área que más necesita trabajar.
4. Registra información básica de su proyecto:

   * Nombre del proyecto.
   * Descripción.
   * Público objetivo.
   * Problema que resuelve.
   * Estado actual.
5. El sistema muestra recomendación inicial.
6. Se desbloquea el primer curso gratuito.
7. El alumno accede a su dashboard.

### Resultado esperado

El usuario entiende que SUClassroom no es solo para ver cursos, sino para construir un proyecto real.

---

## 11.3 Flujo de curso gratuito

1. Alumno accede al primer curso gratuito.
2. Visualiza:

   * Objetivo del curso.
   * Resultado esperado.
   * Proyecto a desarrollar.
   * Módulos.
   * Recursos.
   * Criterios de aprobación.
3. Completa lecciones.
4. Descarga plantillas.
5. Desarrolla entregable.
6. Guarda avance.
7. Envía proyecto.
8. El sistema cambia el estado a **Enviado**.
9. El mentor o administrador revisa.
10. El alumno recibe feedback.
11. Corrige si es necesario.
12. Obtiene aprobación.
13. El curso se marca como completado.
14. Se desbloquea el siguiente paso.

---

## 11.4 Flujo de entregable

### Estados

1. **Borrador**
2. **Enviado**
3. **En revisión**
4. **Aprobado**
5. **Rechazado**
6. **Corrección solicitada**
7. **Reenviado**
8. **Aprobación final**

### Flujo detallado

1. Alumno crea o inicia entregable.
2. Completa formulario guiado.
3. Adjunta archivos:

   * PDF.
   * Presentación.
   * Documento.
   * Link.
4. Guarda como borrador.
5. Envía entregable.
6. Sistema confirma recepción.
7. Mentor recibe notificación.
8. Mentor revisa según criterios.
9. Mentor decide:

   * Aprobar.
   * Rechazar.
   * Solicitar correcciones.
10. Si se aprueba:

* Se marca proyecto como aprobado.
* Se actualiza progreso.
* Se puede desbloquear el siguiente curso.

11. Si se rechaza:

* Se entrega feedback accionable.
* Alumno corrige.
* Alumno reenvía.

12. Se conserva historial de versiones.

---

## 11.5 Flujo de mentoría

1. Alumno identifica necesidad de asesoría.
2. Hace clic en **Solicitar asesoría**.
3. Selecciona tipo de asesoría:

   * Revisión de proyecto.
   * Validación de idea.
   * Marketing.
   * Ventas.
   * Finanzas.
   * Operaciones.
   * Programa social.
4. Selecciona mentor disponible.
5. Selecciona fecha y hora.
6. Revisa precio.
7. Realiza pago.
8. Recibe confirmación.
9. Mentor recibe notificación.
10. Se realiza la asesoría por videollamada o canal definido.
11. Mentor registra:

* Diagnóstico.
* Observaciones.
* Recomendaciones.
* Próximos pasos.

12. Alumno visualiza conclusiones en su dashboard.
13. Se actualiza estado del proyecto.
14. Si corresponde, se desbloquea siguiente curso.

---

## 11.6 Flujo de desbloqueo de cursos

### Estados del curso

* Bloqueado.
* Disponible.
* En progreso.
* Proyecto enviado.
* Proyecto aprobado.
* Completado.
* Siguiente curso desbloqueado.

### Reglas de desbloqueo

1. El usuario accede inicialmente a un curso gratuito.
2. Para desbloquear el siguiente curso debe:

   * Completar módulos requeridos.
   * Enviar proyecto.
   * Obtener feedback.
   * Corregir si corresponde.
   * Lograr aprobación.
   * Realizar asesoría pagada si la regla del curso lo exige.
3. El sistema muestra claramente por qué un curso está bloqueado.
4. El sistema debe mostrar el próximo paso para desbloquearlo.

---

## 11.7 Flujo administrativo

1. Administrador inicia sesión.
2. Accede al dashboard administrativo.
3. Puede revisar:

   * Usuarios registrados.
   * Cursos activos.
   * Entregables pendientes.
   * Pagos.
   * Asesorías.
   * Reportes.
4. Puede crear curso:

   * Nombre.
   * Categoría.
   * Objetivo.
   * Resultado esperado.
   * Proyecto asociado.
   * Módulos.
   * Recursos.
   * Criterios de evaluación.
5. Puede editar cursos publicados.
6. Puede crear módulos y lecciones.
7. Puede subir recursos.
8. Puede asignar mentor.
9. Puede revisar pagos.
10. Puede generar reportes.
11. Puede gestionar promociones.
12. Puede supervisar calidad.

---

## 11.8 Flujo institucional

1. Institución solicita acceso o programa.
2. Administrador aprueba o configura la cuenta.
3. Institución crea o solicita una cohorte.
4. Invita participantes.
5. Asigna cursos o rutas.
6. Visualiza avance por usuario.
7. Visualiza entregables enviados.
8. Revisa reportes de impacto.
9. Coordina mentorías grupales.
10. Descarga reportes.
11. Solicita programa personalizado.

---

# 12. Reglas de negocio

| Código | Regla                                                                                     |
| ------ | ----------------------------------------------------------------------------------------- |
| RN-001 | El usuario debe registrarse obligatoriamente para acceder a cursos.                       |
| RN-002 | Se requiere verificación de email.                                                        |
| RN-003 | No se permite compartir cuentas.                                                          |
| RN-004 | El primer curso puede ser gratuito.                                                       |
| RN-005 | El usuario debe completar un curso antes de acceder al siguiente.                         |
| RN-006 | Completar un curso no depende solo de ver videos.                                         |
| RN-007 | Un curso se considera completado cuando el proyecto es aprobado.                          |
| RN-008 | Cada curso debe incluir un proyecto práctico obligatorio.                                 |
| RN-009 | El usuario puede reprobar un proyecto.                                                    |
| RN-010 | Si reprueba, recibe feedback y puede reenviar.                                            |
| RN-011 | El pago se realiza después de enviar el proyecto.                                         |
| RN-012 | El pago desbloquea revisión + asesoría.                                                   |
| RN-013 | Luego de la asesoría o aprobación se puede desbloquear el siguiente curso.                |
| RN-014 | Las instituciones pueden gestionar cohortes.                                              |
| RN-015 | Los administradores controlan la creación de cursos en el MVP.                            |
| RN-016 | Los mentores revisan, pero no necesariamente crean cursos en el MVP.                      |
| RN-017 | Los cursos pueden editarse después de publicados.                                         |
| RN-018 | Los cursos tendrán categorías.                                                            |
| RN-019 | Se manejarán promociones o descuentos.                                                    |
| RN-020 | Se hará seguimiento del progreso del usuario.                                             |
| RN-021 | El dashboard debe medir ejecución e impacto, no solo consumo de contenido.                |
| RN-022 | Los entregables deben responder a criterios definidos por curso.                          |
| RN-023 | Los mentores deben emitir feedback claro, específico y accionable.                        |
| RN-024 | El alumno debe poder reenviar proyectos corregidos.                                       |
| RN-025 | El sistema debe conservar historial de entregables y feedback.                            |
| RN-026 | Los roles administrativos deben estar protegidos y no ser autoseleccionables sin control. |
| RN-027 | Las promociones deben aplicarse antes del pago.                                           |
| RN-028 | Una asesoría debe dejar conclusiones y próximos pasos registrados.                        |
| RN-029 | La plataforma debe mostrar al usuario su próximo paso recomendado.                        |
| RN-030 | La institución solo debe ver usuarios, reportes y cohortes asociadas a su organización.   |

---

# 13. Módulos funcionales

## 13.1 Autenticación y gestión de cuentas

| Campo                       | Detalle                                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Objetivo**                | Permitir acceso seguro y controlado a la plataforma.                                                     |
| **Usuarios**                | Alumno, mentor, administrador, institución.                                                              |
| **Funcionalidades**         | Registro, login, Google, verificación de email, recuperación de contraseña, selección/asignación de rol. |
| **Reglas**                  | Registro obligatorio, email verificado, no compartir cuentas.                                            |
| **Estados**                 | Pendiente de verificación, activo, inactivo, suspendido.                                                 |
| **Datos**                   | Nombre, email, contraseña, rol, estado, fecha de registro.                                               |
| **Criterios de aceptación** | El usuario puede registrarse, verificar email e iniciar sesión según su rol.                             |

---

## 13.2 Onboarding y diagnóstico inicial

| Campo                       | Detalle                                                                       |
| --------------------------- | ----------------------------------------------------------------------------- |
| **Objetivo**                | Entender el perfil del usuario y su proyecto.                                 |
| **Usuarios**                | Alumno.                                                                       |
| **Funcionalidades**         | Diagnóstico, nivel, tipo de proyecto, etapa, objetivo, recomendación inicial. |
| **Reglas**                  | Debe completarse antes de iniciar el primer curso.                            |
| **Estados**                 | No iniciado, en progreso, completado.                                         |
| **Datos**                   | Nivel, objetivo, proyecto, sector, dificultad principal.                      |
| **Criterios de aceptación** | Al finalizar, se recomienda el primer curso o ruta inicial.                   |

---

## 13.3 Gestión de cursos

| Campo                       | Detalle                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------- |
| **Objetivo**                | Crear, organizar y publicar cursos orientados a ejecución.                         |
| **Usuarios**                | Administrador.                                                                     |
| **Funcionalidades**         | Crear, editar, publicar, despublicar, categorizar, ordenar cursos.                 |
| **Reglas**                  | En MVP solo administra cursos el administrador.                                    |
| **Estados**                 | Borrador, publicado, archivado, bloqueado.                                         |
| **Datos**                   | Título, descripción, objetivo, resultado esperado, categoría, nivel, duración.     |
| **Criterios de aceptación** | Un administrador puede crear un curso con módulos, proyecto, recursos y criterios. |

---

## 13.4 Gestión de módulos y lecciones

| Campo                       | Detalle                                                             |
| --------------------------- | ------------------------------------------------------------------- |
| **Objetivo**                | Organizar el aprendizaje en unidades aplicables.                    |
| **Usuarios**                | Administrador, alumno.                                              |
| **Funcionalidades**         | Crear módulos, agregar lecciones, ordenar contenido, marcar avance. |
| **Reglas**                  | Cada módulo debe orientar a una acción concreta.                    |
| **Estados**                 | No iniciado, en progreso, completado.                               |
| **Datos**                   | Título, descripción, contenido, video, duración, orden.             |
| **Criterios de aceptación** | El alumno puede avanzar por módulos y visualizar progreso.          |

---

## 13.5 Gestión de recursos y plantillas

| Campo                       | Detalle                                                           |
| --------------------------- | ----------------------------------------------------------------- |
| **Objetivo**                | Proveer herramientas prácticas para aplicar lo aprendido.         |
| **Usuarios**                | Alumno, mentor, administrador.                                    |
| **Funcionalidades**         | Subir, descargar, clasificar y asociar recursos a cursos/módulos. |
| **Reglas**                  | Los recursos deben estar conectados a entregables.                |
| **Estados**                 | Disponible, bloqueado, archivado.                                 |
| **Datos**                   | Nombre, tipo, archivo, descripción, curso asociado.               |
| **Criterios de aceptación** | El alumno puede descargar recursos permitidos según su avance.    |

---

## 13.6 Gestión de proyectos del alumno

| Campo                       | Detalle                                                                  |
| --------------------------- | ------------------------------------------------------------------------ |
| **Objetivo**                | Centralizar el proyecto real que el alumno está construyendo.            |
| **Usuarios**                | Alumno, mentor, administrador.                                           |
| **Funcionalidades**         | Crear proyecto, editar información, guardar avance, asociar entregables. |
| **Reglas**                  | Cada alumno debe tener al menos un proyecto activo.                      |
| **Estados**                 | Idea, estructuración, validación, implementación, aprobado.              |
| **Datos**                   | Nombre, descripción, público, problema, solución, etapa.                 |
| **Criterios de aceptación** | El alumno puede registrar y actualizar su proyecto.                      |

---

## 13.7 Sistema de entregables

| Campo                       | Detalle                                                           |
| --------------------------- | ----------------------------------------------------------------- |
| **Objetivo**                | Permitir que el alumno envíe evidencia práctica de aplicación.    |
| **Usuarios**                | Alumno, mentor, administrador.                                    |
| **Funcionalidades**         | Crear borrador, adjuntar archivos, enviar, reenviar, ver estado.  |
| **Reglas**                  | El entregable debe cumplir criterios específicos del curso.       |
| **Estados**                 | Borrador, enviado, en revisión, aprobado, rechazado, reenviado.   |
| **Datos**                   | Descripción, archivos, links, versión, estado, fecha.             |
| **Criterios de aceptación** | El alumno puede enviar un entregable y el mentor puede revisarlo. |

---

## 13.8 Sistema de evaluación

| Campo                       | Detalle                                                        |
| --------------------------- | -------------------------------------------------------------- |
| **Objetivo**                | Evaluar entregables con criterios claros.                      |
| **Usuarios**                | Mentor, administrador.                                         |
| **Funcionalidades**         | Rúbrica, criterios, puntuación, aprobación, rechazo.           |
| **Reglas**                  | La aprobación del entregable define la finalización del curso. |
| **Estados**                 | Pendiente, en evaluación, aprobado, rechazado.                 |
| **Datos**                   | Criterios, comentarios, resultado, mentor evaluador.           |
| **Criterios de aceptación** | El mentor puede evaluar y emitir resultado trazable.           |

---

## 13.9 Sistema de feedback

| Campo                       | Detalle                                                      |
| --------------------------- | ------------------------------------------------------------ |
| **Objetivo**                | Brindar retroalimentación específica y accionable.           |
| **Usuarios**                | Mentor, alumno, administrador.                               |
| **Funcionalidades**         | Comentarios, observaciones, recomendaciones, próximos pasos. |
| **Reglas**                  | El feedback debe ayudar a mejorar, no solo calificar.        |
| **Estados**                 | Emitido, visto, respondido, aplicado.                        |
| **Datos**                   | Comentario, tipo, prioridad, fecha, autor.                   |
| **Criterios de aceptación** | El alumno recibe feedback claro y puede reenviar corrección. |

---

## 13.10 Sistema de asesorías

| Campo                       | Detalle                                                          |
| --------------------------- | ---------------------------------------------------------------- |
| **Objetivo**                | Permitir acompañamiento estratégico pagado.                      |
| **Usuarios**                | Alumno, mentor, administrador, institución.                      |
| **Funcionalidades**         | Solicitar, agendar, pagar, confirmar, registrar conclusiones.    |
| **Reglas**                  | La asesoría puede desbloquear avance según reglas del curso.     |
| **Estados**                 | Solicitada, pendiente de pago, confirmada, realizada, cancelada. |
| **Datos**                   | Mentor, alumno, fecha, tipo, precio, estado.                     |
| **Criterios de aceptación** | El usuario puede solicitar y confirmar una asesoría.             |

---

## 13.11 Sistema de pagos

| Campo                       | Detalle                                                                |
| --------------------------- | ---------------------------------------------------------------------- |
| **Objetivo**                | Gestionar pagos por asesorías, revisiones, paquetes o suscripciones.   |
| **Usuarios**                | Alumno, administrador, institución.                                    |
| **Funcionalidades**         | Crear intención de pago, aplicar descuento, confirmar pago, historial. |
| **Reglas**                  | Qulqi es pasarela deseada; pago después de enviar proyecto.            |
| **Estados**                 | Pendiente, pagado, fallido, reembolsado, cancelado.                    |
| **Datos**                   | Monto, moneda, concepto, usuario, fecha, estado.                       |
| **Criterios de aceptación** | El pago queda registrado y desbloquea el servicio correspondiente.     |

---

## 13.12 Dashboard del alumno

| Campo                       | Detalle                                                    |
| --------------------------- | ---------------------------------------------------------- |
| **Objetivo**                | Mostrar progreso, próximos pasos y estado del proyecto.    |
| **Usuarios**                | Alumno.                                                    |
| **Funcionalidades**         | Progreso, cursos, entregables, feedback, asesorías, pagos. |
| **Reglas**                  | Debe orientar siempre a la siguiente acción.               |
| **Estados**                 | Según cursos, proyectos y entregables.                     |
| **Datos**                   | Avance, curso activo, feedback, mentoría, pagos.           |
| **Criterios de aceptación** | El alumno entiende qué debe hacer después.                 |

---

## 13.13 Dashboard del mentor

| Campo                       | Detalle                                                       |
| --------------------------- | ------------------------------------------------------------- |
| **Objetivo**                | Gestionar revisiones y asesorías.                             |
| **Usuarios**                | Mentor.                                                       |
| **Funcionalidades**         | Entregables pendientes, alumnos asignados, agenda, historial. |
| **Reglas**                  | Solo ve alumnos o entregables asignados.                      |
| **Estados**                 | Pendiente, en revisión, completado.                           |
| **Datos**                   | Entregables, alumnos, fechas, sesiones.                       |
| **Criterios de aceptación** | El mentor puede priorizar revisiones y emitir feedback.       |

---

## 13.14 Dashboard del administrador

| Campo                       | Detalle                                                             |
| --------------------------- | ------------------------------------------------------------------- |
| **Objetivo**                | Supervisar operación, usuarios, cursos, pagos, reportes e impacto.  |
| **Usuarios**                | Administrador.                                                      |
| **Funcionalidades**         | Métricas, gestión, reportes, pagos, cursos, usuarios, mentores.     |
| **Reglas**                  | Acceso restringido.                                                 |
| **Estados**                 | Métricas en tiempo real o actualizadas.                             |
| **Datos**                   | Usuarios, cursos, pagos, entregables, asesorías.                    |
| **Criterios de aceptación** | El administrador puede controlar el sistema desde un panel central. |

---

## 13.15 Dashboard institucional

| Campo                       | Detalle                                                 |
| --------------------------- | ------------------------------------------------------- |
| **Objetivo**                | Permitir seguimiento de cohortes y medición de impacto. |
| **Usuarios**                | Institución / empresa / ONG.                            |
| **Funcionalidades**         | Cohortes, participantes, progreso, reportes, impacto.   |
| **Reglas**                  | Solo ve datos de su organización.                       |
| **Estados**                 | Cohorte activa, finalizada, pausada.                    |
| **Datos**                   | Participantes, avance, entregables, reportes.           |
| **Criterios de aceptación** | La institución puede medir avance de sus beneficiarios. |

---

## 13.16 Reportes y analítica

| Campo                       | Detalle                                                          |
| --------------------------- | ---------------------------------------------------------------- |
| **Objetivo**                | Medir ejecución, negocio e impacto.                              |
| **Usuarios**                | Administrador, institución, mentor.                              |
| **Funcionalidades**         | KPIs, filtros, exportación, reportes por usuario/cohorte.        |
| **Reglas**                  | Medir proyectos, no solo consumo.                                |
| **Estados**                 | Generado, programado, exportado.                                 |
| **Datos**                   | Usuarios, cursos, entregables, pagos, asesorías.                 |
| **Criterios de aceptación** | Se pueden visualizar métricas clave y exportar reportes básicos. |

---

## 13.17 Notificaciones

| Campo                       | Detalle                                                                  |
| --------------------------- | ------------------------------------------------------------------------ |
| **Objetivo**                | Informar eventos relevantes y próximos pasos.                            |
| **Usuarios**                | Todos.                                                                   |
| **Funcionalidades**         | Email, alertas internas, recordatorios, cambios de estado.               |
| **Reglas**                  | Deben ser útiles y accionables.                                          |
| **Estados**                 | No leída, leída, archivada.                                              |
| **Datos**                   | Tipo, mensaje, usuario, fecha, entidad relacionada.                      |
| **Criterios de aceptación** | El usuario recibe avisos sobre entregables, feedback, pagos y asesorías. |

---

## 13.18 Soporte

| Campo                       | Detalle                                              |
| --------------------------- | ---------------------------------------------------- |
| **Objetivo**                | Resolver dudas generales.                            |
| **Usuarios**                | Todos.                                               |
| **Funcionalidades**         | Solicitud de soporte, categorías, estado, respuesta. |
| **Reglas**                  | Canales deseados: email, chat y WhatsApp.            |
| **Estados**                 | Abierto, en proceso, resuelto, cerrado.              |
| **Datos**                   | Usuario, asunto, mensaje, prioridad, estado.         |
| **Criterios de aceptación** | El usuario puede solicitar soporte y ver estado.     |

---

## 13.19 Configuración de perfil

| Campo                       | Detalle                                                        |
| --------------------------- | -------------------------------------------------------------- |
| **Objetivo**                | Permitir actualización de información personal y preferencias. |
| **Usuarios**                | Todos.                                                         |
| **Funcionalidades**         | Editar datos, foto, contraseña, preferencias.                  |
| **Reglas**                  | Cambios críticos pueden requerir verificación.                 |
| **Estados**                 | Activo, incompleto, verificado.                                |
| **Datos**                   | Nombre, email, foto, rol, preferencias.                        |
| **Criterios de aceptación** | El usuario puede mantener su perfil actualizado.               |

---

## 13.20 Gestión de contenido

| Campo                       | Detalle                                                   |
| --------------------------- | --------------------------------------------------------- |
| **Objetivo**                | Administrar contenido educativo y práctico.               |
| **Usuarios**                | Administrador.                                            |
| **Funcionalidades**         | Crear contenido, editar, publicar, archivar.              |
| **Reglas**                  | Mantener consistencia metodológica.                       |
| **Estados**                 | Borrador, publicado, archivado.                           |
| **Datos**                   | Título, cuerpo, recurso, módulo asociado.                 |
| **Criterios de aceptación** | El administrador puede mantener el contenido actualizado. |

---

## 13.21 Gestión de archivos

| Campo                       | Detalle                                                   |
| --------------------------- | --------------------------------------------------------- |
| **Objetivo**                | Gestionar documentos, plantillas, entregables y recursos. |
| **Usuarios**                | Alumno, mentor, administrador, institución.               |
| **Funcionalidades**         | Subir, descargar, organizar, asociar archivos.            |
| **Reglas**                  | Control de permisos por rol.                              |
| **Estados**                 | Disponible, privado, archivado.                           |
| **Datos**                   | Nombre, tipo, tamaño, propietario, entidad asociada.      |
| **Criterios de aceptación** | Los archivos se almacenan y se acceden según permisos.    |

---

## 13.22 Mensajería o comunicación

| Campo                       | Detalle                                                                       |
| --------------------------- | ----------------------------------------------------------------------------- |
| **Objetivo**                | Facilitar comunicación entre alumno, mentor y soporte.                        |
| **Usuarios**                | Alumno, mentor, administrador.                                                |
| **Funcionalidades**         | Mensajes, comentarios, hilos por entregable, comunicación de asesoría.        |
| **Reglas**                  | En MVP puede limitarse a comentarios y notificaciones.                        |
| **Estados**                 | Enviado, leído, respondido.                                                   |
| **Datos**                   | Remitente, destinatario, mensaje, fecha, entidad relacionada.                 |
| **Criterios de aceptación** | El usuario puede comunicarse dentro del contexto de un entregable o asesoría. |

---

## 13.23 Calendario o agenda

| Campo                       | Detalle                                                   |
| --------------------------- | --------------------------------------------------------- |
| **Objetivo**                | Gestionar disponibilidad y sesiones.                      |
| **Usuarios**                | Alumno, mentor, institución, administrador.               |
| **Funcionalidades**         | Ver horarios, reservar, confirmar, cancelar, reprogramar. |
| **Reglas**                  | Debe evitar conflictos de horario.                        |
| **Estados**                 | Disponible, reservado, confirmado, cancelado.             |
| **Datos**                   | Fecha, hora, mentor, alumno, estado.                      |
| **Criterios de aceptación** | El usuario puede reservar asesoría en horario disponible. |

---

## 13.24 Promociones y descuentos

| Campo                       | Detalle                                                 |
| --------------------------- | ------------------------------------------------------- |
| **Objetivo**                | Incentivar conversión a pago.                           |
| **Usuarios**                | Administrador, alumno, institución.                     |
| **Funcionalidades**         | Crear cupón, aplicar descuento, validar vigencia.       |
| **Reglas**                  | Debe aplicarse antes del pago.                          |
| **Estados**                 | Activo, expirado, usado, pausado.                       |
| **Datos**                   | Código, porcentaje, monto, vigencia, límite.            |
| **Criterios de aceptación** | El usuario puede aplicar una promoción válida al pagar. |

---

# 14. Pantallas necesarias

## 14.1 Pantallas para alumnos

| Pantalla              | Objetivo                                       |
| --------------------- | ---------------------------------------------- |
| Landing pública       | Explicar propuesta de valor y captar usuarios. |
| Registro              | Crear cuenta.                                  |
| Login                 | Acceder a plataforma.                          |
| Verificación de email | Confirmar identidad.                           |
| Onboarding            | Diagnosticar perfil y proyecto.                |
| Dashboard del alumno  | Mostrar progreso y próximo paso.               |
| Catálogo de cursos    | Ver cursos disponibles y bloqueados.           |
| Detalle de curso      | Ver objetivos, módulos, proyecto y criterios.  |
| Vista de lección      | Consumir contenido y acceder a recursos.       |
| Vista de proyecto     | Gestionar proyecto del alumno.                 |
| Enviar entregable     | Adjuntar documentos y enviar.                  |
| Estado de revisión    | Ver estado del entregable.                     |
| Feedback recibido     | Leer observaciones y próximos pasos.           |
| Reenvío de entregable | Corregir y volver a enviar.                    |
| Solicitar asesoría    | Elegir tipo de asesoría.                       |
| Mis asesorías         | Ver sesiones pasadas y futuras.                |
| Mis pagos             | Historial de pagos.                            |
| Mi progreso           | Ruta, hitos, cursos y entregables.             |
| Mi perfil             | Editar información personal.                   |
| Soporte               | Solicitar ayuda.                               |

---

## 14.2 Pantallas para mentores

| Pantalla                   | Objetivo                              |
| -------------------------- | ------------------------------------- |
| Dashboard del mentor       | Ver pendientes, alumnos y agenda.     |
| Lista de alumnos asignados | Revisar alumnos bajo seguimiento.     |
| Entregables pendientes     | Priorizar revisiones.                 |
| Detalle de entregable      | Revisar contenido enviado.            |
| Formulario de evaluación   | Aplicar criterios y emitir resultado. |
| Historial de feedback      | Ver revisiones anteriores.            |
| Agenda de asesorías        | Gestionar sesiones.                   |
| Detalle de asesoría        | Registrar conclusiones.               |
| Perfil del mentor          | Editar información profesional.       |
| Soporte                    | Reportar incidencias.                 |

---

## 14.3 Pantallas para administradores

| Pantalla                 | Objetivo                                    |
| ------------------------ | ------------------------------------------- |
| Dashboard administrativo | Vista general del sistema.                  |
| Gestión de usuarios      | Crear, editar, activar, suspender usuarios. |
| Gestión de cursos        | Crear y administrar cursos.                 |
| Gestión de módulos       | Crear estructura interna del curso.         |
| Gestión de recursos      | Subir plantillas y materiales.              |
| Gestión de mentores      | Crear perfiles y asignaciones.              |
| Gestión de proyectos     | Ver proyectos y estados.                    |
| Gestión de entregables   | Auditar entregables y revisiones.           |
| Gestión de pagos         | Ver pagos, estados, descuentos.             |
| Reportes                 | Generar reportes.                           |
| Analítica                | Métricas de uso, negocio e impacto.         |
| File manager             | Gestionar archivos.                         |
| Configuración general    | Parámetros de plataforma.                   |
| Promociones              | Crear y editar descuentos.                  |
| Calendario               | Ver asesorías y eventos.                    |
| Mensajes                 | Comunicación interna.                       |
| Soporte                  | Gestión de tickets.                         |

---

## 14.4 Pantallas para instituciones

| Pantalla                            | Objetivo                       |
| ----------------------------------- | ------------------------------ |
| Dashboard institucional             | Ver avance general.            |
| Gestión de cohortes                 | Crear y administrar grupos.    |
| Lista de participantes              | Ver usuarios asociados.        |
| Progreso por usuario                | Monitorear avance individual.  |
| Reportes de impacto                 | Medir resultados.              |
| Cursos asignados                    | Ver cursos de la cohorte.      |
| Solicitud de programa personalizado | Pedir adaptación del programa. |
| Mentorías grupales                  | Coordinar sesiones.            |
| Pagos institucionales               | Ver pagos o licencias.         |

---

# 15. Requisitos funcionales

## 15.1 Autenticación y cuentas

### RF-001: Registro de usuario con email

**Descripción:**
El sistema debe permitir que un usuario cree una cuenta usando nombre, email y contraseña.

**Usuario/Rol:**
Alumno.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El usuario puede ingresar nombre, email y contraseña.
* El sistema valida formato de email.
* El sistema impide emails duplicados.
* El sistema solicita verificación de email.
* El usuario no accede completamente hasta verificar.

**Dependencias:**
Sistema de autenticación, verificación de email.

---

### RF-002: Registro con Google

**Descripción:**
El sistema debe permitir registro e inicio de sesión con Google.

**Usuario/Rol:**
Alumno.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El usuario puede seleccionar Google como método.
* Si el email no existe, se crea cuenta.
* Si el email existe, se inicia sesión.
* El rol inicial por defecto es alumno.

**Dependencias:**
Proveedor de autenticación externo.

---

### RF-003: Verificación de email

**Descripción:**
El sistema debe solicitar verificación de email para activar la cuenta.

**Usuario/Rol:**
Todos.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El usuario recibe enlace de verificación.
* El sistema actualiza el estado a verificado.
* El usuario no puede acceder a funciones críticas sin verificar.

**Dependencias:**
Servicio de email.

---

### RF-004: Inicio de sesión

**Descripción:**
El sistema debe permitir login mediante email/contraseña o Google.

**Usuario/Rol:**
Todos.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El usuario puede iniciar sesión con credenciales válidas.
* El sistema bloquea credenciales inválidas.
* El usuario es redirigido al dashboard correspondiente a su rol.

**Dependencias:**
Autenticación, roles.

---

### RF-005: Recuperación de contraseña

**Descripción:**
El sistema debe permitir recuperación de contraseña por email.

**Usuario/Rol:**
Todos.

**Prioridad:**
Media.

**Criterios de aceptación:**

* El usuario solicita recuperación.
* Recibe enlace seguro.
* Puede definir nueva contraseña.

**Dependencias:**
Servicio de email.

---

## 15.2 Onboarding y diagnóstico

### RF-006: Diagnóstico inicial del alumno

**Descripción:**
El sistema debe mostrar un diagnóstico inicial al alumno después de su primer ingreso.

**Usuario/Rol:**
Alumno.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El alumno responde preguntas sobre su proyecto.
* El sistema guarda respuestas.
* El alumno no puede saltar el diagnóstico en el primer acceso, salvo decisión pendiente.

**Dependencias:**
Perfil de usuario.

---

### RF-007: Registro de proyecto inicial

**Descripción:**
El alumno debe poder registrar información base de su emprendimiento o programa social.

**Usuario/Rol:**
Alumno.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El alumno registra nombre, descripción, problema, público objetivo y etapa.
* El sistema asocia el proyecto al alumno.
* El proyecto aparece en el dashboard.

**Dependencias:**
Diagnóstico inicial.

---

### RF-008: Recomendación inicial de curso

**Descripción:**
El sistema debe recomendar o habilitar el primer curso gratuito después del diagnóstico.

**Usuario/Rol:**
Alumno.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El alumno ve el primer curso disponible.
* El sistema muestra por qué ese curso es recomendado.
* El curso aparece como disponible en el catálogo.

**Dependencias:**
Catálogo de cursos.

---

## 15.3 Cursos, módulos y lecciones

### RF-009: Catálogo de cursos

**Descripción:**
El sistema debe mostrar un catálogo de cursos disponibles y bloqueados.

**Usuario/Rol:**
Alumno.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El alumno ve cursos disponibles.
* El alumno ve cursos bloqueados con motivo.
* El primer curso gratuito está disponible inicialmente.

**Dependencias:**
Gestión de cursos, reglas de desbloqueo.

---

### RF-010: Detalle de curso

**Descripción:**
El sistema debe mostrar la información completa de cada curso.

**Usuario/Rol:**
Alumno, administrador.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* Se visualiza objetivo del curso.
* Se visualiza resultado esperado.
* Se visualiza proyecto obligatorio.
* Se visualizan módulos, recursos y criterios.

**Dependencias:**
Gestión de cursos.

---

### RF-011: Visualización de lecciones

**Descripción:**
El alumno debe poder acceder a lecciones del curso.

**Usuario/Rol:**
Alumno.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El alumno puede abrir una lección.
* Puede marcarla como completada.
* Puede acceder a recursos asociados.

**Dependencias:**
Módulos y contenido.

---

### RF-012: Creación de cursos por administrador

**Descripción:**
El administrador debe poder crear cursos.

**Usuario/Rol:**
Administrador.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* Puede crear título, descripción, categoría, nivel y objetivo.
* Puede definir resultado esperado.
* Puede asociar proyecto obligatorio.
* Puede guardar como borrador o publicar.

**Dependencias:**
Panel administrativo.

---

### RF-013: Edición de cursos publicados

**Descripción:**
El administrador debe poder editar cursos después de publicados.

**Usuario/Rol:**
Administrador.

**Prioridad:**
Media.

**Criterios de aceptación:**

* Puede editar contenido.
* El sistema conserva estado del curso.
* No rompe el avance de alumnos activos.

**Dependencias:**
Gestión de versiones, reglas de contenido.

---

## 15.4 Recursos y plantillas

### RF-014: Descarga de recursos

**Descripción:**
El alumno debe poder descargar plantillas y recursos de los módulos.

**Usuario/Rol:**
Alumno.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El recurso aparece asociado a una lección o curso.
* El alumno puede descargarlo.
* El sistema respeta permisos de acceso.

**Dependencias:**
Gestión de archivos.

---

### RF-015: Subida de recursos por administrador

**Descripción:**
El administrador debe poder subir recursos y asociarlos a cursos o módulos.

**Usuario/Rol:**
Administrador.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* Puede subir archivo.
* Puede asignarlo a un módulo.
* Puede definir visibilidad.

**Dependencias:**
File manager.

---

## 15.5 Proyectos y entregables

### RF-016: Creación de entregable

**Descripción:**
El alumno debe poder crear un entregable asociado a un curso.

**Usuario/Rol:**
Alumno.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El alumno puede iniciar entregable.
* Puede guardar borrador.
* Puede adjuntar archivos o links.

**Dependencias:**
Curso activo, proyecto del alumno.

---

### RF-017: Envío de entregable

**Descripción:**
El alumno debe poder enviar un entregable para revisión.

**Usuario/Rol:**
Alumno.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El sistema valida campos obligatorios.
* Cambia estado a enviado.
* Notifica al mentor o administrador.

**Dependencias:**
Sistema de notificaciones, asignación de mentor.

---

### RF-018: Revisión de entregable

**Descripción:**
El mentor debe poder revisar entregables asignados.

**Usuario/Rol:**
Mentor.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El mentor ve entregables pendientes.
* Puede abrir archivos o links.
* Puede evaluar con criterios definidos.

**Dependencias:**
Dashboard de mentor.

---

### RF-019: Aprobación de entregable

**Descripción:**
El mentor debe poder aprobar un entregable.

**Usuario/Rol:**
Mentor, administrador.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El entregable cambia a aprobado.
* El curso puede marcarse como completado.
* Se actualiza progreso del alumno.
* Se evalúa desbloqueo de siguiente curso.

**Dependencias:**
Reglas de curso, sistema de progreso.

---

### RF-020: Rechazo de entregable

**Descripción:**
El mentor debe poder rechazar un entregable con feedback obligatorio.

**Usuario/Rol:**
Mentor.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El mentor selecciona rechazo o corrección.
* Debe ingresar feedback.
* El alumno recibe observaciones.
* El sistema permite reenvío.

**Dependencias:**
Sistema de feedback.

---

### RF-021: Reenvío de entregable corregido

**Descripción:**
El alumno debe poder reenviar un entregable después de recibir feedback.

**Usuario/Rol:**
Alumno.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El alumno visualiza feedback.
* Puede subir nueva versión.
* El sistema conserva historial.
* El estado cambia a reenviado.

**Dependencias:**
Historial de entregables.

---

## 15.6 Evaluación y feedback

### RF-022: Rúbrica de evaluación

**Descripción:**
El sistema debe permitir evaluar entregables usando criterios definidos.

**Usuario/Rol:**
Mentor, administrador.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El mentor ve criterios.
* Puede marcar cumplimiento.
* Puede emitir resultado final.

**Dependencias:**
Gestión de criterios por curso.

---

### RF-023: Feedback estructurado

**Descripción:**
El mentor debe poder registrar feedback claro, específico y accionable.

**Usuario/Rol:**
Mentor.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El feedback incluye observaciones.
* Incluye recomendaciones.
* Incluye próximos pasos.
* El alumno puede verlo desde su panel.

**Dependencias:**
Sistema de entregables.

---

## 15.7 Mentorías y asesorías

### RF-024: Solicitud de asesoría

**Descripción:**
El alumno debe poder solicitar una asesoría.

**Usuario/Rol:**
Alumno.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El alumno selecciona tipo de asesoría.
* Puede ver precio.
* Puede continuar a agenda o pago.

**Dependencias:**
Sistema de pagos, agenda.

---

### RF-025: Selección de mentor

**Descripción:**
El alumno debe poder seleccionar mentor disponible, si el modelo lo permite.

**Usuario/Rol:**
Alumno.

**Prioridad:**
Media.

**Criterios de aceptación:**

* El sistema muestra mentores disponibles.
* El alumno selecciona uno.
* El sistema asocia la solicitud.

**Dependencias:**
Gestión de mentores, agenda.

---

### RF-026: Agenda de asesorías

**Descripción:**
El sistema debe permitir reservar fecha y hora de asesoría.

**Usuario/Rol:**
Alumno, mentor.

**Prioridad:**
Alta en Fase 2.

**Criterios de aceptación:**

* El alumno ve horarios disponibles.
* Reserva un horario.
* Mentor recibe confirmación.
* El sistema evita doble reserva.

**Dependencias:**
Calendario.

---

### RF-027: Registro de conclusiones de asesoría

**Descripción:**
El mentor debe registrar conclusiones y próximos pasos después de la asesoría.

**Usuario/Rol:**
Mentor.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* El mentor registra resumen.
* El alumno puede visualizarlo.
* El resumen queda asociado al proyecto.

**Dependencias:**
Sistema de asesorías.

---

## 15.8 Pagos y promociones

### RF-028: Pago por asesoría

**Descripción:**
El alumno debe poder pagar una asesoría o revisión + asesoría.

**Usuario/Rol:**
Alumno.

**Prioridad:**
Alta en Fase 2.

**Criterios de aceptación:**

* El sistema muestra monto.
* El usuario confirma pago.
* El sistema registra estado.
* El servicio se desbloquea al pagar.

**Dependencias:**
Pasarela Qulqi o pago simulado.

---

### RF-029: Historial de pagos

**Descripción:**
El usuario debe poder ver sus pagos realizados.

**Usuario/Rol:**
Alumno, institución, administrador.

**Prioridad:**
Media.

**Criterios de aceptación:**

* Se listan pagos.
* Se muestra estado.
* Se muestra concepto.
* Se muestra fecha.

**Dependencias:**
Sistema de pagos.

---

### RF-030: Promociones y descuentos

**Descripción:**
El administrador debe poder crear promociones o descuentos.

**Usuario/Rol:**
Administrador.

**Prioridad:**
Media.

**Criterios de aceptación:**

* Puede crear código.
* Define vigencia.
* Define descuento.
* El usuario puede aplicarlo al pago.

**Dependencias:**
Sistema de pagos.

---

## 15.9 Dashboards y reportes

### RF-031: Dashboard del alumno

**Descripción:**
El alumno debe tener un dashboard con avance, cursos, entregables, feedback y próximos pasos.

**Usuario/Rol:**
Alumno.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* Muestra curso activo.
* Muestra progreso.
* Muestra entregables pendientes.
* Muestra feedback reciente.
* Muestra próxima acción.

**Dependencias:**
Sistema de progreso.

---

### RF-032: Dashboard del mentor

**Descripción:**
El mentor debe ver entregables pendientes, alumnos asignados y asesorías.

**Usuario/Rol:**
Mentor.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* Lista entregables pendientes.
* Muestra prioridad.
* Muestra agenda.
* Permite entrar a revisión.

**Dependencias:**
Asignación de mentor.

---

### RF-033: Dashboard administrativo

**Descripción:**
El administrador debe tener una vista central de operación y métricas.

**Usuario/Rol:**
Administrador.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* Muestra usuarios registrados.
* Muestra cursos activos.
* Muestra entregables.
* Muestra pagos.
* Muestra métricas de progreso.

**Dependencias:**
Analítica.

---

### RF-034: Reportes de impacto

**Descripción:**
El sistema debe mostrar reportes sobre proyectos, cursos, asesorías y progreso.

**Usuario/Rol:**
Administrador, institución.

**Prioridad:**
Media.

**Criterios de aceptación:**

* Permite filtrar por fecha.
* Permite filtrar por curso o cohorte.
* Muestra proyectos enviados y aprobados.
* Permite exportación en fase posterior.

**Dependencias:**
Analítica.

---

## 15.10 Instituciones y cohortes

### RF-035: Creación de institución

**Descripción:**
El administrador debe poder crear una cuenta institucional.

**Usuario/Rol:**
Administrador.

**Prioridad:**
Media / Fase 3.

**Criterios de aceptación:**

* Se registra nombre de institución.
* Se asigna responsable.
* Se define estado.

**Dependencias:**
Gestión de usuarios.

---

### RF-036: Gestión de cohortes

**Descripción:**
La institución o administrador debe poder crear cohortes.

**Usuario/Rol:**
Institución, administrador.

**Prioridad:**
Media / Fase 3.

**Criterios de aceptación:**

* Se crea cohorte.
* Se agregan participantes.
* Se asignan cursos.
* Se visualiza progreso.

**Dependencias:**
Panel institucional.

---

### RF-037: Invitación de participantes

**Descripción:**
La institución debe poder invitar usuarios a una cohorte.

**Usuario/Rol:**
Institución.

**Prioridad:**
Media / Fase 3.

**Criterios de aceptación:**

* Se envía invitación.
* El usuario acepta.
* El usuario queda vinculado a la cohorte.

**Dependencias:**
Sistema de invitaciones.

---

## 15.11 Notificaciones y soporte

### RF-038: Notificaciones internas

**Descripción:**
El sistema debe notificar eventos importantes.

**Usuario/Rol:**
Todos.

**Prioridad:**
Alta.

**Criterios de aceptación:**

* Notifica entregable enviado.
* Notifica feedback recibido.
* Notifica asesoría confirmada.
* Notifica pago realizado.

**Dependencias:**
Eventos del sistema.

---

### RF-039: Soporte general

**Descripción:**
El usuario debe poder solicitar soporte.

**Usuario/Rol:**
Todos.

**Prioridad:**
Media.

**Criterios de aceptación:**

* Usuario crea solicitud.
* Admin puede responder.
* Estado cambia según avance.

**Dependencias:**
Módulo de soporte.

---

# 16. Requisitos no funcionales

## 16.1 Seguridad

* Control de acceso por roles.
* Protección de panel administrativo.
* Validación de permisos por entidad.
* No permitir acceso cruzado entre instituciones.
* Autenticación segura.
* Protección contra abuso de formularios.
* Registro de eventos críticos.
* Verificación de email obligatoria.
* Sesiones seguras.
* Protección de archivos privados.

## 16.2 Privacidad

* Los datos del alumno y su proyecto deben ser privados.
* Los mentores solo ven proyectos asignados.
* Las instituciones solo ven participantes asociados.
* Los archivos enviados deben respetar permisos.
* Debe existir consentimiento para términos y tratamiento de datos.

## 16.3 Rendimiento

* Carga rápida de landing.
* Dashboards con métricas optimizadas.
* Listados paginados para usuarios, cursos y entregables.
* Subida de archivos con límites definidos.
* Evitar cargas pesadas innecesarias en el panel del alumno.

## 16.4 Escalabilidad

* Preparar la lógica para múltiples cursos.
* Preparar múltiples cohortes.
* Preparar múltiples instituciones.
* Permitir múltiples mentores.
* Permitir crecimiento en entregables y archivos.
* Preparar separación funcional por módulos.

## 16.5 Usabilidad

* Cada pantalla debe mostrar una acción principal.
* El alumno siempre debe saber su próximo paso.
* El sistema debe reducir fricción.
* Los estados deben ser visibles.
* El progreso debe ser claro.
* Los mensajes deben ser humanos y orientados a acción.

## 16.6 Accesibilidad

* Contraste adecuado.
* Textos legibles.
* Botones con estados claros.
* Navegación por teclado en formularios.
* Etiquetas en inputs.
* Mensajes de error descriptivos.
* Evitar depender solo del color para estados.

## 16.7 Compatibilidad móvil

* Landing responsive.
* Dashboard del alumno responsive.
* Vista de cursos mobile-first.
* Entrega de proyectos usable desde móvil.
* Panel admin puede priorizar desktop, pero debe ser adaptable.

## 16.8 Mantenibilidad

* Reglas de negocio centralizadas funcionalmente.
* Contenido editable.
* Estados normalizados.
* Evitar lógica duplicada.
* Documentar módulos y flujos.

## 16.9 Auditoría

* Registrar cambios importantes:

  * Creación de cursos.
  * Edición de cursos.
  * Envíos de entregables.
  * Evaluaciones.
  * Pagos.
  * Cambios de rol.
  * Asignación de mentores.

## 16.10 Disponibilidad

* La plataforma debe estar disponible de forma continua.
* Debe manejar errores sin pérdida de entregables.
* Debe mostrar mensajes claros ante fallas.

## 16.11 Integridad de datos

* No debe perderse historial de entregables.
* No debe sobrescribirse feedback anterior.
* Los pagos deben mantener trazabilidad.
* El progreso debe calcularse de forma consistente.

## 16.12 Trazabilidad

* Todo entregable debe tener:

  * Alumno.
  * Curso.
  * Proyecto.
  * Fecha.
  * Estado.
  * Versión.
  * Evaluador.
  * Feedback asociado.

## 16.13 SEO para páginas públicas

* Landing indexable.
* Páginas públicas optimizadas.
* Títulos claros.
* Metadescripciones.
* URLs amigables.
* Contenido orientado a propuesta de valor.

## 16.14 Observabilidad

* Monitoreo de errores.
* Registro de eventos clave.
* Métricas de uso.
* Trazabilidad de pagos.
* Alertas ante fallas críticas.

## 16.15 Experiencia responsive

* Landing clara en móvil.
* Cards adaptables.
* Formularios cómodos.
* Tablas convertidas en cards en móvil.
* Menús colapsables.
* Acciones principales visibles.

---

# 17. Métricas de éxito

## 17.1 KPIs de producto

| KPI                             | Descripción                                      |
| ------------------------------- | ------------------------------------------------ |
| Usuarios registrados            | Cantidad total de cuentas creadas.               |
| Usuarios activos                | Usuarios con actividad reciente.                 |
| Cursos iniciados                | Cantidad de usuarios que empiezan cursos.        |
| Cursos completados              | Cursos con proyecto aprobado.                    |
| Entregables enviados            | Número de proyectos enviados.                    |
| Entregables aprobados           | Entregables que cumplen criterios.               |
| Entregables rechazados          | Entregables que requieren mejora.                |
| Tiempo promedio de finalización | Tiempo desde inicio del curso hasta aprobación.  |
| Retención                       | Usuarios que continúan después del primer curso. |

## 17.2 KPIs de negocio

| KPI                        | Descripción                                                  |
| -------------------------- | ------------------------------------------------------------ |
| Ingresos por asesorías     | Monto generado por sesiones pagadas.                         |
| Conversión gratuito a pago | Porcentaje de usuarios que pagan después del curso gratuito. |
| Suscripciones              | Cantidad de usuarios suscritos.                              |
| Pagos institucionales      | Ingresos B2B.                                                |
| Ticket promedio            | Monto promedio por pago.                                     |

## 17.3 KPIs de impacto

| KPI                        | Descripción                                  |
| -------------------------- | -------------------------------------------- |
| Proyectos implementados    | Proyectos que pasan a ejecución real.        |
| Programas sociales activos | Iniciativas sociales en funcionamiento.      |
| Validaciones realizadas    | Validaciones de mercado, modelo o propuesta. |
| Casos de éxito             | Historias verificables de avance.            |
| Nivel de avance real       | Progreso medido por entregables aprobados.   |

## 17.4 KPIs de mentores

| KPI                         | Descripción                        |
| --------------------------- | ---------------------------------- |
| Tiempo promedio de revisión | Tiempo desde envío hasta feedback. |
| Feedbacks emitidos          | Cantidad de revisiones realizadas. |
| Asesorías realizadas        | Sesiones completadas.              |
| Satisfacción del alumno     | Valoración de asesoría y feedback. |

---

# 18. Analítica y dashboards

## 18.1 Dashboard del alumno

Debe mostrar:

* Curso activo.
* Porcentaje de avance.
* Estado del proyecto.
* Entregable pendiente.
* Feedback reciente.
* Próxima acción.
* Cursos bloqueados y razón.
* Asesorías disponibles.
* Historial de entregables.
* Pagos recientes.
* Recursos recomendados.

### Acciones rápidas

* Continuar curso.
* Enviar entregable.
* Ver feedback.
* Solicitar asesoría.
* Descargar plantilla.
* Ver mi progreso.

---

## 18.2 Dashboard del mentor

Debe mostrar:

* Entregables pendientes.
* Entregables en revisión.
* Alumnos asignados.
* Próximas asesorías.
* Feedbacks emitidos.
* Tiempo promedio de revisión.
* Entregables vencidos o con prioridad.
* Historial de evaluaciones.

### Acciones rápidas

* Revisar entregable.
* Aprobar.
* Solicitar corrección.
* Agendar asesoría.
* Registrar conclusiones.

---

## 18.3 Dashboard del administrador

Inspirado en las imágenes de dashboards oscuros, debe mostrar tarjetas de métricas, gráficas, tablas, quick actions, actividad reciente, reportes y panel lateral. Las imágenes de referencia muestran un admin panel con métricas, actividad, estado del sistema y navegación lateral, útil como dirección visual para esta vista. 

Debe mostrar:

* Usuarios registrados.
* Usuarios activos.
* Cursos activos.
* Entregables enviados.
* Entregables pendientes.
* Proyectos aprobados.
* Ingresos por asesorías.
* Pagos pendientes/fallidos.
* Conversión gratuito a pago.
* Mentores activos.
* Tiempo promedio de revisión.
* Reportes generados.
* Actividad reciente.

### Gráficas

* Crecimiento de usuarios.
* Tasa de finalización.
* Entregables aprobados vs rechazados.
* Ingresos por periodo.
* Asesorías por mentor.
* Progreso por curso.
* Conversión por etapa.

### Tablas

* Usuarios recientes.
* Entregables pendientes.
* Pagos recientes.
* Cursos con mayor avance.
* Mentores con carga alta.
* Instituciones activas.

### Acciones rápidas

* Crear curso.
* Crear usuario.
* Asignar mentor.
* Generar reporte.
* Crear promoción.
* Revisar pagos.
* Subir recurso.

---

## 18.4 Dashboard institucional

Debe mostrar:

* Cohortes activas.
* Participantes inscritos.
* Avance promedio.
* Cursos asignados.
* Proyectos enviados.
* Proyectos aprobados.
* Usuarios en riesgo.
* Reportes de impacto.
* Asesorías grupales.
* Comparativa entre cohortes.

### Filtros

* Cohorte.
* Curso.
* Estado.
* Fecha.
* Nivel.
* Mentor.
* Tipo de proyecto.

---

# 19. Sistema de estados

## 19.1 Usuario

* Pendiente de verificación.
* Activo.
* Inactivo.
* Suspendido.
* Pendiente de aprobación.
* Eliminado lógico.

## 19.2 Curso

* Borrador.
* Publicado.
* Bloqueado.
* Disponible.
* En progreso.
* Completado.
* Archivado.

## 19.3 Módulo

* No iniciado.
* En progreso.
* Completado.
* Bloqueado.

## 19.4 Proyecto

* Idea.
* En estructuración.
* En validación.
* En implementación.
* En revisión.
* Aprobado.
* Requiere mejora.
* Archivado.

## 19.5 Entregable

* Borrador.
* Enviado.
* En revisión.
* Aprobado.
* Rechazado.
* Corrección solicitada.
* Reenviado.
* Cerrado.

## 19.6 Evaluación

* Pendiente.
* En proceso.
* Aprobada.
* Rechazada.
* Observada.
* Cerrada.

## 19.7 Asesoría

* Solicitada.
* Pendiente de pago.
* Pagada.
* Confirmada.
* Realizada.
* Cancelada.
* Reprogramada.
* No asistió.

## 19.8 Pago

* Pendiente.
* Procesando.
* Pagado.
* Fallido.
* Cancelado.
* Reembolsado.
* En disputa.

## 19.9 Cohorte

* Borrador.
* Activa.
* Pausada.
* Finalizada.
* Archivada.

## 19.10 Notificación

* No leída.
* Leída.
* Archivada.
* Accionada.

---

# 20. Entidades funcionales del sistema

> Esta sección no define base de datos técnica. Define entidades funcionales necesarias para que después se diseñe la arquitectura y modelo de datos.

## 20.1 Usuario

| Campo                | Detalle                                                      |
| -------------------- | ------------------------------------------------------------ |
| **Descripción**      | Persona que accede a la plataforma.                          |
| **Campos sugeridos** | Nombre, email, rol, estado, fecha de registro, verificación. |
| **Relaciones**       | Perfil, rol, proyectos, cursos, pagos, entregables.          |

## 20.2 Rol

| Campo                | Detalle                        |
| -------------------- | ------------------------------ |
| **Descripción**      | Define permisos del usuario.   |
| **Campos sugeridos** | Nombre, descripción, permisos. |
| **Relaciones**       | Usuarios.                      |

## 20.3 Perfil

| Campo                | Detalle                                               |
| -------------------- | ----------------------------------------------------- |
| **Descripción**      | Información adicional del usuario.                    |
| **Campos sugeridos** | Foto, biografía, teléfono, especialidad, institución. |
| **Relaciones**       | Usuario.                                              |

## 20.4 Curso

| Campo                | Detalle                                                            |
| -------------------- | ------------------------------------------------------------------ |
| **Descripción**      | Ruta de aprendizaje aplicada.                                      |
| **Campos sugeridos** | Título, descripción, objetivo, categoría, nivel, estado, duración. |
| **Relaciones**       | Categoría, módulos, proyecto, recursos, entregables.               |

## 20.5 Categoría

| Campo                | Detalle                      |
| -------------------- | ---------------------------- |
| **Descripción**      | Agrupa cursos por área.      |
| **Campos sugeridos** | Nombre, descripción, estado. |
| **Relaciones**       | Cursos.                      |

## 20.6 Módulo

| Campo                | Detalle                             |
| -------------------- | ----------------------------------- |
| **Descripción**      | Unidad interna de un curso.         |
| **Campos sugeridos** | Título, descripción, orden, estado. |
| **Relaciones**       | Curso, lecciones, recursos.         |

## 20.7 Lección

| Campo                | Detalle                                    |
| -------------------- | ------------------------------------------ |
| **Descripción**      | Contenido específico dentro de un módulo.  |
| **Campos sugeridos** | Título, contenido, video, duración, orden. |
| **Relaciones**       | Módulo, recursos.                          |

## 20.8 Recurso

| Campo                | Detalle                                          |
| -------------------- | ------------------------------------------------ |
| **Descripción**      | Plantilla, archivo, guía o material descargable. |
| **Campos sugeridos** | Nombre, tipo, archivo, descripción, visibilidad. |
| **Relaciones**       | Curso, módulo, lección.                          |

## 20.9 Proyecto

| Campo                | Detalle                                                  |
| -------------------- | -------------------------------------------------------- |
| **Descripción**      | Emprendimiento o programa social del alumno.             |
| **Campos sugeridos** | Nombre, descripción, etapa, problema, solución, público. |
| **Relaciones**       | Usuario, entregables, feedback, asesorías.               |

## 20.10 Entregable

| Campo                | Detalle                                                |
| -------------------- | ------------------------------------------------------ |
| **Descripción**      | Evidencia enviada por el alumno.                       |
| **Campos sugeridos** | Título, descripción, archivos, links, estado, versión. |
| **Relaciones**       | Proyecto, curso, evaluación, feedback.                 |

## 20.11 Evaluación

| Campo                | Detalle                                          |
| -------------------- | ------------------------------------------------ |
| **Descripción**      | Resultado de revisión del entregable.            |
| **Campos sugeridos** | Estado, criterios, puntuación, evaluador, fecha. |
| **Relaciones**       | Entregable, mentor.                              |

## 20.12 Feedback

| Campo                | Detalle                                                  |
| -------------------- | -------------------------------------------------------- |
| **Descripción**      | Retroalimentación emitida por mentor.                    |
| **Campos sugeridos** | Comentarios, recomendaciones, próximos pasos, prioridad. |
| **Relaciones**       | Evaluación, entregable, mentor, alumno.                  |

## 20.13 Mentoría

| Campo                | Detalle                                            |
| -------------------- | -------------------------------------------------- |
| **Descripción**      | Sesión de asesoría estratégica.                    |
| **Campos sugeridos** | Fecha, hora, mentor, alumno, estado, conclusiones. |
| **Relaciones**       | Usuario, mentor, pago, proyecto.                   |

## 20.14 Pago

| Campo                | Detalle                                                     |
| -------------------- | ----------------------------------------------------------- |
| **Descripción**      | Transacción por asesoría, revisión, suscripción o licencia. |
| **Campos sugeridos** | Monto, moneda, estado, concepto, método, fecha.             |
| **Relaciones**       | Usuario, mentoría, promoción, suscripción.                  |

## 20.15 Suscripción

| Campo                | Detalle                                        |
| -------------------- | ---------------------------------------------- |
| **Descripción**      | Plan recurrente futuro.                        |
| **Campos sugeridos** | Plan, precio, estado, inicio, fin, beneficios. |
| **Relaciones**       | Usuario, pagos.                                |

## 20.16 Institución

| Campo                | Detalle                                   |
| -------------------- | ----------------------------------------- |
| **Descripción**      | Organización B2B.                         |
| **Campos sugeridos** | Nombre, tipo, responsable, estado, plan.  |
| **Relaciones**       | Cohortes, participantes, pagos, reportes. |

## 20.17 Cohorte

| Campo                | Detalle                                                   |
| -------------------- | --------------------------------------------------------- |
| **Descripción**      | Grupo de participantes asociado a institución o programa. |
| **Campos sugeridos** | Nombre, fecha inicio, fecha fin, estado, curso asignado.  |
| **Relaciones**       | Institución, participantes, reportes.                     |

## 20.18 Participante

| Campo                | Detalle                             |
| -------------------- | ----------------------------------- |
| **Descripción**      | Usuario vinculado a una cohorte.    |
| **Campos sugeridos** | Usuario, cohorte, estado, progreso. |
| **Relaciones**       | Usuario, cohorte.                   |

## 20.19 Reporte

| Campo                | Detalle                               |
| -------------------- | ------------------------------------- |
| **Descripción**      | Documento o vista de métricas.        |
| **Campos sugeridos** | Tipo, fecha, filtros, formato, autor. |
| **Relaciones**       | Usuario, institución, cohorte.        |

## 20.20 Notificación

| Campo                | Detalle                               |
| -------------------- | ------------------------------------- |
| **Descripción**      | Aviso interno o externo.              |
| **Campos sugeridos** | Título, mensaje, tipo, estado, fecha. |
| **Relaciones**       | Usuario, entidad relacionada.         |

## 20.21 Archivo

| Campo                | Detalle                                              |
| -------------------- | ---------------------------------------------------- |
| **Descripción**      | Documento subido al sistema.                         |
| **Campos sugeridos** | Nombre, tipo, tamaño, URL, propietario, visibilidad. |
| **Relaciones**       | Usuario, recurso, entregable.                        |

## 20.22 Promoción

| Campo                | Detalle                                |
| -------------------- | -------------------------------------- |
| **Descripción**      | Descuento aplicable a pagos.           |
| **Campos sugeridos** | Código, tipo, valor, vigencia, límite. |
| **Relaciones**       | Pago, usuario.                         |

## 20.23 Diagnóstico inicial

| Campo                | Detalle                                                        |
| -------------------- | -------------------------------------------------------------- |
| **Descripción**      | Respuestas iniciales del alumno para personalizar experiencia. |
| **Campos sugeridos** | Nivel, objetivo, tipo de proyecto, etapa, necesidad principal. |
| **Relaciones**       | Usuario, proyecto, recomendación de curso.                     |

---

# 21. Experiencia de usuario UX

## 21.1 Principios UX

| Principio                | Aplicación en SUClassroom                                               |
| ------------------------ | ----------------------------------------------------------------------- |
| Simplicidad              | Evitar pantallas saturadas; cada vista debe tener una acción principal. |
| Claridad                 | Mostrar siempre estado, avance y próximo paso.                          |
| Acción                   | Cada módulo debe conducir a una tarea concreta.                         |
| Progreso visible         | Barras, hitos, estados, desbloqueos y checklists.                       |
| Motivación               | Mensajes positivos y avance tangible.                                   |
| Feedback rápido          | Notificaciones claras cuando hay revisión o cambios.                    |
| Reducción de fricción    | Formularios guiados, plantillas, CTA visibles.                          |
| Orientación a resultados | Medir entregables, no solo videos vistos.                               |

## 21.2 Tono de comunicación

El tono debe ser:

* Claro.
* Motivador.
* Profesional.
* Estratégico.
* Cercano.
* Orientado a acción.
* Sin exceso de lenguaje académico.

## 21.3 Microcopy recomendado

### Registro

* “Crea tu cuenta y empieza a construir tu proyecto.”
* “Tu avance dependerá de lo que implementes, no solo de lo que veas.”

### Onboarding

* “Cuéntanos en qué etapa está tu proyecto.”
* “Con esta información podremos recomendarte el mejor primer paso.”

### Curso

* “Este curso termina con un entregable práctico.”
* “Completa las lecciones y aplica lo aprendido en tu proyecto.”

### Entregable

* “Envía tu avance para recibir revisión.”
* “Puedes guardar tu entregable como borrador y enviarlo cuando esté listo.”

### Feedback

* “Tu mentor ha dejado observaciones para mejorar tu proyecto.”
* “Corrige los puntos indicados y vuelve a enviar tu entregable.”

### Rechazo

* “Tu proyecto aún necesita ajustes. No estás empezando de cero: tienes una guía clara para mejorarlo.”

### Aprobación

* “Proyecto aprobado. Has completado este curso con evidencia real de avance.”

### Desbloqueo

* “Nuevo curso desbloqueado. Estás listo para el siguiente nivel.”

### Pago

* “Estás pagando por acompañamiento estratégico para avanzar con mayor claridad.”

---

# 22. Dirección visual UI

## 22.1 Análisis de imágenes adjuntas

Las imágenes de referencia muestran dos líneas visuales principales:

1. **Dashboard oscuro tipo glassmorphism/profesional**

   * Sidebar lateral.
   * Topbar.
   * Tarjetas de métricas.
   * Gráficas.
   * Tablas.
   * Badges de estado.
   * Modales con fondo difuminado.
   * Calendario.
   * Reportes.
   * File manager.
   * Mensajería.
   * Configuración.

2. **Landing educativa moderna**

   * Fondo oscuro.
   * Cards visuales de cursos.
   * Planes de suscripción.
   * FAQ.
   * Testimonios.
   * CTA claros.
   * Estética de academia digital.

## 22.2 Estilo visual recomendado

| Área                     | Estilo recomendado                                            |
| ------------------------ | ------------------------------------------------------------- |
| Landing pública          | Clara, moderna, confiable, con secciones comerciales.         |
| Dashboard administrativo | Oscuro, glassmorphism, profesional, denso en métricas.        |
| Panel del alumno         | Claro o híbrido, amigable, motivador y orientado al progreso. |
| Panel del mentor         | Productivo, ordenado, con foco en tareas pendientes.          |
| Panel institucional      | Corporativo, claro, con reportes y métricas.                  |

## 22.3 Cuándo usar modo claro

* Landing pública.
* Onboarding.
* Panel del alumno si se busca mayor claridad.
* Formularios extensos.
* Lectura de contenido educativo.
* Recursos y plantillas.

## 22.4 Cuándo usar modo oscuro

* Dashboard administrativo.
* Analítica.
* Reportes.
* Panel de operaciones.
* File manager.
* Calendario administrativo.
* Panel de mentor si se quiere mantener estética profesional.

## 22.5 Paleta sugerida

| Uso             | Color sugerido                                 |
| --------------- | ---------------------------------------------- |
| Primario        | Azul intenso                                   |
| Secundario      | Morado                                         |
| Éxito           | Verde                                          |
| Advertencia     | Amarillo / ámbar                               |
| Error           | Rojo suave                                     |
| Fondo oscuro    | Azul noche / negro azulado                     |
| Fondo claro     | Blanco / gris muy claro                        |
| Texto principal | Blanco en dark mode, gris oscuro en light mode |
| Bordes          | Gris azulado translúcido                       |

## 22.6 Componentes principales

### Cards

* Bordes redondeados.
* Sombra suave.
* Estados visuales claros.
* Indicadores de avance.
* CTA visible.

### Sidebar

* Navegación por rol.
* Íconos.
* Estado activo.
* Perfil inferior.
* Logout visible.

### Topbar

* Buscador.
* Notificaciones.
* Acceso a perfil.
* Fecha o contexto.
* Acciones rápidas según rol.

### Modales

* Fondo difuminado.
* Título claro.
* Botones primario/secundario.
* Cierre visible.
* Validaciones inline.

### Tablas

* Filtros.
* Estados con badges.
* Acciones por fila.
* Paginación.
* Diseño responsive.

### Badges

* Aprobado.
* Rechazado.
* En revisión.
* Pendiente.
* Completado.
* Bloqueado.
* Pagado.
* Fallido.

### Gráficas

* Líneas para progreso.
* Barras para comparación.
* Donut para distribución.
* Cards de KPI.
* Filtros por fecha.

### Botones

* Primario: acción principal.
* Secundario: cancelar o volver.
* Terciario: ver detalle.
* Destructivo: eliminar o suspender.

### Formularios

* Campos claros.
* Ayuda contextual.
* Validaciones visibles.
* Guardado como borrador.
* Estado de carga.

### File manager

* Carpetas.
* Archivos por tipo.
* Recursos.
* Entregables.
* Plantillas.
* Permisos.

### Calendario

* Vista mensual.
* Próximas asesorías.
* Horarios disponibles.
* Filtros por mentor.
* Estados de reserva.

### Dashboard

* Cards de métricas.
* Gráficas.
* Tablas.
* Actividad reciente.
* Acciones rápidas.

### Responsive

* Sidebar colapsable.
* Cards apiladas.
* Tablas convertidas a cards.
* CTA sticky cuando sea útil.
* Formularios optimizados para móvil.

---

# 23. Priorización MoSCoW

## Must have

* Registro/login.
* Verificación de email.
* Roles base.
* Onboarding.
* Diagnóstico inicial.
* Primer curso gratuito.
* Módulos y lecciones.
* Recursos descargables.
* Proyecto práctico obligatorio.
* Envío de entregables.
* Revisión por mentor.
* Feedback.
* Estados de entregables.
* Reenvío.
* Aprobación.
* Desbloqueo básico.
* Dashboard alumno.
* Dashboard mentor.
* Dashboard admin.
* Gestión de cursos.
* Gestión de usuarios.
* Reportes básicos.

## Should have

* Pagos con Qulqi.
* Agenda de asesorías.
* Promociones.
* Historial de pagos.
* File manager.
* Notificaciones por email.
* Rúbricas más avanzadas.
* Asignación de mentores.
* Panel institucional básico.

## Could have

* Chat interno.
* WhatsApp.
* Comunidad.
* Certificados.
* Exportación avanzada de reportes.
* Suscripciones.
* Mentorías grupales.
* Programas personalizados.
* Recursos premium.

## Won’t have for MVP

* IA avanzada.
* Marketplace abierto.
* App móvil nativa.
* Gamificación compleja.
* Certificación avanzada.
* Multi-idioma.
* Automatización predictiva.
* Videollamadas propias desarrolladas desde cero.
* Integraciones empresariales complejas.

---

# 24. Roadmap por fases

## Fase 0: Preparación funcional

| Campo                   | Detalle                                                      |
| ----------------------- | ------------------------------------------------------------ |
| **Objetivo**            | Validar alcance, reglas y contenido inicial.                 |
| **Funcionalidades**     | PRD, flujos, cursos iniciales, criterios, roles, wireframes. |
| **Resultado esperado**  | Documento funcional listo para arquitectura técnica.         |
| **Riesgos**             | Ambigüedad en reglas de desbloqueo y pagos.                  |
| **Criterios de salida** | Cliente aprueba MVP, reglas y pantallas prioritarias.        |

## Fase 1: MVP base

| Campo                   | Detalle                                                                       |
| ----------------------- | ----------------------------------------------------------------------------- |
| **Objetivo**            | Validar ejecución guiada.                                                     |
| **Funcionalidades**     | Registro, onboarding, curso gratuito, entregables, feedback, dashboards base. |
| **Resultado esperado**  | Usuarios pueden aprender, aplicar, entregar y recibir revisión.               |
| **Riesgos**             | Usuarios no envían entregables.                                               |
| **Criterios de salida** | Primeros usuarios completan curso con proyecto aprobado.                      |

## Fase 2: Mentorías y pagos

| Campo                   | Detalle                                                              |
| ----------------------- | -------------------------------------------------------------------- |
| **Objetivo**            | Monetizar acompañamiento estratégico.                                |
| **Funcionalidades**     | Qulqi, agenda, selección de mentor, historial de pagos, promociones. |
| **Resultado esperado**  | Primeras conversiones de gratuito a pago.                            |
| **Riesgos**             | Fricción en pago o baja percepción de valor.                         |
| **Criterios de salida** | Usuarios pagan por revisión + asesoría.                              |

## Fase 3: Instituciones y reportes

| Campo                   | Detalle                                                      |
| ----------------------- | ------------------------------------------------------------ |
| **Objetivo**            | Escalar modelo B2B.                                          |
| **Funcionalidades**     | Instituciones, cohortes, participantes, reportes de impacto. |
| **Resultado esperado**  | Instituciones monitorean grupos y resultados.                |
| **Riesgos**             | Exceso de personalización institucional.                     |
| **Criterios de salida** | Primera cohorte institucional activa y reportada.            |

## Fase 4: Automatización, analítica avanzada e IA

| Campo                   | Detalle                                                                 |
| ----------------------- | ----------------------------------------------------------------------- |
| **Objetivo**            | Mejorar eficiencia y personalización.                                   |
| **Funcionalidades**     | Recomendaciones, alertas de riesgo, analítica avanzada, automatización. |
| **Resultado esperado**  | Mejor seguimiento y menor carga operativa.                              |
| **Riesgos**             | Automatizar antes de validar procesos humanos.                          |
| **Criterios de salida** | Automatizaciones apoyan procesos ya validados.                          |

## Fase 5: Escalamiento comercial

| Campo                   | Detalle                                                           |
| ----------------------- | ----------------------------------------------------------------- |
| **Objetivo**            | Escalar adquisición, ingresos e impacto.                          |
| **Funcionalidades**     | Suscripciones, paquetes, licencias, comunidad, programas premium. |
| **Resultado esperado**  | Modelo comercial repetible.                                       |
| **Riesgos**             | Crecimiento sin calidad de mentoría.                              |
| **Criterios de salida** | Ingresos recurrentes y casos de éxito documentados.               |

---

# 25. Riesgos del producto

| Riesgo                            | Descripción                                   | Impacto | Probabilidad | Mitigación                                                  |
| --------------------------------- | --------------------------------------------- | ------: | -----------: | ----------------------------------------------------------- |
| Usuarios no ejecutan              | Ven contenido, pero no entregan proyectos.    |    Alto |         Alta | Diseñar tareas pequeñas, progreso visible y recordatorios.  |
| Baja conversión a asesorías       | Usuarios no pagan después del curso gratuito. |    Alto |        Media | Comunicar valor antes del pago y mostrar beneficios claros. |
| Falta de mentores                 | No hay capacidad para revisar rápido.         |    Alto |        Media | Limitar cupos, asignar carga, crear SLA de revisión.        |
| Feedback lento                    | El usuario pierde motivación.                 |    Alto |        Media | Dashboard de pendientes y alertas a mentores.               |
| Experiencia compleja              | Muchos pasos generan abandono.                |    Alto |        Media | UX guiada, CTA único y onboarding claro.                    |
| Costos de video                   | Almacenar videos puede encarecer operación.   |   Medio |        Media | Evaluar proveedor externo antes de hosting propio.          |
| Fricción en pagos                 | Fallos o pasos confusos reducen conversión.   |    Alto |        Media | Pago simple, confirmación clara y soporte.                  |
| Baja retención                    | Usuario completa primer curso y no continúa.  |    Alto |        Media | Desbloqueo motivador y rutas claras.                        |
| Falta de claridad en desbloqueos  | Usuario no entiende por qué no avanza.        |   Medio |         Alta | Mostrar checklist de desbloqueo.                            |
| Personalización excesiva B2B      | Instituciones piden flujos únicos.            |    Alto |        Media | Definir límites de personalización por fase.                |
| Calidad inconsistente de mentores | Feedback desigual afecta confianza.           |    Alto |        Media | Rúbricas, entrenamiento y supervisión.                      |
| Métricas mal enfocadas            | Se mide consumo en vez de ejecución.          |   Medio |        Media | KPIs centrados en entregables y proyectos.                  |

---

# 26. Supuestos y decisiones pendientes

## 26.1 Supuestos

* El primer curso gratuito será obligatorio para validar el modelo.
* El curso se completa solo con proyecto aprobado.
* El pago ocurre después del envío del proyecto.
* El pago desbloquea revisión + asesoría.
* Los mentores revisan proyectos en el MVP, pero no crean cursos.
* Los administradores crean cursos en el MVP.
* Las instituciones entran con más fuerza desde Fase 3.
* Qulqi será la pasarela de pagos deseada.
* Los cursos serán mixtos: grabados + asesoría en vivo.
* El foco inicial será emprendedores principiantes y líderes de programas sociales.

## 26.2 Decisiones pendientes

| Tema                       | Decisión pendiente                                                   |
| -------------------------- | -------------------------------------------------------------------- |
| Stack técnico              | Confirmar tecnología final en fase de arquitectura.                  |
| Proveedor de videos        | Confirmar si videos se alojan dentro o fuera de la plataforma.       |
| Qulqi                      | Confirmar integración exacta y alcance inicial.                      |
| Calendario                 | Confirmar si se usará herramienta externa o módulo propio.           |
| WhatsApp                   | Confirmar si será solo enlace/manual o integración formal.           |
| Certificados               | Confirmar si existirán y en qué fase.                                |
| Suscripciones              | Confirmar planes, precios y beneficios.                              |
| Política de reembolsos     | Definir reglas para asesorías pagadas.                               |
| Desbloqueo                 | Confirmar si siempre requiere asesoría pagada o depende del curso.   |
| Cantidad inicial de cursos | Definir cursos del MVP.                                              |
| Cantidad de mentores       | Definir operación inicial.                                           |
| Flujo institucional        | Confirmar si entra en MVP o Fase 3.                                  |
| Modelo de precios final    | Confirmar precios por asesoría, paquete y suscripción.               |
| Revisión gratuita          | Confirmar si el primer entregable tendrá revisión gratuita o pagada. |
| Límite de reenvíos         | Definir cuántas veces puede reenviar un alumno.                      |
| SLA de revisión            | Definir tiempo máximo de feedback.                                   |
| Soporte                    | Definir canales iniciales.                                           |
| Comunidad                  | Confirmar si entra en fases posteriores.                             |
| Reportes exportables       | Confirmar formatos requeridos.                                       |

---

# 27. Criterios de aceptación globales del MVP

El MVP se considerará listo cuando:

1. Un usuario pueda registrarse.
2. Un usuario pueda verificar su email.
3. Un alumno pueda completar onboarding.
4. Un alumno pueda registrar su proyecto.
5. Un alumno pueda acceder al primer curso gratuito.
6. Un alumno pueda ver módulos y lecciones.
7. Un alumno pueda descargar recursos.
8. Un alumno pueda crear un entregable.
9. Un alumno pueda enviar un entregable.
10. Un mentor pueda ver entregables pendientes.
11. Un mentor pueda revisar entregables.
12. Un mentor pueda aprobar o rechazar.
13. Un mentor pueda emitir feedback estructurado.
14. Un alumno pueda ver feedback recibido.
15. Un alumno pueda reenviar un entregable corregido.
16. El sistema pueda marcar un curso como completado por proyecto aprobado.
17. El sistema pueda desbloquear el siguiente curso según regla definida.
18. El administrador pueda crear y editar cursos.
19. El administrador pueda gestionar usuarios.
20. El administrador pueda ver métricas básicas.
21. El sistema tenga dashboards diferenciados para alumno, mentor y administrador.
22. El sistema tenga estados claros.
23. El sistema registre historial de entregables y feedback.
24. La experiencia sea responsive para alumno y landing.
25. La plataforma pueda demostrar el flujo central:
    **aprender → aplicar → entregar → recibir feedback → mejorar → aprobar → avanzar.**

---

# 28. Entregable final

Este PRD define el producto SUClassroom como una plataforma SaaS e-learning de ejecución guiada, enfocada en transformar conocimiento en proyectos reales mediante cursos prácticos, entregables, feedback, mentorías, asesorías pagadas y validación de avance.

El documento está preparado para ser usado como base antes de crear:

1. Arquitectura técnica.
2. Estructura de carpetas.
3. Modelo de datos.
4. Fases de implementación.
5. Prompts posteriores para Codex.

---

# 29. Resumen ejecutivo para Codex

## 29.1 Qué se debe construir

Codex deberá construir una plataforma llamada **SUClassroom**, orientada a e-learning aplicado, donde el usuario no solo consume cursos, sino que desarrolla un proyecto real, envía entregables, recibe feedback de mentores, corrige, aprueba y desbloquea nuevos cursos.

Debe existir:

* Landing pública.
* Registro/login.
* Onboarding.
* Diagnóstico inicial.
* Dashboard de alumno.
* Catálogo de cursos.
* Curso gratuito inicial.
* Módulos/lecciones.
* Recursos/plantillas.
* Proyecto del alumno.
* Entregables.
* Revisión por mentor.
* Feedback estructurado.
* Estados de avance.
* Dashboard de mentor.
* Dashboard administrativo.
* Gestión de usuarios.
* Gestión de cursos.
* Reportes básicos.
* Solicitud de asesoría.
* Base funcional para pagos con Qulqi en fase posterior o inicial según decisión.

## 29.2 Qué no se debe construir todavía

No construir en el MVP:

* IA avanzada.
* Marketplace abierto de mentores.
* App móvil nativa.
* Comunidad compleja.
* Certificados avanzados.
* Gamificación avanzada.
* Multi-idioma.
* Videollamadas propias desde cero.
* Automatizaciones predictivas.
* Sistema institucional avanzado completo si no se prioriza en MVP.

## 29.3 Flujos prioritarios

1. Registro → verificación → onboarding.
2. Onboarding → diagnóstico → primer curso gratuito.
3. Curso → módulos → recursos → entregable.
4. Entregable → revisión mentor → feedback.
5. Rechazo → corrección → reenvío.
6. Aprobación → curso completado → desbloqueo.
7. Solicitud de asesoría → pago/revisión → mentoría.
8. Admin → crear curso → asignar mentor → revisar métricas.

## 29.4 Roles que deben existir

* Alumno.
* Mentor.
* Administrador.
* Institución / ONG / empresa, mínimo preparado funcionalmente para fase posterior.

## 29.5 Pantallas obligatorias

### Alumno

* Landing.
* Registro.
* Login.
* Onboarding.
* Dashboard.
* Catálogo.
* Detalle de curso.
* Lección.
* Proyecto.
* Enviar entregable.
* Feedback.
* Solicitar asesoría.
* Perfil.

### Mentor

* Dashboard.
* Entregables pendientes.
* Detalle de entregable.
* Evaluación.
* Feedback.
* Agenda.

### Administrador

* Dashboard.
* Usuarios.
* Cursos.
* Módulos.
* Recursos.
* Mentores.
* Entregables.
* Pagos.
* Reportes.
* Configuración.

## 29.6 Reglas de negocio que no se deben romper

* El usuario debe registrarse.
* Se requiere verificación de email.
* No se permite compartir cuentas.
* El primer curso puede ser gratuito.
* Cada curso debe tener proyecto práctico obligatorio.
* Un curso se completa solo cuando el proyecto es aprobado.
* El usuario puede reprobar.
* Si reprueba, recibe feedback y puede reenviar.
* El pago ocurre después de enviar proyecto.
* El pago desbloquea revisión + asesoría.
* Luego de asesoría o aprobación puede desbloquearse el siguiente curso.
* En MVP, los administradores crean cursos.
* En MVP, los mentores revisan y evalúan.
* El progreso debe medirse por ejecución, no solo por videos vistos.

## 29.7 Módulos que Codex debe implementar primero

Orden recomendado:

1. Autenticación y roles.
2. Onboarding y diagnóstico.
3. Gestión de cursos básica.
4. Módulos y lecciones.
5. Recursos y plantillas.
6. Proyecto del alumno.
7. Sistema de entregables.
8. Sistema de evaluación.
9. Sistema de feedback.
10. Dashboard del alumno.
11. Dashboard del mentor.
12. Dashboard administrativo.
13. Notificaciones básicas.
14. Solicitud de asesorías.
15. Pagos / simulación de pagos.
16. Reportes básicos.

**Prioridad máxima del MVP:** validar que un usuario pueda completar el ciclo real de ejecución:

**aprender → aplicar → entregar → recibir feedback → mejorar → aprobar → avanzar.**
