# PROJECT_CONTEXT.md

## 0. Purpose

Define the project-specific context that overrides the generic harness.

Fill this file before implementation work begins.

## 1. Project Identity

```txt
Project name: Poke Todo
Project type: Web / Mobile-capable app concept
Primary language: TBD
Framework/tooling: TBD
Package manager: TBD
Runtime environment: Local-first development environment, final runtime TBD
Repository path: /Users/jyoo/Documents/poke_todo
```

## 2. Goal

```txt
One-line goal: Build a low-friction todo and habit app where completed daily actions become Pokemon-style encounters and capture progress.
Primary user: People who want a playful reason to keep returning to daily habits and tasks.
User problem: Standard todo apps feel dry, while detailed journaling or proof submission adds too much friction.
Expected outcome: Users can check tasks, preview likely reward creatures as silhouettes, complete a daily wrap-up, attempt captures, and see collection progress.
```

## 3. Constraints

```txt
Must follow:
- Checking a task must be enough to earn reward progress.
- Daily wrap-up is the main reward reveal moment.
- One completed item creates one encounter in the MVP.
- Repeated encounters with the same Pokemon-style creature increase capture probability.

Must avoid:
- Evidence upload in the MVP.
- AI proof analysis in the MVP.
- Pokeball consumption, currency, shop, or inventory systems in the MVP.
- Battles, social features, and full game progression in the MVP.

Technical constraints:
- Prefer a local-first app with bundled/demo creature data.
- Avoid external API and AI dependencies for MVP.
- Capture randomness must be controllable enough for tests and demo stability.

Design constraints:
- The product should feel easy, playful, and reward-forward.
- Candidate silhouettes should create anticipation but must not imply guaranteed rewards.
- The reward phase should be active: the user attempts capture.

Security/privacy constraints:
- MVP should not handle sensitive proof uploads or authentication.
- If Pokemon assets/names are used for a private demo, treat them as an IP risk before public release.

Performance constraints:
- Current MVP has no special performance target beyond responsive UI.

Deployment constraints:
- Local demo/run path is sufficient until deployment is explicitly required.
```

## 4. Scope

### In Scope

| ID | Item | Reason |
|---|---|---|
| SCOPE-001 | Daily task/habit checklist | Provides the low-friction action source |
| SCOPE-002 | Candidate creature silhouettes | Builds anticipation before daily wrap-up |
| SCOPE-003 | User-defined or demo-triggered daily wrap-up | Makes rewards feel like a day-end summary |
| SCOPE-004 | One completed item creates one encounter | Keeps the reward rule clear |
| SCOPE-005 | User-triggered capture attempt | Gives the reward phase an active game moment |
| SCOPE-006 | Repeat encounter capture-rate increase | Shows progression over time |
| SCOPE-007 | Collection/Pokedex-style view | Makes successful captures visible |

### Out of Scope

| ID | Item | Reason |
|---|---|---|
| OUT-001 | Evidence submission | Prevents friction in the MVP |
| OUT-002 | AI proof or activity analysis | Not needed for the first reward loop |
| OUT-003 | Pokeball consumption | Requires inventory/economy scope |
| OUT-004 | Currency, shop, or item inventory | Too much game-system scope for MVP |
| OUT-005 | Battles, leveling, or full game progression | Not needed to prove todo-to-capture value |
| OUT-006 | Social/friend features | Not needed for a solo core experience |
| OUT-007 | Complex long-term project hierarchy | Keep the first version focused on daily checklist and habits |
| OUT-008 | Production-ready Pokemon IP usage | Demo may use Pokemon to convey concept; public release should switch to original creatures |

## 5. Interface Decision

```txt
Primary interface: GUI
Reason: The core value depends on visible checklist progress, silhouettes, reward reveal, capture interaction, and collection state.
```

## 6. Data Policy

```txt
Persistent data required: YES
External API required: NO
Authentication required: NO
Sensitive data handled: NO
```

Persistence is needed for tasks, encounters, capture progress, and collection. Browser localStorage or equivalent local demo state is enough for MVP.

## 7. Success Definition

```txt
The project is successful when:
1. A user can check daily tasks/habits with no evidence upload.
2. The app previews 2-3 likely reward silhouettes before wrap-up.
3. Daily wrap-up creates one encounter per completed item.
4. The user can attempt capture and see success/failure feedback.
5. Repeated encounters visibly increase capture probability.
6. Captured creatures appear in a collection/Pokedex-style view.
```

## 8. Open Questions

| QID | Question | Owner | Status | Answer |
|---|---|---|---|---|
| Q-001 | Which implementation stack should be used? | Human/Agent | OPEN | TBD |
| Q-002 | Should the MVP use real Pokemon assets or original placeholder creatures during implementation? | Human | OPEN | Private demo may use Pokemon conceptually; public release should avoid IP risk |
| Q-003 | Is deployment required, or is a local demo enough? | Human | OPEN | Local demo is enough until deployment is requested |
