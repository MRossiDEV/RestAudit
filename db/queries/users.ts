import "server-only";
import { getDb } from "@/db";
import { newId } from "@/lib/id";
import type { Organization, User } from "@/types/domain";

export function getUserById(id: string): User | undefined {
  return getDb().prepare("SELECT * FROM users WHERE id = ?").get(id) as
    | User
    | undefined;
}

export function getUserByEmail(email: string): User | undefined {
  return getDb().prepare("SELECT * FROM users WHERE email = ?").get(email) as
    | User
    | undefined;
}

export function hasAnyUser(): boolean {
  const row = getDb().prepare("SELECT id FROM users LIMIT 1").get() as
    | { id: string }
    | undefined;
  return Boolean(row);
}

export function createUser(input: {
  email: string;
  name: string;
  passwordHash: string;
  role: string;
}): User {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO users (id, email, name, password_hash, role)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(id, input.email, input.name, input.passwordHash, input.role);
  return getUserById(id)!;
}

export function getOrganizationById(id: string): Organization | undefined {
  return getDb().prepare("SELECT * FROM organizations WHERE id = ?").get(id) as
    | Organization
    | undefined;
}

export function createOrganization(input: { name: string; slug: string }): Organization {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO organizations (id, name, slug) VALUES (?, ?, ?)`,
  ).run(id, input.name, input.slug);
  return getOrganizationById(id)!;
}