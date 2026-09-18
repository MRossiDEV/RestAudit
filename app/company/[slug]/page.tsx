import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessBySlug } from "@/db/queries/business";
import { BrandMark } from "@/components/brand";
import { listJobsForBusiness } from "@/db/queries/talent";

export const dynamic = "force-dynamic";

const AVAILABILITY: Record<string, string> = {
  immediate: "Inmediata",
  "15_days": "15 días",
  "30_days": "30 días",
};

function Icon({ name, size = 16 }: { name: "location" | "globe" | "building" | "users" | "briefcase" | "external" | "check"; size?: number }) {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "location": return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "globe": return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.2 2.4 3.2 5.4 3.2 9s-1 6.6-3.2 9c-2.2-2.4-3.2-5.4-3.2-9S9.8 5.4 12 3Z" /></svg>;
    case "building": return <svg {...common}><path d="M4 21V5l8-2 8 2v16" /><path d="M8 8h1M15 8h1M8 12h1M15 12h1M8 16h1M15 16h1" /><path d="M10 21v-3h4v3" /></svg>;
    case "users": return <svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "briefcase": return <svg {...common}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>;
    case "external": return <svg {...common}><path d="M14 4h6v6" /><path d="M20 4 11 13" /><path d="M18 13v6H4V5h6" /></svg>;
    case "check": return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
    default: return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBusinessBySlug(slug);
  if (!b) return { title: "Empresa no encontrada" };
  return {
    title: `${b.business_name} | VORA Talent`,
    description: b.tagline || b.description || `${b.business_name} en VORA Talent`,
  };
}

export default async function BusinessProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);
  if (!business) notFound();

  const location = [business.city, business.region, business.country].filter(Boolean).join(", ");
  const openJobs = listJobsForBusiness(business.id, "open");

  const EMPLOYMENT_LABEL: Record<string, string> = {
    full_time: "Tiempo completo",
    part_time: "Medio tiempo",
    seasonal: "Temporada",
    contract: "Contrato",
    temporary: "Temporal",
    freelance: "Freelance",
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/talent" className="flex items-center gap-2">
            <BrandMark size="sm" />
          </Link>
          <Link href="/talent" className="text-xs text-muted hover:text-foreground">VORA Talent</Link>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b border-border bg-gradient-to-br from-[#17111f] via-[#12141c] to-[#0b181b]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex items-start gap-5">
            {business.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={business.logo_url} alt={business.business_name} className="h-20 w-20 rounded-2xl object-cover ring-2 ring-white/10" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/20 font-display text-3xl font-semibold">
                {business.business_name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-3xl font-semibold tracking-tight">{business.business_name}</h1>
                {business.verification_status === "verified" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    <Icon name="check" size={11} /> Verificada
                  </span>
                )}
              </div>
              {business.tagline && <p className="mt-1 text-base text-violet-300">{business.tagline}</p>}
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/60">
                {business.business_type && (
                  <span className="inline-flex items-center gap-1.5"><Icon name="building" size={13} />{business.business_type}</span>
                )}
                {location && (
                  <span className="inline-flex items-center gap-1.5"><Icon name="location" size={13} />{location}</span>
                )}
                {business.size && (
                  <span className="inline-flex items-center gap-1.5"><Icon name="users" size={13} />{business.size} empleados</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-6">
            {/* About */}
            {business.description && (
              <section className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="font-display text-lg font-semibold">Sobre la empresa</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted">{business.description}</p>
              </section>
            )}

            {/* Hiring */}
            <section className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="font-display text-lg font-semibold">Contratación</h2>
              <div className="mt-4 space-y-3">
                {business.hiring_international && (
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                    <Icon name="globe" size={18} />
                    <div>
                      <p className="text-sm font-medium">Contratación internacional</p>
                      <p className="text-xs text-muted">Esta empresa contrata talento de otros países.</p>
                    </div>
                  </div>
                )}
                {business.hiring_interests.length > 0 && (
                  <div className="rounded-xl border border-border bg-background p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-2">Busca</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {business.hiring_interests.map((h) => (
                        <span key={h} className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted">{h}</span>
                      ))}
                    </div>
                  </div>
                )}
                {!business.hiring_international && business.hiring_interests.length === 0 && (
                  <p className="text-sm text-muted">No hay información de contratación pública todavía.</p>
                )}
              </div>
            </section>

            {/* Open positions */}
            <section className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">Posiciones abiertas</h2>
                {openJobs.length > 0 && (
                  <span className="rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-semibold text-violet-300">
                    {openJobs.length}
                  </span>
                )}
              </div>

              {openJobs.length === 0 ? (
                <p className="mt-3 text-sm text-muted">No hay posiciones abiertas en este momento.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {openJobs.map((job) => (
                    <div key={job.id} className="rounded-xl border border-border bg-background p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-medium">{job.title}</p>
                          <p className="mt-0.5 text-xs text-muted">
                            {[job.location, EMPLOYMENT_LABEL[job.employment_type] ?? job.employment_type]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        </div>
                        {(job.salary_min != null || job.salary_max != null) && (
                          <span className="shrink-0 text-xs text-muted">
                            {job.salary_min != null && job.salary_max != null
                              ? `$${job.salary_min}–$${job.salary_max}`
                              : job.salary_min != null
                                ? `Desde $${job.salary_min}`
                                : `Hasta $${job.salary_max}`}
                          </span>
                        )}
                      </div>
                      {job.description && (
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{job.description}</p>
                      )}
                      {job.skills_required.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {job.skills_required.slice(0, 5).map((s) => (
                            <span key={s} className="rounded-md border border-border bg-surface px-2 py-0.5 text-[11px] text-muted">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-2">Empresa</p>
              <div className="mt-4 space-y-3 text-sm">
                {business.business_type && (
                  <div><p className="text-[10px] uppercase text-muted-2">Tipo</p><p className="mt-0.5">{business.business_type}</p></div>
                )}
                {location && (
                  <div><p className="text-[10px] uppercase text-muted-2">Ubicación</p><p className="mt-0.5">{location}</p></div>
                )}
                {business.website && (
                  <div>
                    <p className="text-[10px] uppercase text-muted-2">Sitio web</p>
                    <a href={business.website} target="_blank" rel="noopener noreferrer" className="mt-0.5 inline-flex items-center gap-1 text-primary hover:underline">
                      Visitar <Icon name="external" size={12} />
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/[0.08] to-cyan-500/[0.03] p-5">
              <p className="text-sm font-semibold">¿Sos profesional de hospitalidad?</p>
              <p className="mt-2 text-xs leading-5 text-muted">
                Creá tu perfil VORA y compartilo con empresas como esta.
              </p>
              <Link href="/register?role=talent" className="glow-primary mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground hover:opacity-90">
                Crear mi perfil gratis
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
