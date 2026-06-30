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
npm install

# Test
npm test

# Build
npm run build

# Run
npm run dev

# Run on phone with Expo Go
npm run mobile

# Run on phone through an Expo tunnel
npm run mobile:tunnel

# Smoke
npm run smoke
```

Current validation target is the model layer, local mobile web shell, and Expo Go mobile app shell.

## 4. Required Test Cases

| ID | Test | Priority | Type | Related AC | Status |
|---|---|---|---|---|---|
| TEST-001 | Model smoke flow starts and completes | P0 | Smoke | AC-001, AC-010 | PASS |
| TEST-002 | Completing checklist items updates completed count | P0 | Unit/Integration | AC-002 | PASS |
| TEST-003 | Candidate silhouettes show 2-3 likely creatures before wrap-up | P0 | Unit/Integration | AC-003 | PASS |
| TEST-004 | N completed items create N encounters at wrap-up | P0 | Unit/Integration | AC-004 | PASS |
| TEST-005 | Incomplete items do not create encounters | P0 | Unit | AC-004 | PASS |
| TEST-006 | User can attempt capture without inventory/Pokeballs | P0 | Unit/Integration | AC-005, AC-008 | PASS |
| TEST-007 | Capture can succeed and add creature to collection | P0 | Unit/Integration | AC-005, AC-007 | PASS |
| TEST-008 | Capture can fail without crashing or dead-ending flow | P0 | Unit/Integration | AC-005, AC-009 | PASS |
| TEST-009 | Repeat encounter increases displayed capture probability | P0 | Unit/Integration | AC-006 | PASS |
| TEST-010 | Deferred features are absent from MVP model state | P0 | Static/Unit | AC-008 | PASS |
| TEST-011 | Output states are understandable | P0 | Smoke/Manual | AC-009 | PASS_WITH_MANUAL_REVIEW_RECOMMENDED |
| TEST-012 | Documented test/build/smoke/dev/mobile commands work | P0 | Fresh run/Build | AC-010 | PASS |
| TEST-014 | Expo app dependencies match the installed SDK | P0 | Dependency check | AC-010 | PASS |
| TEST-015 | Expo app exports iOS and Android bundles | P0 | Build | AC-010 | PASS |
| TEST-013 | No critical skipped tests | P0 | Static inspection | NAC-006 | PASS |

## 5. Coverage Tracking

Track behavior coverage before raw line coverage.

```txt
Acceptance Criteria Coverage: MODEL_WEB_AND_EXPO_SHELL_PASS
Core Flow Coverage: MODEL_WEB_AND_EXPO_SHELL_PASS
Failure Case Coverage: MODEL_LAYER_PASS
Regression Coverage: NOT_APPLICABLE
Build / Run Coverage: LOCAL_WEB_AND_EXPO_SHELL_PASS
Line Coverage, if available: UNKNOWN
```

Known coverage gaps:

| Gap ID | Coverage Gap | Severity | Related AC/Risk | Status | Required Action |
|---|---|---|---|---|---|
| CG-001 | Production native binary build commands are not selected yet | Medium | AC-010 | OPEN | Fill EAS/build commands if app-store packaging is selected |
| CG-002 | No automated browser/UI tests yet | Medium | AC-001, AC-003, AC-005, AC-007, AC-009 | OPEN | Add browser automation when Playwright/browser tooling is available |
| CG-003 | Capture randomness needs deterministic control | Medium | AC-005, AC-006 | MITIGATED | Model accepts injected random values |

## 6. Final Minimum Test Requirement

```txt
[x] Core smoke test passes for model layer
[x] P0 model-layer acceptance criteria are validated
[x] Invalid/edge behavior is validated for model layer
[x] Build/run command is validated for local web and Expo Go shell
[x] Fresh usage instructions are validated for test/smoke commands
[x] No critical skipped tests exist
[x] Validator records command evidence
```
