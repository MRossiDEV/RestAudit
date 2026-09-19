import Link from "next/link";
import { BrandLink } from "@/components/brand";

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-[#07070a]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <BrandLink href="/" size="base" subtitle="Talent" />

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/talent"
            className="text-sm text-white/50 transition hover:text-white"
          >
            Profesionales
          </Link>

          <Link
            href="/company"
            className="text-sm text-white/50 transition hover:text-white"
          >
            Empresas
          </Link>

          <Link
            href="/agents"
            className="text-sm text-white/50 transition hover:text-white"
          >
            Agents
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/register?role=talent"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white sm:block"
          >
            Crear perfil
          </Link>

          <Link
            href="/register?role=company"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Buscar talento
          </Link>
        </div>
      </div>
    </header>
  );
}
