import "server-only";
import Database from "better-sqlite3";
import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { env } from "@/lib/env";

let db: Database.Database | null = null;
let migrated = false;

function resolvePath(): string {
  const raw = env.DATABASE_URL;
  if (raw === ":memory:" || raw === "" || raw === undefined) return ":memory:";
  const stripped = raw.startsWith("file:") ? raw.slice("file:".length) : raw;
  if (stripped === ":memory:") return stripped;
  return resolve(/* turbopackIgnore: true */ process.cwd(), stripped);
}

export function getDb(): Database.Database {
  if (db) return db;
  const path = resolvePath();
  if (path !== ":memory:") {
    mkdirSync(resolve(process.cwd(), "data"), { recursive: true });
  }
  db = new Database(path);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  if (!migrated) {
    runMigrations();
    migrated = true;
  }
  return db;
}

export function runMigrations(dir = join(process.cwd(), "db", "schema")): string[] {
  const client = db ?? getDb();
  client.exec("PRAGMA foreign_keys = ON");
  client.exec(
    "CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT (datetime('now')))",
  );
  const applied = new Set(
    (client.prepare("SELECT name FROM _migrations").all() as { name: string }[]).map(
      (r) => r.name,
    ),
  );

  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  const apply = client.transaction((entries: string[]) => {
    for (const file of entries) {
      const sql = readFileSync(join(dir, file), "utf8");
      client.exec(sql);
      client.prepare("INSERT INTO _migrations (name) VALUES (?)").run(file);
    }
  });

  const pending = files.filter((f) => !applied.has(f));
  if (pending.length) apply(pending);
  migrated = true;
  return pending;
}