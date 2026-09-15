# ReviewTap ICM — Plan Stage

## 1. Purpose

The plan stage exists to understand and design non-trivial work before implementation begins.

A good plan should reduce uncertainty, prevent unnecessary changes, identify the correct project boundaries, and give the build stage a clear path to follow.

The goal is not to produce a long document.

The goal is to produce a plan that is specific enough to implement and verify without relying on hidden assumptions.

---

## 2. When to Use This Stage

Use the plan stage when work requires meaningful reasoning before implementation.

Typical examples include:

- new product features,
- database or data-model changes,
- new routes or APIs,
- authentication or authorization changes,
- analytics design,
- cross-file changes,
- architectural decisions,
- third-party integrations,
- significant refactors,
- or tasks with unclear requirements.

Do not use this stage for trivial work whose implementation is already obvious.

Examples that usually do not require a formal plan:

- changing copy,
- renaming a clearly scoped variable,
- fixing a simple styling issue,
- or correcting an obvious typo.

Use process in proportion to the problem.

---

## 3. Required Context

Before planning:

1. Read the root `AGENTS.md`.
2. Read the root `CONTEXT.md`.
3. Read this plan-stage context.
4. Use the root context router to identify only the durable project sources relevant to the task.
5. Inspect relevant existing code, tests, schemas, configuration, or other implementation when they already exist and materially affect the plan.

Depending on the task, relevant project sources may include:

- `docs/V1_SPEC.md` when product requirements, behavior, scope, or acceptance criteria matter,
- `docs/ARCHITECTURE.md` when system structure, data flow, routes, services, integrations, or technical boundaries matter,
- `docs/IMPLEMENTATION.md` when the task touches functionality that may already exist,
- `docs/DECISIONS.md` when prior durable decisions may constrain the task,
- `docs/TASKS.md` when task status, sequencing, or dependencies matter.

Do not load these documents automatically merely because they exist.

Do not assume documentation is current when repository evidence is relevant. Compare documentation against the actual implementation where necessary.

Do not load unrelated project files or historical ICM outputs merely for completeness.

---

## 4. Planning Rules

During the plan stage:

- do not implement production code,
- do not install dependencies,
- do not modify database state,
- do not perform destructive actions,
- and do not make unrelated repository changes.

Planning may inspect the repository and may create or update a task-specific plan artifact under `icm/01_plan/output/`.

If a durable architectural or product decision is established during planning, identify it for later promotion into the appropriate project document.

Do not silently turn temporary planning notes into permanent project truth.

---

## 5. Planning Workflow

For non-trivial work, move through the following steps.

### Step 1 — Define the Objective

State clearly:

- what problem is being solved,
- who or what is affected,
- and what successful completion should accomplish.

Avoid vague objectives such as:

> improve analytics

Prefer specific objectives such as:

> create one interaction session when a valid active ReviewTap card is opened, associate it with the correct card and business, and route the customer into that session's feedback experience.

---

### Step 2 — Establish Current State

Inspect the relevant existing system before proposing changes.

When applicable, use `docs/IMPLEMENTATION.md` to understand the documented current state and locate the major parts of the existing feature.

Then inspect the relevant code, tests, schema, or configuration directly rather than relying on documentation alone.

Determine:

- what already exists,
- what currently works,
- what has been verified,
- what is missing,
- what known limitations exist,
- what constraints already exist,
- and which files, systems, or data structures are involved.

Do not plan from the prompt alone when the repository already contains relevant implementation.

If `IMPLEMENTATION.md`, code, tests, or other project documentation disagree materially, identify the discrepancy before designing changes around it.

---

### Step 3 — Identify Requirements and Non-Goals

Separate:

- required behavior,
- optional behavior,
- and behavior that is intentionally out of scope.

Use V1 scope aggressively.

Do not add functionality merely because it might be useful later.

Explicit non-goals help prevent scope expansion during implementation.

---

### Step 4 — Identify Constraints

Record constraints that materially affect the solution.

Examples include:

- existing architecture,
- existing schema,
- V1 scope,
- security requirements,
- platform limitations,
- dependency restrictions,
- compatibility requirements,
- and previously recorded decisions.

Do not design around hypothetical constraints that do not currently exist.

---

### Step 5 — Design the Smallest Coherent Solution

Propose the simplest solution that completely satisfies the requirements.

Prefer:

- existing project patterns,
- existing platform capabilities,
- and clear data flow

over:

- new abstractions,
- unnecessary services,
- speculative scalability,
- or new dependencies.

Explain meaningful tradeoffs when more than one reasonable implementation exists.

---

### Step 6 — Build an Impact Map

Identify what the implementation is expected to affect.

Depending on the task, this may include:

- files,
- routes,
- components,
- database tables,
- database fields,
- APIs,
- environment variables,
- tests,
- documentation,
- or external services.

