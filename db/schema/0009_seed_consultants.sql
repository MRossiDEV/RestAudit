-- Migration 0009: demo seed — consultant team profiles
-- Links to existing demo users (carlos, maria) plus two additional
-- consultants created here. Workload capacity drives the load bars.

-- Two more team members
INSERT INTO users (id, email, name, password_hash, role) VALUES
  ('20000000-0000-0000-0000-000000000003', 'julia@vora.local',  'Julia Ferreira', '$2a$10$8K1p/a0dL1LXMIgoEDFrwOfMQdR3VtPOWXcFEF8oXvX7F6tD3n2iG', 'senior_auditor'),
  ('20000000-0000-0000-0000-000000000004', 'diego@vora.local',  'Diego Suarez',   '$2a$10$8K1p/a0dL1LXMIgoEDFrwOfMQdR3VtPOWXcFEF8oXvX7F6tD3n2iG', 'org_admin');

INSERT INTO organization_members (id, organization_id, user_id, role) VALUES
  ('21000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000003', 'senior_auditor'),
  ('21000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000004', 'org_admin');

INSERT INTO consultants (user_id, specialization, experience_years, rating, max_parallel_audits, status) VALUES
  ('20000000-0000-0000-0000-000000000001', 'Operations & Food Cost', 6, 92, 4, 'active'),
  ('20000000-0000-0000-0000-000000000002', 'Financial Analysis',    8, 95, 3, 'active'),
  ('20000000-0000-0000-0000-000000000003', 'Fine Dining & Menu Engineering', 10, 88, 2, 'active'),
  ('20000000-0000-0000-0000-000000000004', 'Multi-location Strategy', 12, 90, 5, 'active');