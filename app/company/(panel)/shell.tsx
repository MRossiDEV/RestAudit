"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bookmark,
  Briefcase,
  Building2,
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Target,
} from "lucide-react";
import { logout } from "@/server/actions/auth";
import { BrandIcon, BrandMark } from "@/components/brand";

interface NavItem {
  href: string;
  label: string;
  Icon: typeof LayoutDashboard;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const GROUPS: NavGroup[] = [
  {
    label: "General",
    items: [{ href: "/company/dashboard", label: "Panel", Icon: LayoutDashboard }],
  },
  {
    label: "Talento",
    items: [
      { href: "/company/talent", label: "Buscar talento", Icon: Search },
      { href: "/company/saved", label: "Guardados", Icon: Bookmark },
      { href: "/company/searches", label: "Búsquedas", Icon: Target },
    ],
  },
  {
    label: "Contratación",
    items: [
      { href: "/company/jobs", label: "Posiciones", Icon: Briefcase },
      { href: "/company/jobs/new", label: "Publicar empleo", Icon: Plus },
    ],
  },
  {
    label: "Empresa",
    items: [{ href: "/company/profile", label: "Perfil", Icon: Building2 }],
  },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/company/jobs") {
    // Keep "Posiciones" active for /company/jobs but not /company/jobs/new.
    return pathname === "/company/jobs";
  }
  return pathname === href || pathname.startsWith(href + "/");
}

/**
 * Employer shell — sidebar + topbar. Public company profiles (/company/[slug])
 * are NOT wrapped: the layout detects them and renders children bare.
 */
export function CompanyShell({
  businessName,
  userName,
  children,
}: {
  businessName: string;
  userName: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem("vora-company-collapsed") === "1");
    } catch {
      /* private mode */
    }
  }, []);

  function toggleCollapsed() {
    setCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem("vora-company-collapsed", next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 hidden flex-col border-r border-border bg-surface-2/60 backdrop-blur transition-[width] duration-200 md:flex ${
          collapsed ? "w-[4.5rem]" : "w-64"
        }`}
      >
        <div
          className={`flex items-center border-b border-border ${
            collapsed ? "justify-center px-0 py-4" : "justify-between px-4 py-4"
          }`}
        >
          {collapsed ? (
            <Link href="/company/dashboard">
              <BrandIcon size={28} />
            </Link>
          ) : (
            <Link
              href="/company/dashboard"
              className="flex items-center gap-2"
            >
              <BrandMark size="sm" />
              <span className="text-sm font-semibold tracking-normal">
                Empresas
              </span>
            </Link>
          )}
          <button
            onClick={toggleCollapsed}
            title={collapsed ? "Expandir" : "Contraer"}
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          {GROUPS.map((group) => (
            <div key={group.label} className={collapsed ? "mb-4" : "mb-5"}>
              {!collapsed && (
                <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-2">
                  {group.label}
                </p>
              )}
              <div className="mt-1.5 flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href, pathname);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={`flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors ${
                        collapsed ? "justify-center" : ""
                      } ${
                        active
                          ? "bg-primary/10 text-foreground"
                          : "text-muted hover:bg-surface hover:text-foreground"
                      }`}
                    >
                      <item.Icon className={`h-4 w-4 shrink-0 ${active ? "text-primary" : "text-muted-2"}`} />
                      {!collapsed && <span className={active ? "font-medium" : ""}>{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div
          className={`border-t border-border py-4 ${
            collapsed ? "flex justify-center px-2" : "flex items-center justify-between px-4"
          }`}
        >
          {collapsed ? (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {userName.charAt(0).toUpperCase()}
            </span>
          ) : (
            <>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{businessName}</p>
                <p className="truncate text-xs text-muted-2">{userName}</p>
              </div>
              <form action={logout}>
                <button type="submit" title="Cerrar sesión" className="text-muted hover:text-foreground">
                  <LogOut className="h-4 w-4" />
                </button>
              </form>
            </>
          )}
        </div>
      </aside>

      {/* Main column with topbar */}
      <div
        className={`flex min-w-0 flex-1 flex-col transition-[padding] duration-200 ${
          collapsed ? "md:pl-[4.5rem]" : "md:pl-64"
        }`}
      >
        <Topbar businessName={businessName} />
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}

function Topbar({ businessName }: { businessName: string }) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-background/85 px-6 backdrop-blur-xl">
      <p className="flex items-center gap-2 text-sm font-medium text-muted md:hidden">
        <BrandMark size="sm" />
        <span className="text-foreground">Empresas</span>
      </p>
      <div className="hidden md:block" />
      <div className="flex items-center gap-3">
        <span className="hidden text-xs text-muted sm:block">{businessName}</span>
        <Link
          href="/company/jobs/new"
          className="glow-primary inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" />
          Publicar empleo
        </Link>
      </div>
    </header>
  );
}
