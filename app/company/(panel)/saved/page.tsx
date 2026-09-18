import Link from "next/link";
import { requireBusiness } from "@/lib/business";
import { listSavedTalent } from "@/db/queries/business";
import { getTalentProfile } from "@/db/queries/talent";
import SaveButton from "../talent/save-button";

export const dynamic = "force-dynamic";

export default async function SavedTalentPage() {
  const business = await requireBusiness();
  const saved = listSavedTalent(business.id)
    .map((s) => ({ saved: s, talent: getTalentProfile(s.talent_profile_id) }))
    .filter((x) => x.talent);

  return (
    <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-2xl font-semibold tracking-tight">Talento guardado</h1>
        <p className="mt-1 text-sm text-muted">Profesionales que guardaste para futuras oportunidades.</p>

        <div className="mt-8 space-y-3">
          {saved.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center">
              <p className="text-sm text-muted">Todavía no guardaste ningún profesional.</p>
              <Link href="/company/talent" className="glow-primary mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground">
                Buscar talento
              </Link>
            </div>
          ) : (
            saved.map(({ saved: s, talent: t }) => (
              <div key={s.id} className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{t!.first_name} {t!.last_name}</p>
                  <p className="truncate text-sm text-muted">{t!.professional_title}</p>
                  <p className="text-xs text-muted-2">
                    {[t!.location, t!.country].filter(Boolean).join(", ")} · {s.status}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <SaveButton talentId={t!.id} saved />
                  {t!.slug && (
                    <Link href={`/talent/${t!.slug}`} className="inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
                      Ver
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
    </div>
  );
}
