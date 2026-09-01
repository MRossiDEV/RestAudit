"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser, roleLevel } from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit-log";
import {
  advanceAudit,
  createAudit,
  createTemplate,
  updateTemplate,
} from "@/db/queries/admin";
import {
  advanceReport,
  createReport,
} from "@/db/queries/reports";
import type { AuditStatus, ReportStatus } from "@/types/domain";

async function requireAdmin() {
  const user = await requireUser();
  if (roleLevel(user.role) < roleLevel("super_admin")) redirect("/portal");
  return user;
}

export async function createAuditAction(input: {
  restaurantId: string;
  templateId: string | null;
  priority: string;
  deadline: string | null;
  assignedConsultantId: string | null;
}): Promise<{ error?: string; ok?: boolean }> {
  const user = await requireAdmin();
  if (!input.restaurantId) return { error: "Restaurant is required" };

  const audit = createAudit({
    restaurantId: input.restaurantId,
    templateId: input.templateId,
    status: "new",
    priority: input.priority || "normal",
    deadline: input.deadline,
    assignedConsultantId: input.assignedConsultantId,
  });

  writeAuditLog({
    actorId: user.id,
    restaurantId: input.restaurantId,
    action: "audit.created",
    entityType: "audits",
    entityId: audit.id,
    metadata: { status: "new", priority: input.priority },
  });

  revalidatePath("/admin/audits");
  revalidatePath("/admin");
  revalidatePath(`/admin/restaurants/${input.restaurantId}`);
  return { ok: true };
}

export async function setAuditStatusAction(
  auditId: string,
  status: AuditStatus,
): Promise<void> {
  const user = await requireAdmin();
  advanceAudit(auditId, status);
  writeAuditLog({
    actorId: user.id,
    action: "audit.status_changed",
    entityType: "audits",
    entityId: auditId,
    metadata: { status },
  });
  revalidatePath("/admin/audits");
  revalidatePath("/admin");
}

export async function createTemplateAction(
  _prev: { error?: string; ok?: boolean } | undefined,
  formData: FormData,
): Promise<{ error?: string; ok?: boolean }> {
  const user = await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const type = String(formData.get("type") ?? "custom").trim();
  const description = String(formData.get("description") ?? "").trim();
  const sections = formData
    .getAll("sections")
    .map((s) => String(s).trim())
    .filter(Boolean);
  if (!name) return { error: "Name is required" };

  const template = createTemplate({
    name,
    type: type || "custom",
    description,
    sections,
  });

  writeAuditLog({
    actorId: user.id,
    action: "template.created",
    entityType: "audit_templates",
    entityId: template.id,
    metadata: { name: template.name, type: template.type },
  });

  revalidatePath("/admin/audit-templates");
  return { ok: true };
}

export async function toggleTemplateActiveAction(
  templateId: string,
  active: boolean,
): Promise<void> {
  const user = await requireAdmin();
  updateTemplate(templateId, { active });
  writeAuditLog({
    actorId: user.id,
    action: active ? "template.activated" : "template.deactivated",
    entityType: "audit_templates",
    entityId: templateId,
  });
  revalidatePath("/admin/audit-templates");
}

export async function setReportStatusAction(
  reportId: string,
  status: ReportStatus,
): Promise<void> {
  const user = await requireAdmin();
  advanceReport(reportId, status);
  writeAuditLog({
    actorId: user.id,
    action: "report.status_changed",
    entityType: "reports",
    entityId: reportId,
    metadata: { status },
  });
  revalidatePath("/admin/reports");
  revalidatePath(`/admin/reports/${reportId}`);
  revalidatePath("/admin");
}

export async function createReportAction(input: {
  restaurantId: string;
  templateId: string | null;
  title: string;
}): Promise<{ error?: string; ok?: boolean }> {
  const user = await requireAdmin();
  if (!input.restaurantId) return { error: "Restaurant is required" };
  if (!input.title) return { error: "Title is required" };

  const report = createReport({
    restaurantId: input.restaurantId,
    templateId: input.templateId,
    title: input.title,
  });

  writeAuditLog({
    actorId: user.id,
    restaurantId: input.restaurantId,
    action: "report.created",
    entityType: "reports",
    entityId: report.id,
    metadata: { title: report.title, status: "draft" },
  });

  revalidatePath("/admin/reports");
  revalidatePath("/admin");
  revalidatePath(`/admin/restaurants/${input.restaurantId}`);
  return { ok: true };
}