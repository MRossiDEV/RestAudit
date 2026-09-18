"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TalentProfileFull } from "@/types/domain";
import {
  addEducationAction,
  addExperienceAction,
  addLanguageAction,
  addSkillAction,
  deleteEducationAction,
  deleteExperienceAction,
  deleteLanguageAction,
  deleteSkillAction,
  setShowPhoneAction,
  setVisibilityAction,
  updateProfileAction,
  updateUsernameAction,
} from "@/server/actions/talentPublic";
import { uploadAvatarAction } from "@/server/actions/avatar";

const AVAILABILITY_OPTIONS = [
  { value: "immediate", label: "Disponible de inmediato" },
  { value: "15_days", label: "Disponible en 15 días" },
  { value: "30_days", label: "Disponible en 30 días" },
  { value: "employed", label: "Actualmente empleado" },
  { value: "open", label: "Abierto a oportunidades" },
];

const PROFICIENCY_OPTIONS = [
  { value: "native", label: "Nativo" },
  { value: "professional", label: "Profesional" },
  { value: "intermediate", label: "Intermedio" },
  { value: "basic", label: "Básico" },
];

export default function ProfileEditor({ profile }: { profile: TalentProfileFull }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(key: string, fn: () => Promise<{ error?: string } | undefined>) {
    setBusy(key);
    setError(null);
    const result = await fn();
    setBusy(null);
    if (result?.error) setError(result.error);
    else router.refresh();
  }

  const field = (label: string, name: string, defaultValue: string, extra?: React.ReactNode) => (
    <div>
      <label className="text-sm font-medium">{label}</label>
      {extra ?? (
        <input
          name={name}
          defaultValue={defaultValue}
          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
        />
      )}
    </div>
  );

  async function saveBasics(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await run("basics", () =>
      updateProfileAction({
        firstName: String(fd.get("firstName") ?? ""),
        lastName: String(fd.get("lastName") ?? ""),
        professionalTitle: String(fd.get("professionalTitle") ?? ""),
        city: String(fd.get("city") ?? ""),
        country: String(fd.get("country") ?? ""),
        summary: String(fd.get("summary") ?? ""),
        availability: String(fd.get("availability") ?? "") as never,
      }),
    );
  }

  async function saveUsername(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await run("username", () => updateUsernameAction(String(fd.get("username") ?? "")));
  }

  async function uploadAvatar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await run("avatar", async () => {
      const result = await uploadAvatarAction(fd);
      return result?.error ? { error: result.error } : undefined;
    });
  }

  return (
    <div className="mt-8 space-y-8">
      {error && (
        <p className="rounded-lg border border-negative/30 bg-negative/10 px-3 py-2 text-sm text-negative">
          {error}
        </p>
      )}

      {/* Basic info */}
      <section className="rounded-xl border border-border bg-surface p-5">
        <h2 className="font-display text-base font-semibold">Información básica</h2>
        <form onSubmit={saveBasics} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {field("Nombre", "firstName", profile.first_name)}
            {field("Apellido", "lastName", profile.last_name)}
          </div>
          {field("Título profesional", "professionalTitle", profile.professional_title)}
          <div className="grid gap-4 sm:grid-cols-2">
            {field("Ciudad", "city", profile.location)}
            {field("País", "country", profile.country)}
          </div>
          {field(
            "Disponibilidad",
            "availability",
            profile.availability_status,
            <select
              name="availability"
              defaultValue={profile.availability_status}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            >
              {AVAILABILITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>,
          )}
          <div>
            <label className="text-sm font-medium">Resumen profesional</label>
            <textarea
              name="summary"
              rows={4}
              defaultValue={profile.bio}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={busy === "basics"}
            className="glow-primary rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
          >
            {busy === "basics" ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </section>

      {/* Username */}
      <section className="rounded-xl border border-border bg-surface p-5">
        <h2 className="font-display text-base font-semibold">Tu URL</h2>
        <p className="mt-1 text-sm text-muted">vora.com/talent/</p>
        <form onSubmit={saveUsername} className="mt-2 flex gap-2">
          <input
            name="username"
            defaultValue={profile.slug ?? ""}
            placeholder="tu-nombre"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={busy === "username"}
            className="shrink-0 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 disabled:opacity-60"
          >
            Guardar
          </button>
        </form>
      </section>

      {/* Avatar */}
      <section className="rounded-xl border border-border bg-surface p-5">
        <h2 className="font-display text-base font-semibold">Foto de perfil</h2>
        <form onSubmit={uploadAvatar} className="mt-4 flex items-center gap-4">
          {profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatar_url} alt="" className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 text-muted">
              {(profile.first_name || profile.last_name).charAt(0)}
            </div>
          )}
          <input
            type="file"
            name="avatar"
            accept="image/jpeg,image/png,image/webp"
            className="text-sm text-muted"
          />
          <button
            type="submit"
            disabled={busy === "avatar"}
            className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 disabled:opacity-60"
          >
            Subir
          </button>
        </form>
      </section>

      {/* Privacy */}
      <section className="rounded-xl border border-border bg-surface p-5">
        <h2 className="font-display text-base font-semibold">Privacidad</h2>
        <div className="mt-4 space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-sm">Perfil público</span>
            <input
              type="checkbox"
              checked={profile.profile_visibility === "public"}
              onChange={(e) =>
                run("visibility", () => setVisibilityAction(e.target.checked ? "public" : "private"))
              }
              className="h-4 w-4 accent-primary"
            />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm">Mostrar teléfono públicamente</span>
            <input
              type="checkbox"
              checked={profile.show_phone_publicly}
              onChange={(e) => run("phone", () => setShowPhoneAction(e.target.checked))}
              className="h-4 w-4 accent-primary"
            />
          </label>
        </div>
      </section>

      {/* Experience */}
      <ListSection title="Experiencia">
        <AddExperienceForm busy={busy} run={run} />
        <div className="mt-4 space-y-3">
          {profile.experience.map((e) => (
            <div key={e.id} className="rounded-lg border border-border p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{e.position}</p>
                  <p className="text-sm text-muted">{e.company}</p>
                  <p className="text-xs text-muted-2">
                    {e.start_date || "—"} — {e.end_date || "Actualidad"}
                  </p>
                </div>
                <button
                  onClick={() => run(`del-exp-${e.id}`, () => deleteExperienceAction(e.id))}
                  className="text-xs text-negative hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </ListSection>

      {/* Skills */}
      <ListSection title="Habilidades">
        <AddSkillForm busy={busy} run={run} />
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.skills.map((s) => (
            <span key={s.id} className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1 text-sm">
              {s.name}
              <button
                onClick={() => run(`del-skill-${s.id}`, () => deleteSkillAction(s.id))}
                className="text-xs text-muted-2 hover:text-negative"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </ListSection>

      {/* Education */}
      <ListSection title="Educación">
        <AddEducationForm busy={busy} run={run} />
        <div className="mt-4 space-y-3">
          {profile.education.map((e) => (
            <div key={e.id} className="rounded-lg border border-border p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{e.institution}</p>
                  {e.qualification && <p className="text-sm text-muted">{e.qualification}</p>}
                </div>
                <button
                  onClick={() => run(`del-edu-${e.id}`, () => deleteEducationAction(e.id))}
                  className="text-xs text-negative hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </ListSection>

      {/* Languages */}
      <ListSection title="Idiomas">
        <AddLanguageForm busy={busy} run={run} />
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.languages.map((l) => (
            <span key={l.id} className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1 text-sm">
              {l.language}
              <button
                onClick={() => run(`del-lang-${l.id}`, () => deleteLanguageAction(l.id))}
                className="text-xs text-muted-2 hover:text-negative"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </ListSection>
    </div>
  );
}

function ListSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <h2 className="font-display text-base font-semibold">{title}</h2>
      {children}
    </section>
  );
}

type Run = (key: string, fn: () => Promise<{ error?: string } | undefined>) => Promise<void>;

function AddExperienceForm({ busy, run }: { busy: string | null; run: Run }) {
  const [open, setOpen] = useState(false);
  if (!open) return <button onClick={() => setOpen(true)} className="mt-3 text-sm text-primary hover:underline">+ Añadir</button>;
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await run("add-exp", () =>
      addExperienceAction({
        company: String(fd.get("company") ?? ""),
        position: String(fd.get("position") ?? ""),
        startDate: String(fd.get("startDate") ?? ""),
        endDate: String(fd.get("endDate") ?? "") || null,
        description: String(fd.get("description") ?? ""),
      }),
    );
    setOpen(false);
  }
  return (
    <form onSubmit={submit} className="mt-3 space-y-3">
      <input name="company" placeholder="Empresa" required className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
      <input name="position" placeholder="Cargo" required className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="startDate" type="date" className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
        <input name="endDate" type="date" className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
      </div>
      <textarea name="description" rows={2} placeholder="Descripción" className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
      <button type="submit" disabled={busy === "add-exp"} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60">
        Añadir
      </button>
    </form>
  );
}

function AddSkillForm({ busy, run }: { busy: string | null; run: Run }) {
  const [open, setOpen] = useState(false);
  if (!open) return <button onClick={() => setOpen(true)} className="mt-3 text-sm text-primary hover:underline">+ Añadir</button>;
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await run("add-skill", () => addSkillAction({ name: String(fd.get("name") ?? "") }));
    setOpen(false);
  }
  return (
    <form onSubmit={submit} className="mt-3 flex gap-2">
      <input name="name" placeholder="Ej. Cocina profesional" required className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
      <button type="submit" disabled={busy === "add-skill"} className="shrink-0 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60">
        Añadir
      </button>
    </form>
  );
}

function AddEducationForm({ busy, run }: { busy: string | null; run: Run }) {
  const [open, setOpen] = useState(false);
  if (!open) return <button onClick={() => setOpen(true)} className="mt-3 text-sm text-primary hover:underline">+ Añadir</button>;
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await run("add-edu", () =>
      addEducationAction({
        institution: String(fd.get("institution") ?? ""),
        qualification: String(fd.get("qualification") ?? ""),
        field: String(fd.get("field") ?? ""),
        startDate: String(fd.get("startDate") ?? ""),
        endDate: String(fd.get("endDate") ?? "") || null,
      }),
    );
    setOpen(false);
  }
  return (
    <form onSubmit={submit} className="mt-3 space-y-3">
      <input name="institution" placeholder="Institución" required className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
      <input name="qualification" placeholder="Título / certificación" className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
      <input name="field" placeholder="Área" className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="startDate" type="date" className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
        <input name="endDate" type="date" className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
      </div>
      <button type="submit" disabled={busy === "add-edu"} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60">
        Añadir
      </button>
    </form>
  );
}

function AddLanguageForm({ busy, run }: { busy: string | null; run: Run }) {
  const [open, setOpen] = useState(false);
  if (!open) return <button onClick={() => setOpen(true)} className="mt-3 text-sm text-primary hover:underline">+ Añadir</button>;
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await run("add-lang", () =>
      addLanguageAction({
        language: String(fd.get("language") ?? ""),
        proficiency: String(fd.get("proficiency") ?? "professional") as never,
      }),
    );
    setOpen(false);
  }
  return (
    <form onSubmit={submit} className="mt-3 flex gap-2">
      <input name="language" placeholder="Ej. Inglés" required className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
      <select name="proficiency" defaultValue="professional" className="rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary">
        {PROFICIENCY_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <button type="submit" disabled={busy === "add-lang"} className="shrink-0 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60">
        Añadir
      </button>
    </form>
  );
}