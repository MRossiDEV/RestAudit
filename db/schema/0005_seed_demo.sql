-- Migration 0005: demo seed — restaurants, templates, audits, activity
-- Runs once (migrations are recorded). Provides realistic data for the
-- Admin Command Center until real data arrives.

-- Organization
INSERT INTO organizations (id, name, slug) VALUES
  ('10000000-0000-0000-0000-000000000001', 'VORA Consulting', 'vora-consulting');

-- Demo team
INSERT INTO users (id, email, name, password_hash, role) VALUES
  ('20000000-0000-0000-0000-000000000001', 'carlos@vora.local', 'Carlos Rivera', '$2a$10$8K1p/a0dL1LXMIgoEDFrwOfMQdR3VtPOWXcFEF8oXvX7F6tD3n2iG', 'auditor'),
  ('20000000-0000-0000-0000-000000000002', 'maria@vora.local',  'Maria Lopez',   '$2a$10$8K1p/a0dL1LXMIgoEDFrwOfMQdR3VtPOWXcFEF8oXvX7F6tD3n2iG', 'auditor');

INSERT INTO organization_members (id, organization_id, user_id, role) VALUES
  ('21000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'auditor'),
  ('21000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'auditor');

-- Restaurants
INSERT INTO restaurants (id, organization_id, name, slug, profile, status) VALUES
  ('30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'La Cabrera',
   'la-cabrera',
   '{"cuisine":"Argentina","location":"Palermo, Buenos Aires","number_of_seats":90,"number_of_locations":1,"service_model":"casual_dining","opening_date":"2018-04-12","average_check":28}',
   'active'),
  ('30000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Bistro 21',
   'bistro-21',
   '{"cuisine":"Francesa","location":"Recoleta, Buenos Aires","number_of_seats":42,"number_of_locations":1,"service_model":"fine_dining","opening_date":"2020-09-01","average_check":52}',
   'active'),
  ('30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'Mesa Norte',
   'mesa-norte',
   '{"cuisine":"Peruana","location":"Cordoba","number_of_seats":120,"number_of_locations":2,"service_model":"casual_dining","opening_date":"2016-02-20","average_check":19}',
   'active');

-- Audit templates (methodology is DB-configured, never hardcoded)
INSERT INTO audit_templates (id, name, type, description, sections_json, questions_json, scoring_model_json, report_template_id) VALUES
  ('40000000-0000-0000-0000-000000000001', 'VORA Check', 'vora_check',
   'Evaluación rápida de salud del restaurante.',
   '["Finanzas","Costos","Menú","Operaciones"]',
   '[]',
   '{"weights":{"financial":30,"operational":20,"food_cost":15,"labor":15,"menu":10,"customer":10}}',
   NULL),
  ('40000000-0000-0000-0000-000000000002', 'Financial Audit', 'financial',
   'Análisis financiero profundo del restaurante.',
   '["Ingresos","Márgenes","Gastos","Cash flow"]',
   '[]',
   '{"weights":{"financial":60,"operational":40}}',
   NULL),
  ('40000000-0000-0000-0000-000000000003', 'Full Restaurant Audit', 'full',
   'Auditoría integral de todas las áreas.',
   '["Finanzas","Costo de alimentos","Menú","Personal","Operaciones","Experiencia del cliente"]',
   '[]',
   '{"weights":{"financial":30,"operational":20,"food_cost":15,"labor":15,"menu":10,"customer":10}}',
   NULL);

-- Audits across the pipeline
INSERT INTO audits (id, organization_id, restaurant_id, template_id, status, assigned_consultant_id, priority, deadline, vora_score, progress) VALUES
  ('50000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 'vora_check', '20000000-0000-0000-0000-000000000001', 'high',  '2026-09-05', 68, 20),
  ('50000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000003', 'auditor_review', '20000000-0000-0000-0000-000000000001', 'urgent','2026-09-02', 54, 70),
  ('50000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', 'report_generation', '20000000-0000-0000-0000-000000000002', 'normal','2026-09-08', 76, 85),
  ('50000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000001', 'ai_analysis', NULL, 'normal','2026-09-10', NULL, 40),
  ('50000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000001', 'new', NULL, 'low','2026-09-15', NULL, 0),
  ('50000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000003', 'delivered', '20000000-0000-0000-0000-000000000002', 'normal', NULL, 71, 100);

-- Activity feed + restaurant intelligence timelines
INSERT INTO audit_log (id, organization_id, restaurant_id, actor_id, action, entity_type, entity_id, metadata, created_at) VALUES
  ('80000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', NULL, 'restaurant.vora_check_completed', 'restaurants', '30000000-0000-0000-0000-000000000001', '{}', '2026-08-29 14:32:00'),
  ('80000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'audit.analysis_submitted', 'audits', '50000000-0000-0000-0000-000000000002', '{"audit":"Operational Analysis"}', '2026-08-29 14:18:00'),
  ('80000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', NULL, 'ai.findings_generated', 'audits', '50000000-0000-0000-0000-000000000003', '{"count":8}', '2026-08-29 13:56:00'),
  ('80000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', NULL, NULL, 'report.approved', 'reports', 'rpt-001', '{}', '2026-08-29 13:22:00'),
  ('80000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', NULL, 'restaurant.report_opened', 'restaurants', '30000000-0000-0000-0000-000000000002', '{}', '2026-08-29 12:45:00'),
  ('80000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000003', NULL, 'lead.qualified', 'leads', 'lead-001', '{}', '2026-08-29 12:10:00'),
  ('80000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'audit.assigned', 'audits', '50000000-0000-0000-0000-000000000002', '{"consultant":"Maria Lopez"}', '2026-08-29 11:55:00'),
  ('80000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000003', NULL, 'audit.delivered', 'audits', '50000000-0000-0000-0000-000000000006', '{}', '2026-08-28 16:00:00');