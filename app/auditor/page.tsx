import { requireUser } from "@/lib/auth";
import { roleLabel } from "@/lib/roles";

export default async function AuditorDashboard() {
  const user = await requireUser();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Auditor Dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Signed in as {user.name} ({roleLabel(user.role)}).
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Active Restaurants", value: "0" },
          { label: "Active Audits", value: "0" },
          { label: "Pending Reviews", value: "0" },
          { label: "Critical Findings", value: "0" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}