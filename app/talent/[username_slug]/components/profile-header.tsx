import Link from "next/link";
import type { PublicTalentProfile } from "@/types/domain";
import { AVAILABILITY_LABEL } from "./labels";
import { publicProfileUrl } from "@/lib/url";
import { Icon } from "./icons";
import { CoverPlaceholder } from "./cover-placeholder";
import { ProfileAvatar } from "./profile-avatar";
import ShareButton from "../share-button";

export function ProfileHeader({ profile }: { profile: PublicTalentProfile }) {
  const location = [profile.city, profile.country].filter(Boolean).join(", ");
  const availability =
    AVAILABILITY_LABEL[profile.availability] ??
    profile.availability ??
    "Abierto a oportunidades";

  return (
    <div className="overflow-hidden border-x border-b border-border bg-surface lg:rounded-b-3xl">
      <CoverPlaceholder />

      <section className="relative px-5 pb-6 sm:px-7 sm:pb-7 lg:px-10">
        <div className="-mt-14 flex flex-col items-center sm:-mt-16 sm:flex-row sm:items-end sm:gap-5">
          <ProfileAvatar name={profile.name} avatarUrl={profile.avatar_url} />

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
              href="/register?role=company"
              className="glow-primary inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              <Icon name="building" size={16} />
              Soy una empresa
            </Link>

            <ShareButton name={profile.name} url={publicProfileUrl(profile.slug)} />
          </div>
        </div>

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
  );
}
