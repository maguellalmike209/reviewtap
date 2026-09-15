# ReviewTap Decision Log

## Purpose

This document records durable product and technical decisions that materially affect future ReviewTap work.

Use this document to answer:

> What important choices have already been made, and why?

This is not:

- a chronological development diary,
- a Git changelog,
- a task tracker,
- or a place for temporary implementation notes.

Only record decisions that are likely to matter beyond one small task.

---

## Decision Status

Decisions may use the following statuses:

**Accepted**

The decision currently governs the project.

**Provisional**

The decision is the current direction but is intentionally being tested and may change as the product is validated.

**Superseded**

A later decision replaced this one.

Do not delete superseded decisions.

Preserve the reasoning and point to the decision that replaced them.

---

# D-001 — Use a Single Next.js Application

**Status:** Accepted

## Context

ReviewTap V1 requires:

- public NFC routes,
- customer-facing feedback pages,
- server-side business logic,
- authenticated dashboard pages,
- database interaction,
- and analytics views.

These capabilities can be handled within one modern full-stack web application.

## Decision

ReviewTap V1 will use one Next.js application rather than separate frontend and backend repositories or services.

## Rationale

A single application:

- keeps the system understandable for one developer,
- reduces deployment complexity,
- allows UI and server behavior to share TypeScript,
- works naturally with Vercel,
- and is sufficient for current V1 requirements.

## Consequences

Public pages, dashboard pages, server routes, and application logic will initially live in the same repository.

Internal boundaries should still separate UI, domain behavior, and data access.

## Revisit When

Reconsider only if a genuine technical or organizational need develops for independently deployed services.

---

# D-002 — Initial Technology Stack

**Status:** Accepted

## Decision

The intended V1 stack is:

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- PostgreSQL through Supabase
- Supabase Auth
- Vercel
- Git and GitHub

## Rationale

This stack provides the functionality required for a full-stack V1 without requiring ReviewTap to manage unnecessary infrastructure.

It also gives Mike practical experience with:

- React,
- server/client boundaries,
- TypeScript,
- authentication,
- relational databases,
- responsive UI,
- deployment,
- and Git-based development.

## Consequences

New technologies should not be introduced merely because they are popular or convenient.

A new dependency or platform should solve a real project problem.

## Revisit When

Reconsider individual technologies only when current requirements expose a meaningful limitation.

---

# D-003 — NFC Cards Use a ReviewTap-Controlled URL

**Status:** Accepted

## Context

If a physical NFC card links directly to a Google Review URL, changing the destination may require rewriting the physical card.

ReviewTap also loses the ability to observe and manage the interaction.

## Decision

Each physical NFC card will contain a stable ReviewTap-controlled URL.

Conceptually:

`https://reviewtap.app/r/CARD_PUBLIC_ID`

## Rationale

This allows ReviewTap to:

- resolve the associated business dynamically,
- change business configuration without rewriting the card,
- record card usage,
- control the customer experience,
- and evolve the product after cards have already been deployed.

## Consequences

The ReviewTap card-entry path becomes critical infrastructure.

Public card identifiers must remain stable.

---

# D-004 — Separate Physical Card Identity From Interaction Identity

**Status:** Accepted

## Context

A physical NFC card may be tapped many times.

Using only the card identifier would make it difficult to distinguish one customer interaction from another.

## Decision

ReviewTap will conceptually separate:

**Card identity**

from:

**Interaction/session identity**

A card identifies the physical object.

A session identifies one interaction with that object.

## Rationale

This allows ReviewTap to model:

Card
→ many sessions

and associate individual activity such as:

- feedback submission,
- timestamps,
- and Google Review clicks

with one interaction.

## Consequences

The architecture should support an interaction/session entity rather than attaching all event state directly to the card.

---

# D-005 — Use a Feedback-First Customer Experience

**Status:** Provisional

## Context

The original ReviewTap concept redirected customers directly from NFC to Google Reviews.

The current product direction provides a ReviewTap customer experience first.

## Decision

The current V1 product hypothesis is:

NFC card
→ ReviewTap feedback experience
→ private feedback opportunity
→ optional customer information
→ Google Review opportunity

## Rationale

This creates significantly more product value than a simple redirect.

It allows businesses to receive:

- private feedback,
- ratings,
- customer comments,
- optional contact information,
- and measurable engagement.

It also gives ReviewTap a meaningful customer-facing interface and dashboard product.

## Consequences

ReviewTap now requires:

- customer-facing UI,
- forms,
- feedback storage,
- interaction state,
- dashboard functionality,
- and additional analytics.

