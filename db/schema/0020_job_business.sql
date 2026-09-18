-- Migration 0020: link jobs to the business account that posted them.
-- Jobs historically belonged to restaurants (VORA Intelligence side); this
-- adds the business_profiles relationship so a company's open positions can
-- appear on its public /business/[slug] page.

PRAGMA foreign_keys = ON;

ALTER TABLE jobs ADD COLUMN business_id TEXT REFERENCES business_profiles(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_jobs_business ON jobs(business_id);
