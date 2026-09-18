import "server-only";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getBusinessByUserId } from "@/db/queries/business";
import type { BusinessProfile } from "@/types/domain";

/**
 * Resolve the current viewer's business account, or redirect to registration.
 * Every /company/* page uses this to enforce the business session.
 */
export async function requireBusiness(): Promise<BusinessProfile> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const business = getBusinessByUserId(user.id);
  if (!business) redirect("/register?role=company");
  return business;
}
