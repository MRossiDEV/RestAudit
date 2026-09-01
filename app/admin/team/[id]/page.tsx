import { notFound } from "next/navigation";
import Link from "next/link";
import { getConsultant, listAuditsForConsultant } from "@/db/queries/admin";
import { roleLabel } from "@/lib/roles";

const STATUS_LABEL: Record<string, string> = {
  new: "New",
  data_collection: "Data Collected",
  ai_analysis: "AI Analysis",
  auditor_review: "Review & Quality",
  delivered: "Delivered",
};

export default async function ConsultantDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const consultant = getConsultant(id);
  if (!consultant) notFound();

  const audits = listAuditsForConsultant(id);
  const workloadPct = Math.round(consultant.workload * 100);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <Link href="/admin/team" className="text-xs text-muted hover:text-foreground">
          ← Consultants & Team
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            {consultant.name}
          </h1>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {roleLabel(consultant.role)}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">{consultant.email}</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Specialization</p>
          <p className="mt-1 text-sm text-foreground">
            {consultant.specialization || "—"}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Experience</p>
          <p className="mt-1 text-sm text-foreground">
            {consultant.experience_years} years
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Performance</p>
          <p className="mt-1 text-sm font-semibold text-accent-cyan">
            {consultant.rating} / 100
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Workload</p>
          <p className="mt-1 text-sm text-foreground">
            {workloadPct}% · {consultant.active_audits}/{consultant.max_parallel_audits}
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-base font-semibold">Assigned Audits</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          {audits.length === 0 ? (
            <p className="p-6 text-sm text-muted">No audits assigned.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-2">
                  <th className="px-4 py-3 font-medium">Restaurant</th>
                  <th className="px-4 py-3 font-medium">Template</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                  <th className="px-4 py-3 font-medium">Progress</th>
                </tr>
              </thead>
              <tbody>
                {audits.map((a) => (
                  <tr key={a.id} className="border-b border-border/50 last:border-0 hover:bg-surface-2/40">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {a.restaurant_name}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {a.template_name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {STATUS_LABEL[a.status] ?? a.status}
                    </td>
                    <td className="px-4 py-3 font-semibold text-accent-cyan">
                      {a.vora_score ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-muted">{a.progress}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}