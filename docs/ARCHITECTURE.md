# ReviewTap V1 Architecture

## 1. Purpose

This document describes the intended technical architecture for ReviewTap V1.

It answers:

> How should ReviewTap be structured to satisfy the current V1 product specification and accepted project decisions?

This document describes intended system design.

It is not:

- the product requirements document,
- proof that functionality has already been implemented,
- a chronological implementation log,
- or a task tracker.

Use:

- `docs/V1_SPEC.md` for intended product behavior,
- `docs/DECISIONS.md` for durable product and technical decisions,
- `docs/IMPLEMENTATION.md` for verified current implementation,
- and `docs/TASKS.md` for planned and active work.

The architecture should remain simple enough for a small V1 while preserving clear boundaries for product experimentation.

---

## 2. Architecture Principles

ReviewTap V1 should optimize for:

1. correctness,
2. security,
3. simplicity,
4. maintainability,
5. learning value,
6. and enough flexibility for real product experimentation.

The architecture should avoid both extremes.

### Too Little Structure

Examples:

- putting database logic directly inside arbitrary UI components,
- mixing authorization, persistence, and presentation everywhere,
- hard-coding business-specific behavior,
- trusting browser-provided authorization state,
- or creating public routes with unclear responsibilities.

### Too Much Structure

Examples:

- microservices,
- event infrastructure built for hypothetical scale,
- generic repository frameworks,
- generic workflow engines,
- dynamic form-builder platforms,
- premature CRM architecture,
- or enterprise permission systems.

V1 should be one coherent web application with clear internal boundaries.

---

## 3. Primary Technology Stack

The intended V1 stack is:

### Application Framework

Next.js using the App Router.

Next.js will provide:

- application routing,
- server-side behavior,
- frontend rendering,
- route handlers,
- authenticated dashboard pages,
- and the public ReviewTap customer experience.

### Language

TypeScript.

TypeScript should provide clear contracts between:

- UI,
- application logic,
- forms,
- database data,
- server boundaries,
- and reusable domain behavior.

### Styling

Tailwind CSS.

Tailwind should support both the mobile customer experience and owner dashboard without requiring a separate styling framework.

Reusable components should be introduced when patterns genuinely repeat.

### Database and Authentication

Supabase.

Supabase is expected to provide:

- PostgreSQL,
- authentication,
- database security capabilities,
- and persistent ReviewTap application data.

### Deployment

Vercel.

Vercel is expected to host the Next.js application.

### Version Control

Git and GitHub.

Development should follow the repository workflow defined by `AGENTS.md`, root `CONTEXT.md`, and the ReviewTap ICM.

---

## 4. High-Level System

ReviewTap V1 should remain one full-stack application.

Conceptually:

Physical NFC Card
        |
        v
Public Card Entry
        |
        v
ReviewTap Interaction Session
        |
        v
Customer Feedback Experience
        |
        +----------------------+
        |                      |
        v                      v
Private Feedback         Google Review Handoff
        |                      |
        v                      v
Supabase             External Google Experience


Business Owner
        |
        v
Authentication
        |
        v
Authorized Dashboard
        |
        v
ReviewTap Application
        |
        v
Supabase

Both public and authenticated experiences belong to the same Next.js application.

V1 does not require separate frontend and backend repositories or independently deployed services.

---

## 5. Primary Application Surfaces

ReviewTap V1 has three major application surfaces.

### Public Card Entry

Conceptually:

`/r/[cardId]`

Responsible for:

1. receiving the public card identifier,
2. validating the card,
3. resolving the associated business,
4. establishing a distinct interaction session,
5. and sending the customer into the ReviewTap customer experience.

This route should remain lightweight and reliable.

---

### Customer Feedback Experience

Conceptually:

`/feedback/[sessionToken]`

Responsible for the mobile-first customer experience.

It should allow the customer to:

- recognize the business,
- provide an internal rating,
- provide optional written feedback,
- optionally provide contact information,
- provide applicable consent,
- submit private ReviewTap feedback,
- access the business's Google Review opportunity,
- and reuse their own written feedback for Google when they deliberately choose to do so.

ReviewTap feedback submission must not be required before the Google Review action becomes available.

---

### Owner Dashboard

Conceptually:

`/dashboard`

Responsible for authenticated business management and analytics.

The dashboard should support:

- business information,
- card management,
- private feedback viewing,
- voluntarily provided contact information,
- internal-rating analytics,
- interaction analytics,
- and Google Review click-through analytics.

The exact dashboard page hierarchy may evolve during implementation.

---

## 6. NFC Interaction Architecture

The physical NFC card should contain a stable public ReviewTap URL.

Example:

`https://reviewtap.app/r/CARD_PUBLIC_ID`

The card should not contain the business's Google Review destination directly.

The intended flow is:

Physical NFC Card
        |
        v
/r/[cardId]
        |
        v
Validate Card
        |
        v
Resolve Business
        |
        v
Create Interaction Session
        |
        v
/feedback/[sessionToken]

This allows the physical card to remain unchanged while ReviewTap configuration evolves.

A business may later change:

- its Google Review destination,
- display information,
- feedback presentation,
- or other supported ReviewTap settings

without requiring the NFC tag to be rewritten.

---

## 7. Card Identity and Interaction Identity

ReviewTap should distinguish the physical card from a particular customer interaction.

The card answers:

> Which physical ReviewTap card was used?

The interaction session answers:

> What happened during this particular use of that card?

Conceptually:

Card
  |
  | 1 to many
  v
Interaction Sessions

An interaction session provides a place to associate:

- card entry,
- business,
- start time,
- optional feedback submission,
- and Google Review click activity.

This separation should remain even if exact database naming changes during schema design.

---

## 8. Public Identifiers

Physical cards and public interaction URLs should use identifiers intentionally designed for public exposure.

ReviewTap should distinguish between:

### Internal Identifier

Used internally by the database.

UUID-based identifiers are an appropriate default.

### Public Identifier

Used in URLs such as:

`/r/CARD_PUBLIC_ID`

or:

`/feedback/SESSION_PUBLIC_TOKEN`

Public identifiers should be:

- URL-safe,
- stable for their intended lifetime,
- non-sequential,
- and suitable for exposure to untrusted users.

Sequential database row IDs should not be used as public card identifiers.

Internal and public IDs may use the same underlying identifier type when intentionally designed that way, but public exposure must remain an explicit choice.

---

## 9. Customer Flow Architecture

A valid customer interaction should conceptually behave as follows:

Card Opened
        |
        v
Card Validated
        |
        v
Business Resolved
        |
        v
Interaction Session Created
        |
        v
Feedback Experience Loaded
        |
        +-----------------------------+
        |                             |
        v                             v
Private Feedback Path         Google Review Path
        |                             |
        v                             v
Optional Rating               /go/[sessionToken]
Optional Comment                      |
Optional Contact                      v
Applicable Consent           Record Review Click
        |                             |
        v                             v
Submit Feedback              Resolve Trusted Destination
        |                             |
        v                             v
Feedback Persisted                  Google
        |
        v
Thank-You State
        |
        +-----------------------------+
        |
        v
Optional Google Review Action

The customer may choose the Google Review path without submitting ReviewTap feedback.

The customer may also submit ReviewTap feedback and then continue to Google.

These paths share the interaction session but do not depend on one another.

---

## 10. Interaction Session Model

The interaction session is the core boundary connecting public card usage to later customer actions.

Conceptually, a session may track:

- internal identifier,
- public session token,
- card identifier,
- business identifier,
- start timestamp,
- feedback-submitted state or timestamp,
- Google Review click state or timestamp,
- and other minimal metadata required for ReviewTap behavior.

The exact schema will be determined during database planning.

A session must not require a feedback submission.

Valid conceptual states include:

Interaction Session
→ no feedback yet
→ no Google click yet

Interaction Session
→ feedback submitted
→ no Google click yet

Interaction Session
→ no feedback submitted
→ Google Review clicked

Interaction Session
→ feedback submitted
→ Google Review clicked

The data model must support all four without treating any valid path as an error.

---

## 11. Feedback Submission Model

Feedback should remain a concept separate from the interaction session.

Conceptually:

Interaction Session
        |
        | 0 or 1
        v
Feedback Submission

A V1 feedback submission may contain:

- internal identifier,
- interaction/session identifier,
- business identifier where useful,
- card identifier where useful,
- internal rating,
- optional written comment,
- submission timestamp,
- optional customer name,
- optional customer email,
- optional customer phone,
- follow-up permission,
- applicable marketing consent,
- and consent metadata when required.

One interaction should normally create at most one completed feedback submission in V1.

The schema should deliberately define how duplicate submission attempts are handled.

