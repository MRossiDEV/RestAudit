"use client";

import { useTransition } from "react";
import { toggleSaveTalent } from "@/server/actions/talentSearch";

export default function SaveButton({
  talentId,
  saved,
}: {
  talentId: string;
  saved: boolean;
}) {
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => toggleSaveTalent(talentId))}
      className={`inline-flex min-h-10 items-center justify-center rounded-xl border px-4 text-sm font-medium transition-colors ${
        saved
          ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
          : "border-border bg-background text-muted hover:border-violet-400/30 hover:text-foreground"
      } disabled:opacity-50`}
    >
      {saved ? "Guardado" : "Guardar"}
    </button>
  );
}
