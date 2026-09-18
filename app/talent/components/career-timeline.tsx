"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const timeline = [
  { year: "2019", role: "Cocinero" },
  { year: "2021", role: "Chef de Partie" },
  { year: "2023", role: "Sous Chef" },
  { year: "2026", role: "Chef Ejecutivo" },
];

export function CareerTimeline() {
  return (
    <section className="px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              La idea central
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Crealo una vez.
              <br />
              <span className="text-white/35">Seguí construyéndolo.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
              Tu experiencia no desaparece cuando cambiás de trabajo.
            </p>

            <p className="mt-4 max-w-lg text-base leading-7 text-white/45">
              Cada nuevo puesto, habilidad, certificación, foto, video o logro
              puede incorporarse a tu trayectoria profesional.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-violet-500/10 blur-[80px]" />

            <div className="relative rounded-[30px] border border-white/[0.08] bg-[#111116] p-6 shadow-2xl shadow-black/30 sm:p-8">
              <div className="mb-6 text-[10px] uppercase tracking-[0.18em] text-white/25">
                Trayectoria profesional
              </div>

              <div className="space-y-0">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 text-right text-xs font-mono text-white/30">
                        {item.year}
                      </div>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet-400/20 bg-violet-400/[0.07]">
                        <div className="h-2 w-2 rounded-full bg-violet-300" />
                      </div>

                      <div className="text-sm font-medium text-white/80">
                        {item.role}
                      </div>
                    </div>

                    {index < timeline.length - 1 && (
                      <div className="flex items-center gap-4 py-1">
                        <div className="w-14" />
                        <div className="flex h-6 w-9 items-center justify-center">
                          <div className="h-full w-px bg-white/[0.08]" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-violet-400/15 bg-violet-400/[0.05] p-4">
                <ArrowDown className="h-4 w-4 text-violet-300" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-violet-300/80">
                    VORA Profile
                  </div>
                  <div className="mt-0.5 text-xs text-white/50">
                    Tu carrera completa en un solo lugar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
