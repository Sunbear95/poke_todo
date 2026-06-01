# docs/RUNBOOK.md

## 0. Purpose

Operational recovery manual. When something goes wrong, agents must follow this runbook instead of improvising.

## 1. General Recovery Rule

```txt
1. Stop new feature work.
2. Read STATUS.md.
3. Read VALIDATION/VALIDATION_REPORT.md.
4. Record or update the failed case.
5. Identify failure type.
6. Fix the smallest root cause.
7. Add regression protection if applicable.
8. Re-run validation.
9. Update STATUS.md.
```

Forbidden: blindly retrying, adding features while critical failure is open, silently changing PRD, weakening AC, deleting tests, or hiding failed validation.

## 2. Failure Types and Responses

### Requirements unclear

Stop implementation, update `SPEC/PRD.md` and `SPEC/ACCEPTANCE_CRITERIA.md`, record risk, and resume only when the required decision is clear or accepted as risk.

### Tests fail

Record failure, link AC/test, decide whether test or implementation is wrong, fix smallest cause, add regression if real bug, re-run targeted validation.

### Build fails

Stop feature work, record failure, inspect first build error, fix import/type/dependency/config, run build again. If failure repeats twice, create recovery task.

### App/tool does not start

Confirm run command, record output, check env vars/port/runtime errors, fix smallest cause, re-run smoke test.

### Interface contract mismatch

Stop implementation across the boundary, update `SPEC/INTERFACE_CONTRACT.md`, update tests, then continue.

### External API fails

Switch to mock/demo data when possible, record risk/failure if P0 affected, validate fallback path.

### AI output unstable

Validate schema, avoid exact wording tests, use mocked AI output for tests, add deterministic fallback.

### Scope expands

Stop expansion, record idea in `BACKLOG.md`, accept only current-goal-critical changes.

### Parallel work conflicts

Stop parallel work, return control to Coordinator, define canonical implementation, run integration tests. If conflicts happen twice, disable parallelization.

## 3. Retry Policy

```txt
Same failure may be retried at most 2 times.
After retry count reaches 2:
1. Stop direct fix attempts.
2. Create recovery task in TASK_QUEUE.md.
3. Record repeated failure analysis.
4. Consider rollback or scope reduction.
```

## 4. Recovery Task Template

```md
## Recovery Task R-XXX: [Failure title]

### Trigger
...

### Last Known Passing State
...

### Failing Command or Step
```bash
...
```

### Related Failure
F-XXX

### Related Risk
R-XXX

### Recovery Plan
1.
2.
3.

### Scope Reduction Option
...

### Exit Criteria
- [ ] failure reproduced or evidence sufficient
- [ ] root cause isolated
- [ ] fix or scope reduction applied
- [ ] regression check added or risk accepted
- [ ] targeted validation passes
- [ ] STATUS.md updated
```
