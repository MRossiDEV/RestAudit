"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, HeartHandshake, Users } from "lucide-react";
import Link from "next/link";

function AgentVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="relative"
    >
      <div className="absolute -inset-8 rounded-[50px] bg-amber-600/10 blur-[90px]" />

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#111116] shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/25">
              VORA Agent
            </div>
            <div className="mt-1 text-sm font-semibold">Montevideo</div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1.5 text-xs text-amber-300">
            <Users className="h-3 w-3" />
            Activo
          </div>
        </div>

        <div className="space-y-3 p-5">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/25">
                  Nueva solicitud
                </div>
                <div className="mt-1 text-sm font-semibold">
                  Entrevista profesional #1006
                </div>
              </div>
              <HeartHandshake className="h-5 w-5 text-amber-300" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              ["14", "Activas"],
              ["6", "Disponibles"],
              ["38", "Completadas"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 text-center"
              >
                <div className="text-lg font-semibold">{value}</div>
                <div className="mt-0.5 text-[9px] uppercase tracking-wider text-white/30">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-amber-400/15 bg-amber-400/[0.05] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <BadgeCheck className="h-4 w-4" />
              Entrevista aprobada
            </div>
            <div className="mt-1.5 text-xs text-white/45">
              $35 acreditados a tu cuenta
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AgentHero() {
  return (
    <section className="relative px-5 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-44">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-3 py-1.5 text-xs font-medium text-amber-300">
              VORA Agents
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-[74px]">
              Construí VORA
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                en tu mercado.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/55 sm:text-xl">
              Convertite en un representante independiente de la red VORA y
              ayudá a conectar profesionales y empresas de gastronomía y
              hospitalidad.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register?role=agent"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Quiero ser VORA Agent
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-medium text-white/75 transition hover:bg-white/[0.07]"
              >
                Cómo funciona
              </a>
            </div>
          </motion.div>

          <AgentVisual />
        </div>
      </div>
    </section>
  );
}
