"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Globe2,
  Link2,
  MapPin,
  Search,
  Share2,
  Sparkles,
  Timer,
} from "lucide-react";

const items = [
  { icon: Building2, label: "Empresas pueden encontrarte" },
  { icon: Search, label: "Búsquedas especializadas" },
  { icon: Sparkles, label: "Matching" },
  { icon: MapPin, label: "Oportunidades locales" },
  { icon: Globe2, label: "Oportunidades internacionales" },
  { icon: Timer, label: "Interés en relocación" },
  { icon: Link2, label: "Disponibilidad" },
  { icon: Share2, label: "Compartí tu perfil directamente" },
];

export function Opportunities() {
  return (
    <section className="px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Oportunidades
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            No buscás solamente trabajo.
            <br />
            <span className="text-white/35">Construís oportunidades.</span>
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
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
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
