"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Check, Globe2, MapPin, Play, QrCode } from "lucide-react";

export function HeroProfile() {
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
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=400&q=85"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative h-20 flex-1 overflow-hidden rounded-2xl">
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
                  vora.talent/maria
                </div>
              </div>

              <QrCode className="h-5 w-5 text-violet-300" />
            </div>

            <div className="mt-3 flex items-center gap-2 text-[10px] text-white/35">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              Experiencia · Skills · Portfolio · Disponibilidad
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
