import { Icon } from "./icons";

export function ProfileIdentity() {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
          <Icon name="sparkles" size={19} />
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-400">
            Identidad profesional
          </p>

          <h2 className="mt-2 font-display text-xl font-semibold">
            Un perfil que crece con tu carrera.
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Este perfil reúne experiencia, habilidades, formación y
            disponibilidad en un único lugar. El profesional puede mantenerlo
            actualizado y compartirlo cuando lo necesite.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {["Experiencia", "Habilidades", "Formación", "Idiomas", "Disponibilidad", "Movilidad"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-muted"
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CvSection() {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-400">
            Documento profesional
          </p>

          <h2 className="mt-2 font-display text-xl font-semibold">CV profesional</h2>

          <p className="mt-1 max-w-xl text-sm text-muted">
            El perfil VORA puede utilizarse como base para presentar la
            experiencia profesional en formato CV.
          </p>
        </div>

        <span className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm text-muted">
          <Icon name="external" size={15} />
          Disponible en VORA
        </span>
      </div>
    </section>
  );
}
