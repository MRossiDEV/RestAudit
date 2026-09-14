---
## description: Create a token-efficient persistent memory system for Claude Code agents

# Claude Code Memory System Bootstrapper

You are a Memory Architecture Engineer specializing in AI coding agents, context optimization, and persistent project knowledge systems.

Your task is to create a complete, token-efficient project memory architecture inside the current repository.

The system must allow agents to retain important project knowledge without loading unnecessary context.
---

# PRIMARY OBJECTIVE

Create a persistent memory system at:

```text
.claude/memory/
```

The memory system must follow this principle:

> Do not make the agent remember everything. Make the agent know where to look.

Memory is NOT documentation.

Memory is NOT a duplicate of the codebase.

Memory is a compressed index of information that is expensive, important, or non-obvious to rediscover.

---

# STEP 1 — ANALYZE THE PROJECT

Before creating files:

1. Inspect the repository structure.
2. Detect the technology stack.
3. Detect existing `.claude/` configuration.
4. Check whether `CLAUDE.md` already exists.
5. Check whether a memory system already exists.
6. Identify major application domains.
7. Identify important architectural patterns.
8. Identify authentication systems.
9. Identify database technologies.
10. Identify important external integrations.

Do not create unnecessary domain files.

Adapt the memory structure to the actual project.

---

# STEP 2 — CREATE MEMORY ARCHITECTURE

Create the following structure:

```text
.claude/
│
├── CLAUDE.md
│
├── commands/
│   ├── remember.md
│   ├── context.md
│   ├── memory-status.md
│   └── memory-clean.md
│
└── memory/
    │
    ├── INDEX.md
    │
    ├── core/
    │   ├── project.md
    │   ├── architecture.md
    │   ├── stack.md
    │   └── conventions.md
    │
    ├── domains/
    │   └── [only actual detected domains]
    │
    ├── decisions/
    │   └── INDEX.md
    │
    ├── active/
    │   ├── current.md
    │   ├── blockers.md
    │   └── todos.md
    │
    ├── knowledge/
    │   ├── integrations.md
    │   ├── business-rules.md
    │   └── glossary.md
    │
    └── history/
        └── changelog.md
```

Do not create empty domain files for hypothetical features.

Only create domain memory files for domains actually detected in the project.

Examples:

```text
domains/
├── auth.md
├── users.md
├── billing.md
├── notifications.md
└── ai.md
```

Only if those domains actually exist.

---

# STEP 3 — CREATE ROOT CLAUDE.md

If `CLAUDE.md` does not exist, create it.

If it already exists, preserve its useful instructions and add the memory system instructions without destroying existing project rules.

Keep the file concise.

Target maximum:

```text
800 tokens
```

Use the following structure:

```markdown
# Project Agent Rules

## Memory System

Persistent project knowledge is stored in:

`.claude/memory/`

Do NOT load all memory files.

Start with:

`.claude/memory/INDEX.md`

Load only memory relevant to the current task.

## Memory Priority

1. Active task context
2. Relevant domain memory
3. Architecture constraints
4. Related decisions
5. Historical memory only when necessary

## Before Making Changes

1. Inspect relevant code.
2. Load relevant memory.
3. Check architectural constraints.
4. Check related decisions.
5. Identify possible side effects.

## After Significant Changes

Update only the affected memory.

## Memory Rules

Memory must remain concise.

Do not store:

- Full conversations
- Duplicate source code
- Temporary debugging information
- Obvious information visible in code
- Long explanations
- Implementation details that can be discovered directly

Store:

- Important decisions
- Architectural constraints
- Business rules
- Non-obvious discoveries
- Known risks
- Integration constraints
- Important relationships
- Current work state

## Core Principle

Memory is a navigation system, not a duplicate of the codebase.

Prefer:

FACT → RULE → CONSTRAINT → REFERENCE

over long explanations.
```

---

# STEP 4 — CREATE MEMORY INDEX

Create:

```text
.claude/memory/INDEX.md
```

This file is the memory router.

It must be concise.

Target maximum:

```text
600 tokens
```

Use this structure:

```markdown
# Project Memory Index

## Purpose

Entry point for project memory.

Do not load all memory.

Load only files relevant to the current task.

---

# Core

| File                   | Load When                        |
| ---------------------- | -------------------------------- |
| `core/project.md`      | Understanding product purpose    |
| `core/architecture.md` | Architectural changes            |
| `core/stack.md`        | Technology or dependency changes |
| `core/conventions.md`  | Writing or refactoring code      |

---

# Domains

List only detected domains.

| Domain   | File                  | Load When        |
| -------- | --------------------- | ---------------- |
| [domain] | `domains/[domain].md` | [relevant tasks] |

---

# Decisions

Use:

`decisions/INDEX.md`

Load when:

- Making architectural decisions
- Modifying foundational systems
- Considering previously rejected approaches

---

# Active Context

| File                 | Purpose                   |
| -------------------- | ------------------------- |
| `active/current.md`  | Current development focus |
| `active/blockers.md` | Known blockers            |
| `active/todos.md`    | Important unfinished work |

Load when continuing ongoing work.

---

# Knowledge

| File                          | Load When           |
| ----------------------------- | ------------------- |
| `knowledge/integrations.md`   | External services   |
| `knowledge/business-rules.md` | Business logic      |
| `knowledge/glossary.md`       | Project terminology |

---

# Loading Strategy

Minimal task:

CLAUDE.md
↓
Relevant Code

Feature task:

CLAUDE.md
↓
INDEX.md
↓
Relevant Domain
↓
Relevant Code

Architecture task:

CLAUDE.md
↓
INDEX.md
↓
Architecture
↓
Relevant Decisions
↓
Relevant Code

Continuation task:

CLAUDE.md
↓
active/current.md
↓
Relevant Domain
↓
Relevant Code

Never load unrelated memory.
```

After creating the template, customize it to the actual project.

---

# STEP 5 — CREATE CORE MEMORY

Create:

```text
.claude/memory/core/project.md
```

Populate it from the actual project.

Maximum target:

```text
500 tokens
```

Structure:

```markdown
# Project

## Identity

- Name:
- Type:
- Primary users:
- Core problem:
- Core value:

## Critical Constraints

- Constraint
- Constraint

## Primary Business Model

- Short description

## Non-Negotiables

- Rule
- Rule

## Current Stage

- MVP / Beta / Production

Last updated: [DATE]
```

Do not write project history.

Do not write long descriptions.

Use compressed facts.

---

Create:

```text
.claude/memory/core/architecture.md
```

Maximum target:

```text
600 tokens
```

Include only:

```markdown
# Architecture

## System Flow

[Simple architecture diagram]

## Main Layers

| Layer | Responsibility |
| ----- | -------------- |

## Important Boundaries

- Boundary
- Boundary

## Key Directories

| Directory | Purpose |
| --------- | ------- |

## Architectural Constraints

- Constraint

## Do Not

- Anti-pattern
- Anti-pattern

Last updated: [DATE]
```

Do not document every component.

Only store architecture that is difficult to infer quickly.

---

Create:

```text
.claude/memory/core/stack.md
```

Maximum target:

```text
400 tokens
```

Structure:

```markdown
# Technology Stack

## Frontend

- Technology

## Backend

- Technology

## Database

- Technology

## Authentication

- Technology

## Infrastructure

- Technology

## Important Dependencies

| Dependency | Purpose |
| ---------- | ------- |

## Constraints

- Important version constraint
- Compatibility constraint

Last updated: [DATE]
```

Only include important dependencies.

Do not duplicate `package.json`.

---

Create:

```text
.claude/memory/core/conventions.md
```

Maximum target:

```text
500 tokens
```

Store only project-specific conventions.

Example:

```markdown
# Project Conventions

## Naming

- Components: PascalCase
- Utilities: camelCase

## Architecture

- Server components by default
- Business logic outside UI

## Data Access

- Database access through service layer

## Error Handling

- Use project-standard error pattern

## Do Not

- Bypass authentication helpers
- Duplicate API logic

Last updated: [DATE]
```

Do not store generic programming advice.

---

# STEP 6 — CREATE DOMAIN MEMORY

For every major domain actually detected in the project, create:

```text
.claude/memory/domains/[domain].md
```

Examples:

```text
auth.md
users.md
payments.md
notifications.md
ai.md
analytics.md
```

Only create files for real domains.

Each file should target:

```text
300–800 tokens maximum
```

Template:

```markdown
# Domain: [NAME]

## Purpose

One sentence.

## Core Entities

- Entity
- Entity

## Rules

- Rule
- Rule

## Important Relationships

- Relationship

## Constraints

- Constraint

## Important Files

- `path/file`
- `path/file`

## Related Decisions

- `decisions/XXX-name.md`

## Known Risks

- Risk

Last updated: [DATE]
```

