# CabinConnect

CabinConnect is a digital community platform for cabin owners, local businesses, and neighbors in Norwegian mountain resorts. It brings together four core capabilities — cabin management, local events, grocery ordering, and tool sharing — into one lightweight, cloud-hosted app built for sustainable and social cabin life.

The project is being built by 99x using the AI-Driven Development Lifecycle (AI-DLC).

---

## The Product

| Module | What it does |
|---|---|
| **MyCabin** | Cabin owners store, track, and share everything about their cabin — maintenance, costs, visitor instructions |
| **Events** | Administrators and residents publish and manage local community events |
| **Groceries** | Cabin owners order groceries for pickup or volunteer-delivered doorstep delivery |
| **ToolShare** | Community sharing economy for tools and equipment — lend, borrow, or rent locally |

Full requirements: [docs/solution/Requirements.md](docs/solution/Requirements.md)

---

## Tech Stack

- **Backend:** C# / .NET 8 Web API
- **Frontend:** React 18 + TypeScript
- **Database & Auth:** Supabase (PostgreSQL with RLS)
- **Hosting:** Shared cloud infrastructure

---

## Repository Layout

This is a **monorepo** (see [ADR-004](ai-dlc/rules/architecture.md)): frontend and backend live together for coordinated changes.

```
src/
  backend/          # .NET 8 Web API (CabinConnect.sln)
  frontend/         # React 18 + Vite + TypeScript
supabase/           # Migrations, local Supabase config, RLS policies
docs/solution/      # Product requirements
ai-dlc/             # AI-DLC process artifacts
```

### Quick start

**Backend**

```bash
cp src/backend/CabinConnect.Api/appsettings.Development.json.example \
   src/backend/CabinConnect.Api/appsettings.Development.json
dotnet restore src/backend/CabinConnect.sln
dotnet run --project src/backend/CabinConnect.Api
# → http://localhost:5283/health
```

**Frontend**

```bash
cp src/frontend/.env.example src/frontend/.env.local
cd src/frontend && npm install && npm run dev
# → http://localhost:5173
```

**Supabase (optional local)**

```bash
npx supabase start
npx supabase status   # copy keys into appsettings.Development.json and .env.local
```

Full checklist: [ai-dlc/guidelines/dev-setup.md](ai-dlc/guidelines/dev-setup.md)

---

## How We Build

This project follows the AI-DLC process. Work is structured as Intents → Units → Bolts across three phases: Inception, Build, and Operate.

| Document | Purpose |
|---|---|
| [ai-dlc/Instructions2FDE.md](ai-dlc/Instructions2FDE.md) | Main guide — how to work in this project using AI-DLC |
| [ai-dlc/README.md](ai-dlc/README.md) | Artifact lifecycle overview |
| [ai-dlc/ops/build/backlog.md](ai-dlc/ops/build/backlog.md) | Live status of all units |
| [CLAUDE.md](CLAUDE.md) | Rules loaded by Claude at the start of every session |

---

## Key References

| Document | Purpose |
|---|---|
| [ai-dlc/guidelines/domain-glossary.md](ai-dlc/guidelines/domain-glossary.md) | Canonical business terms used in code and prompts |
| [ai-dlc/guidelines/edge-cases.md](ai-dlc/guidelines/edge-cases.md) | Known failure modes to check before generating code |
| [ai-dlc/rules/prompt-quality-gate.md](ai-dlc/rules/prompt-quality-gate.md) | The four-component check run before every AI code generation |
| [ai-dlc/rules/architecture.md](ai-dlc/rules/architecture.md) | Architecture decisions and their rationale |
| [ai-dlc/rules/code-standards.md](ai-dlc/rules/code-standards.md) | Naming conventions, patterns, and testing standards |
| [ai-dlc/rules/security.md](ai-dlc/rules/security.md) | Security rules — never/always |
| [ai-dlc/guidelines/team-rollout.md](ai-dlc/guidelines/team-rollout.md) | Pre-requisites and guidelines for multi-engineer teams |
| [ai-dlc/guidelines/dev-setup.md](ai-dlc/guidelines/dev-setup.md) | Developer environment setup checklist |
