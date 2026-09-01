import "server-only";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { listProviders } from "@/db/queries/ai";
import type { AIProvider, AIProviderKey } from "@/types/domain";

// Per-provider default endpoints. A provider row may override `base_url` (e.g.
// a self-hosted NVIDIA NIM or an API gateway); empty falls back to these.
const DEFAULT_BASE_URL: Record<AIProviderKey, string> = {
  openai: "https://api.openai.com/v1",
  anthropic: "https://api.anthropic.com",
  nvidia: "https://integrate.api.nvidia.com/v1",
};

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface CompleteOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  seed?: number;
  // Passed through to OpenAI-compatible providers (e.g. NVIDIA's
  // chat_template_kwargs / thinking knobs).
  extra?: Record<string, unknown>;
}

export class AIProviderError extends Error {
  constructor(message: string, public readonly providerKey?: string) {
    super(message);
    this.name = "AIProviderError";
  }
}

function baseUrl(p: AIProvider): string {
  return p.base_url || DEFAULT_BASE_URL[p.provider_key];
}

/**
 * Resolve the provider to use. When `preferredKey` is given and that provider
 * exists and is active, use it; otherwise fall back to the first active
 * provider that has an API key configured.
 */
export function resolveProvider(preferredKey?: AIProviderKey): AIProvider {
  const providers = listProviders();
  const ready = providers.filter((p) => p.active && p.api_key);

  if (preferredKey) {
    const match = providers.find((p) => p.provider_key === preferredKey);
    if (match) {
      if (!match.active) throw new AIProviderError(`Provider "${preferredKey}" is disabled`, preferredKey);
      if (!match.api_key) throw new AIProviderError(`Provider "${match.name}" has no API key set`, preferredKey);
      return match;
    }
  }

  const chosen = ready[0] ?? providers.find((p) => p.active);
  if (!chosen) throw new AIProviderError("No AI provider is configured");
  if (!chosen.api_key) throw new AIProviderError(`Provider "${chosen.name}" has no API key set`, chosen.provider_key);
  return chosen;
}

export function providerClient(p: AIProvider) {
  if (p.provider_key === "anthropic") {
    return new Anthropic({ apiKey: p.api_key, baseURL: baseUrl(p) });
  }
  // OpenAI and NVIDIA are both OpenAI-compatible chat-completions endpoints.
  return new OpenAI({ apiKey: p.api_key, baseURL: baseUrl(p) });
}

/**
 * Run a chat completion against the resolved provider.
 * Returns the assistant's text content.
 */
export async function complete(
  messages: ChatMessage[],
  opts: CompleteOptions = {},
  preferredKey?: AIProviderKey,
): Promise<string> {
  const provider = resolveProvider(preferredKey);
  return completeWith(provider, messages, opts);
}

/**
 * Run a chat completion against an explicit provider config (used for
 * connection tests against unsaved credentials).
 */
export async function completeWith(
  provider: AIProvider,
  messages: ChatMessage[],
  opts: CompleteOptions = {},
): Promise<string> {
  const model = opts.model || provider.default_model;
  if (!model) throw new AIProviderError(`No model selected for ${provider.name}`, provider.provider_key);

  if (provider.provider_key === "anthropic") {
    const client = providerClient(provider) as Anthropic;
    const res = await client.messages.create({
      model,
      max_tokens: opts.maxTokens ?? 4096,
      temperature: opts.temperature ?? 0.7,
      top_p: opts.topP,
      messages: messages
        .filter((m) => m.role !== "system")
        .map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })),
      system: messages.find((m) => m.role === "system")?.content,
    });
    return res.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");
  }

  const client = providerClient(provider) as OpenAI;
  const completion = await client.chat.completions.create({
    model,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
    temperature: opts.temperature ?? 0.7,
    top_p: opts.topP ?? 0.95,
    max_tokens: opts.maxTokens ?? 4096,
    ...(opts.seed != null ? { seed: opts.seed } : {}),
    ...(opts.extra ?? {}),
  });
  return completion.choices[0]?.message?.content ?? "";
}

/** Lightweight connectivity check used to verify a provider config. */
export async function testConnection(
  provider: AIProvider,
): Promise<{ ok: true; model: string; latencyMs: number }> {
  const started = Date.now();
  const text = await complete(
    [{ role: "user", content: "Reply with the single word: ok" }],
    { model: provider.default_model || undefined, maxTokens: 16, temperature: 0 },
    provider.provider_key,
  );
  return { ok: true, model: provider.default_model, latencyMs: Date.now() - started };
}