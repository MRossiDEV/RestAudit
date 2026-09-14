"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser, roleLevel } from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit-log";
import {
  addAssessment,
  addReference,
  addRestaurantCredits,
  addTalentCertification,
  addTalentExperience,
  addTalentPortfolioItem,
  addTalentSkill,
  createApplication,
  createJob,
  createTalentProfile,
  deleteTalentProfile,
  fullName,
  getJob,
  getTalentAlias,
  getTalentProfile,
  setApplicationStatus,
  setJobStatus,
  unlockCandidate,
  updateJob,
  updateTalentProfile,
  upsertVerification,
} from "@/db/queries/talent";
import type {
  ApplicationStatus,
  AssessmentKind,
  AvailabilityStatus,
  JobStatus,
  JobTier,
  PortfolioKind,
  RehireAnswer,
  SkillCategory,
  SkillLevel,
  TalentProfile,
  VerificationKind,
  VerificationState,
} from "@/types/domain";

async function requireAdmin() {
  const user = await requireUser();
  if (roleLevel(user.role) < roleLevel("super_admin")) redirect("/portal");
  return user;
}

function revalidateTalent() {
  revalidatePath("/admin/talent");
  revalidatePath("/admin");
}

/* ── Talent profiles ──────────────────────────────────────── */

export async function createTalentProfileAction(input: {
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
}): Promise<{ id?: string; error?: string }> {
  const user = await requireAdmin();
  const fullName = input.fullName.trim();
  if (!fullName) return { error: "El nombre es obligatorio" };

  const profile = createTalentProfile({ ...input, fullName });
  writeAuditLog({
    actorId: user.id,
    action: "talent.profile_created",
    entityType: "talent_profiles",
    entityId: profile.id,
    metadata: { name: fullName },
  });
  revalidateTalent();
  return { id: profile.id };
}

export async function updateTalentProfileAction(
  id: string,
  input: {
    fullName?: string;
    professionalTitle?: string;
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
    verificationStatus?: TalentProfile["verification_status"];
  },
): Promise<{ error?: string }> {
  const user = await requireAdmin();
  updateTalentProfile(id, input);
  writeAuditLog({
    actorId: user.id,
    action: "talent.profile_updated",
    entityType: "talent_profiles",
    entityId: id,
    metadata: { name: (() => { const p = getTalentProfile(id); return p ? fullName(p) : id; })() },
  });
  revalidateTalent();
  return {};
}

export async function deleteTalentProfileAction(
  id: string,
): Promise<{ error?: string }> {
  const user = await requireAdmin();
  const name = (() => { const p = getTalentProfile(id); return p ? fullName(p) : id; })();
  deleteTalentProfile(id);
  writeAuditLog({
    actorId: user.id,
    action: "talent.profile_deleted",
    entityType: "talent_profiles",
    entityId: id,
    metadata: { name },
  });
  revalidateTalent();
  return {};
}

export async function addTalentSkillAction(input: {
  talentProfileId: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}): Promise<{ error?: string }> {
  await requireAdmin();
  const name = input.name.trim();
  if (!name) return { error: "La habilidad es obligatoria" };
  addTalentSkill({ ...input, name });
  revalidateTalent();
  return {};
}

export async function addTalentExperienceAction(input: {
  talentProfileId: string;
  company: string;
  position: string;
  restaurantType?: string;
  startDate?: string;
  endDate?: string | null;
  teamSize?: number | null;
  responsibilities?: string[];
  achievements?: string;
}): Promise<{ error?: string }> {
  await requireAdmin();
  if (!input.company.trim() || !input.position.trim())
    return { error: "Empresa y cargo son obligatorios" };
  addTalentExperience(input);
  revalidateTalent();
  return {};
}

export async function addTalentCertificationAction(input: {
  talentProfileId: string;
  name: string;
  issuer?: string;
  issuedAt?: string | null;
  expiresAt?: string | null;
}): Promise<{ error?: string }> {
  await requireAdmin();
  if (!input.name.trim()) return { error: "La certificación es obligatoria" };
  addTalentCertification(input);
  revalidateTalent();
  return {};
}

export async function addTalentPortfolioItemAction(input: {
  talentProfileId: string;
  kind: PortfolioKind;
  title: string;
  url?: string;
  description?: string;
}): Promise<{ error?: string }> {
  await requireAdmin();
  if (!input.title.trim()) return { error: "El título es obligatorio" };
  addTalentPortfolioItem(input);
  revalidateTalent();
  return {};
}

/* ── Jobs ─────────────────────────────────────────────────── */

