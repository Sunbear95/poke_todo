# VALIDATION/VALIDATION_REPORT.md

## 0. Purpose

Record evidence-based validation results and prevent false success claims.

A task, feature, test, build, or release is not valid unless this file records what command was run, what result occurred, what passed, what failed, what was not checked, and what risk remains.

## 1. Status

```txt
Document status: DRAFT
Current validator: Validator
Current validation phase: MODEL_AND_UI_SHELL_VALIDATED
Final validator decision: PASS_WITH_ACCEPTED_SCOPE_LIMITS
```

## 2. Validator Authority

Only validation evidence can support PASS, FAIL, BLOCKED, or PASS_WITH_ACCEPTED_RISKS.

Builder claim is not evidence. Command output, file inspection, passing test result, and successful manual validation are evidence.

## 3. Command Evidence Table

| Run ID | Purpose | Command | Exit Status | Result | Evidence Notes |
|---|---|---|---:|---|---|
| V-001 | Model evaluator | `npm test` | 0 | PASS | 12 tests passed, 0 failed |
| V-002 | Model smoke check | `npm run smoke` | 0 | PASS | Poke Todo model smoke check passed |
| V-003 | Static UI build check | `npm run build` | 0 | PASS | Required public/src files are present and non-empty |
| V-004 | Local server response | `curl -I http://localhost:5173` | 0 | PASS | HTTP 200 OK from dev server |

## 4. Acceptance Criteria Validation Table

| AC ID | Test/Validation | Result | Evidence | Notes |
|---|---|---|---|---|
| AC-001 | TEST-001 | PASS | V-002, V-004 | Model smoke and local mobile web entry point respond |
| AC-002 | TEST-002 | PASS | V-001 | Checklist completion updates count |
| AC-003 | TEST-003 | PASS | V-001, V-003 | Candidate data marks previews as silhouettes and UI shell renders candidate cards |
| AC-004 | TEST-004/005 | PASS | V-001 | Wrap-up creates one encounter per completed item and none for incomplete items |
| AC-005 | TEST-006/007/008 | PASS | V-001, V-003 | Capture succeeds/fails safely without inventory; UI shell has capture action |
| AC-006 | TEST-009 | PASS | V-001 | Repeat encounter chance increases and caps |
| AC-007 | TEST-007 | PASS | V-001, V-003 | Collection data updates and UI shell has collection view |
| AC-008 | TEST-010 | PASS | V-001 | Deferred evidence/inventory state absent |
| AC-009 | TEST-011 | PASS_WITH_MANUAL_REVIEW_RECOMMENDED | V-003 | UI states exist; automated visual screenshot unavailable in this environment |
| AC-010 | TEST-012 | PASS | V-001, V-002, V-003, V-004 | `npm test`, `npm run smoke`, `npm run build`, and `npm run dev` server response work |

## 5. Failed Cases

| Failure ID | Title | Severity | Related AC | Status | Retry Count |
|---|---|---|---|---|---:|
| None | No validation failures recorded yet | N/A | N/A | N/A | 0 |

## 6. Regression Checks

| Regression ID | Original Failure | Related AC | Method | Result | Evidence |
|---|---|---|---|---|---|
| None | No fixed failures yet | N/A | N/A | NOT_APPLICABLE | N/A |

## 7. Validation Run Template

```md
## Validation Run V-XXX: [Title]

### Timestamp
TBD

### Trigger
Task completion / Full validation / Regression check / Final check / Manual review

### Scope
...

### Related Task
T-XXX

### Related Acceptance Criteria
AC-XXX

### Commands Run
```bash
...
```

### Command Results
- Command:
- Exit status:
- Result:
- Notes:

### Tests Summary
- Total:
- Passed:
- Failed:
- Skipped:
- Not run:

### Build Summary
- Build command:
- Result:

### Runtime / Smoke Summary
- Run command:
- Result:

### Failed Items
-

### Risks
-

### Validator Decision
PASS / FAIL / BLOCKED / PASS_WITH_ACCEPTED_RISKS
```

## 8. Final Decision Rules

PASS requires P0 AC pass, required tests pass, build/run validation passes or is not applicable, smoke validation passes, no unresolved critical risk remains, and evidence is recorded.
