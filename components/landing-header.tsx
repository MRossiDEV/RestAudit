import Link from "next/link";
import { BrandLink } from "@/components/brand";

export type LandingSection = "talent" | "company" | "agents";

const NAV = [
  { key: "talent", href: "/talent", label: "Profesionales" },
  { key: "company", href: "/company", label: "Empresas" },
  { key: "agents", href: "/agents", label: "Agents" },
] as const;

const CTA: Record<
  LandingSection,
  { href: string; label: string }
> = {
  talent: { href: "/register?role=talent", label: "Crear mi perfil gratis" },
  company: { href: "/register?role=company", label: "Buscar talento" },
  agents: { href: "/register?role=agent", label: "Ser VORA Agent" },
};

const SUBTITLE: Record<LandingSection, string> = {
  talent: "Talent",
  company: "Empresas",
  agents: "Agents",
};

export function LandingHeader({
  active,
  cta,
  secondaryCta,
}: {
  /** Which nav item is highlighted (the page's own section). Omit on the front door. */
  active?: LandingSection;
  /** Overrides the primary CTA. Defaults to the `active` section's CTA. */
  cta?: { href: string; label: string };
  /** Optional extra CTA shown before the primary one (used on the front door). */
  secondaryCta?: { href: string; label: string };
}) {
  const primaryCta = cta ?? (active ? CTA[active] : CTA.talent);
  const subtitle = active ? SUBTITLE[active] : "Talent";
  const brandHref = active ? `/${active}` : "/";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-[#07070a]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <BrandLink href={brandHref} size="base" subtitle={subtitle} />

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-sm transition hover:text-white ${
                active === item.key ? "text-white" : "text-white/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white sm:block"
          >
            Iniciar sesión
          </Link>

          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white sm:block"
            >
              {secondaryCta.label}
            </Link>
          )}

          <Link
            href={primaryCta.href}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            {primaryCta.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
