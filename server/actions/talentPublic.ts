"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit-log";
import {
  addTalentEducation,
  addTalentExperience,
  addTalentLanguage,
  addTalentSkill,
  deleteTalentEducation,
  deleteTalentExperience,
  deleteTalentLanguage,
  deleteTalentSkill,
  getTalentProfile,
  getTalentProfileByUserId,
  isUsernameTaken,
  slugify,
  updateTalentEducation,
  updateTalentExperience,
  updateTalentLanguage,
  updateTalentProfile,
  updateTalentSkill,
} from "@/db/queries/talent";
import type {
  AvailabilityStatus,
  Proficiency,
  ProfileVisibility,
  SkillCategory,
  SkillLevel,
  TalentProfile,
} from "@/types/domain";

/** Resolve the current user's own profile, or null if they have none yet. */
function ownProfile(userId: string): TalentProfile | undefined {
  return getTalentProfileByUserId(userId);
}

function revalidateOwn(userId: string): void {
  const profile = ownProfile(userId);
  if (profile?.slug) {
    revalidatePath(`/talent/${profile.slug}`);
    revalidatePath(`/talent/${profile.slug}/dashboard`);
  }
  revalidatePath("/talent");
}

/* ── Profile update ───────────────────────────────────────── */

export async function updateProfileAction(input: {
  professionalTitle?: string;
  city?: string;
  country?: string;
  summary?: string;
  firstName?: string;
  lastName?: string;
  availability?: AvailabilityStatus;
  employmentTypes?: string[];
  relocationAvailable?: boolean;
  salaryExpectation?: number | null;
  contactEmail?: string;
  contactPhone?: string;
}): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };

  updateTalentProfile(profile.id, {
    professionalTitle: input.professionalTitle,
    location: input.city,
    country: input.country,
    bio: input.summary,
    firstName: input.firstName,
    lastName: input.lastName,
    availabilityStatus: input.availability,
    employmentTypes: input.employmentTypes,
    relocationAvailable: input.relocationAvailable,
    salaryExpectation: input.salaryExpectation,
    contactEmail: input.contactEmail,
    contactPhone: input.contactPhone,
  });

  writeAuditLog({
    actorId: user.id,
    action: "talent.public_profile_updated",
    entityType: "talent_profiles",
    entityId: profile.id,
  });
  revalidateOwn(user.id);
  return { ok: true };
}

export async function updateUsernameAction(
  username: string,
): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };

  const slug = slugify(username);
  if (!slug || slug.length < 3) {
    return { error: "El nombre de usuario debe tener al menos 3 caracteres" };
  }
  if (isUsernameTaken(slug, profile.id)) {
    return { error: "Ese nombre de usuario ya está en uso" };
  }

  updateTalentProfile(profile.id, { slug });
  writeAuditLog({
    actorId: user.id,
    action: "talent.username_changed",
    entityType: "talent_profiles",
    entityId: profile.id,
    metadata: { username: slug },
  });
  revalidateOwn(user.id);
  return { ok: true };
}

export async function setVisibilityAction(
  visibility: ProfileVisibility,
): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };
  updateTalentProfile(profile.id, { profileVisibility: visibility });
  revalidateOwn(user.id);
  return { ok: true };
}

export async function setShowPhoneAction(
  show: boolean,
): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };
  updateTalentProfile(profile.id, { showPhonePublicly: show });
  revalidateOwn(user.id);
  return { ok: true };
}

/* ── Experience ───────────────────────────────────────────── */

export async function addExperienceAction(input: {
  company: string;
  position: string;
  startDate?: string;
  endDate?: string | null;
  description?: string;
}): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };
  if (!input.company.trim() || !input.position.trim())
    return { error: "Empresa y cargo son obligatorios" };

  addTalentExperience({
    talentProfileId: profile.id,
    company: input.company.trim(),
    position: input.position.trim(),
    startDate: input.startDate,
    endDate: input.endDate ?? null,
    achievements: input.description,
  });
  revalidateOwn(user.id);
  return { ok: true };
}

