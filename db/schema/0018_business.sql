-- Migration 0018: VORA Talent v3.0 — business accounts, employer discovery,
-- saved talent, talent searches, matches, and profile access attribution.
--
-- Core PRD rules encoded here:
--   * A business account is FREE and is the access barrier for full profiles.
--   * `profile_access_events.access_context` records WHY a profile was seen
--     (candidate_shared vs search/recommendation) because monetization depends
--     on whether VORA generated the discovery.
--   * No permanent `contact_locked` model — access is contextual.

PRAGMA foreign_keys = ON;

/* ── Business accounts ─────────────────────────────────────── */

CREATE TABLE IF NOT EXISTS business_profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT '',
  region TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  website TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  logo_url TEXT NOT NULL DEFAULT '',
  contact_name TEXT NOT NULL DEFAULT '',
  contact_phone TEXT NOT NULL DEFAULT '',
  hiring_interests TEXT NOT NULL DEFAULT '[]',
  verification_status TEXT NOT NULL DEFAULT 'unverified',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_business_user ON business_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_business_country ON business_profiles(country);

CREATE TABLE IF NOT EXISTS business_members (
  id TEXT PRIMARY KEY,
  business_id TEXT NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (business_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_bmembers_business ON business_members(business_id);
CREATE INDEX IF NOT EXISTS idx_bmembers_user ON business_members(user_id);

/* ── Employer discovery ────────────────────────────────────── */

CREATE TABLE IF NOT EXISTS saved_talent (
  id TEXT PRIMARY KEY,
  business_id TEXT NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  talent_profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'saved',
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (business_id, talent_profile_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_business ON saved_talent(business_id);
CREATE INDEX IF NOT EXISTS idx_saved_talent ON saved_talent(talent_profile_id);

CREATE TABLE IF NOT EXISTS talent_searches (
  id TEXT PRIMARY KEY,
  business_id TEXT NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  requirements TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_tsearches_business ON talent_searches(business_id);

CREATE TABLE IF NOT EXISTS talent_matches (
  id TEXT PRIMARY KEY,
  search_id TEXT NOT NULL REFERENCES talent_searches(id) ON DELETE CASCADE,
  talent_profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0,
  factors TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (search_id, talent_profile_id)
);

CREATE INDEX IF NOT EXISTS idx_tmatches_search ON talent_matches(search_id);
CREATE INDEX IF NOT EXISTS idx_tmatches_talent ON talent_matches(talent_profile_id);

/* ── Profile access attribution ────────────────────────────── */

CREATE TABLE IF NOT EXISTS profile_access_events (
  id TEXT PRIMARY KEY,
  talent_profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  viewer_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  business_id TEXT REFERENCES business_profiles(id) ON DELETE SET NULL,
  access_context TEXT NOT NULL DEFAULT 'public_discovery',
  referrer TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_paccess_talent ON profile_access_events(talent_profile_id);
CREATE INDEX IF NOT EXISTS idx_paccess_business ON profile_access_events(business_id);
CREATE INDEX IF NOT EXISTS idx_paccess_context ON profile_access_events(access_context);

/* ── International-ready talent fields ─────────────────────── */
-- Added idempotently: SQLite has no IF NOT EXISTS for ADD COLUMN, so these
-- run inside a guarded block. On a db where they already exist the runtime
-- migrator tracks 0018 in _migrations and skips the file entirely.

ALTER TABLE talent_profiles ADD COLUMN region TEXT NOT NULL DEFAULT '';
ALTER TABLE talent_profiles ADD COLUMN relocation_scope TEXT NOT NULL DEFAULT 'local';
ALTER TABLE talent_profiles ADD COLUMN international_available INTEGER NOT NULL DEFAULT 0;
ALTER TABLE talent_profiles ADD COLUMN visa_sponsorship_required INTEGER NOT NULL DEFAULT 0;
ALTER TABLE talent_profiles ADD COLUMN preferred_countries TEXT NOT NULL DEFAULT '[]';
ALTER TABLE talent_profiles ADD COLUMN work_authorization_countries TEXT NOT NULL DEFAULT '[]';
ALTER TABLE talent_profiles ADD COLUMN available_from TEXT NOT NULL DEFAULT '';
ALTER TABLE talent_profiles ADD COLUMN profile_strength INTEGER NOT NULL DEFAULT 0;
