
import Link from "next/link";
import { listPublicTalentProfiles } from "@/db/queries/talentPublic";

export const dynamic = "force-dynamic";

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h9M8.5 3.5 13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8.5" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="m12.5 12.5 4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4.5 17c.7-3.1 2.5-4.7 5.5-4.7s4.8 1.6 5.5 4.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProfilePreview({
  profile,
}: {
  profile: NonNullable<ReturnType<typeof listPublicTalentProfiles>[number]>;
}) {
  const initials = profile.name
    ? profile.name
        .split(" ")
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("")
    : "V";

  const location = [profile.city, profile.country]
    .filter(Boolean)
    .join(", ");

  const topSkills = profile.skills.slice(0, 3);

  return (
    <div className="relative">
      <div className="absolute -inset-10 rounded-full bg-violet-500/[0.08] blur-[80px]" />

      <div className="relative rounded-3xl border border-white/[0.10] bg-[#101014] p-5 shadow-2xl shadow-black/40 sm:p-6">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
          <div className="brand-mark text-xs">
            VOR<span>A</span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">
            Talent
          </span>
        </div>

        <div className="flex items-center gap-4 py-5">
          {profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/20 font-semibold text-white">
              {initials}
            </div>
          )}

          <div>
            <p className="font-semibold text-white">{profile.name}</p>
            <p className="mt-0.5 text-xs text-violet-300">
              {profile.professional_title || "Profesional"}
            </p>
            {location && (
              <p className="mt-1 text-[10px] text-white/35">{location}</p>
            )}
          </div>
        </div>

        {profile.summary && (
          <p className="text-xs leading-5 text-white/50">{profile.summary}</p>
        )}

        {profile.experience.length > 0 && (
          <div className="mt-5 border-t border-white/[0.07] pt-5">
            <p className="text-[9px] uppercase tracking-[0.18em] text-white/30">
              Experiencia
            </p>

            {profile.experience.slice(0, 2).map((exp, i) => (
              <div key={i} className="mt-3">
                <p className="text-xs font-medium text-white/80">
                  {exp.company}
                </p>
                <p className="mt-1 text-[10px] text-white/40">
                  {exp.position} · {exp.start_date || "—"} —{" "}
                  {exp.end_date || "Actualidad"}
                </p>
              </div>
            ))}
          </div>
        )}

        {topSkills.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {topSkills.map((skill) => (
              <span
                key={skill.name}
                className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[9px] text-white/45"
              >
                {skill.name}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/talent/${profile.slug}`}
          className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 transition-colors hover:border-violet-400/30"
        >
          <div>
            <p className="text-[9px] uppercase tracking-[0.15em] text-white/25">
              Perfil público
            </p>
            <p className="mt-1 text-[10px] text-violet-300/70">
              vora.com/talent/{profile.slug}
            </p>
          </div>

          <div className="h-11 w-11 overflow-hidden rounded bg-white p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/talent/${profile.slug}/qr.png`}
              alt={`Código QR de ${profile.name}`}
              className="h-full w-full object-contain"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function TalentLanding() {
  const profiles = listPublicTalentProfiles();
  const visibleProfiles = profiles.slice(0, 6);
  const featuredProfile = profiles[0] ?? null;

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* HEADER */}
      <header className="border-b border-border/50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
          <Link href="/talent">
            <div className="brand-mark text-sm">
              VOR<span>A</span>
            </div>
          </Link>

          <Link
            href="/talent/login"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Iniciar sesión
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-0 h-[450px] w-[600px] rounded-full bg-violet-500/[0.07] blur-[120px]" />
          <div className="absolute right-0 top-80 h-[300px] w-[300px] rounded-full bg-cyan-500/[0.04] blur-[100px]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-400">
              VORA TALENT
            </p>

            <h1 className="mt-5 font-display text-[2.9rem] font-semibold leading-[1.03] tracking-[-0.04em] sm:text-6xl">
              Talento gastronómico.
              <br />
              <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
                Conectado.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Una plataforma especializada en profesionales de restaurantes,
              hoteles, bares, cafeterías y servicios gastronómicos.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/talent/register"
                className="glow-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
              >
                Crear mi perfil
                <ArrowIcon />
              </Link>

              <Link
                href="/talent/register/restaurant"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border px-7 text-sm font-semibold transition-colors hover:border-primary/30"
              >
                Buscar talento
                <SearchIcon />
              </Link>
            </div>
          </div>

          {featuredProfile ? (
            <ProfilePreview profile={featuredProfile} />
          ) : (
            <div className="relative flex min-h-[400px] items-center justify-center rounded-3xl border border-dashed border-border bg-surface/30 p-10 text-center">
              <div>
                <p className="font-display text-xl font-semibold">
                  Sé el primer talento en aparecer aquí
                </p>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted">
                  Crea tu perfil profesional y comparte tu experiencia con los
                  restaurantes que buscan talento.
                </p>
                <Link
                  href="/talent/register"
                  className="glow-primary mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  Crear mi perfil
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 50 / 50 AUDIENCES */}
      <section className="border-y border-border/60">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          {/* PROFESSIONAL */}
          <div className="border-b border-border/60 p-7 sm:p-10 md:border-b-0 md:border-r md:p-12 lg:p-14">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
              <ProfileIcon />
            </div>

            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">
              Para profesionales
            </p>

            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Presenta tu experiencia. Hazte visible.
            </h2>

            <p className="mt-4 text-sm leading-6 text-muted">
              Crea tu perfil profesional gastronómico, reúne tu experiencia y
              habilidades en un solo lugar y compártelo directamente con
              empleadores.
            </p>

            <div className="mt-6 space-y-3 text-sm text-foreground">
              <div className="flex items-center gap-2">
                <span className="text-violet-400">✓</span>
                Perfil profesional público
              </div>

              <div className="flex items-center gap-2">
                <span className="text-violet-400">✓</span>
                CV generado desde tu perfil
              </div>

              <div className="flex items-center gap-2">
                <span className="text-violet-400">✓</span>
                Enlace y QR para compartir
              </div>
            </div>

            <Link
              href="/talent/register"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 transition-colors hover:text-violet-200"
            >
              Crear mi perfil
              <ArrowIcon />
            </Link>
          </div>

          {/* EMPLOYER */}
          <div className="p-7 sm:p-10 md:p-12 lg:p-14">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
              <SearchIcon />
            </div>

            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Para restaurantes y empresas
            </p>

            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Encuentra personas que conocen tu industria.
            </h2>

            <p className="mt-4 text-sm leading-6 text-muted">
              Busca profesionales especializados en gastronomía y
              hospitalidad, conoce su experiencia y conecta con el talento que
              necesitas.
            </p>

            <div className="mt-6 space-y-3 text-sm text-foreground">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">✓</span>
                Talento especializado en food & hospitality
              </div>

              <div className="flex items-center gap-2">
                <span className="text-cyan-400">✓</span>
                Perfiles profesionales públicos
              </div>

              <div className="flex items-center gap-2">
                <span className="text-cyan-400">✓</span>
                Encuentra por experiencia y especialidad
              </div>
            </div>

            <Link
              href="/talent/register/restaurant"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
            >
              Buscar talento
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY SPECIALIZED */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">
            ¿Por qué VORA Talent?
          </p>

          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            No somos una agencia de talento general.
          </h2>

          <p className="mt-5 text-base leading-7 text-muted">
            VORA Talent está construido alrededor de una industria específica:
            gastronomía y hospitalidad. Eso permite que profesionales y
            empleadores hablen el mismo idioma.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <p className="text-xs font-mono text-violet-400">01</p>
            <h3 className="mt-4 font-display text-xl font-semibold">
              Una industria
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Enfocada exclusivamente en food & hospitality.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <p className="text-xs font-mono text-violet-400">02</p>
            <h3 className="mt-4 font-display text-xl font-semibold">
              Experiencia relevante
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Perfiles organizados alrededor de roles y habilidades que
              realmente importan en el sector.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <p className="text-xs font-mono text-violet-400">03</p>
            <h3 className="mt-4 font-display text-xl font-semibold">
              Conexión directa
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Menos ruido. Más posibilidades de encontrar a la persona
              adecuada para el puesto adecuado.
            </p>
          </div>
        </div>
      </section>

      {/* PUBLIC PROFILES */}
      {visibleProfiles.length > 0 && (
        <section className="border-y border-border/60 bg-surface/[0.3]">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">
                  VORA Talent
                </p>

                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">
                  Profesionales de la industria.
                </h2>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProfiles.map((profile) => (
                <Link
                  key={profile.slug}
                  href={`/talent/${profile.slug}`}
                  className="group rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:border-violet-400/25"
                >
                  <div className="flex items-center gap-4">
                    {profile.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={profile.avatar_url}
                        alt={profile.name}
                        className="h-13 w-13 rounded-full object-cover ring-1 ring-white/10"
                      />
                    ) : (
                      <div className="flex h-13 w-13 items-center justify-center rounded-full bg-surface-2 font-display text-lg font-semibold text-muted">
                        {profile.name?.charAt(0)?.toUpperCase() || "V"}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate font-semibold group-hover:text-violet-300">
                        {profile.name}
                      </p>

                      <p className="mt-0.5 truncate text-sm text-violet-300/80">
                        {profile.professional_title || "Profesional"}
                      </p>

                      <p className="mt-1 truncate text-xs text-muted-2">
                        {[profile.city, profile.country]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-border/70 pt-4 text-xs text-muted">
                    Ver perfil →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[350px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.07] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-6 sm:py-28">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Tu próxima oportunidad puede empezar aquí.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted sm:text-base">
            Crea tu perfil si buscas oportunidades. Busca talento si estás
            contratando.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/talent/register"
              className="glow-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Soy profesional
              <ArrowIcon />
            </Link>

            <Link
              href="/talent/register/restaurant"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border px-7 text-sm font-semibold hover:border-primary/30"
            >
              Busco talento
              <SearchIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <div className="brand-mark text-sm">
              VOR<span>A</span>
            </div>

            <p className="mt-1.5 text-[10px] text-muted-2">
              Talent especializado en gastronomía y hospitalidad.
            </p>
          </div>

          <div className="flex gap-5 text-xs text-muted">
            <Link
              href="/talent/login"
              className="hover:text-foreground"
            >
              Iniciar sesión
            </Link>

            <Link
              href="/privacy"
              className="hover:text-foreground"
            >
              Privacidad
            </Link>

            <Link
              href="/terms"
              className="hover:text-foreground"
            >
              Términos
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}