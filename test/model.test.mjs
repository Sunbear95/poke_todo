import assert from "node:assert/strict";
import test from "node:test";
import { demoCreatures, demoTodos } from "../src/demoData.mjs";
import {
  assertMvpDeferredFeaturesAbsent,
  attemptCapture,
  captureChanceFor,
  createInitialState,
  selectCandidateCreatures,
  startDailyWrapUp,
  toggleChecklistItem,
} from "../src/model.mjs";

test("checking and unchecking a todo updates completed count", () => {
  const state = createInitialState({ todos: demoTodos, creatures: demoCreatures });

  const checked = toggleChecklistItem({
    todos: state.todos,
    todoId: "study-30",
    completed: true,
    now: "2026-06-02T10:00:00.000Z",
  });

  assert.equal(checked.ok, true);
  assert.equal(checked.data.completedCount, 1);
  assert.equal(
    checked.data.todos.find((todo) => todo.id === "study-30").completedAt,
    "2026-06-02T10:00:00.000Z"
  );

  const unchecked = toggleChecklistItem({
    todos: checked.data.todos,
    todoId: "study-30",
    completed: false,
  });

  assert.equal(unchecked.ok, true);
  assert.equal(unchecked.data.completedCount, 0);
});

test("checking a habit increases its combo streak", () => {
  const state = createInitialState({
    todos: [
      {
        ...demoTodos[0],
        kind: "habit",
        habitStreak: { current: 4, best: 6, lastCompletedDate: "2026-06-01" },
      },
    ],
    creatures: demoCreatures,
  });

  const checked = toggleChecklistItem({
    todos: state.todos,
    todoId: "study-30",
    completed: true,
    now: "2026-06-02T10:00:00.000Z",
  });

  assert.equal(checked.ok, true);
  const habit = checked.data.todos[0];
  assert.equal(habit.habitStreak.current, 5);
  assert.equal(habit.habitStreak.best, 6);
  assert.equal(habit.habitStreak.lastCompletedDate, "2026-06-02");
});

test("unknown todo returns a controlled error", () => {
  const result = toggleChecklistItem({
    todos: demoTodos,
    todoId: "missing",
    completed: true,
  });

  assert.equal(result.ok, false);
  assert.equal(result.error.code, "NOT_FOUND");
});

