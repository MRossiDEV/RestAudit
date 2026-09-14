import Link from "next/link";
import { redirect } from "next/navigation";
import { FileDown } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getTalentProfileByUserId } from "@/db/queries/talent";

export const dynamic = "force-dynamic";

export const metadata = { title: "Descargar CV" };

export default async function CvPage() {
  const user = await requireUser();
  const profile = getTalentProfileByUserId(user.id);
  if (!profile) redirect("/talent/profile/create");

  const name = `${profile.first_name} ${profile.last_name}`.trim();

  return (
    <main className="mx-auto max-w-md px-6 py-16 text-center">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Descarga tu CV</h1>
      <p className="mt-1 text-sm text-muted">
        Generado a partir de tu perfil. Incluye tu código QR y tu URL pública.
      </p>

      <div className="mx-auto mt-8 w-full max-w-xs rounded-2xl border border-border bg-surface p-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 text-xl text-muted">
          {name.charAt(0)}
        </div>
        <p className="mt-3 font-medium">{name}</p>
        <p className="text-sm text-muted">{profile.professional_title}</p>

        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/talent/profile/cv/pdf"
          download
          className="glow-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <FileDown className="h-4 w-4" />
          Descargar PDF
        </a>
      </div>

      <p className="mt-6 text-xs text-muted-2">
        ¿Actualizaste tu perfil? Vuelve a descargar el CV para reflejar los cambios.
      </p>

      <Link href="/talent/profile" className="mt-8 inline-block text-sm text-muted hover:text-foreground">
        ← Volver
      </Link>
    </main>
  );
}