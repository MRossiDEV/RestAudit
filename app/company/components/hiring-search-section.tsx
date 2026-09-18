"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const steps = [
  "Creá una búsqueda",
  "Buscá gratis",
  "Encontrá profesionales",
  "Desbloqueá los que te interesan",
  "Acumulás los desbloqueos",
  "Facturación",
];

export function HiringSearchSection() {
  return (
    <section
      id="busqueda"
      className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Hiring Search
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Pagás cuando realmente
            <br />
            <span className="text-white/35">estás buscando talento.</span>
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-xl">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.09 }}
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/[0.07] text-sm font-bold text-blue-300">
                    {index + 1}
                  </div>

                  <div className="text-sm font-medium text-white/80">
                    {step}
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

          <div className="mt-10 space-y-2.5">
            {[
              "Sin suscripción mensual.",
              "Sin comprar créditos por adelantado.",
              "Cada búsqueda tiene su propio período de contratación.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-5 py-3.5 text-center text-sm text-white/55"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
