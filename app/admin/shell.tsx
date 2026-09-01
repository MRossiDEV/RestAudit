"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  BookOpen,
  ChevronsLeft,
  ChevronsRight,
  ClipboardCheck,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  ScrollText,
  Settings,
  Sparkles,
  Target,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { logout } from "@/server/actions/auth";

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
    label: "Overview",
    items: [{ href: "/admin", label: "Command Center", Icon: LayoutDashboard }],
  },
  {
    label: "Business",
    items: [
      { href: "/admin/restaurants", label: "Restaurants", Icon: UtensilsCrossed },
      { href: "/admin/audits", label: "Audits", Icon: ClipboardCheck },
      { href: "/admin/reports", label: "Reports", Icon: FileText },
    ],
  },
  {
    label: "People",
    items: [
      { href: "/admin/team", label: "Consultants & Team", Icon: Users },
      { href: "/admin/leads", label: "Leads & CRM", Icon: Target },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/admin/ai", label: "VORA Intelligence", Icon: Sparkles },
      { href: "/admin/knowledge", label: "Knowledge Base", Icon: BookOpen },
      { href: "/admin/training", label: "Training Dataset", Icon: GraduationCap },
      { href: "/admin/benchmarks", label: "Benchmarks", Icon: BarChart3 },
    ],
  },
  {
    label: "Analytics",
    items: [
      { href: "/admin/analytics", label: "Platform Analytics", Icon: LineChart },
      { href: "/admin/activity", label: "Activity Logs", Icon: ScrollText },
    ],
  },
  {
    label: "Administration",
    items: [
      { href: "/admin/billing", label: "Billing", Icon: CreditCard },
      { href: "/admin/system", label: "Settings", Icon: Settings },
    ],
  },
];

function isActive(href: string, pathname: string): boolean {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

export function AdminShell({
  userName,
  userRole,
  children,
}: {
  userName: string;
  userRole: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem("vora-admin-collapsed") === "1");
    } catch {
      /* private mode */
    }
  }, []);

  function toggleCollapsed() {
    setCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem("vora-admin-collapsed", next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  return (
    <div className="flex min-h-screen">
      <aside
        className={`fixed inset-y-0 left-0 z-20 hidden flex-col border-r border-border bg-surface-2/60 backdrop-blur transition-[width] duration-200 md:flex ${
          collapsed ? "w-[4.5rem]" : "w-64"
        }`}
      >
        {/* Brand + collapse toggle */}
        <div
          className={`flex items-center border-b border-border ${
            collapsed ? "justify-center px-0 py-4" : "justify-between px-4 py-4"
          }`}
        >
          {!collapsed && (
            <Link href="/admin" className="brand-mark text-base">
              VOR<span>A</span>{" "}
              <span className="font-semibold tracking-normal">Admin</span>
            </Link>
          )}
          <button
            onClick={toggleCollapsed}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            {collapsed ? (
              <ChevronsRight className="h-4 w-4" />
            ) : (
              <ChevronsLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Nav */}
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
                      <item.Icon
                        className={`h-4 w-4 shrink-0 ${active ? "text-primary" : "text-muted-2"}`}
                      />
                      {!collapsed && (
                        <span className={active ? "font-medium" : ""}>
                          {item.label}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer: user + sign out */}
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
                <p className="truncate text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-2">{userRole}</p>
              </div>
              <form action={logout}>
                <button
                  type="submit"
                  className="text-xs text-muted hover:text-foreground"
                >
                  Sign out
                </button>
              </form>
            </>
          )}
        </div>
      </aside>

      <div
        className={`flex min-w-0 flex-1 flex-col transition-[padding] duration-200 ${
          collapsed ? "md:pl-[4.5rem]" : "md:pl-64"
        }`}
      >
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}