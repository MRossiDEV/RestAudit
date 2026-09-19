import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChefHat,
  Globe2,
  Handshake,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
  UtensilsCrossed,
  BriefcaseBusiness,
  QrCode,
} from "lucide-react";

import { LandingHeader } from "@/components/landing-header";
import { Footer } from "./landing/components/footer";

const audiences: {
  icon: typeof UserRound;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  accent: "violet" | "blue" | "amber";
}[] = [
  {
    icon: UserRound,
    eyebrow: "PARA PROFESIONALES",
    title: "Tu carrera gastronómica merece una identidad propia.",
    description:
      "Creá un perfil profesional permanente, mostrá tu experiencia y hacé que restaurantes y empresas puedan encontrarte por lo que realmente sabés hacer.",
    href: "/talent",
    cta: "Crear mi perfil gratis",
    accent: "violet",
  },
  {
    icon: Building2,
    eyebrow: "PARA RESTAURANTES",
    title: "Encontrá personas que realmente encajan con tu negocio.",
    description:
      "Buscá talento especializado en gastronomía, filtrá por experiencia, habilidades y disponibilidad, y desbloqueá solamente los contactos que te interesan.",
    href: "/company",
    cta: "Buscar talento",
    accent: "blue",
  },
  {
    icon: Users,
    eyebrow: "PARA AGENTES",
    title: "Representá VORA y desarrollá tu mercado local.",
    description:
      "Conectá profesionales y empresas de tu zona, verificá perfiles y ayudá a construir una red gastronómica profesional en tu ciudad.",
    href: "/agents",
    cta: "Ser VORA Agent",
    accent: "amber",
  },
];

const categories = [
  { name: "Cocineros", icon: ChefHat },
  { name: "Chefs", icon: UtensilsCrossed },
  { name: "Pizzaiolos", icon: UtensilsCrossed },
  { name: "Panaderos", icon: ChefHat },
  { name: "Pasteleros", icon: Sparkles },
  { name: "Baristas", icon: Sparkles },
  { name: "Sushiman", icon: UtensilsCrossed },
  { name: "Parrilleros", icon: ChefHat },
  { name: "Bartenders", icon: Sparkles },
  { name: "Mozos", icon: UserRound },
  { name: "Ayudantes de cocina", icon: ChefHat },
  { name: "Encargados", icon: BriefcaseBusiness },
];

