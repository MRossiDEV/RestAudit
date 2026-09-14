---

## description: Initialize a production-ready Next.js application with the latest stable stack and AI development infrastructure

# Project Initialization Architect

You are a Senior Full-Stack Software Architect and Development Environment Engineer.

Your task is to initialize a new production-ready Next.js application using the latest stable compatible versions of the recommended technology stack.

User input:

$ARGUMENTS

The argument may contain:

* Project name
* Project description
* Application type
* Optional requirements

Example:

/setup-init restaurant-ai

/setup-init VORA AI-powered restaurant operations platform

/setup-init SaaS marketplace for local services

---

# PRIMARY OBJECTIVE

Create a clean, modern, production-ready Next.js project.

The project must be:

- TypeScript-first
- App Router based
- Mobile-first
- Production-ready
- AI-agent friendly
- Scalable
- Cleanly structured
- Strictly typed
- Ready for Supabase integration
- Ready for PWA capabilities
- Ready for deployment

Do not blindly install unnecessary dependencies.

Use the latest stable compatible versions.

---

# STEP 1 — INSPECT THE ENVIRONMENT

Before creating anything:

1. Inspect the current directory.
2. Check whether a project already exists.
3. Check whether `package.json` exists.
4. Check whether `.git` exists.
5. Check Node.js version.
6. Check available package managers:
   - pnpm
   - npm
   - bun
   - yarn

7. Detect existing `.claude/` infrastructure.

## Safety Rules

If the directory contains an existing application:

DO NOT overwrite it.

Instead report:

EXISTING PROJECT DETECTED

Then explain what was found.

Only initialize a new application when explicitly appropriate.

---

# STEP 2 — DETERMINE PROJECT NAME

Determine the project name from:

$ARGUMENTS

If no clear project name exists:

Use the current directory name.

Convert project names to valid package names.

Example:

"VORA Platform"

becomes:

"vora-platform"

---

# STEP 3 — CHECK CURRENT TECHNOLOGY VERSIONS

Before installation:

Check the latest stable compatible versions of:

- Node.js compatibility requirements
- Next.js
- React
- React DOM
- TypeScript
- Tailwind CSS
- ESLint
- Zod
- Lucide React

Do not use outdated version numbers from memory.

Use package manager resolution with `@latest` when appropriate.

Prioritize compatibility over blindly mixing latest versions.

---

# STEP 4 — CREATE NEXT.JS APPLICATION

Create the application using the official Next.js project generator.

Preferred package manager:

1. pnpm
2. npm
3. bun
4. yarn

Prefer pnpm when available.

Use the equivalent of:

```bash
pnpm create next-app@latest PROJECT_NAME
```

Configure the project with:

- TypeScript: YES
- App Router: YES
- Tailwind CSS: YES
- ESLint: YES
- React Compiler: YES when supported by the current stable setup
- Import alias: `@/*`
- src directory: YES
- Latest stable compatible versions

Do not use Pages Router.

Do not use JavaScript.

Do not use deprecated Next.js configuration.

Do not manually recreate files that the official generator already creates.

---

# STEP 5 — VERIFY BASELINE STACK

After initialization verify:

## Core

- Next.js
- React
- React DOM
- TypeScript

## Framework

- App Router
- Server Components
- Server Actions support
- Route Handlers

## Styling

- Tailwind CSS
- Latest supported PostCSS configuration

## Development

- ESLint
- TypeScript strict mode

## Build

Verify:

```bash
npm run build
```

or the equivalent package manager command.

Fix initialization issues before continuing.

---

# STEP 6 — INSTALL CURATED BASELINE DEPENDENCIES

Install only high-value dependencies.

## Validation

Install:

```text
zod
```

Purpose:

- Runtime validation
- Form validation
- API validation
- Type-safe schemas

---

## Class Utilities

Install:

```text
clsx
tailwind-merge
class-variance-authority
```

Purpose:

- Conditional classes
- Tailwind conflict resolution
- Component variants

---

## Icons

Install:

```text
lucide-react
```

Do not install multiple icon libraries.

---

## Date Utilities

Install:

```text
date-fns
```

---

# STEP 7 — OPTIONAL UI COMPONENT SYSTEM

Do NOT automatically install a large UI framework.

Instead prepare the project for:

```text
shadcn/ui
```

Install shadcn/ui only when:

- The project requires a complex UI
- A component library is requested
- The user explicitly requests it

Avoid unnecessary dependencies.

Prefer:

Tailwind CSS

- Reusable local components
- shadcn/ui when appropriate

  ***

# STEP 8 — CREATE PROFESSIONAL PROJECT STRUCTURE

After Next.js initialization, create a scalable architecture.

Use:

```text
src/
│
├── app/
│   │
│   ├── (public)/
│   │
│   ├── (auth)/
│   │
│   ├── (dashboard)/
│   │
│   ├── api/
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
│
├── components/
│   │
│   ├── ui/
│   ├── shared/
│   ├── layout/
│   └── features/
│
├── features/
│
├── lib/
│   │
│   ├── utils/
│   ├── constants/
│   ├── validations/
│   └── helpers/
│
├── services/
│
├── hooks/
│
├── types/
│
├── config/
│
└── styles/
```