Distinguish between:

- files expected to change,
- files that may need inspection,
- and areas that should remain untouched.

This protects the build stage from unnecessary scope expansion.

---

### Step 7 — Define Acceptance Criteria

Write observable conditions that prove the requested behavior exists.

Acceptance criteria should describe behavior, not implementation effort.

Good:

> Opening a valid active ReviewTap card creates one interaction session associated with the correct card and business, then opens that session's feedback experience.

Weak:

> Add card-entry code.

Where relevant, include:

- normal behavior,
- invalid input,
- failure behavior,
- permission behavior,
- and important edge cases.

---

### Step 8 — Define the Verification Strategy

Before implementation begins, determine how the result will be proven correct.

Possible verification methods include:

- automated tests,
- type checking,
- linting,
- build checks,
- database inspection,
- API testing,
- manual browser testing,
- or targeted code review.

Verification should map back to the acceptance criteria.

Do not wait until after implementation to decide what success means.

---

### Step 9 — Identify Risks, Unknowns, and Decisions

Call out:

- unresolved requirements,
- assumptions,
- technical uncertainty,
- data migration risk,
- security concerns,
- external dependencies,
- or architectural decisions that require Mike's input.

Do not bury uncertainty inside the plan.

If an unresolved issue could materially change the implementation, resolve it before moving to build when practical.

---

### Step 10 — Produce an Executable Implementation Sequence

Break the work into small, ordered implementation steps.

Each step should:

- have a clear purpose,
- logically build on previous work,
- and be small enough to review and verify.

Avoid vague steps such as:

> build backend

Prefer steps such as:

1. add the required card lookup behavior,
2. validate the card and associated business,
3. create one interaction session for a valid card entry,
4. route the customer into the session's feedback experience,
5. handle inactive, unknown, or invalid card states deliberately,
6. add targeted tests for the required behavior.

The build stage should be able to follow the plan without redesigning the feature from scratch.

---

## 6. Plan Output Contract

For meaningful planned work, create a task-specific file under:

`icm/01_plan/output/`

Use a descriptive filename such as:

`card-entry-session-plan.md`

or:

`business-card-schema-plan.md`

Do not use vague filenames such as:

`plan.md`

or:

`notes.md`

A complete plan should normally contain:

### Objective

What the task is intended to accomplish.

### Current State

What currently exists and what was inspected.

### Requirements

Required behavior.

### Non-Goals

What is intentionally excluded.

### Constraints

Relevant technical or product boundaries.

### Proposed Approach

The recommended solution and important tradeoffs.

### Impacted Areas

Expected files, systems, routes, schema, or other affected areas.

### Acceptance Criteria

Observable conditions that define success.

### Implementation Steps

Ordered build steps.

### Verification Plan

How each important behavior will be tested or checked.

### Risks and Open Questions

Remaining uncertainty, assumptions, or decisions.

The plan may be shorter when the task is simpler.

Do not add sections merely to make a plan appear more formal.

---

## 7. Decision Handling

If planning reveals a meaningful decision, distinguish between:

### Task-local decision

A choice that matters only to the current implementation.

Keep it in the plan.

### Durable project decision

A choice likely to affect future ReviewTap work.

Examples:

- route conventions,
- ownership rules,
- technology choices,
- schema boundaries,
- security rules,
- or intentional V1 limitations.

Durable decisions should be promoted to `docs/DECISIONS.md` once accepted.

If the decision changes architecture, update `docs/ARCHITECTURE.md` when appropriate.

If the decision changes product behavior, update `docs/V1_SPEC.md` when appropriate.

If planning depends on existing implemented behavior that is missing or materially outdated in `docs/IMPLEMENTATION.md`, note that documentation update as part of the eventual task handoff.

Do not update `IMPLEMENTATION.md` during planning to describe functionality that has not yet been built and verified.

---

## 8. Plan Quality Check

Before handing work to the build stage, verify that the plan answers:

- What are we building?
- Why are we building it?
- What already exists?
- What is intentionally out of scope?
- What will change?
- What should not change?
- What are the main implementation steps?
- How will success be verified?
- What risks or unknowns remain?

If the build stage would still need to guess about a major part of the solution, the plan is not ready.

---

## 9. Handoff to Build

A plan is ready for `icm/02_build/` when:

1. the objective is clear,
2. relevant current state has been inspected,
3. requirements and non-goals are defined,
4. the proposed solution is coherent,
5. acceptance criteria exist,
6. verification has been considered,
7. major uncertainty has been resolved or explicitly identified,
8. and the implementation sequence is actionable.

The build stage may discover new information.

If implementation reveals that a major planning assumption is wrong, do not force the original plan.

Pause, identify the discrepancy, and revise the plan or relevant project documentation before continuing.