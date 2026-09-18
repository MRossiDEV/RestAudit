"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Clock3, Search } from "lucide-react";
import Link from "next/link";

function SearchVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="relative"
    >
      <div className="absolute -inset-8 rounded-[50px] bg-blue-600/10 blur-[90px]" />

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#111116] shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/25">
              Búsqueda activa
            </div>
            <div className="mt-1 text-sm font-semibold">Chef Ejecutivo</div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-blue-400/10 px-3 py-1.5 text-xs text-blue-300">
            <Search className="h-3 w-3" />
            Matching
          </div>
        </div>

        <div className="space-y-3 p-5">
          {[
            {
              name: "María",
              id: "#123456",
              role: "Chef Ejecutiva",
              meta: "Montevideo · 8 años",
              skills: ["Cocina caliente", "Gestión", "Parrilla"],
              availability: "Disponible",
              status: "VORA Interviewed",
            },
            {
              name: "Carlos",
              id: "#284731",
              role: "Cocinero Profesional",
              meta: "Buenos Aires · 6 años",
              skills: ["Parrilla", "Producción", "Cocina caliente"],
              availability: "Disponible",
              status: "VORA Verified",
            },
            {
              name: "Lucía",
              id: "#391824",
              role: "Pastelera",
              meta: "Santiago · 5 años",
              skills: ["Pastelería", "Panadería", "Decoración"],
              availability: "En 15 días",
              status: "VORA Interviewed",
            },
          ].map((candidate) => (
            <div
              key={candidate.id}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{candidate.name}</span>
                    <span className="text-[10px] text-white/25">
                      {candidate.id}
                    </span>
                  </div>

                  <div className="mt-0.5 text-xs text-violet-300">
                    {candidate.role}
                  </div>

                  <div className="mt-1 text-[10px] text-white/35">
                    {candidate.meta}
                  </div>
                </div>

                <BadgeCheck className="h-4 w-4 shrink-0 text-violet-300" />
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {candidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white/[0.05] px-2 py-1 text-[9px] text-white/45"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-white/[0.05] pt-3">
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-300/80">
                  <Clock3 className="h-3 w-3" />
                  {candidate.availability}
                </span>

                <span className="rounded-full bg-violet-400/10 px-2.5 py-1 text-[9px] text-violet-300">
                  {candidate.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function CompanyHero() {
  return (
    <section className="relative px-5 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-44">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.07] px-3 py-1.5 text-xs font-medium text-blue-300">
              Para restaurantes · hoteles · catering · hospitalidad
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-[74px]">
              Encontrá el talento que
              <br />
              <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-sky-300 bg-clip-text text-transparent">
                tu negocio necesita.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/55 sm:text-xl">
              Buscá profesionales especializados según experiencia,
              habilidades, ubicación, disponibilidad y las necesidades
              específicas de tu búsqueda.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register?role=company"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Crear cuenta empresarial gratis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-medium text-white/75 transition hover:bg-white/[0.07]"
              >
                Ver cómo funciona
              </a>
            </div>
          </motion.div>

          <SearchVisual />
        </div>
      </div>
    </section>
  );
}