export async function updateExperienceAction(
  id: string,
  input: {
    company?: string;
    position?: string;
    startDate?: string;
    endDate?: string | null;
    description?: string;
  },
): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };
  const full = getTalentProfile(profile.id);
  if (!full?.experience.some((e) => e.id === id)) return { error: "No autorizado" };

  updateTalentExperience(id, {
    company: input.company,
    position: input.position,
    startDate: input.startDate,
    endDate: input.endDate ?? null,
    achievements: input.description,
  });
  revalidateOwn(user.id);
  return { ok: true };
}

export async function deleteExperienceAction(
  id: string,
): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };
  // Verify ownership: the experience must belong to the current user's profile.
  const full = getTalentProfile(profile.id);
  if (!full?.experience.some((e) => e.id === id)) return { error: "No autorizado" };
  deleteTalentExperience(id);
  revalidateOwn(user.id);
  return { ok: true };
}

/* ── Skills ───────────────────────────────────────────────── */

export async function addSkillAction(input: {
  name: string;
  category?: SkillCategory;
  level?: SkillLevel;
}): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };
  const name = input.name.trim();
  if (!name) return { error: "La habilidad es obligatoria" };

  addTalentSkill({
    talentProfileId: profile.id,
    name,
    category: input.category ?? "operational",
    level: input.level ?? "intermediate",
  });
  revalidateOwn(user.id);
  return { ok: true };
}

export async function updateSkillAction(
  id: string,
  input: { name?: string; category?: SkillCategory; level?: SkillLevel },
): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };
  const full = getTalentProfile(profile.id);
  if (!full?.skills.some((s) => s.id === id)) return { error: "No autorizado" };
  updateTalentSkill(id, input);
  revalidateOwn(user.id);
  return { ok: true };
}

export async function deleteSkillAction(
  id: string,
): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };
  const full = getTalentProfile(profile.id);
  if (!full?.skills.some((s) => s.id === id)) return { error: "No autorizado" };
  deleteTalentSkill(id);
  revalidateOwn(user.id);
  return { ok: true };
}

/* ── Education ────────────────────────────────────────────── */

export async function addEducationAction(input: {
  institution: string;
  qualification?: string;
  field?: string;
  startDate?: string;
  endDate?: string | null;
  description?: string;
}): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };
  if (!input.institution.trim()) return { error: "La institución es obligatoria" };

  addTalentEducation({
    talentProfileId: profile.id,
    institution: input.institution.trim(),
    qualification: input.qualification,
    field: input.field,
    startDate: input.startDate,
    endDate: input.endDate ?? null,
    description: input.description,
  });
  revalidateOwn(user.id);
  return { ok: true };
}

export async function updateEducationAction(
  id: string,
  input: {
    institution?: string;
    qualification?: string;
    field?: string;
    startDate?: string;
    endDate?: string | null;
    description?: string;
  },
): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };
  const full = getTalentProfile(profile.id);
  if (!full?.education.some((e) => e.id === id)) return { error: "No autorizado" };
  updateTalentEducation(id, input);
  revalidateOwn(user.id);
  return { ok: true };
}

export async function deleteEducationAction(
  id: string,
): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };
  const full = getTalentProfile(profile.id);
  if (!full?.education.some((e) => e.id === id)) return { error: "No autorizado" };
  deleteTalentEducation(id);
  revalidateOwn(user.id);
  return { ok: true };
}

/* ── Languages ────────────────────────────────────────────── */

export async function addLanguageAction(input: {
  language: string;
  proficiency?: Proficiency;
}): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };
  const language = input.language.trim();
  if (!language) return { error: "El idioma es obligatorio" };

  addTalentLanguage({
    talentProfileId: profile.id,
    language,
    proficiency: input.proficiency ?? "professional",
  });
  revalidateOwn(user.id);
  return { ok: true };
}

export async function updateLanguageAction(
  id: string,
  input: { language?: string; proficiency?: Proficiency },
): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };
  const full = getTalentProfile(profile.id);
  if (!full?.languages.some((l) => l.id === id)) return { error: "No autorizado" };
  updateTalentLanguage(id, input);
  revalidateOwn(user.id);
  return { ok: true };
}

export async function deleteLanguageAction(
  id: string,
): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };
  const full = getTalentProfile(profile.id);
  if (!full?.languages.some((l) => l.id === id)) return { error: "No autorizado" };
  deleteTalentLanguage(id);
  revalidateOwn(user.id);
  return { ok: true };
}

export async function goToProfile(): Promise<void> {
  redirect("/talent/dashboard");
}