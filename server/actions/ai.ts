"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser, roleLevel } from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit-log";
import { updateProvider, getProvider } from "@/db/queries/ai";
import { completeWith } from "@/engines/ai";
import type { AIProvider } from "@/types/domain";

async function requireAdmin() {
  const user = await requireUser();
  if (roleLevel(user.role) < roleLevel("super_admin")) redirect("/portal");
  return user;
}

export async function updateProviderAction(
  providerId: string,
  input: {
    name: string;
    apiKey: string;
    baseUrl: string;
    models: string[];
    defaultModel: string;
    active: boolean;
  },
): Promise<{ error?: string; ok?: boolean }> {
  const user = await requireAdmin();
  const existing = getProvider(providerId);
  if (!existing) return { error: "Provider not found" };

  const name = input.name.trim();
  const defaultModel = input.defaultModel.trim();
  if (!name) return { error: "Name is required" };

  // Keep an empty model input from wiping the active selection; fall back to
  // the first known model, else keep whatever was set before.
  const models = input.models
    .map((m) => m.trim())
    .filter(Boolean)
    .length
    ? input.models.map((m) => m.trim()).filter(Boolean)
    : existing.models;
  const model = defaultModel || models[0] || existing.default_model;

  updateProvider(providerId, {
    name,
    apiKey: input.apiKey,
    baseUrl: input.baseUrl,
    models,
    defaultModel: model,
    active: input.active,
  });

  writeAuditLog({
    actorId: user.id,
    action: input.active
      ? "provider.activated"
      : "provider.updated",
    entityType: "ai_providers",
    entityId: providerId,
    metadata: { name, provider_key: existing.provider_key, model, active: input.active },
  });

  revalidatePath("/admin/ai");
  revalidatePath("/admin");
  return { ok: true };
}

export async function toggleProviderActiveAction(
  providerId: string,
  active: boolean,
): Promise<void> {
  const user = await requireAdmin();
  const existing = getProvider(providerId);
  if (!existing) return;

  updateProvider(providerId, {
    name: existing.name,
    apiKey: existing.api_key,
    baseUrl: existing.base_url,
    models: existing.models,
    defaultModel: existing.default_model,
    active,
  });

  writeAuditLog({
    actorId: user.id,
    action: active ? "provider.activated" : "provider.deactivated",
    entityType: "ai_providers",
    entityId: providerId,
    metadata: { name: existing.name, provider_key: existing.provider_key },
  });

  revalidatePath("/admin/ai");
  revalidatePath("/admin");
}

export async function testProviderAction(
  providerId: string,
  input: { apiKey: string; baseUrl: string; model: string },
): Promise<{ ok: boolean; error?: string; latencyMs?: number }> {
  const user = await requireAdmin();
  const existing = getProvider(providerId);
  if (!existing) return { ok: false, error: "Provider not found" };

  const key = input.apiKey.trim() || existing.api_key;
  const baseUrl = input.baseUrl.trim() || existing.base_url;
  const model = input.model.trim() || existing.default_model;
  if (!key) return { ok: false, error: "Set an API key first" };
  if (!model) return { ok: false, error: "Select a model first" };

  const started = Date.now();
  try {
    const candidate: AIProvider = {
      ...existing,
      api_key: key,
      base_url: baseUrl,
      default_model: model,
    };
    await completeWith(candidate, [
      { role: "user", content: "Reply with the single word: ok" },
    ], { model, maxTokens: 16, temperature: 0 });
    writeAuditLog({
      actorId: user.id,
      action: "provider.tested",
      entityType: "ai_providers",
      entityId: providerId,
      metadata: { name: existing.name, provider_key: existing.provider_key, model },
    });
    revalidatePath("/admin/ai");
    return { ok: true, latencyMs: Date.now() - started };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg };
  }
}