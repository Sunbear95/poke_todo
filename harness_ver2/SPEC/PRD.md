# SPEC/PRD.md

## 0. Purpose

Convert the project idea into clear, testable, implementation-ready requirements.

Implementation should not begin until this PRD is completed enough for the current task.

## 1. PRD Status

```txt
PRD status: DRAFT_READY_FOR_PLANNING
Source context: PROJECT_CONTEXT.md and .omx/specs/deep-interview-pokemon-bullet-journal.md
Created by: Spec Agent
Reviewed by: NOT_REVIEWED
Frozen: NO
Last updated: 2026-06-02
```

## 2. Product / Project Summary

```txt
One-line description:
We are building Poke Todo, a todo and habit app that helps lightweight productivity users stay motivated by turning completed daily actions into Pokemon-style encounters, capture attempts, and collection progress.

Project type: GUI app, likely web/mobile-capable
Target user/caller: People who want a playful, low-friction habit/todo loop
Core value proposition: Checking tasks is enough to create anticipation, reward encounters, capture progress, and a visible collection.
```

## 3. Problem Definition

```txt
The user/caller struggles with: Todo apps are useful but emotionally flat, while detailed journaling/proof submission creates friction.
Why this matters: A daily habit tool must be easy enough to use every day and rewarding enough to make returning feel worthwhile.
Current alternatives: Standard todo apps, habit trackers, bullet journals, gamified productivity apps.
Weakness of current alternatives: They often lack reward variety or require too much manual logging.
```

## 4. Goals and Non-Goals

```txt
Primary goal: Demonstrate a low-friction todo-to-encounter-to-capture loop.
Secondary goals: Build anticipation with silhouettes, show repeat encounter capture-rate growth, and show captured creatures in a collection.
Non-goals: Evidence upload, AI proof analysis, Pokeball consumption, currency/shop/inventory, social features, battles, full game progression, complex project nesting, authentication, and production-ready Pokemon IP usage.
```

## 5. Current Scope

| ID | Feature/Capability | Reason Required | Visible/Verifiable? |
|---|---|---|---|
| MUST-001 | Daily task/habit checklist | User needs an easy action source | YES |
| MUST-002 | Candidate silhouette preview | Builds anticipation before wrap-up | YES |
| MUST-003 | Daily wrap-up time or demo wrap-up trigger | Anchors rewards to a day-end summary | YES |
| MUST-004 | One completed item creates one encounter | Makes reward quantity simple and testable | YES |
| MUST-005 | Capture attempt interaction | Turns the reward into an active moment | YES |
| MUST-006 | Repeat encounter capture-rate increase | Shows progression across encounters | YES |
| MUST-007 | Collection/Pokedex-style view | Makes successful captures visible | YES |

Out-of-scope items should be reflected in `BACKLOG.md`.

## 6. Core Flow

```txt
Step 1: User opens today's checklist.
Step 2: User checks completed tasks/habits.
Step 3: App updates 2-3 candidate silhouettes based on current progress.
Step 4: At daily wrap-up time, or via a demo trigger, app summarizes completed items.
Step 5: App creates one encounter per completed item.
Step 6: User attempts capture for each encounter.
Step 7: App shows success/failure and updated capture probability for repeat encounters.
Final observable result: Captured creature appears in the collection/Pokedex-style view.
```

## 7. Functional Requirements

| ID | Requirement | Priority | Related Feature | Test Required |
|---|---|---|---|---|
| FR-001 | User can view daily task/habit items | P0 | MUST-001 | YES |
| FR-002 | User can mark items complete/incomplete | P0 | MUST-001 | YES |
| FR-003 | App shows 2-3 silhouette candidates before wrap-up | P0 | MUST-002 | YES |
| FR-004 | App supports a daily wrap-up time or demo wrap-up trigger | P0 | MUST-003 | YES |
| FR-005 | Wrap-up creates one encounter per completed item | P0 | MUST-004 | YES |
| FR-006 | User can attempt capture during reward phase | P0 | MUST-005 | YES |
| FR-007 | Capture resolves to success or failure without inventory requirements | P0 | MUST-005 | YES |
| FR-008 | Repeated encounters increase displayed capture probability | P0 | MUST-006 | YES |
| FR-009 | Captured creatures appear in collection/Pokedex view | P0 | MUST-007 | YES |
| FR-010 | Evidence upload, proof analysis, Pokeballs, currency, shop, and inventory are absent from MVP flow | P0 | Non-goals | YES |

## 8. Non-Functional Requirements

| ID | Requirement | Target | Verification |
|---|---|---|---|
| NFR-001 | Project starts/runs as documented | documented command works | Smoke/fresh run |
| NFR-002 | Invalid or edge input is handled safely | no crash / controlled state | Unit/integration |
| NFR-003 | Output is understandable | clear UI state for progress, candidates, capture, and collection | Smoke/manual review |
| NFR-004 | Randomness is testable/demo-stable | seeded or controllable capture behavior | Unit/integration/manual validation |
| NFR-005 | Core interaction remains low-friction | checking a task requires no evidence upload | Manual review |

## 9. Data / Interface Requirements

Link to:

```txt
SPEC/INTERFACE_CONTRACT.md
SPEC/DATA_MODEL.md
```

## 10. Open Questions

| QID | Question | Impact | Status | Answer |
|---|---|---|---|---|
| Q-001 | Implementation stack | HIGH | OPEN | TBD |
| Q-002 | Asset strategy for private demo vs public release | MEDIUM | OPEN | Pokemon concept is acceptable for private demo; original creatures safer for public release |
| Q-003 | Deployment target | LOW | OPEN | Local-first unless requested |

## 11. Freeze Gate

```txt
[x] Project goal is clear
[x] Core flow is clear
[x] Must-have scope listed
[x] Out-of-scope items listed
[x] P0 requirements are testable
[x] Acceptance criteria ready
[ ] Major open questions closed or accepted as risk
[ ] Validator approves or accepted risk recorded
```
