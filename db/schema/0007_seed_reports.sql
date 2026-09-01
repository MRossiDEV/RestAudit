-- Migration 0007: demo seed — report templates, reports, sections
-- Report sections follow the builder structure from the plan:
-- Executive Summary → Financial → Cost → Menu → Labor → Operations →
-- Customer Experience → Key Findings → Opportunities → Recommendations → Action Plan

INSERT INTO report_templates (id, name, type, description, sections_json) VALUES
  ('60000000-0000-0000-0000-000000000001', 'Quick VORA', 'quick',
   'Informe ejecutivo rápido de salud del restaurante.',
   '["Executive Summary","Key Findings","Opportunities","Recommendations","Action Plan"]'),
  ('60000000-0000-0000-0000-000000000002', 'Full Audit', 'full',
   'Informe integral tras una auditoría completa.',
   '["Executive Summary","Financial","Cost","Menu","Labor","Operations","Customer Experience","Key Findings","Opportunities","Recommendations","Action Plan"]'),
  ('60000000-0000-0000-0000-000000000003', 'Financial', 'financial',
   'Análisis financiero profundo del restaurante.',
   '["Executive Summary","Financial","Cost","Cash Flow","Opportunities","Recommendations"]');

-- Demo reports across the lifecycle
INSERT INTO reports (id, organization_id, audit_id, restaurant_id, template_id, status, title, vora_score) VALUES
  ('70000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000002', 'draft',        'La Cabrera — Full Audit Report', 68),
  ('70000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000001', 'ai_generated', 'Bistro 21 — Quick VORA Report', NULL),
  ('70000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000003', 'under_review', 'Bistro 21 — Financial Analysis', 76),
  ('70000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', NULL, '30000000-0000-0000-0000-000000000003', '60000000-0000-0000-0000-000000000001', 'approved',     'Mesa Norte — Quick VORA Report', 71),
  ('70000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000006', '30000000-0000-0000-0000-000000000003', '60000000-0000-0000-0000-000000000002', 'delivered',    'Mesa Norte — Full Audit Report', 71);

-- Sections (brief demo content)
INSERT INTO report_sections (id, report_id, key, title, content, sort_order, source, status) VALUES
  -- Report 1: draft (La Cabrera full)
  ('71000000-0000-0000-0000-000000000001', '70000000-0000-0000-0000-000000000001', 'executive_summary', 'Executive Summary', 'La Cabrera muestra una operación sólida con margen en food cost mejorable.', 0, 'ai', 'draft'),
  ('71000000-0000-0000-0000-000000000002', '70000000-0000-0000-0000-000000000001', 'financial', 'Financial', 'Ingresos estables; oportunidad en control de inventario.', 1, 'ai', 'draft'),
  ('71000000-0000-0000-0000-000000000003', '70000000-0000-0000-0000-000000000001', 'key_findings', 'Key Findings', 'Food cost elevado (34%), labor en rango.', 2, 'ai', 'draft'),
  ('71000000-0000-0000-0000-000000000004', '70000000-0000-0000-0000-000000000001', 'action_plan', 'Action Plan', 'Revisar proveedores y estandarizar recetas.', 3, 'human', 'draft'),
  -- Report 2: ai_generated (Bistro 21 quick)
  ('71000000-0000-0000-0000-000000000010', '70000000-0000-0000-0000-000000000002', 'executive_summary', 'Executive Summary', 'Bistro 21 con ticket alto pero conversión de mesa baja.', 0, 'ai', 'draft'),
  ('71000000-0000-0000-0000-000000000011', '70000000-0000-0000-0000-000000000002', 'recommendations', 'Recommendations', 'Optimizar turnos de reserva para elevar covers.', 1, 'ai', 'draft'),
  -- Report 3: under_review (Bistro 21 financial)
  ('71000000-0000-0000-0000-000000000020', '70000000-0000-0000-0000-000000000003', 'financial', 'Financial', 'Margen bruto 62%; rentabilidad neta afectada por costos fijos.', 0, 'ai', 'reviewed'),
  ('71000000-0000-0000-0000-000000000021', '70000000-0000-0000-0000-000000000003', 'cost', 'Cost', 'Food cost 31% vs. benchmark 29% de fine dining.', 1, 'human', 'reviewed'),
  -- Report 4: approved (Mesa Norte quick)
  ('71000000-0000-0000-0000-000000000030', '70000000-0000-0000-0000-000000000004', 'executive_summary', 'Executive Summary', 'Mesa Norte operación eficiente a escala.', 0, 'ai', 'approved'),
  -- Report 5: delivered (Mesa Norte full)
  ('71000000-0000-0000-0000-000000000040', '70000000-0000-0000-0000-000000000005', 'executive_summary', 'Executive Summary', 'Informe final entregado al cliente.', 0, 'ai', 'approved'),
  ('71000000-0000-0000-0000-000000000041', '70000000-0000-0000-0000-000000000005', 'action_plan', 'Action Plan', 'Plan de 90 días: costos, menú y personal.', 1, 'human', 'approved');