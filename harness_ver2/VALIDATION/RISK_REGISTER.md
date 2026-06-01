# VALIDATION/RISK_REGISTER.md

## 0. Purpose

Track risks before they become failures.

Risk: something that may cause failure later. Failure: something that already failed validation.

## 1. Status

```txt
Document status: DRAFT
Open risks: 2
Critical risks: 0
Accepted risks: 0
Validator decision: NOT_RUN
```

## 2. Risk Rules

Every major risk must be recorded and must have mitigation. Critical risks block final PASS unless explicitly mitigated or accepted with fallback.

## 3. Categories

```txt
AMBIGUITY
SCOPE_CREEP
TEST_COVERAGE
FALSE_SUCCESS
BUILD
RUNTIME
DEPLOYMENT
EXTERNAL_API
AI_NONDETERMINISM
AUTH
DATABASE
STATE_MANAGEMENT
UI_COMPLEXITY
PARALLEL_WORK
FILE_CONFLICT
COST
SECURITY
PERFORMANCE
DOCUMENTATION
USER_EXPERIENCE
HUMAN_INTERVENTION
IP_RISK
```

## 4. Active Risk Table

| Risk ID | Title | Category | Severity | Probability | Status | Mitigation |
|---|---|---|---|---|---|---|
| R-001 | Implementation stack not selected | AMBIGUITY | High | High | MITIGATED | Model layer uses Node.js >= 22, npm, and node:test |
| R-002 | Scope creep into proof upload, AI, inventory, or battles | SCOPE_CREEP | High | Medium | OPEN | Enforce BACKLOG.md and AC-008 |
| R-003 | False success claim | FALSE_SUCCESS | Critical | Medium | MITIGATED | `npm test` and `npm run smoke` evidence recorded in VALIDATION_REPORT.md |
| R-004 | Test coverage not implemented yet | TEST_COVERAGE | High | High | MITIGATED | Model-layer tests cover checklist, candidates, wrap-up, capture, repeat odds, collection, and deferred features |
| R-005 | Pokemon IP risk for public release | IP_RISK | High | Medium | OPEN | Limit Pokemon usage to private demo; use original creatures before public release |
| R-006 | Capture randomness destabilizes validation/demo | USER_EXPERIENCE | Medium | Medium | MITIGATED | Capture model accepts injected `randomValue` for deterministic tests and demo controls |

## 5. Risk Template

```md
## R-XXX: [Risk title]

### Status
OPEN / MITIGATING / MITIGATED / ACCEPTED / TRIGGERED / CLOSED / DEFERRED

### Category
...

### Severity
Critical / High / Medium / Low

### Probability
High / Medium / Low / Unknown

### Description
...

### Trigger Condition
...

### Impact
...

### Mitigation Plan
1.
2.
3.

### Fallback Plan
...

### If Triggered, Record Failure
F-XXX in VALIDATION/VALIDATION_REPORT.md
```
