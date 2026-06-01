# Universal Agent Harness

A reusable, document-driven harness for AI agents working on software projects.

This harness was generalized from a Ralphton-style autonomous development harness. The event-specific rules have been removed, including fixed time boxes, hackathon theme dependency, demo-only judging assumptions, and the rule that humans must not touch production code. What remains is a practical operating system for agent-assisted development.

The goal is simple:

```txt
Make agent work repeatable, auditable, safe, and easy to resume.
```

---

## 1. What This Is

The Universal Agent Harness is a set of Markdown documents that guide an AI agent through a project in a controlled way.

Instead of asking an agent to remember everything in chat, the harness gives it explicit documents for:

- project context
- requirements
- architecture
- interface contracts
- data model
- tasks
- tests
- validation evidence
- risks
- recovery procedures

The harness is useful when you want an agent to work on a project over multiple sessions without losing direction or making unsupported claims.

Core principle:

```txt
No document.
No evidence.
No completion.
```

---

## 2. When To Use This Harness

Use this harness for projects where you want structured agent work, especially:

- CLI tools
- web apps
- APIs
- mobile apps
- libraries
- scripts
- automation tools
- documentation-heavy projects
- refactoring projects
- MVP planning
- Codex / Claude / agent-based coding workflows

It is especially helpful when a project has many moving parts and you want the agent to follow a stable process instead of improvising.

---

## 3. What Changed From The Ralphton Version

The original Ralphton harness had 24 Markdown files and was optimized for an autonomous hackathon flow.

This generic version keeps the useful control structure but removes the hackathon-only assumptions.

Removed or generalized:

```txt
- fixed 2.5-hour time strategy
- hackathon theme reveal dependency
- no-human-keyboard production code rule
- demo-only product evaluation
- mandatory 2-minute demo flow
- overly separated final checklist, demo, deployment, failed-case, and regression files
```

Preserved:

```txt
- document-driven operation
- source-of-truth order
- implementation gates
- scope control
- PRD and acceptance criteria
- architecture freeze discipline
- interface and data contracts
- test planning
- validation evidence
- risk tracking
- recovery runbook
```

---

## 4. File Structure

Recommended structure:

```txt
universal-agent-harness/
├── README.md
├── AGENTS.md
├── PROJECT_CONTEXT.md
├── STATUS.md
├── TASK_QUEUE.md
├── BACKLOG.md
├── ARCHITECTURE.md
├── MIGRATION_MAP.md
├── SPEC/
│   ├── PRD.md
│   ├── ACCEPTANCE_CRITERIA.md
│   ├── INTERFACE_CONTRACT.md
│   └── DATA_MODEL.md
├── TEST/
│   └── TEST_PLAN.md
├── VALIDATION/
│   ├── VALIDATION_REPORT.md
│   └── RISK_REGISTER.md
└── docs/
    └── RUNBOOK.md
```

This version uses 16 Markdown files total.

---

## 5. File Roles

### `AGENTS.md`

The root operating rulebook for agents.

It defines:

- how the agent should work
- which files are source of truth
- when implementation is allowed
- how validation must be recorded
- what the agent must not claim without evidence

Agents should read this file before doing project work.

---

### `PROJECT_CONTEXT.md`

The project seed and override document.

Use it to define:

- project name
- project goal
- target user
- problem
- product type
- tech stack
- non-goals
- special project constraints

Fill this first when applying the harness to a new project.

---

### `STATUS.md`

The live control panel.

Use it to track:

- current phase
- current task
- implementation gate
- validation state
- active blockers
- next action

Keep this updated when the project state changes.

---

### `TASK_QUEUE.md`

The work queue.

Use it to track:

- task IDs
- task owners
- task status
- related acceptance criteria
- validation state
- exit criteria

A task should not be considered done until validation evidence exists.

---

### `BACKLOG.md`

The scope-control buffer.

Use it for:

- future ideas
- non-MVP features
- risky additions
- deferred improvements
- scope creep prevention

Default decision for new ideas should usually be `DEFER` unless they are required for the current goal.

---

### `ARCHITECTURE.md`

The architecture decision file.

Use it to define:

- project type
- high-level architecture
- module responsibilities
- architectural decisions
- architecture freeze gate

The default architecture should be boring, small, testable, and easy to recover.

---

### `SPEC/PRD.md`

The product requirements document.

Use it to define:

- product summary
- problem definition
- goals
- MVP scope
- functional requirements
- non-functional requirements
- core user flow

Implementation should not start from a vague idea. Convert the idea into testable requirements first.

---

