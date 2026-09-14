
"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Camera,
  ChefHat,
  Check,
  ChevronRight,
  Clock3,
  Coffee,
  ExternalLink,
  Globe2,
  LockKeyhole,
  MapPin,
  Play,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Utensils,
  Video,
} from "lucide-react";
import Link from "next/link";

const talentCategories = [
  { label: "Chefs", icon: ChefHat },
  { label: "Cocineros", icon: Utensils },
  { label: "Pastelería", icon: Award },
  { label: "Panadería", icon: Utensils },
  { label: "Bartenders", icon: Coffee },
  { label: "Baristas", icon: Coffee },
  { label: "Mozos", icon: Users },
  { label: "Sommelier", icon: WineIcon },
  { label: "Encargados", icon: BriefcaseBusiness },
  { label: "Producción", icon: Utensils },
  { label: "Hotelería", icon: BriefcaseBusiness },
  { label: "Catering", icon: Utensils },
];

const searchCandidates = [
  {
    firstName: "María",
    id: "#123456",
    title: "Chef Ejecutiva",
    location: "Montevideo, Uruguay",
    experience: "8 años",
    specialties: ["Fine Dining", "Gestión", "Pastelería"],
    match: 96,
    availability: "Disponible",
    relocation: "Internacional",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=500&q=85",
  },
  {
    firstName: "Carlos",
    id: "#284731",
    title: "Cocinero Profesional",
    location: "Buenos Aires, Argentina",
    experience: "6 años",
    specialties: ["Parrilla", "Producción", "Cocina caliente"],
    match: 93,
    availability: "Disponible",
    relocation: "Regional",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=500&q=85",
  },
  {
    firstName: "Lucía",
    id: "#391824",
    title: "Pastelera",
    location: "Santiago, Chile",
    experience: "5 años",
    specialties: ["Pastelería", "Panadería", "Decoración"],
    match: 91,
    availability: "En 15 días",
    relocation: "Internacional",
    image:
      "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=500&q=85",
  },
];

const profileFeatures = [
  {
    icon: Camera,
    title: "Mostrá tu trabajo",
    description:
      "Fotos, platos, proyectos, eventos y trabajos que demuestran lo que sabés hacer.",
  },
  {
    icon: Video,
    title: "Usá video",
    description:
      "Mostrá técnicas, preparación, presentación, liderazgo o cualquier habilidad profesional.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Construí tu trayectoria",
    description:
      "Cada trabajo, curso, certificación y nueva habilidad puede incorporarse a tu historia profesional.",
  },
  {
    icon: BadgeCheck,
    title: "Un perfil que permanece",
    description:
      "No desaparece cuando conseguís trabajo. Crece con vos y se convierte en tu identidad profesional.",
  },
];

const businessFeatures = [
  {
    icon: Search,
    title: "Encontrá talento específico",
    description:
      "Buscá por profesión, especialidad, experiencia, ubicación, disponibilidad, idiomas y mucho más.",
  },
  {
    icon: Users,
    title: "Descubrí profesionales que todavía no conocías",
    description:
      "VORA puede encontrar candidatos que coincidan con lo que necesitás, incluso cuando no sabías que existían.",
  },
  {
    icon: ShieldCheck,
    title: "Accedé gratis a perfiles compartidos",
    description:
      "Si un profesional te envía su perfil VORA, solo necesitás una cuenta empresarial gratuita para verlo.",
  },
];

const howItWorks = [
  {
    number: "01",
    title: "Creás tu perfil gratis",
    description:
      "Completás tu información profesional, experiencia, habilidades, especialidades, fotos, videos y disponibilidad.",
  },
  {
    number: "02",
    title: "Tu perfil crece con tu carrera",
    description:
      "Cada nuevo trabajo, curso, certificación o proyecto puede incorporarse a tu trayectoria.",
  },
  {
    number: "03",
    title: "Compartís un solo enlace",
    description:
      "Usá tu URL o QR en Instagram, LinkedIn, WhatsApp, email, tarjetas, CV o donde quieras.",
  },
  {
    number: "04",
    title: "También podés ser descubierto",
    description:
      "Empresas de Uruguay, la región y otros países pueden encontrarte cuando buscan profesionales con tu perfil.",
  },
];

