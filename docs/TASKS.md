# ReviewTap V1 Task Plan

## 1. Purpose

This document tracks meaningful ReviewTap implementation work and its current state.

It answers:

> What should be built next, what depends on what, and what work remains?

This is not:

- the product specification,
- the architecture document,
- a chronological development diary,
- or a replacement for GitHub issues if the project later adopts them.

Tasks should remain large enough to represent meaningful engineering work but small enough to plan, build, verify, and review coherently.

The task plan should reflect the current accepted:

- product requirements,
- architecture,
- and durable project decisions.

Do not add speculative implementation work merely because a future feature is mentioned elsewhere.

---

## 2. Task Status

Use the following statuses.

### NOT STARTED

Work has not begun.

### PLANNING

The task is being analyzed through `icm/01_plan/`.

### READY TO BUILD

Planning is sufficiently complete and implementation may begin.

### BUILDING

Implementation is in progress.

### READY TO VERIFY

Implementation exists and Build has completed its initial checks.

### VERIFYING

The task is being evaluated through `icm/03_verify/`.

### BLOCKED

The task cannot continue until a dependency, decision, access requirement, or defect is resolved.

### COMPLETE

The required behavior has been sufficiently implemented and verified.

Do not mark work COMPLETE merely because code was written.

---

## 3. Task Design Principles

Each task should represent one coherent engineering objective.

Tasks should:

- have a clear goal,
- identify meaningful dependencies,
- remain within V1 scope,
- be independently understandable,
- and have observable completion evidence when practical.

A task does not automatically require a formal Plan artifact.

Use the Plan stage when the task requires meaningful:

- design,
- decomposition,
- architectural reasoning,
- schema reasoning,
- security reasoning,
- or acceptance-criteria definition

before implementation.

Do not expand a task simply because adjacent improvements become visible during Build.

Create a new task when additional work represents a separate meaningful objective.

---

## 4. V1 Development Order

ReviewTap V1 should be developed in the following broad sequence:

1. Project foundation
2. Database foundation
3. NFC card entry and interaction sessions
4. Customer feedback experience
5. Google Review handoff and feedback reuse
6. Authentication and business authorization
7. Owner dashboard
8. Business and card management
9. Analytics
10. Product refinement and deployment

This sequence may change when implementation reveals a better dependency order.

Task dependencies are more important than blindly following phase numbers.

Meaningful changes to the development order should be intentional rather than accidental.

---

# PHASE 1 — Project Foundation

## RT-001 — Initialize Next.js Application

**Status:** NOT STARTED

### Goal

Create the real ReviewTap application using the approved V1 stack.

### Expected Work

- initialize Next.js,
- use TypeScript,
- configure Tailwind CSS,
- preserve the existing ReviewTap documentation and ICM structure,
- confirm local development works,
- confirm the production build works,
- avoid introducing unnecessary dependencies.

### Learning Focus

- Node.js and npm,
- Next.js project structure,
- App Router,
- package management,
- development server,
- production build process.

### Depends On

None.

### Completion Evidence

- application runs locally,
- initial page renders,
- TypeScript is functioning,
- Tailwind is functioning,
- production build succeeds,
- existing documentation and ICM files remain intact.

---

## RT-002 — Establish Application Folder Conventions

**Status:** NOT STARTED

### Goal

Establish the initial code organization using only directories the application actually needs.

### Expected Areas

Potential areas may include:

- `app/`
- `components/`
- `lib/`
- shared types when justified

Do not create architectural layers merely because they appear as examples in `ARCHITECTURE.md`.

### Learning Focus

- separation of concerns,
- route organization,
- reusable modules,
- avoiding premature abstraction.

### Depends On

RT-001

---

## RT-003 — Configure Environment and Secret Handling

**Status:** NOT STARTED

### Goal

Establish safe local environment configuration before Supabase credentials or other secrets are introduced.

### Expected Work

- confirm `.gitignore` behavior,
- define environment-file conventions,
- confirm secrets cannot accidentally enter Git,
- document required environment variables without storing real values,
- distinguish browser-safe configuration from server-only secrets.

