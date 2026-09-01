import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { logout } from "@/server/actions/auth";
import { roleLabel } from "@/lib/roles";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  const nav = [
    { href: "/portal", label: "Dashboard" },
    { href: "/portal/restaurant", label: "Restaurant" },
    { href: "/portal/findings", label: "Findings" },
    { href: "/portal/recommendations", label: "Recommendations" },
    { href: "/portal/actions", label: "Actions" },
    { href: "/portal/reports", label: "Reports" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
            <Link href="/portal" className="brand-mark text-base">
              VOR<span>A</span>
            </Link>
            <nav className="hidden items-center gap-5 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted">
              {user.name} · {roleLabel(user.role)}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="text-sm text-muted hover:text-foreground"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">{children}</main>
    </div>
  );
}