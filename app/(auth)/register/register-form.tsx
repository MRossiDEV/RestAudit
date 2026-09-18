"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Building2, User } from "lucide-react";
import TalentRegisterForm from "./talent-form";
import CompanyRegisterForm from "./company-form";

type Role = "talent" | "company";

export default function UnifiedRegisterForm() {
  const searchParams = useSearchParams();
  const initialRole: Role =
    searchParams.get("role") === "company" ? "company" : "talent";
  const [role, setRole] = useState<Role>(initialRole);

  return (
    <div className="w-full max-w-md">
      <div className="mt-10 grid grid-cols-2 gap-2 rounded-xl border border-border bg-surface p-1">
        <RoleButton
          active={role === "talent"}
          onClick={() => setRole("talent")}
          icon={<User className="h-4 w-4" />}
          label="Soy profesional"
        />
        <RoleButton
          active={role === "company"}
          onClick={() => setRole("company")}
          icon={<Building2 className="h-4 w-4" />}
          label="Soy empresa"
        />
      </div>

      <div className="mt-8">
        {role === "talent" ? <TalentRegisterForm /> : <CompanyRegisterForm />}
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}

function RoleButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
