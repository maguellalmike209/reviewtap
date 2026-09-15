# ReviewTap Project Context

## 1. Project Purpose

ReviewTap is an NFC-powered customer feedback and review-engagement platform for local businesses.

A ReviewTap-controlled NFC URL opens a business-specific customer experience where customers can provide optional feedback and access the business's Google Review page. ReviewTap also supports business and card management, feedback visibility, and basic owner analytics.

This file is the routing layer for project context.

Do not treat this file as the complete product specification or architecture document.

Use it to determine:

- what kind of work is being performed,
- whether an ICM stage is needed,
- which durable project sources are relevant,
- and which implementation evidence should be inspected.

---

## 2. Context Loading Principle

Load the minimum context required to perform the task correctly.

Always begin with:

1. `AGENTS.md`
2. this root `CONTEXT.md`

Then determine:

- whether the task requires a formal ICM stage,
- which durable project sources are relevant,
- which code, tests, configuration, schema, or task artifacts must be inspected.

If the task does not require a formal ICM stage, do not load one merely because it exists.

If a stage is required, load only the relevant stage `CONTEXT.md` and the task-specific context needed for that work.

Do not automatically read:

- every file in `docs/`,
- every ICM stage,
- every historical ICM output,
- or the entire repository.

Expand context only when the task requires it.

Prefer targeted context over exhaustive context.

---

## 3. Primary Project Sources

Use the following files for durable project information.

### Product Requirements

`docs/V1_SPEC.md`

Read when the task concerns:

- V1 scope,
- required user behavior,
- product features,
- business rules,
- acceptance criteria,
- or product non-goals.

This document answers:

> What is ReviewTap V1 supposed to do?

---

### Architecture

`docs/ARCHITECTURE.md`

Read when the task concerns:

- application structure,
- technology choices,
- database structure,
- routes,
- services,
- data flow,
- integrations,
- security boundaries,
- or technical responsibilities.

This document answers:

> How is ReviewTap designed to work?

---

### Current Implementation

`docs/IMPLEMENTATION.md`

Read when the task concerns:

- functionality that may already exist,
- modifying or extending an existing feature,
- understanding current runtime behavior,
- locating the major pieces of an implemented feature,
- understanding known implementation limitations,
- or determining how the current codebase differs from planned architecture.

This document answers:

> What meaningful ReviewTap functionality is actually implemented right now, and how does it currently work?

Treat this as a current-state guide, not as a substitute for inspecting relevant code.

When implementation details matter, use this document to locate and understand the system, then inspect the relevant source code directly.

---

### Active Work

`docs/TASKS.md`

Read when the task concerns:

- current implementation progress,
- unfinished work,
- priorities,
- dependencies between tasks,
- task status,
- or the next planned development step.

This document answers:

> What work exists and what is its current state?

When a prompt references an explicit task ID such as `RT-001`, read that task's entry in `docs/TASKS.md` before planning or implementing it.

---

### Decisions

`docs/DECISIONS.md`

Read when the task could be affected by a previously settled technical or product decision.

Examples include:

- technology selection,
- architectural boundaries,
- naming conventions,
- data-model choices,
- security rules,
- rejected alternatives,
- or deliberate V1 limitations.

This document answers:

> What important choices have already been made, and why?

Do not reopen settled decisions without a material reason.

---

## 4. ICM Workflow

The initial ReviewTap ICM contains three stages:

1. `icm/01_plan/`
2. `icm/02_build/`
3. `icm/03_verify/`

Each stage contains its own `CONTEXT.md`.

Use only the stage or stages appropriate to the current task.

---

### Plan

Use:

`icm/01_plan/CONTEXT.md`

when the task requires understanding, designing, decomposing, or deciding before implementation.

Typical examples:

- designing a database schema,
- planning a feature,
- determining affected files,
- comparing implementation approaches,
- defining acceptance criteria,
- resolving meaningful implementation uncertainty,
- or evaluating architectural options.

---

### Build

Use:

`icm/02_build/CONTEXT.md`

when the task involves implementing or modifying the project.

Typical examples:

- creating a route,
- modifying a component,
- writing database code,
- implementing validation,
- fixing a known bug,
- changing configuration,
- or implementing an approved schema change.

