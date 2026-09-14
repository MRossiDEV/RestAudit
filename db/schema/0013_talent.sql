-- Migration 0013: VORA Talent Intelligence
-- Professional Passport, jobs, applications, matching, verification, credits.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS talent_profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  professional_title TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT '',
  years_experience INTEGER NOT NULL DEFAULT 0,
  availability_status TEXT NOT NULL DEFAULT 'open',
  visibility TEXT NOT NULL DEFAULT 'anonymous',
  salary_min INTEGER,
  salary_max INTEGER,
  contact_email TEXT NOT NULL DEFAULT '',
  contact_phone TEXT NOT NULL DEFAULT '',
  video_url TEXT NOT NULL DEFAULT '',
  bio TEXT NOT NULL DEFAULT '',
  cv_raw_text TEXT NOT NULL DEFAULT '',
  verification_status TEXT NOT NULL DEFAULT 'unverified',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_talent_availability ON talent_profiles(availability_status);
CREATE INDEX IF NOT EXISTS idx_talent_title ON talent_profiles(professional_title);
CREATE INDEX IF NOT EXISTS idx_talent_location ON talent_profiles(location);

CREATE TABLE IF NOT EXISTS talent_skills (
  id TEXT PRIMARY KEY,
  talent_profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'operational',
  level TEXT NOT NULL DEFAULT 'intermediate',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_tskills_profile ON talent_skills(talent_profile_id);
CREATE INDEX IF NOT EXISTS idx_tskills_name ON talent_skills(name);

CREATE TABLE IF NOT EXISTS talent_experience (
  id TEXT PRIMARY KEY,
  talent_profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  restaurant_type TEXT NOT NULL DEFAULT '',
  start_date TEXT NOT NULL DEFAULT '',
  end_date TEXT,
  team_size INTEGER,
  responsibilities TEXT NOT NULL DEFAULT '[]',
  achievements TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_texp_profile ON talent_experience(talent_profile_id);

CREATE TABLE IF NOT EXISTS talent_certifications (
  id TEXT PRIMARY KEY,
  talent_profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL DEFAULT '',
  issued_at TEXT,
  expires_at TEXT,
  verified INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_tcerts_profile ON talent_certifications(talent_profile_id);

CREATE TABLE IF NOT EXISTS talent_portfolio (
  id TEXT PRIMARY KEY,
  talent_profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  kind TEXT NOT NULL DEFAULT 'image',
  title TEXT NOT NULL,
  url TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_tportfolio_profile ON talent_portfolio(talent_profile_id);

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  restaurant_id TEXT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  employment_type TEXT NOT NULL DEFAULT 'full_time',
  salary_min INTEGER,
  salary_max INTEGER,
  experience_required INTEGER NOT NULL DEFAULT 0,
  skills_required TEXT NOT NULL DEFAULT '[]',
  screening_questions TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft',
  tier TEXT NOT NULL DEFAULT 'standard',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_jobs_restaurant ON jobs(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);

CREATE TABLE IF NOT EXISTS candidate_matches (
  id TEXT PRIMARY KEY,
  talent_profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  job_id TEXT REFERENCES jobs(id) ON DELETE CASCADE,
  restaurant_id TEXT REFERENCES restaurants(id) ON DELETE SET NULL,
  technical_score INTEGER NOT NULL DEFAULT 0,
  experience_score INTEGER NOT NULL DEFAULT 0,
  location_score INTEGER NOT NULL DEFAULT 0,
  salary_score INTEGER NOT NULL DEFAULT 0,
  availability_score INTEGER NOT NULL DEFAULT 0,
  compatibility_score INTEGER NOT NULL DEFAULT 0,
  final_score INTEGER NOT NULL DEFAULT 0,
  ai_summary TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_matches_talent ON candidate_matches(talent_profile_id);
CREATE INDEX IF NOT EXISTS idx_matches_job ON candidate_matches(job_id);

CREATE TABLE IF NOT EXISTS job_applications (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  talent_profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'applied',
  match_id TEXT REFERENCES candidate_matches(id) ON DELETE SET NULL,
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (job_id, talent_profile_id)
);

CREATE INDEX IF NOT EXISTS idx_applications_job ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_talent ON job_applications(talent_profile_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON job_applications(status);

CREATE TABLE IF NOT EXISTS candidate_unlocks (
  id TEXT PRIMARY KEY,
  restaurant_id TEXT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  talent_profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  cost_credits INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (restaurant_id, talent_profile_id)
);

CREATE INDEX IF NOT EXISTS idx_unlocks_talent ON candidate_unlocks(talent_profile_id);
CREATE INDEX IF NOT EXISTS idx_unlocks_restaurant ON candidate_unlocks(restaurant_id);

CREATE TABLE IF NOT EXISTS restaurant_credits (
  restaurant_id TEXT PRIMARY KEY REFERENCES restaurants(id) ON DELETE CASCADE,
  balance INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS talent_verifications (
  id TEXT PRIMARY KEY,
  talent_profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  verified_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_tverif_profile ON talent_verifications(talent_profile_id);
CREATE INDEX IF NOT EXISTS idx_tverif_status ON talent_verifications(status);

CREATE TABLE IF NOT EXISTS talent_assessments (
  id TEXT PRIMARY KEY,
  talent_profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  kind TEXT NOT NULL DEFAULT 'custom',
  scores_json TEXT NOT NULL DEFAULT '{}',
  total_score INTEGER,
  taken_at TEXT NOT NULL DEFAULT (datetime('now')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_tassess_profile ON talent_assessments(talent_profile_id);

CREATE TABLE IF NOT EXISTS talent_references (
  id TEXT PRIMARY KEY,
  talent_profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  employer_name TEXT NOT NULL DEFAULT '',
  position_confirmed INTEGER NOT NULL DEFAULT 0,
  would_rehire TEXT,
  strengths TEXT NOT NULL DEFAULT '',
  feedback TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_trefs_profile ON talent_references(talent_profile_id);

CREATE TABLE IF NOT EXISTS salary_data (
  id TEXT PRIMARY KEY,
  position TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT '',
  avg_salary INTEGER,
  min_salary INTEGER,
  max_salary INTEGER,
  sample_size INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_salary_position ON salary_data(position);
