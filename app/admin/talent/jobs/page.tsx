import Link from "next/link";
import { listJobs } from "@/db/queries/talent";

const JOB_STATUS_LABEL: Record<string, string> = {
  draft: "Borrador",
  open: "Abierto",
  paused: "En pausa",
  closed: "Cerrado",
};

const TIER_LABEL: Record<string, string> = {
  standard: "Estándar",
  featured: "Destacado",
  urgent: "Urgente",
};

function fmtSalary(min: number | null, max: number | null): string {
  if (min == null && max == null) return "—";
  if (min == null) return `hasta $${max}`;
  if (max == null) return `desde $${min}`;
  return `$${min} - $${max}`;
}

export default async function AdminTalentJobs() {
  const jobs = listJobs();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/admin/talent" className="text-xs text-muted hover:text-foreground">
            ← Talento
          </Link>
          <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
            Empleos
          </h1>
          <p className="mt-1 text-sm text-muted">
            Oportunidades laborales publicadas por los restaurantes de la red VORA.
          </p>
        </div>
        <Link
          href="/admin/talent/jobs/new"
          className="glow-primary shrink-0 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Nuevo empleo
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-2">
              <th className="px-4 py-3 font-medium">Título</th>
              <th className="px-4 py-3 font-medium">Restaurante</th>
              <th className="px-4 py-3 font-medium">Ubicación</th>
              <th className="px-4 py-3 font-medium">Salario</th>
              <th className="px-4 py-3 font-medium">Nivel</th>
              <th className="px-4 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr
                key={j.id}
                className="border-b border-border/50 last:border-0 hover:bg-surface-2/40"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/talent/jobs/${j.id}`}
                    className="font-medium text-foreground hover:text-primary"
                  >
                    {j.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted">{j.restaurant_name ?? "—"}</td>
                <td className="px-4 py-3 text-muted">{j.location || "—"}</td>
                <td className="px-4 py-3 text-muted">{fmtSalary(j.salary_min, j.salary_max)}</td>
                <td className="px-4 py-3 text-muted">{TIER_LABEL[j.tier] ?? j.tier}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted-2">
                    {JOB_STATUS_LABEL[j.status] ?? j.status}
                  </span>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted">
                  Todavía no hay empleos publicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}