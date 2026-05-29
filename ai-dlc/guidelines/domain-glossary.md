# Domain Glossary

Canonical definitions for business terms used in CabinConnect. Use these exact terms in code, prompts, and documentation to avoid ambiguity.

**Product source:** [docs/solution/Requirements.md](../../docs/solution/Requirements.md)

---

## Platform

**Community** (also **Resort**)
A Norwegian resort or neighborhood deployment boundary. All resident-facing data (events, tools, grocery orders) is scoped to one Community. Users belong to one or more Communities; the active Community context drives API and RLS filtering.

**Cabin Owner**
An authenticated user who owns or manages a Cabin within a Community. Primary actor for MyCabin, Groceries, and ToolShare.

**Resident**
An authenticated community member who browses and participates in community life (e.g. Events). May or may not be a Cabin Owner.

**Administrator** (Admin)
A user with elevated permissions within a Community (e.g. publish Events, manage attendee lists). Scoped to a Community unless explicitly defined otherwise during elaboration.

**Volunteer**
A user who registers as a grocery delivery carrier within a Community (Groceries — delivery phase).

**Visitor** (guest access)
A person invited to view **Visitor Instructions** without a full CabinConnect account. Access is via a limited, shareable link or token — not the same as a registered user.

**Role**
One of: Cabin Owner, Resident, Administrator, Volunteer. Assigned per Community membership. Drives authorization for mutations.

---

## MyCabin (Module 1)

**Cabin**
An accommodation unit owned or managed by a Cabin Owner. Has profile fields (name, location, capacity, amenities) and operational data (access codes, emergency contacts, rules). Not a short-term rental listing in the MVP.

**Cabin Profile**
The public-facing descriptive data for a Cabin (MC-01).

**Operational Information**
Sensitive owner-only data: access codes, emergency contacts, house rules (MC-02).

**Maintenance Task**
A logged work item for a Cabin with a status and history (MC-03).

**Ownership Cost Estimate**
A calculated view of estimated costs (utilities, maintenance, fees) from owner-supplied inputs (MC-04).

**Visitor Instructions**
Content created by a Cabin Owner for invited visitors (directions, rules, access guidance) (MC-05).

---

## Events (Module 2)

**Event**
A community activity with date, category, and details. Lifecycle includes draft and published states (EV-01).

**Event Registration**
A Resident's expression of interest or attendance for a published Event (EV-03).

**Attendee**
A Resident registered for an Event, as seen by an Administrator (EV-04).

---

## Groceries (Module 3)

**Supplier**
An external grocery partner. MVP uses a single supplier: **RIMA** (GR-01).

**Grocery Order**
An order placed by a Cabin Owner against the supplier catalog. Types include **Pickup** (MVP) and **Delivery** (phased).

**Order Status**
Lifecycle for tracking: `Placed` → `Ready` → `InTransit` (if applicable) → `Delivered` / picked up (GR-05).

**Pickup Schedule**
The date/time a pickup order should be ready, aligned to the owner's journey to the cabin (GR-02).

**Delivery Request**
A doorstep delivery assignment, optionally accepted by a Volunteer (GR-03, GR-04 — phased).

---

## ToolShare (Module 4)

**Tool Listing**
A tool or piece of equipment a Cabin Owner offers to lend or rent within the Community (TS-01).

**Borrow Request** / **Rental Request**
A request to use a listed tool for a specified period (TS-03).

**Tool Status**
Availability state of a listing: `Available`, `Reserved`, `OnLoan` (TS-05).

**Loan History**
Recorded completed loans for accountability and dispute resolution (TS-06).

---

## Date & Time

**Date-only**
Calendar dates without time-of-day for event dates, loan periods, and pickup scheduling. Stored and compared in UTC; UI displays in local timezone (NF-04).

**Period**
Inclusive start date, exclusive end date where applicable (e.g. tool loan period). Validate start before end.

---

## Abbreviations

| Abbreviation | Meaning |
|---|---|
| AC | Acceptance Criteria |
| RLS | Row-Level Security (Supabase/PostgreSQL) |
| DLC | AI-Driven Development Lifecycle |

---

## Retired terms (do not use)

The following belonged to an earlier booking-product draft and are **not** part of the current product: Booking, Booking Status, Host (as rental operator), Hold, Blackout Date, Base Rate, Seasonal Rate, Total Price (booking), Availability (rental calendar).
