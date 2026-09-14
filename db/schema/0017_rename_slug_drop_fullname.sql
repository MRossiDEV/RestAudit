-- Migration 0017: replace `full_name` with the slug; drop the redundant
-- `full_name` column now that first_name + last_name are authoritative.
-- Also rename username_slug -> slug for clarity (it IS the profile slug).

PRAGMA foreign_keys = ON;

-- 1. Rename username_slug -> slug.
ALTER TABLE talent_profiles RENAME COLUMN username_slug TO slug;

-- 2. Drop the redundant full_name column.
ALTER TABLE talent_profiles DROP COLUMN full_name;