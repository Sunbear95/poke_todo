# SPEC/ACCEPTANCE_CRITERIA.md

## 0. Purpose

Convert requirements into testable completion conditions.

A feature is complete only when its acceptance criteria pass validation or an accepted risk is recorded.

## 1. Rules

Every P0 requirement in `SPEC/PRD.md` must map to at least one acceptance criterion and one validation method.

Preferred format:

```txt
Given [initial condition]
When [user action or system event]
Then [expected visible/system result]
```

## 2. Status

```txt
Document status: DRAFT_READY_FOR_PLANNING
Validator decision: NOT_RUN
Frozen: NO
```

## 3. Core Acceptance Criteria

### AC-001: Daily checklist starts

```txt
Priority: P0
Related PRD Requirement: FR-001, NFR-001
Given the required runtime and dependencies are available.
When the documented run command or app entry point is executed.
Then the user sees today's task/habit checklist or a controlled empty/demo state without crashing.
Validation: Smoke test / Fresh run / Integration test
Status: NOT_STARTED
```

### AC-002: User can complete checklist items

```txt
Priority: P0
Related PRD Requirement: FR-002
Given the user is on the daily checklist.
When the user checks one or more tasks/habits.
Then those items are visibly complete and completed count updates.
Validation: Integration test / E2E test
Status: NOT_STARTED
```

### AC-003: Candidate silhouettes appear before wrap-up

```txt
Priority: P0
Related PRD Requirement: FR-003
Given at least one item is complete and wrap-up has not started.
When the checklist state updates.
Then the app shows 2-3 silhouette candidates as likely but not guaranteed rewards.
Validation: Integration test / Manual validation
Status: NOT_STARTED
```

### AC-004: Wrap-up creates encounters from completed items

```txt
Priority: P0
Related PRD Requirement: FR-004, FR-005
Given the user has completed N checklist items.
When daily wrap-up starts through time or the demo trigger.
Then the app creates N encounters and no encounters for incomplete items.
Validation: Unit test / Integration test
Status: NOT_STARTED
```

### AC-005: User can attempt capture

```txt
Priority: P0
Related PRD Requirement: FR-006, FR-007
Given the reward phase shows a pending encounter.
When the user attempts capture.
Then the app shows a success or failure result without requiring Pokeballs, currency, shop, or inventory state.
Validation: Integration test / Manual validation
Status: NOT_STARTED
```

### AC-006: Repeat encounters increase capture probability

```txt
Priority: P0
Related PRD Requirement: FR-008
Given the user has encountered the same creature before.
When that creature appears again.
Then the displayed capture probability is higher than the first encounter probability.
Validation: Unit test / Integration test
Status: NOT_STARTED
```

### AC-007: Successful captures appear in collection

```txt
Priority: P0
Related PRD Requirement: FR-009
Given a capture attempt succeeds.
When the user opens or views the collection/Pokedex screen.
Then the captured creature is visible there.
Validation: Integration test / E2E test / Manual validation
Status: NOT_STARTED
```

### AC-008: Deferred MVP features are absent

```txt
Priority: P0
Related PRD Requirement: FR-010, NFR-005
Given the user follows the MVP flow.
When they complete tasks, preview candidates, wrap up, and attempt captures.
Then the app does not require evidence upload, AI proof review, Pokeballs, currency, shop, or inventory management.
Validation: Static inspection / Manual validation
Status: NOT_STARTED
```

### AC-009: Output is understandable

```txt
Priority: P0
Related PRD Requirement: NFR-003
Given an operation succeeds, fails, or reaches an edge state.
When the system shows UI feedback.
Then the current result, next action, or error reason is clear to the intended user.
Validation: Smoke / Manual review / Snapshot test if available
Status: NOT_STARTED
```

### AC-010: Documented usage works

```txt
Priority: P0
Related PRD Requirement: NFR-001
Given a fresh environment with the required runtime installed.
When documented install/test/build/run steps are followed.
Then the project can be used without undocumented manual steps.
Validation: Fresh run check / Smoke test
Status: NOT_STARTED
```

## 4. Negative Acceptance Criteria

```txt
NAC-001: App must not crash when no tasks are completed.
NAC-002: App must not create encounters for incomplete tasks.
NAC-003: Candidate silhouettes must not be presented as guaranteed rewards.
NAC-004: Capture flow must not require Pokeball consumption, currency, shop, or inventory in MVP.
NAC-005: Evidence upload and AI proof analysis must not be required in MVP.
NAC-006: Agent must not mark work complete without validation evidence.
NAC-007: Late feature ideas must not bypass BACKLOG.md.
NAC-008: Secrets must not be printed or committed.
```

## 5. Acceptance Criteria Table

| ID | Title | Priority | Validation Method | Status | Evidence |
|---|---|---|---|---|---|
| AC-001 | Daily checklist starts | P0 | Smoke / Fresh run | NOT_STARTED | TBD |
| AC-002 | Checklist completion updates count | P0 | Integration / E2E | NOT_STARTED | TBD |
| AC-003 | Candidate silhouettes appear | P0 | Integration / Manual | NOT_STARTED | TBD |
| AC-004 | Wrap-up creates encounters | P0 | Unit / Integration | NOT_STARTED | TBD |
| AC-005 | Capture attempt resolves | P0 | Integration / Manual | NOT_STARTED | TBD |
| AC-006 | Repeat odds increase | P0 | Unit / Integration | NOT_STARTED | TBD |
| AC-007 | Collection updates after capture | P0 | Integration / E2E | NOT_STARTED | TBD |
| AC-008 | Deferred MVP features absent | P0 | Static / Manual | NOT_STARTED | TBD |
| AC-009 | Output understandable | P0 | Smoke / Manual | NOT_STARTED | TBD |
| AC-010 | Documented usage works | P0 | Fresh run | NOT_STARTED | TBD |