---

### Verify

Use:

`icm/03_verify/CONTEXT.md`

when the task involves evaluating behavior against accepted requirements or proving that implemented behavior works correctly.

Typical examples:

- running tests,
- checking a build,
- validating card-entry or session behavior,
- checking failure cases,
- testing authorization,
- reviewing a completed feature against requirements,
- performing regression checks,
- or evaluating whether proposed behavior conforms to accepted project rules.

---

## 5. Choosing a Stage

Not every task requires all three stages, and some trivial tasks require no formal ICM stage.

Use the smallest workflow appropriate to the task.

### Trivial Change

No formal ICM stage may be necessary.

Examples include:

- correcting a typo,
- changing clearly defined copy,
- or making an obvious narrowly scoped styling adjustment.

Use the root project rules, inspect the affected area, and perform verification proportional to the change.

---

### Small Implementation Change

`build -> verify`

Use when the required behavior is already clear and no meaningful design work is needed.

---

### New or Non-Trivial Feature

`plan -> build -> verify`

Use when implementation requires meaningful reasoning, design, decomposition, acceptance criteria, or technical decisions before coding.

---

### Research or Design Task

`plan`

Use when the requested result is analysis, design, decomposition, or a decision rather than implementation.

---

### Testing Existing Behavior

`verify`

Use when the purpose of the task is to evaluate behavior that already exists.

---

### Requirement or Design Conformance Check

`verify`

Use when proposed or hypothetical behavior must be compared against accepted requirements, architecture, or decisions.

Do not claim runtime verification when no implementation was actually executed.

---

Do not create process for its own sake.

If a task changes from one kind of work to another, move to the appropriate stage rather than forcing all work through one stage.

---

## 6. Context Routing Examples

### Example: Design the Card Entry and Session Flow

Read:

- `AGENTS.md`
- root `CONTEXT.md`
- `icm/01_plan/CONTEXT.md`
- relevant requirements from `docs/V1_SPEC.md`
- relevant portions of `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md` only when an existing decision constrains the design

Inspect existing implementation only if relevant implementation already exists.

Do not automatically load unrelated dashboard, UI, or historical output files.

---

### Example: Implement Card Entry and Session Creation

Read:

- `AGENTS.md`
- root `CONTEXT.md`
- `icm/02_build/CONTEXT.md`
- the accepted plan when one exists
- relevant requirements from `docs/V1_SPEC.md`
- relevant architecture from `docs/ARCHITECTURE.md`
- relevant decisions when they constrain implementation
- the specific implementation files and tests involved

Do not load unrelated project documents merely because they exist.

---

### Example: Verify Card Entry and Session Behavior

Read:

- `AGENTS.md`
- root `CONTEXT.md`
- `icm/03_verify/CONTEXT.md`
- relevant acceptance criteria or product requirements
- the relevant implementation and tests
- relevant architecture or decisions when they affect expected behavior
- relevant Plan or Build artifacts only when they help establish the verification target

Use actual evidence rather than relying on Build's description of the result.

---

### Example: Evaluate a Proposed Product Behavior

Suppose a proposed implementation prevents customers with low internal ratings from accessing the Google Review option.

Read:

- `AGENTS.md`
- root `CONTEXT.md`
- `icm/03_verify/CONTEXT.md`
- the relevant requirements from `docs/V1_SPEC.md`
- relevant accepted decisions from `docs/DECISIONS.md`

Compare the proposed behavior against accepted project requirements.

Do not claim runtime testing if the behavior is only hypothetical.

---

### Example: Update a Button Label

If the requirement is already clear, this may require only:

- `AGENTS.md`
- root `CONTEXT.md`
- the affected component

Do not invoke a formal ICM stage merely for process.

Inspect the resulting change and perform verification proportional to the risk.

---

## 7. ICM Output Files

Stage-specific task artifacts belong inside:

- `icm/01_plan/output/`
- `icm/02_build/output/`
- `icm/03_verify/output/`

If an output directory does not yet exist, create it only when a stage actually needs to write an artifact.

Do not add placeholder files solely to preserve empty output directories in Git.

Do not load output directories automatically.

Read a prior output only when:

