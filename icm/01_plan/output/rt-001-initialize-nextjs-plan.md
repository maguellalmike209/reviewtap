# RT-001 — Initialize Next.js Application: Plan

**State:** Plan prepared; awaiting Mike's approval. Build is not authorized.
**Date:** 2026-09-14 (America/Los_Angeles).
**Task:** [RT-001](../../../docs/TASKS.md).

## Human Review Summary

Create ReviewTap's first runnable application: one simple, styled page with development and production checks. The technical scope below is unchanged. No application work has begun.

### Mike's Next Actions

1. **Now:** Read this summary and use the checklist to review the proposed Build. Consult the technical sections below where you want more detail.
2. **Now:** Approve the Plan for Build, or identify changes you want. No installation or terminal work is required to review this revision.

**Later, after approval:** Codex will diagnose the Node/npm environment, check package compatibility, prepare and inspect the scaffold, and perform the planned checks. If a normal Node.js installation is needed, Mike will perform that visible setup step before scaffolding; Codex will explain it when the diagnosis establishes the need.

### Decisions for Mike to Approve

- **Authorize the RT-001 Build and its dependency scope.** Recommendation: approve the minimal application and listed supporting tools, including ESLint for code checks. This supplies the runnable foundation and evidence RT-001 requires. The single Next.js application, TypeScript, and Tailwind stack are already accepted project decisions. The root folder choice and generator options below are contained implementation recommendations; they do not need separate approval votes.

### Learn Before Build

#### Must Understand Before Build

