import { getCurrentUser } from "@/lib/auth";
import { requireBusiness } from "@/lib/business";
import { CompanyShell } from "./shell";

export default async function CompanyPanelLayout({ children }: { children: React.ReactNode }) {
  const business = await requireBusiness();
  const user = await getCurrentUser();
  return (
    <CompanyShell businessName={business.business_name} userName={user?.name ?? ""}>
      {children}
    </CompanyShell>
  );
}
