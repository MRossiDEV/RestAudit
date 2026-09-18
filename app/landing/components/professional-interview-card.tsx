import { BadgeCheck, HeartHandshake } from "lucide-react";

export function ProfessionalInterviewCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-full bg-fuchsia-500/10 blur-[80px]" />

      <div className="relative overflow-hidden rounded-[30px] border border-fuchsia-400/15 bg-[#101015] p-6 shadow-2xl shadow-black/30 sm:p-8">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-fuchsia-300/70">
              VORA Professional Interview
            </div>

            <div className="mt-2 text-xl font-semibold">
              Un perfil con más evidencia.
            </div>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-500/10">
            <HeartHandshake className="h-5 w-5 text-fuchsia-300" />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=85"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">María</span>

                <BadgeCheck className="h-4 w-4 text-fuchsia-300" />
              </div>

              <div className="text-xs text-white/35">
                Chef Ejecutiva · VORA Interviewed
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-fuchsia-400/10 bg-fuchsia-400/[0.035] p-4">
            <div className="text-[10px] uppercase tracking-wider text-white/25">
              VORA Interview Summary
            </div>

            <p className="mt-2 text-xs leading-5 text-white/50">
              8 años de experiencia. Especialización en cocina de alto
              volumen, grill y gestión de equipos. Disponibilidad para
              posiciones full-time e interés en oportunidades internacionales.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              ["Experiencia", "Revisada"],
              ["Skills", "Estructuradas"],
              ["Disponibilidad", "Confirmada"],
              ["Portfolio", "Revisado"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl bg-white/[0.025] p-3"
              >
                <div className="text-[9px] uppercase text-white/25">
                  {label}
                </div>

                <div className="mt-1 text-xs text-white/65">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between rounded-2xl border border-white/[0.06] bg-black/20 p-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-white/25">
              Una sola vez
            </div>

            <div className="mt-1 text-3xl font-semibold">$47</div>

            <div className="mt-1 text-xs text-white/30">
              USD · sin suscripción
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-semibold text-emerald-300">
              Lifetime
            </div>

            <div className="mt-1 text-[10px] text-white/30">
              Professional Profile
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
