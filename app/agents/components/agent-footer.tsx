import { BrandMark } from "@/components/brand";

export function AgentFooter() {
  return (
    <footer className="border-t border-white/[0.05] px-5 py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-xs text-white/25 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <BrandMark size="sm" subtitle="Agents" />
        </div>

        <div>
          Representantes locales de la red VORA.
        </div>
      </div>
    </footer>
  );
}
