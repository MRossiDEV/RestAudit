"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const steps = [
  "Creá tu cuenta",
  "Creá una búsqueda",
  "Aplicá filtros",
  "Explorá profesionales",
  "Desbloqueá candidatos",
  "Iniciá el proceso de contratación",
];

export function CompanyHowItWorks() {
  return (
    <section
      id="como-funciona"
      className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Cómo funciona
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Un proceso simple.
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
                    {String(index + 1).padStart(2, "0")}
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
        </div>
      </div>
    </section>
  );
}
