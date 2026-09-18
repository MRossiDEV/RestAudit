import type { PublicTalentProfile } from "@/types/domain";
import { Section } from "./section";

export function ProfileSkills({ profile }: { profile: PublicTalentProfile }) {
  if (profile.skills.length === 0) return null;

  return (
    <div id="skills">
      <Section title="Habilidades y especialidades">
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, i) => (
            <span
              key={i}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </Section>
    </div>
  );
}
