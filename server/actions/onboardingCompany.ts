"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit-log";
import {
  getBusinessByUserId,
  updateBusinessProfile,
} from "@/db/queries/business";

export type OnboardingState = { error?: string } | undefined;

function safeReturnTo(raw: string | null): string | null {
  if (!raw || !raw.startsWith("/talent/") || raw.startsWith("//")) return null;
  return raw;
}

/** Step 1 — business details: type, location, size, website, description. */
export async function onboardingCompanyDetails(
  _state: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const user = await requireUser();
  const business = getBusinessByUserId(user.id);
  if (!business) return { error: "No encontramos tu empresa." };

  updateBusinessProfile(business.id, {
    business_type: String(formData.get("businessType") ?? "").trim(),
    country: String(formData.get("country") ?? "").trim(),
    region: String(formData.get("region") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    size: String(formData.get("size") ?? "").trim(),
    website: String(formData.get("website") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
  });
  writeAuditLog({
    actorId: user.id,
    action: "business.onboarding_details",
    entityType: "business_profiles",
    entityId: business.id,
  });

  const returnTo = safeReturnTo(formData.get("returnTo")?.toString() ?? null);
  redirect(
    returnTo
      ? `/onboarding/company?step=hiring&returnTo=${encodeURIComponent(returnTo)}`
      : "/onboarding/company?step=hiring",
  );
}

/** Step 2 — hiring interests + international flag, then dashboard (or returnTo). */
export async function onboardingCompanyHiring(
  _state: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const user = await requireUser();
  const business = getBusinessByUserId(user.id);
  if (!business) return { error: "No encontramos tu empresa." };

  const interests = formData
    .getAll("interests")
    .map((v) => String(v))
    .filter(Boolean);
  const hiringInternational = formData.get("hiringInternational") === "on";

  updateBusinessProfile(business.id, {
    hiring_interests: interests,
    hiring_international: hiringInternational,
  });
  writeAuditLog({
    actorId: user.id,
    action: "business.onboarding_completed",
    entityType: "business_profiles",
    entityId: business.id,
  });

  const returnTo = safeReturnTo(formData.get("returnTo")?.toString() ?? null);
  redirect(returnTo ?? "/company/dashboard");
}

/** Skip link target — dashboard, or the profile they came from. */
export async function onboardingCompanySkip(formData: FormData): Promise<void> {
  await requireUser();
  const returnTo = safeReturnTo(formData.get("returnTo")?.toString() ?? null);
  redirect(returnTo ?? "/company/dashboard");
}
