const BASE_CAPTURE_CHANCE = 0.2;
const REPEAT_CAPTURE_BONUS = 0.15;
const MAX_CAPTURE_CHANCE = 0.85;
const HABIT_APPEARANCE_BONUS = 0.35;
const MAX_HABIT_APPEARANCE_BONUS = 4.2;
const RARITY_WEIGHT = {
  common: 3,
  uncommon: 2,
  rare: 1,
};

export function createInitialState({
  todos = [],
  creatures = [],
  date = "2026-06-02",
  wrapUpTime = "21:00",
} = {}) {
  return {
    todos: clone(todos),
    creatures: clone(creatures),
    dailySession: {
      id: `session-${date}`,
      date,
      wrapUpTime,
      wrapUpStarted: false,
      completedCount: countCompleted(todos),
    },
    captureProgress: [],
    encounters: [],
    collection: [],
  };
}

export function toggleChecklistItem({ todos, todoId, completed, now = nowIso() }) {
  const item = todos.find((todo) => todo.id === todoId);
  if (!item) {
    return failure("NOT_FOUND", "Todo item not found.");
  }

  if (item.completed === completed) {
    return success({
      todos: todos.map((todo) => ({ ...todo })),
      completedCount: countCompleted(todos),
    });
  }

  const updatedTodos = todos.map((todo) => {
    if (todo.id !== todoId) return { ...todo };
    const habitStreak =
      todo.kind === "habit"
        ? nextHabitStreak({ todo, completed, now })
        : todo.habitStreak;
    return {
      ...todo,
      completed,
      completedAt: completed ? now : undefined,
      ...(habitStreak ? { habitStreak } : {}),
    };
  });

  return success({
    todos: updatedTodos,
    completedCount: countCompleted(updatedTodos),
  });
}

export function addTodoItem({
  todos = [],
  title,
  kind = "task",
  category = "hobby",
  goal,
  note,
  xp = 10,
  now = nowIso(),
} = {}) {
  const normalizedTitle = typeof title === "string" ? title.trim() : "";
  if (!normalizedTitle) {
    return failure("VALIDATION_FAILED", "Todo title is required.");
  }
  if (normalizedTitle.length > 80) {
    return failure("VALIDATION_FAILED", "Todo title must be 80 characters or fewer.");
  }
  if (!["task", "habit"].includes(kind)) {
    return failure("VALIDATION_FAILED", "Todo kind must be task or habit.");
  }

  const createdAt = now;
  const normalizedGoal = typeof goal === "string" ? goal.trim() : "";
  const normalizedNote = Array.isArray(note)
    ? note.filter((line) => typeof line === "string" && line.trim()).map((line) => line.trim())
    : [];

  const todo = {
    id: nextTodoId({ title: normalizedTitle, createdAt, todos }),
    title: normalizedTitle,
    kind,
    category,
    goal: normalizedGoal || "오늘 완료하기",
    note: normalizedNote.length > 0 ? normalizedNote : ["새로 추가한 할 일이에요."],
    xp,
    completed: false,
    createdAt,
    ...(kind === "habit"
      ? { habitStreak: { current: 0, best: 0, lastCompletedDate: undefined } }
      : {}),
  };

  return success({
    todo,
    todos: [...todos.map((item) => ({ ...item })), todo],
    completedCount: countCompleted(todos),
  });
}

