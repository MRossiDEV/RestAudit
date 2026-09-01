import Link from "next/link";
import { listConsultants } from "@/db/queries/admin";
import { roleLabel } from "@/lib/roles";

function workloadColor(workload: number): string {
  if (workload >= 1) return "bg-negative";
  if (workload >= 0.7) return "bg-accent-blue";
  return "bg-accent-green";
}

export default async function AdminTeam() {
  const consultants = listConsultants();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Consultants & Team
        </h1>
        <p className="mt-1 text-sm text-muted">
          Internal team, specialization, and live workload across active audits.
        </p>
      </div>

      <section>
        <h2 className="mb-3 font-display text-base font-semibold">Team</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          {consultants.map((c) => (
            <div
              key={c.id}
              className="flex flex-col gap-4 border-b border-border/50 p-5 last:border-0 sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/team/${c.id}`}
                    className="font-medium text-foreground hover:text-primary"
                  >
                    {c.name}
                  </Link>
                  {c.c_status !== "active" && (
                    <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-2">
                      {c.c_status}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-muted">
                  {roleLabel(c.role)}
                  {c.specialization ? ` · ${c.specialization}` : ""} ·{" "}
                  {c.experience_years}y exp
                </p>
                <div className="mt-1 flex flex-wrap gap-4 text-xs text-muted-2">
                  <span>
                    <span className="font-medium text-foreground">{c.active_audits}</span>{" "}
                    active
                  </span>
                  <span>
                    <span className="font-medium text-foreground">{c.completed_audits}</span>{" "}
                    completed
                  </span>
                  <span>
                    Rating{" "}
                    <span className="font-medium text-accent-cyan">{c.rating}</span>
                  </span>
                </div>
              </div>

              <div className="w-full sm:w-48">
                <div className="mb-1 flex items-center justify-between text-[11px] text-muted-2">
                  <span>Workload</span>
                  <span>
                    {Math.round(c.workload * 100)}% · {c.active_audits}/
                    {c.max_parallel_audits}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className={`h-full rounded-full transition-all ${workloadColor(c.workload)}`}
                    style={{ width: `${Math.max(4, c.workload * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
          {consultants.length === 0 && (
            <p className="p-6 text-sm text-muted">No consultants yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}