### Learning Focus

- environment variables,
- public vs server-only configuration,
- Git ignore behavior,
- credential safety.

### Depends On

RT-001

---

# PHASE 2 — Database Foundation

## RT-010 — Create Supabase Project and Application Connection

**Status:** NOT STARTED

### Goal

Connect ReviewTap to its Supabase backend.

### Expected Work

- create or configure the Supabase project,
- add required local environment values,
- establish appropriate application-side Supabase clients,
- confirm a safe application-to-database connection.

### Learning Focus

- hosted PostgreSQL,
- application configuration,
- database connections,
- server/client database boundaries.

### Depends On

RT-003

---

## RT-011 — Design V1 Database Schema

**Status:** NOT STARTED

### Goal

Translate the accepted product and architecture concepts into an explicit relational schema.

### Expected Entities

At minimum evaluate:

- businesses,
- cards,
- interaction sessions,
- feedback submissions,
- business memberships.

### Planning Must Define

- primary keys,
- public identifiers,
- foreign keys,
- constraints,
- timestamps,
- rating representation,
- optional customer contact fields,
- follow-up and consent fields,
- card and business state fields,
- interaction-session state,
- Google Review click representation,
- duplicate feedback-submission behavior,
- relationship deletion behavior,
- appropriate indexes.

### Important Model Requirements

The schema must support an interaction session with:

- no feedback submission and no Google Review click,
- feedback submission and no Google Review click,
- no feedback submission and a Google Review click,
- both feedback submission and a Google Review click.

A Google Review click must not require a feedback-submission record to exist.

V1 does not require a separate persistent customer or CRM entity.

### Learning Focus

- relational modeling,
- primary and foreign keys,
- normalization,
- constraints,
- indexes,
- optional relationships,
- database integrity.

### Depends On

RT-010

### Requires Plan Stage

Yes.

---

## RT-012 — Implement Database Schema

**Status:** NOT STARTED

### Goal

Create the approved V1 schema in Supabase.

### Expected Work

- create required tables,
- create relationships,
- create constraints,
- create justified indexes,
- establish initial database security configuration,
- confirm interaction sessions and feedback submissions remain separate concepts.

### Depends On

RT-011

### Completion Evidence

- schema matches the accepted design,
- required relationships behave correctly,
- invalid relationships are prevented where appropriate,
- targeted verification passes.

---

## RT-013 — Seed Safe Development Data

**Status:** NOT STARTED

### Goal

Create controlled development records for testing ReviewTap flows.

### Example Data

- sample business,
- sample card,
- safe development Google Review destination,
- other non-sensitive test data required for card-entry testing.

Do not use real customer information.

### Depends On

RT-012

---

# PHASE 3 — NFC Card Entry and Interaction Sessions

## RT-020 — Implement Public Card Resolution

**Status:** NOT STARTED

### Goal

Resolve a public NFC card identifier to the correct active ReviewTap card and business.

### Conceptual Route

`/r/[cardId]`

### Required Behavior

- known active card resolves correctly,
- unknown card fails deliberately,
- inactive card fails deliberately,
- missing or invalid business state is handled safely,
- browser-controlled data does not determine protected business configuration.

### Learning Focus

- dynamic Next.js routes,
- server-side data access,
- URL parameters,
- validation,
- public vs internal identifiers.

### Depends On

RT-012
RT-013

### Requires Plan Stage

Yes.

---

## RT-021 — Create Interaction Session

**Status:** NOT STARTED

### Goal

Create one interaction session when a valid ReviewTap card begins a customer experience.

### Required Behavior

Associate the interaction with:

- card,
- business,
- start time,
- safe public session identity.

### Important Requirements

Card identity and interaction identity must remain separate.

Creating the interaction must not require a feedback submission.

The interaction must later be able to support:

- optional feedback submission,
- Google Review click activity,
- or both.

### Depends On

RT-020

---

## RT-022 — Route Valid Card Into Customer Experience

**Status:** NOT STARTED

### Goal

