-- Migration 0022: VORA Agents Network
-- Agent applications, approved agents, attribution, commissions, audit trail.

PRAGMA foreign_keys = ON;

/* ── Approved agents ───────────────────────────────────────── */

CREATE TABLE IF NOT EXISTS agents (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active',
  country TEXT NOT NULL DEFAULT '',
  region TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  specializations TEXT NOT NULL DEFAULT '[]',
  languages TEXT NOT NULL DEFAULT '[]',
  bio TEXT NOT NULL DEFAULT '',
  avatar_url TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL UNIQUE,
  approved_by TEXT REFERENCES users(id) ON DELETE SET NULL,
  approved_at TEXT,
  suspended_at TEXT,
  deactivated_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_agents_user ON agents(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_slug ON agents(slug);
CREATE INDEX IF NOT EXISTS idx_agents_country ON agents(country);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);

/* ── Agent applications ────────────────────────────────────── */

CREATE TABLE IF NOT EXISTS agent_applications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'applicant',

  -- Step 1: Personal
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  preferred_name TEXT NOT NULL DEFAULT '',
  date_of_birth TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  whatsapp TEXT NOT NULL DEFAULT '',
  avatar_url TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT '',
  timezone TEXT NOT NULL DEFAULT '',

  -- Step 2: Location
  region TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  neighborhood TEXT NOT NULL DEFAULT '',
  postal_code TEXT NOT NULL DEFAULT '',
  languages_spoken TEXT NOT NULL DEFAULT '[]',
  languages_written TEXT NOT NULL DEFAULT '[]',
  secondary_territories TEXT NOT NULL DEFAULT '[]',
  travel_willing TEXT NOT NULL DEFAULT '',
  availability_type TEXT NOT NULL DEFAULT '',

  -- Step 3: Professional
  current_occupation TEXT NOT NULL DEFAULT '',
  current_company TEXT NOT NULL DEFAULT '',
  previous_occupations TEXT NOT NULL DEFAULT '[]',
  years_experience INTEGER NOT NULL DEFAULT 0,
  industries TEXT NOT NULL DEFAULT '[]',
  hospitality_experience INTEGER NOT NULL DEFAULT 0,
  hr_experience INTEGER NOT NULL DEFAULT 0,
  sales_experience INTEGER NOT NULL DEFAULT 0,
  networking_experience INTEGER NOT NULL DEFAULT 0,
  community_involvement TEXT NOT NULL DEFAULT '',
  entrepreneurship_experience INTEGER NOT NULL DEFAULT 0,
  tech_familiarity TEXT NOT NULL DEFAULT '',
  education TEXT NOT NULL DEFAULT '',
  certifications TEXT NOT NULL DEFAULT '[]',
  professional_summary TEXT NOT NULL DEFAULT '',

  -- Step 4: Network
  talent_network_size TEXT NOT NULL DEFAULT '',
  employer_network_size TEXT NOT NULL DEFAULT '',
  talent_relationship_strength TEXT NOT NULL DEFAULT '',
  employer_relationship_strength TEXT NOT NULL DEFAULT '',
  industry_connections TEXT NOT NULL DEFAULT '[]',
  geographic_reach TEXT NOT NULL DEFAULT '',

  -- Step 5: Social
  linkedin_url TEXT NOT NULL DEFAULT '',
  facebook_url TEXT NOT NULL DEFAULT '',
  instagram_url TEXT NOT NULL DEFAULT '',
  tiktok_url TEXT NOT NULL DEFAULT '',
  x_url TEXT NOT NULL DEFAULT '',
  website_url TEXT NOT NULL DEFAULT '',
  portfolio_url TEXT NOT NULL DEFAULT '',
  business_profile_url TEXT NOT NULL DEFAULT '',
  other_urls TEXT NOT NULL DEFAULT '[]',

  -- Step 6: Verification
  email_verified INTEGER NOT NULL DEFAULT 0,
  phone_verified INTEGER NOT NULL DEFAULT 0,
  verification_provider TEXT NOT NULL DEFAULT '',
  verification_reference TEXT NOT NULL DEFAULT '',
  verified_at TEXT,

  -- Step 7: Assessment (JSON: {scenario1, scenario2, scenario3, scenario4})
  assessment_answers TEXT NOT NULL DEFAULT '{}',

  -- Step 8: Motivation
  motivation_why TEXT NOT NULL DEFAULT '',
  motivation_industries TEXT NOT NULL DEFAULT '',
  motivation_geography TEXT NOT NULL DEFAULT '',
  motivation_qualified TEXT NOT NULL DEFAULT '',
  motivation_introduce TEXT NOT NULL DEFAULT '',
  motivation_find_talent TEXT NOT NULL DEFAULT '',
  motivation_relationships TEXT NOT NULL DEFAULT '',

  -- Step 9: References
  reference1_name TEXT NOT NULL DEFAULT '',
  reference1_relationship TEXT NOT NULL DEFAULT '',
  reference1_company TEXT NOT NULL DEFAULT '',
  reference1_position TEXT NOT NULL DEFAULT '',
  reference1_email TEXT NOT NULL DEFAULT '',
  reference1_phone TEXT NOT NULL DEFAULT '',
  reference1_permission INTEGER NOT NULL DEFAULT 0,
  reference2_name TEXT NOT NULL DEFAULT '',
  reference2_relationship TEXT NOT NULL DEFAULT '',
  reference2_company TEXT NOT NULL DEFAULT '',
  reference2_position TEXT NOT NULL DEFAULT '',
  reference2_email TEXT NOT NULL DEFAULT '',
  reference2_phone TEXT NOT NULL DEFAULT '',
  reference2_permission INTEGER NOT NULL DEFAULT 0,

  -- Meta
  application_source TEXT NOT NULL DEFAULT 'organic',
  submitted_at TEXT,
  reviewed_by TEXT REFERENCES users(id) ON DELETE SET NULL,
  reviewed_at TEXT,
  review_notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_agent_apps_user ON agent_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_apps_status ON agent_applications(status);
CREATE INDEX IF NOT EXISTS idx_agent_apps_country ON agent_applications(country);

/* ── Agent attribution ─────────────────────────────────────── */

CREATE TABLE IF NOT EXISTS agent_attributions (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  talent_profile_id TEXT REFERENCES talent_profiles(id) ON DELETE CASCADE,
  business_id TEXT REFERENCES business_profiles(id) ON DELETE CASCADE,
  attribution_type TEXT NOT NULL DEFAULT 'direct_introduction',
  attributed_at TEXT NOT NULL DEFAULT (datetime('now')),
  attributed_by TEXT REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (talent_profile_id, agent_id),
  UNIQUE (business_id, agent_id)
);

CREATE INDEX IF NOT EXISTS idx_attributions_agent ON agent_attributions(agent_id);
CREATE INDEX IF NOT EXISTS idx_attributions_talent ON agent_attributions(talent_profile_id);
CREATE INDEX IF NOT EXISTS idx_attributions_business ON agent_attributions(business_id);

/* ── Commission rules ──────────────────────────────────────── */

CREATE TABLE IF NOT EXISTS agent_commission_rules (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT '',
  agent_id TEXT REFERENCES agents(id) ON DELETE CASCADE,
  industry TEXT NOT NULL DEFAULT '',
  transaction_type TEXT NOT NULL DEFAULT 'candidate_unlock',
  commission_type TEXT NOT NULL DEFAULT 'percentage',
  percentage REAL,
  fixed_amount REAL,
  currency TEXT NOT NULL DEFAULT 'USD',
  max_per_transaction REAL,
  duration_days INTEGER,
  active INTEGER NOT NULL DEFAULT 1,
  priority INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_commission_rules_agent ON agent_commission_rules(agent_id);
CREATE INDEX IF NOT EXISTS idx_commission_rules_country ON agent_commission_rules(country);
CREATE INDEX IF NOT EXISTS idx_commission_rules_type ON agent_commission_rules(transaction_type);

/* ── Commission ledger ─────────────────────────────────────── */

CREATE TABLE IF NOT EXISTS agent_commission_ledger (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  talent_profile_id TEXT REFERENCES talent_profiles(id) ON DELETE SET NULL,
  business_id TEXT REFERENCES business_profiles(id) ON DELETE SET NULL,
  transaction_type TEXT NOT NULL DEFAULT 'candidate_unlock',
  transaction_ref TEXT NOT NULL DEFAULT '',
  gross_amount REAL NOT NULL DEFAULT 0,
  commission_amount REAL NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending',
  approved_by TEXT REFERENCES users(id) ON DELETE SET NULL,
  approved_at TEXT,
  paid_at TEXT,
  payment_reference TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_ledger_agent ON agent_commission_ledger(agent_id);
CREATE INDEX IF NOT EXISTS idx_ledger_talent ON agent_commission_ledger(talent_profile_id);
CREATE INDEX IF NOT EXISTS idx_ledger_status ON agent_commission_ledger(status);

/* ── Audit log ─────────────────────────────────────────────── */

CREATE TABLE IF NOT EXISTS agent_audit_logs (
  id TEXT PRIMARY KEY,
  agent_id TEXT REFERENCES agents(id) ON DELETE SET NULL,
  actor_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL DEFAULT '',
  entity_id TEXT NOT NULL DEFAULT '',
  previous_value TEXT NOT NULL DEFAULT '',
  new_value TEXT NOT NULL DEFAULT '',
  reason TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_agent_audit_agent ON agent_audit_logs(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_audit_actor ON agent_audit_logs(actor_id);
