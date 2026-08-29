"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateHealthCheck } from "@/engines/health-check";
import type { HealthCheckResult } from "@/types/health-check";

type Step =
  | "intro"
  | "q1"
  | "q2"
  | "q3"
  | "q3followup"
  | "q4"
  | "q5"
  | "analyzing"
  | "results"
  | "register"
  | "success";

const TOTAL_STEPS = 5;

const SERVICE_TYPES = [
  "Servicio completo",
  "Comida casual",
  "Casual rápido",
  "Servicio rápido",
  "Café / Panadería",
  "Bar / Lounge",
  "Alta cocina",
  "Otro",
] as const;

const REVENUE_BANDS = [
  "Menos de $25K",
  "$25K–$50K",
  "$50K–$100K",
  "$100K–$250K",
  "$250K–$500K",
  "$500K+",
  "Prefiero no decirlo",
] as const;

const FOOD_CONFIDENCE = [
  { key: "exact", label: "Lo sé con exactitud" },
  { key: "estimate", label: "Tengo una buena estimación" },
  { key: "rough", label: "Tengo una idea aproximada" },
  { key: "unsure", label: "No estoy seguro" },
  { key: "none", label: "No lo controlo" },
] as const;

const CONCERNS = [
  "Rentabilidad",
  "Costos de alimentos",
  "Costos de personal",
  "Ventas",
  "Precios del menú",
  "Desperdicio",
  "Inventario",
  "Personal",
  "Experiencia del cliente",
  "Otra cosa",
] as const;

const REVIEW_FREQUENCY = ["Diario", "Semanal", "Mensual", "Ocasionalmente", "Rara vez", "Casi nunca"] as const;

const ANALYZING_ITEMS = [
  "Perfil del restaurante",
  "Indicadores de ingresos",
  "Estructura de costos",
  "Señales del menú",
  "Indicadores de personal",
  "Riesgos operativos",
  "Señales del cliente",
];

function mapAnswersToEngine(answers: Answers) {
  const serviceMap: Record<string, "quick_service" | "casual_dining" | "fine_dining" | "bar_lounge"> = {
    "Servicio completo": "casual_dining",
    "Comida casual": "casual_dining",
    "Casual rápido": "casual_dining",
    "Servicio rápido": "quick_service",
    "Café / Panadería": "quick_service",
    "Bar / Lounge": "bar_lounge",
    "Alta cocina": "fine_dining",
    Otro: "casual_dining",
  };

  const revenueMap: Record<string, "under_50k" | "50k_100k" | "100k_250k" | "250k_500k" | "over_500k"> = {
    "Menos de $25K": "under_50k",
    "$25K–$50K": "under_50k",
    "$50K–$100K": "50k_100k",
    "$100K–$250K": "100k_250k",
    "$250K–$500K": "250k_500k",
    "$500K+": "over_500k",
    "Prefiero no decirlo": "100k_250k",
  };

  const seatsByType: Record<string, number> = {
    "Servicio completo": 70,
    "Comida casual": 60,
    "Casual rápido": 45,
    "Servicio rápido": 30,
    "Café / Panadería": 25,
    "Bar / Lounge": 50,
    "Alta cocina": 65,
    Otro: 50,
  };

  let foodCostPct: number;
  if (answers.foodFollowupType === "number") {
    foodCostPct = Math.min(100, Math.max(0, Number(answers.foodNumber) || 30));
  } else {
    switch (answers.foodConfidence) {
      case "exact":
        foodCostPct = 29;
        break;
      case "estimate":
        foodCostPct = 33;
        break;
      case "rough":
        foodCostPct = 36;
        break;
      case "unsure":
        foodCostPct = 39;
        break;
      case "none":
        foodCostPct = 42;
        break;
      default:
        foodCostPct = 34;
    }
  }

  let laborCostPct = 26;
  const hasLabor = answers.concerns.includes("Costos de personal") || answers.concerns.includes("Personal");
  if (hasLabor) laborCostPct = 33;
  if (answers.foodConfidence === "none") laborCostPct += 2;

  const seats = seatsByType[answers.serviceType] ?? 50;

  const symptoms: ("food_cost_too_high" | "labor_cost_too_high" | "inconsistent_revenue" | "low_margins" | "high_turnover" | "few_repeat_customers" | "unsure")[] = [];
  if (answers.concerns.includes("Costos de alimentos") || answers.concerns.includes("Desperdicio") || answers.concerns.includes("Inventario"))
    symptoms.push("food_cost_too_high");
  if (answers.concerns.includes("Costos de personal") || answers.concerns.includes("Personal"))
    symptoms.push("labor_cost_too_high");
  if (answers.concerns.includes("Ventas")) symptoms.push("inconsistent_revenue");
  if (answers.concerns.includes("Rentabilidad")) symptoms.push("low_margins");
  if (answers.concerns.includes("Experiencia del cliente")) symptoms.push("few_repeat_customers");
  if (answers.reviewFrequency === "Casi nunca" || answers.reviewFrequency === "Rara vez")
    symptoms.push("unsure");
  if (symptoms.length === 0) symptoms.push("unsure");

  return {
    cuisine: "other" as const,
    serviceType: serviceMap[answers.serviceType] ?? "casual_dining",
    revenueBand: revenueMap[answers.revenueBand] ?? "100k_250k",
    seats,
    coversPerMonth: 0,
    foodCostPct,
    laborCostPct,
    symptoms,
  };
}

