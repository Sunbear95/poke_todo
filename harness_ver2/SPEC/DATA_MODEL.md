# SPEC/DATA_MODEL.md

## 0. Purpose

Define what data exists, where it is stored, required fields, relationships, persistence, validation, and reset behavior.

## 1. Persistence Decision

```txt
Persistent data required: YES
Reason: The MVP needs task completion, encounters, capture probability growth, and collection state to remain visible across the core flow.
```

Default: prefer in-memory, file-based, or simple local storage unless persistence is core to the project.

## 2. Storage Strategy

```txt
[ ] No persistent data
[ ] In-memory state
[ ] File system
[ ] JSON file
[x] Browser localStorage
[ ] Session storage
[ ] SQLite
[ ] PostgreSQL
[ ] Firebase/Supabase
[ ] External API
[ ] Other:
```

Browser localStorage is the preferred MVP default if the implementation stack is web-based. Equivalent local app storage is acceptable if a mobile stack is selected.

## 3. Entity Summary

| Entity ID | Entity Name | Purpose | Required? | Storage | Related AC |
|---|---|---|---|---|---|
| ENT-001 | TodoItem | Daily task/habit checklist item | YES | localStorage/demo state | AC-001, AC-002 |
| ENT-002 | Creature | Pokemon-style reward creature data | YES | bundled/static data | AC-003, AC-004 |
| ENT-003 | Encounter | One reward opportunity created from a completed item | YES | localStorage/demo state | AC-004, AC-005 |
| ENT-004 | CaptureProgress | Tracks repeat encounters and capture probability | YES | localStorage/demo state | AC-006 |
| ENT-005 | CollectionEntry | Captured creature in collection/Pokedex | YES | localStorage/demo state | AC-007 |
| ENT-006 | DailySession | Current day, wrap-up time, completion summary | YES | localStorage/demo state | AC-003, AC-004 |

## 4. Entity Details

## ENT-001: TodoItem

### Purpose
Represents a daily action the user can check complete.

### Type Definition
```ts
type TodoItem = {
  id: string;
  title: string;
  kind: "task" | "habit";
  completed: boolean;
  createdAt: string;
  completedAt?: string;
};
```

### Fields
| Field | Type | Required? | Default | Validation | Notes |
|---|---|---|---|---|---|
| id | string | YES | generated | non-empty unique string | stable identifier |
| title | string | YES | none | non-empty | visible checklist label |
| kind | enum | YES | task | task or habit | may influence future reward logic |
| completed | boolean | YES | false | boolean | drives encounter count |
| createdAt | string | YES | now | ISO-like timestamp | implementation format may vary |
| completedAt | string | NO | undefined | timestamp if completed | optional |

### Validation Rules
- `title` is required and non-empty.
- Completed count only includes items where `completed === true`.

### Reset Rules
Reset to seeded demo checklist or empty state.

## ENT-002: Creature

### Purpose
Represents sample Pokemon-style reward data.

### Type Definition
```ts
type Creature = {
  id: string;
  name: string;
  imageUrl: string;
  silhouetteUrl?: string;
  rarity: "common" | "uncommon" | "rare";
};
```

### Fields
| Field | Type | Required? | Default | Validation | Notes |
|---|---|---|---|---|---|
| id | string | YES | static | unique | stable reward id |
| name | string | YES | none | non-empty | visible after reveal |
| imageUrl | string | YES | none | valid local/remote asset path | may be bundled |
| silhouetteUrl | string | NO | derived | valid asset path if provided | UI may derive silhouette styling |
| rarity | enum | YES | common | common/uncommon/rare | optional candidate weighting |

### Validation Rules
- `name` and `imageUrl` are required for visible reward states.
- Silhouettes may be generated via UI treatment instead of separate assets.

### Reset Rules
Static sample data does not reset unless sample set changes.

## ENT-003: Encounter

### Purpose
Represents a creature meeting created during daily wrap-up.

### Type Definition
```ts
type Encounter = {
  id: string;
  creatureId: string;
  sourceTodoItemId: string;
  captureChance: number;
  status: "pending" | "caught" | "escaped";
  createdAt: string;
};
```

### Fields
| Field | Type | Required? | Default | Validation | Notes |
|---|---|---|---|---|---|
| id | string | YES | generated | unique | stable encounter id |
| creatureId | string | YES | selected | Creature exists | reward target |
| sourceTodoItemId | string | YES | completed item id | TodoItem exists and is complete | one encounter per completed item |
| captureChance | number | YES | computed | 0 <= value <= 1 | shown to user |
| status | enum | YES | pending | pending/caught/escaped | capture result |
| createdAt | string | YES | now | timestamp | reward phase ordering |

