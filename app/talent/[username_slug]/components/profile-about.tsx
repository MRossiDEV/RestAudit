import type { PublicTalentProfile } from "@/types/domain";
import { AVAILABILITY_LABEL } from "./labels";
import { Icon } from "./icons";
import { Section } from "./section";

export function ProfileAbout({ profile }: { profile: PublicTalentProfile }) {
  if (!profile.summary) return null;

  const location = [profile.city, profile.country].filter(Boolean).join(", ");
  const availability =
    AVAILABILITY_LABEL[profile.availability] ??
    profile.availability ??
    "Abierto a oportunidades";

  return (
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
              <p className="mt-1 text-sm font-medium">{location}</p>
            </div>
          )}

          <div className="rounded-xl border border-border bg-background p-4">
            <Icon name="clock" size={17} />
            <p className="mt-3 text-[10px] uppercase tracking-wide text-muted-2">
              Disponibilidad
            </p>
            <p className="mt-1 text-sm font-medium">{availability}</p>
          </div>

          <div className="rounded-xl border border-border bg-background p-4">
            <Icon name="globe" size={17} />
            <p className="mt-3 text-[10px] uppercase tracking-wide text-muted-2">
              Movilidad internacional
            </p>
            <p className="mt-1 text-sm font-medium">
              {profile.relocation_available ? "Disponible" : "No indicada"}
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
