import { Icon } from "./icons";

export function ContactCard({
  name,
  title,
  phone,
}: {
  name: string;
  title?: string | null;
  phone?: string | null;
}) {
  return (
    <div className="sticky top-20 rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.08] to-cyan-500/[0.03] p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">
        ¿Te interesa este profesional?
      </p>

      <h2 className="mt-3 font-display text-xl font-semibold">
        Conecta con {name.split(" ")[0]}.
      </h2>

      <p className="mt-2 text-sm leading-6 text-muted">
        {title
          ? `Conversá sobre oportunidades como ${title}.`
          : "Conocé sus opciones de disponibilidad y contacto."}
      </p>

      {phone ? (
        <a
          href={`tel:${phone}`}
          className="glow-primary mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          <Icon name="phone" size={17} />
          Contactar
        </a>
      ) : (
        <div className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 text-sm text-muted">
          <Icon name="message" size={17} />
          Contacto no publicado
        </div>
      )}

      <p className="mt-3 text-center text-[10px] leading-4 text-muted-2">
        El profesional controla qué información comparte en VORA.
      </p>
    </div>
  );
}
