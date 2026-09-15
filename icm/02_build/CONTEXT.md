# ReviewTap ICM — Build Stage

## 1. Purpose

The build stage exists to implement an understood ReviewTap task in the smallest coherent, reviewable way.

Build should convert an approved requirement or plan into working project changes without silently expanding scope, redesigning unrelated systems, or hiding important decisions.

The goal is not to maximize the amount of code produced.

The goal is to produce the correct implementation, preserve project clarity, and leave the work in a state that can be meaningfully verified.

---

## 2. When to Use This Stage

Use the build stage when the task requires creating, modifying, or removing implementation.

Typical examples include:

- adding a route,
- creating or modifying a component,
- implementing business logic,
- writing database access code,
- adding validation,
- implementing an approved schema change,
- fixing a known bug,
- adding tests required by an implementation,
- or modifying configuration required by a feature.

Do not use this stage merely to explore architecture or decide what should be built.

Meaningful unresolved design work belongs in `icm/01_plan/`.

---

## 3. Required Context

Before implementation:

1. Read the root `AGENTS.md`.
2. Read the root `CONTEXT.md`.
3. Read this build-stage context.
4. Read the relevant accepted plan under `icm/01_plan/output/` when one exists.
5. Use the root context router to identify only the durable project sources relevant to the task.
6. Inspect the actual files, tests, schema, configuration, dependencies, or other implementation involved in the change.

Depending on the task, relevant project sources may include:

- `docs/V1_SPEC.md` when product requirements, behavior, scope, or acceptance criteria matter,
- `docs/ARCHITECTURE.md` when system structure, routes, data flow, integrations, or technical boundaries matter,
- `docs/IMPLEMENTATION.md` when modifying or extending functionality that may already exist,
- `docs/DECISIONS.md` when settled decisions constrain the implementation,
- `docs/TASKS.md` when task status, sequencing, or dependencies matter.

Do not load these documents automatically merely because they exist.

When a plan exists, use it as the task-specific implementation baseline, then inspect repository reality before making changes.

Do not rely on documentation alone when implementation already exists.

Do not automatically load unrelated project files or historical ICM outputs.

---

## 4. Build Entry Conditions

Before writing code, the task should be understood well enough to answer:

- What behavior is changing?
- Why is it changing?
- What should remain unchanged?
- Which parts of the repository are expected to be affected?
- What acceptance criteria define success?
- How is the result expected to be verified?

For non-trivial tasks, these answers should normally come from an approved plan.

If a major requirement or architectural question is unresolved, return to the plan stage rather than guessing during implementation.

Do not block simple implementation work with unnecessary planning.

---

## 5. Plan Adherence

When an approved plan exists, treat it as the implementation baseline.

Follow its:

- objective,
- requirements,
- non-goals,
- constraints,
- impacted areas,
- implementation sequence,
- and acceptance criteria.

The plan is not absolute if repository reality proves one of its assumptions wrong.

If implementation reveals a material conflict with the plan:

1. stop expanding the affected change,
2. identify the incorrect assumption,
3. inspect the relevant evidence,
4. explain the discrepancy,
5. and revise or return to planning when the change materially affects the solution.

Do not silently redesign the feature during Build.

Minor implementation details that do not affect requirements or architecture may be resolved reasonably during Build.

Do not reopen settled product or architectural decisions during Build merely because another implementation approach is possible.

If a different approach would materially change accepted requirements, architecture, scope, or a durable decision, return to Plan rather than making that change implicitly.

---

## 6. Inspect Before Editing

Before modifying an existing area:

- read the relevant code,
- understand its current responsibility,
- inspect nearby patterns,
- inspect relevant types or schema,
- and inspect existing tests when available.

Prefer extending existing project patterns over inventing parallel ones.

Do not replace working code merely because another style is possible.

Do not refactor unrelated code while implementing a feature unless the refactor is genuinely required to complete the task safely.

---

## 7. Smallest Coherent Change

Implement the smallest coherent change that fully satisfies the task.

A coherent change may span multiple files when those files are naturally part of one behavior.

For example, a feature may legitimately require:

- a route,
- a database helper,
- a type,
- and targeted tests.

Do not artificially force a change into one file.

At the same time, do not include unrelated cleanup, style changes, renaming, abstraction, or feature work merely because the files are already being edited.

Keep the Git diff understandable.

---

## 8. Implementation Sequence

For meaningful tasks, build in small logical increments.

Prefer an order where each step establishes a useful piece of behavior and reduces uncertainty for the next step.

When practical:

1. establish or confirm required types and data boundaries,
2. implement the smallest core behavior,
3. connect supporting pieces,
4. handle expected failure and edge cases,
5. add or update targeted tests,
6. run appropriate implementation checks,
7. inspect the resulting diff.

Do not create several speculative layers before proving the core path works.

---

## 9. Teaching During Build

