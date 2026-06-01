# BACKLOG.md

## 0. Purpose

Scope-control buffer. New ideas, non-critical improvements, and deferred features go here before entering implementation.

Default decision for new features after scope agreement:

```txt
DEFER
```

## 1. Decision Values

```txt
ACCEPT
DEFER
REJECT
NEEDS_CLARIFICATION
CONVERT_TO_TEST
CONVERT_TO_BUGFIX
```

## 2. Priority Values

```txt
P0: Critical for core value or release
P1: Important for current milestone
P2: Useful but not required
P3: Nice-to-have
P4: Dangerous scope creep
```

## 3. Deferred Items

| ID | Title | Decision | Priority | Risk Labels | Reason |
|---|---|---|---|---|---|
| BL-001 | Evidence upload for completed tasks | DEFER | P2 | SCOPE_CREEP, DATA_MODEL_CHANGE | Useful later, but conflicts with low-friction MVP |
| BL-002 | AI proof analysis for notes/screenshots | DEFER | P2 | SCOPE_CREEP, UNTESTED | Depends on evidence upload and increases integration risk |
| BL-003 | Pokeball consumption | DEFER | P2 | SCOPE_CREEP, DATA_MODEL_CHANGE | Requires inventory/economy scope |
| BL-004 | Currency, shop, or item inventory | DEFER | P3 | SCOPE_CREEP | Too much game-system scope for the first version |
| BL-005 | Battles or full game progression | DEFER | P3 | SCOPE_CREEP | Not required to prove todo-to-capture loop |
| BL-006 | Social/friend features | DEFER | P3 | SCOPE_CREEP | Not needed for solo MVP |
| BL-007 | Complex long-term project hierarchy | DEFER | P2 | SCOPE_CREEP, UX_POLISH | Keep MVP centered on daily checklist and habits |
| BL-008 | Advanced AI recommendation | DEFER | P3 | UNTESTED | Hard to validate quickly and not core to MVP |
| BL-009 | Full authentication | DEFER | P3 | SECURITY, SCOPE_CREEP | Too much scope unless deployment/user accounts become required |
| BL-010 | Cloud deployment before local demo works | DEFER | P4 | DEPLOYMENT_RISK | Local demo first |
| BL-011 | Production-ready original creature system | DEFER | P2 | IP_RISK | Important before public release, but private demo can communicate Pokemon-style concept |
| BL-012 | UI animation polish | DEFER | P3 | UX_POLISH | Only after core validation is green |

## 4. Backlog Item Template

```md
## BL-XXX: [Title]

### Summary
...

### Priority
P0 / P1 / P2 / P3 / P4

### Risk Labels
SCOPE_CREEP / AMBIGUOUS / UNTESTED / DEPLOYMENT_RISK / DATA_MODEL_CHANGE / UX_POLISH / SECURITY / PERFORMANCE

### Critical for Current Goal?
YES / NO

### Ambiguity Impact
LOW / MEDIUM / HIGH

### Test Impact
LOW / MEDIUM / HIGH

### Implementation Risk
LOW / MEDIUM / HIGH

### Decision
ACCEPT / DEFER / REJECT / NEEDS_CLARIFICATION / CONVERT_TO_TEST / CONVERT_TO_BUGFIX

### Reason
...
```
