# RT-003 — Environment and Secret Handling Plan

## Human Review Summary

### Mike's Next Actions

1. Review and approve the proposed convention and narrow Build scope.
2. Authorize Build separately if the plan is acceptable.

Do not create a Supabase project or provide credentials during RT-003.

### Decisions for Mike to Approve

- Approve a two-file convention change: make the exact path `.env.example` trackable in `.gitignore`, and document the environment rules in `README.md`. This uses standard Git and Next.js behavior without adding application code or dependencies.
- Approve deferring creation of `.env.example` and all exact Supabase variable names to RT-010. No environment variables are required today, so an empty template would not yet communicate a real configuration contract.

### Learn Before Build

#### Must Understand Before Build

- `.env.local` is the intended root-level file for developer-specific local values. It stays untracked and may contain secrets.
- A `NEXT_PUBLIC_` prefix tells Next.js to make a value available to browser code. That prefix is an exposure decision, not merely a naming style, and must never be applied to a secret.
- `.gitignore` prevents ordinary addition of matching untracked files; it does not protect a value that is already tracked or deliberately force-added. An exposed credential must be revoked or rotated, and Git history may also need remediation.

#### Can Learn During Build

- How ordered Git ignore rules let a narrow `!.env.example` exception override the broader `.env*` rule for that exact safe template path.
- How `git check-ignore` and `git ls-files` test ignore and tracking behavior without placing credentials in the repository.

#### Not Needed Yet

- Supabase project setup, client creation, SDK configuration, Row Level Security implementation, deployment secrets, and runtime environment validation.

### Current Blockers

None.

### Approval Checklist

- [ ] The local convention is `.env.local` at the repository root.
- [ ] Real values and all secret-bearing `.env*` files remain untracked.
- [ ] Only the exact safe template path `.env.example` is allowed to be tracked.
- [ ] Server-only is the default; `NEXT_PUBLIC_` is used only for values intentionally safe and necessary in browser code.
- [ ] RT-010, not RT-003, will define the actual Supabase variable names and create the useful template.
- [ ] Build is limited to `.gitignore`, `README.md`, and the required RT-003 task-state transition.
- [ ] Verification is Git-focused; no runtime checks or Supabase work are needed.

## Objective

Establish the smallest safe, durable environment-variable convention ReviewTap needs before RT-010 introduces Supabase configuration. The convention must keep real credentials out of Git, distinguish browser-visible configuration from server-only configuration, and give RT-010 an obvious place to record its actual configuration contract.

## Current State

Repository evidence inspected:

- `docs/TASKS.md` names RT-003 as the next task; RT-010 is `NOT STARTED` and depends on RT-003.
- `git status --short` was empty before Plan changes.
- `HEAD`, local `main`, and `origin/main` all pointed to the same roadmap-maintenance commit (`41db0f7`), and no commit matching RT-003 was present.
- No `.env*` file exists at the repository root, and `git ls-files` reports no tracked environment-like file.
- No application code reads `process.env`, uses a `NEXT_PUBLIC_` name, or contains Supabase configuration.
- `.gitignore` currently contains `.env*`. Direct `git check-ignore -v --no-index` probes confirmed that it ignores `.env`, `.env.local`, environment-specific variants, and `.env.example`.
- `package.json` contains only the existing Next.js/React/Tailwind/TypeScript/ESLint foundation. No Supabase or environment-validation dependency exists.
- `next.config.ts` contains no environment configuration.
- `tsconfig.json` contains no custom environment typing or wrapper convention.
- `docs/ARCHITECTURE.md` already says authoritative or sensitive work belongs on trusted server boundaries, secrets must not reach browser code, and elevated Supabase credentials must remain server-only.
- accepted decision D-013 in `docs/DECISIONS.md` already establishes that browser code cannot be trusted with sensitive credentials and that secrets remain server-only.
- `docs/IMPLEMENTATION.md` confirms Supabase integration and other product workflows do not yet exist.
- The current application is a static foundation with no configuration requirement.

Conclusion: no unintended RT-003 implementation is present. The repository is still at the pre-RT-003 state described by its durable documents.

