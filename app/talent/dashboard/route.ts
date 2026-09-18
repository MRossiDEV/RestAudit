import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getTalentProfileByUserId } from "@/db/queries/talent";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await requireUser();
  const profile = getTalentProfileByUserId(user.id);
  if (!profile?.slug) redirect("/login");
  redirect(`/talent/${profile.slug}/dashboard`);
}
