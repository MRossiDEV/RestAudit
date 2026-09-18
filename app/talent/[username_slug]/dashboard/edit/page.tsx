import { getTalentProfile } from "@/db/queries/talent";
import { requireOwnTalentProfile } from "../require-own";
import ProfileEditor from "./profile-editor";

export const dynamic = "force-dynamic";

export const metadata = { title: "Editar perfil" };

export default async function EditProfilePage({
  params,
}: {
  params: Promise<{ username_slug: string }>;
}) {
  const { username_slug } = await params;
  const { profile } = await requireOwnTalentProfile(username_slug);
  const full = getTalentProfile(profile.id)!;

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Editar perfil</h1>
      <p className="mt-1 text-sm text-muted">
        Mantén tu perfil al día para causar la mejor impresión.
      </p>
      <ProfileEditor profile={full} />
    </main>
  );
}
