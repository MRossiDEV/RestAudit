-- Migration 0016: make public the default visibility for talent profiles.
-- VORA Talent is a CV platform, not social media — profiles are public by
-- default and shareable via their public URL.

PRAGMA foreign_keys = ON;

-- Backfill all existing profiles to public.
UPDATE talent_profiles SET profile_visibility = 'public'
  WHERE profile_visibility IS NULL OR profile_visibility != 'public';

-- Align the legacy internal `visibility` column (0013) as well, so the two
-- columns don't drift for older seeded rows.
UPDATE talent_profiles SET visibility = 'public'
  WHERE visibility IS NULL OR visibility = 'anonymous';