"use client";

import { motion } from "framer-motion";
import { Camera, User, Video } from "lucide-react";

const cards = [
  {
    icon: User,
    title: "Identidad profesional",
    items: [
      "Foto profesional",
      "Nombre",
      "Especialidad",
      "VORA ID",
      "Ubicación",
      "Experiencia",
      "Disponibilidad",
      "Idiomas",
    ],
  },
  {
    icon: Camera,
    title: "Portfolio",
    items: [
      "Platos",
      "Preparaciones",
      "Trabajos realizados",
      "Proyectos",
      "Fotografías",
      "Categorías de trabajo",
    ],
  },
];

const videoExamples = [
  "Preparación",
  "Parrilla",
  "Pastelería",
  "Sushi",
  "Bartending",
  "Servicio",
  "Técnicas",
  "Trabajo en cocina",
];

export function BuildFeatures() {
  return (
    <section className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Lo que podés construir
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Mostrá lo que sabés hacer,
            <br />
            <span className="text-white/35">no solo lo que sabés escribir.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {cards.map((card, cardIndex) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: cardIndex * 0.1 }}
                className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-6 font-semibold">{card.title}</h3>

                <ul className="mt-4 space-y-2">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-white/50"
                    >
                      <div className="h-1 w-1 rounded-full bg-violet-400/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-fuchsia-400/15 bg-fuchsia-400/[0.03] p-7"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-300">
              <Video className="h-5 w-5" />
            </div>

            <h3 className="mt-6 font-semibold">Video</h3>

            <p className="mt-3 text-sm leading-6 text-white/45">
              Los perfiles VORA Interviewed pueden incorporar evidencia en
              video de su trabajo.
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {videoExamples.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[10px] text-white/50"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
