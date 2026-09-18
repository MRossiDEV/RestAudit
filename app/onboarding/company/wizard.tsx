"use client";

import { useActionState } from "react";
import {
  onboardingCompanyDetails,
  onboardingCompanyHiring,
  onboardingCompanySkip,
  type OnboardingState,
} from "@/server/actions/onboardingCompany";
import type { BusinessProfile } from "@/types/domain";

type Step = "details" | "hiring";

const STEPS: { key: Step; label: string }[] = [
  { key: "details", label: "Empresa" },
  { key: "hiring", label: "Contratación" },
];

const input =
  "mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary";

export default function CompanyWizard({
  current,
  business,
  returnTo,
}: {
  current: Step;
  business: BusinessProfile;
  returnTo: string | null;
}) {
  const index = STEPS.findIndex((s) => s.key === current);

  return (
    <div className="w-full max-w-md">
      <ol className="mt-8 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <li key={s.key} className="flex flex-1 flex-col gap-1">
            <span
              className={`h-1 rounded-full ${
                i <= index ? "bg-primary" : "bg-border"
              }`}
            />
            <span
              className={`text-xs ${
                i === index ? "font-medium text-foreground" : "text-muted"
              }`}
            >
              {s.label}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8">
        {current === "details" ? (
          <DetailsStep business={business} returnTo={returnTo} />
        ) : (
          <HiringStep business={business} returnTo={returnTo} />
        )}
      </div>

      <form action={onboardingCompanySkip} className="mt-6 text-center">
        {returnTo && <input type="hidden" name="returnTo" value={returnTo} />}
        <button type="submit" className="text-sm text-muted hover:text-foreground">
          Completar más tarde →
        </button>
      </form>
    </div>
  );
}

function Error({ state }: { state: OnboardingState }) {
  if (!state?.error) return null;
  return (
    <p className="rounded-lg border border-negative/30 bg-negative/10 px-3 py-2 text-sm text-negative">
      {state.error}
    </p>
  );
}

function Next({
  pending,
  label = "Continuar",
}: {
  pending: boolean;
  label?: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="glow-primary w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
    >
      {pending ? "Guardando..." : label}
    </button>
  );
}

const BUSINESS_TYPES = [
  "Restaurante",
  "Bar / Café",
  "Hotel",
  "Catering",
  "Franquicia",
  "Otro",
];

const SIZES = ["1-10", "11-50", "51-200", "200+"];

function DetailsStep({
  business,
  returnTo,
}: {
  business: BusinessProfile;
  returnTo: string | null;
}) {
  const [state, action, pending] = useActionState(
    onboardingCompanyDetails,
    undefined,
  );
  return (
    <form action={action} className="space-y-4">
      {returnTo && <input type="hidden" name="returnTo" value={returnTo} />}
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Contanos sobre tu empresa
      </h1>
      <p className="text-sm text-muted">
        Esto ayuda a los profesionales a conocerte.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="businessType" className="text-sm font-medium">
            Tipo de negocio
          </label>
          <select
            id="businessType"
            name="businessType"
            defaultValue={business.business_type}
            className={input}
          >
            <option value="">Elegir…</option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="size" className="text-sm font-medium">
            Tamaño
          </label>
          <select
            id="size"
            name="size"
            defaultValue={business.size}
            className={input}
          >
            <option value="">Elegir…</option>
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s} empleados
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="city" className="text-sm font-medium">
            Ciudad
          </label>
          <input
            id="city"
            name="city"
            defaultValue={business.city}
            className={input}
          />
        </div>
        <div>
          <label htmlFor="country" className="text-sm font-medium">
            País
          </label>
          <input
            id="country"
            name="country"
            defaultValue={business.country}
            className={input}
          />
        </div>
      </div>
      <div>
        <label htmlFor="region" className="text-sm font-medium">
          Provincia / Región
        </label>
        <input
          id="region"
          name="region"
          defaultValue={business.region}
          className={input}
        />
      </div>
      <div>
        <label htmlFor="website" className="text-sm font-medium">
          Sitio web
        </label>
        <input
          id="website"
          name="website"
          type="url"
          defaultValue={business.website}
          placeholder="https://"
          className={input}
        />
      </div>
      <div>
        <label htmlFor="description" className="text-sm font-medium">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={business.description}
          className={input}
        />
      </div>
      <Error state={state} />
      <Next pending={pending} />
    </form>
  );
}

const INTERESTS = [
  "Cocina",
  "Sala / Servicio",
  "Barra",
  "Recepción",
  "Gerencia",
  "Limpieza",
  "Delivery",
  "Administración",
];

function HiringStep({
  business,
  returnTo,
}: {
  business: BusinessProfile;
  returnTo: string | null;
}) {
  const [state, action, pending] = useActionState(
    onboardingCompanyHiring,
    undefined,
  );
  return (
    <form action={action} className="space-y-4">
      {returnTo && <input type="hidden" name="returnTo" value={returnTo} />}
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        ¿A quién buscás contratar?
      </h1>
      <p className="text-sm text-muted">
        Usamos esto para mostrarte perfiles relevantes.
      </p>
      <fieldset>
        <legend className="text-sm font-medium">Áreas de interés</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {INTERESTS.map((i) => (
            <label
              key={i}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
            >
              <input
                type="checkbox"
                name="interests"
                value={i}
                defaultChecked={business.hiring_interests.includes(i)}
              />
              {i}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
        <input
          type="checkbox"
          name="hiringInternational"
          defaultChecked={business.hiring_international}
        />
        También contratamos talento internacional
      </label>
      <Error state={state} />
      <Next pending={pending} label="Finalizar y ver mi panel" />
    </form>
  );
}
