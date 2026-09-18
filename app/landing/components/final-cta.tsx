import { ArrowRight, ChefHat } from "lucide-react";
import Link from "next/link";

export function FinalCta() {
  return (
    <section className="relative px-5 py-32 lg:px-8 lg:py-40">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />

      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black">
          <ChefHat className="h-6 w-6" />
        </div>

        <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
          Tu perfil empieza hoy.
          <br />
          <span className="text-white/35">
            Tu carrera lo seguirá construyendo.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/40">
          Creá gratis tu identidad profesional VORA y empezá a construir algo
          que puedas llevar de un trabajo al siguiente.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/register?role=talent"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Crear mi perfil gratis
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/register?role=company"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-7 py-4 text-sm font-medium text-white/70 transition hover:bg-white/[0.05] hover:text-white"
          >
            Buscar talento
          </Link>
        </div>

        <div className="mt-8 text-xs text-white/25">
          Perfil profesional gratuito · Sin suscripción para profesionales
        </div>
      </div>
    </section>
  );
}
