import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

export function HumanTech() {
  return (
    <section id="agents" className="px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[36px] border border-white/[0.08] bg-gradient-to-br from-blue-950/30 via-[#101015] to-cyan-950/20 p-7 sm:p-10 lg:p-14">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              <Users className="h-3.5 w-3.5" />
              Tecnología + personas
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              La tecnología encuentra.
              <br />
              <span className="text-white/35">
                Las personas fortalecen la red.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/45">
              Una red local de especialistas ayuda a construir, verificar y
              mantener una red profesional de talento y empresas.
            </p>

            <Link
              href="/agents"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white"
            >
              Conocer VORA Agents
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
