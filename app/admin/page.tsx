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
          Centro de Comando
        </h1>
        <p className="mt-1 text-sm text-muted">
          Qué está ocurriendo en la operación de VORA en este momento.
        </p>
      </div>

      <section>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <KpiCard
            label="Restaurantes"
            value={kpi.totalRestaurants}
            sub="clientes activos"
            href="/admin/restaurants"
          />
          <KpiCard
            label="En análisis"
            value={kpi.inAnalysis}
            sub="en proceso"
            accent
            href="/admin/audits"
          />
          <KpiCard
            label="Auditorías activas"
            value={kpi.activeAudits}
            sub="sin entregar"
            href="/admin/audits"
          />
          <KpiCard
            label="Pendientes de revisión"
            value={kpi.pendingReview}
            sub="control de calidad"
            accent
            href="/admin/audits"
          />
          <KpiCard
            label="Informes entregados"
            value={kpi.delivered}
            href="/admin/audits"
          />
          <KpiCard
            label="Nuevos leads"
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
                Actividad operativa
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
              Promedio de score VORA
            </h2>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-accent-cyan">
              {kpi.avgScore}
            </p>
            <p className="mt-1 text-xs text-muted">en auditorías calificadas</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-display text-base font-semibold">
              Consultores activos
            </h2>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-primary">
              {kpi.consultants}
            </p>
            <p className="mt-1 text-xs text-muted">en el equipo</p>
          </div>
        </div>
      </section>
    </div>
  );
}