import { Check, Users } from "lucide-react";

export function AgentVisual() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-full bg-violet-500/10 blur-[70px]" />

      <div className="relative rounded-[28px] border border-white/[0.08] bg-[#0b0b10] p-6">
        <div className="flex items-center gap-3 border-b border-white/[0.06] pb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10">
            <Users className="h-5 w-5 text-violet-300" />
          </div>

          <div>
            <div className="text-xs text-white/30">VORA Agent</div>

            <div className="text-sm font-semibold">Human trust layer</div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {[
            ["Experiencia", "Revisada durante entrevista"],
            ["Habilidades", "Estructuradas por área"],
            ["Disponibilidad", "Confirmada"],
            ["Portfolio", "Revisado"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4"
            >
              <span className="text-xs text-white/40">{label}</span>

              <span className="flex items-center gap-1.5 text-[10px] text-emerald-300">
                <Check className="h-3 w-3" />
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-violet-400/10 bg-violet-400/[0.035] p-4">
          <div className="text-[10px] uppercase tracking-wider text-white/25">
            El rol del Agent
          </div>

          <p className="mt-2 text-xs leading-5 text-white/40">
            Conoce el mercado local, realiza procesos humanos y aporta
            contexto que una plataforma puramente automática no puede aportar.
          </p>
        </div>
      </div>
    </div>
  );
}
