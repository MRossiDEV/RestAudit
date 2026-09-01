-- Migration 0004: Admin — audit templates & audits (Command Center core)
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS audit_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'custom',
  description TEXT NOT NULL DEFAULT '',
  sections_json TEXT NOT NULL DEFAULT '[]',
  questions_json TEXT NOT NULL DEFAULT '[]',
  scoring_model_json TEXT NOT NULL DEFAULT '{}',
  report_template_id TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS audits (
  id TEXT PRIMARY KEY,
  organization_id TEXT,
  restaurant_id TEXT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  template_id TEXT REFERENCES audit_templates(id),
  status TEXT NOT NULL DEFAULT 'new',
  assigned_consultant_id TEXT,
  priority TEXT NOT NULL DEFAULT 'normal',
  deadline TEXT,
  vora_score INTEGER,
  progress INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_audits_restaurant ON audits(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_audits_status ON audits(status);
CREATE INDEX IF NOT EXISTS idx_audits_consultant ON audits(assigned_consultant_id);