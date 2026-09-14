import { listTemplates } from "@/db/queries/admin";
import { toggleTemplateActiveAction } from "@/server/actions/admin";
import CreateTemplateForm from "./create-template";

function TemplateRow({ template }: { template: ReturnType<typeof listTemplates>[number] }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/50 p-4 last:border-0">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-foreground">{template.name}</h3>
          {!template.active && (
            <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-2">
              inactiva
            </span>
          )}
        </div>
        {template.description && (
          <p className="mt-1 text-sm text-muted">{template.description}</p>
        )}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {template.sections.map((s) => (
            <span
              key={s}
              className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase text-primary">
          {template.type}
        </span>
        <form action={toggleTemplateActiveAction.bind(null, template.id, !template.active)}>
          <button
            type="submit"
            className="text-xs text-muted hover:text-foreground"
          >
            {template.active ? "Desactivar" : "Activar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default async function AdminAuditTemplates() {
  const templates = listTemplates();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Plantillas de auditoría
        </h1>
        <p className="mt-1 text-sm text-muted">
          La metodología está configurada en la base de datos y nunca se codifica de forma fija.
          Las plantillas definen secciones, preguntas, modelo de puntuación y plantilla del informe.
        </p>
      </div>

      <section>
        <h2 className="mb-3 font-display text-base font-semibold">Metodología</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          {templates.map((t) => (
            <TemplateRow key={t.id} template={t} />
          ))}
          {templates.length === 0 && (
            <p className="p-6 text-sm text-muted">Todavía no hay plantillas.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-base font-semibold">Nueva plantilla</h2>
        <div className="rounded-xl border border-border bg-surface p-5">
          <CreateTemplateForm />
        </div>
      </section>
    </div>
  );
}