export type UserRole =
  | "super_admin"
  | "org_admin"
  | "senior_auditor"
  | "auditor"
  | "owner"
  | "candidate";

export type MemberRole =
  | "org_admin"
  | "senior_auditor"
  | "auditor";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  settings: Record<string, unknown>;
  ai_config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: MemberRole;
  created_at: string;
}

export interface RestaurantProfile {
  name?: string;
  concept?: string;
  cuisine?: string;
  location?: string;
  number_of_seats?: number;
  square_meters?: number;
  opening_date?: string;
  number_of_locations?: number;
  service_model?: string;
  opening_hours?: string;
  average_check?: number;
  monthly_revenue?: number;
  covers?: number;
  delivery_pct?: number;
  takeout_pct?: number;
  dine_in_pct?: number;
  reservation_pct?: number;
  price_level?: string;
  target_customer?: string;
  concept_description?: string;
  main_competitors?: string;
}

export interface Restaurant {
  id: string;
  organization_id: string;
  name: string;
  slug: string;
  profile: RestaurantProfile;
  status: string;
  created_at: string;
  updated_at: string;
}

export type AuditStatus =
  | "new"
  | "data_collection"
  | "ai_analysis"
  | "auditor_review"
  | "delivered";

export type AuditPriority = "low" | "normal" | "high" | "urgent";

export interface Audit {
  id: string;
  organization_id: string | null;
  restaurant_id: string;
  restaurant_name?: string;
  template_id: string | null;
  template_name?: string;
  status: AuditStatus;
  assigned_consultant_id: string | null;
  assigned_consultant_name?: string;
  priority: AuditPriority;
  deadline: string | null;
  vora_score: number | null;
  progress: number;
  created_at: string;
  updated_at: string;
}

export interface AuditTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  sections: string[];
  questions: unknown[];
  scoring_model: Record<string, unknown>;
  report_template_id: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  organization_id: string | null;
  restaurant_id: string | null;
  restaurant_name?: string;
  actor_id: string | null;
  actor_name?: string;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export type ReportStatus = "draft" | "reviewed" | "delivered";

export type ReportSectionSource = "ai" | "human";
export type ReportSectionStatus = "draft" | "reviewed" | "approved";

export interface ReportTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  sections: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReportSection {
  id: string;
  report_id: string;
  key: string;
  title: string;
  content: string;
  sort_order: number;
  source: ReportSectionSource;
  status: ReportSectionStatus;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  organization_id: string | null;
  audit_id: string | null;
  restaurant_id: string;
  restaurant_name?: string;
  template_id: string | null;
  template_name?: string;
  status: ReportStatus;
  title: string;
  vora_score: number | null;
  created_at: string;
  updated_at: string;
}

export type AIProviderKey = "openai" | "anthropic" | "nvidia";

