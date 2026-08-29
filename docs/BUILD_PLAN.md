# Restaurant Intelligence & Audit Platform — Build Plan

**Version:** 1.0
**Source PRD:** Restaurant Intelligence & Audit Platform v1.0 (Phase 1 / MVP)
**Status:** Planning complete — ready for Sprint 1

---

## 0. Decisions & Deviations from PRD

| Topic | PRD spec | Decision (this build) | Rationale |
|-------|----------|----------------------|------------|
| Database | PostgreSQL / Supabase | **SQLite first**, migrate to Supabase later | Faster local start; no cloud dependency during early sprints |
| Auth | Supabase Auth | **Local auth first** (credentials + session), behind an auth abstraction | Keeps SQLite-only Phase 1 with clean migration path |
| Storage | Supabase Storage | **Local filesystem first** (`storage/`), behind a storage abstraction | Same swap-for-Supabase pattern |
| AI | OpenAI + Anthropic | OpenAI + Anthropic adapters, `local` adapter stub | Per PRD §18, §39 |
| Next.js version | (assumed 14/15) | **Next.js 16.3.3** (already scaffolded) | Match installed runtime; read local docs before Next-specific code |

> **Migration strategy:** every external dependency (database, auth, file storage, AI) sits behind a single interface in `lib/`. Supabase is a future drop-in swap, not a rewrite.

---

## 1. Architecture Principles (invariant)

These are hard rules for every piece of code:

1. **Business logic ≠ UI.** Deterministic engines are pure TypeScript functions — no React/Next imports, unit-testable in isolation.
2. **AI is isolated.** Nothing imports `openai`/`@anthropic-ai/sdk` except files under `ai/providers/`. Everything else depends on the `AIProvider` interface.
3. **Software calculates; AI interprets.** `engines/` computes every number. Agents receive engine output as input context — never raw data they must compute.
4. **Evidence before conclusions.** A finding cannot persist without `finding_evidence` links.
5. **Everything is training-shaped.** `ai_runs`, `ai_outputs`, `ai_feedback`, `training_examples` are written on every AI interaction.
6. **Tenant isolation.** `organization_id` + `restaurant_id` on every row; a single access-check path used everywhere.
7. **Data provenance.** Every AI conclusion records source, model, prompt version, consultant, approval status (§33).
8. **Strong typing + validation.** Zod for all inputs and AI outputs; no `any` in the data path.

---

## 2. Directory Structure

```
app/
  (auth)/                   # /login, /register + invite flow
  (marketing)/              # /, /privacy, /terms
  auditor/                  # /auditor/...
    restaurants/[id]/
    audits/[id]/
    findings/
    recommendations/
    actions/
    reports/
    training/
  portal/                   # /portal/... (owner-facing)
    restaurant/
    findings/
    recommendations/
    actions/
    reports/
  admin/                    # /admin/...
    users/ organizations/ restaurants/
    audit-templates/ ai/ prompts/ training/
  api/                      # route handlers (if not using server actions)

lib/            # db client, auth, storage, env — infrastructure glue
db/             # queries + sqlite schema
  schema/       # migration files (SQL) + seed data
engines/        # pure deterministic calc (financial, food-cost, menu, labor, kpi, health-score, opportunity)
ai/             # provider abstraction + agents
  providers/    # openai.ts, anthropic.ts, local.ts
  agents/       # financial, menu, food-cost, labor, customer, operations, recommendation, executive
  prompts/      # prompt registry (system prompts / templates)
  schemas/      # Zod output schemas
server/         # server-only actions shared across routes
components/     # reusable UI
types/          # shared TypeScript types
scripts/        # training JSONL export, seed, utility
docs/           # this plan + ADRs + decisions
storage/        # local file storage root (gitignored)
```

---

## 3. Data Layer (SQLite first)

### 3.1 Storage abstraction

```typescript
// lib/storage.ts
interface Storage {
  put(path: string, data: Buffer, contentType: string): Promise<{ path: string }>;
  get(path: string): Promise<Buffer>;
  remove(path: string): Promise<void>;
  presignUrl(path: string): Promise<string>; // local: /api/file/[id]
}
// implementations: LocalStorage (fs), SupabaseStorage (later)
```

### 3.2 Database access

- SQLite via a thin query wrapper; all queries in `db/` take explicit `organizationId`/`restaurantId` filters.
- Migrations as ordered SQL files in `db/schema/`, applied by a runner script.
- A `db/types.ts` module holds row + DTO types so switching to Supabase later means swapping the client, not the domain types.

> When Supabase arrives, RLS policies replace application-level tenant filters (defense in depth). The access functions keep the same signatures.

### 3.3 Core tables (all: `id`, `created_at`, `updated_at`, tenant ids where applicable)

**Tenancy & identity**
- `organizations` (name, slug, settings, ai_config)
- `users` (role enum, name, email, password_hash — local auth; maps to `auth.users` later)
- `organization_members` (user_id, org_id, role)
- `restaurants` (profile fields §8)
- `restaurant_users` (links owner/manager to restaurant)

**Audit & evidence**
- `audit_templates`, `audit_template_sections`, `audit_template_questions`
- `audits` (restaurant, status, assigned auditor, template snapshot jsonb)
- `audit_sections`, `audit_questions`, `audit_responses` (answer, score, notes)
- `documents` (storage ref, type, processing_status, source, uploaded_by)
- `document_chunks` (extracted text/tables; vector-ready later)
- `evidence` (typed references: document / db record / calculation / observation / photo / review)

