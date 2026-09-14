"use client";

import { useActionState } from "react";
import Link from "next/link";
import { candidateRegister } from "@/server/actions/auth";
import type { AuthFormState } from "@/lib/schemas/auth";

export default function CandidateRegisterForm() {
  const [state, action, pending] = useActionState<AuthFormState, FormData>(
    candidateRegister,
    undefined,
  );

  return (
    <div className="mx-auto w-full max-w-sm px-6 py-20">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Crea tu perfil</h1>
      <p className="mt-1 text-sm text-muted">
        Empieza tu identidad profesional en VORA Talent.
      </p>

      <form action={action} className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
          />
          {state?.errors?.name && (
            <p className="mt-1 text-xs text-negative">{state.errors.name[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
          />
          {state?.errors?.email && (
            <p className="mt-1 text-xs text-negative">{state.errors.email[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
          />
          {state?.errors?.password && (
            <p className="mt-1 text-xs text-negative">{state.errors.password[0]}</p>
          )}
        </div>

        {state?.message && (
          <p className="rounded-lg border border-negative/30 bg-negative/10 px-3 py-2 text-sm text-negative">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="glow-primary w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Creando..." : "Crear mi perfil"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/talent/login" className="text-primary hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}