Important:

Do not populate every directory with unnecessary placeholder files.

Only create directories.

Use `.gitkeep` only when necessary.

---

# ARCHITECTURE RULES

The project should follow:

```text
UI
↓
Feature
↓
Service
↓
Data / External API
```

Avoid:

```text
UI
↓
Direct database calls everywhere
```

Business logic should not become scattered across components.

---

# STEP 9 — CREATE CORE UTILITIES

Create:

```text
src/lib/utils/cn.ts
```

Implement the project's standard class merging utility.

It should combine:

- clsx
- tailwind-merge

Example responsibility:

```typescript
cn(...)
```

Use this as the standard utility for component class composition.

---

Create:

```text
src/lib/constants/
```

For centralized constants.

Do not add random constants.

---

Create:

```text
src/lib/validations/
```

For Zod schemas.

Do not add schemas until needed.

---

# STEP 10 — CONFIGURE TYPESCRIPT

Inspect `tsconfig.json`.

Ensure:

- Strict mode enabled
- Modern module resolution
- Path alias configured
- No unnecessary weakening of TypeScript rules

Do not disable strict mode to solve errors.

Do not use:

```text
any
```

unless absolutely unavoidable.

Prefer:

```typescript
unknown;
```

with proper validation.

---

# STEP 11 — ENVIRONMENT CONFIGURATION

Create:

```text
.env.example
```

Include placeholders only.

Example:

```text
NEXT_PUBLIC_APP_URL=

# Database
DATABASE_URL=

# Authentication
AUTH_SECRET=
```

Only add variables relevant to installed integrations.

Never:

- Copy secrets
- Commit `.env.local`
- Invent API keys

Ensure `.env.local` is ignored.

---

# STEP 12 — CREATE APPLICATION CONFIG

Create:

```text
src/config/site.ts
```

Structure:

```typescript
export const siteConfig = {
  name: "PROJECT_NAME",
  description: "PROJECT_DESCRIPTION",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "",
} as const;
```

Use actual project information when available.

Keep configuration centralized.

---

# STEP 13 — CREATE ERROR AND LOADING INFRASTRUCTURE

Ensure the application has:

```text
src/app/
├── loading.tsx
├── error.tsx
└── not-found.tsx
```

Requirements:

## loading.tsx

Provide a minimal reusable loading experience.

## error.tsx

Provide a user-friendly error boundary.

Must:

- Be a Client Component when required
- Allow retry
- Avoid exposing internal error details

## not-found.tsx

Provide a clean not-found state.

Keep these minimal.

Do not build a full design system during initialization.

---

# STEP 14 — CREATE BASELINE GLOBAL STYLING

Inspect the generated Tailwind configuration.

Do not use outdated Tailwind patterns.

Maintain the current Tailwind version conventions.

Configure:

- Base typography
- Body defaults
- Selection behavior
- Focus accessibility
- Smooth scrolling where appropriate

Do not create a massive global stylesheet.

Prefer component-level styling with Tailwind.

---

# STEP 15 — GIT INITIALIZATION

If Git is not initialized:

Initialize:

```bash
git init
```

Ensure `.gitignore` includes:

```text
node_modules
.next
.env
.env.local
.env*.local
*.log
coverage
```

Preserve official Next.js `.gitignore` entries.

Do not commit automatically unless explicitly requested.

---

# STEP 16 — CREATE AGENT INFRASTRUCTURE

Create:

```text
.claude/
```

If it does not exist.

Create:

```text
.claude/
├── commands/
├── agents/
├── memory/
└── skills/
```

Do not overwrite existing `.claude` infrastructure.

---

# STEP 17 — CREATE PROJECT AGENT RULES

Create or update:

```text
CLAUDE.md
```

Keep it concise.

Target:

Under 800 tokens.

Include:

```markdown
# Project Agent Rules

## Stack

Document the detected technology stack.

## Architecture

Follow the existing architecture.

UI
→ Feature
→ Service
→ Data

Do not place complex business logic directly inside UI components.

## Type Safety

- TypeScript strict mode.
- Avoid `any`.
- Validate external input.
- Use Zod for runtime validation when appropriate.

## Code Quality

- Reuse existing patterns.
- Avoid duplication.
- Avoid unnecessary dependencies.
- Prefer simple solutions.
- Do not modify unrelated files.

## Before Changes

1. Inspect relevant code.
2. Identify architecture patterns.
3. Check related project memory.
4. Consider side effects.

## After Changes

1. Check types.
2. Check imports.
3. Remove dead code.
4. Check error handling.
5. Consider security.
6. Check responsive behavior.

## Memory

Persistent project memory:

`.claude/memory/`

Do not load all memory.

Start with:

`.claude/memory/INDEX.md`

Load only context relevant to the task.
```

Preserve useful existing instructions.

---

# STEP 18 — INITIALIZE MEMORY SYSTEM

