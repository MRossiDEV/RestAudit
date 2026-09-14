import type { AuditLog } from "@/types/domain";

// Human-readable rendering for audit_log action strings, shared by the
// Command Center feed and restaurant intelligence timelines.
const LABELS: Record<string, { text: (e: AuditLog) => string }> = {
  "restaurant.vora_check_completed": {
    text: () => "completó la comprobación VORA",
  },
  "restaurant.report_opened": {
    text: () => "abrió su informe",
  },
  "audit.analysis_submitted": {
    text: (e) => {
      const name = str(e.metadata?.audit);
      return name ? `envió el análisis de ${name}` : "envió un análisis";
    },
  },
  "audit.assigned": {
    text: (e) => `asignado a ${str(e.metadata?.consultant) ?? "un consultor"}`,
  },
  "audit.created": {
    text: () => "creó una auditoría nueva",
  },
  "audit.status_changed": {
    text: (e) => `cambió al estado ${str(e.metadata?.status) ?? "siguiente etapa"}`,
  },
  "audit.delivered": {
    text: () => "entregó el informe de auditoría",
  },
  "ai.findings_generated": {
    text: (e) =>
      `VORA Intelligence generó ${str(e.metadata?.count) ?? ""} hallazgos`,
  },
  "report.approved": {
    text: () => "aprobó un informe",
  },
  "lead.qualified": {
    text: () => "calificó un nuevo lead",
  },
  "report.created": {
    text: (e) => `creó el informe "${str(e.metadata?.title)}"`,
  },
  "report.status_changed": {
    text: (e) => {
      const status = str(e.metadata?.status);
      if (status === "delivered") return "entregó un informe al cliente";
      if (status === "reviewed") return "marcó un informe como revisado";
      return `movió el informe a ${status || "la siguiente etapa"}`;
    },
  },
  "template.created": {
    text: (e) => `creó la plantilla ${str(e.metadata?.name)}`,
  },
  "provider.updated": {
    text: (e) =>
      `configuró ${str(e.metadata?.name)} (${str(e.metadata?.model) || "modelo predeterminado"})`,
  },
  "provider.activated": {
    text: (e) => `habilitó ${str(e.metadata?.name)} como proveedor de IA`,
  },
  "provider.deactivated": {
    text: (e) => `deshabilitó ${str(e.metadata?.name)}`,
  },
  "template.activated": {
    text: () => "activó una plantilla",
  },
  "template.deactivated": {
    text: () => "desactivó una plantilla",
  },
  "talent.profile_created": {
    text: (e) => `creó el perfil de talento ${str(e.metadata?.name) ?? ""}`,
  },
  "talent.profile_updated": {
    text: (e) => `actualizó el perfil de talento ${str(e.metadata?.name) ?? ""}`,
  },
  "talent.profile_deleted": {
    text: (e) => `eliminó el perfil de talento ${str(e.metadata?.name) ?? ""}`,
  },
  "talent.job_created": {
    text: (e) => `publicó el empleo "${str(e.metadata?.title)}"`,
  },
  "talent.job_updated": {
    text: (e) => `actualizó el empleo "${str(e.metadata?.title)}"`,
  },
  "talent.job_status_changed": {
    text: (e) => `cambió el estado del empleo a ${str(e.metadata?.status) ?? "siguiente etapa"}`,
  },
  "talent.candidate_unlocked": {
    text: (e) => `desbloqueó el candidato ${str(e.metadata?.alias) ?? ""}`,
  },
  "talent.application_status_changed": {
    text: (e) => `movió una candidatura a ${str(e.metadata?.status) ?? "siguiente etapa"}`,
  },
  "talent.verification_updated": {
    text: () => "actualizó una verificación de talento",
  },
};

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

export interface ActivityItem {
  id: string;
  action: string;
  actor_name: string | null;
  restaurant_name: string | null;
  label: string;
  detail: string;
  created_at: string;
  kind: string;
}

export function describeActivity(entry: AuditLog): ActivityItem {
  const def = LABELS[entry.action];
  const kind = entry.action.split(".")[0] ?? "system";
  const label = def ? def.text(entry) : `action "${entry.action}"`;
  const actor = entry.actor_name ?? entry.actor_id;
  const detail = entry.restaurant_name
    ? `${actor ? actor + " · " : ""}${entry.restaurant_name}`
    : actor ?? "";
  return {
    id: entry.id,
    action: entry.action,
    actor_name: entry.actor_name ?? null,
    restaurant_name: entry.restaurant_name ?? null,
    label,
    detail,
    created_at: entry.created_at,
    kind,
  };
}

export function timeAgo(iso: string): string {
  const then = new Date(iso.replace(" ", "T") + "Z");
  const seconds = Math.max(0, Math.floor((Date.now() - then.getTime()) / 1000));
  if (seconds < 60) return "ahora mismo";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} d`;
  return then.toLocaleDateString();
}

const KIND_COLORS: Record<string, string> = {
  restaurant: "text-accent-cyan",
  audit: "text-primary",
  ai: "text-accent-violet",
  report: "text-accent-green",
  lead: "text-accent-blue",
  template: "text-primary",
  provider: "text-accent-violet",
};

export function activityKindColor(kind: string): string {
  return KIND_COLORS[kind] ?? "text-muted";
}