interface Answers {
  serviceType: string;
  revenueBand: string;
  foodConfidence: string;
  foodFollowupType: "none" | "number" | "spend";
  foodNumber: string;
  foodSpend: string;
  concerns: string[];
  reviewFrequency: string;
}

const EMPTY_ANSWERS: Answers = {
  serviceType: "",
  revenueBand: "",
  foodConfidence: "",
  foodFollowupType: "none",
  foodNumber: "",
  foodSpend: "",
  concerns: [],
  reviewFrequency: "",
};

export default function HealthCheckWidget() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [result, setResult] = useState<HealthCheckResult | null>(null);

  function update(key: keyof Answers, value: Answers[keyof Answers]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  const stepIndex = useMemo(() => {
    switch (step) {
      case "q1":
        return 0;
      case "q2":
        return 1;
      case "q3":
        return 2;
      case "q3followup":
        return 2;
      case "q4":
        return 3;
      case "q5":
        return 4;
      default:
        return 0;
    }
  }, [step]);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/40">
      {step === "intro" && <Intro onStart={() => setStep("q1")} />}

      {step !== "intro" && step !== "results" && step !== "register" && step !== "success" && (
        <div className="w-full">
          <ProgressHeader
            current={stepIndex}
            total={TOTAL_STEPS}
            showSteps={step !== "analyzing"}
          />
        </div>
      )}

      {step === "q1" && (
        <QuestionShell
          title="¿Qué tipo de restaurante operas?"
          subtitle="Esto nos ayuda a calibrar el análisis según tu concepto."
        >
          <CardGrid
            options={SERVICE_TYPES as unknown as string[]}
            selected={answers.serviceType}
            onSelect={(v) => {
              update("serviceType", v);
              setStep("q2");
            }}
          />
        </QuestionShell>
      )}

      {step === "q2" && (
        <QuestionShell
          title="¿Aproximadamente cuántos ingresos genera tu restaurante cada mes?"
          subtitle="Solo necesitamos un rango aproximado."
        >
          <CardGrid
            options={REVENUE_BANDS as unknown as string[]}
            selected={answers.revenueBand}
            onSelect={(v) => {
              update("revenueBand", v);
              setStep("q3");
            }}
          />
        </QuestionShell>
      )}

      {step === "q3" && (
        <QuestionShell
          title="¿Qué tan seguro estás de las cifras de costo de alimentos de tu restaurante?"
          subtitle="Sé honesto: define qué buscamos a continuación."
        >
          <div className="space-y-2">
            {FOOD_CONFIDENCE.map((c) => (
              <AnswerRow
                key={c.key}
                label={c.label}
                selected={answers.foodConfidence === c.key}
                onSelect={() => update("foodConfidence", c.key)}
              />
            ))}
          </div>
          <NextBar
            disabled={!answers.foodConfidence}
            onNext={() => {
              if (answers.foodConfidence === "exact") {
                update("foodFollowupType", "number");
                setStep("q3followup");
              } else {
                update("foodFollowupType", "none");
                setStep("q4");
              }
            }}
          />
        </QuestionShell>
      )}

      {step === "q3followup" && (
        <QuestionShell
          title="¿Cuál es tu porcentaje actual de costo de alimentos?"
          subtitle="El porcentaje de tus ingresos que gastas en alimentos y bebidas."
        >
          <input
            type="number"
            inputMode="decimal"
            placeholder="ej. 32"
            value={answers.foodNumber}
            onChange={(e) => update("foodNumber", e.target.value)}
            className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-lg text-foreground outline-none placeholder:text-muted-2 focus:border-primary"
          />
          <NextBar
            disabled={answers.foodNumber.trim() === ""}
            onNext={() => setStep("q4")}
          />
        </QuestionShell>
      )}

      {step === "q4" && (
        <QuestionShell
          title="¿Cuál es tu mayor preocupación en este momento?"
          subtitle="Selecciona todas las que apliquen, o salta si nada destaca."
        >
          <div className="grid grid-cols-2 gap-2">
            {CONCERNS.map((c) => (
              <TogglePill
                key={c}
                label={c}
                selected={answers.concerns.includes(c)}
                onSelect={() => {
                  const has = answers.concerns.includes(c);
                  update(
                    "concerns",
                    has ? answers.concerns.filter((x) => x !== c) : [...answers.concerns, c],
                  );
                }}
              />
            ))}
          </div>
          <NextBar onNext={() => setStep("q5")} nextLabel="Continuar" />
        </QuestionShell>
      )}

      {step === "q5" && (
        <QuestionShell
          title="¿Con qué frecuencia revisas las cifras clave de tu restaurante?"
          subtitle="Última pregunta."
        >
          <div className="space-y-2">
            {REVIEW_FREQUENCY.map((f) => (
              <AnswerRow
                key={f}
                label={f}
                selected={answers.reviewFrequency === f}
                onSelect={() => update("reviewFrequency", f)}
              />
            ))}
          </div>
          <NextBar
            disabled={!answers.reviewFrequency}
            nextLabel="Ver mis resultados"
            onNext={() => setStep("analyzing")}
          />
        </QuestionShell>
      )}

      {step === "analyzing" && (
        <Analyzing
          onDone={() => {
            setResult(calculateHealthCheck(mapAnswersToEngine(answers)));
            setStep("results");
          }}
        />
      )}

      {step === "results" && result && (
        <Results
          result={result}
          onRegister={() => setStep("register")}
          onRestart={() => {
            setAnswers(EMPTY_ANSWERS);
            setResult(null);
            setStep("intro");
          }}
        />
      )}

      {step === "register" && result && (
        <Register
          answers={answers}
          onBack={() => setStep("results")}
          onSuccess={() => setStep("success")}
        />
      )}

      {step === "success" && <Success onRestart={() => {
        setAnswers(EMPTY_ANSWERS);
        setResult(null);
        setStep("intro");
      }} />}
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="px-6 py-10 text-center sm:px-10">
      <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
        Chequeo gratuito de salud
      </span>
      <h2 className="mx-auto mt-5 max-w-md text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Hagamos un vistazo rápido a tu restaurante.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-muted">
        Responde algunas preguntas sobre tu negocio. Nuestra IA identificará posibles áreas de
        riesgo y oportunidades que vale la pena investigar.
      </p>
      <button
        onClick={onStart}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
      >
        Comenzar mi chequeo gratuito
        <span aria-hidden>→</span>
      </button>
      <p className="mt-4 text-xs text-muted-2">Toma aproximadamente 3 minutos · No se requiere tarjeta de crédito</p>
    </div>
  );
}

