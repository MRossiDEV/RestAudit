import Link from "next/link";
import { requireBusiness } from "@/lib/business";
import {
  listSavedTalent,
  listTalentSearches,
  listMatchesForSearch,
} from "@/db/queries/business";
import { getTalentProfile } from "@/db/queries/talent";

export const dynamic = "force-dynamic";

function Card({
  title,
  count,
  href,
  sub,
}: {
  title: string;
  count: number;
  href: string;
  sub?: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-violet-400/30"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-2">
        {title}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{count}</p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </Link>
  );
}

export default async function CompanyDashboard() {
  const business = await requireBusiness();

  const searches = listTalentSearches(business.id);
  const saved = listSavedTalent(business.id);

  const newMatches = searches
    .flatMap((s) => listMatchesForSearch(s.id))
    .filter((m) => m.score >= 80)
    .slice(0, 6)
    .map((m) => ({ match: m, talent: getTalentProfile(m.talent_profile_id) }))
    .filter((x) => x.talent);

  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            {business.business_name}
          </h1>
          <p className="mt-1 text-sm text-muted">
            Tu panel de talento en VORA.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card title="Búsquedas activas" count={searches.length} href="/company/searches" sub="requisitos de contratación" />
          <Card title="Talento guardado" count={saved.length} href="/company/saved" sub="profesionales" />
          <Card title="Coincidencias" count={newMatches.length} href="/company/talent" sub="80%+ match" />
          <Card title="Perfil" count={0} href="/company/profile" sub="editar empresa" />
        </div>

        {/* New matches */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Coincidencias recientes</h2>
            <Link href="/company/talent" className="text-sm text-primary hover:underline">
              Explorar talento
            </Link>
          </div>

          {newMatches.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-border p-10 text-center">
              <p className="text-sm text-muted">
                Todavía no hay coincidencias. Creá una búsqueda para descubrir talento.
              </p>
              <Link
                href="/company/talent"
                className="glow-primary mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
              >
                Buscar talento
              </Link>
            </div>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {newMatches.map(({ match, talent }) => (
                <Link
                  key={match.id}
                  href={`/talent/${talent!.slug ?? ""}`}
                  className="rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-violet-400/30"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      {talent!.first_name} {talent!.last_name}
                    </p>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-300">
                      {match.score}%
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{talent!.professional_title}</p>
                  <p className="mt-1 text-xs text-muted-2">
                    {[talent!.location, talent!.country].filter(Boolean).join(", ")}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
