import Link from "next/link";
import type { PublicTalentProfile } from "@/types/domain";
import { publicProfileUrl } from "@/lib/url";
import { Icon } from "./icons";
import ShareButton from "../share-button";
import { ProfileHeader } from "./profile-header";
import { ProfileAbout } from "./profile-about";
import { ProfileExperience } from "./profile-experience";
import { ProfileSkills } from "./profile-skills";
import { ProfileEducation } from "./profile-education";
import { ProfileLanguages } from "./profile-languages";
import { ProfileIdentity, CvSection } from "./profile-identity";
import { ProfileSidebar } from "./profile-sidebar";
import { ProfileFooter } from "./profile-footer";
import { SharedProfileNotice } from "./shared-profile-notice";

export function PublicProfile({ profile }: { profile: PublicTalentProfile }) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopNav profile={profile} />

      <div className="mx-auto max-w-6xl">
        <ProfileHeader profile={profile} />
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-0">
        <div className="min-w-0 space-y-6">
          <SharedProfileNotice />
          <ProfileAbout profile={profile} />
          <ProfileExperience profile={profile} />
          <ProfileSkills profile={profile} />
          <ProfileEducation profile={profile} />
          <ProfileLanguages profile={profile} />
          <ProfileIdentity />
          <CvSection />
        </div>

        <ProfileSidebar profile={profile} />
      </div>

      <MobileCta profile={profile} />
      <ProfileFooter />
    </main>
  );
}

function TopNav({ profile }: { profile: PublicTalentProfile }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/talent">
          <div className="brand-mark text-sm">
            VOR<span>A</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/talent"
            className="hidden rounded-lg px-3 py-2 text-xs text-muted hover:bg-surface hover:text-foreground sm:block"
          >
            VORA Talent
          </Link>

          <ShareButton name={profile.name} url={publicProfileUrl(profile.slug)} />
        </div>
      </div>
    </header>
  );
}

function MobileCta({ profile }: { profile: PublicTalentProfile }) {
  return (
    <div className="sticky bottom-0 z-30 border-t border-border bg-background/90 p-3 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-6xl gap-2">
        <Link
          href="/register?role=company"
          className="glow-primary flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
        >
          <Icon name="building" size={16} />
          Ver perfil como empresa
        </Link>

        <ShareButton name={profile.name} url={publicProfileUrl(profile.slug)} />
      </div>
    </div>
  );
}
