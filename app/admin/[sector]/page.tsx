import Link from "next/link";

export default async function SectorPlaceholder({
  params,
}: {
  params: Promise<{ sector: string }>;
}) {
  const { sector } = await params;
  const title = sector
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-24 text-center">
      <span className="text-4xl">✦</span>
      <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted">
        This sector of the Command Center is scheduled for an upcoming build
        phase. The navigation, guards, and shell are already in place.
      </p>
      <Link
        href="/admin"
        className="glow-primary mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        Back to Command Center
      </Link>
    </div>
  );
}