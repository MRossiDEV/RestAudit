# VORA Admin — Command Center Implementation Plan

**Status:** Phase A (Foundation) + Phase B (partial) — implemented & verified
**Phase A:** sidebar shell + role guard · Command Center KPIs + activity feed · Restaurants list + profile + intelligence timeline · Audits kanban (status model, move actions) · Audit template CRUD. Seeded via `0004`/`0005`. **Audit pipeline simplified to 5 states** — New → Data Collected → AI Analysis → Review & Quality → Delivered (remap in `0011`).
**Phase B (partial):** Reports lifecycle — simplified to **Draft → Reviewed → Delivered** (3 states; reports are a near-instant artifact, AI/human review tracked per section; remap in `0010`) — with section builder + templates (`0006`/`0007`) · Consultants & Team profiles with live workload bars + assigned audits (`0008`/`0009`).
**Remaining:** audits pipeline actions/assignment · report section editing · activity logs UI · team redistribution.
**Companion doc:** `docs/BUILD_PLAN.md` (architecture principles, data layer, sprint model — this plan extends it)
**Scope:** The `/admin/*` surface of the VORA platform

---

## 1. Position & Role

The Admin is the **Command Center of the entire consulting operation** — it is *not* the Auditor Dashboard.

| Surface | Who | What it does |
|---------|-----|--------------|
| **Public website** (`/`, `/check`) | Prospects | Lead gen via VORA Check |
| **Client Portal** (`/portal`) | Restaurant owners | View results, interact with consultants |
| **Auditor Portal** (`/auditor`) | Auditors | Perform audits, enter evidence, draft findings |
| **Admin Command Center** (`/admin`) | Super Admin / Admin | Manage the **business**: platform, users, methodology, AI, reports, operations, analytics |

Admin answers: *"What is happening across the VORA operation right now?"* and gives staff the tools to steer it.

### The three strategic databases
Everything in Admin ultimately feeds one of three asset bases:

1. **Restaurant Intelligence Database** — everything known about restaurants (restaurant → audits → metrics → findings → recommendations → outcomes).
2. **VORA Knowledge Database** — what VORA knows about the industry (research, benchmarks, methodologies, case studies, expert knowledge).
3. **VORA Learning Database** — what the system *learns* by doing audits (input → AI analysis → human review → correction → final decision → outcome). **Potentially the company's most valuable asset.**

These are architectural north stars, not UI tabs — they shape the data model (see §6).

---

## 2. Role & Permissions (RBAC)

Extend `lib/roles.ts` (currently `super_admin`, `org_admin`, `senior_auditor`, `auditor`, `owner`) to a richer set for admin-adjacent staff:

```
super_admin     → full /admin access + System & Configuration
admin           → /admin except System & Configuration
lead_consultant → team + audits + reports + leads
senior_auditor  → auditor access + quality review
auditor         → existing /auditor scope
financial_analyst / operations_analyst / ai_reviewer / client_support
owner           → /portal scope only
```

- `can()` / `requireRole()` helpers already exist in the BUILD_PLAN; centralize every `/admin` guard behind them.
- Group admin roles via a `ADMIN_ROLES` set and per-sector capability map (e.g. `sector:read`, `sector:write`) rather than flat role switches, so permissions are auditable and easy to extend.

---

## 3. Navigation (Admin Sidebar)

Group the 10 sectors into logical clusters for a real product, matching the recommended sidebar:

```
 VORA · ADMIN COMMAND CENTER
 ─────────────────────────────
 ◉  Command Center            /admin
 BUSINESS
 ▣  Restaurants               /admin/restaurants
 ◈  Audits                    /admin/audits
 ◉  Reports                   /admin/reports
 PEOPLE
 ◉  Consultants & Team        /admin/team
 ◉  Leads & CRM               /admin/leads
 INTELLIGENCE
 ✦  VORA Intelligence         /admin/ai
 ◉  AI Agents                 /admin/ai/agents
 ◉  Knowledge Base            /admin/knowledge
 ◉  Training Dataset          /admin/training
 ◉  Benchmarks                /admin/benchmarks
 ANALYTICS
 ◉  Platform Analytics        /admin/analytics
 ◉  AI Performance            /admin/analytics/ai
 ADMINISTRATION
 ◉  Billing                   /admin/billing
 ◉  Notifications             /admin/notifications
 ◉  Settings                  /admin/system
 ◉  Activity Logs             /admin/activity
```

