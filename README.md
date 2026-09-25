# ReviewTap

ReviewTap is an NFC-powered customer feedback and review-engagement platform for local businesses.

A physical NFC card opens a ReviewTap-controlled customer experience where customers can provide private feedback, optionally share contact information, and access the business's Google Review page.

When customers write feedback, ReviewTap can help them reuse their own words by copying the comment before opening the Google Review experience. The customer remains responsible for choosing their Google star rating, editing or pasting the text, and manually publishing the review.

Google Review access is not restricted by the customer's internal ReviewTap rating or by whether the customer submits private ReviewTap feedback.

---

## Current Status

ReviewTap now has a verified application foundation.

Product functionality has not yet been implemented.

The repository currently contains:

- V1 product requirements,
- intended V1 architecture,
- durable product and technical decisions,
- implementation task planning,
- global AI-agent instructions,
- context routing,
- a lightweight Plan → Build → Verify ICM workflow,
- and a runnable Next.js application with TypeScript, Tailwind CSS, and ESLint.

The completed application-foundation task is:

`RT-001 — Initialize Next.js Application`

RT-001 passed independent verification. The next planned task is `RT-002 — Establish Application Folder Conventions`.

---

## Local Development

ReviewTap uses Node.js 24 LTS and npm.

### Environment configuration

ReviewTap currently requires no environment variables. When local configuration is introduced, real developer-specific values belong in `.env.local` at the repository root. `.env.local` and other secret-bearing `.env*` files must not be committed.

RT-010 will create `.env.example` as the tracked manifest of required environment-variable names when actual Supabase requirements exist. That file must contain only empty or unmistakably non-secret example values.

Environment variables are server-only by default. Use the `NEXT_PUBLIC_` prefix only for values that genuinely need to be available in browser code and are safe for any site user to obtain. Never give a secret this prefix merely for convenience.

Git ignore rules prevent ordinary accidental tracking; they do not repair a secret that was already committed. Treat a committed credential as exposed, revoke or rotate it, and assess whether Git history also requires remediation.

Install the locked dependencies:

```powershell
npm.cmd ci
```

Start the development server:

```powershell
npm.cmd run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Run the project checks:

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

---

## Planned V1 Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- PostgreSQL
- Supabase Auth
- Vercel
- Git and GitHub

---

## Core V1 Customer Flow

Conceptually:

NFC Card
→ ReviewTap Card Entry
→ Interaction Session
→ Customer Experience

From there, the customer may:

### Private Feedback Path

ReviewTap rating
→ optional written feedback
→ optional contact information
→ submit private feedback
→ optional Google Review action

### Direct Google Review Path

Skip private ReviewTap feedback
→ continue to Google Reviews

### Feedback Reuse Path

Write ReviewTap feedback
→ copy customer-authored comment
→ open Google Review experience
→ customer chooses rating and manually publishes

ReviewTap does not automatically submit Google Reviews or choose Google star ratings for customers.

---

## Project Documentation

The durable project documents are:

- `docs/V1_SPEC.md` — what ReviewTap V1 should do
- `docs/ARCHITECTURE.md` — how V1 is intended to be structured
- `docs/DECISIONS.md` — durable product and technical decisions
- `docs/TASKS.md` — planned and active implementation work
- `docs/IMPLEMENTATION.md` — meaningful functionality that is actually implemented and verified

---

## Development Workflow

ReviewTap uses a lightweight ICM workflow:

`Plan → Build → Verify`

The workflow is intentionally proportional to the task.

Not every change requires every stage.

Repository-level agent behavior is defined in:

`AGENTS.md`

Context routing is defined in:

`CONTEXT.md`

Stage-specific workflow guidance lives in:

- `icm/01_plan/CONTEXT.md`
- `icm/02_build/CONTEXT.md`
- `icm/03_verify/CONTEXT.md`

The goal is to keep AI-assisted development focused, reviewable, verifiable, and useful as a software-engineering learning process.

---

## Current Priority

Review the verified RT-001 application foundation, then begin RT-002 when ready.
