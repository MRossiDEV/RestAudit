"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Globe2, MapPin, Play, QrCode } from "lucide-react";
import Link from "next/link";

function HeroProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="relative"
    >
      <div className="absolute -inset-8 rounded-[50px] bg-violet-600/10 blur-[90px]" />

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#111116] shadow-2xl shadow-black/40">
        <div className="h-28 bg-gradient-to-br from-violet-900/60 via-[#17121f] to-[#0d1019]" />

        <div className="relative px-6 pb-6">
          <div className="-mt-12 flex items-end justify-between">
            <div className="h-24 w-24 overflow-hidden rounded-3xl border-4 border-[#111116] bg-[#1c1c24]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=85"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mb-1 flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-300">
              <BadgeCheck className="h-3.5 w-3.5" />
              VORA Interviewed
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">María</h3>
              <span className="text-xs text-white/30">#123456</span>
            </div>

            <p className="mt-1 text-sm text-violet-300">Chef Ejecutiva</p>

            <div className="mt-2 flex flex-wrap gap-3 text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                Montevideo · Uruguay
              </span>

              <span>8 años</span>

              <span className="flex items-center gap-1.5 text-emerald-300/70">
                <Globe2 className="h-3.5 w-3.5" />
                Internacional
              </span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              ["GRILL", "6 años"],
              ["GESTIÓN", "Equipos"],
              ["PASTELERÍA", "Avanzada"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3"
              >
                <div className="text-[9px] uppercase tracking-wider text-white/25">
                  {label}
                </div>

                <div className="mt-1 text-xs font-medium text-white/70">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <div className="relative h-20 flex-1 overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=400&q=85"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative h-20 flex-1 overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=85"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative flex h-20 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-violet-500/10">
              <Play className="h-5 w-5 fill-current text-violet-300" />
              <span className="absolute bottom-2 text-[9px] text-white/50">
                VIDEO
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-violet-400/10 bg-violet-400/[0.035] p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/30">
                  Professional Profile
                </div>

                <div className="mt-1 text-sm font-semibold text-white">
                  vora.com/talent/maria
                </div>
              </div>

              <QrCode className="h-5 w-5 text-violet-300" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TalentHero() {
  return (
    <section className="relative px-5 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-44">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-3 py-1.5 text-xs font-medium text-violet-300">
              Para profesionales de gastronomía y hospitalidad
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-[74px]">
              Tu carrera merece
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-blue-300 bg-clip-text text-transparent">
                más que un CV.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/55 sm:text-xl">
              Creá una identidad profesional que puedas llevar con vos durante
              toda tu carrera.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register?role=talent"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Crear mi perfil gratis
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

          <HeroProfileCard />
        </div>
      </div>
    </section>
  );
}
