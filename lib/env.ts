import "server-only";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  SESSION_SECRET: z.string().min(16),
  PRIMARY_AI_PROVIDER: z.enum(["openai", "anthropic", "local"]).default("openai"),
  SECONDARY_AI_PROVIDER: z.enum(["openai", "anthropic", "local"]).default("anthropic"),
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
});

const parsed = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  PRIMARY_AI_PROVIDER: process.env.PRIMARY_AI_PROVIDER,
  SECONDARY_AI_PROVIDER: process.env.SECONDARY_AI_PROVIDER,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
});

if (!parsed.success) {
  throw new Error(`Invalid environment variables:\n${parsed.error.message}`);
}

export const env = parsed.data;