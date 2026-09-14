import { notFound } from "next/navigation";
import Link from "next/link";
import { getTalentProfile, getTalentAlias } from "@/db/queries/talent";

const AVAILABILITY_LABEL: Record<string, string> = {
  immediate: "Inmediata",
  "15_days": "15 días",
  "30_days": "30 días",
  employed: "Empleado",
  open: "Abierto",
};

const VISIBILITY_LABEL: Record<string, string> = {
  public: "Público",
  private: "Privado",
  anonymous: "Anónimo",
};

const VERIFICATION_LABEL: Record<string, string> = {
  unverified: "Sin verificar",
  partial: "Parcial",
  verified: "Verificado",
};

const CATEGORY_LABEL: Record<string, string> = {
  culinary: "Culinarias",
  operational: "Operativas",
  management: "Gestión",
  language: "Idiomas",
};

const LEVEL_LABEL: Record<string, string> = {
  basic: "Básico",
  intermediate: "Intermedio",
  advanced: "Avanzado",
};

const KIND_LABEL: Record<string, string> = {
  identity: "Identidad",
  experience: "Experiencia",
  certification: "Certificación",
  reference: "Referencia",
  skills_assessment: "Evaluación de habilidades",
};

const VERIFICATION_STATE_LABEL: Record<string, string> = {
  pending: "Pendiente",
  verified: "Verificado",
  rejected: "Rechazado",
};

const PORTFOLIO_KIND_LABEL: Record<string, string> = {
  image: "Imagen",
  video: "Video",
  menu: "Menú",
  project: "Proyecto",
};

const ASSESSMENT_KIND_LABEL: Record<string, string> = {
  chef: "Chef",
  barista: "Barista",
  manager: "Gerente",
  custom: "Personalizada",
};

function fmtSalary(min: number | null, max: number | null): string {
  if (min == null && max == null) return "—";
  if (min == null) return `hasta $${max}`;
  if (max == null) return `desde $${min}`;
  return `$${min} - $${max}`;
}

