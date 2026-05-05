INSERT INTO "roles" ("name", "description", "is_system")
VALUES
  ('student', 'Aprende, aplica y entrega proyectos reales.', true),
  ('mentor', 'Revisa entregables y brinda feedback estructurado.', true),
  ('admin', 'Administra usuarios, cursos, operación y métricas.', true),
  ('institution', 'Gestiona cohortes, participantes y avance institucional.', true)
ON CONFLICT ("name") DO NOTHING;
