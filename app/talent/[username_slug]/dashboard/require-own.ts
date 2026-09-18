import { notFound, redirect } from "next/navigation";
import { requireUser, type CurrentUser } from "@/lib/auth";
import {
  createCandidateProfile,
  getTalentProfileByUserId,
} from "@/db/queries/talent";
import type { TalentProfile } from "@/types/domain";

/**
 * Resolve the talent profile for the given slug and verify the session user
 * owns it. Auto-provisions a profile on first visit. Redirects to the user's
 * own dashboard if they try to view someone else's.
 */
export async function requireOwnTalentProfile(
  usernameSlug: string,
): Promise<{ user: CurrentUser; profile: TalentProfile }> {
  const user = await requireUser();

  let profile = getTalentProfileByUserId(user.id);
  if (!profile) {
    const [firstName, ...rest] = (user.name ?? "").trim().split(/\s+/);
    profile = createCandidateProfile({
      userId: user.id,
      firstName: firstName || user.name || "Profesional",
      lastName: rest.join(" "),
    });
  }

  if (profile.slug !== usernameSlug) {
    if (profile.slug) redirect(`/talent/${profile.slug}/dashboard`);
    notFound();
  }

  return { user, profile };
}
