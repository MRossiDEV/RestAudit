import Link from "next/link";
import {
  listApplications,
  listJobs,
  listTalentProfiles,
  getTalentAlias,
} from "@/db/queries/talent";

const AVAILABILITY_LABEL: Record<string, string> = {
  immediate: "Inmediata",
  "15_days": "15 días",
  "30_days": "30 días",
  employed: "Empleado",
  open: "Abierto",
};

const VERIFICATION_LABEL: Record<string, string> = {
  unverified: "Sin verificar",
  partial: "Parcial",
  verified: "Verificado",
};

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

export default async function AdminTalent() {
  const profiles = listTalentProfiles();
  const jobs = listJobs();
  const applications = listApplications();

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Talento
          </h1>
          <p className="mt-1 text-sm text-muted">
            Inteligencia de talento: profesionales, empleos y candidaturas del ecosistema VORA.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link
            href="/admin/talent/new"
            className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
          >
            Nuevo perfil
          </Link>
          <Link
            href="/admin/talent/jobs/new"
            className="glow-primary rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Nuevo empleo
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Profesionales</p>
          <p className="mt-1 font-display text-2xl font-semibold">{profiles.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Empleos</p>
          <p className="mt-1 font-display text-2xl font-semibold">{jobs.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Candidaturas</p>
          <p className="mt-1 font-display text-2xl font-semibold">{applications.length}</p>
        </div>
      </div>

      <section>
        <h2 className="mb-3 font-display text-base font-semibold">Profesionales</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-2">
                <th className="px-4 py-3 font-medium">Candidato</th>
                <th className="px-4 py-3 font-medium">Cargo</th>
                <th className="px-4 py-3 font-medium">Ubicación</th>
                <th className="px-4 py-3 font-medium">Experiencia</th>
                <th className="px-4 py-3 font-medium">Disponibilidad</th>
                <th className="px-4 py-3 font-medium">Verificación</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-border/50 last:border-0 hover:bg-surface-2/40"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/talent/${p.id}`}
                      className="font-medium text-foreground hover:text-primary"
                    >
                      {getTalentAlias(p.id)}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{p.professional_title || "—"}</td>
                  <td className="px-4 py-3 text-muted">{p.location || "—"}</td>
                  <td className="px-4 py-3 text-muted">{p.years_experience} años</td>
                  <td className="px-4 py-3 text-muted">
                    {AVAILABILITY_LABEL[p.availability_status] ?? p.availability_status}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        p.verification_status === "verified"
                          ? "bg-positive/10 text-positive"
                          : p.verification_status === "partial"
                            ? "bg-accent-blue/10 text-accent-blue"
                            : "bg-surface-2 text-muted-2"
                      }`}
                    >
                      {VERIFICATION_LABEL[p.verification_status] ?? p.verification_status}
                    </span>
                  </td>
                </tr>
              ))}
              {profiles.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-muted">
                    Todavía no hay profesionales registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-base font-semibold">Empleos</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-2">
                <th className="px-4 py-3 font-medium">Título</th>
                <th className="px-4 py-3 font-medium">Restaurante</th>
                <th className="px-4 py-3 font-medium">Tipo</th>
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
                  <td className="px-4 py-3 text-muted">{j.employment_type}</td>
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
      </section>
    </div>
  );
}