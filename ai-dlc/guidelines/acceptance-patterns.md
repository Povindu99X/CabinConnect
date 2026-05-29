# Acceptance Patterns

What good acceptance criteria look like for CabinConnect. Use these patterns when writing ACs during Mob Elaboration.

---

## The Given/When/Then Format

Every AC must follow this structure:
- **Given** — the starting state of the system and the actor
- **When** — the action taken
- **Then** — the observable, verifiable outcome

```
Given a Resident is authenticated in Community "Norefjell" and a published event exists for next Saturday,
when the Resident registers attendance for that event,
then the Resident appears on the event attendee list and receives a confirmation reference.
```

---

## Rules for Writing Good ACs

### One behaviour per criterion
Bad: "The user can browse, filter, and register for events."
Good: Three separate ACs — one for browse, one for filter, one for registration.

### Observable outcomes only
Bad: "The system calls the RIMA API."
Good: "Then the catalog shows products returned from the supplier integration."

### No implementation details
Bad: "Then the `events` table is updated in PostgreSQL."
Good: "Then the event is retrievable via GET /events/{id} with status Published."

### State the actor explicitly
Bad: "When an event is published..."
Good: "Given an Administrator in Community X with a draft event, when the Administrator publishes the event..."

### Cover the unhappy path
Every feature needs at least one AC for a failure scenario:
```
Given a Tool Listing is already OnLoan for 2026-07-01 to 2026-07-05,
when a second Cabin Owner submits a borrow request for overlapping dates,
then a 409 Conflict response is returned indicating the tool is not available.
```

---

## Patterns by Feature Type

### Search / Query
- AC for empty results (zero matches)
- AC for pagination boundaries (first page, last page, beyond last page)
- AC for invalid filter values
- AC for community scope (no data from other resorts)

### Create / Submit
- AC for successful creation (happy path)
- AC for validation failure (missing required field)
- AC for conflict / duplicate
- AC for unauthorized access (wrong role or community)

### Update / Edit
- AC for successful update
- AC for updating a field that cannot change (e.g. community_id on a resource)
- AC for concurrent edit conflict
- AC for updating a record you do not own

### Delete / Cancel
- AC for successful cancellation
- AC for cancelling a record in a terminal state (e.g. completed loan)
- AC for role that cannot perform the action

---

## AC Anti-Patterns to Reject

| Anti-Pattern | Why It Fails |
|---|---|
| "The system should handle errors gracefully" | Not testable — what error, what outcome? |
| "Performance should be acceptable" | No threshold, not verifiable |
| "The UI should look good" | Subjective, not behavioural |
| "Admins can do everything a Resident can" | Too broad — enumerate specific behaviours |
| "It should work like the old system" | Specify the desired behaviour |
