# RT-002 — Establish Application Folder Conventions Plan

## Human Review Summary

### Mike's Next Actions

1. Approve or reject the recommendation to keep the existing application structure unchanged and defer `components/`, `lib/`, and `types/` until real code requires them.
2. Authorize Build only if the scope, acceptance criteria, and verification approach below are acceptable.

### Decisions for Mike to Approve

- **Recommendation:** Treat the current root `app/` directory as the complete application-code structure needed for RT-002. Do not move current files or create `components/`, `lib/`, `types/`, `src/`, or placeholder files. The current code has no reusable UI, non-UI application logic, data-access behavior, or shared type contracts that justify those areas yet.

This is approval of the RT-002 implementation approach, not a new durable architecture decision. The existing architecture already establishes that directories should be created only when implementation requires them.

### Learn Before Build

#### Must Understand Before Build

- A directory boundary should represent a current responsibility. Creating an empty directory does not establish a useful architecture; it only predicts one.
- Next.js App Router requires `app/` for the current routes and layouts. It does not require ReviewTap to create root-level `components/`, `lib/`, or `types/` directories before code needs them.

#### Can Learn During Build

- How the tracked file tree and Git diff can prove that the current application already conforms to the accepted minimal convention.

#### Not Needed Yet

- Reusable component organization, domain/data-access module organization, and shared type placement can be learned when future tasks introduce the code that needs those boundaries.

### Current Blockers

None.

### Approval Checklist

- [x] Approve keeping the current `app/` files in place.
- [x] Approve deferring `components/`, `lib/`, `types/`, and `src/`.
- [x] Confirm that RT-002 should not change application behavior, dependencies, configuration, or UI.
- [x] Confirm that repository inspection and scoped diff review are sufficient verification when Build makes no application changes.

## Objective

Establish the smallest coherent application folder convention supported by ReviewTap's current implementation, without creating speculative directories, moving working files, or absorbing future feature work.

## Current State

The tracked application code consists of:

- `app/layout.tsx`, which owns the shared HTML document shell and root metadata;
- `app/page.tsx`, which owns the current root placeholder route; and
- `app/globals.css`, which owns the current global Tailwind import and base styles.

The repository does not contain tracked `components/`, `lib/`, `types/`, or `src/` directories. It also does not contain reusable UI components, domain/application utilities, database access, authentication logic, route-specific business behavior, or shared TypeScript contracts that need those directories.

`tsconfig.json` maps `@/*` to the repository root, which already supports imports from `app/` and any future root-level directories without a configuration change.

Local generated directories and files such as `.next/`, `node_modules/`, `next-env.d.ts`, and `tsconfig.tsbuildinfo` are ignored development artifacts, not application-organization boundaries.

The current repository and `docs/IMPLEMENTATION.md` agree about the implemented application foundation. `docs/ARCHITECTURE.md` already describes the likely responsibilities of `app/`, `components/`, `lib/`, and `types/`, while explicitly requiring directories to be created only when implementation needs them.

## Requirements

- Base the convention on the current tracked code and accepted architecture.
- Keep `app/` responsible for Next.js App Router routes, layouts, route-level files, and the existing global stylesheet.
- Create another application directory only when current code has a concrete responsibility that belongs there.
- Keep the result understandable without introducing speculative layers.
- Preserve the current placeholder page and verified RT-001 foundation.

## Non-Goals

RT-002 will not introduce:

- Supabase, database code, environment variables, or secret handling;
- authentication or authorization;
- NFC card routing or interaction sessions;
- feedback, Google Review, dashboard, or other product functionality;
- new product UI or a redesign of the placeholder page;
- new dependencies;
- services, repositories, controllers, or other speculative abstractions;
- unrelated refactors; or
- work assigned to RT-003 or later tasks.

## Constraints

- ReviewTap remains one Next.js App Router application.
- The existing server/client, UI/domain/data-access, and product boundaries remain authoritative, but they do not require empty directories.
- Reusable components should be introduced only when a real reusable UI responsibility exists.
- Focused domain, application, or data-access modules should be introduced only when real non-UI behavior exists.
- Shared types should be extracted only when a type is genuinely shared across meaningful module boundaries.
- No empty directories or placeholder files should be created to preserve a possible future structure.
- Plan does not modify application implementation or mark RT-002 ready to build or complete.

## Proposed Approach

