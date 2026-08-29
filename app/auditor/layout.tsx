import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { logout } from "@/server/actions/auth";
import { roleLabel } from "@/lib/roles";

export default async function AuditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  const nav = [
    { href: "/auditor", label: "Dashboard" },
    { href: "/auditor/restaurants", label: "Restaurants" },
    { href: "/auditor/audits", label: "Audits" },
    { href: "/auditor/findings", label: "Findings" },
    { href: "/auditor/recommendations", label: "Recommendations" },
    { href: "/auditor/actions", label: "Actions" },
    { href: "/auditor/reports", label: "Reports" },
    { href: "/auditor/training", label: "Training" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
            <Link href="/auditor" className="text-base font-semibold tracking-tight">
              RestAudit
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
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">{children}</main>
    </div>
  );
}