export default async function TalentProfileDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = getTalentProfile(id);
  if (!profile) notFound();

  const alias = getTalentAlias(profile.id);

  const skillsByCategory = profile.skills.reduce<Record<string, typeof profile.skills>>(
    (acc, s) => {
      (acc[s.category] ??= []).push(s);
      return acc;
    },
    {},
  );

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <Link href="/admin/talent" className="text-xs text-muted hover:text-foreground">
          ← Talento
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            {profile.first_name} {profile.last_name}
          </h1>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {alias}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              profile.verification_status === "verified"
                ? "bg-positive/10 text-positive"
                : profile.verification_status === "partial"
                  ? "bg-accent-blue/10 text-accent-blue"
                  : "bg-surface-2 text-muted-2"
            }`}
          >
            {VERIFICATION_LABEL[profile.verification_status] ?? profile.verification_status}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">{profile.professional_title || "—"}</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Experiencia</p>
          <p className="mt-1 text-sm text-foreground">{profile.years_experience} años</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Disponibilidad</p>
          <p className="mt-1 text-sm text-foreground">
            {AVAILABILITY_LABEL[profile.availability_status] ?? profile.availability_status}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Ubicación</p>
          <p className="mt-1 text-sm text-foreground">
            {profile.location || "—"}
            {profile.country ? `, ${profile.country}` : ""}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Expectativa salarial</p>
          <p className="mt-1 text-sm text-foreground">
            {fmtSalary(profile.salary_min, profile.salary_max)}
          </p>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Visibilidad</p>
          <p className="mt-1 text-sm text-foreground">
            {VISIBILITY_LABEL[profile.visibility] ?? profile.visibility}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Contacto</p>
          <p className="mt-1 text-sm text-foreground">
            {profile.contact_email || "—"}
            {profile.contact_phone ? ` · ${profile.contact_phone}` : ""}
          </p>
        </div>
      </div>

      {profile.bio && (
        <section>
          <h2 className="mb-3 font-display text-base font-semibold">Perfil</h2>
          <p className="text-sm leading-relaxed text-muted">{profile.bio}</p>
        </section>
      )}

      {profile.skills.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-base font-semibold">Habilidades</h2>
          <div className="space-y-4">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <div key={category}>
                <p className="mb-2 text-xs uppercase tracking-wide text-muted-2">
                  {CATEGORY_LABEL[category] ?? category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span
                      key={s.id}
                      className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-foreground"
                    >
                      {s.name}{" "}
                      <span className="text-muted-2">
                        · {LEVEL_LABEL[s.level] ?? s.level}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {profile.experience.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-base font-semibold">Experiencia</h2>
          <div className="space-y-3">
            {profile.experience.map((e) => (
              <div key={e.id} className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-medium text-foreground">{e.position}</p>
                  <p className="text-xs text-muted-2">
                    {e.start_date || "—"}
                    {e.end_date ? ` – ${e.end_date}` : " – actualidad"}
                  </p>
                </div>
                <p className="mt-0.5 text-sm text-muted">
                  {e.company}
                  {e.restaurant_type ? ` · ${e.restaurant_type}` : ""}
                  {e.team_size != null ? ` · ${e.team_size} personas` : ""}
                </p>
                {e.responsibilities.length > 0 && (
                  <ul className="mt-2 list-inside list-disc text-sm text-muted">
                    {e.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}
                {e.achievements && (
                  <p className="mt-2 text-sm text-muted">{e.achievements}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {profile.certifications.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-base font-semibold">Certificaciones</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            {profile.certifications.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between gap-2 border-b border-border/50 p-4 last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">{c.name}</p>
                  <p className="text-sm text-muted">{c.issuer || "—"}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    c.verified ? "bg-positive/10 text-positive" : "bg-surface-2 text-muted-2"
                  }`}
                >
                  {c.verified ? "Verificado" : "Sin verificar"}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {profile.portfolio.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-base font-semibold">Portafolio</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {profile.portfolio.map((p) => (
              <div key={p.id} className="rounded-xl border border-border bg-surface p-4">
                <p className="font-medium text-foreground">{p.title}</p>
                <p className="text-xs text-muted-2">
                  {PORTFOLIO_KIND_LABEL[p.kind] ?? p.kind}
                </p>
                {p.description && <p className="mt-2 text-sm text-muted">{p.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {profile.verifications.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-base font-semibold">Verificaciones</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            {profile.verifications.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between gap-2 border-b border-border/50 p-4 last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {KIND_LABEL[v.kind] ?? v.kind}
                  </p>
                  {v.notes && <p className="text-sm text-muted">{v.notes}</p>}
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    v.status === "verified"
                      ? "bg-positive/10 text-positive"
                      : v.status === "rejected"
                        ? "bg-negative/10 text-negative"
                        : "bg-surface-2 text-muted-2"
                  }`}
                >
                  {VERIFICATION_STATE_LABEL[v.status] ?? v.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {profile.assessments.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-base font-semibold">Evaluaciones</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            {profile.assessments.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between gap-2 border-b border-border/50 p-4 last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {ASSESSMENT_KIND_LABEL[a.kind] ?? a.kind}
                  </p>
                  <p className="text-xs text-muted-2">{a.taken_at}</p>
                </div>
                {a.total_score != null && (
                  <span className="font-semibold text-accent-cyan">{a.total_score}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {profile.references.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-base font-semibold">Referencias</h2>
          <div className="space-y-3">
            {profile.references.map((r) => (
              <div key={r.id} className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-medium text-foreground">{r.employer_name || "Empleador"}</p>
                  <p className="text-xs text-muted-2">
                    {r.position_confirmed ? "Cargo confirmado" : "Cargo sin confirmar"}
                  </p>
                </div>
                {r.strengths && <p className="mt-2 text-sm text-muted">{r.strengths}</p>}
                {r.feedback && <p className="mt-1 text-sm text-muted">{r.feedback}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}