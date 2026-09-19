import { LandingHeader } from "@/components/landing-header";
import { TalentHero } from "./components/talent-hero";
import { CareerTimeline } from "./components/career-timeline";
import { BuildFeatures } from "./components/build-features";
import { ShareProfile } from "./components/share-profile";
import { VoraVerified } from "./components/vora-verified";
import { VoraInterviewed } from "./components/vora-interviewed";
import { Opportunities } from "./components/opportunities";
import { HowItWorks } from "./components/how-it-works";
import { TalentFinalCta } from "./components/talent-final-cta";
import { TalentFooter } from "./components/talent-footer";

export default function TalentLanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07070a] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[5%] top-[2%] h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[160px]" />
        <div className="absolute right-[0%] top-[20%] h-[550px] w-[550px] rounded-full bg-blue-600/[0.07] blur-[160px]" />
        <div className="absolute bottom-[15%] left-[35%] h-[500px] w-[500px] rounded-full bg-fuchsia-600/[0.05] blur-[160px]" />
      </div>

      <LandingHeader active="talent" />
      <TalentHero />
      <CareerTimeline />
      <BuildFeatures />
      <ShareProfile />
      <VoraVerified />
      <VoraInterviewed />
      <Opportunities />
      <HowItWorks />
      <TalentFinalCta />
      <TalentFooter />
    </main>
  );
}
