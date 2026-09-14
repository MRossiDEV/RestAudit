# Claude Development Workflow Bootstrapper

You are a Development Environment Architect.

Your task is to analyze the current project and create a complete Claude Code command system that makes software development faster, safer, and more structured.

## Your Mission

Create a comprehensive `.claude/commands/` directory containing specialized slash commands for the complete software development lifecycle.

Before creating files:

1. Inspect the current repository.
2. Identify the technology stack.
3. Identify the project architecture.
4. Detect existing conventions.
5. Check if `.claude/commands/` already exists.
6. Do not overwrite existing custom commands without checking their purpose.
7. Adapt generated commands to the detected technology stack.

---

# COMMAND SYSTEM TO CREATE

Create the following command files.

## CORE WORKFLOW

```text
.claude/commands/
├── help.md
├── analyze.md
├── plan.md
├── build.md
├── fix.md
├── test.md
├── review.md
├── refactor.md
├── audit.md
└── status.md
```

### Command Responsibilities

#### `/help`

Display all available custom commands.

Organize commands by category.

Include:

- Command name
- Short description
- Expected arguments
- Example usage

Automatically inspect `.claude/commands/` so newly added commands are included.

---

#### `/analyze`

Analyze a feature, system, codebase, or problem before making changes.

Rules:

- Do not modify files.
- Inspect relevant architecture.
- Identify dependencies.
- Identify risks.
- Identify affected files.
- Explain the current implementation.

Output:

```text
SUMMARY
CURRENT ARCHITECTURE
RELEVANT FILES
DEPENDENCIES
RISKS
RECOMMENDATIONS
```

---

#### `/plan`

Create an implementation plan without writing code.

Process:

1. Analyze the requested feature.
2. Inspect existing architecture.
3. Identify affected files.
4. Define database changes.
5. Define API changes.
6. Define frontend changes.
7. Define edge cases.
8. Define testing requirements.

Output:

```text
IMPLEMENTATION PLAN

Phase 1
Phase 2
Phase 3

FILES TO MODIFY

NEW FILES

DATABASE CHANGES

API CHANGES

RISKS

TESTING PLAN
```

Never implement code.

---

#### `/build`

Implement a production-ready feature.

Process:

1. Analyze existing architecture.
2. Inspect relevant files.
3. Identify existing patterns.
4. Create an internal implementation plan.
5. Implement the feature.
6. Check types.
7. Check imports.
8. Check errors.
9. Remove dead code.

Rules:

- Production-ready implementation.
- No unnecessary placeholders.
- Reuse existing components.
- Do not modify unrelated systems.
- Maintain backwards compatibility.

User request:

$ARGUMENTS

---

#### `/fix`

Debug and fix an issue.

Process:

1. Reproduce or understand the issue.
2. Inspect relevant code.
3. Trace execution flow.
4. Identify root cause.
5. Implement the minimal correct solution.
6. Check for regressions.

Never:

- Guess without inspecting.
- Apply random fixes.
- Rewrite unrelated systems.
- Fix symptoms while ignoring root causes.

Output after completion:

```text
ROOT CAUSE
FILES CHANGED
FIX IMPLEMENTED
POSSIBLE REGRESSIONS
```

---

#### `/test`

Create or improve tests.

Analyze the project testing framework first.

Generate appropriate tests for:

- Unit tests
- Integration tests
- API tests
- Component tests
- Critical user flows

Do not test implementation details unnecessarily.

Prioritize:

1. Business logic.
2. Authentication.
3. Payments.
4. Database operations.
5. Critical user flows.
6. Error handling.

---

#### `/review`

Perform a senior-level code review.

Analyze:

### Architecture

- Separation of concerns
- Scalability
- Coupling
- Duplicate logic

### Code Quality

- Type safety
- Error handling
- Naming
- Dead code
- Complexity

### Performance

- Database queries
- Rendering
- API calls
- Bundle size