export function selectCandidateCreatures({
  completedCount,
  captureProgress = [],
  creatures,
  todo,
  preferredCreatureId,
  limit = 3,
}) {
  const validation = validateCreatures(creatures);
  if (!validation.ok) return validation;

  if (completedCount <= 0) {
    return success({ candidates: [] });
  }

  const candidateLimit = Math.min(Math.max(limit, 2), 3, creatures.length);
  const progressByCreature = new Map(
    captureProgress.map((progress) => [progress.creatureId, progress])
  );
  const selectedCreatureId = preferredCreatureId ?? todo?.preferredCreatureId;
  const streakDays = habitStreakFor(todo);
  const preferenceBonus = habitPreferenceBonus(streakDays);

  const ranked = creatures
    .map((creature, index) => {
      const progress = progressByCreature.get(creature.id);
      const encounterCount = progress?.encounterCount ?? 0;
      return {
        creature,
        score:
          (RARITY_WEIGHT[creature.rarity] ?? 1) * 10 +
          encounterCount * 3 +
          ((completedCount + index) % 3),
        appearanceWeight: appearanceWeightFor({
          creature,
          progress,
          selectedCreatureId,
          preferenceBonus,
        }),
      };
    })
    .sort((a, b) => b.score - a.score || a.creature.id.localeCompare(b.creature.id));

  let selected = ranked.slice(0, candidateLimit);
  if (selectedCreatureId && !selected.some((item) => item.creature.id === selectedCreatureId)) {
    const preferred = ranked.find((item) => item.creature.id === selectedCreatureId);
    if (preferred) selected = [...selected.slice(0, candidateLimit - 1), preferred];
  }

  const totalWeight = selected.reduce((sum, item) => sum + item.appearanceWeight, 0);
  const candidates = selected.map(({ creature, appearanceWeight }) => ({
      id: creature.id,
      name: creature.name,
      imageUrl: creature.imageUrl,
      rarity: creature.rarity,
      previewOnly: true,
      guaranteed: false,
      silhouette: true,
      selected: creature.id === selectedCreatureId,
      appearanceChance: totalWeight > 0 ? appearanceWeight / totalWeight : 0,
      comboDays: streakDays,
    }));

  return success({ candidates, comboDays: streakDays, preferenceBonus });
}

export function startDailyWrapUp({
  todos,
  creatures,
  captureProgress = [],
  now = nowIso(),
}) {
  const validation = validateCreatures(creatures);
  if (!validation.ok) return validation;

  const completedTodos = todos.filter((todo) => todo.completed);
  const progressByCreature = new Map(
    captureProgress.map((progress) => [progress.creatureId, { ...progress }])
  );

  const encounters = completedTodos.map((todo, index) => {
    const creature = selectEncounterCreature({
      creatures,
      todo,
      index,
      progressByCreature,
    });
    const priorProgress = progressByCreature.get(creature.id);
    const priorEncounterCount = priorProgress?.encounterCount ?? 0;
    const captureChance = captureChanceFor(priorEncounterCount);
    const nextProgress = {
      creatureId: creature.id,
      encounterCount: priorEncounterCount + 1,
      currentCaptureChance: captureChance,
      updatedAt: now,
    };
    progressByCreature.set(creature.id, nextProgress);

    return {
      id: `encounter-${todo.id}-${creature.id}-${index + 1}`,
      creatureId: creature.id,
      sourceTodoItemId: todo.id,
      captureChance,
      status: "pending",
      createdAt: now,
    };
  });

  return success({
    completedCount: completedTodos.length,
    encounters,
    captureProgress: [...progressByCreature.values()],
    dailySession: {
      wrapUpStarted: true,
      completedCount: completedTodos.length,
    },
  });
}

export function attemptCapture({
  encounters,
  encounterId,
  captureProgress = [],
  collection = [],
  randomValue,
  now = nowIso(),
}) {
  const encounter = encounters.find((item) => item.id === encounterId);
  if (!encounter || encounter.status !== "pending") {
    return failure("NOT_FOUND", "Pending encounter not found.");
  }
  if (typeof randomValue !== "number" || randomValue < 0 || randomValue > 1) {
    return failure("VALIDATION_FAILED", "Capture random value must be between 0 and 1.");
  }

  const caught = randomValue <= encounter.captureChance;
  const updatedEncounter = {
    ...encounter,
    status: caught ? "caught" : "escaped",
  };
  const updatedEncounters = encounters.map((item) =>
    item.id === encounterId ? updatedEncounter : { ...item }
  );

  const progress = captureProgress.find(
    (item) => item.creatureId === encounter.creatureId
  );
  const collectionEntry = caught
    ? {
        creatureId: encounter.creatureId,
        capturedAt: now,
        encounterCountAtCapture: progress?.encounterCount ?? 1,
      }
    : undefined;
  const updatedCollection =
    caught && !collection.some((entry) => entry.creatureId === encounter.creatureId)
      ? [...collection.map((entry) => ({ ...entry })), collectionEntry]
      : collection.map((entry) => ({ ...entry }));

  return success({
    encounter: updatedEncounter,
    encounters: updatedEncounters,
    captureProgress: captureProgress.map((item) => ({ ...item })),
    collection: updatedCollection,
    collectionEntry,
    status: updatedEncounter.status,
    captureChance: encounter.captureChance,
  });
}

