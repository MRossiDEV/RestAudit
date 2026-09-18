import type { PublicTalentProfile } from "@/types/domain";
import { AVAILABILITY_LABEL } from "./labels";
import { Icon } from "./icons";
import { ContactCard } from "./contact-card";

export function ProfileSidebar({ profile }: { profile: PublicTalentProfile }) {
  const location = [profile.city, profile.country].filter(Boolean).join(", ");
  const availability =
    AVAILABILITY_LABEL[profile.availability] ??
    profile.availability ??
    "Abierto a oportunidades";

  return (
    <aside className="space-y-5">
      <ContactCard
        name={profile.name}
        title={profile.professional_title}
        phone={profile.phone}
      />

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
                <p className="mt-1 text-sm">{profile.professional_title}</p>
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

      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300">
            <Icon name="shield" size={17} />
          </div>
          <div>
            <p className="text-sm font-semibold">Vos controlás lo que compartís.</p>
            <p className="mt-2 text-xs leading-5 text-muted">
              El profesional decide qué información forma parte de su perfil y qué
              datos de contacto quiere publicar.
            </p>
          </div>
        </div>
      </div>

      <QrCard profile={profile} />
    </aside>
  );
}

function QrCard({ profile }: { profile: PublicTalentProfile }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background text-muted">
          <Icon name="qr" size={17} />
        </div>
        <div>
          <p className="text-sm font-semibold">Perfil QR</p>
          <p className="text-[10px] text-muted">Compartí tu perfil VORA</p>
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
  );
}