- the current task explicitly continues that work,
- another project document references it,
- or it contains information necessary for the current task.

ICM outputs are working artifacts, not the permanent project source of truth.

If an output produces a durable conclusion, promote that conclusion into the appropriate file under `docs/`.

Do not use historical ICM outputs as a substitute for current durable documentation.

---

## 8. Source-of-Truth Discipline

There is no single universal source of truth for every project question.

Use the source that answers the type of question being asked.

### Intended Product Behavior

Use:

- `docs/V1_SPEC.md`
- accepted product decisions in `docs/DECISIONS.md`

These answer:

> What should ReviewTap do?

---

### Intended Technical Design

Use:

- `docs/ARCHITECTURE.md`
- accepted technical decisions in `docs/DECISIONS.md`

These answer:

> How is ReviewTap intended to be structured?

---

### Actual Current Implementation

Use:

- current code,
- schema,
- configuration,
- and runtime behavior.

These answer:

> What does the system currently do?

Code describes current implementation reality.

It does not automatically prove that the implementation is correct.

---

### Verified Behavior

Use:

- relevant tests,
- verification results,
- and direct observed evidence.

These answer:

> What behavior has actually been demonstrated to work?

Passing tests are evidence, not automatic proof that the requirements themselves are correct.

---

### Documented Current State

Use:

`docs/IMPLEMENTATION.md`

This answers:

> What meaningful verified functionality is currently understood to exist?

Treat this as a current-state guide, not as a substitute for inspecting the relevant implementation.

---

### Active Work

Use:

`docs/TASKS.md`

This answers:

> What work exists and what is its current state?

---

### Durable Decisions

Use:

`docs/DECISIONS.md`

This answers:

> Which important choices currently govern the project, and why?

Accepted decisions remain active unless they are intentionally superseded.

---

If these sources materially disagree:

1. identify the conflict,
2. determine what question each source is supposed to answer,
3. inspect the relevant repository evidence,
4. determine whether the implementation, documentation, requirement, decision, or task state is stale or incorrect,
5. explain the discrepancy to Mike when it affects the work,
6. and update the appropriate source only after the correct state is established.

Do not assume code is correct merely because it exists.

Do not rewrite requirements merely to match an incorrect implementation.

Do not silently resolve contradictions.

---

## 9. Instruction Precedence

When project guidance appears to conflict, use the following instruction hierarchy:

1. `AGENTS.md` defines global agent behavior and project-wide operating rules.
2. Root `CONTEXT.md` defines context routing and source responsibilities.
3. The active ICM stage `CONTEXT.md` defines stage-specific workflow rules.
4. Task-specific ICM artifacts define the accepted scope and details of the current task.

Lower-level task instructions should specialize higher-level guidance, not silently contradict it.

Task-specific ICM artifacts must not silently override accepted product requirements, architecture, security boundaries, or durable decisions.

Use the source-of-truth rules in this document to resolve disagreements involving:

- `docs/V1_SPEC.md`,
- `docs/ARCHITECTURE.md`,
- `docs/IMPLEMENTATION.md`,
- `docs/DECISIONS.md`,
- `docs/TASKS.md`,
- and current implementation evidence.

If a genuine conflict cannot be resolved from repository evidence, surface the conflict to Mike instead of guessing.

---

## 10. Repository Growth

This context system should grow only when ReviewTap develops a real recurring need.

Do not add new:

- ICM stages,
- global instruction files,
- process layers,
- output categories,
- or duplicated documentation

merely because they might be useful someday.

Examples of stages that may eventually become justified include:

- security review,
- database migration review,
- release/deployment,
- or dedicated code review.

Add them only when repeated project work makes the benefit clear.

Prefer extending an existing stage when its responsibility already fits the need.

---

## 11. Current Development Principle

ReviewTap should remain easy for both Mike and an AI coding agent to understand.

Prefer:

focused context
-> clear plan when needed
-> small implementation
-> proportional verification
-> durable documentation when necessary

over:

large context
-> unnecessary process
-> broad autonomous changes
-> weak verification
-> undocumented assumptions

The ICM exists to improve clarity and reliability.

It should not become bureaucracy that makes simple work harder.