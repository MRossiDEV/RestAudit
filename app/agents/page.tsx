import { AgentHeader } from "./components/agent-header";
import { AgentHero } from "./components/agent-hero";
import { WhatAgentDoes } from "./components/what-agent-does";
import { ProfessionalInterviews } from "./components/professional-interviews";
import { Assignment } from "./components/assignment";
import { Capacity } from "./components/capacity";
import { Earnings } from "./components/earnings";
import { AgentBenefits } from "./components/agent-benefits";
import { WhatVoraProvides } from "./components/what-vora-provides";
import { AgentLimits } from "./components/agent-limits";
import { AgentJourney } from "./components/agent-journey";
import { AgentFinalCta } from "./components/agent-final-cta";
import { AgentFooter } from "./components/agent-footer";

export default function AgentLanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07070a] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[5%] top-[2%] h-[600px] w-[600px] rounded-full bg-amber-600/10 blur-[160px]" />
        <div className="absolute right-[0%] top-[20%] h-[550px] w-[550px] rounded-full bg-orange-600/[0.07] blur-[160px]" />
        <div className="absolute bottom-[15%] left-[35%] h-[500px] w-[500px] rounded-full bg-yellow-600/[0.05] blur-[160px]" />
      </div>

      <AgentHeader />
      <AgentHero />
      <WhatAgentDoes />
      <ProfessionalInterviews />
      <Assignment />
      <Capacity />
      <Earnings />
      <AgentBenefits />
      <WhatVoraProvides />
      <AgentLimits />
      <AgentJourney />
      <AgentFinalCta />
      <AgentFooter />
    </main>
  );
}