function ProgressHeader({
  current,
  total,
  showSteps,
}: {
  current: number;
  total: number;
  showSteps: boolean;
}) {
  return (
    <div className="border-b border-border px-6 py-4 sm:px-10">
      <div className="flex items-center justify-between text-xs text-muted">
        <span className="font-medium uppercase tracking-widest">Restaurante</span>
        {showSteps && (
          <span className="tabular-nums">
            Paso {current + 1} de {total}
          </span>
        )}
      </div>
      <div className="mt-3 flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= current ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function QuestionShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 py-8 sm:px-10">
      <div className="animate-fade-up">
        <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{title}</h3>
        {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

function CardGrid({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onSelect(o)}
          className={`rounded-xl border px-3 py-4 text-sm font-medium transition ${
            selected === o
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-surface-2 text-muted hover:border-primary/50 hover:text-foreground"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function AnswerRow({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition ${
        selected
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-surface-2 text-muted hover:border-primary/50 hover:text-foreground"
      }`}
    >
      <span>{label}</span>
      <span
        className={`h-4 w-4 rounded-full border ${
          selected ? "border-primary bg-primary" : "border-muted-2"
        }`}
      />
    </button>
  );
}

function TogglePill({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
        selected
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-surface-2 text-muted hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function NextBar({
  onNext,
  disabled = false,
  nextLabel = "Siguiente",
}: {
  onNext: () => void;
  disabled?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="mt-6 flex justify-end">
      <button
        onClick={onNext}
        disabled={disabled}
        className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {nextLabel} →
      </button>
    </div>
  );
}

function Analyzing({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible < ANALYZING_ITEMS.length) {
      const t = setTimeout(() => setVisible((v) => v + 1), 420);
      return () => clearTimeout(t);
    }
    const t = setTimeout(onDone, 800);
    return () => clearTimeout(t);
  }, [visible, onDone]);

  return (
    <div className="px-6 py-12 text-center sm:px-10">
      <div className="mx-auto flex h-12 w-12 items-center justify-center">
        <span className="h-3 w-3 rounded-full bg-primary animate-pulse-dot" />
      </div>
      <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        Analizando tu restaurante…
      </h3>
      <div className="mx-auto mt-8 max-w-sm space-y-2.5 text-left">
        {ANALYZING_ITEMS.slice(0, visible).map((item) => (
          <div key={item} className="animate-fade-up flex items-center gap-2.5 text-sm text-muted">
            <span className="text-primary">✓</span>
            {item}
          </div>
        ))}
        {visible >= ANALYZING_ITEMS.length && (
          <div className="animate-fade-up mt-3 text-sm text-muted">Analizando posibles oportunidades…</div>
        )}
      </div>
    </div>
  );
}

function meterClass(score: number): string {
  if (score >= 75) return "bg-positive";
  if (score >= 55) return "bg-primary";
  return "bg-negative";
}

function bandLabel(score: number): string {
  if (score >= 80) return "SALUDABLE";
  if (score >= 60) return "VALE LA PENA REVISAR";
  return "NECESITA ATENCIÓN";
}

function Results({
  result,
  onRegister,
  onRestart,
}: {
  result: HealthCheckResult;
  onRegister: () => void;
  onRestart: () => void;
}) {
  return (
    <div className="px-6 py-10 sm:px-10">
      <div className="animate-fade-up text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted">
          Tu puntaje preliminar de salud del restaurante
        </p>
        <div className="mt-6 flex flex-col items-center">
          <span className="text-7xl font-semibold tracking-tight text-foreground">{result.overall}</span>
          <span className="mt-1 text-muted-2">/ 100</span>
          <span className="mt-5 rounded-full border border-border px-4 py-1 text-xs font-semibold uppercase tracking-widest text-muted">
            {bandLabel(result.overall)}
          </span>
        </div>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-muted">
          Según la información que proporcionaste, tu restaurante muestra varias áreas que podrían
          merecer una revisión más cercana.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {result.dimensions.map((d) => (
          <div key={d.key} className="animate-fade-up">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">{DIMENSION_LABELS[d.key] ?? d.label}</span>
              <span className="font-medium text-foreground">{d.score}</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2">
              <div
                className={`h-full rounded-full ${meterClass(d.score)}`}
                style={{ width: `${d.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-semibold tracking-tight text-foreground">
          Encontramos {result.opportunities.length} área{result.opportunities.length === 1 ? "" : "s"} que vale la pena investigar.
        </h4>
        <div className="mt-4 space-y-3">
          {result.opportunities.map((o, i) => {
            const impact = i === 0 ? "ALTO" : "MEDIO";
            return (
              <div key={o.id} className="animate-fade-up rounded-xl border border-border bg-surface-2 p-5">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">{OPPORTUNITY_TITLES[o.id] ?? o.title}</p>
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      impact === "ALTO" ? "bg-negative/15 text-negative" : "bg-primary/15 text-primary"
                    }`}
                  >
                    Impacto: {impact}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-6 text-muted">{o.summary}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-surface-2 p-5 text-center">
        <p className="text-lg font-semibold text-foreground">Pero esto es solo el comienzo.</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
          Una evaluación rápida puede identificar señales de advertencia. No puede decirnos
          exactamente por qué están ocurriendo.
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
          Para determinar las causas reales, nuestros consultores analizan los datos financieros, de
          menú, compras, inventario, personal y operativos de tu restaurante.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={onRegister}
          className="rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
        >
          Revisar mi restaurante →
        </button>
        <button onClick={onRestart} className="text-sm text-muted-2 transition hover:text-muted">
          Reiniciar el chequeo
        </button>
      </div>
    </div>
  );
}

function Register({
  answers,
  onBack,
  onSuccess,
}: {
  answers: Answers;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    restaurantName: "",
    name: "",
    email: "",
    phone: "",
    city: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "register",
          name: form.name,
          email: form.email,
          phone: form.phone,
          restaurantName: form.restaurantName,
          checkInput: mapAnswersToEngine(answers),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Algo salió mal.");
      }
      onSuccess();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Algo salió mal.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-2 focus:border-primary";

  return (
    <div className="px-6 py-8 sm:px-10">
      <button onClick={onBack} className="text-sm text-muted-2 transition hover:text-muted">
        ← Volver a mi puntaje
      </button>
      <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        Veamos más de cerca tu restaurante.
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        Registra tu restaurante y nuestro equipo podrá revisar tus resultados preliminares e
        identificar las áreas que más vale la pena investigar.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nombre del restaurante *">
            <input
              className={inputClass}
              value={form.restaurantName}
              onChange={(e) => setForm({ ...form, restaurantName: e.target.value })}
              required
            />
          </Field>
          <Field label="Tu nombre *">
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Correo electrónico *">
            <input
              type="email"
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </Field>
          <Field label="Teléfono">
            <input
              className={inputClass}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Ciudad / Ubicación *">
          <input
            className={inputClass}
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            required
          />
        </Field>

        {error && <p className="text-sm text-negative">{error}</p>}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:opacity-60"
        >
          {status === "submitting" ? "Enviando..." : "Solicitar mi revisión gratuita →"}
        </button>
        <p className="text-center text-xs text-muted-2">
          Sin compromiso. Tu información se mantiene confidencial.
        </p>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}

function Success({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="px-6 py-12 text-center sm:px-10">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-positive/15 text-positive">
        <span className="text-xl">✓</span>
      </div>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
        Tu restaurante está en nuestro radar.
      </h3>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-muted">
        Hemos recibido tu información y tu evaluación preliminar.
      </p>
      <p className="mx-auto mt-2 max-w-md text-[15px] leading-7 text-muted">
        Un miembro de nuestro equipo de consultoría revisará los resultados y determinará dónde un
        análisis más profundo podría descubrir oportunidades significativas.
      </p>
      <button
        onClick={onRestart}
        className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-6 py-3 text-sm font-medium text-foreground transition hover:border-primary/50"
      >
        Explorar qué analizamos →
      </button>
    </div>
  );
}

const DIMENSION_LABELS: Record<string, string> = {
  financial: "Salud financiera",
  menu: "Rendimiento del menú",
  food_cost: "Costo de alimentos",
  labor: "Eficiencia laboral",
  operations: "Operaciones",
};

const OPPORTUNITY_TITLES: Record<string, string> = {
  food_cost: "Costo de alimentos",
  labor: "Personal",
  prime_cost: "Costo principal",
  revenue_per_seat: "Ingresos por asiento",
  retention: "Retención y consistencia",
  growth: "Próxima palanca de crecimiento",
};