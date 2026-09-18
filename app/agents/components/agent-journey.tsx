"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const steps = [
  "Aplicar",
  "Revisión",
  "Verificación",
  "Aprobación",
  "Agent activo",
  "Recibir solicitudes",
  "Realizar entrevistas",
  "Construir la red local",
  "Crecer con VORA",
];

export function AgentJourney() {
  return (
    <section
      id="como-funciona"
      className="px-5 py-28 lg:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            El camino
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Cómo funciona.
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-md">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/[0.07] text-xs font-bold text-amber-300">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="text-sm font-medium text-white/80">
                    {step}
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex h-7 items-center pl-5">
                    <ArrowDown className="h-3 w-3 text-white/15" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
