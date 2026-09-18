"use client";

import { useActionState } from "react";
import { createCompanyJob, type CompanyJobState } from "@/server/actions/companyJobs";

const input =
  "mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary";
const label = "text-sm font-medium";

export default function NewJobPage() {
  const [state, action, pending] = useActionState<CompanyJobState | undefined, FormData>(
    createCompanyJob,
    undefined,
  );

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Publicar empleo</h1>
      <p className="mt-1 text-sm text-muted">Aparecerá en tu perfil público de empresa.</p>

      <form action={action} className="mt-8 space-y-5">
        <div>
          <label htmlFor="title" className={label}>Título del puesto</label>
          <input id="title" name="title" placeholder="Chef ejecutivo" className={input} required />
        </div>

        <div>
          <label htmlFor="description" className={label}>Descripción</label>
          <textarea id="description" name="description" rows={5} placeholder="Responsabilidades, requisitos, beneficios…" className={input} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="location" className={label}>Ubicación</label>
            <input id="location" name="location" placeholder="Ciudad, País" className={input} />
          </div>
          <div>
            <label htmlFor="employment_type" className={label}>Tipo de empleo</label>
            <select id="employment_type" name="employment_type" className={input}>
              <option value="full_time">Tiempo completo</option>
              <option value="part_time">Medio tiempo</option>
              <option value="contract">Contrato</option>
              <option value="seasonal">Temporada</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="salary_min" className={label}>Salario mín.</label>
            <input id="salary_min" name="salary_min" type="number" min={0} className={input} />
          </div>
          <div>
            <label htmlFor="salary_max" className={label}>Salario máx.</label>
            <input id="salary_max" name="salary_max" type="number" min={0} className={input} />
          </div>
          <div>
            <label htmlFor="experience_required" className={label}>Años exp.</label>
            <input id="experience_required" name="experience_required" type="number" min={0} defaultValue={0} className={input} />
          </div>
        </div>

        <div>
          <label htmlFor="skills_required" className={label}>Habilidades (separadas por comas)</label>
          <input id="skills_required" name="skills_required" placeholder="Cocina de autor, Gestión de equipos" className={input} />
        </div>

        {state?.message && !state.ok && (
          <p className="rounded-lg border border-negative/30 bg-negative/10 px-3 py-2 text-sm text-negative">
            {state.message}
          </p>
        )}

        <div className="flex gap-3">
          <button type="submit" disabled={pending} className="glow-primary rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60">
            {pending ? "Publicando..." : "Publicar empleo"}
          </button>
        </div>
      </form>
    </div>
  );
}
