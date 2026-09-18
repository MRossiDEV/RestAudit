import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { hiringFeatures } from "../data";
import { CandidateSearchVisual } from "./candidate-search";

export function Companies() {
  return (
    <section id="empresas" className="px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Para restaurantes, hoteles y empresas
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              No busques
              <br />
              <span className="text-white/35">solamente CVs.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
              Definí exactamente qué profesional necesitás y descubrí talento
              especializado dentro de la red VORA.
            </p>

            <div className="mt-8 space-y-5">
              {hiringFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div key={feature.title} className="flex gap-4">
                    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold">
                        {feature.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-white/40">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/register?role=company"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black"
            >
              Crear cuenta empresarial gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <CandidateSearchVisual />
        </div>
      </div>
    </section>
  );
}
