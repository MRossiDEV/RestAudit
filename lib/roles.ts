const LABELS: Record<string, string> = {
  super_admin: "Super administrador",
  org_admin: "Administrador de la organización",
  senior_auditor: "Auditor senior",
  auditor: "Auditor",
  owner: "Propietario",
  candidate: "Candidato",
};

export function roleLabel(role: string): string {
  return LABELS[role] ?? role;
}