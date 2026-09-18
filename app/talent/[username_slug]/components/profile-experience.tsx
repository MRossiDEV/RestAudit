import type { PublicTalentProfile } from "@/types/domain";
import { Section } from "./section";
import { TimelineItem } from "./timeline-item";

export function ProfileExperience({ profile }: { profile: PublicTalentProfile }) {
  if (profile.experience.length === 0) return null;

  return (
    <div id="experience">
      <Section
        title="Experiencia profesional"
        action={
          <span className="text-xs text-muted">
            {profile.experience.length}{" "}
            {profile.experience.length === 1 ? "experiencia" : "experiencias"}
          </span>
        }
      >
        <div className="space-y-8">
          {profile.experience.map((e, i) => (
            <TimelineItem
              key={i}
              position={e.position}
              company={e.company}
              start={e.start_date}
              end={e.end_date}
              description={e.description}
              current={!e.end_date}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
