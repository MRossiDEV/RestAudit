import Link from "next/link";
import { getDashboard } from "@/db/queries/admin";
import { ActivityFeed } from "./activity-feed";

function KpiCard({
  label,
  value,
  sub,
  accent,
  href,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
  href?: string;
}) {
  const inner = (
    <div
      className={`rounded-xl border border-border bg-surface p-4 transition-colors ${
        accent ? "glow-primary" : ""
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-2">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

export default async function AdminDashboard() {
  const data = getDashboard();
  const { kpi, activity } = data;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Command Center
        </h1>
        <p className="mt-1 text-sm text-muted">
          What is happening across the VORA operation right now.
        </p>
      </div>

      <section>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <KpiCard
            label="Restaurants"
            value={kpi.totalRestaurants}
            sub="active clients"
            href="/admin/restaurants"
          />
          <KpiCard
            label="Under Analysis"
            value={kpi.inAnalysis}
            sub="in pipeline"
            accent
            href="/admin/audits"
          />
          <KpiCard
            label="Active Audits"
            value={kpi.activeAudits}
            sub="not delivered"
            href="/admin/audits"
          />
          <KpiCard
            label="Pending Review"
            value={kpi.pendingReview}
            sub="quality gate"
            accent
            href="/admin/audits"
          />
          <KpiCard
            label="Reports Delivered"
            value={kpi.delivered}
            href="/admin/audits"
          />
          <KpiCard
            label="New Leads"
            value={kpi.newLeads}
            sub={`${kpi.totalLeads} total`}
            href="/admin/leads"
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-surface">
            <div className="border-b border-border px-5 py-4">
              <h2 className="font-display text-base font-semibold">
                Operational Activity
              </h2>
            </div>
            <div className="p-3">
              <ActivityFeed entries={activity} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-display text-base font-semibold">
              Average VORA Score
            </h2>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-accent-cyan">
              {kpi.avgScore}
            </p>
            <p className="mt-1 text-xs text-muted">across scored audits</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-display text-base font-semibold">
              Active Consultants
            </h2>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-primary">
              {kpi.consultants}
            </p>
            <p className="mt-1 text-xs text-muted">on the team</p>
          </div>
        </div>
      </section>
    </div>
  );
}