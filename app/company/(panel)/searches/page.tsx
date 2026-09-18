import Link from "next/link";
import { requireBusiness } from "@/lib/business";
import { listTalentSearches, listMatchesForSearch } from "@/db/queries/business";

export const dynamic = "force-dynamic";

export default async function SearchesPage() {
  const business = await requireBusiness();
  const searches = listTalentSearches(business.id).map((s) => ({
    search: s,
    matches: listMatchesForSearch(s.id),
  }));

  return (
    <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-2xl font-semibold tracking-tight">Búsquedas de talento</h1>
        <p className="mt-1 text-sm text-muted">Requisitos de contratación guardados.</p>

        <div className="mt-8 space-y-3">
          {searches.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center">
              <p className="text-sm text-muted">No creaste ninguna búsqueda todavía.</p>
              <Link href="/company/talent" className="glow-primary mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground">
                Nueva búsqueda
              </Link>
            </div>
          ) : (
            searches.map(({ search, matches }) => (
              <div key={search.id} className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{search.title || "Búsqueda"}</p>
                  <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-xs font-semibold text-violet-300">
                    {matches.length} candidatos
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  {search.requirements.position ?? "Cualquier puesto"}
                  {search.requirements.country && ` · ${search.requirements.country}`}
                  {search.requirements.min_experience != null && ` · ${search.requirements.min_experience}+ años`}
                </p>
                <p className="mt-1 text-[10px] text-muted-2">
                  Estado: {search.status} · {new Date(search.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
    </div>
  );
}
