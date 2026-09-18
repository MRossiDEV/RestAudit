"use server";

import { revalidatePath } from "next/cache";
import { requireBusiness } from "@/lib/business";
import { updateBusinessProfile } from "@/db/queries/business";

export type CompanyProfileState = { message?: string; ok?: boolean } | undefined;

export async function saveCompanyProfile(
  _state: CompanyProfileState,
  formData: FormData,
): Promise<CompanyProfileState> {
  const business = await requireBusiness();

  const str = (k: string) => (formData.get(k)?.toString().trim() ?? "");
  const hiringInternational = formData.get("hiring_international") === "on";
  const interests = str("hiring_interests")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  updateBusinessProfile(business.id, {
    business_name: str("business_name") || business.business_name,
    tagline: str("tagline"),
    business_type: str("business_type"),
    country: str("country"),
    region: str("region"),
    city: str("city"),
    website: str("website"),
    description: str("description"),
    size: str("size"),
    contact_name: str("contact_name"),
    contact_phone: str("contact_phone"),
    hiring_interests: interests,
    hiring_international: hiringInternational,
  });

  revalidatePath("/company/profile");
  if (business.slug) revalidatePath(`/business/${business.slug}`);
  return { ok: true, message: "Perfil actualizado." };
}
