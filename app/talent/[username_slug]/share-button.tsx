"use client";

import { useState } from "react";
import { Share2, Link as LinkIcon, Copy, Check } from "lucide-react";

export default function ShareButton({ name, url }: { name: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const [fallbackOpen, setFallbackOpen] = useState(false);

  const text = `${name} — profesional de la industria gastronómica.\nMira mi perfil VORA:`;

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: name, text, url });
        return;
      } catch {
        // user cancelled — fall through to fallback
      }
    }
    setFallbackOpen(true);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="glow-primary inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        <Share2 className="h-4 w-4" />
        Compartir perfil
      </button>

      {fallbackOpen && (
        <div className="absolute right-0 z-10 mt-2 w-64 rounded-xl border border-border bg-surface p-2 shadow-lg">
          <button
            onClick={copyLink}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-surface-2"
          >
            {copied ? <Check className="h-4 w-4 text-positive" /> : <Copy className="h-4 w-4" />}
            {copied ? "Enlace copiado" : "Copiar enlace"}
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-surface-2"
          >
            <LinkIcon className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(`${text}\n${url}`)}`}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-surface-2"
          >
            <LinkIcon className="h-4 w-4" />
            Correo electrónico
          </a>
        </div>
      )}
    </div>
  );
}