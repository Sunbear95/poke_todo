# TASK_QUEUE.md

## 0. Purpose

Track task sequencing, ownership, dependencies, and validation state.

## 1. Task Rules

A task is not DONE until its exit criteria are satisfied and validation evidence is recorded when applicable.

## 2. Task Status Values

```txt
TODO
IN_PROGRESS
BLOCKED
VALIDATING
DONE
FAILED
DEFERRED
```

## 3. Active Task Queue

| Task ID | Title | Owner | Phase | Status | Related AC | Validation |
|---|---|---|---|---|---|---|
| T-001 | Repository/context inspection | Coordinator | PHASE_0 | DONE | N/A | PROJECT_CONTEXT.md |
| T-002 | Fill project context | Spec Agent | PHASE_0 | DONE | N/A | PROJECT_CONTEXT.md |
| T-003 | Generate PRD | Spec Agent | PHASE_1 | DONE | N/A | SPEC/PRD.md |
| T-004 | Generate acceptance criteria | Spec Agent | PHASE_1 | DONE | AC-* | SPEC/ACCEPTANCE_CRITERIA.md |
| T-005 | Define architecture/contracts/data model | Architect | PHASE_2 | DONE | AC-* | ARCHITECTURE.md, SPEC/INTERFACE_CONTRACT.md, SPEC/DATA_MODEL.md |
| T-006 | Create test plan | Test Engineer | PHASE_3 | DONE | All P0 | TEST/TEST_PLAN.md |
| T-007 | Select implementation stack and commands | Coordinator / Architect | PHASE_3 | TODO | AC-010 | STATUS.md, TEST/TEST_PLAN.md |
| T-008 | Implement MVP core loop | Builder | PHASE_4 | TODO | AC-001 through AC-009 | VALIDATION_REPORT.md |
| T-009 | Validate MVP behavior | Validator | PHASE_5 | TODO | All P0 | VALIDATION_REPORT.md |
| T-FINAL | Final validation/handoff | Validator | PHASE_6 | TODO | All P0 | VALIDATION_REPORT.md |

## 4. Task Template

```md
## T-XXX: [Task title]

### Status
TODO / IN_PROGRESS / BLOCKED / VALIDATING / DONE / FAILED / DEFERRED

### Owner
Coordinator / Spec Agent / Architect / Builder / Test Engineer / Validator

### Related Documents
-

### Related Acceptance Criteria
AC-XXX

### Allowed Files
-

### Exit Criteria
- [ ] implementation or document update complete
- [ ] tests or validation steps updated if needed
- [ ] validation evidence recorded if applicable
- [ ] STATUS.md updated
```