test("candidate selection returns 2-3 non-guaranteed silhouettes", () => {
  const result = selectCandidateCreatures({
    completedCount: 2,
    creatures: demoCreatures,
    captureProgress: [],
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.candidates.length, 3);
  assert.equal(result.data.candidates.every((candidate) => candidate.silhouette), true);
  assert.equal(result.data.candidates.every((candidate) => !candidate.guaranteed), true);
  assert.equal(result.data.candidates.every((candidate) => candidate.previewOnly), true);
});

test("habit combo boosts the selected candidate appearance chance", () => {
  const habit = {
    ...demoTodos[0],
    kind: "habit",
    habitStreak: { current: 8, best: 8, lastCompletedDate: "2026-06-01" },
    preferredCreatureId: "eevee",
  };
  const result = selectCandidateCreatures({
    completedCount: 1,
    creatures: demoCreatures,
    captureProgress: [],
    todo: habit,
  });

  assert.equal(result.ok, true);
  const selected = result.data.candidates.find((candidate) => candidate.id === "eevee");
  assert.equal(selected.selected, true);
  assert.equal(selected.comboDays, 8);
  assert.equal(
    selected.appearanceChance > 1 / result.data.candidates.length,
    true
  );
});

test("candidate selection shows no rewards before progress", () => {
  const result = selectCandidateCreatures({
    completedCount: 0,
    creatures: demoCreatures,
    captureProgress: [],
  });

  assert.equal(result.ok, true);
  assert.deepEqual(result.data.candidates, []);
});

test("daily wrap-up creates one encounter per completed item", () => {
  const todos = demoTodos.map((todo, index) => ({
    ...todo,
    completed: index < 2,
  }));

  const result = startDailyWrapUp({
    todos,
    creatures: demoCreatures,
    captureProgress: [],
    now: "2026-06-02T21:00:00.000Z",
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.completedCount, 2);
  assert.equal(result.data.encounters.length, 2);
  assert.equal(result.data.encounters.every((encounter) => encounter.status === "pending"), true);
  assert.deepEqual(
    result.data.encounters.map((encounter) => encounter.sourceTodoItemId),
    ["study-30", "workout"]
  );
});

test("daily wrap-up is safe with zero completed items", () => {
  const result = startDailyWrapUp({
    todos: demoTodos,
    creatures: demoCreatures,
    captureProgress: [],
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.completedCount, 0);
  assert.deepEqual(result.data.encounters, []);
});

test("repeat encounters increase capture probability", () => {
  assert.equal(captureChanceFor(0), 0.2);
  assert.equal(captureChanceFor(1), 0.35);
  assert.equal(captureChanceFor(2), 0.5);
  assert.equal(captureChanceFor(20), 0.85);
});

test("capture can succeed and add the creature to collection", () => {
  const todos = [{ ...demoTodos[0], completed: true }];
  const wrapUp = startDailyWrapUp({
    todos,
    creatures: demoCreatures,
    captureProgress: [],
    now: "2026-06-02T21:00:00.000Z",
  });
  const encounter = wrapUp.data.encounters[0];

  const capture = attemptCapture({
    encounters: wrapUp.data.encounters,
    encounterId: encounter.id,
    captureProgress: wrapUp.data.captureProgress,
    collection: [],
    randomValue: 0,
    now: "2026-06-02T21:01:00.000Z",
  });

  assert.equal(capture.ok, true);
  assert.equal(capture.data.status, "caught");
  assert.equal(capture.data.collection.length, 1);
  assert.equal(capture.data.collection[0].creatureId, encounter.creatureId);
});

test("capture can fail without adding to collection", () => {
  const todos = [{ ...demoTodos[0], completed: true }];
  const wrapUp = startDailyWrapUp({
    todos,
    creatures: demoCreatures,
    captureProgress: [],
  });
  const encounter = wrapUp.data.encounters[0];

  const capture = attemptCapture({
    encounters: wrapUp.data.encounters,
    encounterId: encounter.id,
    captureProgress: wrapUp.data.captureProgress,
    collection: [],
    randomValue: 1,
  });

  assert.equal(capture.ok, true);
  assert.equal(capture.data.status, "escaped");
  assert.deepEqual(capture.data.collection, []);
});

test("capture rejects invalid random values and missing encounters safely", () => {
  const invalidRandom = attemptCapture({
    encounters: [],
    encounterId: "missing",
    captureProgress: [],
    collection: [],
    randomValue: 1.1,
  });
  assert.equal(invalidRandom.ok, false);
  assert.equal(invalidRandom.error.code, "NOT_FOUND");

  const todos = [{ ...demoTodos[0], completed: true }];
  const wrapUp = startDailyWrapUp({ todos, creatures: demoCreatures });
  const invalidValue = attemptCapture({
    encounters: wrapUp.data.encounters,
    encounterId: wrapUp.data.encounters[0].id,
    captureProgress: wrapUp.data.captureProgress,
    collection: [],
    randomValue: -0.1,
  });
  assert.equal(invalidValue.ok, false);
  assert.equal(invalidValue.error.code, "VALIDATION_FAILED");
});

test("MVP state does not include deferred evidence or inventory features", () => {
  const state = createInitialState({ todos: demoTodos, creatures: demoCreatures });
  const result = assertMvpDeferredFeaturesAbsent(state);

  assert.equal(result.ok, true);
  assert.equal(Object.hasOwn(state, "evidenceUploads"), false);
  assert.equal(Object.hasOwn(state, "proofReviews"), false);
  assert.equal(Object.hasOwn(state, "pokeballs"), false);
  assert.equal(Object.hasOwn(state, "currency"), false);
  assert.equal(Object.hasOwn(state, "inventory"), false);
});
