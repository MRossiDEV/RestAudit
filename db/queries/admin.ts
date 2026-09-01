import "server-only";
import { getDb } from "@/db";
import { newId } from "@/lib/id";
import type { Audit, AuditLog, AuditStatus, AuditTemplate } from "@/types/domain";

interface Row extends Record<string, unknown> {}

function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function mapAudit(row: Row): Audit {
  return {
    id: String(row.id),
    organization_id: (row.organization_id as string) ?? null,
    restaurant_id: String(row.restaurant_id),
    restaurant_name: (row.restaurant_name as string) ?? undefined,
    template_id: (row.template_id as string) ?? null,
    template_name: (row.template_name as string) ?? undefined,
    status: row.status as AuditStatus,
    assigned_consultant_id: (row.assigned_consultant_id as string) ?? null,
    assigned_consultant_name: (row.assigned_consultant_name as string) ?? undefined,
    priority: (row.priority as Audit["priority"]) ?? "normal",
    deadline: (row.deadline as string) ?? null,
    vora_score: (row.vora_score as number | null) ?? null,
    progress: Number(row.progress ?? 0),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

const AUDIT_SELECT = `
  SELECT a.*,
         r.name AS restaurant_name,
         t.name AS template_name,
         u.name AS assigned_consultant_name
  FROM audits a
  LEFT JOIN restaurants r ON r.id = a.restaurant_id
  LEFT JOIN audit_templates t ON t.id = a.template_id
  LEFT JOIN users u ON u.id = a.assigned_consultant_id
`;

/* ── Dashboard ─────────────────────────────────────────────── */

export function getDashboard() {
  const db = getDb();

  const totalRestaurants = db
    .prepare("SELECT COUNT(*) AS c FROM restaurants")
    .get() as { c: number };

  const audits = db.prepare("SELECT status, vora_score FROM audits").all() as {
    status: string;
    vora_score: number | null;
  }[];

  const activeAudits = audits.filter((a) => a.status !== "delivered").length;
  const pendingReview = audits.filter((a) => a.status === "quality_review").length;
  const inAnalysis = audits.filter((a) =>
    ["vora_check", "ai_analysis", "data_collection"].includes(a.status),
  ).length;
  const delivered = audits.filter((a) => a.status === "delivered").length;

  const leads = db
    .prepare("SELECT COUNT(*) AS c FROM leads")
    .get() as { c: number };
  const newLeads = db
    .prepare("SELECT COUNT(*) AS c FROM leads WHERE status = 'new'")
    .get() as { c: number };

  const scored = audits.filter((a) => a.vora_score != null);
  const avgScore =
    scored.length > 0
      ? Math.round(scored.reduce((s, a) => s + (a.vora_score as number), 0) / scored.length)
      : 0;

  const consultants = db
    .prepare(
      `SELECT COUNT(*) AS c FROM users
       WHERE role IN ('super_admin','admin','lead_consultant','senior_auditor','auditor')`,
    )
    .get() as { c: number };

  const activity = getRecentActivity(12);

  return {
    kpi: {
      totalRestaurants: totalRestaurants.c,
      inAnalysis,
      activeAudits,
      pendingReview,
      delivered,
      newLeads: newLeads.c,
      totalLeads: leads.c,
      avgScore,
      consultants: consultants.c,
    },
    activity,
  };
}

export function getRecentActivity(limit = 15): AuditLog[] {
  const rows = getDb()
    .prepare(
      `SELECT l.*, r.name AS restaurant_name, u.name AS actor_name
       FROM audit_log l
       LEFT JOIN restaurants r ON r.id = l.restaurant_id
       LEFT JOIN users u ON u.id = l.actor_id
       ORDER BY datetime(l.created_at) DESC
       LIMIT ?`,
    )
    .all(limit) as Row[];
  return rows.map((row) => ({
    id: String(row.id),
    organization_id: (row.organization_id as string) ?? null,
    restaurant_id: (row.restaurant_id as string) ?? null,
    restaurant_name: (row.restaurant_name as string) ?? undefined,
    actor_id: (row.actor_id as string) ?? null,
    actor_name: (row.actor_name as string) ?? undefined,
    action: String(row.action),
    entity_type: (row.entity_type as string) ?? null,
    entity_id: (row.entity_id as string) ?? null,
    metadata: parseJson(row.metadata as string | null, {}),
    created_at: String(row.created_at),
  }));
}

/* ── Restaurants ───────────────────────────────────────────── */

export function listRestaurants() {
  const rows = getDb()
    .prepare(
      `SELECT r.*,
              (SELECT COUNT(*) FROM audits a WHERE a.restaurant_id = r.id) AS audit_count,
              (SELECT MAX(vora_score) FROM audits a WHERE a.restaurant_id = r.id AND a.vora_score IS NOT NULL) AS latest_score,
              (SELECT a.status FROM audits a WHERE a.restaurant_id = r.id ORDER BY datetime(a.created_at) DESC LIMIT 1) AS audit_status
       FROM restaurants r
       ORDER BY r.name`,
    )
    .all() as Row[];

  return rows.map((row) => ({
    id: String(row.id),
    organization_id: String(row.organization_id),
    name: String(row.name),
    slug: String(row.slug),
    profile: parseJson(row.profile as string, {}),
    status: String(row.status),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
    audit_count: Number(row.audit_count ?? 0),
    latest_score: (row.latest_score as number | null) ?? null,
    audit_status: (row.audit_status as string | null) ?? null,
  }));
}

export function getRestaurant(id: string) {
  const db = getDb();
  const row = db
    .prepare(
      `SELECT r.*,
              (SELECT COUNT(*) FROM audits a WHERE a.restaurant_id = r.id) AS audit_count
       FROM restaurants r WHERE r.id = ?`,
    )
    .get(id) as Row | undefined;
  if (!row) return undefined;

  const audits = db
    .prepare(
      `${AUDIT_SELECT} WHERE a.restaurant_id = ? ORDER BY datetime(a.created_at) DESC`,
    )
    .all(id) as Row[];
  const timeline = getRestaurantTimeline(id);

  return {
    id: String(row.id),
    organization_id: String(row.organization_id),
    name: String(row.name),
    slug: String(row.slug),
    profile: parseJson(row.profile as string | null, {}),
    status: String(row.status),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
    audit_count: Number(row.audit_count ?? 0),
    audits: audits.map(mapAudit),
    timeline,
  };
}

export function getRestaurantTimeline(restaurantId: string): AuditLog[] {
  const rows = getDb()
    .prepare(
      `SELECT l.*, u.name AS actor_name, r.name AS restaurant_name
       FROM audit_log l
       LEFT JOIN users u ON u.id = l.actor_id
       LEFT JOIN restaurants r ON r.id = l.restaurant_id
       WHERE l.restaurant_id = ?
       ORDER BY datetime(l.created_at) DESC`,
    )
    .all(restaurantId) as Row[];
  return rows.map((row) => ({
    id: String(row.id),
    organization_id: (row.organization_id as string) ?? null,
    restaurant_id: (row.restaurant_id as string) ?? null,
    restaurant_name: (row.restaurant_name as string) ?? undefined,
    actor_id: (row.actor_id as string) ?? null,
    actor_name: (row.actor_name as string) ?? undefined,
    action: String(row.action),
    entity_type: (row.entity_type as string) ?? null,
    entity_id: (row.entity_id as string) ?? null,
    metadata: parseJson(row.metadata as string | null, {}),
    created_at: String(row.created_at),
  }));
}

/* ── Audits (kanban) ───────────────────────────────────────── */

export const AUDIT_COLUMNS: AuditStatus[] = [
  "new",
  "data_collection",
  "ai_analysis",
  "auditor_review",
  "delivered",
];

export function listAudits() {
  const rows = getDb().prepare(`${AUDIT_SELECT} ORDER BY datetime(a.created_at) DESC`).all() as Row[];
  return rows.map(mapAudit);
}

export function listAuditsGrouped(): Record<AuditStatus, Audit[]> {
  const grouped = {} as Record<AuditStatus, Audit[]>;
  for (const col of AUDIT_COLUMNS) grouped[col] = [];
  for (const audit of listAudits()) grouped[audit.status].push(audit);
  return grouped;
}

/* ── Templates ─────────────────────────────────────────────── */

export function listTemplates(): AuditTemplate[] {
  const rows = getDb().prepare("SELECT * FROM audit_templates ORDER BY name").all() as Row[];
  return rows.map((row) => ({
    id: String(row.id),
    name: String(row.name),
    type: String(row.type),
    description: String(row.description ?? ""),
    sections: parseJson(row.sections_json as string, []),
    questions: parseJson(row.questions_json as string, []),
    scoring_model: parseJson(row.scoring_model_json as string, {}),
    report_template_id: (row.report_template_id as string) ?? null,
    active: Boolean(row.active),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  }));
}

export function getTemplate(id: string): AuditTemplate | undefined {
  return listTemplates().find((t) => t.id === id);
}

/* ── Consultants ───────────────────────────────────────────── */

const CONSULTANT_SELECT = `
  SELECT u.id, u.name, u.email, u.role,
         c.specialization, c.experience_years, c.rating,
         c.max_parallel_audits, c.status AS c_status,
         (SELECT COUNT(*) FROM audits a WHERE a.assigned_consultant_id = u.id AND a.status != 'delivered') AS active_audits,
         (SELECT COUNT(*) FROM audits a WHERE a.assigned_consultant_id = u.id AND a.status = 'delivered') AS completed_audits,
         (SELECT COUNT(*) FROM audits a WHERE a.assigned_consultant_id = u.id) AS total_audits
  FROM users u
  JOIN consultants c ON c.user_id = u.id
  WHERE u.role IN ('super_admin','admin','lead_consultant','senior_auditor','auditor')
`;

export interface Consultant {
  id: string;
  name: string;
  email: string;
  role: string;
  specialization: string;
  experience_years: number;
  rating: number;
  max_parallel_audits: number;
  c_status: string;
  active_audits: number;
  completed_audits: number;
  total_audits: number;
  workload: number; // 0-1 active_audits / capacity
}

function mapConsultant(row: Row): Consultant {
  const active = Number(row.active_audits ?? 0);
  const capacity = Number(row.max_parallel_audits ?? 3);
  return {
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    role: String(row.role),
    specialization: String(row.specialization ?? ""),
    experience_years: Number(row.experience_years ?? 0),
    rating: Number(row.rating ?? 0),
    max_parallel_audits: capacity,
    c_status: String(row.c_status ?? "active"),
    active_audits: active,
    completed_audits: Number(row.completed_audits ?? 0),
    total_audits: Number(row.total_audits ?? 0),
    workload: capacity > 0 ? Math.min(1, active / capacity) : 0,
  };
}

export function listConsultants(): Consultant[] {
  const rows = getDb()
    .prepare(`${CONSULTANT_SELECT} ORDER BY u.name`)
    .all() as Row[];
  return rows.map(mapConsultant);
}

export function getConsultant(id: string): Consultant | undefined {
  const row = getDb()
    .prepare(`${CONSULTANT_SELECT} AND u.id = ?`)
    .get(id) as Row | undefined;
  return row ? mapConsultant(row) : undefined;
}

export function listAuditsForConsultant(consultantId: string): Audit[] {
  const rows = getDb()
    .prepare(`${AUDIT_SELECT} WHERE a.assigned_consultant_id = ? ORDER BY datetime(a.updated_at) DESC`)
    .all(consultantId) as Row[];
  return rows.map(mapAudit);
}

/* ── Writes ────────────────────────────────────────────────── */

export function createAudit(input: {
  restaurantId: string;
  templateId: string | null;
  status: AuditStatus;
  priority: string;
  deadline: string | null;
  assignedConsultantId: string | null;
}): Audit {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO audits (id, organization_id, restaurant_id, template_id, status, assigned_consultant_id, priority, deadline, progress)
     VALUES (@id, @organizationId, @restaurantId, @templateId, @status, @assignedConsultantId, @priority, @deadline, 0)`,
  ).run({
    id,
    organizationId: null,
    restaurantId: input.restaurantId,
    templateId: input.templateId,
    status: input.status,
    assignedConsultantId: input.assignedConsultantId,
    priority: input.priority,
    deadline: input.deadline,
  });
  return getAuditById(id)!;
}

export function getAuditById(id: string): Audit | undefined {
  const row = getDb()
    .prepare(`${AUDIT_SELECT} WHERE a.id = ?`)
    .get(id) as Row | undefined;
  return row ? mapAudit(row) : undefined;
}

export function advanceAudit(id: string, status: AuditStatus): void {
  getDb()
    .prepare("UPDATE audits SET status = ?, updated_at = datetime('now') WHERE id = ?")
    .run(status, id);
}

export function createTemplate(input: {
  name: string;
  type: string;
  description: string;
  sections: string[];
}): AuditTemplate {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO audit_templates (id, name, type, description, sections_json, questions_json, scoring_model_json)
     VALUES (?, ?, ?, ?, ?, '[]', '{}')`,
  ).run(
    id,
    input.name,
    input.type,
    input.description,
    JSON.stringify(input.sections),
  );
  return getTemplate(id)!;
}

export function updateTemplate(
  id: string,
  input: { name?: string; type?: string; description?: string; sections?: string[]; active?: boolean },
): void {
  const db = getDb();
  const current = getTemplate(id);
  if (!current) return;
  db.prepare(
    `UPDATE audit_templates SET
       name = COALESCE(@name, name),
       type = COALESCE(@type, type),
       description = COALESCE(@description, description),
       sections_json = COALESCE(@sections, sections_json),
       active = COALESCE(@active, active),
       updated_at = datetime('now')
     WHERE id = @id`,
  ).run({
    id,
    name: input.name ?? null,
    type: input.type ?? null,
    description: input.description ?? null,
    sections: input.sections ? JSON.stringify(input.sections) : null,
    active: input.active == null ? null : Number(input.active),
  });
}