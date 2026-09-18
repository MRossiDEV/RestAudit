"use client";

import { motion } from "framer-motion";
import { Check, Search } from "lucide-react";

const filters = [
  "Cocina caliente",
  "Parrilla",
  "Gestión de equipo",
  "Alta demanda",
  "Disponibilidad nocturna",
];

export function SearchDemo() {
  return (
    <section className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Búsqueda
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              No busques solamente CVs.
              <br />
              <span className="text-white/35">Buscá personas.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
              Definí el perfil que necesitás y dejá que la plataforma te
              muestre profesionales que encajan con tu búsqueda.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-full bg-blue-500/10 blur-[80px]" />

            <div className="relative rounded-[30px] border border-white/[0.08] bg-[#111116] p-6 shadow-2xl shadow-black/30 sm:p-8">
              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5">
                <Search className="h-4 w-4 shrink-0 text-white/30" />
                <div>
                  <div className="text-sm font-semibold">Chef Ejecutivo</div>
                  <div className="text-xs text-white/35">
                    Montevideo · 8+ años experiencia
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                {filters.map((filter) => (
                  <div
                    key={filter}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-400/15">
                      <Check className="h-3 w-3 text-blue-300" />
                    </div>

                    <span className="text-sm text-white/60">{filter}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
