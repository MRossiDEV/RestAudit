import Link from "next/link";
import { ArrowRight, Building2, User, Users } from "lucide-react";
import { Header } from "./landing/components/header";
import { Hero } from "./landing/components/hero";
import { Footer } from "./landing/components/footer";

const audiences = [
  {
    icon: User,
    title: "Profesionales",
    description:
      "Creá una identidad profesional que puedas llevar con vos durante toda tu carrera.",
    href: "/talent",
    cta: "Crear mi perfil gratis",
    accent: "text-violet-300",
    accentBg: "bg-violet-500/10",
    border: "hover:border-violet-400/30",
  },
  {
    icon: Building2,
    title: "Empresas",
    description:
      "Encontrá el talento que tu negocio necesita con búsquedas especializadas.",
    href: "/company",
    cta: "Buscar talento",
    accent: "text-blue-300",
    accentBg: "bg-blue-500/10",
    border: "hover:border-blue-400/30",
  },
  {
    icon: Users,
    title: "Agents",
    description:
      "Convertite en un representante local de la red VORA y construí tu mercado.",
    href: "/agents",
    cta: "Ser VORA Agent",
    accent: "text-amber-300",
    accentBg: "bg-amber-500/10",
    border: "hover:border-amber-400/30",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07070a] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[5%] top-[2%] h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[160px]" />
        <div className="absolute right-[0%] top-[20%] h-[550px] w-[550px] rounded-full bg-blue-600/[0.07] blur-[160px]" />
        <div className="absolute bottom-[15%] left-[35%] h-[500px] w-[500px] rounded-full bg-amber-600/[0.05] blur-[160px]" />
      </div>

      <Header />
      <Hero />

      {/* Three audiences */}
      <section className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              VORA Talent
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Una red, tres caminos.
            </h2>
          </div>

          <div className="mt-16 grid gap-4 lg:grid-cols-3">
            {audiences.map((audience) => {
              const Icon = audience.icon;

              return (
                <Link
                  key={audience.title}
                  href={audience.href}
                  className={`group rounded-3xl border border-white/[0.07] bg-white/[0.025] p-8 transition ${audience.border}`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${audience.accentBg} ${audience.accent}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-7 text-xl font-semibold">
                    {audience.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/45">
                    {audience.description}
                  </p>

                  <div
                    className={`mt-7 inline-flex items-center gap-2 text-sm font-semibold ${audience.accent}`}
                  >
                    {audience.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
