"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shuffle } from "lucide-react";

const assignments = [
  ["#1001", "Agent A"],
  ["#1002", "Agent B"],
  ["#1003", "Agent C"],
  ["#1004", "Agent D"],
  ["#1005", "Agent E"],
  ["#1006", "Agent A"],
];

export function Assignment() {
  return (
    <section className="px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Asignación
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Las solicitudes se asignan
              <br />
              <span className="text-white/35">automáticamente.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
              Sin carreras. No es{" "}
              <span className="text-white/60">
                "el primero que hace click se la queda"
              </span>
              .
            </p>

            <p className="mt-4 max-w-lg text-base leading-7 text-white/45">
              El sistema distribuye las solicitudes de manera secuencial entre
              los Agents elegibles.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-full bg-amber-500/10 blur-[80px]" />

            <div className="relative rounded-[30px] border border-white/[0.08] bg-[#111116] p-6 shadow-2xl shadow-black/30 sm:p-8">
              <div className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/25">
                <Shuffle className="h-3.5 w-3.5" />
                Distribución secuencial
              </div>

              <div className="space-y-2">
                {assignments.map(([request, agent], index) => (
                  <motion.div
                    key={request}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                  >
                    <span className="text-xs text-white/40">
                      Solicitud {request}
                    </span>

                    <ArrowRight className="h-3 w-3 text-white/15" />

                    <span className="text-xs font-medium text-amber-300/80">
                      {agent}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