Feedback-first describes the experience ReviewTap presents first.

It does not mean that customers must submit ReviewTap feedback before being allowed to access Google Reviews.

That access rule is defined more explicitly in D-020.

## Revisit When

This decision is intentionally provisional.

Revisit after the customer experience is tested with real businesses and users.

The underlying card and session architecture should remain useful even if the exact feedback experience changes.

---

# D-006 — Do Not Gate Google Review Access Based on Rating

**Status:** Accepted

## Context

The internal ReviewTap experience may collect a customer rating.

The application could technically show Google Reviews only to customers who provide high ratings.

That behavior would create review-gating concerns and is not an acceptable product foundation.

## Decision

The Google Review opportunity will remain available regardless of the customer's internal ReviewTap rating.

The UI may adjust messaging based on feedback, but it must not selectively prevent lower-rating customers from accessing the business's Google Review page.

## Consequences

Rating-based UI personalization is allowed.

Rating-based suppression of public review access is not.

The customer's internal ReviewTap rating must not automatically determine the customer's Google star rating.

---

# D-007 — Use a ReviewTap-Controlled Google Review Handoff

**Status:** Accepted

## Context

ReviewTap should measure whether a customer chooses to continue to Google Reviews.

Sending the browser directly to a user-provided destination would also create unnecessary redirect risk.

## Decision

The Google Review action should pass through a ReviewTap-controlled server route.

Conceptually:

`/go/[sessionToken]`

The route should:

1. validate the interaction,
2. determine the configured business,
3. record the Google Review click,
4. retrieve the trusted business review destination,
5. and redirect the customer.

## Rationale

This provides a measurable conversion event while keeping redirect destinations under trusted application control.

## Consequences

ReviewTap can accurately report:

> Google Review clicks

but should not report:

> Google Reviews received

without reliable evidence of completed reviews.

The handoff records ReviewTap-observable behavior.

It does not mean ReviewTap controls or completes the customer's Google Review submission.

---

# D-008 — Interaction Sessions and Feedback Submissions Are Separate Concepts

**Status:** Accepted

## Context

A customer may begin an interaction without completing feedback.

Treating an interaction and a feedback submission as the same record would make conversion analytics inaccurate.

## Decision

Interaction/session activity and completed feedback will be represented separately.

Conceptually:

Interaction Session
    |
    └── optional Feedback Submission

## Rationale

This supports truthful funnel measurements such as:

card interaction
→ feedback submission
→ Google Review click

## Consequences

The dashboard can distinguish between traffic and completed feedback.

One interaction should normally produce at most one completed feedback submission in V1.

A Google Review click may also occur without a feedback submission.

---

# D-009 — Do Not Build a CRM in V1

**Status:** Accepted

## Context

ReviewTap may collect optional customer:

- name,
- email,
- phone number,
- feedback,
- and consent information.

This could eventually support CRM, SMS, or marketing features.

## Decision

V1 will not create a full customer/CRM platform.

Optional customer information will initially remain associated with the feedback submission that collected it.

## Rationale

A CRM introduces additional problems such as:

- identity resolution,
- duplicate contacts,
- communication history,
- customer timelines,
- segmentation,
- and lead management.

Those are not required to validate ReviewTap V1.

## Consequences

Two feedback submissions using the same phone number should not automatically be treated as one verified customer identity.

A dedicated customer model may be introduced later through a planned migration if real product needs justify it.

---

# D-010 — Feedback Follow-Up and Marketing Consent Are Separate

**Status:** Accepted

## Context

A customer may provide contact information because they want the business to respond to their feedback.

That does not automatically mean they want future promotional communication.

## Decision

ReviewTap will conceptually distinguish:

**feedback follow-up permission**

from:

**marketing communication consent**

## Rationale

These represent different customer intentions and should not be inferred from one another.

## Consequences

Contact information alone must not automatically create marketing permission.

If SMS or email marketing is implemented later, appropriate consent information must be captured and preserved.

---

# D-011 — Keep Authentication and Authorization Separate

**Status:** Accepted

## Context

Logging into ReviewTap proves who a user is.

It does not by itself determine which business information that user should be allowed to access.

## Decision

Supabase Auth will handle authentication.

ReviewTap application/database authorization will determine which businesses the authenticated user may manage.

Conceptually:

User
→ Business Membership
→ Business

## Rationale

This creates a clean security boundary and prevents authorization logic from being based only on browser-supplied business identifiers.

## Consequences

A logged-in user must not gain access to another business merely by changing a URL or request parameter.

