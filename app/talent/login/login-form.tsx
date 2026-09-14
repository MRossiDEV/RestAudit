"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/server/actions/auth";
import type { AuthFormState } from "@/lib/schemas/auth";

export default function CandidateLoginForm() {
  const [state, action, pending] = useActionState<AuthFormState, FormData>(
    login,
    undefined,
  );

  return (
    <div className="mx-auto w-full max-w-sm px-6 py-20">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Inicia sesión</h1>
      <p className="mt-1 text-sm text-muted">Accede a tu perfil profesional VORA.</p>

      <form action={action} className="mt-8 space-y-4">
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
            autoComplete="current-password"
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
          {pending ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        ¿No tienes cuenta?{" "}
        <Link href="/talent/register" className="text-primary hover:underline">
          Crea tu perfil
        </Link>
      </p>
    </div>
  );
}