Take a valid NFC card interaction from card entry into the corresponding ReviewTap customer session.

### Conceptual Flow

`/r/[cardId]`
→ interaction-session creation
→ `/feedback/[sessionToken]`

### Required Behavior

- the correct session is used,
- the correct business experience is loaded,
- invalid session state is not treated as valid.

### Depends On

RT-021

---

## RT-023 — Build Invalid / Unavailable Card Experience

**Status:** NOT STARTED

### Goal

Provide deliberate customer-facing behavior when a card cannot be used.

### Cases

- unknown card,
- inactive card,
- missing business,
- invalid business configuration,
- other unrecoverable card-entry failures.

### Required Behavior

Invalid card entry must not create a successful interaction session.

### Depends On

RT-020

---

# PHASE 4 — Customer Feedback Experience

## RT-030 — Build Mobile-First Customer Experience Shell

**Status:** NOT STARTED

### Goal

Create the reusable customer-facing ReviewTap experience for a valid interaction session.

### Initial UI

- business identity,
- clear feedback prompt,
- mobile-first layout,
- loading state,
- invalid-session/error state,
- appropriate location for the Google Review action.

### Important Requirement

The UI architecture must allow Google Review access to exist independently from feedback submission.

### Learning Focus

- React components,
- responsive design,
- Tailwind,
- server vs client components.

### Depends On

RT-022

---

## RT-031 — Build Interactive Internal Rating Control

**Status:** NOT STARTED

### Goal

Allow the customer to select an internal ReviewTap 1–5 rating.

### Requirements

- touch-friendly,
- accessible,
- clearly selected state,
- reusable where practical.

### Important Product Boundary

The ReviewTap internal rating must remain separate from any Google star rating.

Selecting an internal rating must not automatically determine a Google rating.

### Learning Focus

- React state,
- events,
- controlled interactions,
- accessibility.

### Depends On

RT-030

---

## RT-032 — Build Feedback Form

**Status:** NOT STARTED

### Goal

Collect the private customer feedback required by V1.

### Inputs

Initially:

- internal rating,
- optional written comment,
- optional name,
- optional email,
- optional phone.

### Requirements

- optional inputs are clearly identified,
- the form does not imply that private feedback will automatically become public,
- customer-authored written feedback remains available for later reuse when appropriate.

### Learning Focus

- forms,
- controlled or uncontrolled inputs as appropriate,
- form submission,
- client validation,
- TypeScript form data.

### Depends On

RT-031

---

## RT-033 — Add Follow-Up and Consent Controls

**Status:** NOT STARTED

### Goal

Represent customer communication choices explicitly.

### Requirements

Distinguish:

- feedback follow-up permission,
- marketing consent when actually collected.

Do not infer either permission solely from the presence of a phone number or email address.

Do not collect consent state for functionality that does not yet require it.

### Depends On

RT-032

---

## RT-034 — Implement Server-Side Feedback Validation

**Status:** NOT STARTED

### Goal

Validate private ReviewTap feedback authoritatively before persistence.

### Validate

- interaction session,
- internal rating,
- written-comment limits,
- optional contact fields,
- applicable consent data,
- duplicate-submission behavior as defined by the schema and plan.

### Learning Focus

- trust boundaries,
- server validation,
- defensive application design.

### Depends On

RT-032
RT-033

---

## RT-035 — Persist Feedback Submission

**Status:** NOT STARTED

### Goal

Store valid private customer feedback and associate it with the correct interaction, business, and card.

### Required Behavior

- valid submission is stored,
- interaction association is correct,
- one interaction normally produces at most one completed V1 feedback submission,
- defined duplicate behavior is respected,
- failures do not produce false success UI,
- Google Review access does not depend on successful feedback submission.

### Depends On

RT-034

---

## RT-036 — Build Feedback Success Experience

**Status:** NOT STARTED

### Goal

Clearly confirm successful private ReviewTap feedback submission and provide appropriate next actions.

### Required Behavior

- successful private submission is clearly communicated,
- the customer understands that ReviewTap feedback is not automatically a public Google Review,
- the Google Review opportunity remains available,
- written feedback can support the later copy-and-review action.

