"use server";

import { revalidatePath } from "next/cache";
import { requireBusiness } from "@/lib/business";
import {
  createTalentSearch,
  recordTalentMatch,
  saveTalent,
  unsaveTalent,
} from "@/db/queries/business";
import { getTalentProfile, listTalentProfiles } from "@/db/queries/talent";
import { matchTalent } from "@/lib/matching";
import type { TalentSearchRequirements } from "@/types/domain";

/** Save (or unsave) a professional to the business's talent pool. */
export async function toggleSaveTalent(talentProfileId: string): Promise<void> {
  const business = await requireBusiness();
  const existing = await import("@/db/queries/business").then((m) =>
    m.isTalentSaved(business.id, talentProfileId),
  );
  if (existing) {
    unsaveTalent(business.id, talentProfileId);
  } else {
    saveTalent({ businessId: business.id, talentProfileId });
  }
  revalidatePath("/company/talent");
  revalidatePath("/company/saved");
}

/** Create a saved search and compute its matches (deterministic). */
export async function createSearch(
  title: string,
  requirements: TalentSearchRequirements,
): Promise<{ id: string }> {
  const business = await requireBusiness();
  const search = createTalentSearch({
    businessId: business.id,
    title,
    requirements,
  });

  // Compute + persist matches so the dashboard and radar can surface them.
  const candidates = listTalentProfiles({});
  for (const c of candidates) {
    const full = getTalentProfile(c.id) ?? null;
    const { score, factors } = matchTalent(c, full, requirements);
    if (score >= 40) {
      recordTalentMatch({
        searchId: search.id,
        talentProfileId: c.id,
        score,
        factors,
      });
    }
  }

  revalidatePath("/company/searches");
  revalidatePath("/company/dashboard");
  return { id: search.id };
}
