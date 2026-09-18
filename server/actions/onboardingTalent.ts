"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit-log";
import {
  addTalentExperience,
  addTalentLanguage,
  addTalentSkill,
  getTalentProfileByUserId,
  updateTalentProfile,
} from "@/db/queries/talent";
import type {
  AvailabilityStatus,
  Proficiency,
  SkillCategory,
  SkillLevel,
} from "@/types/domain";

export type OnboardingState = { error?: string } | undefined;

function ownProfile(userId: string) {
  return getTalentProfileByUserId(userId);
}

function slugOrDashboard(userId: string): string {
  const profile = ownProfile(userId);
  return profile?.slug ? `/talent/${profile.slug}/dashboard` : "/talent/dashboard";
}

/** Step 1 — basics: title, location, summary. */
export async function onboardingBasics(
  _state: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "No encontramos tu perfil." };

  const professionalTitle = String(formData.get("professionalTitle") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();

  if (!professionalTitle) return { error: "Contanos tu rol o puesto principal." };

  updateTalentProfile(profile.id, {
    professionalTitle,
    location: city,
    country,
    bio: summary,
  });
  writeAuditLog({
    actorId: user.id,
    action: "talent.onboarding_basics",
    entityType: "talent_profiles",
    entityId: profile.id,
  });
  redirect("/onboarding/talent?step=experience");
}

/** Step 2 — one experience entry (optional; skippable by the UI). */
export async function onboardingExperience(
  _state: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "No encontramos tu perfil." };

  const company = String(formData.get("company") ?? "").trim();
  const position = String(formData.get("position") ?? "").trim();
  const startDate = String(formData.get("startDate") ?? "").trim();
  const endDate = String(formData.get("endDate") ?? "").trim() || null;

  if (!company || !position) {
    return { error: "Empresa y cargo son obligatorios (o saltá este paso)." };
  }

  addTalentExperience({
    talentProfileId: profile.id,
    company,
    position,
    startDate,
    endDate,
  });
  redirect("/onboarding/talent?step=skills");
}

/** Step 3 — skills + languages, comma-separated. */
export async function onboardingSkills(
  _state: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "No encontramos tu perfil." };

  const skills = String(formData.get("skills") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 10);
  const languages = String(formData.get("languages") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 6);

  if (skills.length === 0) {
    return { error: "Sumá al menos una habilidad (o saltá este paso)." };
  }

  for (const name of skills) {
    addTalentSkill({
      talentProfileId: profile.id,
      name,
      category: "operational" as SkillCategory,
      level: "intermediate" as SkillLevel,
    });
  }
  for (const language of languages) {
    addTalentLanguage({
      talentProfileId: profile.id,
      language,
      proficiency: "professional" as Proficiency,
    });
  }
  redirect("/onboarding/talent?step=availability");
}

/** Step 4 — availability + employment types, then land on the dashboard. */
export async function onboardingAvailability(
  _state: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const user = await requireUser();
  const profile = ownProfile(user.id);
  if (!profile) return { error: "No encontramos tu perfil." };

  const availability = String(formData.get("availability") ?? "open") as AvailabilityStatus;
  const employmentTypes = formData
    .getAll("employmentTypes")
    .map((v) => String(v))
    .filter(Boolean);

  updateTalentProfile(profile.id, {
    availabilityStatus: availability,
    employmentTypes,
  });
  writeAuditLog({
    actorId: user.id,
    action: "talent.onboarding_completed",
    entityType: "talent_profiles",
    entityId: profile.id,
  });
  redirect(slugOrDashboard(user.id));
}

/** Skip link target — straight to the dashboard from any step. */
export async function onboardingSkip(): Promise<void> {
  const user = await requireUser();
  redirect(slugOrDashboard(user.id));
}
