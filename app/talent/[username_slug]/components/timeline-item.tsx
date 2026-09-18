export function TimelineItem({
  position,
  company,
  start,
  end,
  description,
  current,
}: {
  position: string;
  company: string;
  start?: string | null;
  end?: string | null;
  description?: string | null;
  current?: boolean;
}) {
  return (
    <div className="relative pl-8">
      <span className="absolute left-[3px] top-1.5 h-2.5 w-2.5 rounded-full bg-violet-400 ring-4 ring-violet-400/10" />
      <div className="absolute left-[7px] top-4 h-[calc(100%+1.5rem)] w-px bg-border" />
      <div className="relative">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <h3 className="font-semibold">{position}</h3>
            <p className="mt-0.5 text-sm text-violet-300">{company}</p>
          </div>
          <span className="w-fit rounded-md bg-background px-2.5 py-1 text-[10px] text-muted">
            {start || "—"} — {end || "Actualidad"}
          </span>
        </div>

        {current && (
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Actualmente
          </span>
        )}

        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
