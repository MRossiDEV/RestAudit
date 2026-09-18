import Link from "next/link";
import { requireBusiness } from "@/lib/business";
import { getTalentProfile, listTalentProfiles } from "@/db/queries/talent";
import { isTalentSaved, recordProfileAccess } from "@/db/queries/business";
import { matchTalent } from "@/lib/matching";
import type { TalentSearchRequirements } from "@/types/domain";
import SaveButton from "./save-button";

export const dynamic = "force-dynamic";

function str(v: string | string[] | undefined): string {
  return Array.isArray(v) ? (v[0] ?? "") : (v ?? "");
}

export default async function TalentSearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const business = await requireBusiness();
  const sp = await searchParams;

  const position = str(sp.position);
  const city = str(sp.city);
  const country = str(sp.country);
  const skills = str(sp.skills);
  const minExp = Number(str(sp.min_experience) || 0) || undefined;
  const availability = str(sp.availability);
  const languages = str(sp.languages);

  const requirements: TalentSearchRequirements = {
    position: position || undefined,
    city: city || undefined,
    country: country || undefined,
    skills: skills ? skills.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
    min_experience: minExp,
    availability: availability ? [availability as never] : undefined,
    languages: languages ? languages.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
  };

  const hasQuery = Boolean(position || city || country || skills || availability || languages || minExp);

  const candidates = listTalentProfiles({});
  const results = candidates
    .map((c) => {
      const full = getTalentProfile(c.id) ?? null;
      const { score, factors } = matchTalent(c, full, requirements);
      return { c, full, score, factors };
    })
    .filter((r) => (hasQuery ? r.score >= 40 : true))
    .sort((a, b) => b.score - a.score)
    .slice(0, 50);

  // Log discovery-context access for each surfaced result (PRD §39).
  for (const r of results) {
    recordProfileAccess({
      talentProfileId: r.c.id,
      businessId: business.id,
      accessContext: "search",
    });
  }

  return (
    <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-2xl font-semibold tracking-tight">Buscar talento</h1>
        <p className="mt-1 text-sm text-muted">
          Descubrí profesionales de hospitalidad en la red VORA.
        </p>

        {/* Filters */}
        <form method="GET" className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-3 lg:grid-cols-6">
          <input name="position" defaultValue={position} placeholder="Puesto" className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          <input name="city" defaultValue={city} placeholder="Ciudad" className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          <input name="country" defaultValue={country} placeholder="País" className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          <input name="skills" defaultValue={skills} placeholder="Habilidades" className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          <input name="languages" defaultValue={languages} placeholder="Idiomas" className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          <input name="min_experience" defaultValue={minExp ?? ""} placeholder="Años exp." type="number" min={0} className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          <div className="col-span-2 sm:col-span-3 lg:col-span-6">
            <button type="submit" className="glow-primary w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 sm:w-auto sm:px-8">
              Buscar
            </button>
          </div>
        </form>

        {/* Results */}
        <div className="mt-8 space-y-3">
          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center">
              <p className="text-sm text-muted">No se encontraron profesionales con esos criterios.</p>
            </div>
          ) : (
            results.map(({ c, score, factors }) => (
              <div key={c.id} className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4">
                {c.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.avatar_url} alt="" className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/20 font-semibold">
                    {c.first_name.charAt(0)}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{c.first_name} {c.last_name}</p>
                    {hasQuery && (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-300">
                        {score}% match
                      </span>
                    )}
                  </div>
                  <p className="truncate text-sm text-muted">{c.professional_title}</p>
                  <p className="text-xs text-muted-2">
                    {[c.location, c.country].filter(Boolean).join(", ")}
                    {c.years_experience > 0 && ` · ${c.years_experience} años`}
                  </p>
                  {hasQuery && (
                    <p className="mt-1 text-[10px] text-muted-2">
                      puesto {factors.position} · habilidades {factors.skills} · exp {factors.experience} · ubicación {factors.location}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <SaveButton talentId={c.id} saved={isTalentSaved(business.id, c.id)} />
                  <Link
                    href={c.slug ? `/talent/${c.slug}` : "#"}
                    className="inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
                  >
                    Ver
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
    </div>
  );
}