The current `.env*` rule is sufficient to prevent ordinary tracking of real local environment files. It is not sufficient if ReviewTap wants a conventional tracked `.env.example`, because it ignores that safe path too.

## Requirements

- Use a root-level `.env.local` file for developer-specific local configuration once local values exist.
- Keep `.env`, `.env.local`, environment-specific variants, and other secret-bearing `.env*` files ignored.
- Reserve `.env.example` as the only trackable `.env*` path and use it, once real requirements exist, as the canonical list of required variable names with empty or unmistakably non-secret placeholders.
- Treat environment variables as server-only by default.
- Use the Next.js `NEXT_PUBLIC_` prefix only when a value must be used by browser code and is safe for anyone using the browser to obtain.
- Never give a secret a public prefix merely to make it convenient for a Client Component.
- Keep future elevated Supabase credentials, database connection strings, signing secrets, administrative keys, and comparable privileged values server-only.
- State clearly that ignore rules are preventative and do not undo an already committed disclosure.
- Leave RT-010 a durable rule for where local values and the tracked variable manifest belong.

The official Next.js environment guide supports the framework conventions used here: root `.env*` loading, `NEXT_PUBLIC_` browser bundling, and keeping local environment files out of version control: <https://nextjs.org/docs/pages/guides/environment-variables>.

## Non-Goals

- Creating or configuring Supabase.
- Choosing current Supabase products, SDKs, clients, or exact variable names.
- Adding real credentials or realistic credential-shaped examples.
- Installing dependencies.
- Adding application configuration modules, environment wrappers, schemas, runtime validation, or TypeScript environment declarations.
- Modifying `next.config.ts` to inject environment variables.
- Creating routes, application features, database schema, authentication, deployment configuration, or Vercel secrets.
- Repairing unrelated documentation, including stale task wording elsewhere in `README.md`.

## Constraints

- This is Plan only; Build requires Mike's later authorization.
- Standard Git and Next.js behavior should carry the convention.
- A browser-exposed value is public even if its name includes words such as `key` or `token`; exposure is governed by the trust boundary, not the label.
- Next.js replaces `NEXT_PUBLIC_` references in browser bundles, so those values cannot be treated as secrets.
- `.gitignore` does not stop `git add -f` and does not untrack an already tracked file.
- No current runtime behavior requires environment validation or a configuration abstraction.
- Exact Supabase names should be selected in RT-010 against its actual client/server design and then-current Supabase guidance, rather than guessed in RT-003.

## Proposed Approach

1. Keep the broad `.env*` ignore rule and add one immediately following exception:

   ```gitignore
   .env*
   !.env.example
   ```

   Ordering matters: the later rule re-allows only the exact `.env.example` path. Files such as `.env.local`, `.env.production`, and `.env.example.local` remain ignored.

2. Add a concise `Environment configuration` subsection to `README.md` under local development. It should state:

   - ReviewTap currently requires no environment variables;
   - future local values belong in root `.env.local` and must not be committed;
   - `.env.example`, once RT-010 creates it, is the tracked manifest of required names and safe placeholders only;
   - unprefixed variables are the server-only default;
   - `NEXT_PUBLIC_` is reserved for intentionally browser-visible, non-secret values;
   - ignore rules do not repair a committed leak, which requires revocation/rotation and possible history remediation.

3. Do not create `.env.example` during RT-003. A template with no required variables would add a file without a useful current contract. RT-010 should create it when it introduces the first actual variable names.

4. Do not add a new decision record. The durable security boundary already exists in D-013 and `docs/ARCHITECTURE.md`; `README.md` will own the practical developer convention.

This is simpler than a config module or validation library and gives the next task a clear, verifiable path without guessing at future Supabase details.

## Impacted Areas

Expected during Build:

- `.gitignore` — add the exact `.env.example` exception while retaining broad protection for real environment files.
- `README.md` — document the local file, tracked-template, public/server boundary, and leak-response conventions.
- `docs/TASKS.md` — only the normal RT-003 status transition required by the workflow.

Expected during this Plan stage:

- `docs/TASKS.md` — set RT-003 to `PLANNING` and keep the Current Priority statement consistent.
- `icm/01_plan/output/rt-003-environment-secret-handling-plan.md` — this plan.

Must remain unchanged during Build:

