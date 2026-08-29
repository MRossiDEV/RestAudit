-- Migration 0003: inbound leads from the free health check
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  intent TEXT NOT NULL,             -- 'register' | 'contact'
  restaurant_name TEXT,
  check_input TEXT NOT NULL DEFAULT '{}',
  check_result TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);