Never copy implementation details or source code.

---

# STEP 7 — CREATE DECISION MEMORY

Create:

```text
.claude/memory/decisions/INDEX.md
```

Structure:

```markdown
# Architecture Decisions

| ID  | Decision   | Status | Date   |
| --- | ---------- | ------ | ------ |
| 001 | [Decision] | Active | [DATE] |

Load individual decisions only when relevant.
```

For important existing architectural decisions detected from the codebase, create compressed decision files:

```text
001-[decision].md
002-[decision].md
```

Each decision should target:

```text
300 tokens maximum
```

Template:

```markdown
# [ID] — [Decision Name]

## Decision

One sentence.

## Why

- Reason
- Reason

## Constraint

- Important limitation

## Alternatives Rejected

- Alternative

## Impact

- Consequence

Date: [DATE]

Status: Active
```

Do not invent decisions.

Only document decisions supported by:

- Existing documentation
- Codebase evidence
- Existing configuration
- Explicit project instructions

If uncertain, do not create a decision.

---

# STEP 8 — CREATE ACTIVE MEMORY

Create:

```text
.claude/memory/active/current.md
```

Structure:

```markdown
# Current Work

## Objective

No active objective yet.

## Current Phase

Planning

## Completed

- None

## In Progress

- None

## Next

1. Define current development task

## Relevant Files

- None

## Relevant Memory

- None

Last updated: [DATE]
```

Important:

This file represents short-term working memory.

It must be continuously replaced.

It must NOT become a historical log.

Target:

```text
400 tokens maximum
```

---

Create:

```text
.claude/memory/active/blockers.md
```

Structure:

```markdown
# Known Blockers

No active blockers.

## Rules

Only include blockers that currently prevent progress.

Remove resolved blockers.

Last updated: [DATE]
```

Target:

```text
300 tokens maximum
```

---

Create:

```text
.claude/memory/active/todos.md
```

Structure:

```markdown
# Important TODOs

Only include important unfinished work.

Do not duplicate task management systems.

## High Priority

- None

## Medium Priority

- None

## Low Priority

- None

Last updated: [DATE]
```

Target:

```text
400 tokens maximum
```

---

# STEP 9 — CREATE KNOWLEDGE MEMORY

Create:

```text
.claude/memory/knowledge/integrations.md
```

Only document integrations actually used.

Structure:

```markdown
# External Integrations

## [Integration Name]

Purpose:

- Short description

Important Files:

- `path/file`

Constraints:

- Constraint

Documentation:

- Reference if available
```

Do not copy external API documentation.

Store only integration-specific knowledge relevant to this project.

---

Create:

```text
.claude/memory/knowledge/business-rules.md
```

Store only non-obvious business rules.

Structure:

```markdown
# Business Rules

## [Domain]

- Rule
- Rule

## Constraints

- Constraint

Last updated: [DATE]
```

Do not duplicate rules that are obvious from the UI or code.

---

Create:

```text
.claude/memory/knowledge/glossary.md
```

Structure:

```markdown
# Project Glossary

| Term | Meaning                     |
| ---- | --------------------------- |
| Term | Project-specific definition |
```

Only include project-specific terminology.

---

# STEP 10 — CREATE HISTORY

Create:

```text
.claude/memory/history/changelog.md
```

Structure:

```markdown
# Significant Changes

Only major architectural or product changes belong here.

## [Month Year]

- Significant change
- Significant change
```

Never store daily development logs.

Never store debugging history.

---

# STEP 11 — CREATE /remember COMMAND

Create:

```text
.claude/commands/remember.md
```

Content:

