import "server-only";
import { getDb } from "@/db";
import { newId } from "@/lib/id";
import type { MemberRole } from "@/types/domain";

export function getMembership(userId: string, organizationId: string) {
  return getDb()
    .prepare(
      "SELECT * FROM organization_members WHERE user_id = ? AND organization_id = ?",
    )
    .get(userId, organizationId) as
    | {
        id: string;
        organization_id: string;
        user_id: string;
        role: MemberRole;
        created_at: string;
      }
    | undefined;
}

export function getMemberships(userId: string) {
  return getDb()
    .prepare("SELECT * FROM organization_members WHERE user_id = ?")
    .all(userId) as {
    id: string;
    organization_id: string;
    user_id: string;
    role: MemberRole;
    created_at: string;
  }[];
}

export function addMember(input: {
  organizationId: string;
  userId: string;
  role: MemberRole;
}) {
  const db = getDb();
  const existing = getMembership(input.userId, input.organizationId);
  if (existing) {
    db.prepare(
      "UPDATE organization_members SET role = ? WHERE id = ?",
    ).run(input.role, existing.id);
    return existing.id;
  }
  const id = newId();
  db.prepare(
    `INSERT INTO organization_members (id, organization_id, user_id, role)
     VALUES (?, ?, ?, ?)`,
  ).run(id, input.organizationId, input.userId, input.role);
  return id;
}