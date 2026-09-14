import Link from "next/link";
import CreateProfileForm from "../create-profile";

export default function NewTalentProfilePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/admin/talent" className="text-xs text-muted hover:text-foreground">
          ← Talento
        </Link>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
          Nuevo perfil profesional
        </h1>
        <p className="mt-1 text-sm text-muted">
          Crea un Passport Profesional VORA para un profesional de la industria gastronómica.
        </p>
      </div>
      <CreateProfileForm />
    </div>
  );
}