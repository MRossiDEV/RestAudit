"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJobAction } from "@/server/actions/talent";

interface RestaurantOption {
  id: string;
  name: string;
}

const TIERS = [
  { value: "standard", label: "Estándar" },
  { value: "featured", label: "Destacado" },
  { value: "urgent", label: "Urgente" },
];

const EMPLOYMENT_TYPES = [
  { value: "full_time", label: "Tiempo completo" },
  { value: "part_time", label: "Medio tiempo" },
  { value: "contract", label: "Contrato" },
  { value: "temporary", label: "Temporal" },
];

export default function CreateJobForm({
  restaurants,
}: {
  restaurants: RestaurantOption[];
}) {
  const router = useRouter();
  const [restaurantId, setRestaurantId] = useState(restaurants[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("full_time");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("0");
  const [skills, setSkills] = useState("");
  const [tier, setTier] = useState("standard");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const res = await createJobAction({
      restaurantId,
      title,
      description,
      location,
      employmentType,
      salaryMin: salaryMin ? Number(salaryMin) : null,
      salaryMax: salaryMax ? Number(salaryMax) : null,
      experienceRequired: Number(experienceRequired) || 0,
      skillsRequired: skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      tier: tier as "standard" | "featured" | "urgent",
    });
    setPending(false);
    if (res.error) {
      setError(res.error);
    } else if (res.id) {
      router.push(`/admin/talent/jobs/${res.id}`);
      router.refresh();
    }
  }

  const inputCls =
    "mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <form onSubmit={submit} className="rounded-xl border border-border bg-surface p-5">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-muted-2">Restaurante</label>
          <select
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            className={inputCls}
          >
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-2">Título</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Sous Chef"
            className={inputCls}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-2">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={inputCls}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-muted-2">Ubicación</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Montevideo"
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-2">Tipo de empleo</label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className={inputCls}
            >
              {EMPLOYMENT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-xs font-medium text-muted-2">Salario mínimo</label>
            <input
              type="number"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
              placeholder="55000"
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-2">Salario máximo</label>
            <input
              type="number"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
              placeholder="75000"
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-2">Experiencia (años)</label>
            <input
              type="number"
              value={experienceRequired}
              onChange={(e) => setExperienceRequired(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-2">Habilidades (separadas por coma)</label>
          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Cocina Italiana, Control de Costos"
            className={inputCls}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-2">Nivel de publicación</label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className={inputCls}
          >
            {TIERS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-negative/30 bg-negative/10 px-3 py-2 text-sm text-negative">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="glow-primary mt-5 w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Publicando…" : "Publicar empleo"}
      </button>
    </form>
  );
}