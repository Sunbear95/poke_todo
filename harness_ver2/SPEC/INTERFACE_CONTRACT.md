# SPEC/INTERFACE_CONTRACT.md

## 0. Purpose

Define API, CLI, function, UI, AI, storage, and external interface contracts.

Agents must not guess request/response shapes or command behavior.

## 1. Interface Decision

```txt
Primary interface: UI
Reason: The product value depends on visible checklist progress, silhouettes, wrap-up reveal, capture interaction, and collection state.
```

Default: prefer the simplest interface required for the core goal.

## 2. Contract Rules

Every P0 interface must define name, input shape, output shape, error shape, validation rules, examples, related AC, and tests.

Parallel work across interface boundaries is discouraged until relevant contracts are defined.

## 3. Contract Summary

| Contract ID | Type | Name | MVP Required? | Status | Related AC |
|---|---|---|---|---|---|
| IF-001 | UI_EVENT | toggleChecklistItem | YES | DRAFT | AC-002 |
| IF-002 | INTERNAL_FUNCTION | selectCandidateCreatures | YES | DRAFT | AC-003 |
| IF-003 | INTERNAL_FUNCTION | startDailyWrapUp | YES | DRAFT | AC-004 |
| IF-004 | UI_EVENT | attemptCapture | YES | DRAFT | AC-005, AC-006, AC-007 |
| IF-005 | LOCAL_STORAGE | persistLocalDemoState | YES | DRAFT | AC-001, AC-007, AC-010 |
| IF-006 | AI_PROVIDER | proofOrActivityAnalysis | NO | DEFERRED | AC-008 |

Types: CLI_COMMAND, INTERNAL_FUNCTION, HTTP_API, LIBRARY_API, UI_EVENT, DATABASE_ACCESS, AI_PROVIDER, EXTERNAL_API, LOCAL_STORAGE, FILE_IO, MOCK_INTERFACE.

## 4. UI / Function Contracts

## IF-001: toggleChecklistItem

### Type
UI_EVENT / INTERNAL_FUNCTION

### Input Shape
```json
{
  "todoId": "string",
  "completed": true
}
```

### Success Shape
```json
{
  "ok": true,
  "data": {
    "completedCount": 1,
    "todos": []
  }
}
```

### Error Shape
```json
{
  "ok": false,
  "error": { "code": "NOT_FOUND", "message": "Todo item not found." }
}
```

### Tests Required
- [ ] completing an item increments completed count
- [ ] unchecking an item decrements completed count
- [ ] unknown item id returns controlled error

## IF-002: selectCandidateCreatures

### Type
INTERNAL_FUNCTION

### Input Shape
```json
{
  "completedCount": 3,
  "captureProgress": [],
  "creatures": []
}
```

### Success Shape
```json
{
  "ok": true,
  "data": {
    "candidates": []
  }
}
```

### Error Shape
```json
{
  "ok": false,
  "error": { "code": "VALIDATION_FAILED", "message": "Candidate selection requires creature data." }
}
```

### Validation Rules
- Return 2-3 candidates when enough sample data exists.
- Candidates are likely previews, not guaranteed final encounters.

### Tests Required
- [ ] candidate count is bounded to 2-3
- [ ] candidate output is displayed as silhouette/unknown preview
- [ ] candidate output is not treated as guaranteed reward

## IF-003: startDailyWrapUp

### Type
INTERNAL_FUNCTION / UI_EVENT

### Input Shape
```json
{
  "todos": [],
  "creatures": [],
  "captureProgress": []
}
```

### Success Shape
```json
{
  "ok": true,
  "data": {
    "completedCount": 3,
    "encounters": []
  }
}
```

### Error Shape
```json
{
  "ok": false,
  "error": { "code": "VALIDATION_FAILED", "message": "No creature data available." }
}
```

### Validation Rules
- Creates one encounter per completed item.
- Creates zero encounters for zero completed items and shows a controlled edge state.
- Incomplete items never create encounters.

### Tests Required
- [ ] N completed items produce N encounters
- [ ] incomplete items produce no encounters
- [ ] zero-completion wrap-up is safe

## IF-004: attemptCapture

### Type
UI_EVENT / INTERNAL_FUNCTION

### Input Shape
```json
{
  "encounterId": "string",
  "randomValue": 0.25
}
```

### Success Shape
```json
{
  "ok": true,
  "data": {
    "status": "caught",
    "captureChance": 0.35,
    "collectionEntry": {}
  }
}
```

### Error Shape
```json
{
  "ok": false,
  "error": { "code": "NOT_FOUND", "message": "Pending encounter not found." }
}
```

### Validation Rules
- Capture chance must be between 0 and 1.
- Repeat encounters increase displayed capture chance.
- Successful capture adds to collection.
- MVP does not require Pokeball, currency, shop, or inventory state.

### Tests Required
- [ ] capture can succeed
- [ ] capture can fail safely
- [ ] repeat encounter raises chance
- [ ] success updates collection
- [ ] no inventory is required

## IF-005: persistLocalDemoState

### Type
LOCAL_STORAGE

### Input Shape
```json
{
  "todos": [],
  "dailySession": {},
  "captureProgress": [],
  "encounters": [],
  "collection": []
}
```

### Success Shape
```json
{
  "ok": true,
  "data": {
    "saved": true
  }
}
```

### Error Shape
```json
{
  "ok": false,
  "error": { "code": "VALIDATION_FAILED", "message": "Demo state is invalid." }
}
```

### Tests Required
- [ ] demo state can be reset
- [ ] collection/capture progress can persist locally
- [ ] invalid state does not crash the app

## 5. AI / External Dependency Contract

AI and external services are not required for MVP.

Deferred AI idea:
- Later, users may submit optional evidence such as notes or workout screenshots.
- AI may analyze proof/activity context to grant bonus rewards.
- This must not enter MVP without an explicit scope change and updated acceptance criteria.

Live AI/API calls in automated tests are forbidden by default unless explicitly accepted.

## 6. No-Interface Declaration

```txt
Interface contract required: YES
Reason: UI events and core reward/capture functions define the MVP behavior.
Data flow: UI events update local state; internal functions select candidates, generate encounters, resolve capture, and persist local demo state.
Validation: Unit and integration tests should cover each P0 interface.
Impact: No backend API, auth, AI provider, or network dependency is required for the first MVP.
```