Route tree (App Router, matching existing `app/admin/layout.tsx`):

```
app/admin/
  layout.tsx            # shared admin shell: sidebar + guard (requireRole admin)
  page.tsx              # 01 Command Center
  restaurants/page.tsx  restaurant/[id]/page.tsx   # profile + tabs
  audits/page.tsx       audits/[id]/page.tsx       # kanban + detail
  reports/page.tsx      reports/[id]/page.tsx
  team/page.tsx         team/[id]/page.tsx
  leads/page.tsx        leads/[id]/page.tsx
  ai/page.tsx  ai/agents/page.tsx  ai/agents/[id]/page.tsx
  knowledge/page.tsx    knowledge/categories/[id]/page.tsx
  training/page.tsx     training/examples/[id]/page.tsx
  benchmarks/page.tsx
  analytics/page.tsx    analytics/ai/page.tsx
  billing/page.tsx
  notifications/page.tsx
  system/page.tsx       system/users, roles, integrations, providers, email, api-keys, audit-log, security
  activity/page.tsx
```

---

## 4. Sector Specs

### 01 — Command Center (`/admin`)
Home dashboard answering *"what's happening across VORA right now"*.

- **KPI cards:** Active Restaurants · Restaurants Under Analysis · Active Audits · Audits Pending Review · Reports Delivered · Open Opportunities
- **Second row:** New Leads · VORA Checks Completed · Conversion Rate · Average VORA Score · Consulting Revenue · Active Consultants
- **Operational activity feed:** real-time, e.g. "Restaurant La Cabrera completed VORA Check", "Auditor Carlos submitted Operational Analysis", "VORA Intelligence generated 8 findings". Backed by the existing `audit_log` table.
- **Attention required:** alerts (audits waiting review, high-priority findings, incomplete restaurant data, failed AI analysis, reports pending approval).

> Implementation: server component reads aggregate queries (see §6) + `audit_log`; the feed can start as a refetch-on-route-visit list and become a subscription later.

### 02 — Restaurants (`/admin/restaurants`)
Central **Restaurant Intelligence Profile** database.

- **List:** Restaurant · Status · Score · Audit · Consultant · Last Activity. Filters (status, industry, location, type, VORA score, audit status, consultant, client).
- **Profile tabs:** Overview · Business Profile · VORA Score · Audits · Financial Data · Operations · Menu · Staff · Customer Intelligence · Documents · Reports · Activity
- **Overview:** name, location, type, seats, employees, years operating, revenue range, VORA score, current consultant, audit status.
- **Intelligence timeline:** chronological events (initial check → full audit → financial analysis → operational review → recommendations delivered).

### 03 — Audits (`/admin/audits`)
The **Audit Operations Center** — one of the most important sections.

- **Kanban pipeline:** New → VORA Check → Qualified → Data Collection → AI Analysis → Auditor Review → Report Generation → Quality Review → Delivered. Cards show restaurant, type, score, assigned auditor, progress, priority, deadline.
- **Audit types / templates:** Quick Review, Financial Audit, Operational Audit, Menu Engineering, Full Restaurant Audit, Turnaround Audit, Custom. Each type owns questions, data requirements, AI prompts, analysis modules, scoring model, report template. **Methodology must not be hardcoded** — templates are DB rows (`audit_templates` already in schema).
- Admin can clone/edit templates.

### 04 — Consultants & Team (`/admin/team`)
Internal user + workload management.

- **Roles:** super_admin, admin, lead_consultant, senior_auditor, auditor, financial_analyst, operations_analyst, ai_reviewer, client_support.
- **Profile:** name, role, specialization, experience, assigned restaurants, active/completed audits, avg completion time, performance rating.
- **Workload management:** visual load bars; admin redistributes audits.

### 05 — Reports (`/admin/reports`)
Central report lifecycle + builder.

- **States:** Draft → AI Generated → Under Review → Approved → Delivered.
- **Report builder:** manage section structure (Executive Summary → Financial → Cost → Menu → Labor → Operations → Customer Experience → Key Findings → Opportunities → Recommendations → Action Plan).
- **Templates:** Quick VORA, Full Audit, Financial, Operational, Menu Analysis, Monthly Performance.

