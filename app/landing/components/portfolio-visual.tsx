import { Video } from "lucide-react";

export function PortfolioVisual() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="aspect-[4/5] overflow-hidden rounded-3xl">
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=700&q=85"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-3">
        <div className="aspect-square overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=85"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-violet-500/10">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-transparent" />

          <div className="relative text-center">
            <Video className="mx-auto h-7 w-7 text-violet-300" />

            <div className="mt-2 text-xs text-white/50">Video de trabajo</div>

            <div className="mt-1 text-[9px] text-white/25">Entrevistados</div>
          </div>
        </div>
      </div>
    </div>
  );
}
