import { notFound } from "next/navigation";
import Link from "next/link";
import { getJob, listApplicationsGrouped, APPLICATION_COLUMNS } from "@/db/queries/talent";
import { PipelineBoard } from "./pipeline-board";

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

const COLUMN_LABEL: Record<string, string> = {
  applied: "Aplicados",
  screening: "En cribado",
  shortlisted: "Preseleccionados",
  interview: "Entrevista",
  final_review: "Revisión final",
  hired: "Contratados",
};

function fmtSalary(min: number | null, max: number | null): string {
  if (min == null && max == null) return "—";
  if (min == null) return `hasta $${max}`;
  if (max == null) return `desde $${min}`;
  return `$${min} - $${max}`;
}

export default async function TalentJobDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = getJob(id);
  if (!job) notFound();

  const grouped = listApplicationsGrouped(id);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <Link href="/admin/talent/jobs" className="text-xs text-muted hover:text-foreground">
          ← Empleos
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold tracking-tight">{job.title}</h1>
          <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-muted-2">
            {JOB_STATUS_LABEL[job.status] ?? job.status}
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {TIER_LABEL[job.tier] ?? job.tier}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">
          {job.restaurant_name ?? "—"}
          {job.location ? ` · ${job.location}` : ""}
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Tipo de empleo</p>
          <p className="mt-1 text-sm text-foreground">{job.employment_type}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Salario</p>
          <p className="mt-1 text-sm text-foreground">
            {fmtSalary(job.salary_min, job.salary_max)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Experiencia requerida</p>
          <p className="mt-1 text-sm text-foreground">{job.experience_required} años</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Habilidades</p>
          <p className="mt-1 text-sm text-foreground">
            {job.skills_required.length ? job.skills_required.join(", ") : "—"}
          </p>
        </div>
      </section>

      {job.description && (
        <section>
          <h2 className="mb-3 font-display text-base font-semibold">Descripción</h2>
          <p className="text-sm leading-relaxed text-muted">{job.description}</p>
        </section>
      )}

      {job.screening_questions.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-base font-semibold">Preguntas de cribado</h2>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted">
            {job.screening_questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="mb-3 font-display text-base font-semibold">
          Candidaturas
        </h2>
        <PipelineBoard
          columns={APPLICATION_COLUMNS.map((c) => ({
            status: c,
            label: COLUMN_LABEL[c] ?? c,
            applications: (grouped[c] ?? []).map((a) => ({
              id: a.id,
              talentProfileId: a.talent_profile_id,
              talentName: a.talent_name ?? "—",
              talentTitle: a.talent_title ?? "",
              matchScore: a.match_score ?? null,
            })),
          }))}
        />
      </section>
    </div>
  );
}