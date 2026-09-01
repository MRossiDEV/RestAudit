import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  listAuditsGrouped,
  AUDIT_COLUMNS,
  listRestaurants,
  listTemplates,
  listConsultants,
} from "@/db/queries/admin";
import { setAuditStatusAction } from "@/server/actions/admin";
import type { Audit } from "@/types/domain";
import CreateAuditForm from "./create-audit";

const COLUMN_TITLES: Record<string, string> = {
  new: "New",
  data_collection: "Data Collected",
  ai_analysis: "AI Analysis",
  auditor_review: "Review & Quality",
  delivered: "Delivered",
};

const PRIORITY_STYLE: Record<string, string> = {
  low: "bg-surface text-muted",
  normal: "bg-surface text-muted",
  high: "bg-negative/10 text-negative",
  urgent: "bg-negative/20 text-negative",
};

function AuditCard({ audit }: { audit: Audit }) {
  const idx = AUDIT_COLUMNS.indexOf(audit.status);
  const prev = idx > 0 ? AUDIT_COLUMNS[idx - 1] : null;
  const next =
    idx >= 0 && idx < AUDIT_COLUMNS.length - 1 ? AUDIT_COLUMNS[idx + 1] : null;

  return (
    <div className="rounded-lg border border-border bg-surface p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <Link
          href="/admin/audits"
          className="text-sm font-medium leading-snug hover:text-primary"
        >
          {audit.restaurant_name ?? "Restaurant"}
        </Link>
        <span
          className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${PRIORITY_STYLE[audit.priority] ?? "bg-surface text-muted"}`}
        >
          {audit.priority}
        </span>
      </div>
      <p className="mt-1 text-xs text-muted">{audit.template_name ?? "Audit"}</p>

      {audit.vora_score != null && (
        <p className="mt-2 text-lg font-semibold text-accent-cyan">
          {audit.vora_score}
          <span className="ml-1 text-xs font-normal text-muted-2">/ 100</span>
        </p>
      )}

      <div className="mt-2 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-primary/70"
            style={{ width: `${audit.progress}%` }}
          />
        </div>
        <span className="text-[10px] text-muted-2">{audit.progress}%</span>
      </div>

      <p className="mt-2 text-[11px] text-muted-2">
        {audit.assigned_consultant_name ?? "Unassigned"}
        {audit.deadline ? ` · due ${audit.deadline}` : ""}
      </p>

      <div className="mt-3 flex justify-end gap-2">
        {prev ? (
          <form action={setAuditStatusAction.bind(null, audit.id, prev)}>
            <button
              type="submit"
              aria-label={`Revert to ${COLUMN_TITLES[prev]}`}
              title={`Revert to ${COLUMN_TITLES[prev]}`}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-negative/40 hover:text-negative"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
          </form>
        ) : null}
        {next && (
          <form action={setAuditStatusAction.bind(null, audit.id, next)}>
            <button
              type="submit"
              aria-label={`Move to ${COLUMN_TITLES[next]}`}
              title={`Move to ${COLUMN_TITLES[next]}`}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default async function AdminAudits() {
  const grouped = listAuditsGrouped();
  const restaurants = listRestaurants().map((r) => ({ id: r.id, name: r.name }));
  const templates = listTemplates().map((t) => ({ id: t.id, name: t.name }));
  const consultants = listConsultants().map((c) => ({ id: c.id, name: c.name }));

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Audits
        </h1>
        <p className="mt-1 text-sm text-muted">
          Audit Operations Center — pipeline across all restaurants.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Left sidebar: create audit + templates */}
        <aside className="hidden w-80 shrink-0 flex-col gap-4 lg:flex">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="mb-3 font-display text-base font-semibold">New Audit</h2>
            <CreateAuditForm
              restaurants={restaurants}
              templates={templates}
              consultants={consultants}
            />
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold">Templates</h2>
              <Link
                href="/admin/audit-templates"
                className="text-xs text-muted hover:text-primary"
              >
                Manage
              </Link>
            </div>
            <ul className="space-y-2">
              {templates.map((t) => (
                <li key={t.id} className="text-sm text-muted">
                  {t.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Board */}
        <div className="flex min-w-0 flex-1 gap-4 overflow-x-auto pb-4">
          {AUDIT_COLUMNS.map((status) => {
            const audits = grouped[status];
            return (
              <div
                key={status}
                className="w-60 shrink-0 rounded-xl border border-border bg-surface-2/40 p-2"
              >
                <div className="mb-2 flex items-center justify-between px-1">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {COLUMN_TITLES[status]}
                  </h3>
                  <span className="rounded-full bg-surface px-1.5 py-0.5 text-[10px] text-muted-2">
                    {audits.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {audits.map((a) => (
                    <AuditCard key={a.id} audit={a} />
                  ))}
                  {audits.length === 0 && (
                    <p className="px-1 py-3 text-center text-xs text-muted-2">
                      Empty
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}