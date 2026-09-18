"use client";

import { useActionState } from "react";
import { login } from "@/server/actions/auth";
import type { AuthFormState } from "@/lib/schemas/auth";

const input =
  "mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary";

export default function LoginForm() {
  const [state, action, pending] = useActionState<AuthFormState, FormData>(
    login,
    undefined,
  );

  return (
    <div className="w-full max-w-sm">
      <h1 className="mt-10 font-display text-2xl font-semibold tracking-tight">
        Iniciar sesión
      </h1>
      <p className="mt-1 text-sm text-muted">
        Accedé a tu cuenta VORA — profesional o empresa.
      </p>

      <form action={action} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={input}
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
            className={input}
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
          className="glow-primary w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}
