import envPkg from "@next/env";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import { readdirSync, readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

const { loadEnvConfig } = envPkg;

loadEnvConfig(process.cwd());

const dataDir = join(process.cwd(), "data");
mkdirSync(dataDir, { recursive: true });

const dbPath = join(dataDir, "restaudit.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(
  "CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT (datetime('now')))",
);

const schemaDir = join(process.cwd(), "db", "schema");
const applied = new Set(db.prepare("SELECT name FROM _migrations").all().map((r) => r.name));
const files = readdirSync(schemaDir).filter((f) => f.endsWith(".sql")).sort();
const pending = files.filter((f) => !applied.has(f));
for (const f of pending) {
  db.exec(readFileSync(join(schemaDir, f), "utf8"));
  db.prepare("INSERT INTO _migrations (name) VALUES (?)").run(f);
}
console.log("Applied migrations:", pending.length ? pending.join(", ") : "none pending");

const email = process.argv[2] || "admin@restaudit.local";
const password = process.argv[3] || "ChangeMe123!";
const name = process.argv[4] || "System Admin";

const existing = db.prepare("SELECT id FROM users LIMIT 1").get();
if (existing) {
  console.log("Users already exist; skipping bootstrap (id:", existing.id, ")");
} else {
  const hash = bcrypt.hashSync(password, 10);
  db.prepare(
    "INSERT INTO users (id, email, name, password_hash, role) VALUES (?, ?, ?, ?, ?)",
  ).run(randomUUID(), email.toLowerCase(), name, hash, "super_admin");
  console.log("Created bootstrap super admin:", email);
  console.log("  Password:", password);
}

db.close();