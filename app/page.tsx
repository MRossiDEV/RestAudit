import { Header } from "./landing/components/header";
import { Hero } from "./landing/components/hero";
import { Categories } from "./landing/components/categories";
import { ProfessionalIdentity } from "./landing/components/professional-identity";
import { ProfessionalInterview } from "./landing/components/professional-interview";
import { PermanentProfile } from "./landing/components/permanent-profile";
import { Portfolio } from "./landing/components/portfolio";
import { Companies } from "./landing/components/companies";
import { HiringSearch } from "./landing/components/hiring-search";
import { AgentTrust } from "./landing/components/agent-trust";
import { TalentFlow } from "./landing/components/talent-flow";
import { FinalCta } from "./landing/components/final-cta";
import { Footer } from "./landing/components/footer";
import { MobileCta } from "./landing/components/mobile-cta";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07070a] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[5%] top-[2%] h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[160px]" />
        <div className="absolute right-[0%] top-[20%] h-[550px] w-[550px] rounded-full bg-blue-600/[0.07] blur-[160px]" />
        <div className="absolute bottom-[15%] left-[35%] h-[500px] w-[500px] rounded-full bg-fuchsia-600/[0.05] blur-[160px]" />
      </div>

      <Header />
      <Hero />
      <Categories />
      <ProfessionalIdentity />
      <ProfessionalInterview />
      <PermanentProfile />
      <Portfolio />
      <Companies />
      <HiringSearch />
      <AgentTrust />
      <TalentFlow />
      <FinalCta />
      <Footer />
      <MobileCta />
    </main>
  );
}
