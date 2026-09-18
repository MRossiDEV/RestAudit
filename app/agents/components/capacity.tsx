"use client";

import { motion } from "framer-motion";
import { Gauge } from "lucide-react";

export function Capacity() {
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
            <div className="absolute -inset-8 rounded-full bg-amber-500/10 blur-[80px]" />

            <div className="relative rounded-[30px] border border-white/[0.08] bg-[#111116] p-6 shadow-2xl shadow-black/30 sm:p-8">
              <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/25">
                <Gauge className="h-3.5 w-3.5" />
                Tu cola de trabajo
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>Entrevistas activas</span>
                  <span className="font-mono font-semibold text-white/70">
                    14 / 20
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "70%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
                  <div className="text-2xl font-semibold">14</div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-white/30">
                    Activas
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] p-4 text-center">
                  <div className="text-2xl font-semibold text-emerald-300">
                    6
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-emerald-300/60">
                    Disponibles
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Capacidad
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Vos controlás
              <br />
              <span className="text-white/35">tu capacidad.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
              Máximo{" "}
              <span className="font-semibold text-white/60">
                20 entrevistas activas
              </span>{" "}
              en cola.
            </p>

            <p className="mt-4 max-w-lg text-base leading-7 text-white/45">
              Cuando tu capacidad está completa, no recibís nuevas asignaciones
              hasta liberar espacio. Sin presión de aceptar trabajo ilimitado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
