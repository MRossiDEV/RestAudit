"use client";

import { motion } from "framer-motion";
import {
  Award,
  BriefcaseBusiness,
  Camera,
  IdCard,
  Timer,
  Video,
} from "lucide-react";

const items = [
  { icon: Camera, label: "Fotos" },
  { icon: Video, label: "Videos" },
  { icon: Camera, label: "Portfolio" },
  { icon: BriefcaseBusiness, label: "Experiencia" },
  { icon: IdCard, label: "Habilidades" },
  { icon: Award, label: "Certificaciones" },
  { icon: Timer, label: "Disponibilidad" },
];

export function Evidence() {
  return (
    <section className="px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Evidencia profesional
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            No leas solamente su experiencia.
            <br />
            <span className="text-white/35">Mirá lo que hace.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                  <Icon className="h-4 w-4" />
                </div>

                <span className="text-sm text-white/60">{item.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
