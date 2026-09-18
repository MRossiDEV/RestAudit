-- Migration 0019: public slug for business profiles, enabling shareable
-- business pages at /business/[slug] (PRD §35).

PRAGMA foreign_keys = ON;

ALTER TABLE business_profiles ADD COLUMN slug TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_business_slug ON business_profiles(slug);

-- Hiring fields surfaced on the public business profile.
ALTER TABLE business_profiles ADD COLUMN size TEXT NOT NULL DEFAULT '';
ALTER TABLE business_profiles ADD COLUMN hiring_international INTEGER NOT NULL DEFAULT 0;
ALTER TABLE business_profiles ADD COLUMN tagline TEXT NOT NULL DEFAULT '';
