import Link from "next/link";
import {
  listReportsGrouped,
  listReportTemplates,
  REPORT_COLUMNS,
} from "@/db/queries/reports";
import { listRestaurants } from "@/db/queries/admin";
import type { Report } from "@/types/domain";
import CreateReportForm from "./create-report";

const COLUMN_TITLES: Record<string, string> = {
  draft: "Draft",
  reviewed: "Reviewed",
  delivered: "Delivered",
};

const STATUS_DOT: Record<string, string> = {
  draft: "bg-muted-2",
  reviewed: "bg-accent-cyan",
  delivered: "bg-accent-green",
};

function ReportCard({ report }: { report: Report }) {
  return (
    <Link
      href={`/admin/reports/${report.id}`}
      className="block rounded-lg border border-border bg-surface p-3 shadow-sm transition-colors hover:border-primary/40"
    >
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[report.status]}`} />
        <h3 className="truncate text-sm font-medium leading-snug hover:text-primary">
          {report.title}
        </h3>
      </div>
      <p className="mt-1 truncate text-xs text-muted">{report.restaurant_name}</p>
      {report.vora_score != null && (
        <p className="mt-1.5 text-lg font-semibold text-accent-cyan">
          {report.vora_score}
          <span className="ml-1 text-xs font-normal text-muted-2">/ 100</span>
        </p>
      )}
      <p className="mt-1 text-[11px] text-muted-2">
        {report.template_name ?? "Custom"}
      </p>
    </Link>
  );
}

export default async function AdminReports() {
  const grouped = listReportsGrouped();
  const templates = listReportTemplates();
  const restaurants = listRestaurants().map((r) => ({ id: r.id, name: r.name }));

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Reports
        </h1>
        <p className="mt-1 text-sm text-muted">
          Central report lifecycle — Draft → Reviewed → Delivered. AI
          generation and review happen in one sitting, then deliver.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Left sidebar: new report + templates */}
        <aside className="hidden w-80 shrink-0 flex-col gap-4 lg:flex">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="mb-3 font-display text-base font-semibold">New Report</h2>
            <CreateReportForm restaurants={restaurants} templates={templates} />
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="mb-3 font-display text-base font-semibold">Report Templates</h2>
            <div className="space-y-4">
              {templates.map((t) => (
                <div key={t.id} className="rounded-lg border border-border/60 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground">{t.name}</h3>
                    <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase text-primary">
                      {t.type}
                    </span>
                  </div>
                  {t.description && (
                    <p className="mt-1 text-sm text-muted">{t.description}</p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {t.sections.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Board */}
        <div className="flex min-w-0 flex-1 gap-4 overflow-x-auto pb-4">
          {REPORT_COLUMNS.map((status) => {
            const reports = grouped[status];
            return (
              <div
                key={status}
                className="w-64 shrink-0 rounded-xl border border-border bg-surface-2/40 p-2"
              >
                <div className="mb-2 flex items-center justify-between px-1">
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {COLUMN_TITLES[status]}
                  </h2>
                  <span className="rounded-full bg-surface px-1.5 py-0.5 text-[10px] text-muted-2">
                    {reports.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {reports.map((r) => (
                    <ReportCard key={r.id} report={r} />
                  ))}
                  {reports.length === 0 && (
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