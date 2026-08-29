import { requireUser } from "@/lib/auth";

export default async function AdminDashboard() {
  const user = await requireUser();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
      <p className="mt-1 text-sm text-muted">
        System administration for {user.name}.
      </p>

      <div className="mt-8 rounded-xl border border-border bg-surface p-6">
        <p className="text-sm text-muted">
          Organization, user, AI, and training configuration will appear here in later
          sprints.
        </p>
      </div>
    </div>
  );
}