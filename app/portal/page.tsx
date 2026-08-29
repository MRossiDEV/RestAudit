import { requireUser } from "@/lib/auth";

export default async function PortalDashboard() {
  const user = await requireUser();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">My Restaurant</h1>
      <p className="mt-1 text-sm text-muted">Welcome back, {user.name}.</p>

      <div className="mt-8 rounded-xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold">Restaurant Health Score</h2>
        <p className="mt-2 text-3xl font-semibold text-primary">—</p>
        <p className="mt-1 text-sm text-muted">
          Your consultant will populate your health score once an audit is completed.
        </p>
      </div>
    </div>
  );
}