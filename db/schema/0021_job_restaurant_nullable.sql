-- Migration 0021: relax jobs.restaurant_id to nullable.
-- Business accounts post jobs directly (jobs.business_id); they don't own a
-- restaurant row, so the legacy NOT NULL constraint blocks company job posts.
-- SQLite can't drop NOT NULL in place — rebuild the table.

PRAGMA foreign_keys = OFF;

BEGIN;

CREATE TABLE jobs_new (
  id TEXT PRIMARY KEY,
  restaurant_id TEXT REFERENCES restaurants(id) ON DELETE CASCADE,
  business_id TEXT REFERENCES business_profiles(id) ON DELETE SET NULL,
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

INSERT INTO jobs_new
  (id, restaurant_id, business_id, title, description, location, employment_type,
   salary_min, salary_max, experience_required, skills_required, screening_questions,
   status, tier, created_at, updated_at)
SELECT
  id, restaurant_id, business_id, title, description, location, employment_type,
  salary_min, salary_max, experience_required, skills_required, screening_questions,
  status, tier, created_at, updated_at
FROM jobs;

DROP TABLE jobs;
ALTER TABLE jobs_new RENAME TO jobs;

CREATE INDEX IF NOT EXISTS idx_jobs_restaurant ON jobs(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_business ON jobs(business_id);

COMMIT;

PRAGMA foreign_keys = ON;
