# MIGRATION_MAP.md

## 0. Purpose

Show how the original 24-file Ralphton harness was converted into a smaller universal harness.

## 1. Main Changes

Removed Ralphton-specific assumptions:

```txt
- fixed 2.5-hour time strategy
- hackathon theme reveal dependency
- no-human-keyboard rule
- demo-only judging focus
- autonomous-only production-code restriction
```

Kept universal concepts:

```txt
- document-driven agent operation
- source-of-truth order
- scope control
- requirement clarification
- implementation gates
- validation evidence
- risk tracking
- recovery runbook
```

## 2. File Mapping

| Original File | Universal File | Decision |
|---|---|---|
| AGENTS.md | AGENTS.md | Rewritten generically |
| PRODUCT_IDEA.md | PROJECT_CONTEXT.md | Renamed and generalized |
| STATUS.md | STATUS.md | Kept, generalized |
| TASK_QUEUE.md | TASK_QUEUE.md | Kept, generalized |
| BACKLOG.md | BACKLOG.md | Kept, generalized |
| ARCHITECTURE.md | ARCHITECTURE.md | Kept, generalized |
| COST_OPTIMIZATION_REPORT.md | Removed | Merge important cost/risk ideas into RISK_REGISTER and AGENTS |
| FINAL_CHECKLIST.md | Removed | Merge final readiness into VALIDATION_REPORT and AGENTS |
| SPEC/PRD.md | SPEC/PRD.md | Kept, generalized |
| SPEC/ACCEPTANCE_CRITERIA.md | SPEC/ACCEPTANCE_CRITERIA.md | Kept, generalized |
| SPEC/AMBIGUITY_REPORT.md | Removed | Merge open questions into PROJECT_CONTEXT and PRD |
| SPEC/API_CONTRACT.md | SPEC/INTERFACE_CONTRACT.md | Renamed to include CLI/function/UI/API |
| SPEC/DATA_MODEL.md | SPEC/DATA_MODEL.md | Kept, generalized |
| SPEC/UI_STATES.md | Removed | Merge into INTERFACE_CONTRACT and AC for CLI/API/UI outputs |
| TEST/TEST_PLAN.md | TEST/TEST_PLAN.md | Kept, generalized |
| TEST/TEST_MAPPING.md | Removed | Merge mapping into TEST_PLAN and VALIDATION_REPORT |
| TEST/COVERAGE_REPORT.md | Removed | Merge behavior coverage into TEST_PLAN and VALIDATION_REPORT |
| VALIDATION/VALIDATION_REPORT.md | VALIDATION/VALIDATION_REPORT.md | Kept, generalized |
| VALIDATION/FAILED_CASES.md | Removed | Merge failed cases into VALIDATION_REPORT |
| VALIDATION/RISK_REGISTER.md | VALIDATION/RISK_REGISTER.md | Kept, generalized |
| VALIDATION/REGRESSION_LOG.md | Removed | Merge regression table into VALIDATION_REPORT |
| docs/DEMO_SCRIPT.md | Removed | Optional per project; not universal baseline |
| docs/DEPLOYMENT.md | Removed | Merge commands into STATUS and final validation |
| docs/RUNBOOK.md | docs/RUNBOOK.md | Kept, generalized |

## 3. Universal Baseline File List

```txt
README.md
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
MIGRATION_MAP.md
```

## 4. Optional Add-ons

Add these only when a project needs them:

```txt
docs/DEMO_SCRIPT.md              For presentations or demos
VALIDATION/FAILED_CASES.md       For large projects with many failures
VALIDATION/REGRESSION_LOG.md     For mature test suites
TEST/COVERAGE_REPORT.md          For coverage-heavy projects
SPEC/UI_STATES.md                For complex UI projects
SPEC/API_CONTRACT.md             For API-heavy projects, instead of generic INTERFACE_CONTRACT
COST_OPTIMIZATION_REPORT.md      For paid API/model-heavy workflows
```
