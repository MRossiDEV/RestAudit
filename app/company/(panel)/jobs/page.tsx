import Link from "next/link";
import { requireBusiness } from "@/lib/business";
import { listJobsForBusiness } from "@/db/queries/talent";
import type { JobStatus } from "@/types/domain";
import { setJobStatus } from "@/server/actions/companyJobs";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<JobStatus, string> = {
  draft: "Borrador",
  open: "Abierta",
  paused: "Pausada",
  closed: "Cerrada",
};

const STATUS_STYLE: Record<JobStatus, string> = {
  draft: "bg-surface-2 text-muted",
  open: "bg-emerald-500/10 text-emerald-300",
  paused: "bg-amber-500/10 text-amber-300",
  closed: "bg-negative/10 text-negative",
};

export default async function CompanyJobsPage() {
  const business = await requireBusiness();
  const jobs = listJobsForBusiness(business.id);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Posiciones</h1>
          <p className="mt-1 text-sm text-muted">Empleos publicados por {business.business_name}.</p>
        </div>
        <Link
          href="/company/jobs/new"
          className="glow-primary inline-flex min-h-10 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Publicar empleo
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="text-sm text-muted">Todavía no publicaste ninguna posición.</p>
            <Link
              href="/company/jobs/new"
              className="glow-primary mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
            >
              Publicar la primera
            </Link>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{job.title}</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLE[job.status]}`}>
                      {STATUS_LABEL[job.status]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{job.location}</p>
                  <p className="mt-1 text-xs text-muted-2">
                    {job.employment_type}
                    {job.salary_min && job.salary_max && ` · $${job.salary_min}–$${job.salary_max}`}
                    {job.experience_required > 0 && ` · ${job.experience_required}+ años`}
                  </p>
                  {job.skills_required.length > 0 && (
                    <p className="mt-1 text-xs text-muted-2">{job.skills_required.join(" · ")}</p>
                  )}
                </div>

                <div className="flex shrink-0 flex-col gap-1.5">
                  {job.status !== "open" && (
                    <form action={setJobStatus.bind(null, job.id, "open")}>
                      <button className="w-full rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground">
                        Abrir
                      </button>
                    </form>
                  )}
                  {job.status === "open" && (
                    <form action={setJobStatus.bind(null, job.id, "paused")}>
                      <button className="w-full rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground">
                        Pausar
                      </button>
                    </form>
                  )}
                  {job.status !== "closed" && (
                    <form action={setJobStatus.bind(null, job.id, "closed")}>
                      <button className="w-full rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground">
                        Cerrar
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
