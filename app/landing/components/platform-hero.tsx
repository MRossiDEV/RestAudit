"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  HeartHandshake,
  User,
} from "lucide-react";
import Link from "next/link";

function NetworkVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="relative"
    >
      <div className="absolute -inset-8 rounded-[50px] bg-violet-600/10 blur-[90px]" />

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#111116] p-6 shadow-2xl shadow-black/40 sm:p-7">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/25">
              La red VORA
            </div>
            <div className="mt-1 text-sm font-semibold">
              Talent · Empresas · Agents
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            En vivo
          </div>
        </div>

        {/* Talent node */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-5 flex items-center gap-3 rounded-2xl border border-violet-400/15 bg-violet-400/[0.05] p-4"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
            <User className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">María</span>
              <BadgeCheck className="h-3.5 w-3.5 text-violet-300" />
            </div>
            <div className="mt-0.5 text-xs text-white/40">
              Chef Ejecutiva · VORA Interviewed
            </div>
          </div>
        </motion.div>

        {/* Connection */}
        <div className="my-3 flex items-center gap-3 pl-6">
          <div className="h-8 w-px bg-gradient-to-b from-violet-400/40 to-blue-400/40" />
          <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] text-white/50">
            <HeartHandshake className="h-3 w-3 text-white/40" />
            Match
          </div>
        </div>

        {/* Company node */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex items-center gap-3 rounded-2xl border border-blue-400/15 bg-blue-400/[0.05] p-4"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
            <Building2 className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Restaurante Brasa</span>
            </div>
            <div className="mt-0.5 text-xs text-white/40">
              Busca Chef Ejecutivo · Montevideo
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            ["Profesionales", "Red activa"],
            ["Empresas", "Contratando"],
            ["Agents", "Locales"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 text-center"
            >
              <div className="text-xs font-semibold">{label}</div>
              <div className="mt-0.5 text-[9px] uppercase tracking-wider text-white/30">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function PlatformHero() {
  return (
    <section className="relative px-5 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-44">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/60">
              La red profesional de gastronomía y hospitalidad
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-[74px]">
              Donde el talento
              <br />
              y las empresas
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-amber-300 bg-clip-text text-transparent">
                se encuentran.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/55 sm:text-xl">
              VORA conecta profesionales, empresas y representantes locales en
              una sola red especializada en gastronomía y hospitalidad.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/talent"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Crear mi perfil
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/company"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-medium text-white/75 transition hover:bg-white/[0.07]"
              >
                Buscar talento
              </Link>
            </div>
          </motion.div>

          <NetworkVisual />
        </div>
      </div>
    </section>
  );
}
