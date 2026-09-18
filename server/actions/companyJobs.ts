"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireBusiness } from "@/lib/business";
import { createJob, updateJob } from "@/db/queries/talent";
import type { JobStatus } from "@/types/domain";

export interface CompanyJobState {
  ok: boolean;
  message: string;
}

export async function createCompanyJob(
  _prev: CompanyJobState | undefined,
  formData: FormData,
): Promise<CompanyJobState> {
  const business = await requireBusiness();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const employmentType = String(formData.get("employment_type") ?? "full_time").trim();
  const skillsRaw = String(formData.get("skills_required") ?? "").trim();
  const salaryMin = Number(formData.get("salary_min")) || null;
  const salaryMax = Number(formData.get("salary_max")) || null;
  const experienceRequired = Number(formData.get("experience_required")) || 0;

  if (!title) return { ok: false, message: "El título es obligatorio." };

  const skills = skillsRaw
    ? skillsRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  createJob({
    businessId: business.id,
    title,
    description,
    location: location || [business.city, business.country].filter(Boolean).join(", "),
    employmentType,
    salaryMin,
    salaryMax,
    experienceRequired,
    skillsRequired: skills,
  });

  revalidatePath("/company/jobs");
  revalidatePath(`/company/${business.slug}`);
  redirect("/company/jobs");
}

export async function setJobStatus(jobId: string, status: JobStatus) {
  const business = await requireBusiness();
  updateJob(jobId, { status });
  revalidatePath("/company/jobs");
  revalidatePath(`/company/${business.slug}`);
}
