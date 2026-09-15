# ReviewTap Implementation

## 1. Purpose

This document describes the meaningful behavior currently implemented and sufficiently verified in the ReviewTap codebase.

It answers:

> What does ReviewTap actually do right now?

This document describes current implementation reality.

It does not describe:

- planned functionality,
- intended architecture,
- future product behavior,
- temporary Build output,
- or functionality that exists only in a task or plan.

Use:

- `docs/V1_SPEC.md` for intended V1 product behavior,
- `docs/ARCHITECTURE.md` for intended technical design,
- `docs/DECISIONS.md` for durable product and technical decisions,
- and `docs/TASKS.md` for planned and active implementation work.

When implementation details matter, inspect the actual code, tests, schema, configuration, and runtime behavior rather than relying on this summary alone.

---

## 2. Current Product Implementation

ReviewTap product functionality has not yet been implemented.

The repository does not yet contain a functioning ReviewTap application.

The following major V1 product capabilities have not yet been implemented:

- Next.js application functionality,
- Supabase application integration,
- database schema,
- business records,
- NFC card resolution,
- interaction-session creation,
- customer feedback experience,
- internal rating controls,
- feedback persistence,
- optional customer contact capture,
- follow-up or consent handling,
- Google Review handoff,
- customer-authored feedback copy behavior,
- authentication,
- business authorization,
- owner dashboard,
- card management,
- business management,
- analytics,
- production deployment,
- or physical NFC end-to-end behavior.

Do not infer that these capabilities exist merely because they are described in:

- `docs/V1_SPEC.md`,
- `docs/ARCHITECTURE.md`,
- `docs/DECISIONS.md`,
- or `docs/TASKS.md`.

Those documents describe intended behavior, intended design, accepted decisions, and planned work.

They are not proof of implementation.

---

## 3. Current Repository Foundation

The repository currently contains the development foundation for building ReviewTap.

This includes:

- Git and GitHub repository structure,
- global agent instructions in `AGENTS.md`,
- root context routing in `CONTEXT.md`,
- the Plan → Build → Verify ICM workflow,
- the current ReviewTap V1 product specification,
- intended V1 architecture,
- durable product and technical decisions,
- and the implementation task plan.

The ICM is designed to support:

- targeted context loading,
- stage-specific work,
- small implementation changes,
- independent verification,
- and promotion of verified behavior into durable project documentation.

These repository-development capabilities support future implementation work.

They should not be confused with completed ReviewTap product functionality.

---

## 4. Current Development Position

The repository is currently at the transition between:

repository / ICM foundation

and:

application implementation

The current next development task is:

## RT-001 — Initialize Next.js Application

RT-001 is defined in `docs/TASKS.md`.

Until RT-001 and later application tasks are implemented and sufficiently verified, this document should continue to state that ReviewTap product functionality has not yet been implemented.

---

## 5. Implementation Documentation Rules

Update this document only when meaningful functionality has been implemented and sufficiently verified.

A feature should normally enter this document after:

Plan when required
→ Build
→ Verify
→ sufficient evidence of current behavior

Do not add functionality here merely because:

- it appeared in a plan,
- architecture describes it,
- a task exists for it,
- code was drafted,
- Build claims it works,
- or a test was written but meaningful verification is incomplete.

When functionality becomes verified current behavior, document:

- what it does,
- how its major pieces interact,
- where the important implementation lives,
- important implementation constraints,
- known limitations,
- and relevant durable decisions when useful.

Keep this document focused on current state.

Do not use it as:

- a chronological development diary,
- a Git changelog,
- a task tracker,
- a raw test report,
- a copy of the architecture document,
- or a dump of temporary implementation notes.

---

## 6. Handling Stale Implementation Documentation

This document is a guide to verified current behavior, not an authority above the repository itself.

If this document materially disagrees with:

- current code,
- schema,
- configuration,
- tests,
- or directly observed runtime behavior,

investigate the discrepancy.

Determine whether:

- the implementation changed,
- this documentation became stale,
- verification evidence is outdated,
- or the implementation itself is incorrect.

Do not silently assume either the documentation or code is correct.

Once the actual current state is established, update the appropriate source.

Obsolete implementation descriptions should be updated or removed rather than preserved as active current behavior.

Git retains historical versions.

---

## 7. First Future Update

The first meaningful product update to this document will likely occur after:

`RT-001 — Initialize Next.js Application`

has been implemented and sufficiently verified.

At that point, this document may begin describing verified foundation behavior such as:

- the Next.js application exists,
- the application runs locally,
- the initial route renders,
- TypeScript is functioning,
- Tailwind is functioning,
- and the production build succeeds.

Only describe those behaviors after the relevant verification has actually occurred.