# ReviewTap V1 Product Specification

## 1. Product Summary

ReviewTap is an NFC-powered customer feedback and review-engagement platform for local businesses.

A physical NFC card contains a ReviewTap-controlled URL rather than linking directly to Google.

When a customer taps the card, ReviewTap identifies the card and associated business, records the interaction, and opens a ReviewTap-branded feedback experience.

The customer may then:

- leave an internal 1–5 rating,
- leave optional written feedback,
- optionally provide contact information,
- optionally consent to business follow-up,
- copy their own written feedback for reuse in a Google Review,
- and access the business's Google Review page.

Google Review access must remain available regardless of:

- the customer's internal rating,
- whether the customer submits ReviewTap feedback,
- or whether the customer's feedback is positive or negative.

ReviewTap gives the business owner a dashboard where they can view card activity, feedback, ratings, comments, voluntarily provided contact information, and basic customer-engagement analytics.

ReviewTap does not post Google Reviews on behalf of customers.

The customer remains responsible for choosing their Google star rating, reviewing or editing any copied text, and manually publishing the Google Review from their own Google account.

---

## 2. V1 Product Hypothesis

V1 is intended to test whether businesses receive more value from an NFC card when the card opens a lightweight customer-feedback experience instead of immediately redirecting directly to Google.

The current product hypothesis is:

NFC card
→ ReviewTap feedback experience
→ private rating and optional comment
→ optional customer contact capture
→ Google Review opportunity
→ owner dashboard

When a customer has written feedback in ReviewTap, the experience should reduce friction by allowing the customer to deliberately copy their own written feedback and continue to the business's Google Review experience.

The Google Review action is optional for the customer to use.

Access to that opportunity is not optional based on ReviewTap's opinion of the customer's feedback and must not be restricted based on internal rating.

The customer should also be able to continue to Google Reviews without first submitting ReviewTap feedback.

This flow is intentionally treated as a product hypothesis.

The implementation should remain flexible enough to support future changes to the exact feedback presentation without requiring the core product architecture to be rebuilt.

---

## 3. V1 Goals

V1 should prove the complete ReviewTap experience:

1. create a business,
2. register an NFC card,
3. associate the card with a business,
4. allow a customer to tap the card,
5. resolve the card and business,
6. create a distinct customer interaction session,
7. display a business-specific ReviewTap feedback experience,
8. collect an internal customer rating,
9. collect optional written feedback,
10. optionally collect customer contact information and applicable consent,
11. store the interaction and submitted feedback,
12. allow the customer to access the business's Google Review experience,
13. allow a customer who wrote ReviewTap feedback to copy their own written comment for reuse on Google,
14. keep Google Review access available even when ReviewTap feedback is skipped,
15. and allow the business owner to view basic analytics and customer feedback.

V1 should prioritize a reliable end-to-end product over advanced features.

---

## 4. Learning Goal

ReviewTap is also being used as a software-development learning project.

V1 should provide meaningful hands-on experience with:

- frontend user interfaces,
- forms,
- reusable React components,
- client and server behavior,
- TypeScript,
- form validation,
- database reads and writes,
- dynamic routes,
- authentication,
- authorization,
- dashboards,
- analytics,
- responsive design,
- clipboard interaction,
- external handoff flows,
- error states,
- and full-stack data flow.

The UI should therefore be implemented as a real reusable application rather than as a static proof-of-concept page.

Where practical, components and patterns should be designed so they can later be reused in other products that require customer-facing forms, dashboards, and authenticated interfaces.

Reuse should come from clear boundaries and repeated patterns rather than premature framework development.

---

## 5. Core Customer Flow

The expected V1 customer flow is:

Physical NFC card
→ ReviewTap URL
→ card resolution
→ business resolution
→ interaction session
→ feedback experience

From the feedback experience, the customer may choose to:

### Feedback Path

rating
→ optional comment
→ optional contact information
→ applicable consent
→ submit
→ thank-you experience
→ optional Google Review action

or:

### Direct Google Review Path

skip ReviewTap feedback
→ continue to Google Reviews

When written ReviewTap feedback exists, the customer may choose an action conceptually similar to:

`Copy my feedback & review on Google`

This action should:

1. deliberately copy the customer's own written ReviewTap comment when possible,
2. continue into the ReviewTap-controlled Google Review handoff,
3. and open the business's Google Review experience.

The exact wording and presentation may evolve during V1.

The customer should not need to create a ReviewTap account.

The experience should be:

- mobile-first,
- fast,
- clear,
- low-friction,
- understandable without instructions,
- and transparent about which actions are private to ReviewTap versus public on Google.