Complex enterprise permissions are not required for V1.

---

# D-012 — PostgreSQL Is the V1 Analytics Source of Truth

**Status:** Accepted

## Context

ReviewTap V1 needs basic analytics such as:

- interactions,
- feedback submissions,
- ratings,
- activity over time,
- card activity,
- and Google Review clicks.

## Decision

V1 analytics will be derived primarily from ReviewTap's PostgreSQL operational data.

## Rationale

Current analytics needs do not justify a separate event warehouse or analytics service.

## Consequences

Do not introduce dedicated analytics infrastructure such as:

- event streaming systems,
- analytics warehouses,
- or separate analytics databases

without a demonstrated need.

Aggregation or caching may be introduced later if actual performance requires it.

---

# D-013 — Server Owns Authoritative and Sensitive Operations

**Status:** Accepted

## Decision

Sensitive or authoritative actions should execute through trusted server-side application boundaries.

Examples include:

- database mutations,
- authorization,
- card resolution,
- session creation,
- protected dashboard queries,
- feedback persistence,
- and Google Review destination resolution.

Client-side code should primarily handle interactive presentation and local user experience.

## Rationale

Browser code cannot be trusted with sensitive credentials or final authorization decisions.

## Consequences

Client validation may improve UX, but server validation remains authoritative.

Secrets must remain server-only.

---

# D-014 — Public Identity Is an Intentional Boundary

**Status:** Accepted

## Context

Some database identifiers will appear in publicly accessible URLs.

Public exposure should not happen accidentally.

## Decision

ReviewTap will intentionally distinguish public-facing identifiers from internal database identity where useful.

Public identifiers should be:

- URL-safe,
- stable,
- suitable for public exposure,
- and non-sequential.

## Consequences

The exact card and session identifier formats remain open for database planning.

Sequential numeric IDs should not be used as public card identifiers.

---

# D-015 — Prefer Domain-Focused Data Access Over Database Logic in UI

**Status:** Accepted

## Context

Scattering database queries throughout UI components would make the application harder to understand, test, and change.

## Decision

Database behavior should be accessed through focused server-side functions organized around real ReviewTap responsibilities.

Examples may include:

- resolving a card,
- creating a session,
- submitting feedback,
- retrieving dashboard metrics,
- or checking business access.

## Rationale

This keeps UI responsibilities separate from data behavior without prematurely building a large enterprise repository/service framework.

## Consequences

Reuse abstractions when real repetition appears.

Do not create abstraction layers solely to appear architecturally sophisticated.

---

# D-016 — Customer Experience Should Be Mobile-First

**Status:** Accepted

## Context

Most NFC interactions will begin on a customer's phone.

## Decision

The customer-facing ReviewTap experience will be designed mobile-first.

## Consequences

Rating controls, form inputs, feedback states, clipboard actions, and Google Review actions should prioritize small-screen usability and touch interaction.

Desktop support remains important but is not the primary interaction assumption.

---

# D-017 — Do Not Collect Invasive Interaction Data by Default

**Status:** Accepted

## Decision

ReviewTap V1 will not automatically collect unnecessary:

- precise geolocation,
- device fingerprints,
- browser fingerprints,
- or similar customer tracking information.

## Rationale

The V1 product can provide useful business analytics using first-party interaction events without introducing unnecessary privacy complexity.

## Consequences

Additional data collection requires a defined product purpose and intentional review.

---

# D-018 — Build for Product Flexibility, Not a Generic Platform

**Status:** Accepted

## Context

The exact ReviewTap customer experience will likely evolve.

Possible UI experiments include different:

- rating controls,
- feedback layouts,
- messages,
- field ordering,
- Google Review handoff presentation,
- and post-submission experiences.

## Decision

Core domain concepts should remain reasonably stable while presentation remains flexible.

ReviewTap will not build a generic form-builder, workflow engine, or plugin platform for V1.

## Rationale

Clean boundaries provide enough flexibility without requiring speculative framework development.

## Consequences

UI experiments should normally be possible without redesigning the core business/card/session model.

---

# D-019 — Verified Implementation, Not Plans, Defines Documented Current State

**Status:** Accepted

## Context

ReviewTap uses AI-assisted Plan, Build, and Verify stages.

A plan may describe functionality that has not yet been created.

Build may produce code that has not yet been proven correct.

## Decision

`docs/IMPLEMENTATION.md` will describe meaningful functionality only after it has been sufficiently implemented and verified.

## Rationale

This prevents unverified AI-generated claims from becoming future project context.

## Consequences

The knowledge flow is:

