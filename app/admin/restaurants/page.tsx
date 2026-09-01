import Link from "next/link";
import { listRestaurants } from "@/db/queries/admin";

const STATUS_LABEL: Record<string, string> = {
  new: "New",
  data_collection: "Data Collected",
  ai_analysis: "AI Analysis",
  auditor_review: "Review & Quality",
  delivered: "Delivered",
};

export default async function AdminRestaurants() {
  const restaurants = listRestaurants();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Restaurants
        </h1>
        <p className="mt-1 text-sm text-muted">
          Restaurant Intelligence Profile database.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-2">
              <th className="px-4 py-3 font-medium">Restaurant</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Score</th>
              <th className="px-4 py-3 font-medium">Audit Status</th>
              <th className="px-4 py-3 font-medium">Audits</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((r) => {
              const p = r.profile as Record<string, unknown>;
              return (
                <tr
                  key={r.id}
                  className="border-b border-border/50 last:border-0 hover:bg-surface-2/40"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/restaurants/${r.id}`}
                      className="font-medium text-foreground hover:text-primary"
                    >
                      {r.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {String(p.location ?? "—")}
                  </td>
                  <td className="px-4 py-3">
                    {r.latest_score != null ? (
                      <span className="font-semibold text-accent-cyan">
                        {r.latest_score}
                      </span>
                    ) : (
                      <span className="text-muted-2">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {r.audit_status ? STATUS_LABEL[r.audit_status] ?? r.audit_status : "—"}
                  </td>
                  <td className="px-4 py-3 text-muted">{r.audit_count}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-positive/10 px-2 py-0.5 text-xs font-medium text-positive">
                      {r.status}
                    </span>
                  </td>
                </tr>
              );
            })}
            {restaurants.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted">
                  No restaurants yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}