---

## 6. Public Card URL

Each NFC card should contain a stable ReviewTap-controlled URL.

Conceptually:

`https://reviewtap.app/r/CARD_ID`

The public card identifier should allow ReviewTap to determine:

- which card was tapped,
- which business owns the card,
- and which customer experience should be displayed.

The physical NFC tag should not need to be rewritten when the business changes:

- its Google Review destination,
- configurable display information,
- or other supported ReviewTap settings.

Card identity should remain separate from the identity of an individual customer interaction.

---

## 7. Customer Feedback Experience

After a valid card is resolved and an interaction session is established, ReviewTap should display a customer-facing feedback experience.

The V1 experience should support:

### Business Identity

Display enough business information for the customer to understand which business they are interacting with.

Possible examples:

- business name,
- logo,
- location,
- or a short message.

The exact visual design may evolve during V1.

### Internal Rating

The customer should be able to provide an internal ReviewTap rating using a 1–5 scale.

This rating belongs to the ReviewTap feedback experience.

It must not automatically determine the customer's eventual Google star rating.

### Written Feedback

The customer should be able to leave an optional written comment.

This comment is initially private ReviewTap feedback.

If the customer later chooses to reuse that comment in a Google Review, ReviewTap may help the customer copy their own text.

ReviewTap must not silently publish the comment publicly.

### Contact Information

The customer may optionally provide information such as:

- name,
- email,
- phone number.

The form should clearly communicate that this information is optional.

### Follow-Up Consent

If ReviewTap collects contact information for business follow-up, the purpose of the collection should be clear.

Marketing or promotional consent should be treated separately from ordinary feedback follow-up.

Providing contact information does not automatically imply permission for future marketing.

### Google Review Access

The customer should have a clear way to access the business's Google Review experience.

This access must not depend on the customer completing ReviewTap feedback.

---

## 8. Google Review Handoff

ReviewTap should provide customers with access to the business's Google Review experience.

Google Review access must not be restricted based on:

- whether the customer's ReviewTap rating is low or high,
- whether the written feedback is positive or negative,
- or whether the customer submits ReviewTap feedback at all.

ReviewTap may vary the surrounding messaging or presentation, but it must not selectively suppress the Google Review action based on sentiment.

The Google Review handoff should remain a deliberate customer action.

ReviewTap should not:

- automatically submit a Google Review,
- automatically choose a Google star rating,
- impersonate the customer,
- silently publish ReviewTap feedback,
- or present a Google Review as completed when ReviewTap cannot verify that completion.

ReviewTap may record that the customer selected the Google Review action.

ReviewTap should report this event as something such as:

`Google Review click`

rather than:

`Google Review received`

unless reliable evidence of a completed review becomes available through an approved future capability.

---

## 9. Copy Feedback to Google

When a customer has written feedback inside ReviewTap, V1 should provide a low-friction way for the customer to reuse their own written comment when continuing to Google.

Conceptually, the customer may be offered an action such as:

`Copy my feedback & review on Google`

When selected, ReviewTap should attempt to:

1. copy the exact customer-authored written feedback to the customer's clipboard,
2. confirm clearly that the text was copied when successful,
3. open the business's Google Review experience,
4. and allow the customer to paste, review, edit, or discard that text before publishing.

The copied content should originate from the customer's own ReviewTap feedback.

ReviewTap should not automatically rewrite the customer's feedback into a more positive review as part of this action.

ReviewTap should not automatically select the customer's Google star rating based on the internal ReviewTap rating.

The customer remains responsible for:

- choosing their Google star rating,
- deciding whether to paste the copied text,
- editing the text if desired,
- and manually submitting the Google Review.

If clipboard access fails or is unavailable, the customer should still be able to continue to Google Reviews.

Failure to copy text must not block the Google Review action.

---

## 10. Optional Rating-Based Experience

ReviewTap may use the internal rating to personalize the private ReviewTap customer experience.

For example:

### Lower Internal Rating

The UI may emphasize:

- thanking the customer,
- acknowledging the feedback,
- explaining that the business values the input,
- and offering business follow-up when appropriate.

### Higher Internal Rating

The UI may emphasize:

- thanking the customer,
- and presenting the Google Review action prominently.

However:

- customers must still have access to the Google Review option regardless of rating,
- a low internal rating must not remove or disable that option,
- and the internal ReviewTap rating must not automatically determine the customer's Google star rating.

Specific thresholds and presentation behavior should remain flexible during V1 experimentation.

---

## 11. Feedback Submission

A valid ReviewTap feedback submission should be associated with:

- the business,
- the card,
- the interaction session,
- the internal rating,
- the optional written comment,
- optional customer-provided contact information,
- relevant consent state,
- and submission time.

A customer should not be required to provide contact information merely to submit feedback.

A customer should not be required to submit ReviewTap feedback merely to access Google Reviews.

The final database structure belongs in `docs/ARCHITECTURE.md`.

---

## 12. Businesses

V1 must support businesses as managed entities.

A business should contain the information required to operate its ReviewTap experience.

At minimum, this may include:

- unique internal identifier,
- business name,
- Google Review destination,
- active or inactive state,
- creation information,
- and configurable display information.

A business may have multiple ReviewTap cards.

The exact technical representation belongs in the architecture and database design.

---

## 13. NFC Cards

Each physical ReviewTap card must correspond to a ReviewTap card record.

Each card should support:

- a unique public card identifier,
- an associated business,
- an active or inactive state,
- creation information,
- and relevant management metadata.

A card should belong to only one business at a time in V1.

A business may have multiple cards.

The physical card should identify ReviewTap's controlled entry point rather than directly storing the business's Google Review destination.

---

## 14. Interaction Sessions

ReviewTap should record meaningful customer interactions that begin from a ReviewTap card.

At minimum, an interaction session should allow the system to determine:

- which card initiated the interaction,
- which business the card belonged to,
- when the interaction began,
- whether ReviewTap feedback was later submitted,
- and whether the Google Review action was later selected.

Card identity and interaction identity should remain conceptually distinct.

One physical card may produce many interaction sessions.

An interaction may occur without a completed feedback submission.

This distinction allows ReviewTap to measure behavior such as:

card opened
→ interaction started
→ feedback submitted
→ Google Review action clicked

A Google Review click may also occur without a ReviewTap feedback submission.

The exact interaction and event model belongs in `docs/ARCHITECTURE.md`.

---

## 15. Owner Dashboard

V1 should include an authenticated dashboard for authorized business users.

The dashboard should provide a useful overview of customer engagement.

At minimum, the dashboard should be able to display:

- total NFC interactions,
- total feedback submissions,
- feedback conversion rate where meaningful,
- average internal rating,
- rating distribution,
- recent feedback comments,
- feedback or activity by card,
- Google Review clicks,
- and activity over time.

Where contact information has been voluntarily provided, the dashboard may also display:

- customer name,
- customer email,
- customer phone number,
- follow-up preference,
- and relevant consent state.

The dashboard should clearly distinguish ReviewTap-observed events from outcomes that ReviewTap cannot confirm.

The UI should favor usefulness and clarity over advanced analytics.

---

## 16. Basic Analytics

V1 analytics should focus on business questions such as:

- How often are customers using the cards?
- Which cards receive the most activity?
- How many interaction sessions result in submitted feedback?
- What is the average internal rating?
- What comments are customers leaving?
- How does feedback change over time?
- How many customers select the Google Review action?

ReviewTap should report only events it can actually observe.

Observable examples include:

- card entry,
- interaction-session creation,
- feedback submission,
- and Google Review action click.

V1 should not claim that a Google Review was successfully posted unless ReviewTap has reliable evidence that it occurred.

Optional contact information should not automatically be interpreted as a count of unique customers.

---

## 17. Authentication and Protected Business Access

The owner dashboard must be protected from public access.

V1 must support authenticated access for users who are permitted to manage a ReviewTap business.

Authentication and business authorization are separate requirements.

A user being authenticated must not automatically grant access to every business in ReviewTap.

V1 should support a simple business-ownership or membership model sufficient to ensure that protected users can access only the businesses they are authorized to manage.

Complex enterprise role systems are outside V1 scope.

The technical authentication and authorization design belongs in `docs/ARCHITECTURE.md`.

---

## 18. Data Relationships

The conceptual V1 model should support relationships similar to:

Business
    |
    | 1 to many
    v
Cards
    |
    | 1 to many
    v
Interaction Sessions
    |
    | 0 or 1
    v
Feedback Submission

A business may also have many interaction sessions and feedback submissions through its cards.

A feedback submission may contain optional customer-provided information such as:

- name,
- email,
- phone number,
- follow-up preference,
- and applicable consent state.

V1 does not require a separate persistent customer or CRM entity.

A feedback submission should remain traceable to the interaction, card, and business that produced it.

The exact database relationships and storage decisions belong in `docs/ARCHITECTURE.md`.

---

## 19. Customer Information and Consent

Customer information should be collected only when it provides clear product value.

V1 may collect:

- name,
- email,
- phone number,
- feedback,
- internal rating,
- follow-up preference,
- and applicable consent state.

