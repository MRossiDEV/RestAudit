import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getBusinessByUserId } from "@/db/queries/business";
import CompanyWizard from "./wizard";

export const metadata = { title: "Configurá tu empresa" };
export const dynamic = "force-dynamic";

const STEPS = ["details", "hiring"] as const;
export type CompanyStep = (typeof STEPS)[number];

export default async function CompanyOnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string; returnTo?: string }>;
}) {
  const user = await requireUser();
  const business = getBusinessByUserId(user.id);
  if (!business) redirect("/register?role=company");

  const { step, returnTo } = await searchParams;
  const current: CompanyStep = step === "hiring" ? "hiring" : "details";

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-6 py-12">
      <Link href="/" className="brand-mark text-2xl">
        VOR<span>A</span>
      </Link>
      <p className="mt-2 text-sm text-muted">
        Configurá el perfil de {business.business_name}
      </p>
      <CompanyWizard
        current={current}
        business={business}
        returnTo={returnTo ?? null}
      />
    </div>
  );
}
