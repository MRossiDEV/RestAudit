import type { PublicTalentProfile } from "@/types/domain";
import { Icon } from "./icons";
import { Section } from "./section";

export function ProfileEducation({ profile }: { profile: PublicTalentProfile }) {
  if (profile.education.length === 0) return null;

  return (
    <div id="education">
      <Section title="Educación y formación">
        <div className="space-y-5">
          {profile.education.map((education, i) => (
            <div
              key={i}
              className="flex gap-4 border-b border-border pb-5 last:border-0 last:pb-0"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                <Icon name="briefcase" size={17} />
              </div>

              <div>
                <p className="font-medium">{education.institution}</p>

                {education.qualification && (
                  <p className="mt-1 text-sm text-muted">{education.qualification}</p>
                )}

                {education.field && (
                  <p className="mt-1 text-xs text-muted-2">{education.field}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