### Depends On

RT-035

---

# PHASE 5 — Google Review Handoff and Feedback Reuse

## RT-040 — Implement Google Review Handoff Route

**Status:** NOT STARTED

### Goal

Implement the ReviewTap-controlled Google Review handoff.

### Conceptual Route

`/go/[sessionToken]`

### Required Behavior

- validate the interaction session,
- resolve the associated business,
- retrieve the trusted configured Google Review destination,
- record the ReviewTap-observable Google Review click,
- redirect to the configured destination.

### Product Requirements

The route must work whether or not ReviewTap feedback was submitted.

A feedback-submission record must not be required.

### Security Requirement

The browser must not provide an arbitrary redirect destination.

The destination must come from trusted business configuration.

### Analytics Boundary

Record:

`Google Review click`

Do not claim:

`Google Review received`

without reliable evidence of publication.

### Depends On

RT-021
RT-012

### Requires Plan Stage

Yes.

---

## RT-041 — Add Always-Available Google Review Action

**Status:** NOT STARTED

### Goal

Allow customers to deliberately access the business's Google Review experience from the ReviewTap customer experience.

### Required Behavior

The Google Review action must remain available:

- before or without ReviewTap feedback submission,
- after ReviewTap feedback submission,
- for low internal ratings,
- for high internal ratings,
- and regardless of positive or negative written sentiment.

### Product Boundary

Presentation may vary.

Access may not be selectively suppressed.

The ReviewTap internal rating must not automatically populate or determine the Google star rating.

### Depends On

RT-030
RT-040

---

## RT-042 — Copy Customer-Authored Feedback and Continue to Google

**Status:** NOT STARTED

### Goal

Reduce repeated typing for customers who already submitted written ReviewTap feedback while preserving customer control over the public Google Review.

### Conceptual Action

`Copy my feedback & review on Google`

### Required Behavior

When customer-authored written feedback exists:

- the customer can deliberately request to copy their own comment,
- the application attempts to copy the exact customer-authored text,
- successful copying is communicated clearly,
- failed or unavailable clipboard access is communicated honestly,
- Google Review access continues even if copying fails,
- the action proceeds through the trusted ReviewTap Google handoff.

### Must Not

ReviewTap must not:

- automatically select a Google star rating,
- automatically submit a Google Review,
- silently publish private ReviewTap feedback,
- impersonate the customer,
- or automatically rewrite the customer's feedback into a more positive public review.

### Customer Control

The customer remains responsible for:

- deciding whether to paste the copied text,
- editing or discarding the text,
- choosing their Google star rating,
- and manually publishing the Google Review.

### Learning Focus

- browser Clipboard API,
- explicit user gestures,
- client-side capability handling,
- success/failure UI,
- graceful fallback behavior.

### Depends On

RT-035
RT-041

---

# PHASE 6 — Authentication and Business Authorization

## RT-050 — Configure Supabase Authentication

**Status:** NOT STARTED

### Goal

Provide secure authentication for protected ReviewTap management functionality.

### Required Boundary

Authentication answers:

> Who is this user?

It does not by itself determine which businesses the user may manage.

### Learning Focus

- authentication,
- sessions,
- protected application routes.

### Depends On

RT-010

---

## RT-051 — Implement Business Membership Authorization

**Status:** NOT STARTED

### Goal

Associate authenticated users with businesses they are permitted to manage.

### Required Security Behavior

A logged-in user must not gain access to another business merely by changing:

- URL,
- business ID,
- request parameter,
- or client-side state.

### Learning Focus

- authentication vs authorization,
- ownership relationships,
- trusted server-side access control.

### Depends On

RT-050
RT-012

### Requires Plan Stage

Yes.

---

## RT-052 — Configure Required Database Access Policies

**Status:** NOT STARTED

### Goal

Apply appropriate Supabase Row Level Security and trusted server-side access boundaries.

### Required Behavior

- protected business data is scoped correctly,
- public customer capabilities remain narrow,
- elevated credentials remain server-only if they are required.

