"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { TalentProfileFull } from "@/types/domain";
import {
  addEducationAction,
  addExperienceAction,
  addSkillAction,
  deleteEducationAction,
  deleteExperienceAction,
  deleteSkillAction,
  setShowPhoneAction,
  setVisibilityAction,
  updateProfileAction,
} from "@/server/actions/talentPublic";

type Tab =
  | "overview"
  | "profile"
  | "experience"
  | "skills"
  | "education"
  | "portfolio"
  | "requests"
  | "cv"
  | "settings";

interface DashboardProps {
  name: string;
  title: string;
  avatarUrl: string | null;
  slug: string | null;
  isPublic: boolean;
  showPhone: boolean;
  completion: number;
  profile: TalentProfileFull;
}

/* -------------------------------------------------------------------------- */
/* ICONS                                                                       */
/* -------------------------------------------------------------------------- */

function Icon({
  name,
  size = 20,
}: {
  name:
    | "home"
    | "user"
    | "briefcase"
    | "sparkles"
    | "book"
    | "settings"
    | "download"
    | "share"
    | "qr"
    | "plus"
    | "external"
    | "check"
    | "close"
    | "menu"
    | "logout"
    | "camera"
    | "file"
    | "trash"
    | "arrow"
    | "eye"
    | "bell"
    | "globe"
    | "map"
    | "clock"
    | "shield"
    | "image"
    | "video"
    | "send"
    | "chevron"
    | "lock"
    | "search"
    | "calendar"
    | "spark";
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v11h14V9" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );

    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c.8-4.2 3.4-6.3 8-6.3s7.2 2.1 8 6.3" />
        </svg>
      );

    case "briefcase":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18M10 12v2h4v-2" />
        </svg>
      );

    case "sparkles":
    case "spark":
      return (
        <svg {...common}>
          <path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z" />
          <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
        </svg>
      );

    case "book":
      return (
        <svg {...common}>
          <path d="M4 5a2 2 0 0 1 2-2h14v17H6a2 2 0 0 0-2 2V5Z" />
          <path d="M4 20a2 2 0 0 1 2-2h14" />
        </svg>
      );

    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.6v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.4v-2.6h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V4.3h2.6v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V13h-.2a1.7 1.7 0 0 0-1.5 2Z" />
        </svg>
      );

    case "download":
      return (
        <svg {...common}>
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M5 21h14" />
        </svg>
      );

    case "share":
      return (
        <svg {...common}>
          <circle cx="18" cy="5" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="19" r="2.5" />
          <path d="m8.3 10.8 7.4-4.6M8.3 13.2l7.4 4.6" />
        </svg>
      );

    case "qr":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="6" height="6" />
          <rect x="15" y="3" width="6" height="6" />
          <rect x="3" y="15" width="6" height="6" />
          <path d="M15 15h3v3h-3zM18 18h3M15 21h3M21 15v3" />
        </svg>
      );

    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );

    case "external":
      return (
        <svg {...common}>
          <path d="M14 4h6v6" />
          <path d="M20 4 11 13" />
          <path d="M18 13v6H4V5h6" />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case "close":
      return (
        <svg {...common}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );

    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );

    case "logout":
      return (
        <svg {...common}>
          <path d="M10 4H5v16h5" />
          <path d="M14 8l4 4-4 4M18 12H8" />
        </svg>
      );

    case "camera":
      return (
        <svg {...common}>
          <path d="M4 7h3l1.5-2h7L17 7h3v12H4V7Z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      );

    case "file":
      return (
        <svg {...common}>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v5h4M9 13h6M9 17h6" />
        </svg>
      );

    case "trash":
      return (
        <svg {...common}>
          <path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h13M13 7l5 5-5 5" />
        </svg>
      );

    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );

    case "bell":
      return (
        <svg {...common}>
          <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      );

    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.2 2.4 3.3 5.4 3.3 9s-1.1 6.6-3.3 9c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" />
        </svg>
      );

    case "map":
      return (
        <svg {...common}>
          <path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z" />
          <path d="M9 3v15M15 6v15" />
        </svg>
      );

    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 20 6v5c0 5-3.2 8.5-8 10-4.8-1.5-8-5-8-10V6l8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );

    case "image":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9" r="1.5" />
          <path d="m21 15-5-5L5 20" />
        </svg>
      );

    case "video":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="13" height="14" rx="2" />
          <path d="m16 10 5-3v10l-5-3" />
        </svg>
      );

    case "send":
      return (
        <svg {...common}>
          <path d="m3 11 18-8-8 18-2-7-8-3Z" />
          <path d="m11 14 10-11" />
        </svg>
      );

    case "chevron":
      return (
        <svg {...common}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      );

    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="10" width="14" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      );

    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      );

    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </svg>
      );

    default:
      return null;
  }
}