Contact information should generally be optional.

The UI should clearly distinguish between:

### Feedback Follow-Up

Permission for the business to respond to the customer's feedback.

### Marketing Consent

Permission for promotional or marketing communication.

These should not be treated as the same thing.

Providing contact information alone does not automatically create either permission unless the relevant intent is explicitly established.

Future SMS or email marketing functionality should rely on appropriate explicit consent before being implemented.

V1 should not build a complete consent-management platform before one is required.

---

## 20. V1 UI Requirements

Because ReviewTap is also being used to develop frontend skills, V1 should include meaningful interface work.

The customer experience should include:

- a polished business-specific feedback state,
- interactive 1–5 rating controls,
- optional written feedback input,
- optional customer information fields,
- clear follow-up/consent controls where applicable,
- clear validation,
- submit/loading states,
- success states,
- error states,
- Google Review access,
- copy-feedback behavior where written feedback exists,
- copy success or failure feedback,
- and responsive mobile-first design.

The dashboard should include:

- navigation,
- summary cards,
- lists or tables,
- feedback views,
- analytics displays,
- filters where genuinely useful,
- and responsive behavior.

UI complexity should remain proportional to V1.

The goal is to learn and apply reusable interface patterns rather than build visual complexity for its own sake.

---

## 21. V1 Functional Requirements

A successful V1 should demonstrate the following.

### Business Management

- A business can exist in ReviewTap.
- Its relevant profile information can be stored.
- Its Google Review destination can be configured and changed.

### Card Management

- A card can be registered.
- A card has a stable public identifier.
- A card can be assigned to a business.
- A card can be activated or deactivated.

### Public Experience

- A valid active card opens the correct business-specific ReviewTap experience.
- A distinct interaction session is created for a valid customer interaction.
- The customer can provide an internal 1–5 rating.
- The customer can leave optional written feedback.
- The customer can optionally provide contact information.
- The customer can submit ReviewTap feedback successfully.
- The customer can choose not to submit ReviewTap feedback and still access Google Reviews.

### Google Review Handoff

- A customer can access the business's Google Review experience.
- Google Review access is not restricted based on the internal rating.
- Google Review access is not restricted based on whether ReviewTap feedback was submitted.
- ReviewTap may record that the Google Review action was selected.
- ReviewTap does not claim that the Google Review was successfully published unless it has reliable evidence.

### Feedback Reuse

When written ReviewTap feedback exists:

- the customer can deliberately request to copy their own written comment,
- successful copying is communicated clearly,
- failure to copy does not block Google Review access,
- ReviewTap does not automatically choose the customer's Google star rating,
- ReviewTap does not automatically submit the public Google Review,
- and the customer retains final control over the public review text.

### Invalid State Handling

- Unknown cards are handled deliberately.
- Inactive cards do not behave as valid cards.
- Missing business relationships are handled deliberately.
- Missing or invalid Google Review destinations are handled safely.
- Invalid interactions do not create misleading successful records.
- Clipboard failure does not create a false copy-success state.

### Analytics

- Card interactions can be recorded.
- Interaction sessions can be recorded.
- Feedback submissions can be recorded.
- Ratings can be summarized.
- Comments can be viewed.
- Google Review clicks can be recorded.
- Basic activity over time can be inspected.

### Dashboard

- Authenticated and authorized users can inspect relevant business activity.
- Feedback can be viewed.
- Basic analytics can be viewed.
- Cards and business information can be managed to the level required for V1 operation.
- Users cannot gain access to unrelated businesses merely by changing client-controlled identifiers.

---

## 22. V1 Non-Goals

The following are intentionally outside the initial V1 unless deliberately promoted later:

- automatically posting Google Reviews,
- automatically selecting Google star ratings,
- impersonating customers on Google,
- generating fabricated customer reviews,
- automated SMS campaigns,
- automated email marketing,
- full CRM functionality,
- advanced lead pipelines,
- AI-generated public reviews,
- AI-generated customer responses,
- automated review responses,
- customer accounts,
- loyalty programs,
- rewards systems,
- payments,
- subscription billing,
- enterprise organization hierarchies,
- complex permissions,
- advanced fraud detection,
- device fingerprinting,
- precise customer geolocation tracking,
- native mobile applications,
- white-label deployments,
- advanced marketing automation,
- large-scale reporting infrastructure,
- generic form-builder systems,
- generic workflow engines,
- or speculative scaling architecture.

These may become future ReviewTap capabilities only through deliberate product decisions.

They should not complicate the first working product.

---

## 23. Future Product Opportunities

