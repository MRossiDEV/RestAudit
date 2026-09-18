import type { PublicTalentProfile } from "@/types/domain";
import { PROFICIENCY_LABEL } from "./labels";
import { Section } from "./section";

export function ProfileLanguages({ profile }: { profile: PublicTalentProfile }) {
  if (profile.languages.length === 0) return null;

  return (
    <Section title="Idiomas">
      <div className="grid gap-3 sm:grid-cols-2">
        {profile.languages.map((language, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-border bg-background p-4"
          >
            <span className="text-sm font-medium">{language.language}</span>
            <span className="text-xs text-muted">
              {PROFICIENCY_LABEL[language.proficiency] ?? language.proficiency}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
