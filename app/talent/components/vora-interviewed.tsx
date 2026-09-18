import {
  ArrowRight,
  BadgeCheck,
  Camera,
  FileCheck,
  Globe2,
  HeartHandshake,
  IdCard,
  Video,
} from "lucide-react";
import Link from "next/link";

const features = [
  { icon: HeartHandshake, label: "Entrevista humana" },
  { icon: FileCheck, label: "Evaluación estructurada" },
  { icon: IdCard, label: "Experiencia revisada" },
  { icon: BadgeCheck, label: "Habilidades revisadas" },
  { icon: Globe2, label: "Disponibilidad revisada" },
  { icon: Camera, label: "Portfolio revisado" },
  { icon: FileCheck, label: "Certificaciones revisadas" },
  { icon: Video, label: "Videos de trabajo" },
];

export function VoraInterviewed() {
  return (
    <section
      id="entrevista"
      className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
              <HeartHandshake className="h-3.5 w-3.5" />
              VORA Professional Interview
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Mostrá lo que sabés hacer.
              <br />
              <span className="text-white/35">Con respaldo humano.</span>
            </h2>

            <div className="mt-7 inline-flex items-baseline gap-2 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/[0.05] px-5 py-4">
              <span className="text-3xl font-semibold">$47</span>
              <span className="text-sm text-white/40">USD — pago único</span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.label}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-fuchsia-300" />
                    <span className="text-xs text-white/60">
                      {feature.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="mt-7 max-w-lg text-sm leading-6 text-white/40">
              Sin suscripción. Sin renovación. Tu perfil continúa siendo tuyo
              y podés seguir actualizándolo.
            </p>

            <Link
              href="/talent/dashboard/professional-interview"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Conocer VORA Professional Interview
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-fuchsia-500/10 blur-[80px]" />

            <div className="relative overflow-hidden rounded-[30px] border border-fuchsia-400/15 bg-[#101015] p-6 shadow-2xl shadow-black/30 sm:p-8">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-fuchsia-300/70">
                    VORA Interviewed
                  </div>

                  <div className="mt-2 text-xl font-semibold">
                    Professional Profile
                  </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-500/10">
                  <HeartHandshake className="h-5 w-5 text-fuchsia-300" />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "Entrevista humana realizada",
                  "Experiencia revisada",
                  "Habilidades evaluadas",
                  "Disponibilidad confirmada",
                  "Portfolio revisado",
                  "Additional matching signals",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                  >
                    <BadgeCheck className="h-4 w-4 shrink-0 text-fuchsia-300" />
                    <span className="text-sm text-white/55">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
