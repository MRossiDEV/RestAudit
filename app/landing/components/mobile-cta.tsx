import Link from "next/link";

export function MobileCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#08080b]/90 p-3 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/register?role=talent"
          className="flex h-12 items-center justify-center rounded-full bg-white text-xs font-semibold text-black"
        >
          Crear perfil gratis
        </Link>

        <Link
          href="/register?role=company"
          className="flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-medium text-white"
        >
          Buscar talento
        </Link>
      </div>
    </div>
  );
}
