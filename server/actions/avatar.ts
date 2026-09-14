"use server";

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { getTalentProfileByUserId, updateTalentProfile } from "@/db/queries/talent";

const MAX_BYTES = 2 * 1024 * 1024; // 2MB
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/**
 * Persist an uploaded avatar to `public/uploads/avatars/<userId>.<ext>` and
 * point the candidate's profile at it. Returns the public URL on success.
 */
export async function uploadAvatarAction(
  formData: FormData,
): Promise<{ url?: string; error?: string }> {
  const user = await requireUser();
  const profile = getTalentProfileByUserId(user.id);
  if (!profile) return { error: "Crea tu perfil primero" };

  const file = formData.get("avatar");
  if (!(file instanceof File)) return { error: "No se recibió ningún archivo" };
  if (!ALLOWED.has(file.type)) return { error: "Formato no soportado (usa JPG, PNG o WebP)" };
  if (file.size > MAX_BYTES) return { error: "La imagen supera los 2MB" };

  const ext = EXT[file.type];
  const dir = join(process.cwd(), "public", "uploads", "avatars");
  mkdirSync(dir, { recursive: true });

  const bytes = Buffer.from(await file.arrayBuffer());
  const filename = `${user.id}.${ext}`;
  writeFileSync(join(dir, filename), bytes);

  const url = `/uploads/avatars/${filename}`;
  updateTalentProfile(profile.id, { avatarUrl: url });

  revalidatePath("/talent/profile");
  if (profile.slug) revalidatePath(`/talent/${profile.slug}`);
  return { url };
}