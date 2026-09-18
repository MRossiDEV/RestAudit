import { BadgeCheck, LockKeyhole, ShieldCheck } from "lucide-react";

export function VerifiedInterviewed() {
  return (
    <section className="border-y border-white/[0.05] bg-[#0b0b10] px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            VORA Verified · VORA Interviewed
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Más información.
            <br />
            <span className="text-white/35">Más contexto para contratar.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <h3 className="mt-6 text-xl font-semibold">VORA Verified</h3>

            <p className="mt-3 text-sm leading-6 text-white/45">
              Perfil con verificación realizada por VORA.
            </p>
          </div>

          <div className="rounded-3xl border border-fuchsia-400/15 bg-fuchsia-400/[0.03] p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-300">
              <BadgeCheck className="h-5 w-5" />
            </div>

            <h3 className="mt-6 text-xl font-semibold">VORA Interviewed</h3>

            <p className="mt-3 text-sm leading-6 text-white/45">
              Profesional que realizó una entrevista profesional con un
              especialista VORA.
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-white/30" />

          <p className="text-sm leading-6 text-white/45">
            La información protegida de los profesionales puede requerir una
            empresa verificada.
          </p>
        </div>
      </div>
    </section>
  );
}
