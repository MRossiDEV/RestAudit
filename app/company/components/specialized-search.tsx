"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CakeSlice,
  ChefHat,
  Coffee,
  Cookie,
  Croissant,
  CupSoda,
  Flame,
  Globe2,
  Hotel,
  IdCard,
  Languages,
  MapPin,
  Martini,
  ShieldCheck,
  Timer,
  Users,
  Utensils,
  UtensilsCrossed,
  Video,
} from "lucide-react";

const categories = [
  { icon: ChefHat, label: "Chef" },
  { icon: Utensils, label: "Cocinero" },
  { icon: CakeSlice, label: "Pastelero" },
  { icon: Croissant, label: "Panadero" },
  { icon: Flame, label: "Pizzero" },
  { icon: Flame, label: "Parrillero" },
  { icon: UtensilsCrossed, label: "Sushi" },
  { icon: Coffee, label: "Barista" },
  { icon: Martini, label: "Bartender" },
  { icon: CupSoda, label: "Mozo" },
  { icon: Users, label: "Encargado" },
  { icon: BriefcaseBusiness, label: "Gerente" },
  { icon: UtensilsCrossed, label: "Catering" },
  { icon: Hotel, label: "Hotelería" },
];

const filters = [
  { icon: ChefHat, label: "Especialidad" },
  { icon: Timer, label: "Experiencia" },
  { icon: MapPin, label: "Ubicación" },
  { icon: Timer, label: "Disponibilidad" },
  { icon: BriefcaseBusiness, label: "Tipo de trabajo" },
  { icon: IdCard, label: "Habilidades" },
  { icon: Languages, label: "Idiomas" },
  { icon: Globe2, label: "Movilidad" },
  { icon: Globe2, label: "Internacional" },
  { icon: ShieldCheck, label: "VORA Verified" },
  { icon: BadgeCheck, label: "VORA Interviewed" },
];

export function SpecializedSearch() {
  return (
    <section className="px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Búsqueda especializada
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Buscá exactamente
            <br />
            <span className="text-white/35">lo que necesitás.</span>
          </h2>
        </div>

        <div className="mt-14">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
            Categorías
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((category, index) => {
              const Icon = category.icon;

              return (
                <motion.div
                  key={category.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-sm text-white/55"
                >
                  <Icon className="h-4 w-4 text-blue-300" />
                  {category.label}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-12">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
            Filtros
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {filters.map((filter, index) => {
              const Icon = filter.icon;

              return (
                <motion.div
                  key={filter.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3"
                >
                  <Icon className="h-4 w-4 shrink-0 text-blue-300" />
                  <span className="text-xs text-white/60">{filter.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
