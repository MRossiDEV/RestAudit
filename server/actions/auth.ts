"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { RegisterSchema, OwnerRegisterSchema, LoginSchema, type AuthFormState } from "@/lib/schemas/auth";
import { createUser, getUserByEmail, hasAnyUser } from "@/db/queries/users";
import { createOrganization } from "@/db/queries/users";
import { addMember } from "@/db/queries/members";
import { createRestaurant } from "@/db/queries/admin";
import { createCandidateProfile } from "@/db/queries/talent";
import { getDb } from "@/db";
import { createSession, destroySession } from "@/lib/session";
import { writeAuditLog } from "@/lib/audit-log";

export async function register(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password } = parsed.data;

  if (getUserByEmail(email)) {
    return { message: "An account with this email already exists." };
  }

  if (hasAnyUser()) {
    return { message: "Registration is closed. Contact your organization administrator." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({
    name,
    email: email.toLowerCase(),
    passwordHash,
    role: "super_admin",
  });

  writeAuditLog({
    actorId: user.id,
    action: "user.registered",
    entityType: "users",
    entityId: user.id,
  });

  await createSession({ id: user.id, role: user.role });
  redirect("/admin");
}

export async function login(
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

  const invalid = { message: "Invalid email or password." };
  if (!user) return invalid;

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return invalid;

  await createSession({ id: user.id, role: user.role });
  redirect(resolveLanding(user.role));
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/login");
}

/**
 * Candidate self-service signup. Unlike `register` (which bootstraps the first
 * staff admin and then closes), candidates may always create an account and
 * are routed to the Talent profile onboarding flow.
 */
export async function candidateRegister(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password } = parsed.data;

  if (getUserByEmail(email)) {
    return { message: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({
    name,
    email: email.toLowerCase(),
    passwordHash,
    role: "candidate",
  });

  // Every candidate account gets a talent profile at signup — there's no
  // separate "create profile" step.
  const [firstName, ...rest] = name.trim().split(/\s+/);
  createCandidateProfile({
    userId: user.id,
    firstName: firstName || name,
    lastName: rest.join(" "),
  });

  writeAuditLog({
    actorId: user.id,
    action: "user.registered_candidate",
    entityType: "users",
    entityId: user.id,
  });

  await createSession({ id: user.id, role: user.role });
  redirect("/onboarding/talent");
}

/**
 * Restaurant/employer self-service signup. Creates an `owner` user plus their
 * organization and an org_admin membership, then routes them to the portal.
 * Unlike the staff `register`, this is always open (it drives the talent side
 * of the marketplace) and does not bootstrap the first super admin.
 */
export async function ownerRegister(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = OwnerRegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    businessName: formData.get("businessName"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password, businessName } = parsed.data;

  if (getUserByEmail(email)) {
    return { message: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({
    name,
    email: email.toLowerCase(),
    passwordHash,
    role: "owner",
  });

  const org = createOrganization({
    name: businessName,
    slug: uniqueOrgSlug(businessName),
  });

  const restaurant = createRestaurant({
    organizationId: org.id,
    name: businessName,
    slug: slugify(businessName),
  });

  addMember({
    organizationId: org.id,
    userId: user.id,
    role: "org_admin",
  });

  writeAuditLog({
    actorId: user.id,
    organizationId: org.id,
    restaurantId: restaurant.id,
    action: "user.registered_owner",
    entityType: "users",
    entityId: user.id,
  });

  await createSession({ id: user.id, role: user.role });
  redirect("/portal");
}

function resolveLanding(role: string): string {
  switch (role) {
    case "super_admin":
      return "/admin";
    case "org_admin":
    case "senior_auditor":
    case "auditor":
      return "/auditor";
    case "owner":
      return "/portal";
    case "candidate":
      return "/talent/dashboard";
    case "business":
      return "/company/dashboard";
    case "agent":
      return "/agent/dashboard";
    default:
      return "/";
  }
}

function slugify(name: string): string {
  return (
    name
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "restaurant"
  );
}

function uniqueOrgSlug(name: string): string {
  const base = slugify(name);

  let candidate = base;
  let i = 2;
  const exists = (slug: string) =>
    Boolean(
      getDb().prepare("SELECT id FROM organizations WHERE slug = ?").get(slug),
    );
  while (exists(candidate)) {
    candidate = `${base}-${i}`;
    i += 1;
  }
  return candidate;
}