Adopt the current structure without application changes:

- Keep `app/` as the only application-code directory currently justified.
- Keep `app/layout.tsx`, `app/page.tsx`, and `app/globals.css` in their current locations and responsibilities.
- Defer `components/` until an actual reusable UI component exists. A component used only by one route may initially be colocated with that route when that keeps ownership clearer.
- Defer `lib/` until ReviewTap has focused non-UI domain, application, server, or data-access behavior. Do not pre-create service or repository layers.
- Defer `types/` until a TypeScript contract is shared across meaningful module boundaries and has no clearer owning module.
- Do not introduce `src/`; moving the small existing tree would add churn without improving responsibility boundaries.
- Leave the root import alias and all application configuration unchanged.

The organizational problem is therefore not misplaced current code. It is avoiding premature structure while establishing a clear trigger for future directories: create them alongside the first real code whose responsibility they express.

## Impacted Areas

### Plan-stage changes

- `docs/TASKS.md`: change RT-002 from `NOT STARTED` to `PLANNING`.
- `icm/01_plan/output/rt-002-application-folder-conventions-plan.md`: record this task-specific plan.

### Expected Build-stage application changes

None, provided the repository structure remains materially unchanged before Build.

### Areas to inspect during Build and Verify

- tracked repository tree;
- `app/layout.tsx`;
- `app/page.tsx`;
- `app/globals.css`;
- `tsconfig.json`;
- `package.json`; and
- scoped Git diff and task state.

### Areas that should remain untouched

- application source and behavior;
- dependencies and package scripts;
- Next.js, TypeScript, Tailwind, and ESLint configuration;
- product, architecture, implementation, and decision documents;
- RT-003 and later task scope.

## Acceptance Criteria

1. `app/` remains the only application-code directory currently required, containing the existing root layout, root page, and global stylesheet in their current locations.
2. No empty or placeholder `components/`, `lib/`, `types/`, `src/`, service, repository, or controller structure is added.
3. No current application file is moved because the existing files already match their App Router responsibilities.
4. The accepted convention clearly defers reusable UI, non-UI application/domain/data-access code, and shared types until actual implementation requires those boundaries.
5. Application behavior, placeholder UI, configuration, package scripts, dependencies, and generated-file handling remain unchanged.
6. RT-003 and later product tasks remain out of scope.
7. The Build and Verify diffs contain no unapproved application or durable-documentation changes.

## Implementation Steps

After Mike authorizes Build:

1. Reinspect the tracked repository tree to ensure the planning assumptions remain current.
2. Confirm that the existing `app/` files still have the responsibilities described in this plan.
3. Make no application file, directory, dependency, configuration, or durable-documentation changes if the current structure remains unchanged.
4. Do not create deferred directories or placeholder files.
5. Record a concise Build handoff explaining that the accepted convention is already satisfied by the current application structure and identifying any repository change that would invalidate that conclusion.
6. Update RT-002 task state only as appropriate for the authorized Build workflow; do not change RT-003 or later tasks.

If repository evidence changes before or during Build and introduces a real organizational need, stop and return to Plan rather than expanding RT-002 implicitly.

## Verification Plan

Verify should:

1. inspect the tracked file tree and confirm that the accepted minimal structure is present;
2. inspect the scoped Git diff and confirm that no application files, configuration, dependencies, or unrelated durable documentation changed;
3. confirm that no empty or placeholder deferred directories were introduced;
4. confirm that `app/layout.tsx`, `app/page.tsx`, and `app/globals.css` retain their existing responsibilities and behavior; and
5. compare the result against every acceptance criterion and record PASS, PASS WITH LIMITATIONS, FAIL, or BLOCKED.

Because the proposed Build changes no application code or configuration, repeating RT-001 runtime, lint, type-check, or production-build checks would not provide meaningful new evidence unless the Build diff unexpectedly affects those areas.

## Risks and Open Questions

### Risks

- The main risk is treating visible folders as progress and creating structure before responsibilities exist. The plan avoids that by tying every future directory to real code.
- A future task may justify a directory quickly. Deferral is intentional and does not prohibit creating the directory when that need appears.

### Open Questions

None.

### Durable Decision Candidates

None. The existing architecture and decisions already establish a single application, deliberate internal boundaries, and avoidance of premature abstraction. RT-002 applies those rules to the current repository rather than creating a new durable rule.