Plan
→ Build
→ Verify
→ Implementation documentation

Git retains historical code state.

`DECISIONS.md` retains durable reasoning.

`IMPLEMENTATION.md` describes current verified behavior.

---

# D-020 — Google Review Access Does Not Require ReviewTap Feedback Submission

**Status:** Accepted

## Context

ReviewTap uses a feedback-first customer experience.

That could be interpreted to mean that a customer must submit private ReviewTap feedback before being allowed to access the business's Google Review page.

Making feedback submission mandatory would add friction and would make access to Google dependent on participation in ReviewTap's private feedback flow.

## Decision

Customers must be able to access the business's Google Review opportunity without first submitting ReviewTap feedback.

ReviewTap may present its private feedback experience first and may encourage customers to provide feedback, but submission is not a prerequisite for Google Review access.

This rule applies regardless of whether the customer:

- selects an internal rating,
- writes a comment,
- provides contact information,
- or submits any ReviewTap feedback.

## Rationale

This preserves customer choice and keeps ReviewTap's private feedback flow separate from access to the public Google Review opportunity.

It also reduces unnecessary friction for customers who only want to leave a Google Review.

## Consequences

The customer experience must provide a deliberate path to Google Reviews even when no ReviewTap feedback submission exists.

The architecture and analytics model must support:

Interaction Session
→ Google Review click

without requiring:

Interaction Session
→ Feedback Submission
→ Google Review click

Dashboard analytics must not assume that every Google Review click has a corresponding feedback submission.

This decision complements D-005 and D-006.

D-005 establishes the feedback-first presentation.

D-006 prohibits rating-based review gating.

D-020 establishes that feedback participation itself is also not a gate.

---

# D-021 — Customer-Authored Feedback May Be Reused for Google Reviews Under Customer Control

**Status:** Accepted

## Context

A customer may already have written useful feedback inside ReviewTap.

Requiring that customer to manually recreate the same text on Google creates unnecessary friction.

At the same time, ReviewTap should not write, rate, or publish a public Google Review on the customer's behalf.

## Decision

When a customer has written ReviewTap feedback, ReviewTap may offer a deliberate action that helps the customer reuse their own written comment when continuing to Google.

Conceptually, the action may resemble:

`Copy my feedback & review on Google`

When the customer deliberately selects this action, ReviewTap may:

1. attempt to copy the customer's own written feedback to the device clipboard,
2. communicate whether copying succeeded,
3. continue through the ReviewTap-controlled Google Review handoff,
4. and open the business's Google Review experience.

ReviewTap must not:

- automatically submit the Google Review,
- automatically choose the Google star rating,
- silently publish private ReviewTap feedback,
- impersonate the customer,
- rewrite the customer's feedback into a more positive public review as part of the copy action,
- or claim that a Google Review was completed without reliable evidence.

The customer retains control over:

- whether copied text is actually pasted,
- whether the text is edited or discarded,
- which Google star rating is selected,
- and whether the Google Review is ultimately published.

## Rationale

This reduces repeated typing while preserving customer authorship and control over the public review.

The customer is reusing content they already authored rather than ReviewTap manufacturing a public review for them.

## Consequences

The ReviewTap internal rating and the customer's Google star rating remain separate concepts.

An internal ReviewTap rating must not automatically populate or determine the Google rating.

Clipboard behavior is a convenience feature rather than a prerequisite for Google Review access.

If clipboard copying fails or is unavailable:

- the application must not display a false copy-success state,
- the customer should still be able to continue to Google Reviews,
- and the failure should not block the handoff.

ReviewTap analytics may observe that the Google Review action was selected.

It must not infer from that event alone that the copied text was pasted or that a Google Review was published.

The technical clipboard and handoff behavior belongs in `docs/ARCHITECTURE.md`.

---

## Maintaining This File

Add a new decision when a choice:

- meaningfully constrains future implementation,
- establishes an important product rule,
- selects between credible architectural alternatives,
- introduces a lasting security or privacy boundary,
- or reverses an earlier durable decision.

Do not add a decision for every coding choice.

Examples that usually do not belong here:

- variable names,
- minor component layout,
- temporary debugging approaches,
- one-off implementation details,
- or routine library syntax.

If a decision changes:

1. do not silently rewrite its history,
2. mark the original decision `Superseded`,
3. create a new decision,
4. reference the old decision from the new one,
5. update `ARCHITECTURE.md` or `V1_SPEC.md` when necessary.

This document should remain concise enough that future ReviewTap work can efficiently understand the decisions that genuinely matter.