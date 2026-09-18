import Link from "next/link";
import { Icon } from "./icons";

export function SharedProfileNotice() {
  return (
    <section className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.09] via-surface to-cyan-500/[0.04] p-5 sm:p-7">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
          <Icon name="share" size={20} />
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">
            Perfil compartido por el profesional
          </p>

          <h2 className="mt-2 font-display text-xl font-semibold">
            Este perfil fue compartido directamente con vos.
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Registrate gratis como empresa en VORA para acceder al perfil
            profesional completo y conocer las opciones de contacto que el
            profesional decidió compartir.
          </p>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/register?role=company"
              className="glow-primary inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              <Icon name="building" size={16} />
              Registrar mi empresa gratis
              <Icon name="arrow" size={15} />
            </Link>

            <Link
              href="/login"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-background px-5 text-sm font-medium hover:border-violet-400/30"
            >
              Ya tengo una cuenta
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
