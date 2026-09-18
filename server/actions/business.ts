"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { BusinessRegisterSchema, LoginSchema, type AuthFormState } from "@/lib/schemas/auth";
import { createUser, getUserByEmail } from "@/db/queries/users";
import {
  createBusinessProfile,
  getBusinessByUserId,
} from "@/db/queries/business";
import { createSession } from "@/lib/session";
import { writeAuditLog } from "@/lib/audit-log";

/**
 * Sanitize a `returnTo` target so the post-registration redirect can only land
 * on an internal talent profile — never an open redirect.
 */
function safeReturnTo(raw: string | undefined): string | null {
  if (!raw) return null;
  if (!raw.startsWith("/talent/")) return null;
  if (raw.startsWith("//")) return null;
  const slug = raw.replace(/^\/talent\//, "").split(/[/?#]/)[0];
  if (!slug) return null;
  return `/talent/${encodeURIComponent(slug)}?registered=1`;
}

/**
 * Free business registration — the access barrier for full candidate profiles
 * (PRD §4, §13). No payment. After signup the employer is returned to the
 * candidate profile they originally tried to view (PRD §15).
 */
export async function businessRegister(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = BusinessRegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    businessName: formData.get("businessName"),
    businessType: formData.get("businessType"),
    country: formData.get("country"),
    city: formData.get("city"),
    phone: formData.get("phone"),
    returnTo: formData.get("returnTo"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password, businessName, businessType, country, city, phone } =
    parsed.data;

  if (getUserByEmail(email.toLowerCase())) {
    return { message: "Ya existe una cuenta con este email." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({
    name,
    email: email.toLowerCase(),
    passwordHash,
    role: "business",
  });

  createBusinessProfile({
    userId: user.id,
    businessName,
    businessType,
    country,
    city,
    contactName: name,
    contactPhone: phone,
  });

  writeAuditLog({
    actorId: user.id,
    action: "business.registered",
    entityType: "users",
    entityId: user.id,
  });

  await createSession({ id: user.id, role: user.role });

  const back = safeReturnTo(parsed.data.returnTo);
  // Registration drops the new business into onboarding; if they came from a
  // talent profile, the returnTo carries through onboarding.
  redirect(back ? `/onboarding/company?returnTo=${encodeURIComponent(back)}` : "/onboarding/company");
}

/** Business login. Returns the employer to the profile they came from. */
export async function businessLogin(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { email, password } = parsed.data;
  const user = getUserByEmail(email.toLowerCase());

  const invalid = { message: "Email o contraseña inválidos." };
  if (!user) return invalid;

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return invalid;

  await createSession({ id: user.id, role: user.role });

  // If the account has no business profile yet, complete registration.
  const business = getBusinessByUserId(user.id);
  if (!business) redirect("/register?role=company");

  const back = safeReturnTo(formData.get("returnTo")?.toString());
  redirect(back ?? "/company/dashboard");
}
