import "server-only";
import { randomUUID } from "node:crypto";

export function newId(): string {
  return randomUUID();
}