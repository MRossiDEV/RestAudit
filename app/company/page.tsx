import { CompanyHeader } from "./components/company-header";
import { CompanyHero } from "./components/company-hero";
import { SearchDemo } from "./components/search-demo";
import { SpecializedSearch } from "./components/specialized-search";
import { Matching } from "./components/matching";
import { Evidence } from "./components/evidence";
import { VerifiedInterviewed } from "./components/verified-interviewed";
import { HiringSearchSection } from "./components/hiring-search-section";
import { HumanTech } from "./components/human-tech";
import { CompanyHowItWorks } from "./components/company-how-it-works";
import { CompanyFinalCta } from "./components/company-final-cta";
import { CompanyFooter } from "./components/company-footer";

export default function CompanyLanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07070a] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[5%] top-[2%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[160px]" />
        <div className="absolute right-[0%] top-[20%] h-[550px] w-[550px] rounded-full bg-cyan-600/[0.07] blur-[160px]" />
        <div className="absolute bottom-[15%] left-[35%] h-[500px] w-[500px] rounded-full bg-violet-600/[0.05] blur-[160px]" />
      </div>

      <CompanyHeader />
      <CompanyHero />
      <SearchDemo />
      <SpecializedSearch />
      <Matching />
      <Evidence />
      <VerifiedInterviewed />
      <HiringSearchSection />
      <HumanTech />
      <CompanyHowItWorks />
      <CompanyFinalCta />
      <CompanyFooter />
    </main>
  );
}
