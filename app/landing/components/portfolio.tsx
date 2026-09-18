import { Check } from "lucide-react";
import { PortfolioVisual } from "./portfolio-visual";

export function Portfolio() {
  return (
    <section className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Portfolio profesional
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Tu trabajo también
              <br />
              <span className="text-white/35">habla por vos.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
              Una profesión práctica necesita algo más que texto. Mostrá
              platos, técnicas, eventos, proyectos y habilidades reales.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Fotos de trabajos",
                "Videos de habilidades",
                "Experiencia profesional",
                "Especialidades",
                "Certificaciones",
                "Proyectos y eventos",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-white/60"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10">
                    <Check className="h-3 w-3 text-emerald-400" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <PortfolioVisual />
        </div>
      </div>
    </section>
  );
}
