"use client";

import Link from "next/link";
import HealthCheckWidget from "./restaurant-check";

export default function CheckPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
            Restaurant<span className="text-primary">Intelligence</span>
          </Link>
          <span className="text-sm text-muted">Chequeo gratuito de salud</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <HealthCheckWidget />
      </main>
    </div>
  );
}