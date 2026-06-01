# TEST/TEST_PLAN.md

## 0. Purpose

Define the test and validation strategy.

Tests are the harness.

## 1. Test Philosophy

```txt
1. Test behavior, not implementation details.
2. Test the core flow first.
3. Test invalid and edge states early.
4. Test failure states before polish.
5. Add regression checks for every meaningful fixed bug.
6. Prefer deterministic tests over fragile tests.
7. Do not trust success claims without command evidence.
```

Cut features before cutting essential tests.

## 2. Required Test Types

| Type | Purpose | Required For |
|---|---|---|
| Unit | deterministic logic | candidate selection, encounter generation, capture probability |
| Integration | parts working together | checklist, silhouettes, wrap-up, capture, collection |
| E2E | real user flow | final MVP if setup is cheap and stable |
| Smoke | app/tool starts and core path begins | readiness |
| Regression | fixed bug does not return | fixed failures |
| Manual validation | human-observed flow or documentation check | handoff/release |

## 3. Commands

```bash
# Install
TBD

# Test
TBD

# Build
TBD

# Run
TBD

# Smoke
TBD
```

Commands remain TBD until the implementation stack is selected.

## 4. Required Test Cases

| ID | Test | Priority | Type | Related AC | Status |
|---|---|---|---|---|---|
| TEST-001 | App starts and daily checklist or controlled empty/demo state is visible | P0 | Smoke/Integration | AC-001, AC-010 | NOT_STARTED |
| TEST-002 | Completing checklist items updates completed count | P0 | Integration | AC-002 | NOT_STARTED |
| TEST-003 | Candidate silhouettes show 2-3 likely creatures before wrap-up | P0 | Integration/Manual | AC-003 | NOT_STARTED |
| TEST-004 | N completed items create N encounters at wrap-up | P0 | Unit/Integration | AC-004 | NOT_STARTED |
| TEST-005 | Incomplete items do not create encounters | P0 | Unit | AC-004 | NOT_STARTED |
| TEST-006 | User can attempt capture without inventory/Pokeballs | P0 | Integration | AC-005, AC-008 | NOT_STARTED |
| TEST-007 | Capture can succeed and add creature to collection | P0 | Unit/Integration | AC-005, AC-007 | NOT_STARTED |
| TEST-008 | Capture can fail without crashing or dead-ending flow | P0 | Unit/Integration | AC-005, AC-009 | NOT_STARTED |
| TEST-009 | Repeat encounter increases displayed capture probability | P0 | Unit/Integration | AC-006 | NOT_STARTED |
| TEST-010 | Deferred features are absent from MVP UI | P0 | Static/Manual | AC-008 | NOT_STARTED |
| TEST-011 | Output states are understandable | P0 | Smoke/Manual | AC-009 | NOT_STARTED |
| TEST-012 | Documented install/test/build/run steps work | P0 | Fresh run/Build | AC-010 | NOT_STARTED |
| TEST-013 | No critical skipped tests | P0 | Static inspection | NAC-006 | NOT_STARTED |

## 5. Coverage Tracking

Track behavior coverage before raw line coverage.

```txt
Acceptance Criteria Coverage: PLANNED
Core Flow Coverage: PLANNED
Failure Case Coverage: PLANNED
Regression Coverage: NOT_APPLICABLE
Build / Run Coverage: UNKNOWN
Line Coverage, if available: UNKNOWN
```

Known coverage gaps:

| Gap ID | Coverage Gap | Severity | Related AC/Risk | Status | Required Action |
|---|---|---|---|---|---|
| CG-001 | Build/run commands unknown until stack selection | Medium | AC-010 | OPEN | Fill commands after implementation stack is selected |
| CG-002 | No implemented tests yet | High | All P0 AC | OPEN | Add tests during implementation |
| CG-003 | Capture randomness needs deterministic control | Medium | AC-005, AC-006 | OPEN | Use seeded random/manual demo controls |

## 6. Final Minimum Test Requirement

```txt
[ ] Core smoke test passes
[ ] P0 acceptance criteria are validated
[ ] Invalid/edge behavior is validated
[ ] Build/run command is validated or marked not applicable
[ ] Fresh usage instructions are validated where applicable
[ ] No critical skipped tests exist
[ ] Validator records command evidence
```