**Operational (structured)**
- `financial_periods`, `financial_metrics`, `expenses`, `sales`
- `menu_categories`, `menu_items`, `recipes`, `recipe_ingredients`, `ingredients`, `ingredient_prices`, `suppliers`
- `inventory_records`, `waste_records`
- `labor_periods`, `employees`, `labor_records`, `schedules`
- `customer_reviews`, `customer_surveys`
- `operations_observations` (walkthrough items §17)

**Consulting workflow**
- `findings` (status enum, severity, confidence, category, ai_payload, provenance)
- `finding_evidence` (join)
- `recommendations` (full fields §24, computed priority)
- `recommendation_findings`
- `actions` + `action_updates` (status enum §25)
- `kpis` + `kpi_values` (time series)
- `reports` + `report_versions`

**AI & training (strategic)**
- `prompts` (name, version, system_prompt, input/output schema ref, active, created_by §34)
- `ai_runs` (provider, model, tokens in/out, cost, agent, prompt_version, restaurant, audit, timing §35)
- `ai_outputs` (raw + structured, schema validation status)
- `ai_feedback` (consultant revision, reason enum §23, challenge records §44)
- `training_examples` + `training_labels` (states raw/reviewed/approved/gold/rejected §30–32)

**Cross-cutting**
- `audit_log` (append-only event log)

---

## 4. Sprint-by-Sprint Plan

Each sprint ends with `npm run lint` + `npm run build` green. Tests via Vitest.

### Sprint 1 — Foundation
- Env config + `.env.example` (all §40 vars, minus Supabase until migration) + validation.
- SQLite client, migration runner, seed data. `db/types.ts`.
- Auth (local): register/invite, login, session, role assignment, `users` + `organization_members`.
- RBAC helpers (`can()` / `requireRole()`) applied centrally.
- Migration: orgs, users, members, restaurants.
- App shell, layouts, per-role navigation. Professional consulting design tokens (Tailwind v4).
- Landing page, `/privacy`, `/terms`.
- `audit_log` wiring on all mutations.

### Sprint 2 — Auditor + Restaurant + Audit
- Restaurant CRUD + structured profile (§8).
- Audit creation from template; sections/questions/checklist; notes; scoring.
- Evidence/document upload → local storage (`documents`), type gating (PDF/CSV/XLSX/DOCX/JPG/PNG/TXT).
- Auditor dashboard shell (§28).

### Sprint 3 — Operational Data Entry
- Structured forms + imports: financial, menu/recipes/ingredients/suppliers, inventory, labor, reviews.
- Document processing pipeline (§11): upload → classify → extract (AI structured JSON) → Zod validate → store; original preserved. (First real AI integration, front-loaded.)
- Walkthrough observations (§17).

### Sprint 4 — Deterministic Engines (no AI)
- `financial.ts`, `menu-engineering.ts` (Star/Plowhorse/Puzzle/Dog), `food-cost.ts` (theoretical/actual/variance + $ impact), `labor.ts`, `health-score.ts` (explainable), `opportunity.ts` (impact × confidence ÷ effort), `kpi.ts`.
- Pure functions + unit tests. KPI dashboard. Rock-solid before AI (per §55).

### Sprint 5 — AI Layer
- `AIProvider` interface (§39): `generateText` + `generateStructured<T>`.
- Providers: OpenAI, Anthropic, `local` stub (Ollama, non-blocking).
- Prompt registry wired to DB; every run records exact version.
- Zod output schema validation + `ai_runs` cost tracking.
- First agents: Financial, Menu, Food Cost.

### Sprint 6 — Consulting Workflow
- Findings generation → `draft` → review → accept/edit/reject/needs-evidence (§22).
- `finding_evidence` traceability + provenance panel (§33).
- `ai_feedback` capture (§23); Investigate + Challenge AI (§43/44).
- Recommendations (§24) + computed priority; action plans (§25) + updates.

### Sprint 7 — Owner Portal
- `/portal/*` — simple, non-technical: health score, top opportunities (§27), approved findings only, recommendations, reports, action status, KPI entry, auditor messaging.
- Ownership isolation; never expose rejected findings / internal notes / prompts / training data.

### Sprint 8 — Intelligence & Reports
- Executive synthesis + report generator (§29): structured data + AI narrative; report versions.
- `training_examples` capture + Gold labeling; JSONL export script (§48).
- AI cost dashboard (§35); AI audit trail.

---

## 5. Acceptance Criteria Mapping (§51)

The 24 MVP criteria map to sprints; tracked until the full loop closes:

restaurant → audit → evidence → analysis → findings → review → recommendations → actions → report → owner access → tracking → training export.

---

## 6. Explicitly Deferred (§52)

No local model hosting, GPU infra, agent swarms, autonomous decision-making/communication, auto-training, vector DB, native apps, CRM, marketplace, public signup, or primary chatbot UI. AI appears only as embedded "Analyze X" actions (§42).

---

## 7. Risks & Notes

- **Next 16 drift** — read `node_modules/next/dist/docs/` before each Next-specific feature (server actions, caching, auth, route handlers).
- **Auth + RBAC** — highest-complexity foundation; freeze the permission model in Sprint 1 before building on it.
- **AI cost leakage** — enforce schema validation + per-agent token budgets from the start.
- **SQLite→Supabase swap** — mitigated by the storage/db/auth abstractions; revisit in a dedicated migration sprint before launch.