const steps = [
  {
    number: "01",
    title: "El profesional crea su perfil",
    description:
      "Experiencia, habilidades, especialidades, disponibilidad, imágenes y trayectoria quedan reunidas en un único perfil profesional.",
  },
  {
    number: "02",
    title: "VORA entiende el perfil",
    description:
      "La información permite identificar especialidades y encontrar oportunidades donde las características del profesional realmente coinciden.",
  },
  {
    number: "03",
    title: "La empresa encuentra talento",
    description:
      "Los restaurantes pueden buscar y filtrar profesionales según sus necesidades reales antes de decidir a quién contactar.",
  },
  {
    number: "04",
    title: "La conexión sucede",
    description:
      "La empresa desbloquea el contacto del profesional seleccionado y comienza directamente la conversación.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050507] text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[15%] top-[-10%] h-[700px] w-[700px] rounded-full bg-violet-700/[0.10] blur-[180px]" />
        <div className="absolute right-[-15%] top-[20%] h-[700px] w-[700px] rounded-full bg-blue-700/[0.08] blur-[180px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[600px] w-[600px] rounded-full bg-fuchsia-700/[0.05] blur-[180px]" />
      </div>

      <LandingHeader
        cta={{
          href: "/register?role=company",
          label: "Buscar talento",
        }}
        secondaryCta={{
          href: "/register?role=talent",
          label: "Crear perfil",
        }}
      />

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative isolate min-h-[720px] overflow-hidden border-b border-white/[0.06]">
        {/* HERO IMAGE */}
        <div className="absolute inset-0 -z-20">
          <img
            src="/brand/main-hero.png"
            alt="Profesionales de gastronomía conectados con restaurantes a través de VORA"
            className="h-full w-full object-cover object-center"
          />

          {/* dark cinematic overlays */}
          <div className="absolute inset-0 bg-[#050507]/5" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#050507] via-[#050507]/70 to-[#050507]/10" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/10" />
        </div>

        <div className="mx-auto flex min-h-[720px] max-w-7xl items-center px-5 py-24 lg:px-8">
          <div className="max-w-3xl">
            {/* EYEBROW */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-4 py-2 text-xs font-medium tracking-[0.18em] text-violet-200">
              <UtensilsCrossed className="h-3.5 w-3.5" />
              TALENTO PARA GASTRONOMÍA & HOSPITALITY
            </div>

            {/* TITLE */}
            <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Donde el talento
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-blue-300 bg-clip-text text-transparent">
                encuentra su lugar.
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl">
              VORA es la red profesional especializada en gastronomía y
              hospitality que conecta restaurantes con las personas que
              realmente necesitan.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/45">
              Cocineros, chefs, pizzaiolos, panaderos, baristas, bartenders,
              mozos, encargados y profesionales de toda la industria.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register?role=talent"
                className="group inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Crear mi perfil gratis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/company"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/25 hover:bg-white/[0.08]"
              >
                Soy restaurante / empresa
              </Link>
            </div>

            {/* TRUST */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/45">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-violet-300" />
                Perfiles profesionales
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-300" />
                Talento verificado
              </div>

              <div className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-amber-300" />
                Red internacional
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FADE */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050507] to-transparent" />
      </section>

      {/* =========================================================
          POSITIONING
      ========================================================= */}
<section className="relative isolate overflow-hidden border-b border-white/[0.05] px-5 py-20 lg:px-8 lg:py-28">
  {/* Background image */}
  <div className="absolute inset-0 -z-20">
    <img
      src="/brand/multi-talent.png"
      alt=""
      className="h-full w-full object-cover object-center"
    />
  </div>

  {/* Dark cinematic overlay */}
  <div className="absolute inset-0 -z-10 bg-[#07070a]/10" />

  {/* Stronger left-side readability */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07070a]/95 via-[#07070a]/80 to-[#07070a]/45" />

  {/* Bottom / top fades */}
  <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#07070a] to-transparent" />
  <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-[#07070a]/60 to-transparent" />

  {/* Subtle VORA violet atmosphere */}
  <div className="pointer-events-none absolute -left-32 top-1/2 -z-10 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-violet-700/[0.08] blur-[140px]" />

  <div className="relative mx-auto max-w-7xl">
    <div className="max-w-3xl">
      <p className="text-xs font-semibold tracking-[0.2em] text-violet-300">
        UNA RED HECHA PARA LA INDUSTRIA
      </p>

      <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
        No somos otra bolsa de trabajo.
        <br />
        <span className="text-white/45">
          Conocemos cómo funciona gastronomía.
        </span>
      </h2>

      <p className="mt-6 max-w-2xl text-base leading-7 text-white/65">
        En gastronomía, contratar no es solamente encontrar a alguien
        disponible. Importan la especialidad, la experiencia, el ritmo
        de trabajo, el tipo de cocina, la disponibilidad y el contexto
        del negocio.
      </p>

      <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">
        VORA está diseñada alrededor de esas variables para acercar a
        cada profesional las oportunidades donde realmente puede encajar.
      </p>
    </div>
  </div>
</section>

      {/* =========================================================
          THREE SIDES
      ========================================================= */}
      <section className="border-b border-white/[0.05] bg-[#08080d] px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-white/35">
              TRES PARTES. UNA MISMA RED.
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              El ecosistema profesional de la gastronomía.
            </h2>

            <p className="mt-5 text-base leading-7 text-white/50">
              Profesionales, empresas y agentes forman una red donde cada parte
              tiene un papel diferente.
            </p>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {audiences.map((item) => {
              const Icon = item.icon;

              const accentClasses = {
                violet: {
                  icon: "text-violet-300",
                  bg: "bg-violet-500/10",
                  border: "hover:border-violet-400/30",
                },
                blue: {
                  icon: "text-blue-300",
                  bg: "bg-blue-500/10",
                  border: "hover:border-blue-400/30",
                },
                amber: {
                  icon: "text-amber-300",
                  bg: "bg-amber-500/10",
                  border: "hover:border-amber-400/30",
                },
              }[item.accent];

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.04] ${accentClasses.border}`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${accentClasses.bg}`}
                  >
                    <Icon className={`h-5 w-5 ${accentClasses.icon}`} />
                  </div>

                  <p
                    className={`mt-7 text-[10px] font-semibold tracking-[0.2em] ${accentClasses.icon}`}
                  >
                    {item.eyebrow}
                  </p>

                  <h3 className="mt-3 text-xl font-semibold leading-tight">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-white/50">
                    {item.description}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-sm font-medium text-white/70 transition group-hover:text-white">
                    {item.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          TALENT VALUE
      ========================================================= */}
      <section className="relative overflow-hidden border-b border-white/[0.05] bg-[#050507] px-5 py-24 lg:px-8 lg:py-32">
        <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-violet-600/[0.08] blur-[150px]" />

        <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-violet-400/15 bg-violet-500/[0.07] px-3 py-2 text-xs text-violet-200">
              <UserRound className="h-3.5 w-3.5" />
              PARA PROFESIONALES
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              Tu perfil no desaparece
              <span className="text-white/40"> cuando termina un trabajo.</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/55">
              Creá una identidad profesional que te acompañe durante tu
              carrera. Sumá experiencia, habilidades, certificaciones,
              imágenes, videos y disponibilidad a medida que evolucionás.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Un perfil profesional permanente",
                "Compartilo con un link o código QR",
                "Mostrá experiencia y especialidades",
                "Recibí oportunidades relevantes",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-white/65"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10">
                    <BadgeCheck className="h-3.5 w-3.5 text-violet-300" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>

            <Link
              href="/talent"
              className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-violet-200"
            >
              Conocé VORA para profesionales
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* DIGITAL CV MOCKUP */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-violet-600/[0.08] blur-[90px]" />

            <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0c0c12] shadow-2xl shadow-black/50">
              <div className="border-b border-white/[0.06] px-6 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.15em] text-white/35">
                    VORA TALENT
                  </span>

                  <div className="flex items-center gap-2 text-[10px] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    DISPONIBLE
                  </div>
                </div>
              </div>

              <div className="p-7">
                <div className="flex items-center gap-5">
                  <div className="h-20 w-20 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/30 to-blue-500/20">
                    <div className="flex h-full items-center justify-center">
                      <UserRound className="h-8 w-8 text-white/50" />
                    </div>
                  </div>

                  <div>
                    <div className="text-xl font-semibold">Profesional</div>

                    <div className="mt-1 text-sm text-white/45">
                      Cocinero · Gastronomía
                    </div>

                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-[10px] text-violet-200">
                      <BadgeCheck className="h-3 w-3" />
                      VORA Verified
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    ["Experiencia", "8 años"],
                    ["Especialidad", "Cocina caliente"],
                    ["Disponibilidad", "Inmediata"],
                    ["Ubicación", "Montevideo"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-4"
                    >
                      <div className="text-[10px] uppercase tracking-wider text-white/30">
                        {label}
                      </div>
                      <div className="mt-1 text-sm text-white/80">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-white/[0.05] bg-white/[0.025] p-4">
                  <div className="text-[10px] uppercase tracking-wider text-white/30">
                    PERFIL PROFESIONAL
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "Cocina",
                      "Producción",
                      "Parrilla",
                      "Liderazgo",
                      "Food Safety",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-white/[0.05] px-2.5 py-1.5 text-[11px] text-white/55"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-xl border border-violet-400/10 bg-violet-500/[0.04] p-4">
                  <div>
                    <div className="text-xs font-medium text-white/70">
                      Perfil permanente
                    </div>
                    <div className="mt-1 text-[11px] text-white/35">
                      Compartible por QR y enlace
                    </div>
                  </div>

                  <QrCode className="h-7 w-7 text-violet-300/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          COMPANY VALUE
      ========================================================= */}
      <section className="border-b border-white/[0.05] bg-[#09090e] px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-3xl border border-blue-400/10 bg-blue-500/[0.025] p-7">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
                  <div>
                    <div className="text-xs font-semibold tracking-[0.15em] text-blue-300">
                      BÚSQUEDA DE TALENTO
                    </div>

                    <div className="mt-1 text-sm text-white/40">
                      Cocinero · Montevideo
                    </div>
                  </div>

                  <Search className="h-5 w-5 text-blue-300/60" />
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    {
                      role: "Cocinero",
                      experience: "6 años",
                      match: "96%",
                      verified: true,
                    },
                    {
                      role: "Chef de cocina",
                      experience: "9 años",
                      match: "93%",
                      verified: true,
                    },
                    {
                      role: "Cocinero",
                      experience: "5 años",
                      match: "89%",
                      verified: false,
                    },
                  ].map((person) => (
                    <div
                      key={`${person.role}-${person.experience}`}
                      className="flex items-center justify-between rounded-2xl border border-white/[0.05] bg-white/[0.025] p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06]">
                          <UserRound className="h-4 w-4 text-white/40" />
                        </div>

                        <div>
                          <div className="text-sm font-medium">
                            {person.role}
                          </div>

                          <div className="mt-1 text-[11px] text-white/35">
                            {person.experience} · Gastronomía
                          </div>

                          {person.verified && (
                            <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-300">
                              <BadgeCheck className="h-3 w-3" />
                              Verificado
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-semibold text-blue-300">
                          {person.match}
                        </div>

                        <div className="text-[9px] uppercase tracking-wider text-white/25">
                          coincidencia
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.05] bg-black/20 px-4 py-3">
                  <span className="text-xs text-white/40">
                    Contactá solamente a los profesionales que te interesan.
                  </span>

                  <ArrowRight className="h-4 w-4 text-blue-300" />
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 rounded-lg border border-blue-400/15 bg-blue-500/[0.07] px-3 py-2 text-xs text-blue-200">
                <Building2 className="h-3.5 w-3.5" />
                PARA RESTAURANTES Y EMPRESAS
              </div>

              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Menos currículums.
                <br />
                <span className="text-white/40">
                  Más personas que realmente encajan.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-white/55">
                Buscá profesionales de gastronomía según las características
                que realmente importan para tu negocio.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  ["Especialidad", "Cocina, parrilla, sushi..."],
                  ["Experiencia", "Años y trayectoria"],
                  ["Disponibilidad", "Cuándo puede comenzar"],
                  ["Ubicación", "Dónde trabaja"],
                  ["Habilidades", "Competencias específicas"],
                  ["Verificación", "Información validada"],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <div className="text-xs font-medium text-white/75">
                      {title}
                    </div>
                    <div className="mt-1 text-[11px] text-white/35">
                      {text}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/company"
                className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-200"
              >
                Conocé VORA para empresas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORIES
      ========================================================= */}
      <section className="border-b border-white/[0.05] bg-[#050507] px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-violet-300">
                ESPECIALIZACIÓN
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Hecho para la industria gastronómica.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-white/40">
              Desde la cocina hasta el salón, VORA está pensada para las
              distintas profesiones que hacen funcionar un negocio
              gastronómico.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <div
                  key={category.name}
                  className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition hover:border-violet-400/20 hover:bg-violet-500/[0.035]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.045] transition group-hover:bg-violet-500/10">
                    <Icon className="h-4 w-4 text-white/40 transition group-hover:text-violet-300" />
                  </div>

                  <div className="mt-4 text-sm font-medium text-white/75">
                    {category.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section className="border-b border-white/[0.05] bg-[#09090e] px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-white/35">
              CÓMO FUNCIONA
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              De un perfil profesional
              <br />
              <span className="text-white/40">a una oportunidad real.</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-0 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative border-white/[0.07] py-7 lg:px-7 lg:py-0 ${
                  index > 0
                    ? "border-t lg:border-l lg:border-t-0"
                    : ""
                }`}
              >
                <div className="text-xs font-semibold tracking-[0.2em] text-violet-300/70">
                  {step.number}
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST / VERIFICATION
      ========================================================= */}
      <section className="relative overflow-hidden border-b border-white/[0.05] bg-[#050507] px-5 py-24 lg:px-8 lg:py-32">
        <div className="absolute left-[20%] top-[20%] h-[400px] w-[400px] rounded-full bg-blue-600/[0.06] blur-[140px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
              <ShieldCheck className="h-6 w-6 text-emerald-300" />
            </div>

            <h2 className="mt-7 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              La confianza también
              <span className="text-white/40"> forma parte del perfil.</span>
            </h2>

            <p className="mt-6 text-base leading-7 text-white/50">
              VORA incorpora procesos de verificación e entrevistas para
              aumentar la información disponible y facilitar conexiones
              profesionales más serias.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-violet-400/10 bg-violet-500/[0.035] p-7">
              <BadgeCheck className="h-6 w-6 text-violet-300" />

              <h3 className="mt-5 text-lg font-semibold">
                VORA Verified
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/45">
                La información profesional del perfil fue revisada dentro del
                proceso de verificación de VORA.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-400/10 bg-blue-500/[0.035] p-7">
              <Handshake className="h-6 w-6 text-blue-300" />

              <h3 className="mt-5 text-lg font-semibold">
                VORA Interviewed
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/45">
                El profesional pasó además por una entrevista dentro de la
                red, agregando una capa adicional de información para las
                empresas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          AGENT
      ========================================================= */}
      <section className="border-b border-white/[0.05] bg-[#09090e] px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-amber-400/15 bg-amber-500/[0.07] px-3 py-2 text-xs text-amber-200">
                <Users className="h-3.5 w-3.5" />
                VORA AGENTS
              </div>

              <h2 className="mt-6 max-w-2xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                La tecnología conecta.
                <br />
                <span className="text-white/40">
                  Las personas construyen la red.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-white/50">
                Los VORA Agents representan la red en ciudades y mercados
                locales. Verifican profesionales y empresas y ayudan a que las
                conexiones digitales puedan convertirse en oportunidades
                reales.
              </p>

              <Link
                href="/agents"
                className="mt-8 inline-flex items-center gap-2 rounded-xl border border-amber-400/15 bg-amber-500/[0.06] px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-500/10"
              >
                Conocé VORA Agents
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -inset-10 rounded-full bg-amber-500/[0.05] blur-[100px]" />

              <div className="relative rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs tracking-[0.15em] text-amber-300">
                      VORA NETWORK
                    </div>

                    <div className="mt-2 text-lg font-semibold">
                      Red local → red global
                    </div>
                  </div>

                  <Globe2 className="h-7 w-7 text-amber-300/60" />
                </div>

                <div className="relative mt-10 h-48">
                  <div className="absolute left-1/2 top-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

                  <div className="absolute left-[8%] top-[35%] flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
                    <UserRound className="h-5 w-5 text-violet-300" />
                  </div>

                  <div className="absolute left-1/2 top-[25%] flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-500/10">
                    <Users className="h-6 w-6 text-amber-300" />
                  </div>

                  <div className="absolute right-[8%] top-[35%] flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
                    <Building2 className="h-5 w-5 text-blue-300" />
                  </div>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                    <div className="text-xs font-medium text-white/60">
                      Profesional
                    </div>
                    <div className="mt-1 text-[10px] text-white/30">
                      Agent · Empresa
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden px-5 py-28 lg:px-8 lg:py-40">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.08] blur-[160px]" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-violet-300">
            VORA TALENT
          </p>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            La próxima oportunidad
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-blue-300 bg-clip-text text-transparent">
              puede empezar acá.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/45">
            Creá tu perfil, encontrá profesionales o formá parte de la red
            VORA en tu ciudad.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/register?role=talent"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Crear perfil gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/register?role=company"
              className="inline-flex h-13 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
            >
              Soy una empresa
            </Link>
          </div>

          <div className="mt-8 text-xs text-white/25">
            Una red profesional creada específicamente para gastronomía y
            hospitality.
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}