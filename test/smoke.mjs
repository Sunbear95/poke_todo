import assert from "node:assert/strict";
import { demoCreatures, demoTodos } from "../src/demoData.mjs";
import {
  attemptCapture,
  createInitialState,
  selectCandidateCreatures,
  startDailyWrapUp,
  toggleChecklistItem,
} from "../src/model.mjs";

const state = createInitialState({ todos: demoTodos, creatures: demoCreatures });
const first = toggleChecklistItem({
  todos: state.todos,
  todoId: "study-30",
  completed: true,
});
assert.equal(first.ok, true);

const candidates = selectCandidateCreatures({
  completedCount: first.data.completedCount,
  creatures: state.creatures,
  captureProgress: state.captureProgress,
});
assert.equal(candidates.ok, true);
assert.equal(candidates.data.candidates.length >= 2, true);

const wrapUp = startDailyWrapUp({
  todos: first.data.todos,
  creatures: state.creatures,
  captureProgress: state.captureProgress,
});
assert.equal(wrapUp.ok, true);
assert.equal(wrapUp.data.encounters.length, 1);

const capture = attemptCapture({
  encounters: wrapUp.data.encounters,
  encounterId: wrapUp.data.encounters[0].id,
  captureProgress: wrapUp.data.captureProgress,
  collection: [],
  randomValue: 0,
});
assert.equal(capture.ok, true);
assert.equal(capture.data.collection.length, 1);

console.log("Poke Todo model smoke check passed.");
