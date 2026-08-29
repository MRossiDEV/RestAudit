const LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  org_admin: "Organization Admin",
  senior_auditor: "Senior Auditor",
  auditor: "Auditor",
  owner: "Owner",
};

export function roleLabel(role: string): string {
  return LABELS[role] ?? role;
}