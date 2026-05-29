# Improvement: Align AI-DLC artifacts with Requirements product

**Date:** 2026-05-29
**Triggered By:** Inception prerequisite IMP-01 — [docs/plans/ai-dlc-implementation-plan.md](../../../../docs/plans/ai-dlc-implementation-plan.md)
**Status:** Applied

---

## What Changed

Replaced cabin **booking** domain language and edge cases with the multi-module **resort community** product defined in [docs/solution/Requirements.md](../../../../docs/solution/Requirements.md).

### Files updated

| File | Change |
|---|---|
| `ai-dlc/guidelines/domain-glossary.md` | Full glossary: Community, roles, four modules |
| `ai-dlc/rules/architecture.md` | System overview, module boundaries, ADR-006 community tenancy |
| `ai-dlc/guidelines/edge-cases.md` | Retired EC-001–EC-010; added EC-COM, EC-AUTH, EC-MC, EC-EV, EC-GR, EC-TS, EC-DATE |
| `ai-dlc/skills/mob-elab-prompts.md` | Product context in all prompts |
| `ai-dlc/guidelines/acceptance-patterns.md` | Examples use Events/ToolShare |
| `ai-dlc/skills/unit-template.md` | Example unit: event browse |
| `ai-dlc/rules/prompt-quality-gate.md` | Examples use events/community scope |
| `CLAUDE.md` | Project identity, domain table, edge cases, code rules |
| `.cursorrules` | Same as CLAUDE.md (Cursor operating rules) |

### Minor touch-ups

- `ai-dlc/guidelines/team-rollout.md` — domain wording
- `ai-dlc/ops/inception/README.md` — intent example

---

## Why

The repository AI-DLC artifacts described a booking platform (Guest/Host/Booking, Holds, seasonal rates). `Requirements.md` defines MyCabin, Events, Groceries, and ToolShare with community isolation (NF-03). Without alignment, mob elaboration and code generation would use wrong terms and mitigations.

---

## Expected Outcome

- AI sessions use Community, Cabin Owner, Resident, and module terms consistently
- Edge-case checks reference EC-COM / EC-AUTH / module IDs during review
- Architecture ADRs reflect multi-tenant resort deployment
- Mob elaboration prompts describe the correct product

---

## Applied

- [x] Target files updated
- [x] Improvement file recorded
- [ ] Team notified (if multi-engineer)
