"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Globe2 } from "lucide-react";
import Link from "next/link";
import { HeroProfile } from "./hero-profile";

export function Hero() {
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
              <Globe2 className="h-3.5 w-3.5" />
              Red profesional especializada en gastronomía y hospitalidad
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-[74px]">
              Tu carrera.
              <br />
              Tu identidad
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-blue-300 bg-clip-text text-transparent">
                profesional.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/55 sm:text-xl">
              Creá una vez tu perfil profesional VORA. Mostrá lo que sabés
              hacer, construí tu trayectoria y dejá que empresas de
              gastronomía y hospitalidad te encuentren.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register?role=talent"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Crear mi perfil gratis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/register?role=company"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-medium text-white/75 transition hover:bg-white/[0.07]"
              >
                Soy una empresa
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/35">
              {[
                "Perfil gratis",
                "Perfil permanente",
                "Link + QR",
                "Fotos y portfolio",
                "Oportunidades internacionales",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <HeroProfile />
        </div>
      </div>
    </section>
  );
}
