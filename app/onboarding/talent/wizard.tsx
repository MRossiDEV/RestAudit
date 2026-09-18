"use client";

import { useActionState } from "react";
import {
  onboardingAvailability,
  onboardingBasics,
  onboardingExperience,
  onboardingSkills,
  onboardingSkip,
  type OnboardingState,
} from "@/server/actions/onboardingTalent";
import type { TalentProfile } from "@/types/domain";

type Step = "basics" | "experience" | "skills" | "availability";

const STEPS: { key: Step; label: string }[] = [
  { key: "basics", label: "Perfil" },
  { key: "experience", label: "Experiencia" },
  { key: "skills", label: "Habilidades" },
  { key: "availability", label: "Disponibilidad" },
];

const input =
  "mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary";

export default function TalentWizard({
  current,
  profile,
}: {
  current: Step;
  profile: TalentProfile;
}) {
  const index = STEPS.findIndex((s) => s.key === current);

  return (
    <div className="w-full max-w-md">
      {/* Step indicator */}
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
        {current === "basics" && <BasicsStep profile={profile} />}
        {current === "experience" && <ExperienceStep />}
        {current === "skills" && <SkillsStep />}
        {current === "availability" && <AvailabilityStep profile={profile} />}
      </div>

      <form action={onboardingSkip} className="mt-6 text-center">
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

function BasicsStep({ profile }: { profile: TalentProfile }) {
  const [state, action, pending] = useActionState(onboardingBasics, undefined);
  return (
    <form action={action} className="space-y-4">
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Contanos quién sos
      </h1>
      <p className="text-sm text-muted">
        Esto es lo primero que ven las empresas en tu perfil.
      </p>
      <div>
        <label htmlFor="professionalTitle" className="text-sm font-medium">
          Rol o puesto principal *
        </label>
        <input
          id="professionalTitle"
          name="professionalTitle"
          defaultValue={profile.professional_title}
          placeholder="Ej: Cocinero, Bartender, Recepcionista"
          required
          className={input}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="city" className="text-sm font-medium">
            Ciudad
          </label>
          <input
            id="city"
            name="city"
            defaultValue={profile.location}
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
            defaultValue={profile.country}
            className={input}
          />
        </div>
      </div>
      <div>
        <label htmlFor="summary" className="text-sm font-medium">
          Sobre vos
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={3}
          defaultValue={profile.bio}
          placeholder="Una o dos frases sobre tu experiencia y qué buscás."
          className={input}
        />
      </div>
      <Error state={state} />
      <Next pending={pending} />
    </form>
  );
}

function ExperienceStep() {
  const [state, action, pending] = useActionState(
    onboardingExperience,
    undefined,
  );
  return (
    <form action={action} className="space-y-4">
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Tu experiencia más reciente
      </h1>
      <p className="text-sm text-muted">
        Podés agregar más desde tu panel después.
      </p>
      <div>
        <label htmlFor="company" className="text-sm font-medium">
          Empresa
        </label>
        <input id="company" name="company" className={input} />
      </div>
      <div>
        <label htmlFor="position" className="text-sm font-medium">
          Cargo
        </label>
        <input id="position" name="position" className={input} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="startDate" className="text-sm font-medium">
            Desde
          </label>
          <input id="startDate" name="startDate" type="month" className={input} />
        </div>
        <div>
          <label htmlFor="endDate" className="text-sm font-medium">
            Hasta
          </label>
          <input id="endDate" name="endDate" type="month" className={input} />
        </div>
      </div>
      <Error state={state} />
      <Next pending={pending} />
    </form>
  );
}

function SkillsStep() {
  const [state, action, pending] = useActionState(onboardingSkills, undefined);
  return (
    <form action={action} className="space-y-4">
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Habilidades e idiomas
      </h1>
      <p className="text-sm text-muted">Separalas con comas.</p>
      <div>
        <label htmlFor="skills" className="text-sm font-medium">
          Habilidades
        </label>
        <input
          id="skills"
          name="skills"
          placeholder="Cocina italiana, Barra, Servicio de sala"
          className={input}
        />
      </div>
      <div>
        <label htmlFor="languages" className="text-sm font-medium">
          Idiomas
        </label>
        <input
          id="languages"
          name="languages"
          placeholder="Español, Inglés"
          className={input}
        />
      </div>
      <Error state={state} />
      <Next pending={pending} />
    </form>
  );
}

const AVAILABILITY = [
  { value: "immediate", label: "Inmediata" },
  { value: "15_days", label: "En 15 días" },
  { value: "30_days", label: "En 30 días" },
  { value: "employed", label: "Empleado, abierto a ofertas" },
  { value: "open", label: "Abierto a oportunidades" },
];

const EMPLOYMENT_TYPES = [
  { value: "full_time", label: "Tiempo completo" },
  { value: "part_time", label: "Medio tiempo" },
  { value: "temporary", label: "Temporal" },
  { value: "seasonal", label: "Por temporada" },
];

function AvailabilityStep({ profile }: { profile: TalentProfile }) {
  const [state, action, pending] = useActionState(
    onboardingAvailability,
    undefined,
  );
  return (
    <form action={action} className="space-y-4">
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Disponibilidad
      </h1>
      <div>
        <label htmlFor="availability" className="text-sm font-medium">
          ¿Cuándo podés empezar?
        </label>
        <select
          id="availability"
          name="availability"
          defaultValue={profile.availability_status}
          className={input}
        >
          {AVAILABILITY.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <fieldset>
        <legend className="text-sm font-medium">Tipo de jornada</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {EMPLOYMENT_TYPES.map((t) => (
            <label
              key={t.value}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
            >
              <input
                type="checkbox"
                name="employmentTypes"
                value={t.value}
                defaultChecked={profile.employment_types.includes(t.value)}
              />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>
      <Error state={state} />
      <Next pending={pending} label="Finalizar y ver mi panel" />
    </form>
  );
}
