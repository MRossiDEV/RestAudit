import Link from "next/link";
import type { PublicProfilePreview } from "@/db/queries/talentPublic";
import { publicProfileUrl } from "@/lib/url";
import ShareButton from "./share-button";

const AVAILABILITY_LABEL: Record<string, string> = {
  immediate: "Disponible de inmediato",
  "15_days": "Disponible en 15 días",
  "30_days": "Disponible en 30 días",
  employed: "Actualmente empleado",
  open: "Abierto a oportunidades",
};

/**
 * The registration gate (PRD §4, §13, §43). Shown to visitors who are not
 * registered businesses. The candidate already chose to share this profile —
 * the business only needs a FREE VORA account. This is deliberately not a paywall.
 */
export default function GatedProfile({ preview }: { preview: PublicProfilePreview }) {
  const location = [preview.city, preview.country].filter(Boolean).join(", ");
  const availability =
    AVAILABILITY_LABEL[preview.availability] ?? preview.availability ?? "Abierto a oportunidades";
  const returnTo = `/talent/${preview.slug}`;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/talent">
            <div className="brand-mark text-sm">
              VOR<span>A</span>
            </div>
          </Link>
          <ShareButton name={preview.name} url={publicProfileUrl(preview.slug)} />
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-400">
          Este perfil fue compartido con vos
        </p>

        {/* Preview card */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-surface">
          <div className="flex items-center gap-4 border-b border-border p-5">
            {preview.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview.avatar_url}
                alt={preview.name}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-violet-400/20"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/20 font-display text-xl font-semibold">
                {preview.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <h1 className="truncate font-display text-xl font-semibold">{preview.name}</h1>
              {preview.professional_title && (
                <p className="truncate text-sm text-violet-300">{preview.professional_title}</p>
              )}
              {location && <p className="mt-0.5 text-xs text-muted">{location}</p>}
            </div>
          </div>

          <div className="space-y-4 p-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {availability}
            </span>

            {preview.summary && (
              <p className="text-sm leading-6 text-muted">{preview.summary}…</p>
            )}

            {preview.skill_names.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {preview.skill_names.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border bg-background px-2 py-1 text-[11px] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Gate */}
        <section className="mt-6 rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/[0.08] via-surface to-cyan-500/[0.04] p-6 text-center sm:p-8">
          <h2 className="font-display text-2xl font-semibold">
            {preview.name.split(" ")[0]} está compartiendo su perfil profesional con vos.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
            Para proteger nuestra red profesional y garantizar que quienes acceden
            a los perfiles sean empresas reales, necesitás una cuenta VORA gratuita.
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link
              href={`/register?role=company?returnTo=${encodeURIComponent(returnTo)}`}
              className="glow-primary inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Crear cuenta gratis
            </Link>
            <Link
              href={`/login?returnTo=${encodeURIComponent(returnTo)}`}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-medium hover:border-violet-400/30"
            >
              Ya tengo una cuenta
            </Link>
          </div>

          <p className="mt-4 text-[11px] text-muted-2">
            Sin costo. No se requiere tarjeta.
          </p>
        </section>
      </div>
    </main>
  );
}
