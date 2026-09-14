"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProfileAction } from "@/server/actions/talentPublic";

export default function CreateProfileForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const result = await createProfileAction({
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      professionalTitle: String(fd.get("professionalTitle") ?? ""),
      city: String(fd.get("city") ?? ""),
      country: String(fd.get("country") ?? ""),
      summary: String(fd.get("summary") ?? ""),
    });
    setPending(false);
    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/talent/profile/edit");
      router.refresh();
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="text-sm font-medium">
            Nombre
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="text-sm font-medium">
            Apellido
          </label>
          <input
            id="lastName"
            name="lastName"
            required
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="professionalTitle" className="text-sm font-medium">
          Título profesional
        </label>
        <input
          id="professionalTitle"
          name="professionalTitle"
          placeholder="Ej. Executive Chef"
          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className="text-sm font-medium">
            Ciudad
          </label>
          <input
            id="city"
            name="city"
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="country" className="text-sm font-medium">
            País
          </label>
          <input
            id="country"
            name="country"
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="summary" className="text-sm font-medium">
          Resumen profesional
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={4}
          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </div>

      {error && (
        <p className="rounded-lg border border-negative/30 bg-negative/10 px-3 py-2 text-sm text-negative">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="glow-primary w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Creando..." : "Crear perfil"}
      </button>
    </form>
  );
}