export interface AIProvider {
  id: string;
  provider_key: AIProviderKey;
  name: string;
  api_key: string;
  base_url: string;
  models: string[];
  default_model: string;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/* ── VORA Talent Intelligence ──────────────────────────────── */

export type AvailabilityStatus =
  | "immediate"
  | "15_days"
  | "30_days"
  | "employed"
  | "open";

export type TalentVisibility = "public" | "private" | "anonymous";

export type ProfileVisibility = "public" | "private";

export type Proficiency = "native" | "professional" | "intermediate" | "basic";

export type VerificationStatus = "unverified" | "partial" | "verified";

export type SkillCategory =
  | "culinary"
  | "operational"
  | "management"
  | "language";

export type SkillLevel = "basic" | "intermediate" | "advanced";

export type VerificationKind =
  | "identity"
  | "experience"
  | "certification"
  | "reference"
  | "skills_assessment";

export type VerificationState = "pending" | "verified" | "rejected";

export type JobStatus = "draft" | "open" | "paused" | "closed";

export type JobTier = "standard" | "featured" | "urgent";

export type ApplicationStatus =
  | "applied"
  | "screening"
  | "shortlisted"
  | "interview"
  | "final_review"
  | "hired"
  | "rejected"
  | "withdrawn"
  | "on_hold"
  | "talent_pool";

export type PortfolioKind = "image" | "video" | "menu" | "project";

export type AssessmentKind = "chef" | "barista" | "manager" | "custom";

export type RehireAnswer = "yes" | "no" | "prefer_not";

export interface TalentProfile {
  id: string;
  user_id: string | null;
  professional_title: string;
  location: string;
  country: string;
  years_experience: number;
  availability_status: AvailabilityStatus;
  visibility: TalentVisibility;
  salary_min: number | null;
  salary_max: number | null;
  contact_email: string;
  contact_phone: string;
  video_url: string;
  bio: string;
  cv_raw_text: string;
  verification_status: VerificationStatus;
  created_at: string;
  updated_at: string;
  /* ── Public professional profile (0015) ── */
  slug: string | null;
  first_name: string;
  last_name: string;
  avatar_url: string;
  profile_visibility: ProfileVisibility;
  show_phone_publicly: boolean;
  relocation_available: boolean;
  employment_types: string[];
  salary_expectation: number | null;
}

export interface TalentSkill {
  id: string;
  talent_profile_id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  created_at: string;
}

export interface TalentExperience {
  id: string;
  talent_profile_id: string;
  company: string;
  position: string;
  restaurant_type: string;
  start_date: string;
  end_date: string | null;
  team_size: number | null;
  responsibilities: string[];
  achievements: string;
  created_at: string;
}

export interface TalentCertification {
  id: string;
  talent_profile_id: string;
  name: string;
  issuer: string;
  issued_at: string | null;
  expires_at: string | null;
  verified: boolean;
  created_at: string;
}

export interface TalentPortfolioItem {
  id: string;
  talent_profile_id: string;
  kind: PortfolioKind;
  title: string;
  url: string;
  description: string;
  created_at: string;
}

export interface TalentEducation {
  id: string;
  talent_profile_id: string;
  institution: string;
  qualification: string;
  field: string;
  start_date: string;
  end_date: string | null;
  description: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface TalentLanguage {
  id: string;
  talent_profile_id: string;
  language: string;
  proficiency: Proficiency;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  restaurant_id: string;
  restaurant_name?: string;
  title: string;
  description: string;
  location: string;
  employment_type: string;
  salary_min: number | null;
  salary_max: number | null;
  experience_required: number;
  skills_required: string[];
  screening_questions: string[];
  status: JobStatus;
  tier: JobTier;
  created_at: string;
  updated_at: string;
}

export interface CandidateMatch {
  id: string;
  talent_profile_id: string;
  job_id: string | null;
  restaurant_id: string | null;
  technical_score: number;
  experience_score: number;
  location_score: number;
  salary_score: number;
  availability_score: number;
  compatibility_score: number;
  final_score: number;
  ai_summary: string;
  created_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  talent_profile_id: string;
  talent_name?: string;
  talent_title?: string;
  status: ApplicationStatus;
  match_id: string | null;
  match_score?: number | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface CandidateUnlock {
  id: string;
  restaurant_id: string;
  talent_profile_id: string;
  cost_credits: number;
  created_at: string;
}

export interface TalentVerification {
  id: string;
  talent_profile_id: string;
  talent_name?: string;
  kind: VerificationKind;
  status: VerificationState;
  verified_by_user_id: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface TalentAssessment {
  id: string;
  talent_profile_id: string;
  kind: AssessmentKind;
  scores: Record<string, number>;
  total_score: number | null;
  taken_at: string;
  created_at: string;
}

export interface TalentReference {
  id: string;
  talent_profile_id: string;
  employer_name: string;
  position_confirmed: boolean;
  would_rehire: RehireAnswer | null;
  strengths: string;
  feedback: string;
  created_at: string;
}

export interface SalaryDatum {
  id: string;
  position: string;
  location: string;
  avg_salary: number | null;
  min_salary: number | null;
  max_salary: number | null;
  sample_size: number;
  updated_at: string;
}

export interface TalentProfileFull extends TalentProfile {
  skills: TalentSkill[];
  experience: TalentExperience[];
  certifications: TalentCertification[];
  portfolio: TalentPortfolioItem[];
  verifications: TalentVerification[];
  assessments: TalentAssessment[];
  references: TalentReference[];
  education: TalentEducation[];
  languages: TalentLanguage[];
}

/**
 * Whitelisted shape exposed on the public `/talent/[slug]` route. Contains no
 * internal ids, user_id, email, or salary. Phone included only when
 * `show_phone_publicly` is set by the owner.
 */
export interface PublicTalentProfile {
  slug: string;
  name: string;
  professional_title: string;
  city: string;
  country: string;
  avatar_url: string;
  summary: string;
  availability: AvailabilityStatus;
  employment_types: string[];
  relocation_available: boolean;
  phone: string | null;
  skills: { name: string; level: SkillLevel }[];
  experience: {
    company: string;
    position: string;
    start_date: string;
    end_date: string | null;
    description: string;
  }[];
  education: {
    institution: string;
    qualification: string;
    field: string;
    start_date: string;
    end_date: string | null;
    description: string;
  }[];
  languages: { language: string; proficiency: Proficiency }[];
}