### `SPEC/ACCEPTANCE_CRITERIA.md`

The completion criteria document.

Use it to define testable outcomes in this style:

```txt
Given [initial condition]
When [user action or system event]
Then [expected visible or system result]
```

Every important requirement should map to at least one acceptance criterion and one validation method.

---

### `SPEC/INTERFACE_CONTRACT.md`

The interface contract document.

Use it to define contracts for:

- CLI commands
- internal functions
- HTTP APIs
- AI provider calls
- external APIs
- file input/output
- UI or user-facing output states

Agents must not guess request shapes, response shapes, output formats, or failure behavior.

---

### `SPEC/DATA_MODEL.md`

The data model document.

Use it to define:

- whether persistence is required
- storage strategy
- entities
- fields
- validation rules
- input/output data
- reset behavior

If no persistent data is needed, explicitly declare that.

---

### `TEST/TEST_PLAN.md`

The test strategy document.

Use it to define:

- test philosophy
- required test types
- test commands
- acceptance-criteria mapping
- smoke tests
- regression expectations
- coverage priorities

The focus is behavior coverage, not raw line coverage.

---

### `VALIDATION/VALIDATION_REPORT.md`

The evidence log.

Use it to record:

- commands run
- exit status
- test results
- build results
- runtime results
- smoke test results
- acceptance criteria results
- validator decision

Agent confidence is not evidence. Command output, test results, file inspection, and successful smoke checks are evidence.

---

### `VALIDATION/RISK_REGISTER.md`

The risk tracker.

Use it to record:

- ambiguous requirements
- scope creep
- weak tests
- build/run uncertainty
- external API risk
- AI nondeterminism
- deployment risk
- security risk
- destructive action risk

A risk is something that may cause failure later. Track it before it becomes a failure.

---

### `docs/RUNBOOK.md`

The recovery manual.

Use it when something goes wrong.

It defines how to respond to:

- unclear requirements
- failing tests
- build failures
- app startup failures
- external API failures
- unstable AI output
- scope expansion
- repeated failures
- destructive operations

The agent should follow the runbook instead of randomly retrying.

---

### `MIGRATION_MAP.md`

The conversion guide from the original Ralphton harness.

Use it to understand:

- which files were kept
- which files were renamed
- which files were merged
- which files were removed
- where old responsibilities moved in the generic version

---

## 6. Quick Start

### Step 1. Copy the harness into your project

```bash
cp -R universal-agent-harness .agent-harness
```

Or copy the files directly into the project root if you want the harness documents to be first-class project files.

Recommended for Codex-style workflows:

```txt
project-root/
├── AGENTS.md
├── PROJECT_CONTEXT.md
├── STATUS.md
├── TASK_QUEUE.md
├── BACKLOG.md
├── ARCHITECTURE.md
├── SPEC/
├── TEST/
├── VALIDATION/
└── docs/
```

---

### Step 2. Fill `PROJECT_CONTEXT.md`

Start with:

```txt
Project name:
Project goal:
Primary user:
Problem:
Product type:
Tech stack:
Must have:
Must avoid:
```

Do not let the agent implement major production code before the project context and basic requirements are clear.

---

### Step 3. Ask the agent to read `AGENTS.md`

Example prompt:

```txt
Read AGENTS.md fully.
Use this harness as the operating system for this project.
Before implementing, inspect PROJECT_CONTEXT.md, STATUS.md, TASK_QUEUE.md, SPEC/PRD.md, SPEC/ACCEPTANCE_CRITERIA.md, ARCHITECTURE.md, TEST/TEST_PLAN.md, and VALIDATION/VALIDATION_REPORT.md.
Do not claim completion without validation evidence.
```

---

### Step 4. Define requirements before implementation

Fill or ask the agent to fill:

```txt
SPEC/PRD.md
SPEC/ACCEPTANCE_CRITERIA.md
ARCHITECTURE.md
SPEC/INTERFACE_CONTRACT.md
SPEC/DATA_MODEL.md
TEST/TEST_PLAN.md
```

Then open the implementation gate in `STATUS.md` only when the project has enough clarity.

---

### Step 5. Implement in small tasks

Each task should be:

- listed in `TASK_QUEUE.md`
- tied to requirements or acceptance criteria
- implemented in a small change
- tested or smoke-validated
- recorded in `VALIDATION/VALIDATION_REPORT.md`

---

### Step 6. Validate before calling it done

Before marking work complete, record evidence:

```txt
Command:
Exit status:
Result:
Passed:
Failed:
Skipped:
Evidence location:
Remaining risk:
Validator decision:
```

