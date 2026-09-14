-- Migration 0015: VORA Talent public professional profile.
-- Extends the internal talent module (0013) with the candidate-facing public
-- profile: unique username slug, split name, avatar, public/private visibility,
-- education and languages. Salary/email/phone remain private by default.

PRAGMA foreign_keys = ON;

-- Add public-profile columns to talent_profiles (nullable/defaulted so
-- existing rows from 0013/0014 remain valid).
ALTER TABLE talent_profiles ADD COLUMN username_slug TEXT;
ALTER TABLE talent_profiles ADD COLUMN first_name TEXT NOT NULL DEFAULT '';
ALTER TABLE talent_profiles ADD COLUMN last_name TEXT NOT NULL DEFAULT '';
ALTER TABLE talent_profiles ADD COLUMN avatar_url TEXT NOT NULL DEFAULT '';
ALTER TABLE talent_profiles ADD COLUMN profile_visibility TEXT NOT NULL DEFAULT 'public';
ALTER TABLE talent_profiles ADD COLUMN show_phone_publicly INTEGER NOT NULL DEFAULT 0;
ALTER TABLE talent_profiles ADD COLUMN relocation_available INTEGER NOT NULL DEFAULT 0;
ALTER TABLE talent_profiles ADD COLUMN employment_types TEXT NOT NULL DEFAULT '[]';
ALTER TABLE talent_profiles ADD COLUMN salary_expectation INTEGER;

CREATE UNIQUE INDEX IF NOT EXISTS idx_talent_username_slug ON talent_profiles(username_slug)
  WHERE username_slug IS NOT NULL;

-- Education entries for a profile.
CREATE TABLE IF NOT EXISTS talent_education (
  id TEXT PRIMARY KEY,
  talent_profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  institution TEXT NOT NULL,
  qualification TEXT NOT NULL DEFAULT '',
  field TEXT NOT NULL DEFAULT '',
  start_date TEXT NOT NULL DEFAULT '',
  end_date TEXT,
  description TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_tedu_profile ON talent_education(talent_profile_id);

-- Languages for a profile.
CREATE TABLE IF NOT EXISTS talent_languages (
  id TEXT PRIMARY KEY,
  talent_profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  language TEXT NOT NULL,
  proficiency TEXT NOT NULL DEFAULT 'professional',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_tlang_profile ON talent_languages(talent_profile_id);