The V1 architecture should avoid unnecessarily blocking future features, but it should not build them prematurely.

Potential future capabilities include:

- customer follow-up workflows,
- SMS campaigns,
- email campaigns,
- feedback response tracking,
- multi-location businesses,
- richer analytics,
- AI feedback summaries,
- sentiment analysis,
- CRM integrations,
- repeat-customer insights,
- configurable feedback experiences,
- custom branding,
- additional NFC-powered customer experiences,
- and approved integrations that provide stronger evidence about external review outcomes.

These ideas are not current requirements.

They should influence V1 only when a simple design choice can preserve future flexibility without increasing present complexity significantly.

---

## 24. Product Flexibility Principle

ReviewTap V1 is an evolving product experiment.

The exact customer flow, field set, dashboard layout, rating presentation, messaging, and Google Review handoff presentation may change as the product is tested.

Therefore:

- core domain concepts should remain relatively stable,
- presentation and experimental flow details should remain easy to change,
- UI components should be reusable where practical,
- optional fields and presentation choices should not require redesigning unrelated domain logic,
- experimental behavior should not be embedded deeply into unrelated architecture,
- and V1 should not introduce a generic form-builder, workflow engine, or plugin system merely to create flexibility.

Flexibility should come from clean boundaries, not from speculative framework development.

---

## 25. Reliability Principle

The customer-facing NFC experience is a critical product path.

A valid card should reliably load the correct business experience.

The customer should encounter minimal unnecessary delay between tapping the card and seeing the ReviewTap interface.

Feedback submission should clearly communicate success or failure.

Clipboard-copy behavior should clearly communicate whether copying succeeded.

Failure to copy feedback must not prevent the customer from continuing to Google Reviews.

The Google Review handoff should fail safely when the destination cannot be resolved.

A failure in analytics or secondary functionality should not silently create misleading successful customer interactions.

---

## 26. Privacy and Customer-Control Principle

ReviewTap should collect only information that serves a legitimate product purpose.

Do not collect customer information merely because it is technically available.

Customer contact information, consent, and feedback should be handled deliberately.

Private ReviewTap feedback should not become public merely because it was submitted to ReviewTap.

When ReviewTap helps a customer reuse their written feedback for Google:

- the customer must deliberately initiate the action,
- the customer retains control over whether the text is actually used,
- the customer may edit or discard the copied text,
- and the customer manually publishes any Google Review.

Future expansion into SMS, email, marketing systems, or additional customer tracking should require intentional review of consent, privacy, data retention, and product requirements.

---

## 27. V1 Completion Definition

ReviewTap V1 is product-complete when this end-to-end scenario works reliably:

1. a business exists in ReviewTap,
2. its Google Review destination is configured,
3. an NFC card exists and is assigned to that business,
4. the physical card contains its stable ReviewTap URL,
5. a customer taps the card,
6. ReviewTap resolves the correct card and business,
7. a distinct interaction session is established,
8. the customer sees the correct business-specific feedback experience,
9. the customer can provide an internal rating,
10. the customer can optionally provide written feedback,
11. optional customer contact information and applicable consent can be captured appropriately,
12. submitted ReviewTap feedback is stored and associated with the correct interaction,
13. a customer can access the business's Google Review experience regardless of internal rating,
14. a customer can access Google Reviews without being forced to submit ReviewTap feedback,
15. when written ReviewTap feedback exists, the customer can deliberately copy their own comment for reuse on Google,
16. failure to copy does not prevent Google Review access,
17. ReviewTap does not automatically select the customer's Google star rating,
18. ReviewTap does not automatically submit a Google Review,
19. an authorized business user can sign in to a protected dashboard,
20. the owner can view basic interaction and feedback analytics,
21. the owner can read recent customer feedback,
22. the owner can inspect Google Review click activity,
23. cards and required business configuration can be managed,
24. and the full workflow passes the relevant ReviewTap verification process.

---

## 28. Specification Change Rule

This document describes the current accepted V1 product direction.

Because ReviewTap is still an evolving product concept, some requirements may change during development.

A change should be intentional rather than silently introduced during implementation.

When a meaningful product change occurs:

1. identify the reason for the change,
2. determine whether it changes V1 scope,
3. update this specification,
4. record a durable decision in `docs/DECISIONS.md` when appropriate,
5. update `docs/ARCHITECTURE.md` if the system design changes,
6. update `docs/TASKS.md` when planned work changes,
7. and update `docs/IMPLEMENTATION.md` only after changed behavior is actually implemented and sufficiently verified.

Do not rewrite the specification merely to make it agree with an incorrect implementation.

Do not silently change product behavior during Build.