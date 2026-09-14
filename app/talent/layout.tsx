import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "VORA Talent — Tu perfil profesional",
    template: "%s | VORA Talent",
  },
};

export default function TalentLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}