---

## 12. Customer Contact Information

V1 should not build a full CRM.

Customer-provided contact information may remain attached to the feedback submission that collected it.

Conceptually:

Feedback Submission
        |
        +-- Name
        +-- Email
        +-- Phone
        +-- Follow-Up Permission
        +-- Applicable Consent

This avoids prematurely creating:

- global customer identities,
- contact deduplication,
- customer timelines,
- lead scoring,
- communication history,
- or CRM pipelines.

Two submissions using the same email address or phone number should not automatically be treated as one verified customer identity.

A separate customer/contact model may be introduced later only if real product requirements justify it.

---

## 13. Consent Architecture

Feedback follow-up permission and marketing consent must remain conceptually separate.

For example, future database fields may resemble:

`follow_up_allowed`

and:

`marketing_consent`

or equivalent names.

Final naming belongs in database planning.

Providing contact information must not automatically create either permission.

If ReviewTap later relies on consent for automated communications, enough information should be preserved to determine:

- what the customer agreed to,
- when they agreed,
- and which consent language or version applied when necessary.

V1 should store only consent states required by functionality that actually exists.

---

## 14. Google Review Handoff

The Google Review action should pass through a ReviewTap-controlled server route.

Conceptually:

`/go/[sessionToken]`

The intended flow is:

Customer Selects Google Review Action
        |
        v
/go/[sessionToken]
        |
        v
Validate Interaction Session
        |
        v
Resolve Associated Business
        |
        v
Resolve Trusted Google Review Destination
        |
        v
Record Google Review Click
        |
        v
Redirect Customer to Google

The handoff must work whether or not the customer submitted ReviewTap feedback.

The route should not require a feedback-submission record to exist.

ReviewTap should observe:

> The customer selected the Google Review action.

ReviewTap should not infer:

> The customer successfully published a Google Review.

unless an approved future integration provides reliable evidence.

---

## 15. Google Review Access Rules

Google Review access must remain independent from ReviewTap sentiment.

The system must not deny or remove access because:

- the internal ReviewTap rating is low,
- written feedback is negative,
- no internal rating was supplied,
- or ReviewTap feedback was not submitted.

The UI may vary messaging or presentation where appropriate.

The underlying ability to continue to Google must remain available.

The ReviewTap internal rating and the customer's eventual Google star rating are separate concepts.

ReviewTap must not automatically convert one into the other.

---

## 16. Copy Feedback to Google

When a customer has written a ReviewTap comment, the UI may provide a deliberate action conceptually similar to:

`Copy my feedback & review on Google`

This is a convenience feature that helps the customer reuse text they already authored.

Conceptually:

Customer Wrote Feedback
        |
        v
Customer Selects Copy + Google Action
        |
        v
Client Attempts Clipboard Copy
        |
        +----------------------+
        |                      |
        v                      v
Copy Successful          Copy Failed
        |                      |
        v                      v
Show Success State       Show Honest Fallback State
        |                      |
        +-----------+----------+
                    |
                    v
            Google Review Handoff

Clipboard copying should occur only from a deliberate customer action.

The application should copy the customer's own written feedback.

It should not automatically:

- generate a more positive version,
- rewrite the customer's sentiment,
- select the Google star rating,
- or submit the Google Review.

Clipboard failure must not block the Google Review handoff.

The customer must still be able to continue to Google.

---

## 17. Clipboard Responsibility

Clipboard interaction is a browser/client responsibility because it depends on direct user interaction and browser capabilities.

The customer-facing component responsible for the copy action may use the browser's clipboard capability when available.

The implementation should:

- attempt copying only after an explicit customer gesture,
- communicate success only when copying is confirmed,
- communicate failure honestly,
- and preserve access to the Google Review action if copying fails.

The server should not pretend to know that the user later pasted or used the copied content.

ReviewTap analytics should not interpret clipboard success as a published review.

A dedicated third-party clipboard dependency should not be introduced unless native browser capabilities prove insufficient for the required V1 behavior.

---

## 18. Server and Client Responsibilities

Next.js server and client capabilities should be used intentionally.

### Server-Side Responsibilities

Authoritative or sensitive operations should execute on trusted server boundaries.

Examples include:

- card resolution,
- business resolution,
- session creation,
- feedback persistence,
- authoritative validation,
- authentication checks,
- authorization checks,
- protected dashboard queries,
- Google Review destination lookup,
- and Google Review click recording.

