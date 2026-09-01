-- Migration 0008: Consultants — team profile fields for workload management
-- One row per user that is a consultant. Workload is derived from live
-- audit counts against a stored capacity (max_parallel_audits).

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS consultants (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  specialization TEXT NOT NULL DEFAULT '',
  experience_years INTEGER NOT NULL DEFAULT 0,
  rating INTEGER NOT NULL DEFAULT 0,
  max_parallel_audits INTEGER NOT NULL DEFAULT 3,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_consultants_status ON consultants(status);