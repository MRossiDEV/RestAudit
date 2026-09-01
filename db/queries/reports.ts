import "server-only";
import { getDb } from "@/db";
import { newId } from "@/lib/id";
import type {
  Report,
  ReportSection,
  ReportStatus,
  ReportTemplate,
} from "@/types/domain";

interface Row extends Record<string, unknown> {}

function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export const REPORT_COLUMNS: ReportStatus[] = [
  "draft",
  "reviewed",
  "delivered",
];

const REPORT_SELECT = `
  SELECT r.*,
         rest.name AS restaurant_name,
         t.name AS template_name
  FROM reports r
  LEFT JOIN restaurants rest ON rest.id = r.restaurant_id
  LEFT JOIN report_templates t ON t.id = r.template_id
`;

function mapReport(row: Row): Report {
  return {
    id: String(row.id),
    organization_id: (row.organization_id as string) ?? null,
    audit_id: (row.audit_id as string) ?? null,
    restaurant_id: String(row.restaurant_id),
    restaurant_name: (row.restaurant_name as string) ?? undefined,
    template_id: (row.template_id as string) ?? null,
    template_name: (row.template_name as string) ?? undefined,
    status: row.status as ReportStatus,
    title: String(row.title),
    vora_score: (row.vora_score as number | null) ?? null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

/* ── Templates ─────────────────────────────────────────────── */

export function listReportTemplates(): ReportTemplate[] {
  const rows = getDb()
    .prepare("SELECT * FROM report_templates ORDER BY name")
    .all() as Row[];
  return rows.map((row) => ({
    id: String(row.id),
    name: String(row.name),
    type: String(row.type),
    description: String(row.description ?? ""),
    sections: parseJson(row.sections_json as string, []),
    active: Boolean(row.active),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  }));
}

/* ── Reports ───────────────────────────────────────────────── */

export function listReports(): Report[] {
  const rows = getDb()
    .prepare(`${REPORT_SELECT} ORDER BY datetime(r.updated_at) DESC`)
    .all() as Row[];
  return rows.map(mapReport);
}

export function listReportsGrouped(): Record<ReportStatus, Report[]> {
  const grouped = {} as Record<ReportStatus, Report[]>;
  for (const col of REPORT_COLUMNS) grouped[col] = [];
  for (const report of listReports()) grouped[report.status].push(report);
  return grouped;
}

export function getReport(id: string):
  | (Report & { sections: ReportSection[] })
  | undefined {
  const db = getDb();
  const row = db.prepare(`${REPORT_SELECT} WHERE r.id = ?`).get(id) as
    | Row
    | undefined;
  if (!row) return undefined;

  const sections = db
    .prepare(
      "SELECT * FROM report_sections WHERE report_id = ? ORDER BY sort_order",
    )
    .all(id) as Row[];

  return {
    ...mapReport(row),
    sections: sections.map((s) => ({
      id: String(s.id),
      report_id: String(s.report_id),
      key: String(s.key),
      title: String(s.title),
      content: String(s.content ?? ""),
      sort_order: Number(s.sort_order),
      source: s.source as ReportSection["source"],
      status: s.status as ReportSection["status"],
      created_at: String(s.created_at),
      updated_at: String(s.updated_at),
    })),
  };
}

/* ── Writes ────────────────────────────────────────────────── */

export function createReport(input: {
  restaurantId: string;
  templateId: string | null;
  title: string;
}): Report {
  const db = getDb();
  const id = newId();
  db.prepare(
    `INSERT INTO reports (id, restaurant_id, template_id, title, status)
     VALUES (?, ?, ?, ?, 'draft')`,
  ).run(id, input.restaurantId, input.templateId, input.title);

  // Build sections from the template so structure is always DB-configured.
  if (input.templateId) {
    const template = getDb()
      .prepare("SELECT * FROM report_templates WHERE id = ?")
      .get(input.templateId) as Row | undefined;
    if (template) {
      const sections = parseJson<string[]>(template.sections_json as string, []);
      const insert = db.prepare(
        `INSERT INTO report_sections (id, report_id, key, title, content, sort_order)
         VALUES (?, ?, ?, ?, '', ?)`,
      );
      sections.forEach((title, i) => {
        const key = title.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
        insert.run(newId(), id, key, title, i);
      });
    }
  }
  return getReport(id)!;
}

export function advanceReport(id: string, status: ReportStatus): void {
  getDb()
    .prepare("UPDATE reports SET status = ?, updated_at = datetime('now') WHERE id = ?")
    .run(status, id);
}