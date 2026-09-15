# ReviewTap

ReviewTap is an NFC-powered customer feedback and review-engagement platform for local businesses.

A physical NFC card opens a ReviewTap-controlled customer experience where customers can provide private feedback, optionally share contact information, and access the business's Google Review page.

When customers write feedback, ReviewTap can help them reuse their own words by copying the comment before opening the Google Review experience. The customer remains responsible for choosing their Google star rating, editing or pasting the text, and manually publishing the review.

Google Review access is not restricted by the customer's internal ReviewTap rating or by whether the customer submits private ReviewTap feedback.

---

## Current Status

ReviewTap is currently in the repository and development-foundation stage.

Product functionality has not yet been implemented.

The repository currently contains:

- V1 product requirements,
- intended V1 architecture,
- durable product and technical decisions,
- implementation task planning,
- global AI-agent instructions,
- context routing,
- and a lightweight Plan → Build → Verify ICM workflow.

The next application-development task is:

`RT-001 — Initialize Next.js Application`

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

Before beginning application implementation:

1. complete the repository consistency review,
2. stress-test the ICM with Codex,
3. inspect the final Git diff,
4. commit the repository foundation,
5. push the clean checkpoint to GitHub,
6. then begin `RT-001`.