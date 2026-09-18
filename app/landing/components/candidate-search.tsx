"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Clock3,
  Search,
  Sparkles,
} from "lucide-react";
import { candidates } from "../data";

export function CandidateSearchVisual() {
  return (
    <div className="rounded-[30px] border border-white/[0.08] bg-[#101015] p-4 shadow-2xl shadow-black/30 sm:p-6">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
        <div>
          <div className="text-xs text-white/30">Hiring Search</div>

          <div className="mt-1 font-semibold">
            Executive Chef · Internacional
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-blue-400/10 px-3 py-1.5 text-xs text-blue-300">
          <Search className="h-3 w-3" />
          Matching
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {candidates.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-4"
          >
            <div className="flex gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                <img
                  src={candidate.image}
                  alt=""
                  className="h-full w-full object-cover"
                />

                <div className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-[#15151a] bg-emerald-400" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{candidate.name}</h3>

                      <span className="text-[10px] text-white/25">
                        {candidate.id}
                      </span>
                    </div>

                    <div className="mt-0.5 text-xs text-violet-300">
                      {candidate.role}
                    </div>

                    <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-white/35">
                      <span>{candidate.location}</span>
                      <span>{candidate.experience}</span>
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
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.05] pt-3">
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-300/80">
                <Clock3 className="h-3 w-3" />
                {candidate.availability}
              </div>

              <div className="rounded-full bg-violet-400/10 px-2.5 py-1 text-[9px] text-violet-300">
                {candidate.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-blue-400/10 bg-blue-400/[0.035] p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />

          <div>
            <div className="text-xs font-semibold text-white/70">
              Matching basado en datos profesionales
            </div>

            <div className="mt-1 text-[10px] leading-5 text-white/35">
              VORA puede cruzar experiencia, habilidades, tareas,
              disponibilidad, ubicación y otros requisitos de la búsqueda.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