### Client-Side Responsibilities

Client components should be used where browser interaction genuinely requires them.

Examples include:

- interactive rating controls,
- form state,
- immediate validation feedback,
- clipboard interaction,
- loading states,
- success/failure UI,
- and dynamic dashboard interaction.

Do not turn the entire application into client-side JavaScript when server rendering is sufficient.

Do not expose server secrets to browser code.

---

## 19. Data Access Boundary

Application UI should not contain arbitrary database queries scattered throughout components.

Code should conceptually distinguish between:

UI
    |
    v
Application / Domain Logic
    |
    v
Data Access
    |
    v
Supabase

Focused responsibilities may include:

- resolving a card,
- resolving a business,
- creating an interaction session,
- retrieving a session,
- creating feedback,
- recording a Google Review click,
- checking business access,
- and retrieving dashboard analytics.

Do not build a large generic repository/service framework before repeated patterns justify one.

Start with focused server-side functions organized around real ReviewTap responsibilities.

---

## 20. Feedback Submission Flow

A conceptual feedback flow is:

Customer Loads Interaction
        |
        v
Business Information Loaded
        |
        v
Customer Selects Internal Rating
        |
        v
Optional Comment / Contact / Consent
        |
        v
Client Validates Obvious Input
        |
        v
Submission Reaches Server
        |
        v
Server Validates Authoritative Rules
        |
        v
Feedback Persisted
        |
        v
Interaction Marked Accordingly
        |
        v
Success Experience Shown

Client validation improves user experience.

Server-side validation remains authoritative.

Never rely only on browser validation for database writes.

Feedback submission should not control whether the customer is permitted to use the Google Review handoff.

---

## 21. Validation

Input should be validated at appropriate trust boundaries.

### Card Identifier

Must meet the expected public identifier format.

### Session Token

Must resolve to a valid ReviewTap interaction before protected interaction-specific actions occur.

### Internal Rating

When supplied, must remain within the accepted V1 range:

1 through 5.

### Written Feedback

Should have reasonable length and content limits determined during implementation planning.

### Email

If supplied, should satisfy accepted V1 email rules.

### Phone

If supplied, should satisfy the chosen V1 phone-handling rules.

### Consent

Consent states should be explicit rather than inferred from contact information.

### Google Review Destination

Must come from trusted business configuration.

The public handoff must not accept an arbitrary browser-provided redirect destination.

Validation rules should be shared where practical without prematurely introducing unnecessary libraries or abstraction.

---

## 22. Authentication Architecture

Supabase Auth is the intended V1 authentication provider.

Authentication protects owner-facing ReviewTap functionality.

Public customer interaction does not require authentication.

Conceptually:

Public:
- `/r/...`
- `/feedback/...`
- `/go/...`

Protected:
- `/dashboard/...`

Authentication answers:

> Who is this user?

Authorization separately answers:

> Which business is this user permitted to manage?

These must remain separate concerns.

---

## 23. Business Authorization

ReviewTap should use a simple business-membership boundary.

Conceptually:

Authenticated User
        |
        v
Business Membership
        |
        v
Business

The exact schema will be defined during database planning.

A V1 membership may use a simple role such as:

- owner,
- administrator,

only when more than one role is genuinely required.

A logged-in user must not gain access to another business merely by changing:

- URL parameters,
- business IDs,
- client state,
- or browser requests.

Do not create a complex enterprise permission model in V1.

---

## 24. Database Security

Supabase Row Level Security should be used where appropriate to protect business data.

Authenticated dashboard access should be scoped so users can access only businesses they are authorized to manage.

Public customer interactions should have narrowly defined capabilities.

Avoid unrestricted browser access to sensitive business tables.

If elevated Supabase credentials are required:

- they must remain server-only,
- they must never be exposed through public environment variables,
- and their use should remain narrowly scoped.

The final database and RLS policies will be designed during database implementation.

---

## 25. Google Review URL Safety

Google Review destinations are configured external URLs and must be treated as security-sensitive redirect targets.

The public customer should not supply the redirect destination directly.

Conceptually prefer:

`/go/SESSION_TOKEN`

over:

`/go?url=https://user-controlled.example`

The server should derive the destination from:

Session
→ Business
→ Trusted Business Configuration

This reduces open-redirect risk.

If the configured destination is invalid or unavailable, the handoff should fail safely.

---

## 26. Error Handling

