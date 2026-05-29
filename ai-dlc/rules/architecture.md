# Architecture Decisions

## System Overview

CabinConnect is a **multi-module resort community platform** for Norwegian cabin life. It connects cabin owners, local businesses, and neighbors through one mobile-first app. The MVP comprises four modules: **MyCabin**, **Events**, **Groceries** (pickup first), and **ToolShare**.

- **Backend:** .NET 8 Web API (repository pattern, async/await)
- **Frontend:** React 18 + TypeScript SPA
- **Data & auth:** Supabase (PostgreSQL, Auth, Realtime)
- **Tenancy:** Every community (resort) is isolated — users only see their community's data (NF-03)

**Requirements:** [docs/solution/Requirements.md](../../docs/solution/Requirements.md)  
**Implementation plan:** [docs/plans/ai-dlc-implementation-plan.md](../../docs/plans/ai-dlc-implementation-plan.md)

## Module Boundaries

| Module | Primary actors | Data scope |
|---|---|---|
| MyCabin | Cabin Owner, Visitor (limited) | Owner's cabin(s) within Community |
| Events | Administrator, Resident | Community-scoped events |
| Groceries | Cabin Owner, Volunteer (phase 2) | Community + supplier integration |
| ToolShare | Cabin Owner (lender/borrower) | Community-scoped listings and loans |

Cross-cutting: **Community tenancy**, **roles**, **auth**, and **notifications** are platform concerns, not owned by a single module.

## Decision Log

### ADR-001 — Supabase as the data layer
**Decision:** Use Supabase (managed PostgreSQL) rather than a self-hosted database.
**Why:** Provides auth, real-time subscriptions, and row-level security out of the box, reducing infrastructure burden for an early-stage product.
**Trade-off:** Vendor lock-in on RLS policy syntax and Supabase-specific client SDK patterns.

### ADR-002 — .NET Web API as the backend
**Decision:** Keep a dedicated .NET backend rather than going serverless-first or using Supabase Edge Functions for all logic.
**Why:** Module business logic (MyCabin, Events, Groceries integrations, ToolShare) and community-scoped authorization benefit from a strongly-typed, testable server environment.
**Trade-off:** An extra service to deploy and maintain compared to a fully Supabase-driven approach.

### ADR-003 — React SPA (not SSR)
**Decision:** Client-rendered React app, not Next.js or server-rendered.
**Why:** Most usage is authenticated and mobile-first; public browse is limited (e.g. published events, visitor instruction links). SPA simplifies low-cost static hosting (NF-06).
**Trade-off:** Slower initial load vs. SSR; revisit if a public marketing site needs SEO.

### ADR-004 — Monorepo structure
**Decision:** Frontend and backend live in the same repository.
**Why:** Easier cross-cutting changes (shared types, coordinated deploys) for a small team.
**Trade-off:** CI pipelines must be scoped carefully to avoid rebuilding everything on every change.

### ADR-005 — Supabase JWT signing algorithm
**Decision:** Use JWKS-based JWT validation in the .NET API (`options.Authority = supabaseUrl + "/auth/v1"`), not symmetric key validation.
**Why:** Supabase Cloud signs JWTs with ES256 (asymmetric ECDSA, P-256), not HS256. The JWKS endpoint (`/auth/v1/.well-known/jwks.json`) is the correct key source. Authority-based validation handles key rotation automatically.
**Trade-off:** The API must be able to reach the Supabase JWKS endpoint at startup; air-gapped environments would need to cache the public key manually.

### ADR-006 — Community-scoped multi-tenancy
**Decision:** All tenant data is keyed by `community_id` (resort). RLS policies and the API enforce that users only read and mutate data for communities they belong to.
**Why:** NF-03 and EV-05 require isolation across multiple Norwegian resorts on shared infrastructure.
**Trade-off:** Every table, query, and policy must include community context; cross-community admin is out of MVP scope unless elaborated.

## Boundaries

- The React app communicates with the .NET API only — it does not call Supabase directly for **data mutations**
- Supabase client on the frontend is for **auth token management** and **real-time subscriptions** only
- All business rules live in the .NET domain layer, not in the database or frontend
- External supplier APIs (e.g. RIMA) are called from the backend only — never from the browser with secrets
- Visitor instruction access (MC-06) uses explicit public or token-scoped endpoints — not broad anonymous write access