### Validation Rules
- One encounter is created for each completed TodoItem.
- Incomplete TodoItems do not create encounters.
- `captureChance` must be between 0 and 1.

### Reset Rules
Clear encounters on demo reset.

## ENT-004: CaptureProgress

### Purpose
Tracks repeat encounters so capture chance can increase.

### Type Definition
```ts
type CaptureProgress = {
  creatureId: string;
  encounterCount: number;
  currentCaptureChance: number;
  updatedAt: string;
};
```

### Fields
| Field | Type | Required? | Default | Validation | Notes |
|---|---|---|---|---|---|
| creatureId | string | YES | selected | Creature exists | progress key |
| encounterCount | number | YES | 0 | integer >= 0 | increases with encounters |
| currentCaptureChance | number | YES | base chance | 0 <= value <= cap | cap chosen by implementation |
| updatedAt | string | YES | now | timestamp | local state |

### Validation Rules
- `encounterCount` never decreases during normal use.
- `currentCaptureChance` increases after repeat encounters, up to an implementation-defined cap.

### Reset Rules
Reset to seeded progress for deterministic demo or empty progress for clean start.

## ENT-005: CollectionEntry

### Purpose
Represents a captured creature shown in the collection/Pokedex.

### Type Definition
```ts
type CollectionEntry = {
  creatureId: string;
  capturedAt: string;
  encounterCountAtCapture: number;
};
```

### Fields
| Field | Type | Required? | Default | Validation | Notes |
|---|---|---|---|---|---|
| creatureId | string | YES | caught creature | Creature exists | collection key |
| capturedAt | string | YES | now | timestamp | visible history if needed |
| encounterCountAtCapture | number | YES | current count | integer >= 1 | shows progress payoff |

### Validation Rules
- Successful capture creates or updates a visible collection entry.

### Reset Rules
Clear collection on clean reset; seeded demo may include one captured creature if useful.

## ENT-006: DailySession

### Purpose
Tracks the current day and wrap-up state.

### Type Definition
```ts
type DailySession = {
  id: string;
  date: string;
  wrapUpTime: string;
  wrapUpStarted: boolean;
  completedCount: number;
};
```

### Fields
| Field | Type | Required? | Default | Validation | Notes |
|---|---|---|---|---|---|
| id | string | YES | generated | unique | session id |
| date | string | YES | today | valid date string | local day |
| wrapUpTime | string | YES | implementation default | valid time string | user-defined or demo default |
| wrapUpStarted | boolean | YES | false | boolean | reward phase gate |
| completedCount | number | YES | 0 | integer >= 0 | derived from TodoItems |

### Validation Rules
- `completedCount` equals the number of completed TodoItems.
- Wrap-up may be triggered manually for demo stability.

### Reset Rules
Reset to today's seeded session.

## 5. Input / Output Data

| Input ID | Name | Type | Required? | Validation | Related AC |
|---|---|---|---|---|---|
| INPUT-001 | Checklist completion toggle | boolean action | YES | item id exists | AC-002 |
| INPUT-002 | Daily wrap-up time | time string | YES | valid time or demo default | AC-004 |
| INPUT-003 | Demo wrap-up trigger | user action | YES for demo | app is running | AC-004 |
| INPUT-004 | Capture attempt | user action | YES | encounter is pending | AC-005 |

| Output ID | Name | Type | Required? | Source | Related AC |
|---|---|---|---|---|---|
| OUTPUT-001 | Completed count | number | YES | TodoItem state | AC-002 |
| OUTPUT-002 | Candidate silhouettes | Creature preview list | YES | Candidate selection rule | AC-003 |
| OUTPUT-003 | Encounter list | Encounter[] | YES | Completed items at wrap-up | AC-004 |
| OUTPUT-004 | Capture result | status message/state | YES | Capture attempt | AC-005 |
| OUTPUT-005 | Capture probability | percentage | YES | CaptureProgress | AC-006 |
| OUTPUT-006 | Collection entries | CollectionEntry[] | YES | Successful captures | AC-007 |

## 6. Reset and Cleanup

```txt
Development reset command or method: TBD after stack selection; must reset local demo state.
Test reset command or method: TBD after stack selection.
Manual reset steps: Clear app storage or use an in-app reset/demo seed control if implemented.
```

## 7. No Persistent Data Declaration

```txt
Persistent data required: YES
Reason: Collection and repeat encounter odds are core to the MVP.
Runtime state: Checklist, candidates, encounters, capture attempts, collection.
Input: Toggles, wrap-up trigger/time, capture actions.
Output: Silhouettes, encounters, probabilities, capture results, collection.
Reset behavior: Required for deterministic tests and demos.
Validation: AC-001 through AC-010.
```