```markdown
---
description: Save only valuable and compressed project knowledge to persistent memory
---

# Memory Manager

You manage persistent project memory.

Your objective is to preserve important knowledge while minimizing token usage.

User input:

$ARGUMENTS

If no arguments are provided, analyze the current task, recent work, and relevant code changes.

## Before Saving

Ask internally:

1. Is this difficult to rediscover from code?
2. Will it matter in future tasks?
3. Is it a decision, constraint, business rule, discovery, risk, or active context?
4. Can it be expressed concisely?

If not valuable, do not save it.

## Memory Classification

### Core

Use for permanent project-wide knowledge.

### Domain

Use for domain-specific rules and relationships.

### Decisions

Use for important architectural decisions.

### Active

Use for current development state.

### Knowledge

Use for business rules, integrations, and terminology.

### History

Use only for major project changes.

## Compression Rules

Prefer:

FACT
→ RULE
→ CONSTRAINT
→ REFERENCE

Never save:

- Full conversations
- Source code
- Long explanations
- Temporary debugging information
- Duplicate information

## Deduplication

Before writing:

1. Read `memory/INDEX.md`.
2. Check related memory.
3. Update existing files when possible.
4. Avoid duplicates.

## Token Budgets

| Memory      |    Maximum |
| ----------- | ---------: |
| CLAUDE.md   | 800 tokens |
| INDEX.md    | 600 tokens |
| Core file   | 600 tokens |
| Domain file | 800 tokens |
| Decision    | 300 tokens |
| Active file | 400 tokens |

If a file becomes too large:

1. Compress it.
2. Remove duplication.
3. Remove obsolete information.
4. Archive only significant history.

## Update Index

When creating a new domain or memory file:

Update:

`.claude/memory/INDEX.md`

Include:

- File
- Purpose
- When to load

## Final Output

Report:

MEMORY UPDATED

Created:

- file

Updated:

- file

Skipped:

- information intentionally not saved

Compression:

- concise summary of what was reduced or consolidated
```

---

# STEP 12 — CREATE /context COMMAND

Create:

```text
.claude/commands/context.md
```

Content:

```markdown
---
description: Determine and load the minimum project memory required for a task
---

# Context Router

Your task is to determine the minimum context required for:

$ARGUMENTS

## Process

1. Read `.claude/memory/INDEX.md`.
2. Identify the task domain.
3. Identify relevant architecture constraints.
4. Identify relevant decisions.
5. Check active context if applicable.
6. Load only necessary memory files.
7. Inspect only relevant code.

## Context Priority

Task
↓
Relevant Domain
↓
Architecture Constraint
↓
Related Decision
↓
Relevant Code

## Do Not Load

Do not load:

- Unrelated domains
- Historical files without reason
- All decisions
- All integration knowledge
- Entire codebase

## Output

CONTEXT LOADED

Memory:

- file — reason

Code:

- file — reason

Not Loaded:

- category — irrelevant

Then provide a concise context summary.

Maximum summary:

500 words.

Do not modify files unless explicitly requested.
```

---

# STEP 13 — CREATE /memory-status COMMAND

Create:

```text
.claude/commands/memory-status.md
```

Content:

```markdown
---
description: Audit project memory health, size, duplication, and token efficiency
---

# Memory Status Auditor

Inspect:

`.claude/memory/`

Evaluate the memory system.

## Check

### Structure

- Missing required files
- Broken references
- Missing INDEX entries

### Token Efficiency

- Oversized files
- Unnecessary detail
- Duplicate information
- Obsolete information

### Relevance

- Dead domains
- Outdated active context
- Resolved blockers
- Obsolete TODOs

### Navigation

- Can an agent easily determine what to load?
- Are domains properly indexed?
- Are decisions discoverable?

## Output

# MEMORY STATUS

## Health Score

Score: X/100

## Files

| File | Status | Size Estimate | Action |
| ---- | ------ | ------------- | ------ |

## Problems

- Problem

## Token Waste

Estimate potential unnecessary context.

## Recommendations

1. Action
2. Action

Do not modify memory unless explicitly requested.
```

---

# STEP 14 — CREATE /memory-clean COMMAND

Create:

```text
.claude/commands/memory-clean.md
```

Content:

```markdown
---
description: Clean and compress project memory without losing important knowledge
---

# Memory Optimizer

Your task is to optimize:

`.claude/memory/`

for minimal token usage and maximum usefulness.

## Process

1. Inspect memory structure.
2. Find duplicate information.
3. Find obsolete information.
4. Find oversized files.
5. Find historical noise.
6. Find broken references.
7. Compress valuable information.
8. Remove resolved active context.
9. Update indexes.

## Compression Rules

Convert:

Long explanations
→ concise facts

Historical narrative
→ significant decision

Duplicate rules
→ single source of truth

Implementation detail
→ file reference

## Never Remove

- Active architectural constraints
- Important business rules
- Active decisions
- Critical integration constraints

unless clearly obsolete.

## Token Targets

| File      | Target |
| --------- | -----: |
| CLAUDE.md |  < 800 |
| INDEX.md  |  < 600 |
| Core      |  < 600 |
| Domain    |  < 800 |
| Decision  |  < 300 |
| Active    |  < 400 |

## Final Output

MEMORY OPTIMIZATION COMPLETE

Before:

- estimated memory size

After:

- estimated memory size

Saved:

- estimated token reduction

Changes:

- files compressed
- duplicates removed
- obsolete context removed
```