---

## 7. Recommended Agent Workflow

Use this sequence for non-trivial work:

```txt
1. Read AGENTS.md
2. Read PROJECT_CONTEXT.md
3. Inspect current repository
4. Update STATUS.md
5. Convert goal into PRD requirements
6. Create or refine acceptance criteria
7. Freeze the smallest viable architecture
8. Define interface and data contracts
9. Map requirements to tests
10. Add task to TASK_QUEUE.md
11. Implement the smallest change
12. Run tests/build/smoke checks
13. Record evidence in VALIDATION_REPORT.md
14. Update risks and backlog
15. Report result with evidence
```

---

## 8. Implementation Gate

Production implementation should be blocked when any of these are missing:

```txt
[ ] PROJECT_CONTEXT.md is filled
[ ] SPEC/PRD.md exists and has MVP requirements
[ ] SPEC/ACCEPTANCE_CRITERIA.md maps important behavior
[ ] ARCHITECTURE.md defines the smallest viable architecture
[ ] SPEC/INTERFACE_CONTRACT.md defines required interfaces or declares none
[ ] SPEC/DATA_MODEL.md defines persistence or declares none
[ ] TEST/TEST_PLAN.md defines validation approach
[ ] STATUS.md shows implementation gate open
```

This gate can be relaxed for tiny experiments, but the relaxation should be recorded as a risk.

---

## 9. Validation Rule

Do not accept statements like:

```txt
Done.
Tests pass.
Build works.
No issues.
Ready.
```

unless they include evidence.

Valid completion report example:

```txt
Action: Implemented CLI argument validation.
Evidence: Ran `npm test`; 18 passed, 0 failed. Ran `npm run build`; exit 0.
Result: AC-003 PASS.
Risk: No E2E coverage yet; tracked in RISK_REGISTER.md.
Next: Add smoke test for documented run command.
```

---

## 10. How To Customize For A Project

Keep the harness generic. Put project-specific rules in `PROJECT_CONTEXT.md` or the project root `AGENTS.md`.

Examples:

### CLI project

```txt
Interface: CLI
Must avoid: Do not create a web UI unless explicitly requested.
Validation: CLI command smoke test required.
```

### Web app

```txt
Interface: Web UI
Must define: initial, empty, input, loading, success, error states.
Validation: build + smoke run required.
```

### API project

```txt
Interface: HTTP API
Must define: endpoint, method, request body, response body, error shape.
Validation: integration tests for success and failure responses.
```

### AI project

```txt
External dependency: AI provider
Must define: prompt contract, output schema, fallback behavior, mock mode.
Validation: automated tests must use mock output by default.
```

---

## 11. Practical Notes

- Do not overfill every document before doing anything.
- Fill enough to make the next implementation step safe.
- Keep tasks small.
- Prefer local validation before deployment.
- Move tempting but non-essential ideas to `BACKLOG.md`.
- Record uncertainty as risk instead of hiding it.
- Treat validation evidence as stronger than agent confidence.

---

## 12. Suggested First Prompt

Use this prompt when starting a new project with the harness:

```txt
Read AGENTS.md fully.
Use the Universal Agent Harness as the operating system for this project.

First, inspect the repository and fill or update:
- PROJECT_CONTEXT.md
- STATUS.md
- TASK_QUEUE.md
- ARCHITECTURE.md

Then create or refine:
- SPEC/PRD.md
- SPEC/ACCEPTANCE_CRITERIA.md
- SPEC/INTERFACE_CONTRACT.md
- SPEC/DATA_MODEL.md
- TEST/TEST_PLAN.md

Do not implement production code until the implementation gate is open or you explicitly record why a limited exception is safe.

For every success claim, record evidence in VALIDATION/VALIDATION_REPORT.md.
```

---

## 13. Suggested Final Report Format

When a task is complete, the agent should report:

```txt
Status:
Changed files:
Requirement / AC covered:
Commands run:
Validation result:
Evidence location:
Known limitations:
Risks:
Next action:
```

Avoid unsupported summaries like `everything works`.

---

## 14. License / Reuse

This harness is intended to be copied, modified, reduced, and adapted per project.

Use the full structure for larger projects. For small projects, you can keep only:

```txt
AGENTS.md
PROJECT_CONTEXT.md
STATUS.md
TASK_QUEUE.md
SPEC/PRD.md
SPEC/ACCEPTANCE_CRITERIA.md
TEST/TEST_PLAN.md
VALIDATION/VALIDATION_REPORT.md
```

Add the other files when the project grows.
