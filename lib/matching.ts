import type {
  MatchFactors,
  TalentProfile,
  TalentProfileFull,
  TalentSearchRequirements,
} from "@/types/domain";

/**
 * Deterministic matching (PRD §24). The score is never a black box — every
 * factor is computed and returned so the UI can show exactly why a candidate
 * matched.
 *
 * Weights: position 30, skills 20, experience 15, location 10,
 * availability 10, employmentType 5, languages 5, salary 5.
 */
export interface MatchResult {
  score: number;
  factors: MatchFactors;
}

const WEIGHTS = {
  position: 30,
  skills: 20,
  experience: 15,
  location: 10,
  availability: 10,
  employmentType: 5,
  languages: 5,
  salary: 5,
} as const;

function norm(v: string | undefined | null): string {
  return (v ?? "").trim().toLowerCase();
}

function overlap(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const set = new Set(a.map(norm));
  const hits = b.filter((x) => set.has(norm(x))).length;
  return hits / b.length;
}

export function matchTalent(
  profile: TalentProfile,
  full: TalentProfileFull | null,
  req: TalentSearchRequirements,
): MatchResult {
  // Position — substring match on professional title or past positions.
  let position = 0;
  if (req.position) {
    const target = norm(req.position);
    const titleHit = norm(profile.professional_title).includes(target);
    const expHit = (full?.experience ?? []).some((e) =>
      norm(e.position).includes(target),
    );
    position = titleHit ? 1 : expHit ? 0.6 : 0;
  } else {
    position = 1; // no requirement → full credit
  }

  // Skills — fraction of required skills the candidate has.
  const profileSkills = (full?.skills ?? []).map((s) => s.name);
  const skills =
    req.skills && req.skills.length > 0 ? overlap(profileSkills, req.skills) : 1;

  // Experience — meets required years.
  let experience = 1;
  if (req.min_experience != null) {
    experience =
      profile.years_experience >= req.min_experience
        ? 1
        : req.min_experience > 0
          ? profile.years_experience / req.min_experience
          : 1;
  }

  // Location — country then city.
  let location = 1;
  if (req.country) {
    if (norm(profile.country) === norm(req.country)) {
      location = req.city
        ? norm(profile.location).includes(norm(req.city))
          ? 1
          : 0.6
        : 1;
    } else {
      // Wrong country but willing to relocate internationally still counts.
      location = profile.international_available || profile.relocation_available ? 0.4 : 0;
    }
  }

  // Availability — required set membership; an empty requirement is full credit.
  let availability = 1;
  if (req.availability && req.availability.length > 0) {
    availability = req.availability.includes(profile.availability_status) ? 1 : 0.3;
  }

  // Employment type overlap.
  const employmentType =
    req.employment_types && req.employment_types.length > 0
      ? overlap(profile.employment_types, req.employment_types)
      : 1;

  // Languages overlap.
  const profileLangs = (full?.languages ?? []).map((l) => l.language);
  const languages =
    req.languages && req.languages.length > 0 ? overlap(profileLangs, req.languages) : 1;

  // Salary — within range (or negotiable if not specified on either side).
  let salary = 1;
  if (req.salary_max != null && profile.salary_expectation != null) {
    salary = profile.salary_expectation <= req.salary_max ? 1 : 0.2;
  }

  const factors: MatchFactors = {
    position: Math.round(position * 100),
    skills: Math.round(skills * 100),
    experience: Math.round(Math.min(1, experience) * 100),
    location: Math.round(location * 100),
    availability: Math.round(availability * 100),
    employmentType: Math.round(employmentType * 100),
    languages: Math.round(languages * 100),
    salary: Math.round(salary * 100),
  };

  const score =
    position * WEIGHTS.position +
    skills * WEIGHTS.skills +
    Math.min(1, experience) * WEIGHTS.experience +
    location * WEIGHTS.location +
    availability * WEIGHTS.availability +
    employmentType * WEIGHTS.employmentType +
    languages * WEIGHTS.languages +
    salary * WEIGHTS.salary;

  return { score: Math.round(score), factors };
}
