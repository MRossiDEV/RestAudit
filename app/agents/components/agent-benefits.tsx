"use client";

import { motion } from "framer-motion";
import {
  Globe2,
  MapPin,
  TrendingUp,
  Users,
  Wifi,
  Clock3,
} from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Red profesional",
    text: "Conectá con profesionales y empresas de hospitalidad.",
  },
  {
    icon: MapPin,
    title: "Territorio",
    text: "Desarrollá tu mercado local.",
  },
  {
    icon: Clock3,
    title: "Trabajo flexible",
    text: "Rol independiente.",
  },
  {
    icon: Wifi,
    title: "Red profesional",
    text: "Construí relaciones dentro de la industria.",
  },
  {
    icon: Globe2,
    title: "Expansión internacional",
    text: "Participá en mercados más allá de tu territorio inicial a medida que VORA se expande.",
  },
  {
    icon: TrendingUp,
    title: "Progresión de Agent",
    text: "Niveles futuros basados en actividad, calidad, confiabilidad y resultados.",
  },
];

export function AgentBenefits() {
  return (
    <section className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Beneficios
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Más que una comisión.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 font-semibold">{benefit.title}</h3>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  {benefit.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
