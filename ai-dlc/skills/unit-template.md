# Unit Template

A **Unit** is the atomic deliverable of work in AI-DLC. Each Unit maps to one feature slice: a user-facing behaviour, a data operation, or an integration point.

---

## Unit Structure

```
## Unit: <short name>

### Context
<1-2 sentences on why this unit exists and what problem it solves>

### Acceptance Criteria
- Given <starting state>, when <action>, then <observable outcome>
- (Add one AC per distinct behaviour — no compound ACs)

### Scope
**In scope:**
- <explicit list of what this unit covers>

**Out of scope:**
- <explicit list of what is intentionally excluded>

### Dependencies
- <other units or services this depends on>

### Edge cases
- <EC-* IDs from guidelines/edge-cases.md that apply>

### Definition of Done
- [ ] AC covered by tests
- [ ] Prompt quality gate passed (see rules/prompt-quality-gate.md)
- [ ] Code review complete
- [ ] No new lint or type errors
- [ ] Feature toggled off in production until acceptance sign-off
```

---

## Example Unit

```
## Unit: Event Browse and Filter

### Context
Residents need to discover upcoming community events by date and category.

### Acceptance Criteria
- Given a Resident in Community X and published events exist, when the Resident browses events, then only published events for Community X are returned ordered by start date
- Given no events match the selected category filter, when the Resident browses, then an empty list is returned with 200
- Given an invalid category value, when the Resident submits the filter, then a 400 validation error is returned

### Scope
**In scope:**
- GET /events with date and category query params
- Community scoping on all results

**Out of scope:**
- Event registration (separate unit)
- Admin draft management

### Dependencies
- Community tenancy and membership must exist
- Event publish unit must exist for published data

### Edge cases
- EC-EV-02 (draft visibility)
- EC-COM-01 (wrong community)

### Definition of Done
- [ ] AC covered by tests
- [ ] Prompt quality gate passed
- [ ] Code review complete
- [ ] No new lint or type errors
- [ ] Feature toggled off in production until acceptance sign-off
```