const employerSteps = [
  {
    number: "01",
    title: "Registrá tu empresa gratis",
    description:
      "Creá una cuenta VORA para formar parte de la red de empresas y acceder a perfiles profesionales.",
  },
  {
    number: "02",
    title: "Encontrá talento",
    description:
      "Buscá directamente o decile a VORA qué profesional necesitás.",
  },
  {
    number: "03",
    title: "Evaluá los perfiles",
    description:
      "Experiencia, habilidades, portfolio, idiomas, disponibilidad, ubicación y más.",
  },
  {
    number: "04",
    title: "Contratá",
    description:
      "Cuando VORA genera una oportunidad de contratación, podés acceder a herramientas de descubrimiento y recruitment.",
  },
];

const socialPlatforms = [
  { label: "Instagram", icon: InstagramIcon },
  { label: "Facebook", icon: FacebookIcon },
  { label: "LinkedIn", icon: LinkedInIcon },
  { label: "WhatsApp", icon: WhatsAppIcon },
];

function SocialIcon({
  icon: Icon,
  className = "h-4 w-4",
}: {
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  return <Icon className={className} />;
}

export default function TalentPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07070a] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[8%] top-[3%] h-[550px] w-[550px] rounded-full bg-violet-600/10 blur-[150px]" />
        <div className="absolute right-[3%] top-[22%] h-[500px] w-[500px] rounded-full bg-blue-600/[0.07] blur-[150px]" />
        <div className="absolute bottom-[10%] left-[35%] h-[450px] w-[450px] rounded-full bg-fuchsia-600/[0.05] blur-[150px]" />
      </div>

      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-[#07070a]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/talent" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-black text-black">
              V
            </div>

            <div>
              <div className="text-sm font-bold tracking-tight">VORA</div>
              <div className="-mt-0.5 text-[9px] font-medium uppercase tracking-[0.22em] text-violet-400">
                Talent
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#profesionales"
              className="text-sm text-white/55 transition hover:text-white"
            >
              Profesionales
            </a>

            <a
              href="#perfil"
              className="text-sm text-white/55 transition hover:text-white"
            >
              Tu perfil
            </a>

            <a
              href="#empresas"
              className="text-sm text-white/55 transition hover:text-white"
            >
              Empresas
            </a>

            <a
              href="#como-funciona"
              className="text-sm text-white/55 transition hover:text-white"
            >
              Cómo funciona
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/talent/register"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white sm:block"
            >
              Crear perfil
            </Link>

            <Link
              href="/company/register"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Soy una empresa
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-5 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-3 py-1.5 text-xs font-medium text-violet-300">
                <Globe2 className="h-3.5 w-3.5" />
                Talento gastronómico sin fronteras
              </div>

              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">
                Tu talento.
                <br />
                Tu perfil.
                <br />
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-blue-300 bg-clip-text text-transparent">
                  Sin fronteras.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-white/55 sm:text-xl">
                Creá tu perfil profesional una sola vez. Mantenelo actualizado,
                compartilo donde quieras y conectá con oportunidades en Uruguay,
                la región y el mundo.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/talent/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Crear mi perfil gratis
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/company/register"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/[0.07]"
                >
                  Buscar talento
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/35">
                <span className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  Gratis para profesionales
                </span>

                <span className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  Perfil permanente
                </span>

                <span className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  URL + QR
                </span>

                <span className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  Uruguay + mundo
                </span>
              </div>
            </motion.div>

            {/* Hero profile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-8 rounded-[50px] bg-violet-600/10 blur-[80px]" />

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

                    <div className="mb-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                      Disponible
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">María</h3>
                      <span className="text-xs text-white/30">#123456</span>
                    </div>

                    <p className="mt-1 text-sm text-violet-300">
                      Chef Ejecutiva
                    </p>

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
                      ["Cocina", "Profesional"],
                      ["Pastelería", "Avanzada"],
                      ["Gestión", "Equipos"],
                    ].map(([a, b]) => (
                      <div
                        key={a}
                        className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3"
                      >
                        <div className="text-[10px] uppercase tracking-wider text-white/30">
                          {a}
                        </div>

                        <div className="mt-1 text-xs font-medium text-white/75">
                          {b}
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
                          Perfil profesional
                        </div>

                        <div className="mt-1 text-sm font-semibold text-white">
                          vora.talent/maria
                        </div>
                      </div>

                      <QrCode className="h-5 w-5 text-violet-300" />
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-[10px] text-white/35">
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      CV · Portfolio · Experiencia · Disponibilidad
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-white/[0.05] bg-white/[0.015] px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/30">
            Profesionales de gastronomía y hospitalidad
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {talentCategories.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-sm text-white/55"
              >
                <Icon className="h-4 w-4 text-white/30" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professionals */}
      <section id="profesionales" className="px-5 py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                Tu identidad profesional
              </div>

              <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Crealo una vez.
                <br />
                <span className="text-white/35">
                  Seguí construyéndolo durante años.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
                Tu perfil VORA no pertenece a una búsqueda laboral específica.
                Es tu identidad profesional dentro de la gastronomía y la
                hospitalidad.
              </p>

              <p className="mt-4 max-w-lg text-base leading-7 text-white/45">
                Compartilo con quien quieras, actualizalo cuando quieras y
                llevátelo con vos de un trabajo al siguiente.
              </p>

              <Link
                href="/talent/register"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white"
              >
                Crear mi perfil gratis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {profileFeatures.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/40">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Permanent profile */}
      <section
        id="perfil"
        className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_1fr]">
            {/* Profile visual */}
            <div>
              <div className="relative rounded-[30px] border border-white/[0.08] bg-[#111116] p-5 shadow-2xl shadow-black/30 sm:p-7">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                      Perfil profesional
                    </div>

                    <div className="mt-1 text-sm font-medium text-white/70">
                      vora.talent/maria
                    </div>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05]">
                    <ExternalLink className="h-4 w-4 text-white/50" />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=85"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">María</div>
                      <div className="text-[10px] text-white/25">
                        #123456
                      </div>
                    </div>

                    <div className="mt-1 text-xs text-violet-300">
                      Chef Ejecutiva
                    </div>

                    <div className="mt-1 text-[10px] text-white/30">
                      Montevideo · Uruguay · 8 años
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  <div className="rounded-2xl bg-white/[0.035] p-3">
                    <div className="text-[9px] text-white/25">
                      EXPERIENCIA
                    </div>
                    <div className="mt-1 text-xs text-white/65">
                      8 años
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/[0.035] p-3">
                    <div className="text-[9px] text-white/25">
                      PORTFOLIO
                    </div>
                    <div className="mt-1 text-xs text-white/65">
                      28 trabajos
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/[0.035] p-3">
                    <div className="text-[9px] text-white/25">
                      IDIOMAS
                    </div>
                    <div className="mt-1 text-xs text-white/65">
                      ES · EN
                    </div>
                  </div>
                </div>

                {/* Sharing */}
                <div className="mt-6 rounded-2xl border border-violet-400/10 bg-violet-400/[0.035] p-4">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/25">
                    Compartí tu perfil
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-2 text-[10px] text-white/55">
                      <QrCode className="h-3.5 w-3.5" />
                      QR
                    </div>

                    {socialPlatforms.map((platform) => (
                      <div
                        key={platform.label}
                        className="flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-2 text-[10px] text-white/55"
                      >
                        <SocialIcon
                          icon={platform.icon}
                          className="h-3.5 w-3.5"
                        />
                        {platform.label}
                      </div>
                    ))}

                    <div className="flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-2 text-[10px] text-white/55">
                      <ExternalLink className="h-3.5 w-3.5" />
                      Link directo
                    </div>
                  </div>
                </div>

                {/* Career evolution */}
                <div className="mt-6 border-t border-white/[0.06] pt-5">
                  <div className="mb-3 text-[10px] uppercase tracking-[0.15em] text-white/25">
                    Tu perfil evoluciona con vos
                  </div>

                  <div className="space-y-2">
                    {[
                      ["Hoy", "Experiencia + habilidades"],
                      ["Próximo trabajo", "Nueva experiencia"],
                      ["Próximo curso", "Nueva certificación"],
                      ["Próximo proyecto", "Nuevo portfolio"],
                    ].map(([time, event]) => (
                      <div
                        key={time}
                        className="flex items-center gap-3 rounded-xl bg-white/[0.02] px-3 py-2"
                      >
                        <div className="w-20 text-[9px] text-white/25">
                          {time}
                        </div>

                        <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />

                        <div className="text-[10px] text-white/45">
                          {event}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div>
              <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                Tu CV digital permanente
              </div>

              <h2 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                No vuelvas a empezar
                <br />
                <span className="text-white/35">desde cero.</span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
                Tu perfil VORA es la fuente de verdad de tu trayectoria
                profesional. No necesitás reconstruir tu historia cada vez que
                aparece una oportunidad.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: QrCode,
                    title: "Un enlace y un QR",
                    description:
                      "Compartí tu perfil directamente o mediante un código QR.",
                  },
                  {
                    icon: Globe2,
                    title: "De tu ciudad al mundo",
                    description:
                      "Mostrá si estás disponible para oportunidades locales, regionales o internacionales.",
                  },
                  {
                    icon: BriefcaseBusiness,
                    title: "Cada nuevo trabajo suma",
                    description:
                      "Tu carrera se convierte en una trayectoria permanente, no en una colección de CVs.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Vos controlás lo que compartís",
                    description:
                      "Elegí qué información es pública y qué información querés compartir con determinadas empresas.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div>
                        <div className="text-sm font-semibold">
                          {item.title}
                        </div>

                        <div className="mt-1 text-xs leading-5 text-white/40">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="px-5 py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                Portfolio profesional
              </div>

              <h2 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                No digas solamente que sabés hacerlo.
                <span className="text-white/35"> Mostralo.</span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
                Tus platos, tus técnicas, tus proyectos, tus eventos y tu
                trabajo en equipo pueden formar parte de una identidad
                profesional que sigue creciendo.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Fotos de tus trabajos",
                  "Videos de tus habilidades",
                  "Experiencia profesional",
                  "Especialidades gastronómicas",
                  "Certificaciones y formación",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-white/60"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10">
                      <Check className="h-3 w-3 text-emerald-400" />
                    </div>

                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl">
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=700&q=85"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="aspect-square overflow-hidden rounded-3xl">
                  <img
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=85"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-violet-500/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-transparent" />

                  <div className="relative text-center">
                    <Video className="mx-auto h-7 w-7 text-violet-300" />

                    <div className="mt-2 text-xs text-white/50">
                      Videos de trabajo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMPLOYERS */}
      <section
        id="empresas"
        className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Para restaurantes, hoteles y empresas
              </div>

              <h2 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Encontrá talento.
                <br />
                <span className="text-white/35">
                  Incluso cuando todavía no lo conocés.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
                VORA conecta empresas con profesionales de gastronomía y
                hospitalidad. Podés recibir perfiles directamente de
                candidatos o buscar personas que coincidan con lo que
                necesitás.
              </p>

              <div className="mt-8 space-y-5">
                {businessFeatures.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div key={feature.title} className="flex gap-4">
                      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold">
                          {feature.title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-white/40">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/company/register"
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black"
              >
                Crear cuenta empresarial gratis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <p className="mt-3 text-xs text-white/25">
                Sin costo para acceder a perfiles que los profesionales
                compartan directamente con tu empresa.
              </p>
            </div>

            {/* Candidate discovery UI */}
            <div className="rounded-[30px] border border-white/[0.08] bg-[#101015] p-4 shadow-2xl shadow-black/30 sm:p-6">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
                <div>
                  <div className="text-xs text-white/30">
                    Búsqueda VORA
                  </div>

                  <div className="mt-1 font-semibold">
                    Executive Chef · Internacional
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  18 coincidencias
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {searchCandidates.map((candidate, index) => (
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
                              <h3 className="font-semibold">
                                {candidate.firstName}
                              </h3>

                              <span className="text-[10px] text-white/25">
                                {candidate.id}
                              </span>
                            </div>

                            <div className="mt-0.5 text-xs text-violet-300">
                              {candidate.title}
                            </div>

                            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-white/35">
                              <span>{candidate.location}</span>
                              <span>{candidate.experience}</span>
                            </div>
                          </div>

                          <div className="shrink-0 text-right">
                            <div className="text-[9px] uppercase tracking-wider text-white/25">
                              Match
                            </div>

                            <div className="mt-0.5 text-lg font-bold text-emerald-300">
                              {candidate.match}%
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {candidate.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="rounded-full bg-white/[0.05] px-2 py-1 text-[9px] text-white/45"
                            >
                              {specialty}
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

                      <div className="flex items-center gap-1.5 text-[10px] text-white/30">
                        <Globe2 className="h-3 w-3" />
                        {candidate.relocation}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Discovery value */}
              <div className="mt-5 rounded-2xl border border-blue-400/10 bg-blue-400/[0.035] p-4">
                <div className="flex items-start gap-3">
                  <Search className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />

                  <div>
                    <div className="text-xs font-semibold text-white/70">
                      La diferencia está en descubrir talento
                    </div>

                    <div className="mt-1 text-[10px] leading-5 text-white/35">
                      Si un profesional te envía su perfil directamente,
                      acceder es gratis. Cuando VORA encuentra talento que tu
                      empresa todavía no conocía, ahí empieza el servicio de
                      discovery y recruitment.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business registration barrier */}
      <section className="px-5 py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[36px] border border-white/[0.08] bg-gradient-to-br from-blue-950/30 via-[#101015] to-violet-950/20 p-7 sm:p-10 lg:p-14">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Un acceso simple
                </div>

                <h2 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                  ¿Te compartieron un perfil?
                  <br />
                  <span className="text-white/35">
                    Entrá a VORA gratis.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-base leading-7 text-white/45">
                  Los profesionales pueden compartir su perfil directamente
                  con las empresas que quieran. Para acceder al perfil
                  completo, la empresa solo necesita una cuenta VORA gratuita.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    ["01", "Te comparten", "Un perfil VORA"],
                    ["02", "Te registrás", "Gratis como empresa"],
                    ["03", "Accedés", "Al perfil completo"],
                  ].map(([number, title, description]) => (
                    <div
                      key={number}
                      className="rounded-2xl border border-white/[0.06] bg-black/20 p-4"
                    >
                      <div className="text-[10px] font-bold tracking-widest text-blue-300">
                        {number}
                      </div>

                      <div className="mt-4 text-sm font-semibold">
                        {title}
                      </div>

                      <div className="mt-1 text-xs text-white/35">
                        {description}
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/company/register"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black"
                >
                  Crear cuenta empresarial gratis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="relative">
                <div className="absolute -inset-8 rounded-full bg-blue-500/10 blur-[70px]" />

                <div className="relative rounded-[28px] border border-white/[0.08] bg-[#0b0b10] p-5">
                  <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-black text-black">
                      V
                    </div>

                    <div>
                      <div className="text-xs text-white/30">
                        Perfil compartido
                      </div>

                      <div className="text-sm font-semibold">
                        vora.talent/maria
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-xl">
                        <img
                          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=85"
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <div className="font-semibold">María</div>

                        <div className="text-xs text-violet-300">
                          Chef Ejecutiva
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-violet-400/10 bg-violet-400/[0.04] p-3">
                      <div className="flex items-center gap-2">
                        <LockKeyhole className="h-4 w-4 text-violet-300" />

                        <div className="text-xs font-semibold">
                          Cuenta empresarial requerida
                        </div>
                      </div>

                      <div className="mt-2 text-[10px] leading-5 text-white/35">
                        Registrate gratis para acceder al perfil profesional
                        completo.
                      </div>
                    </div>

                    <div className="mt-4 flex h-10 items-center justify-center rounded-xl bg-white text-xs font-semibold text-black">
                      Crear cuenta gratis
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy / ownership */}
      <section className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10">
            <ShieldCheck className="h-6 w-6 text-violet-300" />
          </div>

          <h2 className="mt-7 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Vos controlás
            <br />
            <span className="text-white/35">lo que compartís.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            Tu perfil te pertenece. Podés compartirlo con una empresa, hacerlo
            visible dentro de VORA o mantener determinada información privada.
            VORA no necesita esconder tus datos para proteger su modelo de
            negocio.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
            <div className="rounded-3xl border border-emerald-400/10 bg-emerald-400/[0.03] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Check className="h-4 w-4 text-emerald-400" />
                Compartí lo que quieras
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-white/45">
                {[
                  "Nombre",
                  "Foto",
                  "Experiencia",
                  "Especialidades",
                  "Habilidades",
                  "Portfolio",
                  "Disponibilidad",
                  "Idiomas",
                  "Relocalización",
                  "CV",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-emerald-400/60" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-violet-400/10 bg-violet-400/[0.025] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <LockKeyhole className="h-4 w-4 text-violet-300" />
                Vos decidís la visibilidad
              </div>

              <div className="mt-4 space-y-2 text-xs text-white/45">
                {[
                  "Perfil público",
                  "Visible para empresas VORA",
                  "Información privada",
                  "Compartir directamente con una empresa",
                  "Pausar perfil cuando quieras",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-violet-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="como-funciona"
        className="px-5 py-28 lg:px-8 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Para profesionales
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Un perfil para toda tu carrera.
            </h2>

            <p className="mt-5 text-base leading-7 text-white/40">
              Crealo una vez. Después dejá que tu trayectoria lo haga crecer.
            </p>
          </div>

          <div className="mt-16 grid gap-3 md:grid-cols-4">
            {howItWorks.map((step, index) => (
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

                {index < howItWorks.length - 1 && (
                  <ChevronRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-white/20 md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Employer workflow */}
      <section className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Para empresas
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Tu próximo profesional
              <br />
              <span className="text-white/35">
                puede estar en VORA.
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-white/40">
              Registrate gratis, encontrá talento y usá VORA cuando necesitás
              descubrir profesionales que todavía no están en tu radar.
            </p>
          </div>

          <div className="mt-16 grid gap-3 md:grid-cols-4">
            {employerSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6"
              >
                <div className="text-xs font-bold tracking-widest text-blue-400">
                  {step.number}
                </div>

                <h3 className="mt-6 font-semibold">{step.title}</h3>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  {step.description}
                </p>

                {index < employerSteps.length - 1 && (
                  <ChevronRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-white/20 md:block" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/company/register"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black"
            >
              Crear cuenta empresarial gratis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sharing */}
      <section className="px-5 py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[36px] border border-white/[0.08] bg-gradient-to-br from-violet-950/30 via-[#101015] to-blue-950/20 p-7 sm:p-10 lg:p-14">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                  Compartilo donde quieras
                </div>

                <h2 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                  Tu perfil puede vivir
                  <br />
                  <span className="text-white/35">en cualquier lugar.</span>
                </h2>

                <p className="mt-6 max-w-xl text-base leading-7 text-white/45">
                  Poné tu perfil VORA en tu bio, compartilo por WhatsApp,
                  enviá el enlace por email o imprimí tu QR. Cada vez que
                  alguien nuevo quiera verlo, puede entrar a VORA y registrarse
                  como empresa.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {socialPlatforms.map((platform) => (
                    <div
                      key={platform.label}
                      className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-black/20 px-4 py-3"
                    >
                      <SocialIcon
                        icon={platform.icon}
                        className="h-4 w-4 text-white/60"
                      />

                      <span className="text-sm text-white/55">
                        {platform.label}
                      </span>
                    </div>
                  ))}

                  <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-black/20 px-4 py-3">
                    <ExternalLink className="h-4 w-4 text-white/50" />
                    <span className="text-sm text-white/55">
                      Email
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-black/20 px-4 py-3">
                    <QrCode className="h-4 w-4 text-white/50" />
                    <span className="text-sm text-white/55">
                      Tarjetas con QR
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-10 rounded-full bg-violet-500/10 blur-[70px]" />

                  <div className="relative rounded-[30px] border border-white/10 bg-white p-6 shadow-2xl">
                    <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-black p-5 sm:h-56 sm:w-56">
                      <div className="grid grid-cols-7 gap-1 opacity-90">
                        {Array.from({ length: 49 }).map((_, i) => {
                          const filled =
                            (i * 17 + i * i * 3) % 7 < 3 ||
                            [0, 1, 6, 7, 13, 35, 41, 42, 47, 48].includes(i);

                          return (
                            <div
                              key={i}
                              className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
                                filled ? "bg-white" : "bg-transparent"
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <div className="text-xs font-semibold text-black">
                        vora.talent/maria
                      </div>

                      <div className="mt-1 text-[10px] text-black/45">
                        Escaneá · Abrí · Compartí
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace principle */}
      <section className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10">
            <Search className="h-6 w-6 text-blue-300" />
          </div>

          <h2 className="mt-7 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            VORA no vende CVs.
            <br />
            <span className="text-white/35">
              Conecta talento con oportunidades.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            Si un profesional te comparte su perfil, podés acceder gratis con
            una cuenta empresarial. El valor de VORA aparece cuando necesitás
            descubrir profesionales que todavía no conocés, encontrar
            coincidencias específicas o realizar una búsqueda de talento.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
            <div className="rounded-3xl border border-emerald-400/10 bg-emerald-400/[0.03] p-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Check className="h-4 w-4 text-emerald-400" />
                Candidato te encontró
              </div>

              <p className="mt-3 text-xs leading-6 text-white/40">
                El profesional comparte su perfil directamente con tu
                empresa. Te registrás gratis y podés verlo.
              </p>
            </div>

            <div className="rounded-3xl border border-violet-400/10 bg-violet-400/[0.03] p-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Search className="h-4 w-4 text-violet-300" />
                VORA encontró al candidato
              </div>

              <p className="mt-3 text-xs leading-6 text-white/40">
                Necesitás talento específico y VORA busca dentro de su red,
                encuentra coincidencias y facilita el proceso de recruitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-5 py-32 lg:px-8 lg:py-40">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />

        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black">
            <ChefHat className="h-6 w-6" />
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Tu carrera cambia.
            <br />
            <span className="text-white/35">Tu perfil crece con ella.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/40">
            Creá tu perfil profesional gratis hoy. Después simplemente
            actualizalo cada vez que tengas algo nuevo que mostrar.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/talent/register"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Crear mi perfil gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/company/register"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-7 py-4 text-sm font-medium text-white/70 transition hover:bg-white/[0.05] hover:text-white"
            >
              Soy una empresa
            </Link>
          </div>
        </div>
      </section>

      {/* VORA Intelligence */}
      <section className="border-t border-white/[0.05] bg-[#08080b] px-5 py-16 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              <BarChart3 className="h-3.5 w-3.5" />
              VORA Intelligence
            </div>

            <h3 className="mt-3 text-2xl font-semibold">
              El talento es una parte de VORA.
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/35">
              VORA también desarrolla herramientas de inteligencia,
              auditoría, operaciones, IA y optimización para restaurantes y
              empresas gastronómicas.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.04] hover:text-white"
          >
            Conocer VORA
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-xs text-white/25 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[10px] font-black text-black">
              V
            </div>

            <span>VORA Talent</span>
          </div>

          <div>
            Plataforma especializada en talento gastronómico y hospitalidad.
          </div>
        </div>
      </footer>

      {/* Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#08080b]/90 p-3 backdrop-blur-xl md:hidden">
        <Link
          href="/talent/register"
          className="flex h-12 items-center justify-center rounded-full bg-white text-sm font-semibold text-black"
        >
          Crear mi perfil gratis
        </Link>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Local SVG social icons                                                     */
/* -------------------------------------------------------------------------- */

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6h1.7V3.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.7v8h3.3Z" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M5.1 8.1H1.8V22h3.3V8.1ZM3.45 2A2 2 0 1 0 3.4 6a2 2 0 0 0 .05-4ZM22.2 13.9c0-4.2-2.2-6.1-5.1-6.1-2.3 0-3.3 1.3-3.9 2.2V8.1H10V22h3.2v-6.9c0-1.8.3-3.5 2.5-3.5 2.1 0 2.1 2 2.1 3.6V22H22.2v-8.1Z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.2 11.6a8.2 8.2 0 0 1-12.1 7.2L3 20l1.2-4.9a8.2 8.2 0 1 1 16-3.5Z" />
      <path d="M8.5 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c-.1.1-.1.3 0 .5.5.8 1.2 1.5 2 2 .2.1.4.1.5 0l.7-.8c.1-.2.3-.2.6-.1l1.8.8c.2.1.3.3.3.5 0 .5-.2 1-.6 1.3-.4.4-1 .5-1.5.4-1.4-.3-3.1-1.4-4.5-2.8-1.3-1.3-2.3-2.9-2.6-4.1-.1-.5 0-1 .3-1.4.2-.2.4-.4.7-.5Z" />
    </svg>
  );
}

function WineIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 3h8l-.6 5.1a3.5 3.5 0 0 1-6.8 0L8 3Z" />
      <path d="M12 12v8" />
      <path d="M9 21h6" />
    </svg>
  );
}
