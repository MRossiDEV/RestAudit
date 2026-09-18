"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveCompanyProfile, type CompanyProfileState } from "@/server/actions/companyProfile";
import type { BusinessProfile } from "@/types/domain";

const input =
  "mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary";
const label = "text-sm font-medium";

export default function ProfileForm({ business }: { business: BusinessProfile }) {
  const [state, action, pending] = useActionState<CompanyProfileState, FormData>(
    saveCompanyProfile,
    undefined,
  );

  return (
    <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">Perfil de empresa</h1>
            <p className="mt-1 text-sm text-muted">Cómo ven tu empresa los profesionales en VORA.</p>
          </div>
          {business.slug && (
            <Link
              href={`/company/${business.slug}`}
              className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted hover:border-violet-400/30 hover:text-foreground"
            >
              Ver perfil público →
            </Link>
          )}
        </div>

        <form action={action} className="mt-8 space-y-5">
          <div>
            <label htmlFor="business_name" className={label}>Nombre de la empresa</label>
            <input id="business_name" name="business_name" defaultValue={business.business_name} className={input} required />
          </div>

          <div>
            <label htmlFor="tagline" className={label}>Eslogan</label>
            <input id="tagline" name="tagline" defaultValue={business.tagline} placeholder="Ej: Cocina de autor en el corazón de la ciudad" className={input} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="business_type" className={label}>Tipo</label>
              <input id="business_type" name="business_type" defaultValue={business.business_type} placeholder="Restaurante, hotel…" className={input} />
            </div>
            <div>
              <label htmlFor="size" className={label}>Tamaño</label>
              <input id="size" name="size" defaultValue={business.size} placeholder="Ej: 11-50" className={input} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="country" className={label}>País</label>
              <input id="country" name="country" defaultValue={business.country} className={input} />
            </div>
            <div>
              <label htmlFor="region" className={label}>Región</label>
              <input id="region" name="region" defaultValue={business.region} className={input} />
            </div>
            <div>
              <label htmlFor="city" className={label}>Ciudad</label>
              <input id="city" name="city" defaultValue={business.city} className={input} />
            </div>
          </div>

          <div>
            <label htmlFor="website" className={label}>Sitio web</label>
            <input id="website" name="website" type="url" defaultValue={business.website} placeholder="https://…" className={input} />
          </div>

          <div>
            <label htmlFor="description" className={label}>Descripción</label>
            <textarea id="description" name="description" defaultValue={business.description} rows={4} className={input} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="contact_name" className={label}>Persona de contacto</label>
              <input id="contact_name" name="contact_name" defaultValue={business.contact_name} className={input} />
            </div>
            <div>
              <label htmlFor="contact_phone" className={label}>Teléfono</label>
              <input id="contact_phone" name="contact_phone" defaultValue={business.contact_phone} className={input} />
            </div>
          </div>

          <div>
            <label htmlFor="hiring_interests" className={label}>Buscando (separado por comas)</label>
            <input id="hiring_interests" name="hiring_interests" defaultValue={business.hiring_interests.join(", ")} placeholder="Chef ejecutivo, Sous chef, Pastelero" className={input} />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="hiring_international" defaultChecked={business.hiring_international} className="h-4 w-4 rounded border-border" />
            Contratamos talento internacional
          </label>

          {state?.message && (
            <p className={`rounded-lg border px-3 py-2 text-sm ${state.ok ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300" : "border-negative/30 bg-negative/10 text-negative"}`}>
              {state.message}
            </p>
          )}

          <button type="submit" disabled={pending} className="glow-primary rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60">
            {pending ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
  );
}
