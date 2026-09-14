-- Migration 0014: demo talent seed — profiles, skills, jobs, applications, credits.
-- Runs once (recorded in _migrations). Provides demo data for the Talent module.
-- Depends on restaurants from 0005_seed_demo.sql and users from 0005.

PRAGMA foreign_keys = ON;

-- Talent profiles
INSERT INTO talent_profiles (id, user_id, full_name, first_name, last_name, professional_title, location, country, years_experience, availability_status, visibility, salary_min, salary_max, contact_email, contact_phone, bio, verification_status) VALUES
  ('60000000-0000-0000-0000-000000000001', NULL, 'Sofía Álvarez', 'Sofía', 'Álvarez', 'Sous Chef', 'Montevideo', 'Uruguay', 7, 'immediate', 'anonymous', 55000, 75000, 'sofia@example.com', '+598 99 000 001', 'Sous chef especializada en cocina italiana y control de costos de cocina.', 'verified'),
  ('60000000-0000-0000-0000-000000000002', NULL, 'Diego Ríos', 'Diego', 'Ríos', 'Jefe de Cocina', 'Punta del Este', 'Uruguay', 12, '15_days', 'anonymous', 80000, 110000, 'diego@example.com', '+598 99 000 002', 'Chef ejecutivo con experiencia en alta gastronomía y gestión de equipos.', 'partial'),
  ('60000000-0000-0000-0000-000000000003', NULL, 'Camila Torres', 'Camila', 'Torres', 'Barista', 'Montevideo', 'Uruguay', 4, 'open', 'anonymous', 35000, 45000, 'camila@example.com', '+598 99 000 003', 'Barista especializada en café de especialidad y formación de personal.', 'unverified');

-- Skills (culinary, operational, management, language)
INSERT INTO talent_skills (id, talent_profile_id, name, category, level) VALUES
  ('61000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', 'Cocina Italiana', 'culinary', 'advanced'),
  ('61000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000001', 'Pasta', 'culinary', 'advanced'),
  ('61000000-0000-0000-0000-000000000003', '60000000-0000-0000-0000-000000000001', 'Control de Costos', 'operational', 'advanced'),
  ('61000000-0000-0000-0000-000000000004', '60000000-0000-0000-0000-000000000001', 'Gestión de Cocina', 'management', 'intermediate'),
  ('61000000-0000-0000-0000-000000000005', '60000000-0000-0000-0000-000000000002', 'Alta Cocina', 'culinary', 'advanced'),
  ('61000000-0000-0000-0000-000000000006', '60000000-0000-0000-0000-000000000002', 'Liderazgo de Equipo', 'management', 'advanced'),
  ('61000000-0000-0000-0000-000000000007', '60000000-0000-0000-0000-000000000003', 'Café de Especialidad', 'culinary', 'advanced'),
  ('61000000-0000-0000-0000-000000000008', '60000000-0000-0000-0000-000000000003', 'Atención al Cliente', 'operational', 'intermediate');

-- Experience
INSERT INTO talent_experience (id, talent_profile_id, company, position, restaurant_type, start_date, end_date, team_size, responsibilities, achievements) VALUES
  ('62000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', 'Trattoria Roma', 'Sous Chef', 'Italiano', '2019-03-01', NULL, 8, '["Operación de cocina","Gestión de equipo","Control de costos","Desarrollo de menú"]', 'Redujo el costo de alimentos en un 12% en seis meses.'),
  ('62000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000002', 'Restaurante Faro', 'Jefe de Cocina', 'Alta cocina', '2014-01-01', '2023-12-01', 15, '["Dirección de cocina","Ingeniería de menú","Presupuesto"]', 'Lideró un equipo de 15 personas en un restaurante de alta demanda.');

-- Certifications
INSERT INTO talent_certifications (id, talent_profile_id, name, issuer, issued_at, verified) VALUES
  ('63000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', 'Manipulación de Alimentos', 'Intendencia de Montevideo', '2020-05-01', 1),
  ('63000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000002', 'HACCP', 'Intendencia de Maldonado', '2019-08-15', 1);

-- Portfolio
INSERT INTO talent_portfolio (id, talent_profile_id, kind, title, url, description) VALUES
  ('64000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', 'menu', 'Menú de temporada', '', 'Menú degustación de temporada primavera.'),
  ('64000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000003', 'project', 'Latte art', '', 'Portafolio de latte art y capacitación de baristas.');

-- Jobs (restaurants from 0005)
INSERT INTO jobs (id, restaurant_id, title, description, location, employment_type, salary_min, salary_max, experience_required, skills_required, screening_questions, status, tier) VALUES
  ('65000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'Sous Chef', 'Buscamos sous chef para restaurante italiano de alto volumen con control de costos y gestión de equipo.', 'Montevideo', 'full_time', 55000, 75000, 5, '["Cocina Italiana","Control de Costos","Gestión de Cocina"]', '["Describe tu experiencia en restaurantes de alto volumen.","¿Cómo calculas el costo de alimentos?"]', 'open', 'featured'),
  ('65000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', 'Barista', 'Barista para cafetería de especialidad en Pocitos.', 'Montevideo', 'part_time', 35000, 45000, 2, '["Café de Especialidad","Atención al Cliente"]', '[]', 'open', 'standard');

-- Applications + matches
INSERT INTO candidate_matches (id, talent_profile_id, job_id, restaurant_id, technical_score, experience_score, location_score, salary_score, availability_score, compatibility_score, final_score, ai_summary) VALUES
  ('66000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', '65000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 95, 100, 92, 85, 100, 90, 94, 'Fuerte coincidencia en cocina italiana y control de costos.'),
  ('66000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000003', '65000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', 90, 80, 100, 85, 70, 85, 86, 'Coincidencia en café de especialidad.');

INSERT INTO job_applications (id, job_id, talent_profile_id, status, match_id, notes) VALUES
  ('67000000-0000-0000-0000-000000000001', '65000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', 'shortlisted', '66000000-0000-0000-0000-000000000001', ''),
  ('67000000-0000-0000-0000-000000000002', '65000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000003', 'applied', '66000000-0000-0000-0000-000000000002', '');

-- Restaurant credits for demoing unlock
INSERT INTO restaurant_credits (restaurant_id, balance) VALUES
  ('30000000-0000-0000-0000-000000000001', 20);