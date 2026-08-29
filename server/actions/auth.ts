"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { RegisterSchema, LoginSchema, type AuthFormState } from "@/lib/schemas/auth";
import { createUser, getUserByEmail, hasAnyUser } from "@/db/queries/users";
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
    default:
      return "/";
  }
}