- `package.json` and `package-lock.json`;
- `next.config.ts` and `tsconfig.json`;
- application source under `app/`;
- `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`, and `docs/IMPLEMENTATION.md`;
- RT-010 and later task statuses;
- Supabase, database, authentication, deployment, and external-service state.

## Acceptance Criteria

- `git check-ignore` proves `.env`, `.env.local`, `.env.development`, `.env.production.local`, and `.env.example.local` remain ignored.
- `git check-ignore` proves the exact `.env.example` path is not ignored and can therefore be tracked when RT-010 creates it.
- `git ls-files -- '.env*'` shows no real local environment file is tracked.
- Repository inspection finds no real secret or credential-shaped placeholder introduced by RT-003.
- The developer documentation identifies `.env.local` as the untracked location for real local values and `.env.example` as the future tracked variable-name manifest.
- The documentation makes server-only the default and explains that `NEXT_PUBLIC_` means intentional browser exposure.
- The documentation states that Git ignore rules do not erase or secure already committed credentials.
- No application code, dependency, environment wrapper, runtime validation, Supabase connection, or deployment configuration is introduced.
- RT-010 can determine from current durable repository state where to place local values, where to list required names, and how to classify public versus secret values.

## Implementation Steps

1. Change RT-003 from `PLANNING` to `BUILDING` when Mike explicitly authorizes Build; do not alter RT-010.
2. Add `!.env.example` immediately after `.env*` in `.gitignore`.
3. Add the concise environment convention to the `README.md` local-development section, including that no variables are currently required.
4. Inspect the scoped diff and confirm no template, credentials, application code, dependencies, or unrelated cleanup were added.
5. Run the planned Git-focused checks and hand the result to the appropriate verification workflow.

## Verification Plan

Build should use lightweight repository checks because no runtime behavior changes:

1. Run `git check-ignore -v --no-index` against representative real environment paths and confirm the `.env*` rule ignores them.
2. Probe `.env.example` with `git check-ignore --no-index` and confirm it is not ignored after the exception. The expected non-match exit code is evidence, not a command failure.
3. Run `git ls-files -- '.env*'` and inspect any result; no real environment file may be tracked.
4. Search the scoped diff for credential-like content and inspect every changed line manually.
5. Run `git diff --check`.
6. Run `git status --short`.
7. Review `git diff -- .gitignore README.md docs/TASKS.md` plus the RT-003 task artifacts.

Lint, type-check, runtime testing, and production build are not required because the planned Build does not modify executable application behavior.

## Risks / Unknowns / Decision Candidates

- The main residual risk is misunderstanding `.gitignore` as a complete secret-control system. Documentation and Git checks reduce accidental commits, but developers must still inspect staged changes and rotate any credential that is exposed.
- `NEXT_PUBLIC_` communicates exposure but does not prove a value is safe. RT-010 must classify each value before naming it.
- Supabase's recommended key terminology and client setup may evolve. Deferring exact names avoids encoding stale or unused configuration.
- Decision candidate for Mike: approve leaving `.env.example` absent until RT-010 has actual required names. Recommendation: approve, because it avoids a placeholder-only file while the `.gitignore` exception and README establish the contract now.

## RT-010 Handoff

RT-010 should inherit these durable rules from `.gitignore` and `README.md`:

1. Put real developer values in root `.env.local`; do not commit that file.
2. Create the now-trackable root `.env.example` when the first Supabase variables are selected.
3. List every required variable name in `.env.example` using empty or unmistakably non-secret placeholder values; never copy real values into it.
4. Choose exact names from RT-010's actual Supabase client/server design and current official Supabase guidance.
5. Leave variables unprefixed and server-only unless browser code genuinely requires the value and disclosure is safe.
6. Use `NEXT_PUBLIC_` only for intentionally public values. Never expose elevated, secret, service-role, administrative, signing, or direct database credentials.
7. Add or remove a variable from `.env.example` in the same change that adds or removes the application's requirement for it, so developers can discover the current configuration contract without reading old ICM history.
8. Verify ignore and tracking behavior before staging or committing.

RT-010 should not need this Plan artifact as permanent context once the Build has placed those rules in the durable repository files.
