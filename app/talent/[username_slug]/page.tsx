import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { getPublicTalentProfile } from "@/db/queries/talentPublic";
import { publicProfileUrl } from "@/lib/url";

import ShareButton from "./share-button";

export const dynamic = "force-dynamic";

const AVAILABILITY_LABEL: Record<string, string> = {
  immediate: "Disponible de inmediato",
  "15_days": "Disponible en 15 días",
  "30_days": "Disponible en 30 días",
  employed: "Actualmente empleado",
  open: "Abierto a oportunidades",
};

const PROFICIENCY_LABEL: Record<string, string> = {
  native: "Nativo",
  professional: "Profesional",
  intermediate: "Intermedio",
  basic: "Básico",
};

function Icon({
  name,
  size = 20,
}: {
  name:
    | "share"
    | "download"
    | "message"
    | "briefcase"
    | "location"
    | "clock"
    | "external"
    | "check"
    | "phone"
    | "mail"
    | "chevron"
    | "calendar"
    | "globe"
    | "qr"
    | "shield"
    | "sparkles"
    | "building"
    | "arrow";
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "share":
      return (
        <svg {...common}>
          <circle cx="18" cy="5" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="19" r="2.5" />
          <path d="m8.3 10.8 7.4-4.6M8.3 13.2l7.4 4.6" />
        </svg>
      );

    case "download":
      return (
        <svg {...common}>
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M5 21h14" />
        </svg>
      );

    case "message":
      return (
        <svg {...common}>
          <path d="M4 5h16v11H8l-4 4V5Z" />
        </svg>
      );

    case "briefcase":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18M10 12v2h4v-2" />
        </svg>
      );

    case "location":
      return (
        <svg {...common}>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );

    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "external":
      return (
        <svg {...common}>
          <path d="M14 4h6v6" />
          <path d="M20 4 11 13" />
          <path d="M18 13v6H4V5h6" />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case "phone":
      return (
        <svg {...common}>
          <path d="M6.5 3.5 9 3l2 5-2 1.5c1 2.2 2.3 3.5 4.5 4.5L15 12l5 2 .5 2.5C19 19 17 20 15 20 9 19.5 4.5 15 4 9c0-2 .8-4 2.5-5.5Z" />
        </svg>
      );

    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );

    case "chevron":
      return (
        <svg {...common}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      );

    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </svg>
      );

    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.2 2.4 3.2 5.4 3.2 9s-1 6.6-3.2 9c-2.2-2.4-3.2-5.4-3.2-9S9.8 5.4 12 3Z" />
        </svg>
      );

    case "qr":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="6" height="6" />
          <rect x="15" y="3" width="6" height="6" />
          <rect x="3" y="15" width="6" height="6" />
          <path d="M15 15h3v3h-3zM18 18h3M15 21h3M21 15v3" />
        </svg>
      );

    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 20 6v5c0 5.2-3.3 8.6-8 10-4.7-1.4-8-4.8-8-10V6l8-3Z" />
          <path d="m8.5 12 2.3 2.3 4.7-5" />
        </svg>
      );

    case "sparkles":
      return (
        <svg {...common}>
          <path d="m12 3-1.2 4.8L6 9l4.8 1.2L12 15l1.2-4.8L18 9l-4.8-1.2L12 3Z" />
          <path d="m19 14-.7 2.8L15.5 18l2.8.7L19 21l.7-2.3 2.3-.7-2.3-.7L19 14Z" />
        </svg>
      );

    case "building":
      return (
        <svg {...common}>
          <path d="M4 21V5l8-2 8 2v16" />
          <path d="M8 8h1M15 8h1M8 12h1M15 12h1M8 16h1M15 16h1" />
          <path d="M10 21v-3h4v3" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h13" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    default:
      return null;
  }
}

function Section({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-7">
        <h2 className="font-display text-lg font-semibold tracking-tight">
          {title}
        </h2>

        {action}
      </div>

      <div className="p-5 sm:p-7">{children}</div>
    </section>
  );
}

