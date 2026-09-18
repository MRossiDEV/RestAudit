import "server-only";
import { getDb } from "@/db";
import { newId } from "@/lib/id";
import type {
  BusinessMember,
  BusinessProfile,
  BusinessRole,
  ProfileAccessContext,
  ProfileAccessEvent,
  SavedTalent,
  SavedTalentStatus,
  TalentMatch,
  TalentSearch,
  TalentSearchRequirements,
} from "@/types/domain";

type Row = Record<string, unknown>;

function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/* ── Business profiles ─────────────────────────────────────── */

function mapBusiness(row: Row): BusinessProfile {
  return {
    id: String(row.id),
    user_id: String(row.user_id),
    slug: (row.slug as string | null) ?? null,
    business_name: String(row.business_name),
    business_type: String(row.business_type ?? ""),
    country: String(row.country ?? ""),
    region: String(row.region ?? ""),
    city: String(row.city ?? ""),
    website: String(row.website ?? ""),
    description: String(row.description ?? ""),
    logo_url: String(row.logo_url ?? ""),
    contact_name: String(row.contact_name ?? ""),
    contact_phone: String(row.contact_phone ?? ""),
    hiring_interests: parseJson<string[]>(row.hiring_interests as string, []),
    verification_status:
      (row.verification_status as BusinessProfile["verification_status"]) ??
      "unverified",
    tagline: String(row.tagline ?? ""),
    size: String(row.size ?? ""),
    hiring_international: Boolean(row.hiring_international),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export function getBusinessByUserId(userId: string): BusinessProfile | undefined {
  const row = getDb()
    .prepare("SELECT * FROM business_profiles WHERE user_id = ?")
    .get(userId) as Row | undefined;
  return row ? mapBusiness(row) : undefined;
}

export function getBusinessById(id: string): BusinessProfile | undefined {
  const row = getDb()
    .prepare("SELECT * FROM business_profiles WHERE id = ?")
    .get(id) as Row | undefined;
  return row ? mapBusiness(row) : undefined;
}

export function getBusinessBySlug(slug: string): BusinessProfile | undefined {
  const row = getDb()
    .prepare("SELECT * FROM business_profiles WHERE slug = ?")
    .get(slug) as Row | undefined;
  return row ? mapBusiness(row) : undefined;
}

function slugify(name: string): string {
  return (
    name
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "business"
  );
}

function uniqueBusinessSlug(name: string): string {
  const base = slugify(name);
  let candidate = base;
  let i = 2;
  const exists = (slug: string) =>
    Boolean(
      getDb().prepare("SELECT 1 FROM business_profiles WHERE slug = ?").get(slug),
    );
  while (exists(candidate)) {
    candidate = `${base}-${i}`;
    i += 1;
  }
  return candidate;
}

export function createBusinessProfile(input: {
  userId: string;
  businessName: string;
  businessType?: string;
  country?: string;
  region?: string;
  city?: string;
  contactName?: string;
  contactPhone?: string;
  hiringInterests?: string[];
}): BusinessProfile {
  const db = getDb();
  const id = newId();
  const slug = uniqueBusinessSlug(input.businessName);
  db.prepare(
    `INSERT INTO business_profiles
       (id, user_id, slug, business_name, business_type, country, region, city,
        contact_name, contact_phone, hiring_interests)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.userId,
    slug,
    input.businessName,
    input.businessType ?? "",
    input.country ?? "",
    input.region ?? "",
    input.city ?? "",
    input.contactName ?? "",
    input.contactPhone ?? "",
    JSON.stringify(input.hiringInterests ?? []),
  );

  // The registering user becomes the business owner member.
  db.prepare(
    `INSERT INTO business_members (id, business_id, user_id, role)
     VALUES (?, ?, ?, 'owner')`,
  ).run(newId(), id, input.userId);

  return getBusinessById(id)!;
}

export function updateBusinessProfile(
  id: string,
  input: Partial<
    Pick<
      BusinessProfile,
      | "business_name"
      | "business_type"
      | "country"
      | "region"
      | "city"
      | "website"
      | "description"
      | "logo_url"
      | "contact_name"
      | "contact_phone"
      | "tagline"
      | "size"
    >
  > & { hiring_interests?: string[]; hiring_international?: boolean },
): void {
  const db = getDb();
  db.prepare(
    `UPDATE business_profiles SET
       business_name = COALESCE(@business_name, business_name),
       business_type = COALESCE(@business_type, business_type),
       country = COALESCE(@country, country),
       region = COALESCE(@region, region),
       city = COALESCE(@city, city),
       website = COALESCE(@website, website),
       description = COALESCE(@description, description),
       logo_url = COALESCE(@logo_url, logo_url),
       contact_name = COALESCE(@contact_name, contact_name),
       contact_phone = COALESCE(@contact_phone, contact_phone),
       tagline = COALESCE(@tagline, tagline),
       size = COALESCE(@size, size),
       hiring_international = COALESCE(@hiring_international, hiring_international),
       hiring_interests = COALESCE(@hiring_interests, hiring_interests),
       updated_at = datetime('now')
     WHERE id = @id`,
  ).run({
    id,
    business_name: input.business_name ?? null,
    business_type: input.business_type ?? null,
    country: input.country ?? null,
    region: input.region ?? null,
    city: input.city ?? null,
    website: input.website ?? null,
    description: input.description ?? null,
    logo_url: input.logo_url ?? null,
    contact_name: input.contact_name ?? null,
    contact_phone: input.contact_phone ?? null,
    tagline: input.tagline ?? null,
    size: input.size ?? null,
    hiring_international:
      input.hiring_international == null ? null : Number(input.hiring_international),
    hiring_interests: input.hiring_interests
      ? JSON.stringify(input.hiring_interests)
      : null,
  });
}

/* ── Business members ──────────────────────────────────────── */

function mapMember(row: Row): BusinessMember {
  return {
    id: String(row.id),
    business_id: String(row.business_id),
    user_id: String(row.user_id),
    role: (row.role as BusinessRole) ?? "member",
    created_at: String(row.created_at),
  };
}

export function listBusinessMembers(businessId: string): BusinessMember[] {
  const rows = getDb()
    .prepare("SELECT * FROM business_members WHERE business_id = ? ORDER BY created_at")
    .all(businessId) as Row[];
  return rows.map(mapMember);
}

/* ── Saved talent ──────────────────────────────────────────── */

function mapSaved(row: Row): SavedTalent {
  return {
    id: String(row.id),
    business_id: String(row.business_id),
    talent_profile_id: String(row.talent_profile_id),
    status: (row.status as SavedTalentStatus) ?? "saved",
    notes: String(row.notes ?? ""),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export function saveTalent(input: {
  businessId: string;
  talentProfileId: string;
  notes?: string;
}): SavedTalent {
  const db = getDb();
  const existing = db
    .prepare(
      "SELECT * FROM saved_talent WHERE business_id = ? AND talent_profile_id = ?",
    )
    .get(input.businessId, input.talentProfileId) as Row | undefined;
  if (existing) return mapSaved(existing);

  const id = newId();
  db.prepare(
    `INSERT INTO saved_talent (id, business_id, talent_profile_id, notes)
     VALUES (?, ?, ?, ?)`,
  ).run(id, input.businessId, input.talentProfileId, input.notes ?? "");
  return mapSaved(
    db.prepare("SELECT * FROM saved_talent WHERE id = ?").get(id) as Row,
  );
}

export function unsaveTalent(businessId: string, talentProfileId: string): void {
  getDb()
    .prepare(
      "DELETE FROM saved_talent WHERE business_id = ? AND talent_profile_id = ?",
    )
    .run(businessId, talentProfileId);
}

export function isTalentSaved(businessId: string, talentProfileId: string): boolean {
  return Boolean(
    getDb()
      .prepare(
        "SELECT id FROM saved_talent WHERE business_id = ? AND talent_profile_id = ?",
      )
      .get(businessId, talentProfileId),
  );
}

export function listSavedTalent(businessId: string): SavedTalent[] {
  const rows = getDb()
    .prepare(
      "SELECT * FROM saved_talent WHERE business_id = ? ORDER BY datetime(created_at) DESC",
    )
    .all(businessId) as Row[];
  return rows.map(mapSaved);
}

/* ── Talent searches ───────────────────────────────────────── */

function mapSearch(row: Row): TalentSearch {
  return {
    id: String(row.id),
    business_id: String(row.business_id),
    title: String(row.title ?? ""),
    requirements: parseJson<TalentSearchRequirements>(
      row.requirements as string,
      {},
    ),
    status: (row.status as TalentSearch["status"]) ?? "active",
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export function createTalentSearch(input: {
  businessId: string;
  title: string;
  requirements: TalentSearchRequirements;
}): TalentSearch {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO talent_searches (id, business_id, title, requirements)
     VALUES (?, ?, ?, ?)`,
  ).run(id, input.businessId, input.title, JSON.stringify(input.requirements));
  return mapSearch(
    db.prepare("SELECT * FROM talent_searches WHERE id = ?").get(id) as Row,
  );
}

export function listTalentSearches(businessId: string): TalentSearch[] {
  const rows = getDb()
    .prepare(
      "SELECT * FROM talent_searches WHERE business_id = ? ORDER BY datetime(created_at) DESC",
    )
    .all(businessId) as Row[];
  return rows.map(mapSearch);
}

export function getTalentSearch(id: string): TalentSearch | undefined {
  const row = getDb()
    .prepare("SELECT * FROM talent_searches WHERE id = ?")
    .get(id) as Row | undefined;
  return row ? mapSearch(row) : undefined;
}

/* ── Talent matches ────────────────────────────────────────── */

function mapMatch(row: Row): TalentMatch {
  return {
    id: String(row.id),
    search_id: String(row.search_id),
    talent_profile_id: String(row.talent_profile_id),
    score: Number(row.score ?? 0),
    factors: parseJson<TalentMatch["factors"]>(row.factors as string, {
      position: 0,
      skills: 0,
      experience: 0,
      location: 0,
      availability: 0,
      employmentType: 0,
      languages: 0,
      salary: 0,
    }),
    created_at: String(row.created_at),
  };
}

export function recordTalentMatch(input: {
  searchId: string;
  talentProfileId: string;
  score: number;
  factors: TalentMatch["factors"];
}): void {
  getDb()
    .prepare(
      `INSERT INTO talent_matches (id, search_id, talent_profile_id, score, factors)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT (search_id, talent_profile_id)
       DO UPDATE SET score = excluded.score, factors = excluded.factors`,
    )
    .run(
      newId(),
      input.searchId,
      input.talentProfileId,
      input.score,
      JSON.stringify(input.factors),
    );
}

export function listMatchesForSearch(searchId: string): TalentMatch[] {
  const rows = getDb()
    .prepare(
      "SELECT * FROM talent_matches WHERE search_id = ? ORDER BY score DESC",
    )
    .all(searchId) as Row[];
  return rows.map(mapMatch);
}

/* ── Profile access events ─────────────────────────────────── */

function mapAccess(row: Row): ProfileAccessEvent {
  return {
    id: String(row.id),
    talent_profile_id: String(row.talent_profile_id),
    viewer_user_id: (row.viewer_user_id as string) ?? null,
    business_id: (row.business_id as string) ?? null,
    access_context: (row.access_context as ProfileAccessContext) ?? "public_discovery",
    referrer: String(row.referrer ?? ""),
    created_at: String(row.created_at),
  };
}

export function recordProfileAccess(input: {
  talentProfileId: string;
  viewerUserId?: string | null;
  businessId?: string | null;
  accessContext: ProfileAccessContext;
  referrer?: string;
}): void {
  getDb()
    .prepare(
      `INSERT INTO profile_access_events
         (id, talent_profile_id, viewer_user_id, business_id, access_context, referrer)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(
      newId(),
      input.talentProfileId,
      input.viewerUserId ?? null,
      input.businessId ?? null,
      input.accessContext,
      input.referrer ?? "",
    );
}

export function listProfileAccess(talentProfileId: string): ProfileAccessEvent[] {
  const rows = getDb()
    .prepare(
      "SELECT * FROM profile_access_events WHERE talent_profile_id = ? ORDER BY datetime(created_at) DESC",
    )
    .all(talentProfileId) as Row[];
  return rows.map(mapAccess);
}
