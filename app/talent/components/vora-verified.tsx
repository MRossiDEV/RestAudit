import { ShieldCheck } from "lucide-react";

export function VoraVerified() {
  return (
    <section className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            VORA Verified
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Construí confianza profesional.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/45">
            VORA confirma determinados datos de identidad y perfil profesional
            según el proceso de verificación.
          </p>
        </div>
      </div>
    </section>
  );
}