function CoverPlaceholder() {
  return (
    <div className="relative h-44 overflow-hidden sm:h-56 lg:h-64">
      <div className="absolute inset-0 bg-gradient-to-br from-[#17111f] via-[#12141c] to-[#0b181b]" />

      <div className="absolute -left-20 -top-40 h-[450px] w-[450px] rounded-full bg-violet-500/[0.16] blur-[100px]" />
      <div className="absolute -right-20 top-0 h-[300px] w-[300px] rounded-full bg-cyan-500/[0.10] blur-[90px]" />

      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="absolute bottom-5 left-5 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30 sm:left-7">
        VORA TALENT
      </div>

      <div className="absolute bottom-5 right-5 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.2em] text-white/30">
        <Icon name="globe" size={12} />
        Professional Profile
      </div>
    </div>
  );
}

function ProfileAvatar({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl?: string | null;
}) {
  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={name}
        className="h-28 w-28 rounded-full object-cover ring-4 ring-surface sm:h-36 sm:w-36"
      />
    );
  }

  return (
    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/20 font-display text-3xl font-semibold ring-4 ring-surface sm:h-36 sm:w-36 sm:text-4xl">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function TimelineItem({
  position,
  company,
  start,
  end,
  description,
  current,
}: {
  position: string;
  company: string;
  start?: string | null;
  end?: string | null;
  description?: string | null;
  current?: boolean;
}) {
  return (
    <div className="relative pl-8">
      <span className="absolute left-[3px] top-1.5 h-2.5 w-2.5 rounded-full bg-violet-400 ring-4 ring-violet-400/10" />

      <div className="absolute left-[7px] top-4 h-[calc(100%+1.5rem)] w-px bg-border" />

      <div className="relative">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <h3 className="font-semibold">{position}</h3>
            <p className="mt-0.5 text-sm text-violet-300">{company}</p>
          </div>

          <span className="w-fit rounded-md bg-background px-2.5 py-1 text-[10px] text-muted">
            {start || "—"} — {end || "Actualidad"}
          </span>
        </div>

        {current && (
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Actualmente
          </span>
        )}

        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function SharedProfileNotice() {
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
              href="/company/register"
              className="glow-primary inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              <Icon name="building" size={16} />
              Registrar mi empresa gratis
              <Icon name="arrow" size={15} />
            </Link>

            <Link
              href="/company/login"
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

function ContactCard({
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username_slug: string }>;
}): Promise<Metadata> {
  const { username_slug } = await params;

  const profile = getPublicTalentProfile(username_slug);

  if (!profile) {
    return {
      title: "Perfil no disponible",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${profile.name} — ${
    profile.professional_title || "Profesional"
  } | VORA Talent`;

  const description =
    profile.summary ||
    `Perfil profesional de ${profile.name} en VORA Talent.`;

  const url = publicProfileUrl(profile.slug);

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "profile",
      images: profile.avatar_url
        ? [{ url: profile.avatar_url }]
        : undefined,
    },
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username_slug: string }>;
}) {
  const { username_slug } = await params;

  const profile = getPublicTalentProfile(username_slug);

  if (!profile) notFound();

  const location = [profile.city, profile.country]
    .filter(Boolean)
    .join(", ");

  const availability =
    AVAILABILITY_LABEL[profile.availability] ??
    profile.availability ??
    "Abierto a oportunidades";

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* TOP NAV */}

      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/talent">
            <div className="brand-mark text-sm">
              VOR<span>A</span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/talent"
              className="hidden rounded-lg px-3 py-2 text-xs text-muted hover:bg-surface hover:text-foreground sm:block"
            >
              VORA Talent
            </Link>

            <ShareButton
              name={profile.name}
              url={publicProfileUrl(profile.slug)}
            />
          </div>
        </div>
      </header>

      {/* PROFILE */}

      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden border-x border-b border-border bg-surface lg:rounded-b-3xl">
          <CoverPlaceholder />

          <section className="relative px-5 pb-6 sm:px-7 sm:pb-7 lg:px-10">
            <div className="-mt-14 flex flex-col items-center sm:-mt-16 sm:flex-row sm:items-end sm:gap-5">
              <ProfileAvatar
                name={profile.name}
                avatarUrl={profile.avatar_url}
              />

              <div className="mt-4 min-w-0 flex-1 text-center sm:mb-2 sm:mt-0 sm:text-left">
                <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {profile.name}
                </h1>

                {profile.professional_title && (
                  <p className="mt-1 text-base font-medium text-violet-300 sm:text-lg">
                    {profile.professional_title}
                  </p>
                )}

                <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted sm:justify-start">
                  {location && (
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="location" size={13} />
                      {location}
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="globe" size={13} />
                    VORA Talent
                  </span>
                </div>
              </div>

              <div className="mt-5 flex w-full flex-col gap-2 sm:mb-2 sm:mt-0 sm:w-auto sm:flex-row">
                <Link
                  href="/company/register"
                  className="glow-primary inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  <Icon name="building" size={16} />
                  Soy una empresa
                </Link>

                <ShareButton
                  name={profile.name}
                  url={publicProfileUrl(profile.slug)}
                />
              </div>
            </div>

            {/* STATUS */}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 border-t border-border pt-5 sm:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {availability}
              </span>

              {profile.relocation_available && (
                <span className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted">
                  Disponible para reubicarse
                </span>
              )}

              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/15 bg-violet-500/[0.06] px-3 py-1.5 text-xs text-violet-300">
                <Icon name="shield" size={12} />
                Perfil VORA
              </span>
            </div>
          </section>

          {/* NAVIGATION */}

          <nav className="flex overflow-x-auto border-t border-border px-4 sm:px-7 lg:px-10">
            {[
              ["Perfil", "#about"],
              ["Experiencia", "#experience"],
              ["Habilidades", "#skills"],
              ["Educación", "#education"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="whitespace-nowrap border-b-2 border-transparent px-4 py-3 text-xs font-medium text-muted transition-colors hover:border-violet-400 hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* MAIN */}

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-0">
        <div className="min-w-0 space-y-6">
          {/* SHARED PROFILE MESSAGE */}

          <SharedProfileNotice />

          {/* ABOUT */}

          {profile.summary && (
            <div id="about">
              <Section title="Perfil profesional">
                <p className="whitespace-pre-line text-sm leading-7 text-muted sm:text-base">
                  {profile.summary}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {location && (
                    <div className="rounded-xl border border-border bg-background p-4">
                      <Icon name="location" size={17} />

                      <p className="mt-3 text-[10px] uppercase tracking-wide text-muted-2">
                        Ubicación
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {location}
                      </p>
                    </div>
                  )}

                  <div className="rounded-xl border border-border bg-background p-4">
                    <Icon name="clock" size={17} />

                    <p className="mt-3 text-[10px] uppercase tracking-wide text-muted-2">
                      Disponibilidad
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {availability}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-background p-4">
                    <Icon name="globe" size={17} />

                    <p className="mt-3 text-[10px] uppercase tracking-wide text-muted-2">
                      Movilidad internacional
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {profile.relocation_available
                        ? "Disponible"
                        : "No indicada"}
                    </p>
                  </div>
                </div>
              </Section>
            </div>
          )}

          {/* EXPERIENCE */}

          {profile.experience.length > 0 && (
            <div id="experience">
              <Section
                title="Experiencia profesional"
                action={
                  <span className="text-xs text-muted">
                    {profile.experience.length}{" "}
                    {profile.experience.length === 1
                      ? "experiencia"
                      : "experiencias"}
                  </span>
                }
              >
                <div className="space-y-8">
                  {profile.experience.map((e, i) => (
                    <TimelineItem
                      key={i}
                      position={e.position}
                      company={e.company}
                      start={e.start_date}
                      end={e.end_date}
                      description={e.description}
                      current={!e.end_date}
                    />
                  ))}
                </div>
              </Section>
            </div>
          )}

          {/* SKILLS */}

          {profile.skills.length > 0 && (
            <div id="skills">
              <Section title="Habilidades y especialidades">
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {/* EDUCATION */}

          {profile.education.length > 0 && (
            <div id="education">
              <Section title="Educación y formación">
                <div className="space-y-5">
                  {profile.education.map((education, i) => (
                    <div
                      key={i}
                      className="flex gap-4 border-b border-border pb-5 last:border-0 last:pb-0"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                        <Icon name="briefcase" size={17} />
                      </div>

                      <div>
                        <p className="font-medium">
                          {education.institution}
                        </p>

                        {education.qualification && (
                          <p className="mt-1 text-sm text-muted">
                            {education.qualification}
                          </p>
                        )}

                        {education.field && (
                          <p className="mt-1 text-xs text-muted-2">
                            {education.field}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {/* LANGUAGES */}

          {profile.languages.length > 0 && (
            <Section title="Idiomas">
              <div className="grid gap-3 sm:grid-cols-2">
                {profile.languages.map((language, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-border bg-background p-4"
                  >
                    <span className="text-sm font-medium">
                      {language.language}
                    </span>

                    <span className="text-xs text-muted">
                      {PROFICIENCY_LABEL[language.proficiency] ??
                        language.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* PROFESSIONAL IDENTITY */}

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
                  disponibilidad en un único lugar. El profesional puede
                  mantenerlo actualizado y compartirlo cuando lo necesite.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "Experiencia",
                    "Habilidades",
                    "Formación",
                    "Idiomas",
                    "Disponibilidad",
                    "Movilidad",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CV */}

          <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-400">
                  Documento profesional
                </p>

                <h2 className="mt-2 font-display text-xl font-semibold">
                  CV profesional
                </h2>

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
        </div>

        {/* SIDEBAR */}

        <aside className="space-y-5">
          <ContactCard
            name={profile.name}
            title={profile.professional_title}
            phone={profile.phone}
          />

          {/* PROFESSIONAL INFORMATION */}

          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-2">
              Información profesional
            </p>

            <div className="mt-5 space-y-4">
              {profile.professional_title && (
                <div className="flex gap-3">
                  <div className="mt-0.5 text-muted">
                    <Icon name="briefcase" size={16} />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-muted-2">
                      Especialidad
                    </p>

                    <p className="mt-1 text-sm">
                      {profile.professional_title}
                    </p>
                  </div>
                </div>
              )}

              {location && (
                <div className="flex gap-3">
                  <div className="mt-0.5 text-muted">
                    <Icon name="location" size={16} />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-muted-2">
                      Ubicación
                    </p>

                    <p className="mt-1 text-sm">{location}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <div className="mt-0.5 text-muted">
                  <Icon name="clock" size={16} />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-2">
                    Disponibilidad
                  </p>

                  <p className="mt-1 text-sm">{availability}</p>
                </div>
              </div>

              {profile.relocation_available && (
                <div className="flex gap-3">
                  <div className="mt-0.5 text-muted">
                    <Icon name="globe" size={16} />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-muted-2">
                      Movilidad
                    </p>

                    <p className="mt-1 text-sm">
                      Abierto a oportunidades fuera de su ubicación actual
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CONTROL */}

          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300">
                <Icon name="shield" size={17} />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Vos controlás lo que compartís.
                </p>

                <p className="mt-2 text-xs leading-5 text-muted">
                  El profesional decide qué información forma parte de su
                  perfil y qué datos de contacto quiere publicar.
                </p>
              </div>
            </div>
          </div>

          {/* QR */}

          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background text-muted">
                <Icon name="qr" size={17} />
              </div>

              <div>
                <p className="text-sm font-semibold">Perfil QR</p>

                <p className="text-[10px] text-muted">
                  Compartí tu perfil VORA
                </p>
              </div>
            </div>

            <div className="mx-auto mt-5 h-32 w-32 overflow-hidden rounded bg-white p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/talent/${profile.slug}/qr.png`}
                alt={`Código QR de ${profile.name}`}
                className="h-full w-full object-contain"
              />
            </div>

            <a
              href={`/talent/${profile.slug}/qr.png`}
              download
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-xs font-medium hover:border-violet-400/30"
            >
              <Icon name="download" size={14} />
              Descargar QR
            </a>
          </div>
        </aside>
      </div>

      {/* MOBILE CTA */}

      <div className="sticky bottom-0 z-30 border-t border-border bg-background/90 p-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-6xl gap-2">
          <Link
            href="/company/register"
            className="glow-primary flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
          >
            <Icon name="building" size={16} />
            Ver perfil como empresa
          </Link>

          <ShareButton
            name={profile.name}
            url={publicProfileUrl(profile.slug)}
          />
        </div>
      </div>

      {/* FOOTER */}

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <div className="brand-mark text-sm">
              VOR<span>A</span>
            </div>

            <p className="mt-1 text-[10px] text-muted-2">
              Talent especializado en gastronomía y hospitalidad.
            </p>
          </div>

          <div className="flex justify-center gap-5 text-[10px] text-muted sm:justify-end">
            <Link href="/talent" className="hover:text-foreground">
              VORA Talent
            </Link>

            <Link href="/privacy" className="hover:text-foreground">
              Privacidad
            </Link>

            <Link href="/terms" className="hover:text-foreground">
              Términos
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}