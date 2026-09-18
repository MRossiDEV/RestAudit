"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Check } from "lucide-react";

const reasons = [
  "6 años en cocina caliente",
  "Experiencia en parrilla",
  "Servicio de alto volumen",
  "Disponible turno noche",
  "Montevideo",
  "VORA Interviewed",
];

export function Matching() {
  return (
    <section className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-8 rounded-full bg-blue-500/10 blur-[80px]" />

            <div className="relative rounded-[30px] border border-white/[0.08] bg-[#111116] p-6 shadow-2xl shadow-black/30 sm:p-8">
              <div className="flex items-center gap-3 border-b border-white/[0.06] pb-5">
                <div className="h-12 w-12 overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=85"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">María</span>
                    <BadgeCheck className="h-4 w-4 text-violet-300" />
                  </div>

                  <div className="text-xs text-white/35">
                    Chef Ejecutiva · VORA Interviewed
                  </div>
                </div>
              </div>

              <div className="mt-6 text-[10px] uppercase tracking-[0.18em] text-white/25">
                ¿Por qué aparece este profesional?
              </div>

              <div className="mt-4 space-y-2.5">
                {reasons.map((reason, index) => (
                  <motion.div
                    key={reason}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.07 }}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-400/15">
                      <Check className="h-3 w-3 text-blue-300" />
                    </div>

                    <span className="text-sm text-white/60">{reason}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Matching
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Encontrá coincidencias
              <br />
              <span className="text-white/35">que tengan sentido.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
              En lugar de un porcentaje abstracto, VORA te muestra por qué un
              profesional aparece en tu búsqueda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
