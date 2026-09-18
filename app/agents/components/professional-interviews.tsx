"use client";

import { motion } from "framer-motion";
import { ArrowDown, HeartHandshake } from "lucide-react";

const flow = [
  "Talent solicita una entrevista",
  "Pago confirmado",
  "VORA asigna la solicitud",
  "El Agent recibe la entrevista",
  "El Agent realiza la entrevista",
  "Evaluación estructurada",
  "Revisión de calidad VORA",
  "VORA Interviewed",
  "Compensación al Agent",
];

export function ProfessionalInterviews() {
  return (
    <section
      id="entrevistas"
      className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              <HeartHandshake className="h-3.5 w-3.5" />
              Entrevistas profesionales
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Realizá entrevistas
              <br />
              <span className="text-white/35">profesionales VORA.</span>
            </h2>

            <div className="mt-7 inline-flex items-baseline gap-2 rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] px-5 py-4">
              <span className="text-3xl font-semibold">$35</span>
              <span className="text-sm text-white/40">
                USD por entrevista aprobada
              </span>
            </div>

            <p className="mt-6 max-w-lg text-sm leading-6 text-white/45">
              El monto está asociado a la entrevista profesional completada y
              aprobada según las reglas de VORA.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-amber-500/10 blur-[80px]" />

            <div className="relative rounded-[30px] border border-white/[0.08] bg-[#111116] p-6 shadow-2xl shadow-black/30 sm:p-8">
              <div className="space-y-0">
                {flow.map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-semibold text-amber-300">
                        {index + 1}
                      </div>

                      <div className="text-sm text-white/70">{step}</div>
                    </div>

                    {index < flow.length - 1 && (
                      <div className="flex h-6 items-center pl-4">
                        <ArrowDown className="h-3 w-3 text-white/15" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
