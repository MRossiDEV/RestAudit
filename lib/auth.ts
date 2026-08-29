import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getUserById } from "@/db/queries/users";
import { getMemberships } from "@/db/queries/members";
import type { OrganizationMember, User } from "@/types/domain";

export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  role: User["role"];
  memberOf: OrganizationMember[];
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await getSession();
  if (!session) return null;
  const user = getUserById(session.userId);
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    memberOf: getMemberships(user.id),
  };
}

export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

const ROLE_HIERARCHY: Record<string, number> = {
  super_admin: 5,
  org_admin: 4,
  senior_auditor: 3,
  auditor: 2,
  owner: 1,
};

export function roleLevel(role: string): number {
  return ROLE_HIERARCHY[role] ?? 0;
}

export function isOrgMember(user: CurrentUser, organizationId: string): boolean {
  if (user.role === "super_admin") return true;
  return user.memberOf.some((m) => m.organization_id === organizationId);
}

export function isOrgAdmin(user: CurrentUser, organizationId: string): boolean {
  if (user.role === "super_admin") return true;
  return user.memberOf.some(
    (m) => m.organization_id === organizationId && m.role === "org_admin",
  );
}

export function isAuditor(user: CurrentUser): boolean {
  return ["super_admin", "org_admin", "senior_auditor", "auditor"].includes(
    user.role,
  );
}