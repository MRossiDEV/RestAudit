"use client";

import { motion } from "framer-motion";
import { Building2, Globe2, User } from "lucide-react";

const columns = [
  {
    icon: User,
    title: "Talent",
    color: "text-violet-300",
    bg: "bg-violet-500/10",
    items: [
      "Encontrar profesionales",
      "Ayudar a incorporar perfiles",
      "Verificar información",
      "Realizar entrevistas profesionales",
      "Ayudar a mejorar perfiles",
      "Construir relaciones locales",
    ],
  },
  {
    icon: Building2,
    title: "Companies",
    color: "text-blue-300",
    bg: "bg-blue-500/10",
    items: [
      "Identificar empresas relevantes",
      "Ayudar a incorporarlas a VORA",
      "Verificar empresas",
      "Entender sus necesidades de contratación",
      "Desarrollar relaciones comerciales locales",
    ],
  },
  {
    icon: Globe2,
    title: "Network",
    color: "text-amber-300",
    bg: "bg-amber-500/10",
    items: [
      "Crear presencia VORA en su mercado",
      "Detectar demanda",
      "Identificar oportunidades",
      "Fortalecer la red local",
    ],
  },
];

export function WhatAgentDoes() {
  return (
    <section className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            El rol
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            ¿Qué hace un VORA Agent?
          </h2>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {columns.map((column, colIndex) => {
            const Icon = column.icon;

            return (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: colIndex * 0.1 }}
                className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${column.bg} ${column.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-6 font-semibold">{column.title}</h3>

                <ul className="mt-4 space-y-2.5">
                  {column.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-white/50"
                    >
                      <div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
