import { redirect } from "next/navigation";
import { requireUser, roleLevel } from "@/lib/auth";
import { roleLabel } from "@/lib/roles";
import { AdminShell } from "./shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  // Guard: only super_admin reaches the Command Center today (expandable to
  // other admin roles via ADMIN_ROLES + per-sector capability map).
  if (roleLevel(user.role) < roleLevel("super_admin")) redirect("/portal");

  return (
    <AdminShell userName={user.name} userRole={roleLabel(user.role)}>
      {children}
    </AdminShell>
  );
}