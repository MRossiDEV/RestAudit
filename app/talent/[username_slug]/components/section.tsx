export function Section({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-7">
        <h2 className="font-display text-lg font-semibold tracking-tight">
          {title}
        </h2>
        {action}
      </div>
      <div className="p-5 sm:p-7">{children}</div>
    </section>
  );
}
