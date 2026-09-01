# Landing Page Refactor Plan

## Objective

Reposition the VORA public landing page from an AI/SaaS-first experience to a human-led restaurant audit and consulting brand, in line with the PRD. The page should make the visitor feel that VORA is a professional consulting firm with real restaurant experience, not a generic AI dashboard product.

## Strategic Goal

Primary perception after visiting the page:

> VORA has experienced professionals who understand restaurants and can help owners discover problems and opportunities they may not be able to see themselves.

AI should be framed as a supporting tool used by the professionals, not the product being sold.

---

## Current State to Fix

The current landing page in `app/page.tsx` is built around:

- AI-first messaging
- dashboard-heavy hero visual
- score-centric language
- generic SaaS positioning
- CTA flow aimed at the VORA Check experience instead of a professional review conversation

This conflicts with the PRD, which requires a premium restaurant consulting positioning with expert credibility and real operational understanding.

---

## Target Positioning

VORA should communicate the following hierarchy:

1. Human expertise
2. Restaurant industry knowledge
3. Structured audit methodology
4. Advanced technology as support
5. Clear recommendations and action plans

The messaging should shift from:

- AI + analytics + platform

To:

- expertise + operational diagnosis + independent perspective + practical recommendations

---

## Recommended Page Structure

The landing page should be rebuilt in this order:

1. Hero
2. Owner pain points
3. External perspective
4. Human expertise / auditors
5. Experience vs data
6. What our auditors investigate
7. The VORA method
8. What the client receives
9. VORA Intelligence as assistance
10. Example audit findings
11. Initial review CTA
12. FAQ
13. Final authority statement
14. Final CTA
15. Footer

---

## Phase 1 — Positioning and Messaging Rewrite

### Goal

Replace all AI-centric copy with restaurant consulting language and expert-led credibility.

### Tasks

- Rewrite the hero to lead with: “Usted conoce su restaurante. Nosotros podemos ayudarle a verlo desde otra perspectiva.”
- Update the eyebrow to: “AUDITORÍA Y CONSULTORÍA PARA RESTAURANTES”
- Replace dashboard-centric supporting copy with operational pain language
- Emphasize the owner’s experience, blind spots, profitability issues, labor friction, cost leakage, inefficiencies, and decision overload
- Remove or de-emphasize generic AI/engine/platform terminology
- Position VORA Intelligence as an internal tool that supports analysis, not the product

### Acceptance Criteria

- The first screen communicates human expertise before technology
- The hero no longer leads with dashboard visuals or score language
- The copy speaks directly to restaurant owners and operators
- AI appears only after the professional consulting value proposition is established

---

## Phase 2 — Information Architecture and Navigation

### Goal

Create a structured visitor journey that maps to the PRD’s conversion funnel.

### Proposed navigation

- Nuestro Enfoque
- Qué Auditamos
- Nuestros Expertos
- El Método VORA
- Resultados
- Solicitar Revisión

### Tasks

- Replace the current nav labels and anchor targets
- Create anchors for the new sections and information flow
- Keep the primary CTA as “Solicitar una revisión inicial” or “Hablar con un experto”
- Ensure the CTA points to the existing lead funnel and does not break current conversion paths
- Retain a sticky CTA for desktop and bottom CTA on mobile

### Acceptance Criteria

- Navigation reflects audit/consulting positioning instead of product features
- Visitors can move through the story in the intended sequence
- The CTA path remains consistent with current lead capture and review flow

---

## Phase 3 — Section-by-Section Content Buildout

### 1) Hero section

Requirements:

- Human professional/restaurant context, not dashboard-driven design
- Strong headline + short supporting text
- Two CTA buttons
- Trust indicators

Suggested visual direction:

- premium dark background
- subtle neon accents
- professional portrait or operational illustration concept
- layered composition with auditor + owner + operations context, not a main scoreboard

### 2) Owner pain points section

Requirements:

- emotional recognition
- 6 cards representing common restaurant pain patterns
- direct and relatable language

Cards should cover:

- profitability despite volume
- rising costs without clarity
- always reacting to operational issues
- too many variables, no clear starting point
- hard-working teams without consistency
- information without actionable interpretation

### 3) External perspective section

Requirements:

- explain why an external auditor adds value
- normalize blind spots
- avoid implying owner incompetence

Key ideas:

- “A veces no necesitas trabajar más. Necesitas una nueva perspectiva.”
- “Una mirada externa puede revelar oportunidades que la rutina ha dejado de mostrar.”

### 4) Human expertise / auditors section

Requirements:

- strongest credibility block on the page
- prioritize real people and industry background
- add professional cards with name, role, years in hospitality, specializations, background, selected experience, short philosophy

Important rule:

- Use real credentials only
- Do not invent statistics or fake experience

### 5) Experience vs data section

Requirements:

- explain why numbers alone are not enough
- show a linear flow from data → signal → superficial answer → real investigation → root cause → correct action