export function assertMvpDeferredFeaturesAbsent(state) {
  const forbiddenKeys = [
    "evidenceUploads",
    "proofReviews",
    "pokeballs",
    "currency",
    "shop",
    "inventory",
  ];
  const present = forbiddenKeys.filter((key) => Object.hasOwn(state, key));
  if (present.length > 0) {
    return failure(
      "VALIDATION_FAILED",
      `Deferred MVP feature state is present: ${present.join(", ")}.`
    );
  }
  return success({ absent: forbiddenKeys });
}

export function captureChanceFor(priorEncounterCount) {
  return clampChance(
    BASE_CAPTURE_CHANCE + Math.max(0, priorEncounterCount) * REPEAT_CAPTURE_BONUS
  );
}

export function countCompleted(todos) {
  return todos.filter((todo) => todo.completed).length;
}

function selectEncounterCreature({ creatures, todo, index, progressByCreature }) {
  const seed = stringScore(todo.id) + index;
  const weighted = creatures
    .map((creature) => {
      const progress = progressByCreature.get(creature.id);
      return {
        creature,
        weight: appearanceWeightFor({
          creature,
          progress,
          selectedCreatureId: todo.preferredCreatureId,
          preferenceBonus: habitPreferenceBonus(habitStreakFor(todo)),
        }),
      };
    })
    .sort((a, b) => b.weight - a.weight || a.creature.id.localeCompare(b.creature.id));
  const totalWeight = weighted.reduce((sum, item) => sum + item.weight, 0);
  let bucket = seed % Math.max(1, Math.round(totalWeight * 100));
  for (const item of weighted) {
    bucket -= Math.round(item.weight * 100);
    if (bucket < 0) return item.creature;
  }
  return weighted[0].creature;
}

function nextHabitStreak({ todo, completed, now }) {
  const current = habitStreakFor(todo);
  if (completed) {
    return {
      current: current + 1,
      best: Math.max(todo.habitStreak?.best ?? 0, current + 1),
      lastCompletedDate: now.slice(0, 10),
    };
  }
  return {
    current: Math.max(0, current - (todo.completed ? 1 : 0)),
    best: todo.habitStreak?.best ?? current,
    lastCompletedDate: todo.habitStreak?.lastCompletedDate,
  };
}

function habitStreakFor(todo) {
  if (todo?.kind !== "habit") return 0;
  return Math.max(0, todo.habitStreak?.current ?? todo.streakDays ?? 0);
}

function habitPreferenceBonus(streakDays) {
  return Math.min(MAX_HABIT_APPEARANCE_BONUS, streakDays * HABIT_APPEARANCE_BONUS);
}

function appearanceWeightFor({
  creature,
  progress,
  selectedCreatureId,
  preferenceBonus = 0,
}) {
  const baseWeight =
    (RARITY_WEIGHT[creature.rarity] ?? 1) + (progress?.encounterCount ?? 0);
  return creature.id === selectedCreatureId ? baseWeight + preferenceBonus : baseWeight;
}

function validateCreatures(creatures) {
  if (!Array.isArray(creatures) || creatures.length === 0) {
    return failure("VALIDATION_FAILED", "Creature data is required.");
  }
  const invalid = creatures.find(
    (creature) => !creature.id || !creature.name || !creature.imageUrl
  );
  if (invalid) {
    return failure("VALIDATION_FAILED", "Creature id, name, and imageUrl are required.");
  }
  return success({});
}

function success(data) {
  return { ok: true, data };
}

function failure(code, message) {
  return { ok: false, error: { code, message } };
}

function clampChance(value) {
  return Math.max(0, Math.min(MAX_CAPTURE_CHANCE, Number(value.toFixed(2))));
}

function stringScore(value) {
  return [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function nextTodoId({ title, createdAt, todos }) {
  const base = `todo-${stringScore(`${title}-${createdAt}`).toString(36)}`;
  const existingIds = new Set(todos.map((todo) => todo.id));
  if (!existingIds.has(base)) return base;
  let suffix = 2;
  while (existingIds.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function nowIso() {
  return new Date().toISOString();
}
