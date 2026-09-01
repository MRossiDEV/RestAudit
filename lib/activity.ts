import type { AuditLog } from "@/types/domain";

// Human-readable rendering for audit_log action strings, shared by the
// Command Center feed and restaurant intelligence timelines.
const LABELS: Record<string, { text: (e: AuditLog) => string }> = {
  "restaurant.vora_check_completed": {
    text: () => "completed the VORA Check",
  },
  "restaurant.report_opened": {
    text: () => "opened their report",
  },
  "audit.analysis_submitted": {
    text: (e) => {
      const name = str(e.metadata?.audit);
      return name ? `submitted ${name} analysis` : "submitted an analysis";
    },
  },
  "audit.assigned": {
    text: (e) => `assigned to ${str(e.metadata?.consultant) ?? "a consultant"}`,
  },
  "audit.created": {
    text: () => "created a new audit",
  },
  "audit.status_changed": {
    text: (e) => `moved to ${str(e.metadata?.status) ?? "next stage"}`,
  },
  "audit.delivered": {
    text: () => "delivered the audit report",
  },
  "ai.findings_generated": {
    text: (e) =>
      `VORA Intelligence generated ${str(e.metadata?.count) ?? ""} findings`,
  },
  "report.approved": {
    text: () => "approved a report",
  },
  "lead.qualified": {
    text: () => "qualified a new lead",
  },
  "report.created": {
    text: (e) => `created report "${str(e.metadata?.title)}"`,
  },
  "report.status_changed": {
    text: (e) => {
      const status = str(e.metadata?.status);
      if (status === "delivered") return "delivered a report to the client";
      if (status === "reviewed") return "marked a report as reviewed";
      return `moved report to ${status || "next stage"}`;
    },
  },
  "template.created": {
    text: (e) => `created template ${str(e.metadata?.name)}`,
  },
  "provider.updated": {
    text: (e) =>
      `configured ${str(e.metadata?.name)} (${str(e.metadata?.model) || "default model"})`,
  },
  "provider.activated": {
    text: (e) => `enabled ${str(e.metadata?.name)} as an AI provider`,
  },
  "provider.deactivated": {
    text: (e) => `disabled ${str(e.metadata?.name)}`,
  },
  "template.activated": {
    text: () => "activated a template",
  },
  "template.deactivated": {
    text: () => "deactivated a template",
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
  if (seconds < 60) return "just now";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
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