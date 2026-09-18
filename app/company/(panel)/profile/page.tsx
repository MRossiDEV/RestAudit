import { requireBusiness } from "@/lib/business";
import ProfileForm from "./profile-form";

export const dynamic = "force-dynamic";

export default async function CompanyProfilePage() {
  const business = await requireBusiness();
  return <ProfileForm business={business} />;
}
