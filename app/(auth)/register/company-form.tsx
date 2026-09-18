"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { businessRegister } from "@/server/actions/business";
import type { AuthFormState } from "@/lib/schemas/auth";

const input =
  "mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary";

export default function CompanyRegisterForm() {
  const [state, action, pending] = useActionState<AuthFormState, FormData>(
    businessRegister,
    undefined,
  );
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") ?? "";

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Creá tu cuenta de empresa gratis
      </h1>
      <p className="mt-1 text-sm text-muted">
        Accedé al perfil profesional completo y descubrí talento en VORA.
      </p>

      <form action={action} className="mt-8 space-y-4">
        <input type="hidden" name="returnTo" value={returnTo} />

        <div>
          <label htmlFor="businessName" className="text-sm font-medium">
            Nombre de la empresa
          </label>
          <input id="businessName" name="businessName" type="text" required className={input} />
          {state?.errors?.businessName && (
            <p className="mt-1 text-xs text-negative">{state.errors.businessName[0]}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="businessType" className="text-sm font-medium">
              Tipo
            </label>
            <input
              id="businessType"
              name="businessType"
              type="text"
              placeholder="Restaurante, hotel…"
              className={input}
            />
          </div>
          <div>
            <label htmlFor="country" className="text-sm font-medium">
              País
            </label>
            <input id="country" name="country" type="text" className={input} />
          </div>
        </div>

        <div>
          <label htmlFor="city" className="text-sm font-medium">
            Ciudad
          </label>
          <input id="city" name="city" type="text" className={input} />
        </div>

        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Persona de contacto
          </label>
          <input id="name" name="name" type="text" required className={input} />
          {state?.errors?.name && (
            <p className="mt-1 text-xs text-negative">{state.errors.name[0]}</p>
          )}
        </div>

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
          <label htmlFor="phone" className="text-sm font-medium">
            Teléfono / WhatsApp
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={input} />
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
          {pending ? "Creando cuenta..." : "Crear cuenta gratis"}
        </button>

        <p className="text-center text-[11px] leading-4 text-muted-2">
          Sin costo. La cuenta gratuita te permite ver los perfiles que los
          profesionales comparten con vos.
        </p>
      </form>
    </div>
  );
}
