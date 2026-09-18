"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { talentSteps } from "../data";

export function TalentFlow() {
  return (
    <section
      id="como-funciona"
      className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Para profesionales
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Un perfil para
            <br />
            <span className="text-white/35">toda tu carrera.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-white/40">
            Empezá gratis y construí sobre el mismo perfil con el tiempo.
          </p>
        </div>

        <div className="mt-16 grid gap-3 md:grid-cols-4">
          {talentSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="relative rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6"
            >
              <div className="text-xs font-bold tracking-widest text-violet-400">
                {step.number}
              </div>

              <h3 className="mt-6 font-semibold">{step.title}</h3>

              <p className="mt-2 text-sm leading-6 text-white/40">
                {step.description}
              </p>

              {index < talentSteps.length - 1 && (
                <ChevronRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-white/20 md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