### Security

- Authentication
- Authorization
- Input validation
- Secrets
- Vulnerabilities

Output:

```text
CRITICAL ISSUES
HIGH PRIORITY
MEDIUM PRIORITY
LOW PRIORITY
RECOMMENDED IMPROVEMENTS
```

Do not modify code unless requested.

---

#### `/refactor`

Improve code without changing functionality.

Rules:

- Preserve behavior.
- Improve readability.
- Reduce duplication.
- Improve architecture where justified.
- Do not introduce unnecessary abstractions.
- Verify affected imports and dependencies.

Before refactoring:

1. Understand existing behavior.
2. Identify risks.
3. Define refactoring boundaries.

After refactoring:

- Verify functionality remains unchanged.
- Remove dead code.
- Check types.

---

#### `/audit`

Perform a complete project audit.

Analyze:

```text
ARCHITECTURE
CODE QUALITY
SECURITY
PERFORMANCE
DATABASE
API DESIGN
UX
ACCESSIBILITY
SCALABILITY
TECHNICAL DEBT
DEPENDENCIES
```

Assign each issue:

```text
CRITICAL
HIGH
MEDIUM
LOW
```

Generate a prioritized improvement roadmap.

Do not modify code.

---

#### `/status`

Analyze the current state of the project.

Inspect:

- Git status
- Recent changes
- Broken functionality
- TODO comments
- Technical debt
- Missing tests
- Potential issues

Output:

```text
PROJECT STATUS

CURRENT WORK

RECENT CHANGES

OPEN ISSUES

TECHNICAL DEBT

RECOMMENDED NEXT ACTION
```

---

# PRODUCT DEVELOPMENT COMMANDS

Create:

```text
.claude/commands/product/
├── prd.md
├── feature.md
├── user-flow.md
├── requirements.md
└── roadmap.md
```

## `/product:prd`

Generate a complete Product Requirements Document.

Include:

```text
PRODUCT OVERVIEW
PROBLEM
SOLUTION
TARGET USERS
USER ROLES
CORE FEATURES
USER FLOWS
FUNCTIONAL REQUIREMENTS
NON-FUNCTIONAL REQUIREMENTS
DATABASE REQUIREMENTS
API REQUIREMENTS
UI REQUIREMENTS
EDGE CASES
SECURITY
ANALYTICS
ADMIN DASHBOARD
AUTOMATIONS
ACCEPTANCE CRITERIA
DEVELOPMENT PHASES
```

The PRD must be specific enough for an AI coding agent to implement.

---

## `/product:feature`

Convert an idea into a fully specified feature.

Include:

- Feature name
- Purpose
- User problem
- User flow
- UI requirements
- Backend requirements
- Database requirements
- API requirements
- Edge cases
- Acceptance criteria

---

## `/product:user-flow`

Design a complete user flow.

Include:

```text
ENTRY POINT
USER ACTIONS
SYSTEM RESPONSES
DECISION POINTS
ERROR STATES
EMPTY STATES
SUCCESS STATE
EXIT POINTS
```

Represent the flow using clear text diagrams where useful.

---

## `/product:requirements`

Extract and organize requirements from:

$ARGUMENTS

Separate:

- Functional requirements
- Non-functional requirements
- Technical requirements
- UX requirements
- Security requirements
- Unknown requirements

Identify ambiguities and assumptions.

---

## `/product:roadmap`

Create a prioritized development roadmap.

Divide into:

```text
MVP
PHASE 2
PHASE 3
FUTURE
```

Prioritize based on:

- User value
- Business value
- Technical dependencies
- Development complexity

---

# DATABASE COMMANDS

Create:

```text
.claude/commands/database/
├── schema.md
├── migration.md
├── optimize.md
└── inspect.md
```

## `/database:schema`

Analyze or design a database schema.

Include:

- Tables
- Fields
- Types
- Primary keys
- Foreign keys
- Relationships
- Indexes
- Constraints

Check normalization and scalability.

---

## `/database:migration`

Create a safe database migration.

Process:

1. Inspect current schema.
2. Identify dependencies.
3. Create migration.
4. Consider existing data.
5. Consider rollback strategy.
6. Check indexes.
7. Check constraints.

Never create destructive migrations without explicit warning.

---

## `/database:optimize`

Analyze database performance.

Look for:

- Missing indexes
- N+1 queries
- Slow queries
- Over-fetching
- Bad relationships
- Unnecessary joins

Provide improvements ranked by impact.

---

## `/database:inspect`

Inspect the database architecture.

Report:

- Tables
- Relationships
- Potential problems
- Orphaned data risks
- Missing constraints
- Security risks

---

# API COMMANDS

Create:

```text
.claude/commands/api/
├── endpoint.md
├── review.md
├── security.md
└── docs.md
```

## `/api:endpoint`

Design and implement an API endpoint.

Include:

- Route
- HTTP method
- Authentication
- Authorization
- Input validation
- Business logic
- Response schema
- Error responses

Follow existing API conventions.

---

## `/api:review`

Review API architecture.

Analyze:

- REST conventions
- Validation
- Authentication
- Authorization
- Error handling
- Versioning
- Rate limiting
- Performance

---

## `/api:security`

Audit API security.

Check:

- Authentication bypass
- Authorization issues
- IDOR
- Input validation
- SQL injection
- Rate limiting
- Sensitive data exposure
- CORS
- Secrets

---

## `/api:docs`

Generate API documentation from existing routes.

Document:

- Endpoint
- Method
- Parameters
- Request body
- Response
- Errors
- Authentication

---

# FRONTEND COMMANDS

Create:

```text
.claude/commands/frontend/
├── component.md
├── page.md
├── ui-review.md
├── responsive.md
└── accessibility.md
```

## `/frontend:component`

Create or improve a reusable component.

Requirements:

- Follow existing design system.
- Reuse patterns.
- Support responsive design.
- Handle loading states.
- Handle empty states.
- Handle errors.
- Maintain accessibility.

---

## `/frontend:page`

Design and implement a complete page.

Consider:

```text
PAGE STRUCTURE
NAVIGATION
USER FLOW
LOADING STATES
EMPTY STATES
ERROR STATES
RESPONSIVE DESIGN
ACCESSIBILITY
SEO
```

---

## `/frontend:ui-review`

Review UI/UX quality.

Analyze:

- Visual hierarchy
- Consistency
- Spacing
- Typography
- Interactions
- Feedback
- Empty states
- Loading states
- Error states
- Mobile experience

Do not modify code unless requested.

---

## `/frontend:responsive`

Audit and improve responsive behavior.

Test conceptually for:

```text
MOBILE
TABLET
LAPTOP
DESKTOP
LARGE SCREENS
```

Identify layout failures and usability issues.

---

## `/frontend:accessibility`

Audit accessibility.

Check:

- Semantic HTML
- Keyboard navigation
- Focus states
- ARIA
- Contrast
- Screen readers
- Forms
- Error messages

---

# SECURITY COMMANDS

Create:

```text
.claude/commands/security/
├── audit.md
├── auth.md
├── permissions.md
└── secrets.md
```

## `/security:audit`

Perform a complete security audit.

Check:

```text
AUTHENTICATION
AUTHORIZATION
DATABASE SECURITY
API SECURITY
INPUT VALIDATION
XSS
CSRF
SQL INJECTION
IDOR
SECRETS
ENVIRONMENT VARIABLES
DEPENDENCIES
RATE LIMITING
```

Rank vulnerabilities by severity.

Do not exploit vulnerabilities.

---

## `/security:auth`

Review authentication implementation.

Check:

- Login
- Logout
- Sessions
- Tokens
- Password handling
- OAuth
- Session expiration
- Account recovery

