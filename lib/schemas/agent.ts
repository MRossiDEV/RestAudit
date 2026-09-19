import { z } from "zod";

/* ── Step 1: Personal ──────────────────────────────────────── */
export const AgentPersonalSchema = z.object({
  firstName: z.string().min(2, "Ingresá tu nombre.").trim(),
  lastName: z.string().min(2, "Ingresá tu apellido.").trim(),
  preferredName: z.string().trim().optional(),
  dateOfBirth: z.string().trim().optional(),
  email: z.string().email("Ingresá un email válido.").trim(),
  phone: z.string().min(6, "Ingresá un teléfono válido.").trim(),
  whatsapp: z.string().trim().optional(),
  country: z.string().min(2, "Ingresá tu país.").trim(),
  timezone: z.string().trim().optional(),
});

/* ── Step 2: Location ──────────────────────────────────────── */
export const AgentLocationSchema = z.object({
  region: z.string().min(2, "Ingresá tu región/provincia.").trim(),
  city: z.string().min(2, "Ingresá tu ciudad.").trim(),
  neighborhood: z.string().trim().optional(),
  postalCode: z.string().trim().optional(),
  languagesSpoken: z.string().trim().optional(),
  languagesWritten: z.string().trim().optional(),
  secondaryTerritories: z.string().trim().optional(),
  travelWilling: z.string().trim().optional(),
  availabilityType: z.string().trim().optional(),
});

/* ── Step 3: Professional ──────────────────────────────────── */
export const AgentProfessionalSchema = z.object({
  currentOccupation: z.string().min(2, "Ingresá tu ocupación actual.").trim(),
  currentCompany: z.string().trim().optional(),
  previousOccupations: z.string().trim().optional(),
  yearsExperience: z.coerce.number().min(0).max(60).optional(),
  industries: z.string().trim().optional(),
  hospitalityExperience: z.coerce.number().min(0).max(60).optional(),
  hrExperience: z.coerce.number().min(0).max(60).optional(),
  salesExperience: z.coerce.number().min(0).max(60).optional(),
  networkingExperience: z.coerce.number().min(0).max(60).optional(),
  communityInvolvement: z.string().trim().optional(),
  entrepreneurshipExperience: z.coerce.number().min(0).max(60).optional(),
  techFamiliarity: z.string().trim().optional(),
  education: z.string().trim().optional(),
  certifications: z.string().trim().optional(),
  professionalSummary: z.string().trim().optional(),
});

/* ── Step 4: Network ───────────────────────────────────────── */
export const AgentNetworkSchema = z.object({
  talentNetworkSize: z.string().trim().optional(),
  employerNetworkSize: z.string().trim().optional(),
  talentRelationshipStrength: z.string().trim().optional(),
  employerRelationshipStrength: z.string().trim().optional(),
  industryConnections: z.string().trim().optional(),
  geographicReach: z.string().trim().optional(),
});

/* ── Step 5: Social ────────────────────────────────────────── */
export const AgentSocialSchema = z.object({
  linkedinUrl: z.string().url("Ingresá una URL válida.").or(z.literal("")).optional(),
  facebookUrl: z.string().url("Ingresá una URL válida.").or(z.literal("")).optional(),
  instagramUrl: z.string().url("Ingresá una URL válida.").or(z.literal("")).optional(),
  tiktokUrl: z.string().url("Ingresá una URL válida.").or(z.literal("")).optional(),
  xUrl: z.string().url("Ingresá una URL válida.").or(z.literal("")).optional(),
  websiteUrl: z.string().url("Ingresá una URL válida.").or(z.literal("")).optional(),
  portfolioUrl: z.string().url("Ingresá una URL válida.").or(z.literal("")).optional(),
  businessProfileUrl: z.string().url("Ingresá una URL válida.").or(z.literal("")).optional(),
  otherUrls: z.string().trim().optional(),
});

/* ── Step 7: Assessment ────────────────────────────────────── */
export const AgentAssessmentSchema = z.object({
  scenario1: z.string().min(10, "Contanos cómo actuarías.").trim(),
  scenario2: z.string().min(10, "Contanos cómo actuarías.").trim(),
  scenario3: z.string().min(10, "Contanos cómo actuarías.").trim(),
  scenario4: z.string().min(10, "Contanos cómo actuarías.").trim(),
});

/* ── Step 8: Motivation ────────────────────────────────────── */
export const AgentMotivationSchema = z.object({
  motivationWhy: z.string().min(20, "Contanos por qué querés ser agente.").trim(),
  motivationIndustries: z.string().trim().optional(),
  motivationGeography: z.string().trim().optional(),
  motivationQualified: z.string().trim().optional(),
  motivationIntroduce: z.string().trim().optional(),
  motivationFindTalent: z.string().trim().optional(),
  motivationRelationships: z.string().trim().optional(),
});

/* ── Step 9: Review & Submit ───────────────────────────────── */
export const AgentReviewSchema = z.object({
  confirmAccurate: z.literal("on", { error: "Debés confirmar que la información es correcta." }),
  confirmTerms: z.literal("on", { error: "Debés aceptar los términos." }),
  confirmPrivacy: z.literal("on", { error: "Debés aceptar la política de privacidad." }),
  confirmNoGuarantee: z.literal("on", { error: "Debés entender que la aplicación no garantiza aprobación." }),
});

export type AgentFormState = {
  errors?: Record<string, string[]>;
  message?: string;
} | undefined;
