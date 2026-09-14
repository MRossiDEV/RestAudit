import { notFound } from "next/navigation";
import Link from "next/link";
import { getRestaurant } from "@/db/queries/admin";
import { ActivityFeed } from "../../activity-feed";

const STATUS_LABEL: Record<string, string> = {
  new: "Nuevo",
  data_collection: "Datos recopilados",
  ai_analysis: "Análisis de IA",
  auditor_review: "Revisión y calidad",
  delivered: "Entregado",
};

function Field({ label, value }: { label: string; value?: string | number }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-2">{label}</p>
      <p className="mt-0.5 text-sm text-foreground">{value ?? "—"}</p>
    </div>
  );
}

export default async function RestaurantDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = getRestaurant(id);
  if (!restaurant) notFound();

  const p = restaurant.profile as Record<string, unknown>;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <Link
          href="/admin/restaurants"
          className="text-xs text-muted hover:text-foreground"
        >
          ← Restaurantes
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            {restaurant.name}
          </h1>
          <span className="rounded-full bg-positive/10 px-2 py-0.5 text-xs font-medium text-positive">
            {restaurant.status}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">
          {String(p.cuisine ?? "")}{p.cuisine && p.location ? " · " : ""}
          {String(p.location ?? "")}
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="mb-4 font-display text-base font-semibold">
              Perfil del negocio
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Field label="Cocina" value={String(p.cuisine ?? "")} />
              <Field label="Ubicación" value={String(p.location ?? "")} />
              <Field label="Modelo de servicio" value={String(p.service_model ?? "")} />
              <Field label="Mesas" value={Number(p.number_of_seats) || undefined} />
              <Field
                label="Sucursales"
                value={Number(p.number_of_locations) || undefined}
              />
              <Field
                label="Ticket medio"
                value={Number(p.average_check) ? `$${p.average_check}` : undefined}
              />
              <Field
                label="Apertura"
                value={String(p.opening_date ?? "")}
              />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface">
            <div className="border-b border-border px-5 py-4">
              <h2 className="font-display text-base font-semibold">
                Cronología de inteligencia
              </h2>
            </div>
            <div className="p-3">
              <ActivityFeed entries={restaurant.timeline} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="mb-3 font-display text-base font-semibold">Auditorías</h2>
            {restaurant.audits.length === 0 ? (
              <p className="text-sm text-muted">Todavía no hay auditorías.</p>
            ) : (
              <ul className="space-y-3">
                {restaurant.audits.map((a) => (
                  <li key={a.id} className="text-sm">
                    <div className="flex items-center justify-between">
                      <Link
                        href="/admin/audits"
                        className="font-medium hover:text-primary"
                      >
                        {a.template_name ?? "Audit"}
                      </Link>
                      {a.vora_score != null && (
                        <span className="font-semibold text-accent-cyan">
                          {a.vora_score}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted">
                      {STATUS_LABEL[a.status] ?? a.status}
                      {a.assigned_consultant_name
                        ? ` · ${a.assigned_consultant_name}`
                        : ""}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}