Mike is learning software engineering while building ReviewTap.

When implementation introduces an important concept, explain:

- what changed,
- why the approach was chosen,
- where the behavior lives,
- how data or control flows through the change,
- and how Mike can inspect or test it.

Teach especially when introducing:

- a new Next.js concept,
- TypeScript behavior,
- database behavior,
- asynchronous control flow,
- validation,
- authentication or authorization,
- API or route conventions,
- testing patterns,
- environment configuration,
- or a significant architectural pattern.

Do not interrupt implementation with explanations of trivial syntax.

Teach at meaningful engineering boundaries.

When practical, let Mike perform useful Git, terminal, setup, or inspection steps himself so automation does not replace the learning process.

---

## 10. Dependencies

Do not add a dependency automatically because it makes implementation easier.

Before adding one:

- determine whether the existing platform or stack already provides the needed capability,
- determine whether an existing dependency already solves the problem,
- evaluate whether the dependency materially simplifies the solution,
- consider maintenance and security implications,
- and explain why it is justified.

Material new dependencies require Mike's approval unless they were already explicitly approved in the plan.

Do not install packages merely to avoid writing a small amount of straightforward code.

---

## 11. Security and Sensitive Data

Never place secrets or credentials in source code, documentation, test fixtures, ICM output, terminal examples containing real values, or Git-tracked configuration.

Use approved environment-variable patterns for sensitive configuration.

Treat external input as untrusted where appropriate.

When implementing behavior involving:

- authentication,
- authorization,
- redirect destinations,
- database writes,
- public identifiers,
- user-controlled input,
- or external APIs,

consider the relevant abuse and validation cases instead of implementing only the happy path.

If implementation uncovers a security concern outside the current plan, surface it explicitly rather than silently working around it.

---

## 12. Error Handling

Handle errors deliberately.

Do not:

- swallow failures,
- return success when work failed,
- use empty catch blocks,
- add broad fallback behavior that hides the root problem,
- or weaken validation merely to make tests pass.

Failures should be understandable and actionable where practical.

When debugging, gather evidence before editing.

Prefer:

error
-> evidence
-> hypothesis
-> targeted change
-> verification

over repeated speculative edits.

---

## 13. Testing During Build

Build may create and run targeted tests needed to support implementation.

Tests should focus on meaningful behavior rather than implementation trivia.

When appropriate, cover:

- expected behavior,
- important edge cases,
- failure cases,
- and regressions related to the task.

Passing a test written during Build is useful evidence, but it does not eliminate the independent Verify stage for meaningful work.

Do not modify tests merely to force incorrect implementation to pass.

If an existing test conflicts with an approved requirement, identify the conflict.

---

## 14. Build Checks

Before handing work to Verify, run the strongest practical checks available for the implementation.

Depending on the task, these may include:

- targeted tests,
- TypeScript checks,
- linting,
- builds,
- database validation,
- local execution,
- or targeted manual inspection.

Build checks are intended to catch obvious implementation failures early.

They do not replace the Verify stage's responsibility to evaluate the feature against the acceptance criteria.

---

## 15. Documentation During Build

Do not update `docs/IMPLEMENTATION.md` simply because code has been written.

A feature should not be represented as established current behavior until it has been sufficiently verified.

During Build, identify information that may need durable documentation after verification.

Examples include:

- meaningful implemented behavior,
- major file or module responsibilities,
- implementation constraints,
- accepted architecture changes,
- newly established decisions,
- and known limitations.

If implementation requires an already-approved durable architectural or product change, update the relevant project documentation when appropriate, but do not present unverified behavior as proven functionality.

Potential `IMPLEMENTATION.md` updates should normally be completed or finalized after Verify confirms the behavior.

---

## 16. Build Output Artifacts

Use `icm/02_build/output/` only when a task benefits from a temporary implementation artifact.

Possible examples include:

- implementation handoff notes,
- a temporary file-impact summary,
- migration preparation notes,
- or a concise record of significant deviations from the original plan.

Do not create Build output files automatically for every task.

The source code and Git diff are already the primary record of implementation.

Do not duplicate code descriptions into large AI-generated reports without a real need.

When a substantial Build artifact is useful, it should begin with a concise `Human Review Summary` before detailed Build notes or implementation evidence.

The summary is a review aid for Mike, not merely a shorter agent report. It should help him understand the implemented behavior, focus his review, assess the evidence, and decide whether the work is ready for Verify.

The `Human Review Summary` should contain these sections near the top:

### What Changed

- Concisely describe the implemented behavior.
- Distinguish what was created, what was modified, and what was intentionally left untouched.
- Do not duplicate a file-by-file diff narrative.

### Mike's Review Focus

- Identify the specific files, behavior, dependencies, or commands most worth Mike's attention.
- Explain briefly why each focus area matters when that is not obvious.
- Do not require generated or mechanical files to be reviewed line by line unless they contain a meaningful risk.
- If no special human review focus exists, say `None.`