/* -------------------------------------------------------------------------- */
/* SHARED UI                                                                   */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">
            {eyebrow}
          </p>
        )}

        <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}) {
  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:opacity-90 glow-primary",
    secondary:
      "border border-border bg-surface text-foreground hover:border-primary/30",
    ghost:
      "text-muted hover:bg-surface hover:text-foreground",
    danger:
      "border border-red-500/20 bg-red-500/5 text-red-300 hover:bg-red-500/10",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
  hint,
}: {
  label: string;
  name?: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  hint?: string;
}) {
  const classes =
    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-2 focus:border-violet-400/50";

  return (
    <label className="block">
      <span className="text-xs font-medium text-muted">{label}</span>

      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          rows={5}
          className={classes}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={classes}
        />
      )}

      {hint && (
        <span className="mt-1 block text-[11px] text-muted-2">
          {hint}
        </span>
      )}
    </label>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 text-left"
    >
      <div>
        <p className="text-sm font-medium">{label}</p>

        {description && (
          <p className="mt-1 text-xs leading-5 text-muted">
            {description}
          </p>
        )}
      </div>

      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-violet-500" : "bg-surface-2"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* SIDEBAR                                                                     */
/* -------------------------------------------------------------------------- */

function Sidebar({
  activeTab,
  setActiveTab,
  onClose,
  name,
  title,
  initials,
}: {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onClose?: () => void;
  name: string;
  title: string;
  initials: string;
}) {
  const groups: {
    label: string;
    items: {
      id: Tab;
      label: string;
      icon: React.ComponentProps<typeof Icon>["name"];
    }[];
  }[] = [
    {
      label: "Mi perfil",
      items: [
        { id: "overview", label: "Resumen", icon: "home" },
        { id: "profile", label: "Información", icon: "user" },
        { id: "experience", label: "Experiencia", icon: "briefcase" },
        { id: "skills", label: "Habilidades", icon: "sparkles" },
        { id: "education", label: "Educación", icon: "book" },
        { id: "portfolio", label: "Portfolio", icon: "image" },
      ],
    },
    {
      label: "Oportunidades",
      items: [
        { id: "requests", label: "Solicitudes", icon: "bell" },
      ],
    },
    {
      label: "Herramientas",
      items: [
        { id: "cv", label: "Mi CV", icon: "file" },
      ],
    },
    {
      label: "Cuenta",
      items: [
        { id: "settings", label: "Configuración", icon: "settings" },
      ],
    },
  ];

  return (
    <aside className="flex h-full w-[270px] flex-col border-r border-border bg-surface">
      <div className="flex h-16 items-center justify-between border-b border-border px-5">
        <Link href="/talent">
          <div className="brand-mark text-sm">
            VOR<span>A</span>
          </div>
        </Link>

        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted hover:bg-surface-2 hover:text-foreground lg:hidden"
          >
            <Icon name="close" size={18} />
          </button>
        )}
      </div>

      <div className="border-b border-border p-4">
        <div className="flex items-center gap-3 rounded-xl bg-background p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/20 text-xs font-semibold">
            {initials}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{name}</p>
            <p className="truncate text-[11px] text-muted">{title}</p>
          </div>

          <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {groups.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="mb-2 px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-2">
              {group.label}
            </p>

            <div className="space-y-0.5">
              {group.items.map(({ id, label, icon }) => {
                const active = activeTab === id;

                return (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveTab(id);
                      onClose?.();
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      active
                        ? "bg-violet-500/10 text-violet-300"
                        : "text-muted hover:bg-background hover:text-foreground"
                    }`}
                  >
                    <Icon name={icon} size={17} />
                    <span>{label}</span>

                    {id === "requests" && (
                      <span className="ml-auto rounded-full bg-violet-500/10 px-1.5 py-0.5 text-[9px] text-violet-300">
                        0
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          href="/talent/login"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-background hover:text-foreground"
        >
          <Icon name="logout" size={17} />
          Cerrar sesión
        </Link>
      </div>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* TOP BAR                                                                     */
/* -------------------------------------------------------------------------- */

function TopBar({
  onMenu,
  name,
  initials,
}: {
  onMenu: () => void;
  name: string;
  initials: string;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <button
        onClick={onMenu}
        className="rounded-lg p-2 text-muted hover:bg-surface hover:text-foreground lg:hidden"
      >
        <Icon name="menu" size={20} />
      </button>

      <div className="hidden text-xs text-muted sm:block">
        VORA Talent /{" "}
        <span className="text-foreground">Mi espacio profesional</span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          className="rounded-lg p-2 text-muted hover:bg-surface hover:text-foreground"
          title="Notificaciones"
        >
          <Icon name="bell" size={17} />
        </button>

        <div className="hidden h-8 w-px bg-border sm:block" />

        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/20 text-[10px] font-semibold">
            {initials}
          </div>

          <span className="text-xs font-medium">{name}</span>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* PROFILE STRENGTH                                                            */
/* -------------------------------------------------------------------------- */

function ProfileStrength({
  completion,
  onContinue,
}: {
  completion: number;
  onContinue: () => void;
}) {
  const score = Math.max(0, Math.min(100, completion));

  const label =
    score >= 90
      ? "Perfil destacado"
      : score >= 70
        ? "Perfil sólido"
        : score >= 40
          ? "Perfil en desarrollo"
          : "Perfil inicial";

  return (
    <div className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.08] to-cyan-500/[0.03] p-5 sm:p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-surface">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(rgb(139 92 246) ${score}%, transparent ${score}%)`,
            }}
          />

          <div className="absolute inset-[5px] flex items-center justify-center rounded-full bg-background">
            <div className="text-center">
              <p className="text-xl font-semibold">{score}%</p>
              <p className="text-[8px] uppercase tracking-wider text-muted-2">
                strength
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-400">
            Professional Profile Strength
          </p>

          <h3 className="mt-2 text-lg font-semibold">{label}</h3>

          <p className="mt-1 max-w-xl text-sm leading-5 text-muted">
            Cuanto más completa y actualizada esté tu información, mejor podrá
            representarte tu perfil profesional.
          </p>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {score < 100 && (
          <Button variant="secondary" onClick={onContinue}>
            Mejorar perfil
            <Icon name="arrow" size={15} />
          </Button>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* OVERVIEW                                                                    */
/* -------------------------------------------------------------------------- */

function Overview({
  setTab,
  name,
  title,
  initials,
  avatarUrl,
  slug,
  completion,
  profile,
}: {
  setTab: (tab: Tab) => void;
  name: string;
  title: string;
  initials: string;
  avatarUrl: string | null;
  slug: string | null;
  completion: number;
  profile: TalentProfileFull;
}) {
  const experienceCount = profile.experience?.length ?? 0;
  const skillsCount = profile.skills?.length ?? 0;
  const educationCount = profile.education?.length ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">
          Mi espacio
        </p>

        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Buen día, {name.split(" ")[0]}.
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted">
          Este es el centro de control de tu identidad profesional en VORA
          Talent.
        </p>
      </div>

      <ProfileStrength
        completion={completion}
        onContinue={() => setTab("profile")}
      />

      {/* Identity card */}
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="border-b border-border px-5 py-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold">Tu identidad profesional</p>
              <p className="mt-0.5 text-xs text-muted">
                Esta es la base de tu Talent Passport.
              </p>
            </div>

            <button
              onClick={() => setTab("profile")}
              className="text-left text-xs font-medium text-violet-300 hover:text-violet-200 sm:text-right"
            >
              Editar información →
            </button>
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={name}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/20 text-xl font-semibold">
                {initials}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="text-xl font-semibold">{name}</p>

              <p className="mt-1 text-sm text-violet-300">
                {title || "Profesional de hospitality"}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
                {profile.location && (
                  <span className="rounded-md bg-background px-2.5 py-1.5">
                    {profile.location}
                  </span>
                )}

                {profile.country && (
                  <span className="rounded-md bg-background px-2.5 py-1.5">
                    {profile.country}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        <button
          onClick={() => setTab("experience")}
          className="rounded-2xl border border-border bg-surface p-5 text-left transition hover:border-violet-400/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-muted">
              <Icon name="briefcase" size={18} />
            </span>
            <Icon name="arrow" size={14} />
          </div>

          <p className="mt-5 text-2xl font-semibold">{experienceCount}</p>
          <p className="mt-1 text-xs text-muted">Experiencias profesionales</p>
        </button>

        <button
          onClick={() => setTab("skills")}
          className="rounded-2xl border border-border bg-surface p-5 text-left transition hover:border-violet-400/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-violet-300">
              <Icon name="sparkles" size={18} />
            </span>
            <Icon name="arrow" size={14} />
          </div>

          <p className="mt-5 text-2xl font-semibold">{skillsCount}</p>
          <p className="mt-1 text-xs text-muted">Habilidades registradas</p>
        </button>

        <button
          onClick={() => setTab("education")}
          className="rounded-2xl border border-border bg-surface p-5 text-left transition hover:border-violet-400/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-cyan-300">
              <Icon name="book" size={18} />
            </span>
            <Icon name="arrow" size={14} />
          </div>

          <p className="mt-5 text-2xl font-semibold">{educationCount}</p>
          <p className="mt-1 text-xs text-muted">Estudios y certificaciones</p>
        </button>
      </div>

      {/* Sharing */}
      {slug && (
        <div className="rounded-2xl border border-border bg-surface">
          <div className="border-b border-border px-5 py-4">
            <p className="text-sm font-semibold">Tu perfil compartible</p>

            <p className="mt-1 text-xs leading-5 text-muted">
              Tu perfil puede acompañarte durante toda tu carrera. Compartilo
              desde WhatsApp, LinkedIn, Instagram, email o donde quieras.
            </p>
          </div>

          <div className="p-5">
            <div className="rounded-xl border border-violet-400/10 bg-violet-500/[0.03] p-4">
              <p className="break-all text-xs font-medium text-violet-300">
                vora.com/talent/{slug}
              </p>

              <p className="mt-2 text-[11px] leading-5 text-muted">
                Cuando compartís tu perfil directamente con una empresa, la
                empresa deberá registrarse gratis en VORA para verlo.
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Link href={`/talent/${slug}`} target="_blank">
                <Button variant="secondary" className="w-full">
                  <Icon name="eye" size={15} />
                  Ver mi perfil
                </Button>
              </Link>

              <Link href="/talent/profile/qr">
                <Button variant="secondary" className="w-full">
                  <Icon name="qr" size={15} />
                  Mi QR
                </Button>
              </Link>

              <Link href={`/talent/${slug}`} target="_blank">
                <Button variant="secondary" className="w-full">
                  <Icon name="share" size={15} />
                  Compartir
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Control principle */}
      <div className="rounded-2xl border border-border bg-background p-5 sm:p-6">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
            <Icon name="shield" size={18} />
          </div>

          <div>
            <p className="font-semibold">Vos controlás lo que compartís.</p>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              Tu perfil es tuyo. Vos decidís qué información profesional,
              formas de contacto y preferencias querés incluir y hacer visibles.
            </p>

            <button
              onClick={() => setTab("settings")}
              className="mt-3 text-xs font-medium text-violet-300 hover:text-violet-200"
            >
              Administrar privacidad →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PROFILE EDITOR                                                              */
/* -------------------------------------------------------------------------- */

function ProfileEditor({ profile }: { profile: TalentProfileFull }) {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: profile.first_name,
    lastName: profile.last_name,
    title: profile.professional_title,
    city: profile.location,
    country: profile.country,
    phone: profile.contact_phone,
    summary: profile.bio,
  });

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function save() {
    setBusy(true);
    setError(null);

    try {
      const result = await updateProfileAction({
        firstName: form.firstName,
        lastName: form.lastName,
        professionalTitle: form.title,
        city: form.city,
        country: form.country,
        summary: form.summary,
        contactPhone: form.phone,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.refresh();
      }
    } catch {
      setError("No se pudieron guardar los cambios.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Mi perfil"
        title="Información profesional"
        description="Esta información forma la base de tu Talent Passport y de tu CV."
        action={
          <Button onClick={save} disabled={busy}>
            {busy ? "Guardando..." : "Guardar cambios"}
          </Button>
        }
      />

      {error && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="rounded-2xl border border-violet-400/10 bg-violet-500/[0.03] p-5 sm:p-6">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
            <Icon name="user" size={18} />
          </div>

          <div>
            <p className="font-semibold">Tu identidad profesional</p>

            <p className="mt-1 text-sm leading-5 text-muted">
              Esta información puede utilizarse para tu perfil compartible,
              búsquedas profesionales y generación de CV.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <p className="text-xs font-medium text-muted">Foto profesional</p>

          {profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatar_url}
              alt=""
              className="mx-auto mt-5 h-36 w-36 rounded-full object-cover"
            />
          ) : (
            <div className="mx-auto mt-5 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/20 text-3xl font-semibold">
              {(form.firstName || form.lastName || "V")
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

          <button className="mx-auto mt-5 flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted transition hover:text-foreground">
            <Icon name="camera" size={14} />
            Cambiar foto
          </button>

          <p className="mt-3 text-center text-[10px] leading-4 text-muted-2">
            Una buena foto profesional ayuda a construir una identidad clara.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Nombre"
              value={form.firstName}
              onChange={(v) => update("firstName", v)}
            />

            <Field
              label="Apellido"
              value={form.lastName}
              onChange={(v) => update("lastName", v)}
            />

            <Field
              label="Título profesional"
              value={form.title}
              onChange={(v) => update("title", v)}
              placeholder="Ej. Executive Chef"
            />

            <Field
              label="Ciudad"
              value={form.city}
              onChange={(v) => update("city", v)}
              placeholder="Montevideo"
            />

            <Field
              label="País"
              value={form.country}
              onChange={(v) => update("country", v)}
              placeholder="Uruguay"
            />

            <Field
              label="Teléfono"
              value={form.phone}
              onChange={(v) => update("phone", v)}
              hint="Podés decidir en Configuración si querés mostrarlo."
            />
          </div>

          <div className="mt-5">
            <Field
              label="Resumen profesional"
              value={form.summary}
              onChange={(v) => update("summary", v)}
              multiline
              placeholder="Contá brevemente quién sos, qué hacés y qué experiencia te diferencia."
              hint="Evitá repetir tu CV. Pensá en esto como tu presentación profesional."
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
            <Icon name="globe" size={18} />
          </div>

          <div>
            <h3 className="font-semibold">Pensá tu perfil para el mundo</h3>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              VORA Talent no está limitado a oportunidades de tu ciudad.
              Completá tu información pensando también en oportunidades
              regionales e internacionales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* EXPERIENCE                                                                  */
/* -------------------------------------------------------------------------- */

function ExperienceEditor({ profile }: { profile: TalentProfileFull }) {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [busy, setBusy] = useState(false);

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.company.trim() || !form.position.trim()) return;

    setBusy(true);

    try {
      await addExperienceAction({
        company: form.company,
        position: form.position,
        startDate: form.startDate,
        endDate: form.endDate || null,
        description: form.description,
      });

      setShowForm(false);

      setForm({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      });

      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    await deleteExperienceAction(id);
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Talent Passport"
        title="Experiencia profesional"
        description="Construí tu trayectoria profesional. Tu experiencia es una de las partes más importantes de tu perfil."
        action={
          <Button onClick={() => setShowForm((v) => !v)}>
            <Icon name="plus" size={16} />
            Agregar experiencia
          </Button>
        }
      />

      {showForm && (
        <form
          onSubmit={add}
          className="space-y-5 rounded-2xl border border-violet-400/20 bg-violet-500/[0.03] p-5 sm:p-7"
        >
          <div>
            <p className="text-sm font-semibold">Nueva experiencia</p>
            <p className="mt-1 text-xs text-muted">
              Registrá cada etapa importante de tu trayectoria.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Cargo"
              value={form.position}
              onChange={(v) =>
                setForm((f) => ({ ...f, position: v }))
              }
              placeholder="Ej. Executive Chef"
            />

            <Field
              label="Empresa / establecimiento"
              value={form.company}
              onChange={(v) =>
                setForm((f) => ({ ...f, company: v }))
              }
              placeholder="Nombre del restaurante, hotel, grupo..."
            />

            <Field
              label="Desde"
              value={form.startDate}
              onChange={(v) =>
                setForm((f) => ({ ...f, startDate: v }))
              }
              placeholder="2023"
            />

            <Field
              label="Hasta"
              value={form.endDate}
              onChange={(v) =>
                setForm((f) => ({ ...f, endDate: v }))
              }
              placeholder="Actualidad"
            />
          </div>

          <Field
            label="Descripción"
            value={form.description}
            onChange={(v) =>
              setForm((f) => ({ ...f, description: v }))
            }
            multiline
            placeholder="Responsabilidades, logros, tipo de operación, liderazgo, especialidades..."
          />

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </Button>

            <Button type="submit" disabled={busy}>
              {busy ? "Guardando..." : "Guardar experiencia"}
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {profile.experience.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
            <Icon
              name="briefcase"
              size={25}
            />

            <p className="mt-4 text-sm font-medium">
              Todavía no agregaste experiencia.
            </p>

            <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-muted">
              Agregá tu trayectoria laboral para comenzar a construir tu
              historial profesional.
            </p>
          </div>
        )}

        {profile.experience.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-border bg-surface p-5 sm:p-7"
          >
            <div className="flex gap-4">
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                <Icon name="briefcase" size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      {item.position}
                    </h3>

                    <p className="mt-1 text-sm text-violet-300">
                      {item.company}
                    </p>
                  </div>

                  <button
                    onClick={() => remove(item.id)}
                    className="self-start rounded-lg border border-border p-2 text-muted hover:text-red-300"
                    title="Eliminar"
                  >
                    <Icon name="trash" size={15} />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
                  <span className="rounded-md bg-background px-2.5 py-1.5">
                    {item.start_date || "—"} —{" "}
                    {item.end_date || "Actualidad"}
                  </span>

                  {!item.end_date && (
                    <span className="rounded-md bg-emerald-500/10 px-2.5 py-1.5 text-emerald-300">
                      Actualmente
                    </span>
                  )}
                </div>

                {item.achievements && (
                  <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
                    {item.achievements}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SKILLS                                                                      */
/* -------------------------------------------------------------------------- */

function SkillsEditor({ profile }: { profile: TalentProfileFull }) {
  const router = useRouter();

  const [newSkill, setNewSkill] = useState("");
  const [busy, setBusy] = useState(false);

  async function addSkill(e?: React.FormEvent) {
    e?.preventDefault();

    if (!newSkill.trim()) return;

    setBusy(true);

    try {
      await addSkillAction({
        name: newSkill.trim(),
      });

      setNewSkill("");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    await deleteSkillAction(id);
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Talent Passport"
        title="Habilidades y especialidades"
        description="Agregá las capacidades que definen tu perfil profesional y ayudan a VORA a conectarte con oportunidades relevantes."
      />

      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
            <Icon name="sparkles" size={18} />
          </div>

          <div>
            <h3 className="font-semibold">Tus habilidades</h3>

            <p className="mt-1 text-xs leading-5 text-muted">
              Usá términos concretos: cocina italiana, pastelería, liderazgo
              de brigada, mixología, food cost, hotelería, etc.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {profile.skills.length === 0 && (
            <p className="text-sm text-muted">
              Aún no has agregado habilidades.
            </p>
          )}

          {profile.skills.map((skill) => (
            <span
              key={skill.id}
              className="group inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              {skill.name}

              <button
                onClick={() => remove(skill.id)}
                className="text-muted hover:text-red-300"
                title="Eliminar"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <form
          onSubmit={addSkill}
          className="mt-7 flex flex-col gap-3 sm:flex-row"
        >
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Agregar una habilidad..."
            className="min-h-11 flex-1 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-violet-400/50"
          />

          <Button type="submit" disabled={busy}>
            <Icon name="plus" size={16} />
            Agregar
          </Button>
        </form>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
            <Icon name="globe" size={18} />
          </div>

          <h3 className="mt-4 font-semibold">Idiomas</h3>

          <p className="mt-1 text-xs leading-5 text-muted">
            Los idiomas son especialmente importantes para oportunidades
            internacionales.
          </p>

          <button className="mt-4 text-xs font-medium text-violet-300">
            Administrar idiomas →
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
            <Icon name="sparkles" size={18} />
          </div>

          <h3 className="mt-4 font-semibold">
            Especialidades profesionales
          </h3>

          <p className="mt-1 text-xs leading-5 text-muted">
            Próximamente podrás especificar atributos específicos según tu
            profesión.
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* EDUCATION                                                                   */
/* -------------------------------------------------------------------------- */

function EducationEditor({ profile }: { profile: TalentProfileFull }) {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    institution: "",
    qualification: "",
    field: "",
    startDate: "",
    endDate: "",
  });

  const [busy, setBusy] = useState(false);

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setBusy(true);

    try {
      await addEducationAction({
        institution: form.institution,
        qualification: form.qualification,
        field: form.field,
        startDate: form.startDate,
        endDate: form.endDate || null,
      });

      setShowForm(false);

      setForm({
        institution: "",
        qualification: "",
        field: "",
        startDate: "",
        endDate: "",
      });

      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    await deleteEducationAction(id);
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Talent Passport"
        title="Educación y certificaciones"
        description="Agregá estudios, cursos y certificaciones relevantes para tu profesión."
        action={
          <Button onClick={() => setShowForm((v) => !v)}>
            <Icon name="plus" size={16} />
            Agregar
          </Button>
        }
      />

      {showForm && (
        <form
          onSubmit={add}
          className="space-y-5 rounded-2xl border border-violet-400/20 bg-violet-500/[0.03] p-5 sm:p-7"
        >
          <Field
            label="Institución"
            value={form.institution}
            onChange={(v) =>
              setForm((f) => ({ ...f, institution: v }))
            }
            placeholder="Ej. Instituto Gastronómico"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Título / certificación"
              value={form.qualification}
              onChange={(v) =>
                setForm((f) => ({ ...f, qualification: v }))
              }
              placeholder="Chef Profesional"
            />

            <Field
              label="Área"
              value={form.field}
              onChange={(v) =>
                setForm((f) => ({ ...f, field: v }))
              }
              placeholder="Gastronomía"
            />

            <Field
              label="Desde"
              value={form.startDate}
              onChange={(v) =>
                setForm((f) => ({ ...f, startDate: v }))
              }
              placeholder="2018"
            />

            <Field
              label="Hasta"
              value={form.endDate}
              onChange={(v) =>
                setForm((f) => ({ ...f, endDate: v }))
              }
              placeholder="2020"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </Button>

            <Button type="submit" disabled={busy}>
              {busy ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {profile.education.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
            <Icon name="book" size={25} />

            <p className="mt-4 text-sm font-medium">
              Todavía no agregaste educación.
            </p>

            <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-muted">
              Estudios, cursos y certificaciones ayudan a completar tu
              identidad profesional.
            </p>
          </div>
        )}

        {profile.education.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-border bg-surface p-5 sm:p-7"
          >
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                <Icon name="book" size={18} />
              </div>

              <div className="flex-1">
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">
                      {item.institution}
                    </h3>

                    {item.qualification && (
                      <p className="mt-1 text-sm text-cyan-300">
                        {item.qualification}
                      </p>
                    )}

                    {item.field && (
                      <p className="mt-1 text-xs text-muted">
                        {item.field}
                      </p>
                    )}

                    {(item.start_date || item.end_date) && (
                      <p className="mt-1 text-xs text-muted">
                        {item.start_date || "—"} —{" "}
                        {item.end_date || "Actualidad"}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => remove(item.id)}
                    className="text-muted hover:text-red-300"
                  >
                    <Icon name="trash" size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PORTFOLIO                                                                   */
/* -------------------------------------------------------------------------- */

function PortfolioPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Talent Passport"
        title="Portfolio"
        description="Mostrá tu trabajo más allá del CV: platos, proyectos, eventos, aperturas, equipos y otros trabajos profesionales."
      />

      <div className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.07] to-cyan-500/[0.02] p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
            <Icon name="image" size={24} />
          </div>

          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-400">
              Próxima capa de tu perfil
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              Tu trabajo también habla de vos.
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              El portfolio permitirá incorporar fotos, videos y otros medios
              para mostrar tu experiencia de una forma mucho más visual que un
              CV tradicional.
            </p>
          </div>

          <Button variant="secondary">
            <Icon name="plus" size={16} />
            Agregar contenido
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background text-muted">
            <Icon name="image" size={19} />
          </div>

          <h3 className="mt-4 font-semibold">Fotos</h3>

          <p className="mt-1 text-xs leading-5 text-muted">
            Platos, pastelería, eventos, presentaciones, trabajo de cocina y
            otros resultados profesionales.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background text-muted">
            <Icon name="video" size={19} />
          </div>

          <h3 className="mt-4 font-semibold">Videos</h3>

          <p className="mt-1 text-xs leading-5 text-muted">
            Presentaciones, técnicas, entrevistas, eventos o cualquier
            contenido que ayude a mostrar tu experiencia.
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* REQUESTS                                                                    */
/* -------------------------------------------------------------------------- */

function RequestsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Oportunidades"
        title="Solicitudes"
        description="Acá vas a gestionar las conexiones y oportunidades que lleguen desde empresas a través de VORA."
      />

      <div className="rounded-2xl border border-border bg-surface p-8 text-center sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
          <Icon name="bell" size={24} />
        </div>

        <h3 className="mt-5 text-lg font-semibold">
          Todavía no tenés solicitudes
        </h3>

        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted">
          Cuando una empresa esté interesada en conectar con vos a través de
          VORA, las solicitudes aparecerán acá.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
            <Icon name="search" size={18} />
          </div>

          <h3 className="mt-4 text-sm font-semibold">
            Empresas descubren talento
          </h3>

          <p className="mt-1 text-xs leading-5 text-muted">
            Una empresa puede encontrar tu perfil cuando busca profesionales
            con características similares a las tuyas.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
            <Icon name="send" size={18} />
          </div>

          <h3 className="mt-4 text-sm font-semibold">
            Recibís una solicitud
          </h3>

          <p className="mt-1 text-xs leading-5 text-muted">
            Podrás revisar la oportunidad antes de decidir si querés avanzar.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
            <Icon name="check" size={18} />
          </div>

          <h3 className="mt-4 text-sm font-semibold">
            Vos decidís
          </h3>

          <p className="mt-1 text-xs leading-5 text-muted">
            Aceptás o rechazás la conexión. Tu perfil siempre permanece bajo
            tu control.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-background p-5 sm:p-6">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
            <Icon name="shield" size={18} />
          </div>

          <div>
            <p className="font-semibold">Importante</p>

            <p className="mt-1 text-sm leading-6 text-muted">
              VORA no decide por vos. La plataforma facilita el descubrimiento
              y la conexión; vos decidís con quién querés avanzar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CV                                                                          */
/* -------------------------------------------------------------------------- */

function CVPage({
  name,
  title,
  slug,
  initials,
}: {
  name: string;
  title: string;
  slug: string | null;
  initials: string;
}) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Herramientas"
        title="Mi CV"
        description="Tu CV se genera automáticamente a partir de tu identidad profesional."
        action={
          <div className="flex gap-2">
            <Link href="/talent/profile/cv">
              <Button variant="secondary">
                <Icon name="eye" size={16} />
                Vista previa
              </Button>
            </Link>

            <a href="/talent/profile/cv/pdf" download>
              <Button>
                <Icon name="download" size={16} />
                Descargar PDF
              </Button>
            </a>
          </div>
        }
      />

      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
        <div className="mx-auto max-w-2xl bg-white p-7 text-black shadow-2xl sm:p-10">
          <div className="flex items-start justify-between border-b border-black/10 pb-5">
            <div>
              <h1 className="text-2xl font-bold">{name}</h1>

              <p className="mt-1 text-sm font-medium text-black/60">
                {title}
              </p>

              {slug && (
                <p className="mt-2 text-xs text-black/45">
                  vora.com/talent/{slug}
                </p>
              )}
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/5 text-sm font-semibold">
              {initials}
            </div>
          </div>

          <p className="mt-6 text-sm leading-5 text-black/60">
            Tu CV se genera a partir de la información de tu perfil.
            Completá tu experiencia, habilidades y educación para generar una
            representación profesional más completa.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-black/[0.03] p-4">
              <p className="text-xs font-semibold">Fuente del CV</p>
              <p className="mt-1 text-[11px] text-black/50">
                Tu Talent Passport
              </p>
            </div>

            <div className="rounded-lg bg-black/[0.03] p-4">
              <p className="text-xs font-semibold">Actualización</p>
              <p className="mt-1 text-[11px] text-black/50">
                Automática
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-background p-5">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
            <Icon name="sparkles" size={18} />
          </div>

          <div>
            <p className="font-semibold">Un perfil. Distintas versiones.</p>

            <p className="mt-1 text-sm leading-6 text-muted">
              En el futuro VORA podrá generar versiones adaptadas de tu CV
              para distintos tipos de oportunidades: hotelería, fine dining,
              internacional, catering y otras.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SETTINGS                                                                    */
/* -------------------------------------------------------------------------- */

function SettingsPage({
  slug,
  isPublic,
  showPhone,
}: {
  slug: string | null;
  isPublic: boolean;
  showPhone: boolean;
}) {
  const router = useRouter();

  async function toggleVisibility(value: boolean) {
    await setVisibilityAction(value ? "public" : "private");
    router.refresh();
  }

  async function togglePhone(value: boolean) {
    await setShowPhoneAction(value);
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Cuenta"
        title="Configuración"
        description="Controlá cómo funciona y qué información comparte tu identidad profesional."
      />

      {/* Main principle */}
      <div className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.08] to-cyan-500/[0.03] p-5 sm:p-7">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
            <Icon name="shield" size={20} />
          </div>

          <div>
            <p className="text-lg font-semibold">
              Vos controlás lo que compartís.
            </p>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              VORA te permite construir una identidad profesional permanente
              sin obligarte a compartir información que no quieras compartir.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* Visibility */}
          <div className="rounded-2xl border border-border bg-surface">
            <div className="border-b border-border p-5">
              <h3 className="font-semibold">Visibilidad</h3>

              <p className="mt-1 text-xs leading-5 text-muted">
                Controlá si tu perfil puede ser descubierto dentro de VORA y
                compartido mediante su URL.
              </p>
            </div>

            <div className="divide-y divide-border">
              <div className="p-5">
                <Toggle
                  checked={isPublic}
                  onChange={toggleVisibility}
                  label="Perfil disponible"
                  description="Tu perfil puede aparecer en búsquedas profesionales y puede ser compartido mediante su URL."
                />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-2xl border border-border bg-surface">
            <div className="border-b border-border p-5">
              <h3 className="font-semibold">Información de contacto</h3>

              <p className="mt-1 text-xs leading-5 text-muted">
                Vos decidís si querés incluir tu teléfono como parte de la
                información compartida.
              </p>
            </div>

            <div className="p-5">
              <Toggle
                checked={showPhone}
                onChange={togglePhone}
                label="Mostrar teléfono"
                description="Si está activado, tu teléfono podrá formar parte de la información visible de tu perfil cuando corresponda."
              />
            </div>
          </div>

          {/* Sharing explanation */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                <Icon name="share" size={18} />
              </div>

              <div>
                <h3 className="font-semibold">
                  Cuando compartís tu perfil
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted">
                  Podés enviar tu URL directamente a cualquier empresa. La
                  empresa que reciba el perfil deberá registrarse gratis en
                  VORA para verlo.
                </p>

                <p className="mt-3 text-xs leading-5 text-muted">
                  Esto permite que tu perfil viaje libremente sin convertirlo
                  en una base de datos pública anónima.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* URL card */}
        <div className="h-fit rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            Tu perfil
          </p>

          {slug ? (
            <>
              <div className="mt-4 rounded-xl border border-border bg-background p-4">
                <p className="break-all text-xs font-medium text-violet-300">
                  vora.com/talent/{slug}
                </p>
              </div>

              <Link href={`/talent/${slug}`} target="_blank">
                <Button variant="secondary" className="mt-3 w-full">
                  <Icon name="external" size={15} />
                  Ver perfil
                </Button>
              </Link>

              <Link href="/talent/profile/qr">
                <Button variant="secondary" className="mt-2 w-full">
                  <Icon name="qr" size={15} />
                  Ver QR
                </Button>
              </Link>
            </>
          ) : (
            <p className="mt-3 text-xs leading-5 text-muted">
              Tu URL se creará cuando completes tu nombre de usuario.
            </p>
          )}

          <div className="my-5 h-px bg-border" />

          <p className="text-sm font-semibold">
            El principio de VORA
          </p>

          <p className="mt-2 text-xs leading-5 text-muted">
            Tu perfil pertenece a tu carrera profesional. VORA proporciona la
            infraestructura para que puedas mantenerlo, compartirlo y
            conectarte con oportunidades.
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN DASHBOARD                                                              */
/* -------------------------------------------------------------------------- */

export default function TalentDashboard(props: DashboardProps) {
  const {
    name,
    title,
    avatarUrl,
    slug,
    isPublic,
    showPhone,
    completion,
    profile,
  } = props;

  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const initials = (name || "V").charAt(0).toUpperCase();

  const tabTitle = useMemo(() => {
    const titles: Record<Tab, string> = {
      overview: "Resumen",
      profile: "Información profesional",
      experience: "Experiencia",
      skills: "Habilidades",
      education: "Educación",
      portfolio: "Portfolio",
      requests: "Solicitudes",
      cv: "Mi CV",
      settings: "Configuración",
    };

    return titles[activeTab];
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <div className="fixed inset-y-0 left-0 z-50 hidden lg:block">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            name={name}
            title={title}
            initials={initials}
          />
        </div>

        {/* Mobile sidebar */}
        {mobileSidebar && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileSidebar(false)}
            />

            <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
              <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onClose={() => setMobileSidebar(false)}
                name={name}
                title={title}
                initials={initials}
              />
            </div>
          </>
        )}

        <div className="flex min-w-0 flex-1 flex-col lg:pl-[270px]">
          <TopBar
            onMenu={() => setMobileSidebar(true)}
            name={name}
            initials={initials}
          />

          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            {activeTab !== "overview" && (
              <div className="mb-6 flex items-center gap-2 text-xs text-muted">
                <button
                  onClick={() => setActiveTab("overview")}
                  className="hover:text-foreground"
                >
                  Mi espacio
                </button>

                <Icon name="arrow" size={12} />

                <span className="text-foreground">{tabTitle}</span>
              </div>
            )}

            {activeTab === "overview" && (
              <Overview
                setTab={setActiveTab}
                name={name}
                title={title}
                initials={initials}
                avatarUrl={avatarUrl}
                slug={slug}
                completion={completion}
                profile={profile}
              />
            )}

            {activeTab === "profile" && (
              <ProfileEditor profile={profile} />
            )}

            {activeTab === "experience" && (
              <ExperienceEditor profile={profile} />
            )}

            {activeTab === "skills" && (
              <SkillsEditor profile={profile} />
            )}

            {activeTab === "education" && (
              <EducationEditor profile={profile} />
            )}

            {activeTab === "portfolio" && <PortfolioPage />}

            {activeTab === "requests" && <RequestsPage />}

            {activeTab === "cv" && (
              <CVPage
                name={name}
                title={title}
                slug={slug}
                initials={initials}
              />
            )}

            {activeTab === "settings" && (
              <SettingsPage
                slug={slug}
                isPublic={isPublic}
                showPhone={showPhone}
              />
            )}
          </main>

          <footer className="border-t border-border/60 px-4 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 text-[10px] text-muted-2 sm:flex-row sm:items-center sm:justify-between">
              <span>
                VORA Talent · Professional Talent Passport
              </span>

              <span>
                Tu talento. Tu perfil. Sin fronteras.
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}