import Link from "next/link";
import { Download } from "lucide-react";
import { publicProfileUrl } from "@/lib/url";
import { requireOwnTalentProfile } from "../require-own";

export const dynamic = "force-dynamic";

export const metadata = { title: "Mi código QR" };

export default async function QrPage({
  params,
}: {
  params: Promise<{ username_slug: string }>;
}) {
  const { username_slug } = await params;
  const { profile } = await requireOwnTalentProfile(username_slug);

  const url = publicProfileUrl(profile.slug!);
  const qrPng = `/talent/${username_slug}/dashboard/qr/png`;
  const qrSvg = `/talent/${username_slug}/dashboard/qr/svg`;
  const backUrl = `/talent/${username_slug}/dashboard`;

  return (
    <main className="mx-auto max-w-md px-6 py-16 text-center">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Tu QR profesional</h1>
      <p className="mt-1 text-sm text-muted">
        Escanéalo para ver tu perfil VORA Talent.
      </p>

      <div className="mx-auto mt-8 w-64 rounded-2xl border border-border bg-surface p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrPng} alt="Código QR de tu perfil" className="mx-auto h-56 w-56" />
        <p className="mt-4 break-all font-display text-sm text-muted">{profile.slug}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="mt-1 block break-all text-xs text-primary hover:underline">
          {url}
        </a>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <a
          href={qrPng}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          Descargar PNG
        </a>
        <a
          href={qrSvg}
          download
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
        >
          <Download className="h-4 w-4" />
          SVG
        </a>
      </div>

      <Link href={backUrl} className="mt-8 inline-block text-sm text-muted hover:text-foreground">
        ← Volver
      </Link>
    </main>
  );
}