If:

```text
.claude/commands/setup-memory.md
```

exists:

Run the memory setup workflow.

Otherwise create the baseline memory structure:

```text
.claude/memory/
├── INDEX.md
│
├── core/
│   ├── project.md
│   ├── architecture.md
│   ├── stack.md
│   └── conventions.md
│
├── domains/
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

Populate:

- project.md
- architecture.md
- stack.md
- conventions.md

using information detected from the initialized project.

Keep memory compressed.

Do not write essays.

---

# STEP 19 — INITIALIZE DEVELOPMENT COMMAND SYSTEM

If:

```text
.claude/commands/setup-dev-workflow.md
```

exists:

Run the workflow setup.

Otherwise ensure these baseline commands exist:

```text
.claude/commands/
├── help.md
├── analyze.md
├── plan.md
├── build.md
├── fix.md
├── test.md
├── review.md
├── remember.md
├── context.md
├── memory-status.md
└── memory-clean.md
```

Do not overwrite custom commands.

---

# STEP 20 — CREATE README

Create or update:

```text
README.md
```

Keep it concise.

Include:

# Project Name

## Stack

- Next.js
- TypeScript
- React
- Tailwind CSS

Plus detected dependencies.

## Getting Started

```bash
PACKAGE_MANAGER install
PACKAGE_MANAGER dev
```

## Scripts

List available scripts.

## Project Structure

Show high-level structure.

Do not generate a massive README.

---

# STEP 21 — INSTALLATION VALIDATION

Run:

```bash
PACKAGE_MANAGER install
```

Then:

```bash
PACKAGE_MANAGER run lint
```

Then:

```bash
PACKAGE_MANAGER run build
```

If available, also run:

```bash
tsc --noEmit
```

or the project's equivalent type check.

Fix initialization problems.

Do not ignore errors.

---

# STEP 22 — PROJECT HEALTH CHECK

Verify:

## Application

- Next.js starts
- Build succeeds
- TypeScript passes
- Lint passes

## Architecture

- App Router enabled
- `src/` structure exists
- Path aliases work
- No duplicate configuration

## Security

- No secrets committed
- `.env.example` exists
- `.env.local` ignored

## Agent Infrastructure

- `.claude/` exists
- Commands exist
- Memory exists
- CLAUDE.md exists

---

# STEP 23 — INITIAL PROJECT MEMORY

Populate:

```text
.claude/memory/core/project.md
```

With:

- Project name
- Project type
- Description
- Initial stage

Populate:

```text
.claude/memory/core/architecture.md
```

With:

- Next.js architecture
- App Router
- Server/Client component strategy
- Service boundaries

Populate:

```text
.claude/memory/core/stack.md
```

With actual installed dependencies.

Populate:

```text
.claude/memory/core/conventions.md
```

With:

- Naming conventions
- File organization
- TypeScript rules
- Architecture rules

Update:

```text
.claude/memory/INDEX.md
```

with actual memory files.

---

# IMPORTANT — DO NOT OVER-ENGINEER

This command initializes infrastructure.

It does NOT build the application.

Do not:

- Create authentication
- Create database schemas
- Create dashboards
- Create unnecessary API routes
- Create fake features
- Create placeholder components
- Install dozens of packages
- Add Redux by default
- Add state management unnecessarily
- Add Docker unless requested
- Add Supabase unless requested
- Add a UI library unless needed

The goal is:

```text
MINIMAL
+
MODERN
+
PRODUCTION-READY
+
EXTENSIBLE
```

---

# PACKAGE INSTALLATION POLICY

Before installing any dependency ask internally:

1. Is this required for the baseline?
2. Does the framework already provide this functionality?
3. Is this dependency actively maintained?
4. Is it compatible with the current stack?
5. Will the project actually use it?

If the answer is no:

Do not install it.

---

# VERSION POLICY

Always prefer:

```text
latest stable
```

But never blindly upgrade incompatible packages.

Priority:

```text
Compatibility
↓
Stability
↓
Security
↓
Latest version
```

Never pin arbitrary versions from memory.

Use package manager resolution.

---

# FINAL OUTPUT

After successful initialization report:

# PROJECT INITIALIZED

## Project

- Name:
- Location:
- Package Manager:

## Installed Stack

| Technology | Version        |
| ---------- | -------------- |
| Next.js    | Actual version |
| React      | Actual version |
| TypeScript | Actual version |
| Tailwind   | Actual version |

## Dependencies Added

List actual dependencies.

## Project Structure

Show:

```text
src/
.claude/
```

high-level tree.

## Agent System

Show:

```text
Commands: X
Memory Files: X
Agents: X
```

## Validation

```text
Build: PASS / FAIL
Lint: PASS / FAIL
Type Check: PASS / FAIL
```

## Next Recommended Commands

```text
/help

/context "describe the first feature"

/product:prd "describe the product"

/analyze "describe the feature"

/plan "describe the feature"
```

Actually initialize the project.

Do not merely explain what should be done.

Do not claim success unless installation and validation commands actually completed.
