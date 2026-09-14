import Link from "next/link";
import { redirect } from "next/navigation";
import { Download } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getTalentProfileByUserId } from "@/db/queries/talent";
import { publicProfileUrl } from "@/lib/url";

export const dynamic = "force-dynamic";

export const metadata = { title: "Mi código QR" };

export default async function QrPage() {
  const user = await requireUser();
  const profile = getTalentProfileByUserId(user.id);
  if (!profile) redirect("/talent/profile/create");
  if (!profile.slug) redirect("/talent/profile/edit");

  const url = publicProfileUrl(profile.slug);

  return (
    <main className="mx-auto max-w-md px-6 py-16 text-center">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Tu QR profesional</h1>
      <p className="mt-1 text-sm text-muted">
        Escanéalo para ver tu perfil VORA Talent.
      </p>

      <div className="mx-auto mt-8 w-64 rounded-2xl border border-border bg-surface p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/talent/profile/qr/png"
          alt="Código QR de tu perfil"
          className="mx-auto h-56 w-56"
        />
        <p className="mt-4 break-all font-display text-sm text-muted">{profile.slug}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="mt-1 block break-all text-xs text-primary hover:underline">
          {url}
        </a>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <a
          href="/talent/profile/qr/png"
          download
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          Descargar PNG
        </a>
        <a
          href="/talent/profile/qr/svg"
          download
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
        >
          <Download className="h-4 w-4" />
          SVG
        </a>
      </div>

      <Link href="/talent/profile" className="mt-8 inline-block text-sm text-muted hover:text-foreground">
        ← Volver
      </Link>
    </main>
  );
}