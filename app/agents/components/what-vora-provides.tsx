"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Cog,
  CreditCard,
  Database,
  FileCheck,
  Globe as GlobeIcon,
  Layers,
  MapPin,
  Search,
  Server,
  ShieldCheck,
  Users,
  UserCheck,
  Workflow,
} from "lucide-react";

const voraItems = [
  { icon: Layers, label: "Plataforma" },
  { icon: Database, label: "Base de datos de talento" },
  { icon: Building2, label: "Red de empresas" },
  { icon: Search, label: "Tecnología de matching" },
  { icon: FileCheck, label: "Framework de entrevistas" },
  { icon: ShieldCheck, label: "Procesos de verificación" },
  { icon: Workflow, label: "Sistema de asignación" },
  { icon: CreditCard, label: "Sistema de pagos" },
  { icon: Server, label: "Infraestructura administrativa" },
  { icon: Cog, label: "Tecnología de perfiles profesionales" },
];

const agentItems = [
  { icon: MapPin, label: "Presencia local" },
  { icon: Users, label: "Relaciones" },
  { icon: ShieldCheck, label: "Trabajo de verificación" },
  { icon: UserCheck, label: "Entrevistas" },
  { icon: Building2, label: "Conocimiento del mercado" },
  { icon: GlobeIcon, label: "Desarrollo de la red" },
];

export function WhatVoraProvides() {
  return (
    <section className="px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            La división de trabajo
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Vos construís la red.
            <br />
            <span className="text-white/35">VORA construye la plataforma.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-amber-400/15 bg-amber-400/[0.03] p-7"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">
              VORA provee
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {voraItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-amber-300" />
                    <span className="text-xs text-white/60">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              El Agent aporta
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {agentItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-white/50" />
                    <span className="text-xs text-white/60">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