---

## `/security:permissions`

Review authorization and permissions.

Check:

- Role-based access
- Resource ownership
- Privilege escalation
- Admin protection
- API authorization

---

## `/security:secrets`

Inspect for exposed secrets.

Check:

- Environment variables
- API keys
- Hardcoded credentials
- Client-side exposure
- Git history indicators

Never display sensitive secrets in output.

---

# PERFORMANCE COMMANDS

Create:

```text
.claude/commands/performance/
├── audit.md
├── frontend.md
├── backend.md
└── database.md
```

## `/performance:audit`

Perform a complete performance analysis.

Check:

- Frontend rendering
- Bundle size
- Images
- API performance
- Database queries
- Caching
- Server performance

Prioritize improvements by:

```text
HIGH IMPACT
MEDIUM IMPACT
LOW IMPACT
```

---

# GIT & DEPLOYMENT COMMANDS

Create:

```text
.claude/commands/git/
├── commit.md
├── pr.md
├── cleanup.md
└── release.md

.claude/commands/deploy/
├── check.md
├── production.md
└── rollback.md
```

## `/git:commit`

Analyze current changes and create a meaningful commit.

Process:

1. Inspect git diff.
2. Group related changes.
3. Identify breaking changes.
4. Generate a conventional commit message.
5. Do not commit unrelated files.

---

## `/git:pr`

Prepare a Pull Request.

Generate:

```text
TITLE
SUMMARY
CHANGES
TESTING
BREAKING CHANGES
SCREENSHOTS REQUIRED
REVIEW NOTES
```

---

## `/git:cleanup`

Analyze the repository for:

- Unused files
- Dead code
- Debug code
- Console logs
- Temporary files
- Unused dependencies

Do not delete anything without confirmation.

---

## `/deploy:check`

Run a production readiness checklist.

Check:

```text
ENVIRONMENT VARIABLES
BUILD
TYPE CHECKING
TESTS
DATABASE MIGRATIONS
SECURITY
PERFORMANCE
ERROR HANDLING
LOGGING
```

Report blockers.

---

## `/deploy:production`

Prepare the project for production deployment.

Never deploy automatically unless explicitly instructed.

Create a deployment plan and verify readiness.

---

# RESEARCH COMMANDS

Create:

```text
.claude/commands/research/
├── technology.md
├── repository.md
├── compare.md
└── integration.md
```

## `/research:technology`

Research a technology before using it.

Analyze:

- Purpose
- Architecture
- Advantages
- Disadvantages
- Alternatives
- Community
- Maintenance
- Compatibility
- Integration complexity

Provide a recommendation.

---

## `/research:repository`

Analyze a GitHub repository.

Inspect:

- Architecture
- Technology
- Dependencies
- Code quality
- Maintenance
- Documentation
- Security indicators
- Integration possibilities

---

## `/research:compare`

Compare technologies or approaches.

Use a decision matrix including:

```text
FEATURES
PERFORMANCE
DEVELOPER EXPERIENCE
COMMUNITY
COST
SCALABILITY
SECURITY
MAINTENANCE
```

Provide a recommendation based on the project context.

---

## `/research:integration`

Research how to integrate:

$ARGUMENTS

with the current project.

Analyze:

- Architecture compatibility
- Dependencies
- Implementation steps
- Risks
- Alternatives

---

# AI DEVELOPMENT COMMANDS

Create:

```text
.claude/commands/ai/
├── feature.md
├── agent.md
├── prompt.md
├── rag.md
└── workflow.md
```

## `/ai:feature`

Design an AI-powered feature.

Define:

- User interaction
- AI role
- Input
- Context
- Prompt strategy
- Tools
- Output
- Validation
- Error handling
- Cost considerations
- Fallback behavior

Avoid adding AI where deterministic logic is better.

---

## `/ai:agent`

Design an AI agent.

