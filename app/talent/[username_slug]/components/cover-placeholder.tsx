import { Icon } from "./icons";

export function CoverPlaceholder() {
  return (
    <div className="relative h-44 overflow-hidden sm:h-56 lg:h-64">
      <div className="absolute inset-0 bg-gradient-to-br from-[#17111f] via-[#12141c] to-[#0b181b]" />
      <div className="absolute -left-20 -top-40 h-[450px] w-[450px] rounded-full bg-violet-500/[0.16] blur-[100px]" />
      <div className="absolute -right-20 top-0 h-[300px] w-[300px] rounded-full bg-cyan-500/[0.10] blur-[90px]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute bottom-5 left-5 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30 sm:left-7">
        VORA TALENT
      </div>
      <div className="absolute bottom-5 right-5 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.2em] text-white/30">
        <Icon name="globe" size={12} />
        Professional Profile
      </div>
    </div>
  );
}
