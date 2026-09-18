import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getPublicProfilePreview,
  getPublicTalentProfile,
} from "@/db/queries/talentPublic";
import { getTalentProfileBySlug } from "@/db/queries/talent";
import { getBusinessByUserId, recordProfileAccess } from "@/db/queries/business";
import { getCurrentUser } from "@/lib/auth";
import { publicProfileUrl } from "@/lib/url";

import GatedProfile from "./gated-profile";
import { PublicProfile } from "./components/public-profile";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username_slug: string }>;
}): Promise<Metadata> {
  const { username_slug } = await params;
  const profile = getPublicTalentProfile(username_slug);

  if (!profile) {
    return {
      title: "Perfil no disponible",
      robots: { index: false, follow: false },
    };
  }

  const title = `${profile.name} — ${profile.professional_title || "Profesional"} | VORA Talent`;
  const description =
    profile.summary || `Perfil profesional de ${profile.name} en VORA Talent.`;
  const url = publicProfileUrl(profile.slug);

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "profile",
      images: profile.avatar_url ? [{ url: profile.avatar_url }] : undefined,
    },
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username_slug: string }>;
}) {
  const { username_slug } = await params;

  const raw = getTalentProfileBySlug(username_slug);
  if (!raw || raw.profile_visibility !== "public") notFound();

  const viewer = await getCurrentUser();
  const business = viewer ? getBusinessByUserId(viewer.id) : undefined;

  recordProfileAccess({
    talentProfileId: raw.id,
    viewerUserId: viewer?.id ?? null,
    businessId: business?.id ?? null,
    accessContext: business ? "candidate_shared" : "public_discovery",
  });

  if (!business) {
    const preview = getPublicProfilePreview(username_slug);
    if (!preview) notFound();
    return <GatedProfile preview={preview} />;
  }

  const profile = getPublicTalentProfile(username_slug);
  if (!profile) notFound();

  return <PublicProfile profile={profile} />;
}