- **What installing the toolchain and packages means.** Understand that Node runs development tools, npm downloads dependencies and runs project commands, and the proposed Build will execute those tools on your computer. You do not need to know their command syntax yet. A working Node command alone does not prove npm is available. [About npm](https://docs.npmjs.com/about-npm/).
- **What completion will demonstrate.** Understand that this task delivers a placeholder application, and that development rendering, production rendering, type checking, and linting provide different evidence. A successful build does not establish that ReviewTap's future customer features work. You only need to understand these distinctions before approval; interpreting the output can happen during Build. See the [verification plan](#acceptance-criteria-and-verification-plan).

#### Can Learn During Build

- How `app/page.tsx` and `app/layout.tsx` become a page, and why this static page needs no Client Component.
- How `package.json`, its scripts, and `package-lock.json` work together.
- How TypeScript, ESLint, Tailwind, and the development/production commands behave when run.

The retained [concept reference notes](#concept-reference-notes-for-build) include official links and ways to inspect each concept in the implementation.

#### Not Needed Yet

- Supabase setup, database design, authentication, NFC routing, and Google Review handoff details. Those belong to later tasks and are excluded from RT-001.

### Current Blockers

- **Build authorization is pending.** Next step: Mike reviews this Plan and explicitly approves Build. This revision does not grant that approval.

No other issue prevents beginning the planned environment diagnosis after approval. npm was unavailable in the inspected session, so scaffolding and installation must wait until it works. The next diagnostic is to check Node/npm/npx command resolution and versions in Mike's terminal and the agent session, as specified in Build step 2. Package availability and compatibility checks remain pre-scaffold checks in the detailed plan, not confirmed blockers.

### Approval Checklist

- [ ] I approve the minimal application and supporting dependency/tooling scope; product features, deployment, commits, and pushes remain outside this Build.
- [ ] I understand what installing and running the tools entails and what the planned checks will demonstrate.
- [ ] I understand that environment diagnosis comes first; npm must work before scaffolding or dependency installation, and any required system setup remains a visible step for me.
- [ ] I accept the completion evidence: the initial page and Tailwind styling work in development and production, type/lint checks pass, dependency installation is reproducible, and the repository foundation is preserved.
- [ ] I explicitly authorize moving from Plan to Build after this review.

---

The detailed technical plan follows. Commands are for a later approved Build only.

## Objective and scope

Create a minimal, runnable ReviewTap application in the existing repository root using the accepted Next.js App Router, TypeScript, and Tailwind stack. Success means a simple initial page works in development and production, with the repository's documentation and ICM structure preserved.

This Plan authorizes no execution. The commands below are instructions for a later approved Build.

### Requirements

- One Next.js application at the repository root, package name `reviewtap`.
- A minimal `/` page displaying `ReviewTap` and `Application foundation initialized.` with visible Tailwind styling; this is a development placeholder.
- TypeScript checking, ESLint, local development, and production build/start commands.
- Reproducible npm dependency resolution through `package-lock.json`.
- Preserve the existing project instructions, requirements, decisions, and ICM contexts.

### Non-goals

No Supabase connection, credentials, database, authentication, NFC routes, feedback, Google handoff, dashboard, analytics, deployment, or product UI design. No test framework, component library, formatter, CI, monorepo, or speculative folders. Broader folder conventions remain RT-002; environment-variable conventions remain RT-003. No commits, pushes, or other Git history changes.

## Current state and governing evidence

Read `AGENTS.md`, root `CONTEXT.md`, and only the Plan-stage context. Task-specific evidence: RT-001 and adjacent RT-002/RT-003, `docs/IMPLEMENTATION.md`, README, architecture sections 3 and 35–36, and accepted decisions D-001/D-002. These establish a single application, the approved stack, and deferred selection of testing tools until needed.

Direct inspection found:

| Area | Evidence and implication |
| --- | --- |
| Repository | Eleven tracked Markdown files; no application, package manifest, lockfile, `.gitignore`, or existing application dependencies. Implementation documentation agrees. |
| Git | Working tree was clean before this Plan. `main` and the locally recorded `origin/main` both pointed to `ffe160f02842d8fc0091047caf9ea7d86709ee5b`, titled `chore: establish ReviewTap project and ICM foundation`. No remote fetch was performed. |
| Node.js | `node --version` returned `v24.19.0`, resolving to the bundled runtime at `C:/Users/mague/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe`. |
| npm | `npm --version` failed because the command is unavailable. `npm.cmd` and `npx.cmd` were also not discoverable. Common standalone installation locations inspected did not contain Node/npm. This does not prove npm is absent everywhere on the machine. |
| Git tooling | `git --version` returned `2.51.0.windows.1`. |
| Runtime testing | None: there is no application to run. No generator, install, build, or application test was executed. |

The old Current Priority text in TASKS and README described foundation work before RT-001. Mike's explicit request now starts real RT-001 planning. TASKS is updated accordingly. The commit supports a foundation checkpoint, but does not independently prove every historical review/stress test or the live remote state. README remains unchanged during Plan; reconcile its priority/status wording during approved Build without inventing historical results.

## Proposed approach and implementation choices

| Choice | Proposal and reason |
| --- | --- |
| Framework version | Baseline Next.js/create-next-app **16.3.5**, the version displayed by the official docs inspected for this Plan. Before execution, confirm both exact releases exist and inspect their engine requirements. Use stable compatible packages; no canary selection. |
| Runtime | A normal developer installation of **Node.js 24 LTS with npm** usable from Mike's terminal and this session. The available bundled Node meets Next.js's documented minimum, but a Node executable alone does not supply npm. |
| Package manager | npm, with one `package-lock.json`; no alternate package manager or global framework installation. Fits RT-001's learning focus and the normal Node toolchain. |
| Source location | Root `app/`, no `src/`. This follows the architecture's initial example and avoids an extra layer. Only create folders actually used; broader conventions remain RT-002. |
| Scaffold | Official `create-next-app`, with explicit options, generated into `.rt-001-scaffold/reviewtap` and copied selectively to the root. The extra review step avoids existing-file conflicts in this populated repository. |
| Styling | Tailwind 4 through its PostCSS integration. Use the generated compatible configuration, a system font, and a few static utility classes. No font download or external imagery is necessary for this placeholder. |
| Quality tooling | ESLint with Next.js's configuration plus TypeScript strict checking. These catch different classes of mistakes and justify the small development-tool dependency set. |
| Optional features | Keep the standard Turbopack setup; disable React Compiler for this initial static page. Keep alias `@/*`. Disable generated agent files and Git initialization. |

The official [installation guide](https://nextjs.org/docs/app/getting-started/installation) documents Windows support, Node >=20.9, and separate development/build/start commands. Its Next.js 16 guidance requires a separate lint run. The [generator reference](https://nextjs.org/docs/app/api-reference/cli/create-next-app) documents the explicit options, including `--skip-install`, `--disable-git`, and negated defaults. The [Tailwind integration guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs) describes the PostCSS plugin and CSS import. [Node's official download page](https://nodejs.org/en/download) identifies the 24 LTS line.

### Dependency boundary

Expected runtime dependencies: `next`, `react`, and `react-dom`. Expected development dependencies: `typescript`, relevant `@types/node`, `@types/react`, `@types/react-dom`, `eslint`, `eslint-config-next`, `tailwindcss`, `@tailwindcss/postcss`, and `postcss` where required by the template. Retain compatible versions from the pinned generator and record actual resolved versions during Build. React is required by Next.js; types, linting, and CSS tooling support the accepted stack. Transitive packages are captured by the lockfile.

Inspect the manifest before installing. An unexpected substantial direct dependency needs explanation and review; do not accept new tools just because the generator offers them. Do not use forced dependency upgrades to suppress errors. Approval of this Plan covers the listed application/tooling dependencies, subject to compatibility checks.

## Ordered Build sequence — after approval only

1. **Enter Build deliberately.** Read the Build context and this accepted Plan; inspect current Git status and files again. Preserve new user changes. Change RT-001 to BUILDING when implementation begins.
2. **Resolve the environment prerequisite.** In Mike's regular PowerShell terminal and the agent session, inspect command resolution and run `node --version`, `npm.cmd --version`, and `npx.cmd --version`. If npm exists elsewhere, resolve the PATH/session issue. Otherwise Mike installs Node.js 24 LTS with npm from the official site as a visible setup step, then restarts terminals as needed. Do not automatically install system software, edit machine-wide PATH, or change PowerShell execution policy. Using `.cmd` avoids reliance on the npm PowerShell wrapper. Record working versions and locations before continuing.
3. **Confirm the pinned generator.** Run `npm.cmd view create-next-app@16.3.5 version engines --json` and `npm.cmd view next@16.3.5 version engines --json`. After Build approval, `npx.cmd --yes create-next-app@16.3.5 --help` may download/run the generator; confirm all options below. If the version is unavailable, incompatible, or materially changes these options/dependencies, revise the version choice before scaffolding. Do not silently substitute `latest`.
4. **Generate separately.** Confirm `.rt-001-scaffold` does not already exist. From the repository root, run:

   ```powershell
   npx.cmd --yes create-next-app@16.3.5 .rt-001-scaffold/reviewtap --ts --tailwind --eslint --app --no-src-dir --no-react-compiler --turbopack --import-alias "@/*" --use-npm --skip-install --disable-git --no-agents-md --yes
   ```

   The staging folder keeps the package name `reviewtap` while protecting existing files. `--skip-install` defers application dependencies; npx itself still downloads/runs the generator. No generator command runs during Plan.
5. **Review and integrate an explicit file list.** Inspect generated files, especially `package.json`, config, README, and any instruction files. Copy only the application/configuration files listed below after checking destinations for collisions. Never copy generated README, agent instructions, `.git`, or an entire directory blindly into the root. Do not move existing project docs out of the way to satisfy the generator.
6. **Keep the initial application minimal.** Set package name `reviewtap` and `private: true`. Replace starter marketing content with the specified heading and message; use a semantic `main`, a single heading, and visible spacing/type/color utilities. Set ReviewTap page metadata and `lang="en"`. Use a system font, remove unused starter assets/font imports, and import the global Tailwind stylesheet from the root layout. Keep Server Components as the default; no client boundary is needed. Retain strict TypeScript and ensure type errors are not ignored.
7. **Finish tooling and install.** Ensure scripts: `dev: next dev`, `build: next build`, `start: next start`, `lint: eslint .`, and `typecheck: next typegen && tsc --noEmit`. Inspect `.gitignore` for `node_modules/`, `.next/`, environment files, and generated type/cache artifacts. Install once in the repository root using `npm.cmd install`; inspect the manifest and lockfile and record dependency/installation findings. No credentials are needed.
8. **Remove only task-owned staging output.** After integration, resolve the staging directory's absolute path and verify it is the exact `.rt-001-scaffold` created inside this repository before any recursive removal. Never delete a pre-existing directory. Confirm no staging output or nested repository appears in the final diff.
9. **Perform Build's preliminary checks and hand off.** Use the checks below, record actual evidence and limitations, inspect the complete diff, and update README with accurate setup/run commands. Hand off to the later Verify stage under its own context. Do not mark COMPLETE or describe behavior as verified in IMPLEMENTATION until sufficient verification exists. Promote accepted lasting tooling/runtime conventions into DECISIONS if appropriate; no architectural redesign is proposed.

## Impact map

| Area | Expected Build impact |
| --- | --- |
| `app/page.tsx`, `app/layout.tsx`, `app/globals.css` | Minimal root page, document shell/metadata, Tailwind styles. A generated favicon is optional and should be inspected. |
| `package.json`, `package-lock.json` | Dependencies and commands; exact installed dependency tree. |
| `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs` | Minimal scaffold settings; actual generator filenames take precedence when equivalent. |
| `.gitignore` | Exclude installed packages, build output, caches, and local secrets. No actual environment file is needed. |
| `next-env.d.ts`, `.next/`, `node_modules/`, TypeScript cache files | Generated local artifacts; follow the scaffold's supported generation/ignore conventions. Do not manually edit generated declarations. |
| `README.md`, `docs/TASKS.md` | Setup/status updates reflecting the work actually completed. Preserve README's product and workflow content. |
| `docs/IMPLEMENTATION.md`, `docs/DECISIONS.md` | Later verified foundation summary / accepted lasting tooling choices, only at the appropriate handoff. |
| Instructions, contexts, V1 spec, architecture | Preserve content. No generated replacement instructions or new process layers. |

The only changes made during this Plan are TASKS and this artifact. No Build or Verify artifacts are created now.

## Acceptance criteria and verification plan

These checks are planned, not completed. Build records preliminary results; later Verify independently evaluates the evidence under the Verify-stage rules. No new testing dependency is justified for a static foundation page.

| Acceptance criterion | Evidence to collect after implementation |
| --- | --- |
| A reproducible app exists at the root | Inspect manifest/config; `npm.cmd ci` succeeds from the lockfile during Verify and leaves it unchanged. Confirm package versions with `npm.cmd ls --depth=0`. |
| Development works | Run `npm.cmd run dev -- --hostname 127.0.0.1`; open `/` at the reported local port. Confirm HTTP 200, heading/message, and no application errors in browser console or server output. Save a small text edit and confirm refresh, then restore the intended text. Stop the server. |
| Tailwind actually styles the page | Inspect the browser's computed spacing/font/color for the chosen utility classes, in development and production. Confirm a narrow viewport has no horizontal overflow. Merely finding classes in source is insufficient. |
| TypeScript is active | Inspect strict config and `.tsx` files; `npm.cmd run typecheck` exits successfully. `next typegen` generates route types before the standalone compiler check. No ignored type errors. |
| Linting works | `npm.cmd run lint` succeeds; lint is separate from the production build. |
| Production works | `npm.cmd run build` succeeds, then `npm.cmd run start -- --hostname 127.0.0.1`; revisit `/` and confirm content, loaded CSS, and no application errors. A build alone does not prove browser rendering. Stop the server. |
| Repository foundation survives | Inspect `git diff --check`, tracked diff, and all untracked files. Original instructions/context/spec/architecture remain intact; documentation edits are intentional. No staging tree, nested `.git`, secrets, installed packages, or build output is included. Use `git check-ignore` with synthetic paths to confirm ignore behavior without creating a credential file. |

Use another explicit local port if occupied; do not terminate unrelated processes. If network restrictions, missing native binaries, or other setup failures prevent a check, report the actual failure and its confidence limit. Do not disable checks to get a passing result.

## Risks, prerequisites, and approval boundary

- **npm availability is unresolved.** The next actionable step after approval is terminal/toolchain confirmation, with the Node 24 LTS setup fallback above. An application install cannot proceed with the currently observed toolchain.
- **Generator/package versions can drift.** This Plan pins its baseline from official docs, but registry availability and generated output have not been tested. Recheck before executing; material differences return to Plan.
- **The repository is populated.** Staging plus selective copying protects its documentation and instructions. Inspect the actual generated file list; never assume template output is harmless.
- **Installation requires network and runs package tooling.** No install feasibility or runtime compatibility is claimed from this read-only inspection. Handle permission requests at execution time if needed.
- **Approval scope:** the initialization choices, expected dependency set, minimal page, and later checks above. System-level setup remains a visible Mike-controlled step. Build approval does not authorize Git commits, pushes, deployment, or later product features.

## Concept reference notes for Build

These notes preserve the original explanations and links for use during implementation. Only the understanding identified in the Human Review Summary is required before approval.

- **Node.js and npm:** Node runs JavaScript development tools outside the browser; npm obtains packages and runs project commands. Having `node` available does not establish that `npm` works. Mike can inspect both with the version commands above. [Node download](https://nodejs.org/en/download), [About npm](https://docs.npmjs.com/about-npm/).
- **App Router and components:** `app/page.tsx` supplies `/`; `app/layout.tsx` supplies the shared document shell. Server Components are the default; later interactive UI can introduce Client Components where needed. Inspect these two files and compare them with the browser output. [Layouts and pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages), [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components).
- **Manifest and lockfile:** `package.json` declares dependencies and scripts; `package-lock.json` records resolved versions so a clean install can reproduce the dependency tree. Review both in the diff; `node_modules` is generated locally. [npm lockfile reference](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/).
- **TypeScript, ESLint, and Tailwind:** TypeScript checks code's types; ESLint checks code patterns; Tailwind turns utility classes into CSS. Each needs separate evidence: a type check, a lint run, and browser styling inspection. Type checks do not validate future untrusted customer input at runtime. [TypeScript overview](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html), [Next.js ESLint](https://nextjs.org/docs/app/api-reference/config/eslint), [Tailwind for Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs).
- **Development versus production:** The dev server supports rapid edits; build prepares production output; start serves that output. We need both browser checks because a working dev page alone does not establish production readiness. Mike can run these scripts and inspect their terminal output. [Next.js CLI](https://nextjs.org/docs/app/api-reference/cli/next).

**Plan handoff:** Review these choices, especially the environment prerequisite and dependency boundary. Await Mike's approval; stop here without entering Build.
