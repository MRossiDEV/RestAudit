"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { profileFeatures } from "../data";

export function ProfessionalIdentity() {
  return (
    <section id="profesionales" className="px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Tu identidad profesional
            </div>

            <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Crealo una vez.
              <br />
              <span className="text-white/35">Seguí construyéndolo.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
              VORA no crea un CV para una sola búsqueda. Crea una identidad
              profesional que puede acompañarte durante toda tu carrera.
            </p>

            <p className="mt-4 max-w-lg text-base leading-7 text-white/45">
              Tu próximo trabajo, curso, certificación, habilidad o proyecto
              puede convertirse en una nueva parte de tu perfil.
            </p>

            <Link
              href="/register?role=talent"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white"
            >
              Crear mi perfil gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {profileFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 font-semibold">{feature.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-white/40">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