export async function createJobAction(input: {
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
}): Promise<{ id?: string; error?: string }> {
  const user = await requireAdmin();
  const title = input.title.trim();
  if (!title) return { error: "El título es obligatorio" };
  if (!input.restaurantId) return { error: "Selecciona un restaurante" };

  const job = createJob({ ...input, title });
  writeAuditLog({
    actorId: user.id,
    action: "talent.job_created",
    entityType: "jobs",
    entityId: job.id,
    metadata: { title },
  });
  revalidateTalent();
  return { id: job.id };
}

export async function updateJobAction(
  id: string,
  input: {
    title?: string;
    description?: string;
    location?: string;
    employmentType?: string;
    salaryMin?: number | null;
    salaryMax?: number | null;
    experienceRequired?: number;
    skillsRequired?: string[];
    screeningQuestions?: string[];
    tier?: JobTier;
    status?: JobStatus;
  },
): Promise<{ error?: string }> {
  const user = await requireAdmin();
  updateJob(id, input);
  writeAuditLog({
    actorId: user.id,
    action: "talent.job_updated",
    entityType: "jobs",
    entityId: id,
    metadata: { title: getJob(id)?.title ?? id },
  });
  revalidateTalent();
  return {};
}

export async function setJobStatusAction(
  id: string,
  status: JobStatus,
): Promise<{ error?: string }> {
  const user = await requireAdmin();
  setJobStatus(id, status);
  writeAuditLog({
    actorId: user.id,
    action: "talent.job_status_changed",
    entityType: "jobs",
    entityId: id,
    metadata: { title: getJob(id)?.title ?? id, status },
  });
  revalidateTalent();
  return {};
}

/* ── Applications & pipeline ──────────────────────────────── */

export async function createApplicationAction(input: {
  jobId: string;
  talentProfileId: string;
  matchId?: string | null;
  notes?: string;
}): Promise<{ id?: string; error?: string }> {
  await requireAdmin();
  const app = createApplication(input);
  revalidateTalent();
  return { id: app.id };
}

export async function setApplicationStatusAction(
  id: string,
  status: ApplicationStatus,
): Promise<{ error?: string }> {
  const user = await requireAdmin();
  setApplicationStatus(id, status);
  writeAuditLog({
    actorId: user.id,
    action: "talent.application_status_changed",
    entityType: "job_applications",
    entityId: id,
    metadata: { status },
  });
  revalidateTalent();
  return {};
}

/* ── Candidate unlock & credits ───────────────────────────── */

export async function unlockCandidateAction(
  restaurantId: string,
  talentProfileId: string,
): Promise<{ ok: boolean; error?: string }> {
  const user = await requireAdmin();
  const result = unlockCandidate(restaurantId, talentProfileId);
  if (result.ok) {
    writeAuditLog({
      actorId: user.id,
      action: "talent.candidate_unlocked",
      entityType: "candidate_unlocks",
      entityId: talentProfileId,
      restaurantId,
      metadata: { alias: getTalentAlias(talentProfileId) },
    });
    revalidateTalent();
  }
  return result;
}

export async function addRestaurantCreditsAction(
  restaurantId: string,
  amount: number,
): Promise<{ error?: string }> {
  const user = await requireAdmin();
  if (amount <= 0) return { error: "El monto debe ser positivo" };
  addRestaurantCredits(restaurantId, amount);
  writeAuditLog({
    actorId: user.id,
    action: "talent.candidate_unlocked",
    entityType: "restaurant_credits",
    entityId: restaurantId,
    restaurantId,
    metadata: { amount },
  });
  revalidateTalent();
  return {};
}

/* ── Verification / assessment / reference ────────────────── */

export async function upsertVerificationAction(input: {
  talentProfileId: string;
  kind: VerificationKind;
  status: VerificationState;
  verifiedByUserId?: string | null;
  notes?: string;
}): Promise<{ error?: string }> {
  const user = await requireAdmin();
  upsertVerification(input);
  writeAuditLog({
    actorId: user.id,
    action: "talent.verification_updated",
    entityType: "talent_verifications",
    entityId: input.talentProfileId,
    metadata: { kind: input.kind, status: input.status },
  });
  revalidateTalent();
  return {};
}

export async function addAssessmentAction(input: {
  talentProfileId: string;
  kind: AssessmentKind;
  scores: Record<string, number>;
  totalScore?: number | null;
}): Promise<{ error?: string }> {
  await requireAdmin();
  addAssessment(input);
  revalidateTalent();
  return {};
}

export async function addReferenceAction(input: {
  talentProfileId: string;
  employerName: string;
  positionConfirmed?: boolean;
  wouldRehire?: RehireAnswer | null;
  strengths?: string;
  feedback?: string;
}): Promise<{ error?: string }> {
  await requireAdmin();
  if (!input.employerName.trim()) return { error: "El empleador es obligatorio" };
  addReference(input);
  revalidateTalent();
  return {};
}