### Learn From This Build

Divide concepts demonstrated by the actual implementation into:

#### Must Understand Before Verify

List only concepts Mike needs to understand before deciding to hand the implementation to Verify.

#### Useful to Learn During Review

List concepts that will improve Mike's understanding while he inspects the actual change.

#### Not Important Yet

List only concepts that may appear relevant but are not important to the current implementation review.

Use `None.` for any category with nothing meaningful to report. Keep this section focused on the implementation that was actually built rather than turning the artifact into a general tutorial.

### Checks Run

For each check, record:

- the command or other evidence,
- the result,
- what the check proves,
- and what it does not prove.

Do not describe code inspection alone as runtime testing.

### Current Limitations or Blockers

- Clearly distinguish expected deferred or out-of-scope work from actual defects or blockers.
- State the practical impact and next step for each actual defect or blocker.
- Do not invent limitations merely to fill the section.
- If there are none, say `None.`

### Ready for Verify Checklist

Provide a concise checklist Mike can use to decide whether the implementation should be handed to Verify. It should cover the approved scope, meaningful deviations, relevant checks, unresolved defects or blockers, and the continued validity of the acceptance criteria.

Detailed Build notes or implementation evidence may follow the `Human Review Summary` when useful. Do not repeat the entire detailed artifact in the summary, and preserve progressive disclosure.

Do not invent decisions, learning requirements, blockers, or limitations merely to fill a summary section. Use `None.` whenever a summary section has nothing meaningful to report.

When an output file is useful, give it a descriptive task-specific name such as:

`card-entry-session-build-notes.md`

Do not use vague names such as:

`build.md`

or:

`notes.md`

Build outputs are temporary working artifacts, not permanent project truth.

When the code and Git diff are sufficient and no Build artifact is justified, the final Build handoff should still apply the same human-review principles where practical: summarize what changed, direct Mike to the highest-value review areas, explain relevant learning, report checks with their evidentiary limits, distinguish deferred work from defects, and make readiness for Verify clear.

---

## 17. Handling Implementation Discoveries

Implementation often reveals facts that were not visible during planning.

Classify discoveries before acting on them.

### Local implementation detail

If the discovery is reversible, contained, and does not alter requirements or architecture, resolve it during Build and explain the choice.

### Plan-impacting discovery

If the discovery changes the expected approach, affected systems, acceptance criteria, or implementation sequence, update or revisit the plan.

### Durable architectural or product discovery

If the discovery changes a lasting ReviewTap rule or design decision, record it in the appropriate durable documentation once accepted.

### Security or destructive discovery

If the discovery creates a security concern, destructive action, data-loss risk, or irreversible change, stop and get Mike's approval before proceeding.

Do not use "implementation discovery" as an excuse for uncontrolled scope expansion.

---

## 18. Git Discipline During Build

Git is controlled by Mike unless he explicitly delegates an action.

An agent may inspect Git state and diffs when useful.

Do not automatically:

- commit,
- push,
- merge,
- rebase,
- reset,
- force push,
- delete branches,
- rewrite history,
- or discard Mike's uncommitted work.

Before suggesting that implementation is ready, inspect:

- which files changed,
- whether unexpected files changed,
- whether generated or sensitive files were added,
- and whether the diff matches the intended scope.

Recommend a clear commit message when useful, but let Mike perform the Git action unless he explicitly asks otherwise.

---

## 19. Build Quality Check

Before handing the task to Verify, confirm:

- the requested behavior has been implemented,
- the implementation matches the approved scope,
- non-goals have not leaked into the change,
- existing relevant behavior has been preserved,
- obvious error and edge cases have been considered,
- no unjustified dependency was added,
- no secret or sensitive value was introduced,
- targeted Build checks have been run,
- the Git diff has been inspected,
- and known limitations or uncertainties are documented.

Do not hand knowingly broken work to Verify and call it complete.

---

## 20. Handoff to Verify

Build is ready for `icm/03_verify/` when:

1. implementation for the agreed scope is present,
2. relevant Build checks have passed or failures are clearly documented,
3. the resulting change is understandable,
4. major deviations from the plan are resolved or explicitly documented,
5. the expected acceptance criteria remain valid,
6. and Verify has enough context to evaluate the behavior independently.

The Build handoff should communicate:

### What Changed

A concise description of the implementation.

### Why

How the implementation satisfies the requirement or approved plan.

### Main Files

The important files or systems changed.

### Build Checks Performed

What was run or manually checked during implementation.

### Known Limitations

Anything intentionally incomplete or outside scope.

### Plan Deviations

Any meaningful difference between the approved plan and the final implementation.

### Verification Targets

The acceptance criteria or important behaviors that Verify should independently prove.

Do not tell Verify that the feature works merely because Build believes it does.

Give Verify the evidence and targets needed to determine that independently.
