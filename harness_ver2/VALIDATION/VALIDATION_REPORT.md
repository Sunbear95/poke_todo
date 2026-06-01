# VALIDATION/VALIDATION_REPORT.md

## 0. Purpose

Record evidence-based validation results and prevent false success claims.

A task, feature, test, build, or release is not valid unless this file records what command was run, what result occurred, what passed, what failed, what was not checked, and what risk remains.

## 1. Status

```txt
Document status: DRAFT
Current validator: Validator
Current validation phase: NOT_STARTED
Final validator decision: NOT_RUN
```

## 2. Validator Authority

Only validation evidence can support PASS, FAIL, BLOCKED, or PASS_WITH_ACCEPTED_RISKS.

Builder claim is not evidence. Command output, file inspection, passing test result, and successful manual validation are evidence.

## 3. Command Evidence Table

| Run ID | Purpose | Command | Exit Status | Result | Evidence Notes |
|---|---|---|---:|---|---|
| V-001 | Harness document consistency inspection | `rg -n "TBD|UNKNOWN|Poke Todo|AC-010|FR-010" harness_ver2` | TBD | NOT_RUN | Run after harness update review |

## 4. Acceptance Criteria Validation Table

| AC ID | Test/Validation | Result | Evidence | Notes |
|---|---|---|---|---|
| AC-001 | TEST-001 | NOT_RUN | TBD | Daily checklist starts |
| AC-002 | TEST-002 | NOT_RUN | TBD | Checklist completion updates count |
| AC-003 | TEST-003 | NOT_RUN | TBD | Candidate silhouettes appear |
| AC-004 | TEST-004/005 | NOT_RUN | TBD | Wrap-up creates one encounter per completed item |
| AC-005 | TEST-006/007/008 | NOT_RUN | TBD | Capture action resolves safely |
| AC-006 | TEST-009 | NOT_RUN | TBD | Repeat encounter increases capture odds |
| AC-007 | TEST-007 | NOT_RUN | TBD | Captured creature appears in collection |
| AC-008 | TEST-010 | NOT_RUN | TBD | Deferred MVP features absent |
| AC-009 | TEST-011 | NOT_RUN | TBD | Output understandable |
| AC-010 | TEST-012 | NOT_RUN | TBD | Documented usage works |

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
