"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const steps = [
  { number: "01", title: "Creá tu perfil" },
  { number: "02", title: "Mostrá tu experiencia" },
  { number: "03", title: "Compartilo" },
  { number: "04", title: "Construí tu trayectoria" },
  { number: "05", title: "Las empresas pueden encontrarte" },
];

const interviewSteps = [
  "VORA Professional Interview",
  "Entrevista humana",
  "VORA Interviewed",
  "Perfil profesional",
  "Más información para matching",
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Cómo funciona
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Un camino simple.
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-xl">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/[0.07] text-sm font-bold text-violet-300">
                    {step.number}
                  </div>

                  <div className="text-sm font-medium text-white/80">
                    {step.title}
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex h-8 items-center pl-6">
                    <ArrowDown className="h-3.5 w-3.5 text-white/15" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-fuchsia-400/15 bg-fuchsia-400/[0.03] p-7">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
              Opcional
            </div>

            <div className="mt-5 space-y-0">
              {interviewSteps.map((step, index) => (
                <div key={step}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-fuchsia-500/10 text-xs font-semibold text-fuchsia-300">
                      {index + 1}
                    </div>

                    <div className="text-sm text-white/60">{step}</div>
                  </div>

                  {index < interviewSteps.length - 1 && (
                    <div className="flex h-6 items-center pl-4">
                      <ArrowDown className="h-3 w-3 text-white/15" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
