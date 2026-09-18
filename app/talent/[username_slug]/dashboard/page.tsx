import { getTalentProfile } from "@/db/queries/talent";
import { profileCompletion } from "@/db/queries/talentPublic";
import { requireOwnTalentProfile } from "./require-own";
import TalentDashboard from "./talent-dashboard";

export const dynamic = "force-dynamic";

export const metadata = { title: "Mi perfil profesional" };

export default async function TalentDashboardPage({
  params,
}: {
  params: Promise<{ username_slug: string }>;
}) {
  const { username_slug } = await params;
  const { profile: bare } = await requireOwnTalentProfile(username_slug);

  const profile = getTalentProfile(bare.id)!;
  const name = `${profile.first_name} ${profile.last_name}`.trim();
  const completion = profileCompletion(bare);

  return (
    <TalentDashboard
      name={name}
      title={profile.professional_title}
      avatarUrl={profile.avatar_url || null}
      slug={bare.slug ?? null}
      isPublic={bare.profile_visibility === "public"}
      showPhone={bare.show_phone_publicly}
      completion={completion}
      profile={profile}
    />
  );
}