Tone:

- calm, analytical, professional
- not hyper-technical

### 6) Audit areas section

Requirements:

- list the sectors VORA investigates
- show real operational and financial issues

Include:

- rentabilidad
- costos y control
- operaciones
- equipos y productividad
- menú y rentabilidad
- experiencia del cliente

### 7) VORA method section

Requirements:

- turn the process into a structured methodology
- 6 steps: escuchar, observar, investigar, priorizar, recomendar, acompañar

This section is important for building trust and process clarity.

### 8) What the client receives

Requirements:

- make the output tangible
- list executive diagnosis, prioritized findings, root-cause analysis, impact map, action plan

### 9) VORA Intelligence section

Requirements:

- visually and semantically secondary
- only introduced after the human value proposition is clear
- clarify that it assists the audit process, not replace the auditor

Core message:

- The technology helps investigate
- The auditor interprets
- The expert recommends

### 10) Example findings

Requirements:

- show illustrative operational scenarios
- make it easy for owners to imagine VORA inside their own restaurant
- use realistic examples without implying a specific business model

### 11) Initial review CTA

Requirements:

- low-friction conversion point
- framed as beginning of a professional conversation
- should not look like an AI tool or automated report

Suggested CTA:

- “Solicitar una revisión inicial”

### 12) FAQ

Requirements:

- answer the most likely objections
- reinforce that VORA is a professional audit and consulting firm
- clarify the role of AI without centering it

### 13) Final authority statement + final CTA

Requirements:

- full-width emotional closing section
- reinforce the key position: external expertise adds value
- final CTA should be highly visible and conversion-oriented

---

## Phase 4 — Visual Redesign

### Goal

Retain the existing dark premium aesthetic while removing generic SaaS cues.

### Keep

- dark background
- deep navy and black base
- blue, violet, green accents
- subtle glow effects
- premium feel

### Remove or minimize

- giant dashboard screenshots as primary hero illustration
- futuristic AI brain imagery
- neural-network visual language
- generic SaaS floating cards
- excessive technical gloss

### Favor instead

- auditor/consultant imagery
- real restaurant scenarios
- operational documents and reports
- professional conversations
- analysis and diagnosis themes
- premium hospitality consulting visual style

### CSS direction

In `app/landing.css`, adjust the visual system to shift from:

- dashboard-heavy UI cards
- engineering/AI motifs
- numeric score aesthetic

To:

- editorial consulting layout
- human-centered storytelling
- structured content blocks
- card-based but less technical presentation

---

## Phase 5 — Interaction and UX Refinements

### Tasks

- Add subtle fade-up and stagger animation to sections
- Use smooth scroll behavior for anchor navigation
- Keep mobile-first design with stacked sections and large CTA targets
- Ensure no horizontal overflow on small screens
- Keep content readable with large typography and generous whitespace
- Add sticky bottom CTA on mobile and persistent CTA on desktop

### Mobile-first requirements

- single-column layout
- large headings
- stacked pain point cards
- easy-to-scan auditor cards
- large buttons without clutter
- no dashboard-first composition

---

## Phase 6 — Technical Implementation Plan

### Files likely to change

- `app/page.tsx` — complete landing page content and section architecture
- `app/landing.css` — visual system, layout, typography, spacing, buttons, cards, responsive behavior

### Additional considerations

- Keep existing CTA destinations aligned with the current lead funnel
- Reuse existing components where useful, but do not force a dashboard-style design onto the page
- Avoid adding generic AI claims that conflict with the PRD
- Maintain page speed and simplicity

---

## Suggested Delivery Sequence

### Sprint 1 — Strategy + copy

- Write all new section copy and CTA language
- Finalize positioning hierarchy and proof points
- Confirm the professional authority language

### Sprint 2 — Layout + styles

- Rebuild sections in `app/page.tsx`
- Create the new visual hierarchy in `app/landing.css`
- Replace the current hero and dashboard emphasis

### Sprint 3 — QA + conversion polish

- Test mobile, CTA states, keyboard navigation, anchor links, contrast
- Validate that the page reads as a consulting brand, not a SaaS product
- Final conversion and copy review

---

## Success Criteria

The redesign is successful when:

- Visitors immediately understand VORA is a restaurant audit and consulting firm
- Real experts are central to the page narrative
- The process feels structured and professional
- AI reads as an internal support tool, not the main offer
- They understand that VORA helps uncover business issues and opportunities they may be missing
- The CTA leads to a review conversation rather than a generic lead capture experience

---

## Final Recommendation

This is not just a visual refresh. It is a positioning redesign. The page must be rebuilt around the idea that VORA helps restaurant owners see their business from a new perspective through human expertise, operational knowledge, and a disciplined audit process.

The most important product message is simple:

> VORA is a professional restaurant audit and consulting firm. AI supports the work, but the experience, judgment, and methodology are what create value.