---

# STEP 15 — MEMORY AUTOMATION RULES

Add the following memory lifecycle strategy to the appropriate project instructions.

## Before Complex Work

Agent should:

```text
1. Read CLAUDE.md
2. Read memory/INDEX.md
3. Identify relevant domain
4. Load only relevant memory
5. Inspect relevant code
```

## During Work

Do not continuously reload memory.

Keep working context focused.

## After Significant Work

Run the equivalent of:

```text
/remember
```

Only if important knowledge was discovered.

## After Completing a Feature

Update:

```text
active/current.md
```

Move only important long-term knowledge to:

```text
domains/
decisions/
knowledge/
```

Do not save every implementation detail.

---

# MEMORY LOADING LEVELS

The system must support three levels of context.

## LEVEL 1 — Minimal

Use for simple changes.

Load:

```text
CLAUDE.md
+
relevant code
```

## LEVEL 2 — Domain

Use for feature work.

Load:

```text
CLAUDE.md
+
INDEX.md
+
relevant domain
+
relevant code
```

## LEVEL 3 — Architectural

Use for complex changes.

Load:

```text
CLAUDE.md
+
INDEX.md
+
architecture.md
+
relevant domain
+
related decisions
+
relevant code
```

Never default to Level 3.

Use the minimum context necessary.

---

# FILE SIZE ENFORCEMENT

After generating memory:

Estimate the size of every memory file.

If a file contains unnecessary information:

Compress it before finishing.

Preferred memory format:

```text
GOOD

Auth: Supabase Auth
Roles: user, admin
Constraint: authorization verified server-side
Reference: lib/auth.ts
```

Avoid:

```text
BAD

The project originally decided to use Supabase because during
the initial development phase the team considered several
different authentication solutions...
```

---

# EXISTING MEMORY SAFETY

If memory already exists:

DO NOT overwrite it blindly.

Instead:

1. Inspect existing files.
2. Preserve useful information.
3. Merge duplicate concepts.
4. Compress where appropriate.
5. Fix structure only when necessary.
6. Create backups only if a major destructive restructure is required.

Never delete memory simply because it does not match this template.

---

# FINAL VALIDATION

Before completing:

Verify:

- `.claude/memory/INDEX.md` exists.
- Core memory exists.
- Only relevant domain memory exists.
- Active memory exists.
- Decision index exists.
- Knowledge files exist.
- History exists.
- `/remember` exists.
- `/context` exists.
- `/memory-status` exists.
- `/memory-clean` exists.
- `CLAUDE.md` contains memory navigation rules.
- No memory file is unnecessarily large.
- No major duplicate information exists.

---

# FINAL OUTPUT

After completing the setup, report:

# MEMORY SYSTEM CREATED

## Structure

Show the actual generated tree.

## Core Memory

List created files.

## Detected Domains

List domains created.

## Commands

List:

- `/remember`
- `/context`
- `/memory-status`
- `/memory-clean`

## Memory Strategy

Explain:

```text
Simple Task
→ CLAUDE.md + Code

Feature
→ INDEX + Domain + Code

Architecture
→ INDEX + Architecture + Decisions + Code
```

## Token Efficiency

Report:

- Number of memory files
- Estimated average memory file size
- Files intentionally not created
- Potential context savings compared with loading one large project memory file

## Next Step

Recommend:

```text
/context [next task]
```

or:

```text
/help
```

Actually create all files.

Do not only describe the architecture.

````


## Recommended usage

Once saved, run:

```text
/setup-memory
````

Then your agent gets a persistent, navigable memory architecture.

Your workflow becomes:

```text
NEW TASK
   │
   ▼
/context "task description"
   │
   ▼
Loads minimum relevant memory
   │
   ▼
/analyze
   │
   ▼
/plan
   │
   ▼
/build
   │
   ▼
/remember
   │
   ▼
Memory updated
```

### One important improvement

I would eventually integrate `/remember` directly into your major commands (`/build`, `/fix`, `/refactor`) so that after significant work, the agent **evaluates whether anything is worth saving**—but does **not automatically dump everything into memory**.

That distinction is crucial: **automatic memory should be selective, not verbose.**
