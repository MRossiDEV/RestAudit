import "server-only";
import { getDb } from "@/db";
import {
  getTalentProfile,
  getTalentProfileBySlug,
} from "@/db/queries/talent";
import type {
  AvailabilityStatus,
  Proficiency,
  PublicTalentProfile,
  SkillLevel,
  TalentProfile,
  TalentProfileFull,
} from "@/types/domain";

type Row = Record<string, unknown>;

/**
 * Build the whitelisted public shape for a profile. Never exposes internal
 * ids, user_id, email, or salary. Phone is included only when the owner has
 * enabled `show_phone_publicly`.
 */
export function toPublicProfile(profile: TalentProfile): PublicTalentProfile {
  const full = getTalentProfile(profile.id);
  const name = `${profile.first_name} ${profile.last_name}`.trim();

  return {
    slug: profile.slug ?? "",
    name,
    professional_title: profile.professional_title,
    city: profile.location,
    country: profile.country,
    avatar_url: profile.avatar_url,
    summary: profile.bio,
    availability: profile.availability_status as AvailabilityStatus,
    employment_types: profile.employment_types,
    relocation_available: profile.relocation_available,
    phone: profile.show_phone_publicly && profile.contact_phone ? profile.contact_phone : null,
    skills: (full?.skills ?? []).map((s) => ({ name: s.name, level: s.level as SkillLevel })),
    experience: (full?.experience ?? []).map((e) => ({
      company: e.company,
      position: e.position,
      start_date: e.start_date,
      end_date: e.end_date,
      description: e.achievements,
    })),
    education: (full?.education ?? []).map((e) => ({
      institution: e.institution,
      qualification: e.qualification,
      field: e.field,
      start_date: e.start_date,
      end_date: e.end_date,
      description: e.description,
    })),
    languages: (full?.languages ?? []).map((l) => ({
      language: l.language,
      proficiency: l.proficiency as Proficiency,
    })),
  };
}

/** Resolve a public profile by slug, only when `profile_visibility = 'public'`. */
export function getPublicTalentProfile(slug: string): PublicTalentProfile | null {
  const profile = getTalentProfileBySlug(slug);
  if (!profile) return null;
  if (profile.profile_visibility !== "public") return null;
  return toPublicProfile(profile);
}

/** List all public profiles for the landing "Ver perfiles" page. */
export function listPublicTalentProfiles(): PublicTalentProfile[] {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT id FROM talent_profiles
       WHERE profile_visibility = 'public' AND slug IS NOT NULL
       ORDER BY datetime(updated_at) DESC`,
    )
    .all() as Row[];
  return rows
    .map((r) => getTalentProfile(String(r.id)))
    .filter((p): p is TalentProfileFull => Boolean(p))
    .map(toPublicProfile);
}

/** Simple profile-completion percentage (0–100) for the candidate dashboard. */
export function profileCompletion(profile: TalentProfile): number {
  const full = getTalentProfile(profile.id);
  const checks: boolean[] = [
    Boolean(profile.avatar_url),
    Boolean(profile.first_name || profile.last_name),
    Boolean(profile.professional_title),
    Boolean(profile.location),
    Boolean(profile.bio),
    Boolean(full && full.experience.length > 0),
    Boolean(full && full.skills.length > 0),
    Boolean(full && full.education.length > 0),
    Boolean(full && full.languages.length > 0),
  ];
  const completed = checks.filter(Boolean).length;
  return Math.round((completed / checks.length) * 100);
}