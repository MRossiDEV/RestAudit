import { ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

export function CompanyFinalCta() {
  return (
    <section className="relative px-5 py-32 lg:px-8 lg:py-40">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />

      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black">
          <Building2 className="h-6 w-6" />
        </div>

        <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
          Tu próxima contratación
          <br />
          <span className="text-white/35">puede empezar acá.</span>
        </h2>

        <div className="mt-9 flex justify-center">
          <Link
            href="/register?role=company"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Crear cuenta empresarial gratis
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
