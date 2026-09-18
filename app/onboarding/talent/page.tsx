import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getTalentProfileByUserId } from "@/db/queries/talent";
import TalentWizard from "./wizard";

export const metadata = { title: "Completá tu perfil" };
export const dynamic = "force-dynamic";

const STEPS = ["basics", "experience", "skills", "availability"] as const;
export type TalentStep = (typeof STEPS)[number];

export default async function TalentOnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string }>;
}) {
  const user = await requireUser();
  const profile = getTalentProfileByUserId(user.id);
  if (!profile) redirect("/register?role=talent");

  const { step } = await searchParams;
  const current: TalentStep = STEPS.includes(step as TalentStep)
    ? (step as TalentStep)
    : "basics";

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-6 py-12">
      <Link href="/" className="brand-mark text-2xl">
        VOR<span>A</span>
      </Link>
      <p className="mt-2 text-sm text-muted">Completá tu perfil profesional</p>
      <TalentWizard current={current} profile={profile} />
    </div>
  );
}
