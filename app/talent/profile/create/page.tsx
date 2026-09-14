import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getTalentProfileByUserId } from "@/db/queries/talent";
import CreateProfileForm from "./create-form";

export const dynamic = "force-dynamic";

export const metadata = { title: "Crea tu perfil" };

export default async function CreateProfilePage() {
  const user = await requireUser();
  if (getTalentProfileByUserId(user.id)) redirect("/talent/profile");

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Crea tu perfil profesional
      </h1>
      <p className="mt-1 text-sm text-muted">
        Empieza con lo esencial. Podrás completar el resto después.
      </p>
      <div className="mt-8">
        <CreateProfileForm />
      </div>
    </main>
  );
}