### Depends On

RT-051

### Requires Plan Stage

Yes.

---

# PHASE 7 — Owner Dashboard

## RT-060 — Build Protected Dashboard Shell

**Status:** NOT STARTED

### Goal

Create the authenticated owner dashboard foundation.

### Expected UI

- navigation,
- responsive layout,
- loading states,
- authenticated business context,
- unauthorized-state handling.

### Depends On

RT-050
RT-051

---

## RT-061 — Build Dashboard Overview

**Status:** NOT STARTED

### Goal

Provide a useful high-level business engagement summary.

### Initial Metrics

Potentially:

- total interaction sessions,
- feedback submissions,
- feedback conversion rate,
- average internal rating,
- Google Review clicks,
- Google Review click-through rate.

### Accuracy Requirement

Metrics must represent behavior ReviewTap can actually observe.

Do not label Google Review clicks as completed Google Reviews.

### Depends On

RT-060
RT-080

---

## RT-062 — Build Feedback View

**Status:** NOT STARTED

### Goal

Allow an authorized business user to inspect private customer feedback.

### Expected Information

- internal rating,
- written comment,
- submission time,
- card source where useful,
- voluntarily provided contact information,
- relevant follow-up or consent state.

### Important Boundary

Optional contact information must not automatically be interpreted as a persistent verified customer identity.

### Depends On

RT-060
RT-035

---

# PHASE 8 — Business and Card Management

## RT-070 — Build Business Settings

**Status:** NOT STARTED

### Goal

Allow authorized management of V1 business configuration.

### Potential Fields

- business name,
- trusted Google Review destination,
- display information,
- active state when required.

### Security Requirement

Google Review destinations must be validated and stored as trusted business configuration.

The public Google handoff must not accept arbitrary browser-provided redirect destinations.

### Depends On

RT-060
RT-051

---

## RT-071 — Build Card Management

**Status:** NOT STARTED

### Goal

Allow authorized ReviewTap users to manage NFC cards.

### Required Actions

- list cards,
- inspect public card identifiers,
- create or register cards as approved by the schema,
- assign cards to a business,
- activate or deactivate cards,
- label cards for management purposes where useful.

### Depends On

RT-060
RT-012

---

# PHASE 9 — Analytics

## RT-080 — Define and Implement V1 Analytics Queries

**Status:** NOT STARTED

### Goal

Implement accurate analytics using ReviewTap operational data.

### Initial Metrics

Evaluate:

- total interaction sessions,
- feedback submissions,
- feedback conversion rate,
- average internal rating,
- rating distribution,
- Google Review clicks,
- Google Review click-through rate,
- activity by card,
- activity over time.

### Important Data Requirement

Analytics must support Google Review clicks from sessions that do not contain a feedback submission.

Do not assume:

Interaction Session
→ Feedback Submission
→ Google Review Click

is the only valid funnel.

Valid behavior also includes:

Interaction Session
→ Google Review Click

### Product Rule

Only report behavior ReviewTap can observe.

Do not infer:

- completed Google Review publication,
- clipboard paste behavior,
- or verified unique-customer counts

without evidence.

### Depends On

RT-021
RT-035
RT-040

### Requires Plan Stage

Yes.

---

## RT-081 — Build Analytics UI

**Status:** NOT STARTED

### Goal

Present V1 analytics clearly in the dashboard.

### Potential UI

- metric cards,
- simple charts,
- rating distribution,
- activity timeline,
- card comparison,
- feedback conversion,
- Google Review click-through.

Avoid visual complexity that does not improve decision-making.

Use terminology that accurately represents ReviewTap-observable events.

### Depends On

RT-080
RT-061

---

# PHASE 10 — Product Refinement and Deployment

## RT-090 — End-to-End Customer Flow Verification

**Status:** NOT STARTED

### Goal

Verify the complete customer experience across the supported V1 paths.

### Required Scenarios

#### Feedback Path

NFC card
→ card resolution
→ interaction session
→ ReviewTap feedback
→ feedback persistence
→ Google Review opportunity

