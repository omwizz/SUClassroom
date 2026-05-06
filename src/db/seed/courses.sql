INSERT INTO "course_categories" ("id", "name", "slug", "description", "color", "icon", "is_active")
VALUES
  ('11111111-1111-4111-8111-111111111111', 'Validación de ideas', 'validacion-de-ideas', 'Primeras pruebas para transformar una intuición en evidencia accionable.', '#38bdf8', 'Lightbulb', true),
  ('22222222-2222-4222-8222-222222222222', 'Modelo de negocio', 'modelo-de-negocio', 'Diseño simple de propuesta, clientes, canales e ingresos.', '#a78bfa', 'BriefcaseBusiness', true),
  ('33333333-3333-4333-8333-333333333333', 'Marketing y ventas', 'marketing-y-ventas', 'Mensajes, canales y conversaciones comerciales iniciales.', '#34d399', 'Megaphone', true),
  ('44444444-4444-4444-8444-444444444444', 'Finanzas básicas', 'finanzas-basicas', 'Costos, precios y lectura financiera para decisiones tempranas.', '#fbbf24', 'LineChart', true),
  ('55555555-5555-4555-8555-555555555555', 'Operaciones', 'operaciones', 'Procesos, calidad y entrega consistente en proyectos reales.', '#fb7185', 'Settings2', true),
  ('66666666-6666-4666-8666-666666666666', 'Programas sociales', 'programas-sociales', 'Ejecución de iniciativas con impacto, evidencia y seguimiento.', '#2dd4bf', 'Handshake', true)
ON CONFLICT ("slug") DO NOTHING;

INSERT INTO "courses" (
  "id",
  "category_id",
  "title",
  "slug",
  "subtitle",
  "description",
  "objective",
  "expected_result",
  "target_audience",
  "level",
  "status",
  "thumbnail_url",
  "estimated_duration_minutes",
  "is_free",
  "sort_order",
  "published_at"
)
VALUES (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  '11111111-1111-4111-8111-111111111111',
  'De la idea a la validación inicial',
  'de-la-idea-a-la-validacion-inicial',
  'Convierte una idea temprana en hipótesis, cliente objetivo y primera evidencia.',
  'Curso de demostración para guiar al estudiante desde una idea inicial hasta una validación ligera y accionable.',
  'Ordenar la idea, definir el problema y ejecutar una primera prueba con usuarios reales o potenciales.',
  'Primer entregable de validación con hipótesis, aprendizaje y siguiente acción.',
  'Estudiantes y emprendedores que necesitan pasar de intención a evidencia.',
  'beginner',
  'published',
  null,
  240,
  true,
  1,
  now()
)
ON CONFLICT ("slug") DO NOTHING;

INSERT INTO "course_modules" ("id", "course_id", "title", "description", "sort_order", "is_required")
VALUES
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb1', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Diagnóstico de la idea', 'Aterriza el punto de partida antes de invertir tiempo en construir.', 1, true),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Problema y cliente objetivo', 'Define para quién existe el problema y qué señales lo validan.', 2, true),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb3', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Propuesta de valor', 'Conecta problema, alternativa y promesa de solución.', 3, true),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb4', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Primer entregable de validación', 'Ordena evidencia, aprendizaje y mejoras para avanzar.', 4, true)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "lessons" ("id", "module_id", "title", "slug", "description", "content", "video_provider", "estimated_duration_minutes", "lesson_type", "sort_order", "is_preview", "is_required")
VALUES
  ('cccccccc-cccc-4ccc-8ccc-cccccccccc01', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb1', 'Mapa rápido de la idea', 'mapa-rapido-de-la-idea', 'Describe la idea en términos de problema, usuario y cambio esperado.', 'Completa una ficha breve: qué problema observas, quién lo vive, qué alternativa usa hoy y qué resultado quieres producir.', 'none', 25, 'mixed', 1, true, true),
  ('cccccccc-cccc-4ccc-8ccc-cccccccccc02', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb1', 'Supuestos críticos', 'supuestos-criticos', 'Separa hechos, opiniones y riesgos que deben comprobarse pronto.', 'Lista cinco supuestos y marca los dos que podrían invalidar la idea si fueran falsos.', 'none', 30, 'text', 2, false, true),
  ('cccccccc-cccc-4ccc-8ccc-cccccccccc03', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2', 'Cliente objetivo inicial', 'cliente-objetivo-inicial', 'Define un segmento pequeño y observable para conversar.', 'Construye un perfil operativo del cliente: contexto, frecuencia del problema, costo actual y señales de urgencia.', 'none', 35, 'mixed', 1, false, true),
  ('cccccccc-cccc-4ccc-8ccc-cccccccccc04', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb3', 'Promesa de valor simple', 'promesa-de-valor-simple', 'Redacta una propuesta que conecte problema y resultado.', 'Usa una frase simple: ayudamos a [persona] a lograr [resultado] sin [dolor actual].', 'none', 30, 'text', 1, false, true),
  ('cccccccc-cccc-4ccc-8ccc-cccccccccc05', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb4', 'Evidencia mínima de validación', 'evidencia-minima-de-validacion', 'Prepara el primer entregable para revisión posterior.', 'Organiza evidencia, hallazgos y siguiente experimento. Este paso prepara el flujo de entregables que llegará en fases posteriores.', 'none', 45, 'assignment_intro', 1, false, true)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "lesson_resources" ("id", "lesson_id", "title", "description", "resource_type", "file_url", "external_url", "sort_order", "is_downloadable")
VALUES
  ('dddddddd-dddd-4ddd-8ddd-dddddddddd01', 'cccccccc-cccc-4ccc-8ccc-cccccccccc01', 'Ficha de diagnóstico de idea', 'Plantilla editable para ordenar problema, usuario y resultado esperado.', 'template', null, 'https://example.com/suclassroom/ficha-diagnostico', 1, true),
  ('dddddddd-dddd-4ddd-8ddd-dddddddddd02', 'cccccccc-cccc-4ccc-8ccc-cccccccccc02', 'Lista de supuestos críticos', 'Guía de priorización para identificar riesgos de validación.', 'document', null, 'https://example.com/suclassroom/supuestos-criticos', 1, true),
  ('dddddddd-dddd-4ddd-8ddd-dddddddddd03', 'cccccccc-cccc-4ccc-8ccc-cccccccccc05', 'Checklist de evidencia mínima', 'Checklist para preparar el entregable que se revisará en fases posteriores.', 'pdf', null, 'https://example.com/suclassroom/checklist-evidencia', 1, true)
ON CONFLICT ("id") DO NOTHING;

