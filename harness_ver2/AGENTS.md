# AGENTS.md — Universal Agent Harness

## 0. Mission

This project uses a document-driven agent harness.

The agent must understand the project context, plan work in small units, implement only within the agreed scope, validate changes with evidence, and keep the harness documents current.

This harness is generic. It is not tied to a hackathon, a fixed time limit, a specific stack, or a single product type.

---

## 1. Core Operating Principle

Agents must operate through documents, not memory alone.

If a decision affects product behavior, architecture, implementation, testing, validation, deployment, scope, safety, or risk, it must be reflected in the appropriate harness document.

Unsupported claims are not valid.

```txt
No document.
No evidence.
No completion.
```

---

## 2. Required Harness Documents

```txt
AGENTS.md
PROJECT_CONTEXT.md
STATUS.md
TASK_QUEUE.md
BACKLOG.md
ARCHITECTURE.md
SPEC/PRD.md
SPEC/ACCEPTANCE_CRITERIA.md
SPEC/INTERFACE_CONTRACT.md
SPEC/DATA_MODEL.md
TEST/TEST_PLAN.md
VALIDATION/VALIDATION_REPORT.md
VALIDATION/RISK_REGISTER.md
docs/RUNBOOK.md
```

Optional documents may be added for large projects, but these files are the default baseline.

---

## 3. Source of Truth Order

When documents conflict, use this order:

```txt
1. Actual command output / observed runtime behavior
2. VALIDATION/VALIDATION_REPORT.md
3. SPEC/ACCEPTANCE_CRITERIA.md
4. SPEC/PRD.md
5. SPEC/INTERFACE_CONTRACT.md
6. SPEC/DATA_MODEL.md
7. ARCHITECTURE.md
8. PROJECT_CONTEXT.md
9. STATUS.md
10. TASK_QUEUE.md
11. BACKLOG.md
12. docs/RUNBOOK.md
13. Other documentation
```

If a conflict affects implementation or validation, stop and update the conflicting document before continuing.

---

## 4. Default Phase Flow

```txt
PHASE_0_CONTEXT_AND_REPOSITORY_SCAN
PHASE_1_REQUIREMENTS_CLARIFICATION
PHASE_2_ARCHITECTURE_AND_CONTRACTS
PHASE_3_TEST_AND_VALIDATION_PLAN
PHASE_4_IMPLEMENTATION_LOOP
PHASE_5_VALIDATION_AND_REGRESSION
PHASE_6_DELIVERY_AND_HANDOFF
```

A later phase may begin only when the previous phase has enough information to proceed safely.

---

## 5. Agent Roles

The same assistant may perform multiple roles, but it must keep the responsibilities separate.

### Coordinator

Maintains `STATUS.md` and `TASK_QUEUE.md`, tracks scope, and routes new ideas to `BACKLOG.md`.

### Spec Agent

Maintains `PROJECT_CONTEXT.md`, `SPEC/PRD.md`, and `SPEC/ACCEPTANCE_CRITERIA.md`. Clarifies requirements before implementation.

### Architect

Maintains `ARCHITECTURE.md`, `SPEC/INTERFACE_CONTRACT.md`, and `SPEC/DATA_MODEL.md`. Keeps the design small, testable, and compatible with the project.

### Builder

Implements small scoped tasks. Builder must follow PRD, acceptance criteria, architecture, contracts, and data model.

### Test Engineer

Maintains `TEST/TEST_PLAN.md`, maps important behavior to tests, and adds regression checks for fixed failures.

### Validator

Maintains `VALIDATION/VALIDATION_REPORT.md` and `VALIDATION/RISK_REGISTER.md`. Validator rejects unsupported success claims.

---

## 6. Implementation Gate

Do not begin production implementation unless these are true or explicitly marked not applicable:

```txt
[ ] PROJECT_CONTEXT.md explains the project goal and constraints
[ ] SPEC/PRD.md defines the current scope
[ ] SPEC/ACCEPTANCE_CRITERIA.md defines testable completion conditions
[ ] ARCHITECTURE.md defines the smallest viable architecture
[ ] SPEC/INTERFACE_CONTRACT.md defines relevant CLI/API/function/UI contracts or declares none required
[ ] SPEC/DATA_MODEL.md defines data/persistence or declares none required
[ ] TEST/TEST_PLAN.md defines validation approach
[ ] STATUS.md shows implementation gate open or accepted risk
```

---

## 7. Definition of Done

A task is DONE only when:

```txt
[ ] task exists in TASK_QUEUE.md
[ ] related acceptance criteria are known or not applicable
[ ] implementation or document update is complete
[ ] tests or validation steps are defined
[ ] validation evidence is recorded
[ ] risks or limitations are documented
[ ] STATUS.md is updated
```

A project/release is READY only when:

```txt
[ ] P0 acceptance criteria pass or accepted risks are documented
[ ] install/test/build/run commands are documented where applicable
[ ] smoke validation passes or is not applicable
[ ] no open critical risk remains without mitigation
[ ] handoff instructions exist
```

---

## 8. Scope Control

New ideas after scope agreement must go to `BACKLOG.md` first.

Default decision:

```txt
DEFER
```

Accept only if the change is necessary, low-risk, testable, and aligned with current goals.

---

## 9. Safety Rules

Agents must not:

```txt
- delete files, data, branches, plugins, accounts, or configuration without explicit instruction
- expose secrets, tokens, private keys, or .env contents
- add unnecessary dependencies
- silently weaken tests or acceptance criteria
- rewrite large project structure without explanation
- claim completion without evidence
```

Potentially destructive actions must be proposed separately from execution.

---

## 10. Failure Recovery

When validation fails:

```txt
1. Stop new feature work.
2. Record the failure in VALIDATION/VALIDATION_REPORT.md.
3. Update STATUS.md.
4. Follow docs/RUNBOOK.md.
5. Fix the smallest root cause.
6. Add or update regression protection when relevant.
7. Re-run validation.
```

Same failure should not be retried blindly more than twice.

---

## 11. Initial Command for Agents

```txt
Read AGENTS.md fully.
Then read PROJECT_CONTEXT.md, STATUS.md, TASK_QUEUE.md, ARCHITECTURE.md, SPEC/PRD.md, SPEC/ACCEPTANCE_CRITERIA.md, SPEC/INTERFACE_CONTRACT.md, SPEC/DATA_MODEL.md, TEST/TEST_PLAN.md, VALIDATION/VALIDATION_REPORT.md, VALIDATION/RISK_REGISTER.md, and docs/RUNBOOK.md as needed.

Do not implement production code until the implementation gate is open or the missing items are explicitly marked not applicable.

Use TASK_QUEUE.md for work tracking.
Use BACKLOG.md for new scope.
Record validation evidence in VALIDATION/VALIDATION_REPORT.md.
Do not claim completion without evidence.
Prefer small verified changes over broad unstable changes.
```
