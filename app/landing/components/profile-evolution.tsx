import { Link2, QrCode } from "lucide-react";

export function ProfileEvolution() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-full bg-violet-500/10 blur-[80px]" />

      <div className="relative rounded-[30px] border border-white/[0.08] bg-[#111116] p-5 shadow-2xl shadow-black/30 sm:p-7">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/25">
              Identidad profesional
            </div>

            <div className="mt-1 text-sm font-medium text-white/70">
              vora.talent/maria
            </div>
          </div>

          <QrCode className="h-5 w-5 text-violet-300" />
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
              <div className="text-[10px] text-white/25">#123456</div>
            </div>

            <div className="mt-1 text-xs text-violet-300">Chef Ejecutiva</div>

            <div className="mt-1 text-[10px] text-white/30">
              Montevideo · Uruguay · 8 años
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-violet-400/10 bg-violet-400/[0.035] p-4">
          <div className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-violet-300" />

            <div className="text-xs font-semibold">
              Un perfil para compartir
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {["QR", "Instagram", "LinkedIn", "WhatsApp", "Email"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/[0.06] px-3 py-1.5 text-[9px] text-white/50"
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="mt-6 border-t border-white/[0.06] pt-5">
          <div className="mb-3 text-[10px] uppercase tracking-[0.15em] text-white/25">
            Evolución profesional
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
                <div className="w-24 text-[9px] text-white/25">{time}</div>

                <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />

                <div className="text-[10px] text-white/45">{event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
