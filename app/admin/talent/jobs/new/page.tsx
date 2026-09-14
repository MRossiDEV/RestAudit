import Link from "next/link";
import { listRestaurants } from "@/db/queries/admin";
import CreateJobForm from "../create-job";

export default function NewTalentJobPage() {
  const restaurants = listRestaurants().map((r) => ({ id: r.id, name: r.name }));

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/admin/talent/jobs" className="text-xs text-muted hover:text-foreground">
          ← Empleos
        </Link>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
          Nuevo empleo
        </h1>
        <p className="mt-1 text-sm text-muted">
          Publica una oportunidad laboral para la red de talento VORA.
        </p>
      </div>
      <CreateJobForm restaurants={restaurants} />
    </div>
  );
}