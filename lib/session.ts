import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

const secretKey = new TextEncoder().encode(env.SESSION_SECRET);
const SESSION_COOKIE = "session";
const SESSION_DAYS = 7;

export interface SessionPayload {
  userId: string;
  role: string;
  expiresAt: number;
}

export async function encrypt(payload: { userId: string; role: string; expiresAt: Date }) {
  return new SignJWT({
    userId: payload.userId,
    role: payload.role,
    expiresAt: payload.expiresAt.getTime(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expiresAt)
    .sign(secretKey);
}

async function decryptSession(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey, { algorithms: ["HS256"] });
    const userId = payload.userId;
    const role = payload.role;
    const expiresAt = payload.expiresAt;
    if (typeof userId !== "string" || typeof role !== "string" || typeof expiresAt !== "number") {
      return null;
    }
    return { userId, role, expiresAt };
  } catch {
    return null;
  }
}

export async function createSession(user: { id: string; role: string }): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const token = await encrypt({ userId: user.id, role: user.role, expiresAt });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return decryptSession(store.get(SESSION_COOKIE)?.value);
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}