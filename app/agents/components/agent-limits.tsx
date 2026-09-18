"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

const limits = [
  "Garantizar empleo",
  "Garantizar contratación",
  "Negociar contratos laborales en nombre de VORA",
  "Garantizar visas o permisos de trabajo",
  "Fabricar credenciales",
  "Manipular el matching",
  "Presentarse como empleados de VORA",
];

export function AgentLimits() {
  return (
    <section className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Límites del rol
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Tu rol tiene límites claros.
          </h2>

          <p className="mt-5 text-base leading-7 text-white/40">
            Un VORA Agent no:
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl space-y-2.5">
          {limits.map((limit, index) => (
            <motion.div
              key={limit}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-3.5"
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-red-400/10">
                <X className="h-3 w-3 text-red-400" />
              </div>

              <span className="text-sm text-white/55">{limit}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
