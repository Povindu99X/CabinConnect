# Edge Cases & Known Failure Modes

Known scenarios where the system can behave incorrectly if not explicitly handled.
Reference this file when writing acceptance criteria and reviewing AI-generated output.

**Product source:** [docs/solution/Requirements.md](../../docs/solution/Requirements.md)

---

## Community & Tenancy

**EC-COM-01 — Wrong community context**
A user supplies another community's ID (or tampered context) to list or mutate data.
_Mitigation:_ API resolves community from membership; reject or 404 when not a member. RLS filters all rows by `community_id`.

**EC-COM-02 — Membership revoked mid-session**
A user is removed from a community while their JWT session is still valid.
_Mitigation:_ Authorize every request against current membership; return 403 on mutation. Optional: force refresh on membership change.

**EC-COM-03 — User in multiple communities**
A user belongs to more than one resort and submits a request without an active community.
_Mitigation:_ Require explicit active community (header or profile); default to primary only if product decision allows — document in intent.

---

## Auth & Access

**EC-AUTH-01 — Expired JWT on long sessions**
A user with an open browser tab submits requests with an expired token.
_Mitigation:_ Frontend uses Supabase Auth's `onAuthStateChange` to refresh proactively. API returns 401 on expired tokens; frontend redirects to login.

**EC-AUTH-02 — Cross-user resource access**
A user guesses another user's resource ID (cabin, order, tool listing) within the same community.
_Mitigation:_ RLS restricts rows to owner or permitted role. Server validates ownership or role before any mutation.

**EC-AUTH-03 — Unauthenticated mutation**
Anonymous or expired callers attempt POST/PUT/PATCH/DELETE.
_Mitigation:_ All mutating endpoints require valid JWT unless explicitly marked public. Return 401.

**EC-AUTH-04 — Public read over-exposure**
Partially public browse (NF-05) exposes draft or private data.
_Mitigation:_ Allowlist public endpoints (published events, visitor instruction tokens only). Never expose operational info or drafts.

---

## MyCabin

**EC-MC-01 — Expired or revoked visitor instruction link**
A Visitor opens a share link after expiry or owner revocation.
_Mitigation:_ Return 404 or 410 with a clear message; do not leak whether the cabin exists.

**EC-MC-02 — Operational info exposed to wrong role**
Access codes or emergency contacts visible to Residents or anonymous users.
_Mitigation:_ Operational information endpoints are Cabin Owner only; separate from visitor instruction content.

**EC-MC-03 — Maintenance status regression**
A completed maintenance task is moved back to an invalid earlier state without audit.
_Mitigation:_ Append status history; restrict invalid transitions in domain logic.

---

## Events

**EC-EV-01 — Registration for full or past event**
A Resident registers after capacity is reached or after the event end date.
_Mitigation:_ Validate capacity and date server-side; return 409 or 400 with clear message.

**EC-EV-02 — Draft event visible to residents**
Unpublished draft appears in resident browse lists.
_Mitigation:_ Browse queries filter `published` only; admins see drafts via admin routes.

---

## Groceries

**EC-GR-01 — Supplier (RIMA) unavailable**
Catalog browse or order submit fails due to timeout or 5xx from supplier.
_Mitigation:_ Return 503 with safe message; do not partial-commit order without confirmation; log for ops.

**EC-GR-02 — Pickup time in the past**
Owner schedules pickup at a datetime already passed.
_Mitigation:_ Validate pickup schedule ≥ now (community-local or UTC per elaboration); return 400.

**EC-GR-03 — Concurrent volunteer acceptance (delivery phase)**
Two volunteers accept the same delivery request.
_Mitigation:_ Database unique constraint or optimistic lock on assignment; second accept gets 409.

**EC-GR-04 — Stale order status notification**
Owner receives duplicate or out-of-order status notifications.
_Mitigation:_ Idempotent notification triggers keyed by order ID + status version.

---

## ToolShare

**EC-TS-01 — Overlapping borrow requests**
Two Cabin Owners request the same tool for overlapping periods while status is Available.
_Mitigation:_ Transaction + unique constraint on overlapping approved loans, or first-approve-wins with decline of others.

**EC-TS-02 — Approve then decline race**
Owner declines while system still shows Reserved from a pending approve.
_Mitigation:_ Single-writer status transitions with row versioning; return 409 on conflict.

**EC-TS-03 — Loan period invalid**
End date before or equal to start date for borrow/rent period.
_Mitigation:_ Server validates before DB query; mirror validation in UI.

---

## Dates & Time

**EC-DATE-01 — Timezone-naive date comparisons**
Event dates or loan periods compared with implicit local midnight cause off-by-one errors.
_Mitigation:_ Store date-only fields as UTC dates; UI converts for display; server is authoritative.

---

## Retired edge cases

The following IDs applied to a **booking/rental** product draft and are retired: EC-001 through EC-010 (concurrent booking, Hold expiry, blackout dates, seasonal rates, zero-night booking, etc.). Do not reference them in new units.
