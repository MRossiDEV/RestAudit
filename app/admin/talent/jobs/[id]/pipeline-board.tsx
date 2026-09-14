"use client";

import { useState } from "react";
import Link from "next/link";
import { setApplicationStatusAction } from "@/server/actions/talent";
import type { ApplicationStatus } from "@/types/domain";

interface PipelineApplication {
  id: string;
  talentProfileId: string;
  talentName: string;
  talentTitle: string;
  matchScore: number | null;
}

interface PipelineColumn {
  status: ApplicationStatus;
  label: string;
  applications: PipelineApplication[];
}

const NEXT_STATUS: Partial<Record<ApplicationStatus, ApplicationStatus>> = {
  applied: "screening",
  screening: "shortlisted",
  shortlisted: "interview",
  interview: "final_review",
  final_review: "hired",
};

export function PipelineBoard({ columns }: { columns: PipelineColumn[] }) {
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function advance(app: PipelineApplication, status: ApplicationStatus) {
    setPending(app.id);
    setError(null);
    const res = await setApplicationStatusAction(app.id, status);
    setPending(null);
    if (res.error) setError(res.error);
  }

  return (
    <div className="space-y-4">
      {error && (
        <p className="rounded-lg border border-negative/30 bg-negative/10 px-3 py-2 text-sm text-negative">
          {error}
        </p>
      )}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {columns.map((col) => (
          <div key={col.status} className="rounded-xl border border-border bg-surface p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">
                {col.label}
              </p>
              <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-muted-2">
                {col.applications.length}
              </span>
            </div>
            <div className="space-y-2">
              {col.applications.map((a) => (
                <div
                  key={a.id}
                  className="rounded-lg border border-border/50 bg-surface-2/40 p-3"
                >
                  <Link
                    href={`/admin/talent/${a.talentProfileId}`}
                    className="font-medium text-foreground hover:text-primary"
                  >
                    {a.talentName}
                  </Link>
                  {a.talentTitle && (
                    <p className="text-xs text-muted">{a.talentTitle}</p>
                  )}
                  {a.matchScore != null && (
                    <p className="mt-1 text-xs font-semibold text-accent-cyan">
                      Match {a.matchScore}%
                    </p>
                  )}
                  {NEXT_STATUS[col.status] && (
                    <button
                      type="button"
                      disabled={pending === a.id}
                      onClick={() => advance(a, NEXT_STATUS[col.status]!)}
                      className="mt-2 w-full rounded-md border border-border py-1 text-xs text-muted transition-colors hover:border-primary/40 hover:text-foreground disabled:opacity-60"
                    >
                      {pending === a.id ? "Moviendo…" : `Mover a ${nextLabel(NEXT_STATUS[col.status]!)}`}
                    </button>
                  )}
                </div>
              ))}
              {col.applications.length === 0 && (
                <p className="px-1 py-4 text-center text-xs text-muted-2">Vacío</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const NEXT_LABEL: Record<string, string> = {
  screening: "cribado",
  shortlisted: "preselección",
  interview: "entrevista",
  final_review: "revisión final",
  hired: "contratado",
};

function nextLabel(status: ApplicationStatus): string {
  return NEXT_LABEL[status] ?? status;
}