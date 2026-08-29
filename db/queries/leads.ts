import "server-only";
import { getDb } from "@/db";
import { newId } from "@/lib/id";
import type { HealthCheckInput, HealthCheckResult } from "@/types/health-check";

export type LeadIntent = "register" | "contact";

export interface Lead {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  intent: LeadIntent;
  restaurant_name: string | null;
  check_input: HealthCheckInput;
  check_result: HealthCheckResult;
  status: string;
  created_at: string;
}

export function createLead(input: {
  name?: string;
  email?: string;
  phone?: string;
  intent: LeadIntent;
  restaurantName?: string;
  checkInput: HealthCheckInput;
  checkResult: HealthCheckResult;
}): Lead {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO leads (id, name, email, phone, intent, restaurant_name, check_input, check_result)
     VALUES (@id, @name, @email, @phone, @intent, @restaurantName, @checkInput, @checkResult)`,
  ).run({
    id,
    name: input.name ?? null,
    email: input.email ?? null,
    phone: input.phone ?? null,
    intent: input.intent,
    restaurantName: input.restaurantName ?? null,
    checkInput: JSON.stringify(input.checkInput),
    checkResult: JSON.stringify(input.checkResult),
  });

  const row = db.prepare("SELECT * FROM leads WHERE id = ?").get(id) as {
    id: string;
    name: string | null;
    email: string | null;
    phone: string | null;
    intent: LeadIntent;
    restaurant_name: string | null;
    check_input: string;
    check_result: string;
    status: string;
    created_at: string;
  };

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    intent: row.intent,
    restaurant_name: row.restaurant_name,
    check_input: JSON.parse(row.check_input) as HealthCheckInput,
    check_result: JSON.parse(row.check_result) as HealthCheckResult,
    status: row.status,
    created_at: row.created_at,
  };
}