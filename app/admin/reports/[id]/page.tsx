import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getReport, REPORT_COLUMNS } from "@/db/queries/reports";
import { setReportStatusAction } from "@/server/actions/admin";

const STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  reviewed: "Reviewed",
  delivered: "Delivered",
};

const STATUS_CHIP: Record<string, string> = {
  draft: "bg-surface text-muted",
  reviewed: "bg-accent-cyan/10 text-accent-cyan",
  delivered: "bg-positive/10 text-positive",
};

const NEXT_ACTION: Partial<Record<string, string>> = {
  reviewed: "Mark as reviewed",
  delivered: "Deliver to client",
};

const SOURCE_LABEL: Record<string, string> = { ai: "AI", human: "Human" };

export default async function ReportDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = getReport(id);
  if (!report) notFound();

  const idx = REPORT_COLUMNS.indexOf(report.status);
  const prev = idx > 0 ? REPORT_COLUMNS[idx - 1] : null;
  const next =
    idx >= 0 && idx < REPORT_COLUMNS.length - 1
      ? REPORT_COLUMNS[idx + 1]
      : null;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <Link
          href="/admin/reports"
          className="text-xs text-muted hover:text-foreground"
        >
          ← Reports
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            {report.title}
          </h1>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CHIP[report.status] ?? "bg-surface text-muted"}`}
          >
            {STATUS_LABEL[report.status] ?? report.status}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">
          {report.restaurant_name}
          {report.template_name ? ` · ${report.template_name}` : ""}
          {report.vora_score != null ? ` · VORA ${report.vora_score}` : ""}
        </p>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
        <p className="text-sm text-muted">
          {next
            ? next === "delivered"
              ? "Send the final report to the client."
              : "Confirm the human review is complete."
            : report.status === "delivered"
              ? "Delivered to the client"
              : "Draft"}
        </p>
        <div className="flex items-center gap-2">
          {prev && (
            <form action={setReportStatusAction.bind(null, report.id, prev)}>
              <button
                type="submit"
                aria-label={`Revert to ${STATUS_LABEL[prev]}`}
                title={`Revert to ${STATUS_LABEL[prev]}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-negative/40 hover:text-negative"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </form>
          )}
          {next && (
            <form action={setReportStatusAction.bind(null, report.id, next)}>
              <button
                type="submit"
                aria-label={NEXT_ACTION[next]}
                title={NEXT_ACTION[next]}
                className="glow-primary flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:opacity-90"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-base font-semibold">Report Builder</h2>
        {report.sections.length === 0 ? (
          <p className="text-sm text-muted">No sections yet.</p>
        ) : (
          report.sections.map((s) => (
            <article
              key={s.id}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="font-medium text-foreground">{s.title}</h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                      s.source === "human"
                        ? "bg-accent-blue/10 text-accent-blue"
                        : "bg-accent-violet/10 text-accent-violet"
                    }`}
                  >
                    {SOURCE_LABEL[s.source]}
                  </span>
                  {s.status === "reviewed" && (
                    <span className="rounded bg-accent-cyan/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-accent-cyan">
                      Reviewed
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                {s.content || "—"}
              </p>
            </article>
          ))
        )}
      </section>
    </div>
  );
}