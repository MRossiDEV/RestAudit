import "server-only";
import { getDb } from "@/db";
import { newId } from "@/lib/id";
import type {
  ApplicationStatus,
  AvailabilityStatus,
  AssessmentKind,
  CandidateMatch,
  CandidateUnlock,
  Job,
  JobApplication,
  JobStatus,
  JobTier,
  Proficiency,
  RehireAnswer,
  SalaryDatum,
  SkillCategory,
  SkillLevel,
  TalentAssessment,
  TalentCertification,
  TalentEducation,
  TalentExperience,
  TalentLanguage,
  TalentPortfolioItem,
  TalentProfile,
  TalentProfileFull,
  TalentReference,
  TalentSkill,
  TalentVerification,
  VerificationKind,
  VerificationState,
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

/* ── Talent profiles ──────────────────────────────────────── */

function mapProfile(row: Row): TalentProfile {
  return {
    id: String(row.id),
    user_id: (row.user_id as string) ?? null,
    professional_title: String(row.professional_title ?? ""),
    location: String(row.location ?? ""),
    country: String(row.country ?? ""),
    years_experience: Number(row.years_experience ?? 0),
    availability_status: (row.availability_status as AvailabilityStatus) ?? "open",
    visibility: (row.visibility as TalentProfile["visibility"]) ?? "anonymous",
    salary_min: (row.salary_min as number | null) ?? null,
    salary_max: (row.salary_max as number | null) ?? null,
    contact_email: String(row.contact_email ?? ""),
    contact_phone: String(row.contact_phone ?? ""),
    video_url: String(row.video_url ?? ""),
    bio: String(row.bio ?? ""),
    cv_raw_text: String(row.cv_raw_text ?? ""),
    verification_status: (row.verification_status as TalentProfile["verification_status"]) ?? "unverified",
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
    slug: (row.slug as string | null) ?? null,
    first_name: String(row.first_name ?? ""),
    last_name: String(row.last_name ?? ""),
    avatar_url: String(row.avatar_url ?? ""),
    profile_visibility: (row.profile_visibility as TalentProfile["profile_visibility"]) ?? "public",
    show_phone_publicly: Boolean(row.show_phone_publicly),
    relocation_available: Boolean(row.relocation_available),
    employment_types: parseJson<string[]>(row.employment_types as string, []),
    salary_expectation: (row.salary_expectation as number | null) ?? null,
  };
}

/** Display name derived from the split first/last name fields. */
export function fullName(profile: Pick<TalentProfile, "first_name" | "last_name">): string {
  return `${profile.first_name} ${profile.last_name}`.trim();
}

/** Split a single "First Last" string into first/last name parts. */
export function splitName(value: string): { firstName: string; lastName: string } {
  const trimmed = value.trim();
  const idx = trimmed.lastIndexOf(" ");
  if (idx <= 0) return { firstName: trimmed, lastName: "" };
  return {
    firstName: trimmed.slice(0, idx).trim(),
    lastName: trimmed.slice(idx + 1).trim(),
  };
}

export interface TalentFilters {
  role?: string;
  location?: string;
  minExperience?: number;
  skill?: string;
  availability?: string;
}

export function listTalentProfiles(filters: TalentFilters = {}): TalentProfile[] {
  const db = getDb();
  const where: string[] = [];
  const params: unknown[] = [];

  if (filters.role) {
    where.push("professional_title LIKE ?");
    params.push(`%${filters.role}%`);
  }
  if (filters.location) {
    where.push("location LIKE ?");
    params.push(`%${filters.location}%`);
  }
  if (filters.minExperience != null) {
    where.push("years_experience >= ?");
    params.push(filters.minExperience);
  }
  if (filters.availability) {
    where.push("availability_status = ?");
    params.push(filters.availability);
  }

  let sql = "SELECT * FROM talent_profiles";
  if (filters.skill) {
    sql +=
      " WHERE EXISTS (SELECT 1 FROM talent_skills s WHERE s.talent_profile_id = talent_profiles.id AND s.name LIKE ?)";
    params.push(`%${filters.skill}%`);
    if (where.length) sql += " AND " + where.join(" AND ");
  } else if (where.length) {
    sql += " WHERE " + where.join(" AND ");
  }
  sql += " ORDER BY datetime(updated_at) DESC";

  const rows = db.prepare(sql).all(...params) as Row[];
  return rows.map(mapProfile);
}

export function getTalentProfile(id: string): TalentProfileFull | undefined {
  const db = getDb();
  const row = db.prepare("SELECT * FROM talent_profiles WHERE id = ?").get(id) as Row | undefined;
  if (!row) return undefined;

  const skills = db
    .prepare("SELECT * FROM talent_skills WHERE talent_profile_id = ? ORDER BY name")
    .all(id) as Row[];
  const experience = db
    .prepare("SELECT * FROM talent_experience WHERE talent_profile_id = ? ORDER BY datetime(start_date) DESC")
    .all(id) as Row[];
  const certifications = db
    .prepare("SELECT * FROM talent_certifications WHERE talent_profile_id = ? ORDER BY name")
    .all(id) as Row[];
  const portfolio = db
    .prepare("SELECT * FROM talent_portfolio WHERE talent_profile_id = ? ORDER BY datetime(created_at) DESC")
    .all(id) as Row[];
  const verifications = db
    .prepare("SELECT * FROM talent_verifications WHERE talent_profile_id = ? ORDER BY datetime(created_at) DESC")
    .all(id) as Row[];
  const assessments = db
    .prepare("SELECT * FROM talent_assessments WHERE talent_profile_id = ? ORDER BY datetime(taken_at) DESC")
    .all(id) as Row[];
  const references = db
    .prepare("SELECT * FROM talent_references WHERE talent_profile_id = ? ORDER BY datetime(created_at) DESC")
    .all(id) as Row[];
  const education = db
    .prepare("SELECT * FROM talent_education WHERE talent_profile_id = ? ORDER BY sort_order ASC, datetime(created_at) ASC")
    .all(id) as Row[];
  const languages = db
    .prepare("SELECT * FROM talent_languages WHERE talent_profile_id = ? ORDER BY sort_order ASC, datetime(created_at) ASC")
    .all(id) as Row[];

  return {
    ...mapProfile(row),
    skills: skills.map(mapSkill),
    experience: experience.map(mapExperience),
    certifications: certifications.map(mapCertification),
    portfolio: portfolio.map(mapPortfolio),
    verifications: verifications.map(mapVerification),
    assessments: assessments.map(mapAssessment),
    references: references.map(mapReference),
    education: education.map(mapEducation),
    languages: languages.map(mapLanguage),
  };
}

export function getTalentAlias(id: string): string {
  // PRD §11: anonymized handle derived deterministically from the profile id.
  const hex = id.replace(/-/g, "").slice(0, 4).toUpperCase();
  return `VR-${hex}`;
}

export function isUnlocked(restaurantId: string, talentProfileId: string): boolean {
  const row = getDb()
    .prepare("SELECT 1 FROM candidate_unlocks WHERE restaurant_id = ? AND talent_profile_id = ?")
    .get(restaurantId, talentProfileId);
  return row != null;
}

/* ── Skills / experience / certifications / portfolio ────── */

function mapSkill(row: Row): TalentSkill {
  return {
    id: String(row.id),
    talent_profile_id: String(row.talent_profile_id),
    name: String(row.name),
    category: (row.category as SkillCategory) ?? "operational",
    level: (row.level as SkillLevel) ?? "intermediate",
    created_at: String(row.created_at),
  };
}

function mapExperience(row: Row): TalentExperience {
  return {
    id: String(row.id),
    talent_profile_id: String(row.talent_profile_id),
    company: String(row.company ?? ""),
    position: String(row.position ?? ""),
    restaurant_type: String(row.restaurant_type ?? ""),
    start_date: String(row.start_date ?? ""),
    end_date: (row.end_date as string) ?? null,
    team_size: (row.team_size as number | null) ?? null,
    responsibilities: parseJson<string[]>(row.responsibilities as string, []),
    achievements: String(row.achievements ?? ""),
    created_at: String(row.created_at),
  };
}

function mapCertification(row: Row): TalentCertification {
  return {
    id: String(row.id),
    talent_profile_id: String(row.talent_profile_id),
    name: String(row.name),
    issuer: String(row.issuer ?? ""),
    issued_at: (row.issued_at as string) ?? null,
    expires_at: (row.expires_at as string) ?? null,
    verified: Boolean(row.verified),
    created_at: String(row.created_at),
  };
}

function mapPortfolio(row: Row): TalentPortfolioItem {
  return {
    id: String(row.id),
    talent_profile_id: String(row.talent_profile_id),
    kind: (row.kind as TalentPortfolioItem["kind"]) ?? "image",
    title: String(row.title),
    url: String(row.url ?? ""),
    description: String(row.description ?? ""),
    created_at: String(row.created_at),
  };
}

function mapEducation(row: Row): TalentEducation {
  return {
    id: String(row.id),
    talent_profile_id: String(row.talent_profile_id),
    institution: String(row.institution ?? ""),
    qualification: String(row.qualification ?? ""),
    field: String(row.field ?? ""),
    start_date: String(row.start_date ?? ""),
    end_date: (row.end_date as string) ?? null,
    description: String(row.description ?? ""),
    sort_order: Number(row.sort_order ?? 0),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

function mapLanguage(row: Row): TalentLanguage {
  return {
    id: String(row.id),
    talent_profile_id: String(row.talent_profile_id),
    language: String(row.language ?? ""),
    proficiency: (row.proficiency as Proficiency) ?? "professional",
    sort_order: Number(row.sort_order ?? 0),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

/* ── Jobs ─────────────────────────────────────────────────── */

const JOB_SELECT = `
  SELECT j.*, r.name AS restaurant_name
  FROM jobs j
  LEFT JOIN restaurants r ON r.id = j.restaurant_id
`;

function mapJob(row: Row): Job {
  return {
    id: String(row.id),
    restaurant_id: String(row.restaurant_id),
    restaurant_name: (row.restaurant_name as string) ?? undefined,
    title: String(row.title),
    description: String(row.description ?? ""),
    location: String(row.location ?? ""),
    employment_type: String(row.employment_type ?? "full_time"),
    salary_min: (row.salary_min as number | null) ?? null,
    salary_max: (row.salary_max as number | null) ?? null,
    experience_required: Number(row.experience_required ?? 0),
    skills_required: parseJson<string[]>(row.skills_required as string, []),
    screening_questions: parseJson<string[]>(row.screening_questions as string, []),
    status: (row.status as JobStatus) ?? "draft",
    tier: (row.tier as JobTier) ?? "standard",
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export function listJobs(status?: JobStatus): Job[] {
  let sql = `${JOB_SELECT}`;
  const params: unknown[] = [];
  if (status) {
    sql += " WHERE j.status = ?";
    params.push(status);
  }
  sql += " ORDER BY datetime(j.updated_at) DESC";
  const rows = getDb().prepare(sql).all(...params) as Row[];
  return rows.map(mapJob);
}

export function getJob(id: string): Job | undefined {
  const row = getDb().prepare(`${JOB_SELECT} WHERE j.id = ?`).get(id) as Row | undefined;
  return row ? mapJob(row) : undefined;
}

export function listJobsForRestaurant(restaurantId: string): Job[] {
  const rows = getDb()
    .prepare(`${JOB_SELECT} WHERE j.restaurant_id = ? ORDER BY datetime(j.updated_at) DESC`)
    .all(restaurantId) as Row[];
  return rows.map(mapJob);
}

/* ── Applications & pipeline ──────────────────────────────── */

export const APPLICATION_COLUMNS: ApplicationStatus[] = [
  "applied",
  "screening",
  "shortlisted",
  "interview",
  "final_review",
  "hired",
];

function mapApplication(row: Row): JobApplication {
  return {
    id: String(row.id),
    job_id: String(row.job_id),
    talent_profile_id: String(row.talent_profile_id),
    talent_name: (row.talent_name as string) ?? undefined,
    talent_title: (row.talent_title as string) ?? undefined,
    status: (row.status as ApplicationStatus) ?? "applied",
    match_id: (row.match_id as string) ?? null,
    match_score: (row.match_score as number | null) ?? null,
    notes: String(row.notes ?? ""),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

const APPLICATION_SELECT = `
  SELECT a.*, trim(tp.first_name || ' ' || tp.last_name) AS talent_name, tp.professional_title AS talent_title,
         cm.final_score AS match_score
  FROM job_applications a
  LEFT JOIN talent_profiles tp ON tp.id = a.talent_profile_id
  LEFT JOIN candidate_matches cm ON cm.id = a.match_id
`;

export function listApplications(jobId?: string): JobApplication[] {
  let sql = APPLICATION_SELECT;
  const params: unknown[] = [];
  if (jobId) {
    sql += " WHERE a.job_id = ?";
    params.push(jobId);
  }
  sql += " ORDER BY datetime(a.updated_at) DESC";
  const rows = getDb().prepare(sql).all(...params) as Row[];
  return rows.map(mapApplication);
}

export function listApplicationsGrouped(
  jobId?: string,
): Record<ApplicationStatus, JobApplication[]> {
  const grouped = {} as Record<ApplicationStatus, JobApplication[]>;
  for (const col of APPLICATION_COLUMNS) grouped[col] = [];
  for (const app of listApplications(jobId)) {
    if (grouped[app.status]) grouped[app.status].push(app);
  }
  return grouped;
}

/* ── Matches ──────────────────────────────────────────────── */

function mapMatch(row: Row): CandidateMatch {
  return {
    id: String(row.id),
    talent_profile_id: String(row.talent_profile_id),
    job_id: (row.job_id as string) ?? null,
    restaurant_id: (row.restaurant_id as string) ?? null,
    technical_score: Number(row.technical_score ?? 0),
    experience_score: Number(row.experience_score ?? 0),
    location_score: Number(row.location_score ?? 0),
    salary_score: Number(row.salary_score ?? 0),
    availability_score: Number(row.availability_score ?? 0),
    compatibility_score: Number(row.compatibility_score ?? 0),
    final_score: Number(row.final_score ?? 0),
    ai_summary: String(row.ai_summary ?? ""),
    created_at: String(row.created_at),
  };
}

export function getMatch(id: string): CandidateMatch | undefined {
  const row = getDb().prepare("SELECT * FROM candidate_matches WHERE id = ?").get(id) as Row | undefined;
  return row ? mapMatch(row) : undefined;
}

export function listMatchesForJob(jobId: string): CandidateMatch[] {
  const rows = getDb()
    .prepare("SELECT * FROM candidate_matches WHERE job_id = ? ORDER BY final_score DESC")
    .all(jobId) as Row[];
  return rows.map(mapMatch);
}

export function listMatchesForTalent(talentProfileId: string): CandidateMatch[] {
  const rows = getDb()
    .prepare("SELECT * FROM candidate_matches WHERE talent_profile_id = ? ORDER BY final_score DESC")
    .all(talentProfileId) as Row[];
  return rows.map(mapMatch);
}

/* ── Verifications / assessments / references / salary ────── */

function mapVerification(row: Row): TalentVerification {
  return {
    id: String(row.id),
    talent_profile_id: String(row.talent_profile_id),
    talent_name: (row.talent_name as string) ?? undefined,
    kind: (row.kind as VerificationKind) ?? "identity",
    status: (row.status as VerificationState) ?? "pending",
    verified_by_user_id: (row.verified_by_user_id as string) ?? null,
    notes: String(row.notes ?? ""),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

const VERIFICATION_SELECT = `
  SELECT v.*, trim(tp.first_name || ' ' || tp.last_name) AS talent_name
  FROM talent_verifications v
  LEFT JOIN talent_profiles tp ON tp.id = v.talent_profile_id
`;

export function listVerifications(status?: VerificationState): TalentVerification[] {
  let sql = VERIFICATION_SELECT;
  const params: unknown[] = [];
  if (status) {
    sql += " WHERE v.status = ?";
    params.push(status);
  }
  sql += " ORDER BY datetime(v.created_at) DESC";
  const rows = getDb().prepare(sql).all(...params) as Row[];
  return rows.map(mapVerification);
}

function mapAssessment(row: Row): TalentAssessment {
  return {
    id: String(row.id),
    talent_profile_id: String(row.talent_profile_id),
    kind: (row.kind as AssessmentKind) ?? "custom",
    scores: parseJson<Record<string, number>>(row.scores_json as string, {}),
    total_score: (row.total_score as number | null) ?? null,
    taken_at: String(row.taken_at),
    created_at: String(row.created_at),
  };
}

function mapReference(row: Row): TalentReference {
  return {
    id: String(row.id),
    talent_profile_id: String(row.talent_profile_id),
    employer_name: String(row.employer_name ?? ""),
    position_confirmed: Boolean(row.position_confirmed),
    would_rehire: (row.would_rehire as RehireAnswer | null) ?? null,
    strengths: String(row.strengths ?? ""),
    feedback: String(row.feedback ?? ""),
    created_at: String(row.created_at),
  };
}

export function listSalaryData(position?: string): SalaryDatum[] {
  let sql = "SELECT * FROM salary_data";
  const params: unknown[] = [];
  if (position) {
    sql += " WHERE position LIKE ?";
    params.push(`%${position}%`);
  }
  sql += " ORDER BY position";
  const rows = getDb().prepare(sql).all(...params) as Row[];
  return rows.map((row) => ({
    id: String(row.id),
    position: String(row.position),
    location: String(row.location ?? ""),
    avg_salary: (row.avg_salary as number | null) ?? null,
    min_salary: (row.min_salary as number | null) ?? null,
    max_salary: (row.max_salary as number | null) ?? null,
    sample_size: Number(row.sample_size ?? 0),
    updated_at: String(row.updated_at),
  }));
}

export function getRestaurantCredits(restaurantId: string): number {
  const row = getDb()
    .prepare("SELECT balance FROM restaurant_credits WHERE restaurant_id = ?")
    .get(restaurantId) as { balance: number } | undefined;
  return row?.balance ?? 0;
}

/* ── Writes ───────────────────────────────────────────────── */

export function createTalentProfile(input: {
  fullName: string;
  professionalTitle: string;
  location?: string;
  country?: string;
  yearsExperience?: number;
  availabilityStatus?: AvailabilityStatus;
  visibility?: TalentProfile["visibility"];
  salaryMin?: number | null;
  salaryMax?: number | null;
  contactEmail?: string;
  contactPhone?: string;
  bio?: string;
}): TalentProfile {
  const db = getDb();
  const id = newId();
  const { firstName, lastName } = splitName(input.fullName);
  db.prepare(
    `INSERT INTO talent_profiles
       (id, first_name, last_name, professional_title, location, country,
        years_experience, availability_status, visibility, salary_min, salary_max,
        contact_email, contact_phone, bio)
     VALUES (@id, @firstName, @lastName, @professionalTitle, @location, @country,
        @yearsExperience, @availabilityStatus, @visibility, @salaryMin, @salaryMax,
        @contactEmail, @contactPhone, @bio)`,
  ).run({
    id,
    firstName,
    lastName,
    professionalTitle: input.professionalTitle,
    location: input.location ?? "",
    country: input.country ?? "",
    yearsExperience: input.yearsExperience ?? 0,
    availabilityStatus: input.availabilityStatus ?? "open",
    visibility: input.visibility ?? "anonymous",
    salaryMin: input.salaryMin ?? null,
    salaryMax: input.salaryMax ?? null,
    contactEmail: input.contactEmail ?? "",
    contactPhone: input.contactPhone ?? "",
    bio: input.bio ?? "",
  });
  return getTalentProfile(id)!;
}

/** Create the candidate's own public profile, bound to a user and slug. */
export function createCandidateProfile(input: {
  userId: string;
  firstName: string;
  lastName: string;
  professionalTitle?: string;
  city?: string;
  country?: string;
  summary?: string;
}): TalentProfile {
  const db = getDb();
  const id = newId();
  const slug = generateUniqueSlug(input.firstName, input.lastName);
  db.prepare(
    `INSERT INTO talent_profiles
       (id, user_id, slug, first_name, last_name,
        professional_title, location, country, bio, profile_visibility)
     VALUES (@id, @userId, @slug, @firstName, @lastName,
        @professionalTitle, @city, @country, @summary, 'public')`,
  ).run({
    id,
    userId: input.userId,
    slug,
    firstName: input.firstName,
    lastName: input.lastName,
    professionalTitle: input.professionalTitle ?? "",
    city: input.city ?? "",
    country: input.country ?? "",
    summary: input.summary ?? "",
  });
  return getTalentProfile(id)!;
}

export function updateTalentProfile(
  id: string,
  input: Partial<{
    professionalTitle: string;
    location: string;
    country: string;
    yearsExperience: number;
    availabilityStatus: AvailabilityStatus;
    visibility: TalentProfile["visibility"];
    salaryMin: number | null;
    salaryMax: number | null;
    contactEmail: string;
    contactPhone: string;
    bio: string;
    cvRawText: string;
    verificationStatus: TalentProfile["verification_status"];
    firstName: string;
    lastName: string;
    slug: string;
    avatarUrl: string;
    profileVisibility: TalentProfile["profile_visibility"];
    showPhonePublicly: boolean;
    relocationAvailable: boolean;
    employmentTypes: string[];
    salaryExpectation: number | null;
  }>,
): void {
  const db = getDb();
  const current = getTalentProfile(id);
  if (!current) return;
  db.prepare(
    `UPDATE talent_profiles SET
       professional_title = COALESCE(@professionalTitle, professional_title),
       location = COALESCE(@location, location),
       country = COALESCE(@country, country),
       years_experience = COALESCE(@yearsExperience, years_experience),
       availability_status = COALESCE(@availabilityStatus, availability_status),
       visibility = COALESCE(@visibility, visibility),
       salary_min = COALESCE(@salaryMin, salary_min),
       salary_max = COALESCE(@salaryMax, salary_max),
       contact_email = COALESCE(@contactEmail, contact_email),
       contact_phone = COALESCE(@contactPhone, contact_phone),
       bio = COALESCE(@bio, bio),
       cv_raw_text = COALESCE(@cvRawText, cv_raw_text),
       verification_status = COALESCE(@verificationStatus, verification_status),
       first_name = COALESCE(@firstName, first_name),
       last_name = COALESCE(@lastName, last_name),
       slug = COALESCE(@slug, slug),
       avatar_url = COALESCE(@avatarUrl, avatar_url),
       profile_visibility = COALESCE(@profileVisibility, profile_visibility),
       show_phone_publicly = COALESCE(@showPhonePublicly, show_phone_publicly),
       relocation_available = COALESCE(@relocationAvailable, relocation_available),
       employment_types = COALESCE(@employmentTypes, employment_types),
       salary_expectation = COALESCE(@salaryExpectation, salary_expectation),
       updated_at = datetime('now')
     WHERE id = @id`,
  ).run({
    id,
    professionalTitle: input.professionalTitle ?? null,
    location: input.location ?? null,
    country: input.country ?? null,
    yearsExperience: input.yearsExperience ?? null,
    availabilityStatus: input.availabilityStatus ?? null,
    visibility: input.visibility ?? null,
    salaryMin: input.salaryMin ?? null,
    salaryMax: input.salaryMax ?? null,
    contactEmail: input.contactEmail ?? null,
    contactPhone: input.contactPhone ?? null,
    bio: input.bio ?? null,
    cvRawText: input.cvRawText ?? null,
    verificationStatus: input.verificationStatus ?? null,
    firstName: input.firstName ?? null,
    lastName: input.lastName ?? null,
    slug: input.slug ?? null,
    avatarUrl: input.avatarUrl ?? null,
    profileVisibility: input.profileVisibility ?? null,
    showPhonePublicly: input.showPhonePublicly ?? null,
    relocationAvailable: input.relocationAvailable ?? null,
    employmentTypes: input.employmentTypes ? JSON.stringify(input.employmentTypes) : null,
    salaryExpectation: input.salaryExpectation ?? null,
  });
}

export function deleteTalentProfile(id: string): void {
  getDb().prepare("DELETE FROM talent_profiles WHERE id = ?").run(id);
}

export function addTalentSkill(input: {
  talentProfileId: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}): TalentSkill {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO talent_skills (id, talent_profile_id, name, category, level)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(id, input.talentProfileId, input.name, input.category, input.level);
  return mapSkill(
    db.prepare("SELECT * FROM talent_skills WHERE id = ?").get(id) as Row,
  );
}

export function addTalentExperience(input: {
  talentProfileId: string;
  company: string;
  position: string;
  restaurantType?: string;
  startDate?: string;
  endDate?: string | null;
  teamSize?: number | null;
  responsibilities?: string[];
  achievements?: string;
}): TalentExperience {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO talent_experience
       (id, talent_profile_id, company, position, restaurant_type, start_date,
        end_date, team_size, responsibilities, achievements)
     VALUES (@id, @talentProfileId, @company, @position, @restaurantType, @startDate,
        @endDate, @teamSize, @responsibilities, @achievements)`,
  ).run({
    id,
    talentProfileId: input.talentProfileId,
    company: input.company,
    position: input.position,
    restaurantType: input.restaurantType ?? "",
    startDate: input.startDate ?? "",
    endDate: input.endDate ?? null,
    teamSize: input.teamSize ?? null,
    responsibilities: JSON.stringify(input.responsibilities ?? []),
    achievements: input.achievements ?? "",
  });
  return mapExperience(
    db.prepare("SELECT * FROM talent_experience WHERE id = ?").get(id) as Row,
  );
}

export function updateTalentSkill(
  id: string,
  input: Partial<{ name: string; category: SkillCategory; level: SkillLevel }>,
): void {
  const db = getDb();
  db.prepare(
    `UPDATE talent_skills SET
       name = COALESCE(@name, name),
       category = COALESCE(@category, category),
       level = COALESCE(@level, level)
     WHERE id = @id`,
  ).run({
    id,
    name: input.name ?? null,
    category: input.category ?? null,
    level: input.level ?? null,
  });
}

export function deleteTalentSkill(id: string): void {
  getDb().prepare("DELETE FROM talent_skills WHERE id = ?").run(id);
}

export function updateTalentExperience(
  id: string,
  input: Partial<{
    company: string;
    position: string;
    restaurantType: string;
    startDate: string;
    endDate: string | null;
    teamSize: number | null;
    responsibilities: string[];
    achievements: string;
  }>,
): void {
  const db = getDb();
  db.prepare(
    `UPDATE talent_experience SET
       company = COALESCE(@company, company),
       position = COALESCE(@position, position),
       restaurant_type = COALESCE(@restaurantType, restaurant_type),
       start_date = COALESCE(@startDate, start_date),
       end_date = COALESCE(@endDate, end_date),
       team_size = COALESCE(@teamSize, team_size),
       responsibilities = COALESCE(@responsibilities, responsibilities),
       achievements = COALESCE(@achievements, achievements)
     WHERE id = @id`,
  ).run({
    id,
    company: input.company ?? null,
    position: input.position ?? null,
    restaurantType: input.restaurantType ?? null,
    startDate: input.startDate ?? null,
    endDate: input.endDate ?? null,
    teamSize: input.teamSize ?? null,
    responsibilities: input.responsibilities ? JSON.stringify(input.responsibilities) : null,
    achievements: input.achievements ?? null,
  });
}

export function deleteTalentExperience(id: string): void {
  getDb().prepare("DELETE FROM talent_experience WHERE id = ?").run(id);
}

export function addTalentCertification(input: {
  talentProfileId: string;
  name: string;
  issuer?: string;
  issuedAt?: string | null;
  expiresAt?: string | null;
}): TalentCertification {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO talent_certifications (id, talent_profile_id, name, issuer, issued_at, expires_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.talentProfileId,
    input.name,
    input.issuer ?? "",
    input.issuedAt ?? null,
    input.expiresAt ?? null,
  );
  return mapCertification(
    db.prepare("SELECT * FROM talent_certifications WHERE id = ?").get(id) as Row,
  );
}

export function addTalentPortfolioItem(input: {
  talentProfileId: string;
  kind: TalentPortfolioItem["kind"];
  title: string;
  url?: string;
  description?: string;
}): TalentPortfolioItem {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO talent_portfolio (id, talent_profile_id, kind, title, url, description)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(id, input.talentProfileId, input.kind, input.title, input.url ?? "", input.description ?? "");
  return mapPortfolio(
    db.prepare("SELECT * FROM talent_portfolio WHERE id = ?").get(id) as Row,
  );
}

export function createJob(input: {
  restaurantId: string;
  title: string;
  description?: string;
  location?: string;
  employmentType?: string;
  salaryMin?: number | null;
  salaryMax?: number | null;
  experienceRequired?: number;
  skillsRequired?: string[];
  screeningQuestions?: string[];
  tier?: JobTier;
}): Job {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO jobs
       (id, restaurant_id, title, description, location, employment_type, salary_min,
        salary_max, experience_required, skills_required, screening_questions, tier, status)
     VALUES (@id, @restaurantId, @title, @description, @location, @employmentType, @salaryMin,
        @salaryMax, @experienceRequired, @skillsRequired, @screeningQuestions, @tier, 'draft')`,
  ).run({
    id,
    restaurantId: input.restaurantId,
    title: input.title,
    description: input.description ?? "",
    location: input.location ?? "",
    employmentType: input.employmentType ?? "full_time",
    salaryMin: input.salaryMin ?? null,
    salaryMax: input.salaryMax ?? null,
    experienceRequired: input.experienceRequired ?? 0,
    skillsRequired: JSON.stringify(input.skillsRequired ?? []),
    screeningQuestions: JSON.stringify(input.screeningQuestions ?? []),
    tier: input.tier ?? "standard",
  });
  return getJob(id)!;
}

export function updateJob(
  id: string,
  input: Partial<{
    title: string;
    description: string;
    location: string;
    employmentType: string;
    salaryMin: number | null;
    salaryMax: number | null;
    experienceRequired: number;
    skillsRequired: string[];
    screeningQuestions: string[];
    tier: JobTier;
    status: JobStatus;
  }>,
): void {
  const db = getDb();
  db.prepare(
    `UPDATE jobs SET
       title = COALESCE(@title, title),
       description = COALESCE(@description, description),
       location = COALESCE(@location, location),
       employment_type = COALESCE(@employmentType, employment_type),
       salary_min = COALESCE(@salaryMin, salary_min),
       salary_max = COALESCE(@salaryMax, salary_max),
       experience_required = COALESCE(@experienceRequired, experience_required),
       skills_required = COALESCE(@skillsRequired, skills_required),
       screening_questions = COALESCE(@screeningQuestions, screening_questions),
       tier = COALESCE(@tier, tier),
       status = COALESCE(@status, status),
       updated_at = datetime('now')
     WHERE id = @id`,
  ).run({
    id,
    title: input.title ?? null,
    description: input.description ?? null,
    location: input.location ?? null,
    employmentType: input.employmentType ?? null,
    salaryMin: input.salaryMin ?? null,
    salaryMax: input.salaryMax ?? null,
    experienceRequired: input.experienceRequired ?? null,
    skillsRequired: input.skillsRequired ? JSON.stringify(input.skillsRequired) : null,
    screeningQuestions: input.screeningQuestions ? JSON.stringify(input.screeningQuestions) : null,
    tier: input.tier ?? null,
    status: input.status ?? null,
  });
}

export function setJobStatus(id: string, status: JobStatus): void {
  getDb()
    .prepare("UPDATE jobs SET status = ?, updated_at = datetime('now') WHERE id = ?")
    .run(status, id);
}

export function createMatch(input: {
  talentProfileId: string;
  jobId: string | null;
  restaurantId: string | null;
  technicalScore: number;
  experienceScore: number;
  locationScore: number;
  salaryScore: number;
  availabilityScore: number;
  compatibilityScore: number;
  finalScore: number;
  aiSummary?: string;
}): CandidateMatch {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO candidate_matches
       (id, talent_profile_id, job_id, restaurant_id, technical_score, experience_score,
        location_score, salary_score, availability_score, compatibility_score, final_score, ai_summary)
     VALUES (@id, @talentProfileId, @jobId, @restaurantId, @technicalScore, @experienceScore,
        @locationScore, @salaryScore, @availabilityScore, @compatibilityScore, @finalScore, @aiSummary)`,
  ).run({
    id,
    talentProfileId: input.talentProfileId,
    jobId: input.jobId,
    restaurantId: input.restaurantId,
    technicalScore: input.technicalScore,
    experienceScore: input.experienceScore,
    locationScore: input.locationScore,
    salaryScore: input.salaryScore,
    availabilityScore: input.availabilityScore,
    compatibilityScore: input.compatibilityScore,
    finalScore: input.finalScore,
    aiSummary: input.aiSummary ?? "",
  });
  return getMatch(id)!;
}

export function createApplication(input: {
  jobId: string;
  talentProfileId: string;
  matchId?: string | null;
  notes?: string;
}): JobApplication {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO job_applications (id, job_id, talent_profile_id, status, match_id, notes)
     VALUES (?, ?, ?, 'applied', ?, ?)`,
  ).run(id, input.jobId, input.talentProfileId, input.matchId ?? null, input.notes ?? "");
  return mapApplication(
    db.prepare(`${APPLICATION_SELECT} WHERE a.id = ?`).get(id) as Row,
  );
}

export function setApplicationStatus(id: string, status: ApplicationStatus): void {
  getDb()
    .prepare("UPDATE job_applications SET status = ?, updated_at = datetime('now') WHERE id = ?")
    .run(status, id);
}

export function unlockCandidate(
  restaurantId: string,
  talentProfileId: string,
  costCredits = 1,
): { ok: boolean; error?: string } {
  const db = getDb();
  if (isUnlocked(restaurantId, talentProfileId)) return { ok: true };

  const unlock = db.transaction((): { ok: boolean; error?: string } => {
    const row = db
      .prepare("SELECT balance FROM restaurant_credits WHERE restaurant_id = ?")
      .get(restaurantId) as { balance: number } | undefined;
    const balance = row?.balance ?? 0;
    if (balance < costCredits) return { ok: false, error: "Créditos insuficientes" };

    db.prepare(
      "UPDATE restaurant_credits SET balance = balance - ?, updated_at = datetime('now') WHERE restaurant_id = ?",
    ).run(costCredits, restaurantId);

    db.prepare(
      `INSERT INTO candidate_unlocks (id, restaurant_id, talent_profile_id, cost_credits)
       VALUES (?, ?, ?, ?)`,
    ).run(newId(), restaurantId, talentProfileId, costCredits);

    return { ok: true };
  });

  return unlock();
}

export function addRestaurantCredits(restaurantId: string, amount: number): void {
  getDb()
    .prepare(
      `INSERT INTO restaurant_credits (restaurant_id, balance)
       VALUES (?, ?)
       ON CONFLICT(restaurant_id) DO UPDATE SET balance = balance + excluded.balance, updated_at = datetime('now')`,
    )
    .run(restaurantId, amount);
}

export function upsertVerification(input: {
  talentProfileId: string;
  kind: VerificationKind;
  status: VerificationState;
  verifiedByUserId?: string | null;
  notes?: string;
}): TalentVerification {
  const db = getDb();
  const existing = db
    .prepare("SELECT id FROM talent_verifications WHERE talent_profile_id = ? AND kind = ?")
    .get(input.talentProfileId, input.kind) as { id: string } | undefined;

  if (existing) {
    db.prepare(
      `UPDATE talent_verifications SET
         status = @status,
         verified_by_user_id = @verifiedByUserId,
         notes = @notes,
         updated_at = datetime('now')
       WHERE id = @id`,
    ).run({
      id: existing.id,
      status: input.status,
      verifiedByUserId: input.verifiedByUserId ?? null,
      notes: input.notes ?? "",
    });
    return mapVerification(
      db.prepare(`${VERIFICATION_SELECT} WHERE v.id = ?`).get(existing.id) as Row,
    );
  }

  const id = newId();
  db.prepare(
    `INSERT INTO talent_verifications (id, talent_profile_id, kind, status, verified_by_user_id, notes)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(id, input.talentProfileId, input.kind, input.status, input.verifiedByUserId ?? null, input.notes ?? "");
  return mapVerification(
    db.prepare(`${VERIFICATION_SELECT} WHERE v.id = ?`).get(id) as Row,
  );
}

export function addAssessment(input: {
  talentProfileId: string;
  kind: AssessmentKind;
  scores: Record<string, number>;
  totalScore?: number | null;
}): TalentAssessment {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO talent_assessments (id, talent_profile_id, kind, scores_json, total_score)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(id, input.talentProfileId, input.kind, JSON.stringify(input.scores), input.totalScore ?? null);
  return mapAssessment(
    db.prepare("SELECT * FROM talent_assessments WHERE id = ?").get(id) as Row,
  );
}

export function addReference(input: {
  talentProfileId: string;
  employerName: string;
  positionConfirmed?: boolean;
  wouldRehire?: RehireAnswer | null;
  strengths?: string;
  feedback?: string;
}): TalentReference {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO talent_references
       (id, talent_profile_id, employer_name, position_confirmed, would_rehire, strengths, feedback)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.talentProfileId,
    input.employerName,
    input.positionConfirmed ? 1 : 0,
    input.wouldRehire ?? null,
    input.strengths ?? "",
    input.feedback ?? "",
  );
  return mapReference(
    db.prepare("SELECT * FROM talent_references WHERE id = ?").get(id) as Row,
  );
}

export function upsertSalaryDatum(input: {
  position: string;
  location?: string;
  avgSalary?: number | null;
  minSalary?: number | null;
  maxSalary?: number | null;
  sampleSize?: number;
}): SalaryDatum {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO salary_data (id, position, location, avg_salary, min_salary, max_salary, sample_size)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.position,
    input.location ?? "",
    input.avgSalary ?? null,
    input.minSalary ?? null,
    input.maxSalary ?? null,
    input.sampleSize ?? 0,
  );
  return {
    id,
    position: input.position,
    location: input.location ?? "",
    avg_salary: input.avgSalary ?? null,
    min_salary: input.minSalary ?? null,
    max_salary: input.maxSalary ?? null,
    sample_size: input.sampleSize ?? 0,
    updated_at: new Date().toISOString(),
  };
}

/* ── Public professional profile: education & languages ───── */

export function addTalentEducation(input: {
  talentProfileId: string;
  institution: string;
  qualification?: string;
  field?: string;
  startDate?: string;
  endDate?: string | null;
  description?: string;
}): TalentEducation {
  const db = getDb();
  const id = newId();
  const sortOrder = nextSortOrder(db, "talent_education", input.talentProfileId);
  db.prepare(
    `INSERT INTO talent_education
       (id, talent_profile_id, institution, qualification, field, start_date,
        end_date, description, sort_order)
     VALUES (@id, @talentProfileId, @institution, @qualification, @field, @startDate,
        @endDate, @description, @sortOrder)`,
  ).run({
    id,
    talentProfileId: input.talentProfileId,
    institution: input.institution,
    qualification: input.qualification ?? "",
    field: input.field ?? "",
    startDate: input.startDate ?? "",
    endDate: input.endDate ?? null,
    description: input.description ?? "",
    sortOrder,
  });
  return mapEducation(
    db.prepare("SELECT * FROM talent_education WHERE id = ?").get(id) as Row,
  );
}

export function updateTalentEducation(
  id: string,
  input: Partial<{
    institution: string;
    qualification: string;
    field: string;
    startDate: string;
    endDate: string | null;
    description: string;
  }>,
): void {
  const db = getDb();
  db.prepare(
    `UPDATE talent_education SET
       institution = COALESCE(@institution, institution),
       qualification = COALESCE(@qualification, qualification),
       field = COALESCE(@field, field),
       start_date = COALESCE(@startDate, start_date),
       end_date = COALESCE(@endDate, end_date),
       description = COALESCE(@description, description),
       updated_at = datetime('now')
     WHERE id = @id`,
  ).run({
    id,
    institution: input.institution ?? null,
    qualification: input.qualification ?? null,
    field: input.field ?? null,
    startDate: input.startDate ?? null,
    endDate: input.endDate ?? null,
    description: input.description ?? null,
  });
}

export function deleteTalentEducation(id: string): void {
  getDb().prepare("DELETE FROM talent_education WHERE id = ?").run(id);
}

export function addTalentLanguage(input: {
  talentProfileId: string;
  language: string;
  proficiency?: Proficiency;
}): TalentLanguage {
  const db = getDb();
  const id = newId();
  const sortOrder = nextSortOrder(db, "talent_languages", input.talentProfileId);
  db.prepare(
    `INSERT INTO talent_languages (id, talent_profile_id, language, proficiency, sort_order)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(id, input.talentProfileId, input.language, input.proficiency ?? "professional", sortOrder);
  return mapLanguage(
    db.prepare("SELECT * FROM talent_languages WHERE id = ?").get(id) as Row,
  );
}

export function updateTalentLanguage(
  id: string,
  input: Partial<{ language: string; proficiency: Proficiency }>,
): void {
  const db = getDb();
  db.prepare(
    `UPDATE talent_languages SET
       language = COALESCE(@language, language),
       proficiency = COALESCE(@proficiency, proficiency),
       updated_at = datetime('now')
     WHERE id = @id`,
  ).run({
    id,
    language: input.language ?? null,
    proficiency: input.proficiency ?? null,
  });
}

export function deleteTalentLanguage(id: string): void {
  getDb().prepare("DELETE FROM talent_languages WHERE id = ?").run(id);
}

function nextSortOrder(db: ReturnType<typeof getDb>, table: string, profileId: string): number {
  const row = db
    .prepare(`SELECT COALESCE(MAX(sort_order), -1) AS m FROM ${table} WHERE talent_profile_id = ?`)
    .get(profileId) as { m: number };
  return row.m + 1;
}

/* ── Public professional profile: profile lookup by user/slug ── */

export function getTalentProfileByUserId(userId: string): TalentProfile | undefined {
  const row = getDb()
    .prepare("SELECT * FROM talent_profiles WHERE user_id = ?")
    .get(userId) as Row | undefined;
  return row ? mapProfile(row) : undefined;
}

export function getTalentProfileBySlug(slug: string): TalentProfile | undefined {
  const row = getDb()
    .prepare("SELECT * FROM talent_profiles WHERE slug = ?")
    .get(slug) as Row | undefined;
  return row ? mapProfile(row) : undefined;
}

export function isUsernameTaken(slug: string, excludeId?: string): boolean {
  const db = getDb();
  const row = excludeId
    ? db.prepare("SELECT id FROM talent_profiles WHERE slug = ? AND id != ?").get(slug, excludeId)
    : db.prepare("SELECT id FROM talent_profiles WHERE slug = ?").get(slug);
  return row != null;
}

/** Normalize to a URL-safe lowercase slug: strip accents, non-alnum → hyphen. */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateUniqueSlug(first: string, last: string): string {
  const base = slugify(`${first}-${last}`) || "profile";
  const timestamp = Date.now().toString(36);
  const candidate = `${base}-${timestamp}`;
  if (isUsernameTaken(candidate)) {
    // Extremely unlikely (same name + same millisecond); append a short random
    // suffix rather than ever colliding.
    return `${candidate}-${Math.random().toString(36).slice(2, 6)}`;
  }
  return candidate;
}