Public customer flows should fail deliberately.

Important states include:

### Unknown Card

Show an understandable invalid-card experience.

Do not create a successful interaction session.

### Inactive Card

Show an unavailable-card experience.

Do not treat the interaction as valid.

### Missing or Invalid Business

Treat as a configuration failure.

Do not continue into an unrelated experience.

### Invalid Interaction Session

Do not allow interaction-specific operations to continue as if the session were valid.

### Feedback Submission Failure

Tell the customer that private feedback could not be confirmed.

Do not display a false success state.

### Clipboard Failure

Tell the customer that copying could not be confirmed.

Do not display a false copy-success state.

Do not block Google Review access merely because clipboard copying failed.

### Invalid Google Review Destination

Fail safely.

Do not redirect to an arbitrary or unexpected destination.

Internal logs should provide enough diagnostic information for debugging without exposing sensitive implementation details to public users.

---

## 27. Dashboard Architecture

The owner dashboard should be composed from meaningful reusable UI patterns.

Potential V1 routes include:

`/dashboard`
- overview

`/dashboard/feedback`
- feedback submissions

`/dashboard/cards`
- NFC card management

`/dashboard/business`
- business configuration

The exact hierarchy may evolve.

Dashboard queries must be scoped to the authenticated user's authorized business context.

Analytics should be derived from actual ReviewTap operational data rather than from duplicated manually maintained totals unless performance later creates a demonstrated need.

---

## 28. Dashboard Metrics

The architecture should support metrics such as:

- total interaction sessions,
- total feedback submissions,
- feedback conversion rate,
- average internal rating,
- rating distribution,
- Google Review clicks,
- Google Review click-through rate,
- activity over time,
- activity by card,
- and potentially the relationship between feedback and Google handoff behavior.

Metrics should reflect only behavior ReviewTap can observe.

Use:

`Google Review clicks`

not:

`Google Reviews received`

unless reliable evidence of completed reviews becomes available.

Do not count optional contact information as verified unique customers.

A Google Review click must not require a feedback submission to exist.

---

## 29. Analytics Architecture

V1 analytics should derive from ReviewTap's operational PostgreSQL data.

Primary sources include:

- Businesses,
- Cards,
- Interaction Sessions,
- Feedback Submissions,
- and Google Review click state or events.

V1 does not require:

- Google Analytics,
- an event warehouse,
- Kafka,
- a separate analytics database,
- or a third-party product analytics platform.

For initial V1 scale, PostgreSQL should remain the primary analytics source of truth.

The exact representation of Google Review clicks may be:

- session state,
- timestamped fields,
- or a dedicated event record

depending on the database design and future reporting needs.

Do not introduce a generalized event architecture unless actual requirements justify it.

---

## 30. UI Architecture

The application should develop reusable UI patterns without becoming a generic design framework.

Likely reusable concepts include:

- buttons,
- form fields,
- cards,
- loading states,
- error states,
- success states,
- dashboard metric cards,
- navigation,
- rating controls,
- feedback cards,
- clipboard-status feedback,
- and responsive layout primitives.

The customer-facing experience and dashboard may share basic primitives while remaining distinct experiences.

The customer interface should prioritize mobile use because NFC interactions commonly begin on phones.

---

## 31. Feedback Experience Flexibility

Experimental presentation decisions should not be embedded deeply into the database architecture.

For example, a normalized internal rating may later be presented as:

- stars,
- numbered choices,
- sentiment labels,
- or another approved interface.

Likewise, Google Review actions may be presented differently as customer testing evolves.

V1 should preserve flexibility primarily through:

- clean component boundaries,
- separated domain concepts,
- and clear server/client responsibilities.

Do not build:

- a generic form-builder,
- a generic workflow engine,
- or a plugin system

merely to make V1 appear flexible.

---

## 32. Data Minimization

Do not automatically collect:

- precise geolocation,
- browser fingerprints,
- device fingerprints,
- unnecessary IP-derived information,
- or unrelated customer metadata

merely because the application could collect it.

Interaction metadata should be introduced only when it supports a legitimate product requirement.

This keeps both the technical model and ReviewTap's privacy responsibilities smaller.

---

## 33. Environment Configuration

Environment-specific values should not be hard-coded into application source.

Examples may include:

- Supabase project URL,
- Supabase public configuration,
- server-only Supabase credentials if later required,
- application base URL,
- and other external integration configuration.