### 06 — VORA Intelligence (`/admin/ai`)
Manage the **AI brain** — the strategic core.

- **Models:** OpenAI API, Claude API now; VORA Local / fine-tuned / LoRAs / specialized later. Table: model · purpose · status.
- **Prompts:** registry (name, version, system_prompt, schemas, active) — already designed in `prompts` table.
- **Methodologies · Scoring Engine · AI evaluations · Model performance.** Scoring weights configurable (§4.10).
- Every AI interaction already records provenance (BUILD_PLAN principles #5, #7).

### 07 — AI Agents (`/admin/ai/agents`)
Specialized agents: Financial Analyst, Food Cost, Labor, Menu Engineering, Operations, Customer Experience, Competitor Analysis, Executive Strategy.

- **Config:** name, role, system prompt, knowledge sources, tools, input/output schema, confidence threshold, model, version, status.
- **Performance:** analyses performed, avg confidence, human approval rate, correction rate, avg processing time, error rate — direct feed for the training dataset.

### 08 — Knowledge Base (`/admin/knowledge`)
The IP accumulation layer.

- **Categories:** restaurant methodologies, financial benchmarks, industry reports, operational frameworks, menu engineering, case studies, audit examples, expert insights, AI training data.
- **Documents:** upload (PDF/XLSX/CSV/DOCX), then pipeline: extract → chunk → classify → embed → index → category. (Document processing pipeline is BUILD_PLAN Sprint 3.)

### 09 — Training Dataset (`/admin/training`)
Distinct from the general knowledge base — this builds the future VORA model.

- **Pipeline:** raw audit data → anonymization → cleaning → classification → expert validation → training candidate → dataset.
- **Governance:** not every interaction becomes training data; **admin approves datasets**.
- **Example structure:** input (profile/financial/ops/menu) → AI analysis → expert review → corrected analysis → final recommendation → training example. Captures *problem → AI reasoning → expert correction → final decision*.

### 10 — Scoring Engine + Benchmarks (config + asset)
- **Scoring engine:** configurable weights (Financial 30% · Operational 20% · Food Cost 15% · Labor 15% · Menu 10% · Customer 10%), per-category metrics, thresholds, benchmark, formula, risk levels (e.g. Food Cost <28% excellent → >38% critical).
- **Benchmark database:** industry × restaurant type × region × revenue range × size. Example: Casual Dining food cost avg 31%. Becomes a sales feature ("your restaurant vs. similar restaurants").

### 11 — Leads & CRM (`/admin/leads`)
VORA Check is the lead engine.

- **Pipeline:** New Check → Qualified → Contacted → Discovery Call → Proposal → Client → Lost.
- **Lead profile:** restaurant, owner, location, check score, detected opportunities, lead score, estimated potential, assigned consultant, notes, activity timeline.
- **AI lead qualification:** score from business size, urgency, potential revenue, operational/financial problems, purchase likelihood → Lead Score /100, priority, recommended action.

### 12 — Platform Analytics (`/admin/analytics`)
BI for VORA itself: marketing funnel (visitors → check started → completed → qualified → meeting → proposal → client), platform metrics (restaurants, audits, avg score, audit duration, AI count, reports, conversion, revenue/client).

### 13 — AI Analytics (`/admin/analytics/ai`)
Track AI performance: total analyses, avg processing time, human approval/correction rate, avg confidence, model usage, cost/analysis. **Model comparison** (task × model accuracy) to route the best model per task.

### 14 — Billing (`/admin/billing`)
Even Phase-1 consulting is service-driven: clients, services, proposals, contracts, invoices, payments, revenue. Service catalog (VORA Check free, Quick Review $X, audits $X, monthly advisory).

### 15 — Notifications (`/admin/notifications`)
Centralized, configurable alerts: new lead, audit completed, AI ready, report approval, client uploads, deadline, critical finding, system error.

### 16 — System & Configuration (`/admin/system`)
General settings, users, roles & permissions, integrations, AI providers, email, notifications, storage, API keys, audit logs, security.

### 17 — Activity & Audit Logs (`/admin/activity`)
Append-only log (already `audit_log`): who, when, what changed, previous/new value, AI-generated vs human-modified, approved by. e.g. "Maria modified Food Cost Assessment: Moderate Risk → High Risk, reason: vendor invoices confirmed abnormal increase." This is also training-shaped data.

---

## 5. Build Phases (priority order)

Follows BUILD_PLAN architecture invariants (engines pure, AI isolated behind `AIProvider`, everything training-shaped, tenant isolation, `audit_log` on mutations).

**Phase A — Foundation (reuse existing schema)**
- Multi-role navigation + guards; admin shell/sidebar.
- Command Center KPIs + activity feed (from `audit_log`).
- Restaurants list + profile overview + timeline.
- Audits kanban (status model) + template CRUD.

**Phase B — Operations**
- Audits: pipeline actions, assignment, priority/deadline, progress.
- Reports: state machine + builder + templates.
- Consultants & team: profiles, workload, redistribution.
- Activity logs UI.

**Phase C — Intelligence**
- VORA Intelligence: models, prompts, methodologies.
- AI Agents: config + performance.
- Scoring engine (configurable weights) + benchmarks.
- AI Analytics + model comparison.

**Phase D — Data assets & commercial**
- Knowledge base (document pipeline) + training dataset with admin approval.
- Leads & CRM + AI lead qualification.
- Platform analytics / marketing funnel.
- Billing, notifications, system & configuration.

> Cross-cutting from day one: every admin mutation writes `audit_log`; every AI interaction writes `ai_runs`/`ai_outputs`/`ai_feedback`; every approved dataset entry becomes a `training_examples` candidate.

---

## 6. Data Model Additions (SQLite migrations)

Existing (from `0001_foundation.sql` → `0003_leads.sql`): `organizations`, `users`, `organization_members`, `restaurants`, `restaurant_users`, `audit_log`, `leads`.

New migrations to add (extend `db/schema/0004_*.sql` …):

```
consultants            # consultant profile fields (specialization, experience, rating, workload)
audit_templates/sections/questions   # template methodology (not hardcoded)
audit_pipeline         # status history, assignment, priority, deadline, progress
reports / report_sections / report_templates
ai_models              # provider, purpose, status
ai_agents              # name, role, system_prompt, schemas, threshold, model, version, status
ai_agent_runs          # performance telemetry (approval/correction/error rate, time, cost)
knowledge_categories / knowledge_documents / knowledge_chunks
training_examples / training_labels    # states: raw/reviewed/approved/gold/rejected
scoring_weights        # category, weight, thresholds, risk levels
benchmarks             # industry, type, region, revenue range, size, metric, value
leads (extend)         # lead_score, priority, potential, assigned, timeline
notifications          # type, recipient, channel, read state, config
integrations / api_keys / app_settings
activity_log           # superset of audit_log (before/after, actor type, approved_by)
```

Every table carries tenant ids where applicable (principle #6) and stays consistent with `db/types.ts` + Zod schemas.

---

## 7. Recommendations & Guardrails

1. **Build around the three databases.** Restaurant Intelligence, Knowledge, and Learning are the compounding assets — design tables so data flows into them naturally, not as an afterthought.
2. **Never hardcode methodology.** Audit types, scoring weights, prompts, report structures are DB-configured.
3. **Admin ≠ Auditor.** Keep `/auditor` operational and `/admin` strategic; share services, not screens.
4. **Everything training-shaped.** Activity logs, AI feedback, approved datasets feed `training_examples`. After 100–500 audits this becomes a proprietary dataset of real problems → expert diagnoses → recommendations → outcomes.
5. **Reuse BUILD_PLAN infrastructure.** `AIProvider` isolation, pure engines, Zod validation, `audit_log` — Admin features sit on top; they don't reinvent.
6. **Read Next 16 docs** before each Next-specific feature (per AGENTS.md / BUILD_PLAN §7).

---

## 8. Open Decisions

- **Command Center feed:** server-rendered list now vs. realtime (polling / SSE / websockets) later.
- **Kanban UX:** native drag-and-drop library vs. server-action buttons (buttons are cheaper + accessible).
- **AI agent runtime:** single pipeline with typed agents now vs. a fully modular agent runner.
- **Billing:** full invoicing/payments vs. a service-catalog + revenue-tracking MVP first.