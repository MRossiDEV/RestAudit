-- Migration 0012: AI providers — runtime-configurable LLM providers
-- Provider configs live in the DB (never hardcoded), so an admin can point
-- VORA Intelligence at OpenAI, Claude (Anthropic) or NVIDIA NIM and pick the
-- model each one serves — without a deploy. Keys are stored as configured.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS ai_providers (
  id TEXT PRIMARY KEY,
  provider_key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  api_key TEXT NOT NULL DEFAULT '',
  base_url TEXT NOT NULL DEFAULT '',
  models_json TEXT NOT NULL DEFAULT '[]',
  default_model TEXT NOT NULL DEFAULT '',
  active INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO ai_providers (id, provider_key, name, api_key, base_url, models_json, default_model, active, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'openai', 'OpenAI', '',
   'https://api.openai.com/v1',
   '["gpt-4o","gpt-4o-mini","gpt-4.1","o3-mini"]', 'gpt-4o', 1, 1),
  ('a1000000-0000-0000-0000-000000000002', 'anthropic', 'Claude (Anthropic)', '',
   'https://api.anthropic.com',
   '["claude-opus-5","claude-sonnet-5","claude-haiku-4-5"]', 'claude-sonnet-5', 1, 2),
  ('a1000000-0000-0000-0000-000000000003', 'nvidia', 'NVIDIA NIM', '',
   'https://integrate.api.nvidia.com/v1',
   '["deepseek-ai/deepseek-v4-pro-0813","deepseek-ai/deepseek-r1","nvidia/llama-3.3-70b","nvidia/llama-3.1-nemotron"]',
   'deepseek-ai/deepseek-v4-pro-0813', 0, 3);