Local configuration should use environment files excluded from Git.

Production configuration should use the deployment platform's protected environment settings.

Real credentials must never appear in repository documentation, source files, or Git history.

Detailed environment handling will be implemented through the appropriate project tasks.

---

## 34. Deployment Architecture

V1 deployment is expected to use:

GitHub
   |
   v
Vercel
   |
   v
Next.js Application
   |
   v
Supabase

The application should support separate local-development and production configuration.

Production deployment must not depend on files that exist only on Mike's local computer.

Deployment should eventually include appropriate build and verification checks before production changes are considered complete.

---

## 35. Repository Direction

The ReviewTap repository should remain a single application repository unless a genuine need for separation develops.

A likely application structure may eventually resemble:

`app/`
- Next.js routes and pages

`components/`
- reusable UI components

`lib/`
- focused domain/application/data-access utilities

`types/`
- shared TypeScript types when useful

`docs/`
- durable project documentation

`icm/`
- Plan/Build/Verify context and temporary task artifacts

Exact application directories should be created when actual implementation requires them.

Do not create empty architectural layers merely to match this example.

---

## 36. Testing Architecture

Testing should grow with the application rather than being postponed until the end.

Important V1 behavior that should eventually receive strong verification includes:

- card resolution,
- inactive and unknown card handling,
- interaction-session creation,
- feedback validation,
- feedback persistence,
- Google Review access without feedback submission,
- rating-independent Google Review access,
- clipboard success and failure behavior,
- Google Review handoff,
- business authorization,
- and important dashboard calculations.

Testing levels may include:

- unit tests where isolated logic benefits from them,
- integration tests for application/database boundaries,
- and end-to-end or browser testing for critical user flows.

The exact testing tools should be selected when implementation creates a real need.

Do not install multiple testing frameworks before understanding which testing boundaries matter.

---

## 37. Main V1 Customer Data Flow

The core customer flow should conceptually remain:

NFC Card
        |
        v
/r/[cardId]
        |
        v
Card Validation
        |
        v
Business Resolution
        |
        v
Interaction Session Created
        |
        v
/feedback/[sessionToken]
        |
        +----------------------------------+
        |                                  |
        v                                  v
Private Feedback                    Google Review Action
        |                                  |
        v                                  v
Rating / Comment / Contact          /go/[sessionToken]
        |                                  |
        v                                  v
Server Validation                   Validate Session
        |                                  |
        v                                  v
Feedback Stored                     Resolve Business
        |                                  |
        v                                  v
Thank-You Experience                Record Click
        |                                  |
        |                                  v
        |                           Google Review Page
        |
        +----------------------------------+
        |
        v
Optional Copy Own Feedback
        |
        v
Clipboard Attempt
        |
        +----------------------+
        |                      |
        v                      v
Success                Failure / Fallback
        |                      |
        +----------+-----------+
                   |
                   v
            Google Review Action

The customer may reach the Google Review action:

- without submitting ReviewTap feedback,
- after submitting ReviewTap feedback,
- or after deliberately copying their own written feedback.

These paths should remain supported by the same interaction-session architecture.

---

## 38. Main V1 Owner Data Flow

The owner experience should conceptually remain:

Authenticated User
        |
        v
Authorization Check
        |
        v
Authorized Business Context
        |
        +------------------+-------------------+
        |                  |                   |
        v                  v                   v
Interaction Data      Feedback Data       Card / Business Data
        |                  |                   |
        +------------------+-------------------+
                           |
                           v
                     Owner Dashboard
                           |
                           v
                Analytics + Feedback + Management

Authorization must be enforced through trusted application/database boundaries rather than client-provided business identity.

---

## 39. Architecture Change Rule

This document describes the currently intended ReviewTap V1 technical design.

Implementation may reveal assumptions that need to change.

A meaningful architecture change should be intentional.

When architecture changes materially:

1. identify the reason,
2. determine whether an accepted decision is affected,
3. update this document,
4. update `docs/DECISIONS.md` when a durable decision changes or is introduced,
5. update `docs/V1_SPEC.md` only if product requirements change,
6. update `docs/TASKS.md` when planned work changes,
7. and update `docs/IMPLEMENTATION.md` only after the resulting behavior has been implemented and sufficiently verified.

Do not rewrite architecture merely to rationalize an incorrect implementation.

Do not build speculative architectural layers merely because they may become useful later.