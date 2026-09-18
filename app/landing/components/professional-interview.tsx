import { ArrowRight, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { interviewedFeatures } from "../data";
import { ProfessionalInterviewCard } from "./professional-interview-card";

export function ProfessionalInterview() {
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

            <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              No solamente digas
              <br />
              <span className="text-white/35">qué sabés hacer.</span>
              <br />
              Mostrálo.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/45">
              Podés llevar tu perfil un paso más allá con una entrevista
              profesional realizada por una persona de la red VORA.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {interviewedFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-300">
                      <Icon className="h-4 w-4" />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-white/40">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <Link
              href="/talent/dashboard/professional-interview"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black"
            >
              Conocer VORA Professional Interview
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ProfessionalInterviewCard />
        </div>
      </div>
    </section>
  );
}