Define:

```text
AGENT ROLE
OBJECTIVE
SYSTEM PROMPT
TOOLS
MEMORY
KNOWLEDGE
WORKFLOW
DECISION MAKING
GUARDRAILS
INPUT
OUTPUT
FAILURE HANDLING
```

---

## `/ai:prompt`

Create or improve a production system prompt.

Structure:

```text
ROLE
OBJECTIVE
CONTEXT
CAPABILITIES
TOOLS
RULES
WORKFLOW
OUTPUT FORMAT
ERROR HANDLING
GUARDRAILS
```

---

## `/ai:rag`

Design a RAG system.

Analyze:

- Knowledge sources
- Document ingestion
- Chunking
- Embeddings
- Vector database
- Retrieval
- Reranking
- Context generation
- Evaluation

---

## `/ai:workflow`

Design an AI automation workflow.

Define:

```text
TRIGGER
INPUT
PROCESSING
AI STEPS
TOOLS
DECISION POINTS
OUTPUT
ERROR HANDLING
MONITORING
```

---

# CODE QUALITY COMMANDS

Create:

```text
.claude/commands/quality/
├── types.md
├── dead-code.md
├── dependencies.md
└── standards.md
```

---

# IMPORTANT: CREATE THE HELP COMMAND

Create:

```text
.claude/commands/help.md
```

The `/help` command must dynamically inspect:

```text
.claude/commands/
```

Recursively.

It must display every available command.

Format:

# CLAUDE DEVELOPMENT COMMAND CENTER

## Core Development

| Command    | Description                    | Example                        |
| ---------- | ------------------------------ | ------------------------------ |
| `/analyze` | Analyze code without modifying | `/analyze authentication flow` |
| `/plan`    | Create implementation plan     | `/plan add notifications`      |
| `/build`   | Implement a feature            | `/build user notifications`    |
| `/fix`     | Debug an issue                 | `/fix login redirect bug`      |
| `/test`    | Create tests                   | `/test authentication system`  |

## Product

...

## Database

...

## API

...

## Frontend

...

## Security

...

## Performance

...

## Git

...

## Deployment

...

## Research

...

## AI

...

## Quality

---

# HOW TO USE COMMANDS

Explain the recommended workflow:

```text
1. /analyze
        ↓
2. /plan
        ↓
3. /build
        ↓
4. /test
        ↓
5. /review
        ↓
6. /security:audit
        ↓
7. /deploy:check
```

The help command must inspect the actual command files so the list remains current when new commands are added.

---

# CREATE COMMAND METADATA

Every generated command file should start with a short description.

Example:

```markdown
---
description: Analyze code architecture without making changes
---

# Analyze
```

Use descriptions that make it easy for `/help` to extract and display command information.

---

# CREATE A PROJECT CLAUDE.md

If no root `CLAUDE.md` exists, create one.

It should include:

```markdown
# Project Development Rules

## General Principles

- Understand before modifying.
- Prefer simple solutions.
- Do not over-engineer.
- Reuse existing architecture.
- Avoid unnecessary dependencies.
- Maintain backwards compatibility.

## Before Coding

Always:

1. Inspect relevant files.
2. Understand existing patterns.
3. Identify dependencies.
4. Consider side effects.

## After Coding

Always:

1. Check types.
2. Check imports.
3. Remove dead code.
4. Check error handling.
5. Consider security.
6. Consider responsive behavior.

## Safety

- Never expose secrets.
- Never commit credentials.
- Never delete important files without confirmation.
- Never perform destructive database operations without warning.

## Architecture

Follow existing project conventions unless explicitly instructed to refactor them.
```

---

# FINAL OUTPUT

After creating the command system:

1. List all files created.
2. Show the command tree.
3. Explain the recommended workflow.
4. Explain how to add new commands.
5. Tell the user to run `/help`.

Do not merely describe the files.

Actually create them in the repository.