#### Direct Google Path

NFC card
→ card resolution
→ interaction session
→ skip ReviewTap feedback
→ Google Review handoff

#### Feedback Reuse Path

NFC card
→ feedback submission containing written feedback
→ copy customer-authored comment
→ Google Review handoff

#### Rating Independence

Verify that both lower and higher internal ratings retain Google Review access.

#### Clipboard Failure

Verify that clipboard failure:

- does not produce false success UI,
- does not block the customer,
- and still allows Google Review access.

### Verification Boundary

Do not treat reaching Google as evidence that a public Google Review was successfully published.

### Depends On

Required customer-flow functionality complete.

---

## RT-091 — End-to-End Owner Flow Verification

**Status:** NOT STARTED

### Goal

Verify the protected business-owner workflow.

### Required Flow

login
→ authorized business
→ dashboard
→ interaction analytics
→ feedback
→ cards
→ business configuration
→ Google Review click analytics

### Required Security Check

Verify that an authenticated user cannot gain access to an unrelated business through client-controlled identifiers.

### Depends On

Required owner-facing functionality complete.

---

## RT-092 — Responsive and Accessibility Refinement

**Status:** NOT STARTED

### Goal

Polish the customer and owner interfaces after functionality is stable.

### Focus

- mobile NFC flow,
- touch-friendly controls,
- dashboard responsive behavior,
- loading/error/success states,
- clipboard feedback,
- accessibility,
- keyboard behavior where relevant,
- consistent interface patterns.

---

## RT-093 — Production Deployment

**Status:** NOT STARTED

### Goal

Deploy a verified V1 through Vercel with production Supabase configuration.

### Expected Work

- production environment variables,
- production build,
- deployment,
- production smoke testing,
- production configuration validation,
- safe Google Review destination configuration.

### Depends On

Required V1 verification.

---

## RT-094 — Physical NFC End-to-End Test

**Status:** NOT STARTED

### Goal

Program a real NFC card with the production ReviewTap URL and verify the actual physical product experience.

### Required Tests

#### Feedback Path

Physical NFC card
→ phone NFC interaction
→ ReviewTap
→ interaction session
→ private feedback
→ database
→ dashboard visibility

#### Google Review Path

Physical NFC card
→ ReviewTap
→ Google Review action
→ trusted handoff
→ correct Google destination

#### Feedback Reuse Path

Physical NFC card
→ ReviewTap written feedback
→ copy action
→ Google handoff
→ clipboard/fallback behavior on a real phone

### Important Boundary

The test verifies ReviewTap's handoff behavior.

It should not claim that ReviewTap can independently prove publication of a Google Review unless that capability exists.

### Depends On

RT-093

---

# Current Priority

The current next development task is:

## RT-001 — Initialize Next.js Application

Before implementation begins, complete the remaining repository-foundation work:

- finish ReviewTap ICM and durable-document consistency review,
- run the planned Codex/ICM stress tests,
- review the complete Git diff,
- commit the project foundation,
- push the clean foundation to GitHub,
- then begin RT-001 as a new coherent development task.

No application implementation task should be marked started merely because repository documentation is being finalized.

---

## Task Update Rules

When meaningful work begins:

1. update the task status,
2. use the Plan stage when meaningful planning is required,
3. implement through Build,
4. verify through the appropriate verification process,
5. mark COMPLETE only after sufficient verification,
6. update `docs/IMPLEMENTATION.md` when meaningful verified functionality now exists.

When implementation reveals additional work:

- include it in the current task only when it is required to complete the same coherent objective,
- otherwise create or update a separate task.

When a product or architecture decision changes:

- update the relevant durable documents first or as part of the same coherent change,
- then update affected tasks deliberately.

Do not turn this document into a detailed implementation diary.

Git preserves code history.

ICM outputs preserve task-specific planning, Build, and verification evidence when such artifacts are useful.

`docs/IMPLEMENTATION.md` preserves meaningful verified current system behavior.

`docs/DECISIONS.md` preserves durable reasoning.

This file preserves the active implementation map.