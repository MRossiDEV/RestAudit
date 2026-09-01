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
              inactive
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
            {template.active ? "Deactivate" : "Activate"}
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
          Audit Templates
        </h1>
        <p className="mt-1 text-sm text-muted">
          Methodology is DB-configured — never hardcoded. Templates own
          sections, questions, scoring model, and report template.
        </p>
      </div>

      <section>
        <h2 className="mb-3 font-display text-base font-semibold">Methodology</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          {templates.map((t) => (
            <TemplateRow key={t.id} template={t} />
          ))}
          {templates.length === 0 && (
            <p className="p-6 text-sm text-muted">No templates yet.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-base font-semibold">New Template</h2>
        <div className="rounded-xl border border-border bg-surface p-5">
          <CreateTemplateForm />
        </div>
      </section>
    </div>
  );
}