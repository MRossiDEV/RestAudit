import "server-only";
import { env } from "@/lib/env";

const DEFAULT_ORIGIN = "http://localhost:3000";

export function appOrigin(): string {
  const configured = env.APP_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");
  return DEFAULT_ORIGIN;
}

/** Absolute public profile URL — the permanent identity encoded in QR/CV. */
export function publicProfileUrl(slug: string): string {
  return `${appOrigin()}/talent/${slug}`;
}