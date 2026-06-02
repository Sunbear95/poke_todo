# ARCHITECTURE.md

## 0. Purpose

Define the smallest stable architecture that can support the current goal and validation loop.

Architecture must be small, boring, testable, recoverable, and aligned with the project context.

## 1. Architecture Status

```txt
Document status: DRAFT_READY_FOR_PLANNING
Project type: Single-page frontend app plus Expo mobile GUI app
Architecture frozen: NO
Validator decision: PASS_WITH_ACCEPTED_SCOPE_LIMITS
```

## 2. Architecture Principle

```txt
Choose the simplest architecture that can pass validation and support the user goal.
```

Prefer one app or module over multiple services, local state over a database when possible, deterministic logic over complex AI behavior, mock/fallback over live dependency, and sequential verified work over uncontrolled parallel work.

## 3. Project Type

```txt
[ ] CLI tool
[x] Single-page frontend app
[ ] Frontend app with API routes
[ ] Full-stack web app
[ ] API-only service
[x] Mobile app
[ ] Library/package
[ ] Script/automation
[ ] Documentation-only project
[ ] Hybrid / other:
```

The web shell and Expo mobile shell share the same domain model and interface contracts.

## 4. High-Level Architecture

```txt
User
  -> Checklist UI
  -> Completion State / Input Validation
  -> Candidate Selection Logic
  -> Daily Wrap-up / Encounter Generation Logic
  -> Capture Attempt Logic
  -> Local Demo Persistence
  -> Collection Rendering
  -> Validated Result
```

No backend, authentication, external AI provider, or external API is required for the MVP.

The current implementation has two presentation shells:
- `public/` is the lightweight mobile web demo.
- `App.js` is the Expo / React Native shell for Expo Go phone testing.
- `src/model.mjs` and `src/demoData.mjs` are shared by both shells.

## 5. ADR Summary

| ADR ID | Decision | Status |
|---|---|---|
| ADR-001 | Prefer a local-first single-app architecture | ACCEPTED |
| ADR-002 | Avoid authentication for MVP | ACCEPTED |
| ADR-003 | Exclude AI/proof analysis from MVP | ACCEPTED |
| ADR-004 | Prefer localStorage or equivalent simple local persistence | ACCEPTED |
| ADR-005 | Keep capture randomness deterministic in tests and controllable for demo | ACCEPTED |
| ADR-006 | Use Pokemon only as a private-demo concept; plan original creatures before public release | ACCEPTED_WITH_RISK |
| ADR-007 | Validate core loop before adding game economy or social systems | ACCEPTED |
| ADR-008 | Add Expo Go as the first physical-phone testing path before production native binaries | ACCEPTED |

## 6. Module Responsibility Map

| Module | Responsibility | Owner | Tests |
|---|---|---|---|
| Web Shell | Browser/mobile-web demo under `public/` | Builder | Build/Playwright/manual |
| Expo Shell | Phone-test app under `App.js` | Builder | Expo export/Expo Go/manual |
| Checklist UI | Show tasks/habits and completion toggles | Builder | Smoke/integration |
| Candidate Preview UI | Show 2-3 likely silhouettes before wrap-up | Builder | Integration/manual |
| Wrap-up UI | Summarize completed count and launch encounters | Builder | Integration/E2E |
| Capture UI | Show encounter, capture odds, and capture action/result | Builder | Integration/E2E |
| Collection UI | Show captured creatures in collection/Pokedex view | Builder | Integration/E2E |
| Reward Logic | Convert completed count to encounters | Builder | Unit |
| Capture Logic | Resolve capture and increase repeat encounter odds | Builder | Unit |
| Storage | Persist/reset local demo state | Builder | Unit/integration |
| Tests | Test harness and validation mapping | Test Engineer | Test validation |
| Reports | Evidence/pass-fail/risk records | Validator | Manual review |

## 7. Freeze Gate

```txt
[x] Project type selected
[x] High-level architecture defined
[x] Major ADRs accepted or deferred
[x] Module responsibilities clear
[x] Interface decision made
[x] Data persistence decision made
[x] Test architecture defined
[x] Recovery path defined
[ ] Validator approves or accepted risk recorded
```
