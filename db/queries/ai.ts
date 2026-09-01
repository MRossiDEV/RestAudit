import "server-only";
import { getDb } from "@/db";
import { newId } from "@/lib/id";
import type { AIProvider, AIProviderKey } from "@/types/domain";

interface Row extends Record<string, unknown> {}

function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function mapProvider(row: Row): AIProvider {
  return {
    id: String(row.id),
    provider_key: row.provider_key as AIProviderKey,
    name: String(row.name),
    api_key: String(row.api_key ?? ""),
    base_url: String(row.base_url ?? ""),
    models: parseJson<string[]>(row.models_json as string | null, []),
    default_model: String(row.default_model ?? ""),
    active: Boolean(row.active),
    sort_order: Number(row.sort_order ?? 0),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export function listProviders(): AIProvider[] {
  const rows = getDb()
    .prepare(`SELECT * FROM ai_providers ORDER BY sort_order ASC, name ASC`)
    .all() as unknown as Row[];
  return rows.map(mapProvider);
}

export function getProvider(id: string): AIProvider | undefined {
  const row = getDb()
    .prepare(`SELECT * FROM ai_providers WHERE id = ?`)
    .get(id) as unknown as Row | undefined;
  return row ? mapProvider(row) : undefined;
}

export function updateProvider(
  id: string,
  input: {
    name: string;
    apiKey: string;
    baseUrl: string;
    models: string[];
    defaultModel: string;
    active: boolean;
  },
): AIProvider {
  const db = getDb();
  db.prepare(
    `UPDATE ai_providers
       SET name = @name,
           api_key = @apiKey,
           base_url = @baseUrl,
           models_json = @models,
           default_model = @defaultModel,
           active = @active,
           updated_at = datetime('now')
     WHERE id = @id`,
  ).run({
    id,
    name: input.name,
    apiKey: input.apiKey,
    baseUrl: input.baseUrl,
    models: JSON.stringify(input.models),
    defaultModel: input.defaultModel,
    active: input.active ? 1 : 0,
  });
  return getProvider(id)!;
}