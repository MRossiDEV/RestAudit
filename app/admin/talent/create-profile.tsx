"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTalentProfileAction } from "@/server/actions/talent";

const AVAILABILITY = [
  { value: "immediate", label: "Inmediata" },
  { value: "15_days", label: "15 días" },
  { value: "30_days", label: "30 días" },
  { value: "employed", label: "Empleado" },
  { value: "open", label: "Abierto" },
];

const VISIBILITY = [
  { value: "anonymous", label: "Anónimo" },
  { value: "public", label: "Público" },
  { value: "private", label: "Privado" },
];

export default function CreateProfileForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [yearsExperience, setYearsExperience] = useState("0");
  const [availability, setAvailability] = useState("open");
  const [visibility, setVisibility] = useState("anonymous");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [bio, setBio] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const res = await createTalentProfileAction({
      fullName,
      professionalTitle,
      location,
      country,
      yearsExperience: Number(yearsExperience) || 0,
      availabilityStatus: availability as
        | "immediate"
        | "15_days"
        | "30_days"
        | "employed"
        | "open",
      visibility: visibility as "anonymous" | "public" | "private",
      salaryMin: salaryMin ? Number(salaryMin) : null,
      salaryMax: salaryMax ? Number(salaryMax) : null,
      contactEmail,
      contactPhone,
      bio,
    });
    setPending(false);
    if (res.error) {
      setError(res.error);
    } else if (res.id) {
      router.push(`/admin/talent/${res.id}`);
      router.refresh();
    }
  }

  const inputCls =
    "mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <form onSubmit={submit} className="rounded-xl border border-border bg-surface p-5">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-muted-2">Nombre completo</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Sofía Álvarez"
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-2">Cargo profesional</label>
            <input
              value={professionalTitle}
              onChange={(e) => setProfessionalTitle(e.target.value)}
              placeholder="Sous Chef"
              className={inputCls}
            />
          </div>
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
            <label className="text-xs font-medium text-muted-2">País</label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Uruguay"
              className={inputCls}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-xs font-medium text-muted-2">Experiencia (años)</label>
            <input
              type="number"
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-2">Disponibilidad</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className={inputCls}
            >
              {AVAILABILITY.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-2">Visibilidad</label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className={inputCls}
            >
              {VISIBILITY.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-muted-2">Salario mínimo</label>
            <input
              type="number"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-2">Salario máximo</label>
            <input
              type="number"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-muted-2">Email de contacto</label>
            <input
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="sofia@example.com"
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-2">Teléfono</label>
            <input
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="+598 99 000 000"
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-2">Perfil (bio)</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className={inputCls}
          />
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
        {pending ? "Creando…" : "Crear perfil"}
      </button>
    </form>
  );
}