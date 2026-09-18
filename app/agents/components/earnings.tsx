"use client";

import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

const tiers = [
  { count: "1", label: "entrevista aprobada", amount: "$35" },
  { count: "5", label: "entrevistas", amount: "$175" },
  { count: "10", label: "entrevistas", amount: "$350" },
  { count: "20", label: "entrevistas", amount: "$700" },
];

export function Earnings() {
  return (
    <section className="px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            <DollarSign className="h-3.5 w-3.5" />
            Ingresos
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Un modelo basado en
            <br />
            <span className="text-white/35">trabajo realizado.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.count}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7 text-center"
            >
              <div className="text-4xl font-semibold">{tier.count}</div>
              <div className="mt-1 text-xs text-white/35">{tier.label}</div>

              <div className="mt-5 text-2xl font-semibold text-amber-300">
                {tier.amount}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-lg text-center text-xs leading-5 text-white/30">
          Los ingresos dependen de la cantidad de solicitudes asignadas,
          aceptadas, realizadas y aprobadas.
        </p>
      </div>
    </section>
  );
}
