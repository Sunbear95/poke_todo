import { demoCreatures, demoTodos } from "/src/demoData.mjs";
import {
  assertMvpDeferredFeaturesAbsent,
  attemptCapture,
  createInitialState,
  selectCandidateCreatures,
  startDailyWrapUp,
  toggleChecklistItem,
} from "/src/model.mjs";

const categoryMeta = {
  health: { label: "건강", tone: "green", icon: dropletIcon },
  exercise: { label: "운동", tone: "blue", icon: shoeIcon },
  study: { label: "공부", tone: "blue", icon: bookIcon },
  hobby: { label: "취미", tone: "violet", icon: sparkleIcon },
};

const kindMeta = {
  habit: { label: "습관", tone: "green" },
  task: { label: "오늘 할일", tone: "blue" },
};

const taskMeta = {
  "study-30": {
    title: "러닝 20분",
    goal: "운동 습관 만들기",
    note: ["오늘은 가볍게 20분만 뛰기", "끝나고 물 마시기", "페이스보다 꾸준함에 집중"],
    category: "exercise",
    xp: 15,
  },
  workout: {
    title: "물 2L 마시기",
    goal: "컨디션 회복",
    note: ["오전, 오후, 저녁으로 나눠 마시기", "커피 마신 만큼 물 추가하기"],
    category: "health",
    xp: 10,
  },
  "project-review": {
    title: "독서 15분",
    goal: "집중력 회복",
    note: ["책상 위 알림 끄기", "짧게라도 한 챕터 읽기"],
    category: "study",
    xp: 12,
  },
};

const extraTodos = [
  {
    id: "project-cleanup",
    title: "프로젝트 정리",
    kind: "task",
    completed: false,
    createdAt: "2026-06-02T09:15:00.000Z",
  },
];

taskMeta["project-cleanup"] = {
  title: "프로젝트 정리",
  goal: "생각 비우기",
  note: ["할 일 목록을 다시 정렬하기", "불필요한 작업은 미루기"],
  category: "hobby",
  xp: 18,
};

let state = loadState();
let currentView = "today";
let selectedTodoId = null;
let activeEncounterId = null;
let lastCaptureMessage = "";

render();

function loadState() {
  const saved = localStorage.getItem("poke-todo-state");
  if (saved) {
    return JSON.parse(saved);
  }

  const seededTodos = [
    {
      ...demoTodos[1],
      ...taskMeta.workout,
      id: "workout",
      completed: true,
      completedAt: "2026-06-02T10:00:00.000Z",
      habitStreak: { current: 6, best: 9, lastCompletedDate: "2026-06-01" },
      preferredCreatureId: "bulbasaur",
    },
    {
      ...demoTodos[0],
      ...taskMeta["study-30"],
      id: "study-30",
      habitStreak: { current: 3, best: 4, lastCompletedDate: "2026-06-01" },
    },
    { ...demoTodos[2], ...taskMeta["project-review"], id: "project-review" },
    ...extraTodos,
  ];
  const initial = createInitialState({
    todos: seededTodos,
    creatures: demoCreatures,
    date: "2026-06-02",
    wrapUpTime: "21:30",
  });
  initial.captureProgress = [
    {
      creatureId: "bulbasaur",
      encounterCount: 1,
      currentCaptureChance: 0.35,
      updatedAt: "2026-06-01T21:30:00.000Z",
    },
  ];
  return initial;
}

function saveState() {
  localStorage.setItem("poke-todo-state", JSON.stringify(state));
}

function render() {
  const app = document.querySelector("#app");
  if (currentView === "detail") {
    app.innerHTML = detailTemplate();
  } else if (currentView === "wrap") {
    app.innerHTML = wrapTemplate();
  } else if (currentView === "collection") {
    app.innerHTML = collectionTemplate();
  } else {
    app.innerHTML = todayTemplate();
  }
  bindEvents(app);
}

function todayTemplate() {
  return `
    <section class="screen today-screen">
      <header class="hero-header">
        <button class="circle-button" data-action="noop" aria-label="달력">
          ${calendarIcon()}
        </button>
        <div>
          <p class="date-text">6월 2일 (화)</p>
          <h1>오늘의 기록</h1>
        </div>
        <button class="circle-button compact" data-action="collection" aria-label="컬렉션">
          ${monsterBadgeIcon()}
        </button>
      </header>

      <section class="task-list">
        ${state.todos.map(todoRowTemplate).join("")}
      </section>

      <section class="partner-stage">
        <div class="mascot" aria-hidden="true">
          <div class="mascot-horn left"></div>
          <div class="mascot-horn right"></div>
          <div class="mascot-face">
            <span class="mascot-eye left"></span>
            <span class="mascot-eye right"></span>
            <span class="mascot-smile"></span>
          </div>
          <div class="mascot-body"></div>
        </div>
        <div class="level-row">
          <strong>Lv. 3</strong>
          <span class="xp-bar"><span style="width: 58%"></span></span>
          <span>120 / 200 XP</span>
        </div>
        <div class="encourage-card">
          ${starIcon()}
          <div>
            <strong>오늘도 멋진 하루를 만들 준비 완료!</strong>
            <p>작은 습관이 큰 변화를 만들어요.</p>
          </div>
        </div>
      </section>

      <nav class="bottom-actions">
        <button class="primary-button" data-action="wrap">하루 마감</button>
      </nav>
    </section>
  `;
}

function detailTemplate() {
  const todo = state.todos.find((item) => item.id === selectedTodoId) ?? state.todos[0];
  const meta = taskMeta[todo.id] ?? taskMeta["study-30"];
  const category = categoryMeta[meta.category];
  const kind = kindMeta[todo.kind] ?? kindMeta.task;
  const comboDays = habitComboDays(todo);
  const candidates = getCandidates();

  return `
    <section class="screen detail-screen">
      <header class="detail-header">
        <button class="circle-button" data-action="today" aria-label="뒤로">
          ${backIcon()}
        </button>
        <h1>할 일 상세</h1>
      </header>

      <article class="detail-card">
        <div class="detail-title-row">
          <button class="check-box ${todo.completed ? "checked" : ""}" data-action="toggle" data-id="${todo.id}" aria-label="완료">
            ${todo.completed ? checkIcon() : ""}
          </button>
          <div class="title-stack">
            <h2>${meta.title}</h2>
            <span class="kind-badge ${kind.tone}">${kind.label}</span>
          </div>
        </div>
        <div class="info-grid">
          <span class="goal-label">${targetIcon()} 오늘의 목표</span>
          <span>${meta.goal}</span>
          <span class="tag ${category.tone}">${category.icon()} ${category.label}</span>
        </div>
        ${
          todo.kind === "habit"
            ? `<section class="combo-panel">
                <div>
                  <span>습관 콤보</span>
                  <strong>${comboDays}일 연속</strong>
                </div>
                <p>후보 포켓몬을 탭하면 콤보가 높을수록 그 포켓몬의 출현 확률이 올라가요.</p>
              </section>`
            : ""
        }
        <hr />
        <section class="memo-block">
          <h3>${noteIcon()} 메모</h3>
          ${meta.note.map((line) => `<p>${line}</p>`).join("")}
        </section>
      </article>

      <section class="monster-preview">
        <h2>${monsterBadgeIcon()} 만날 수 있는 몬스터 <span class="hint">?</span></h2>
        <p>${todo.kind === "habit" ? "원하는 후보를 탭해 콤보 보너스를 걸어보세요." : "완료하면 몬스터를 만날 수 있어요!"}</p>
        <div class="candidate-grid">
          ${candidates.map(candidateCardTemplate).join("")}
        </div>
      </section>

      <section class="reward-strip">
        ${sparkleIcon()} <strong>완료 시 보상</strong><span>+${meta.xp} XP</span>
      </section>

      <nav class="bottom-actions">
        <button class="primary-button" data-action="toggle" data-id="${todo.id}">
          ${checkIcon()} 완료하기
        </button>
      </nav>
    </section>
  `;
}

function wrapTemplate() {
  const encounters = state.encounters.filter((encounter) => encounter.status === "pending");
  const activeEncounter = state.encounters.find((encounter) => encounter.id === activeEncounterId) ?? encounters[0];
  const creature = activeEncounter ? creatureById(activeEncounter.creatureId) : null;

  return `
    <section class="screen wrap-screen">
      <header class="detail-header">
        <button class="circle-button" data-action="today" aria-label="뒤로">${backIcon()}</button>
        <h1>하루 마감</h1>
      </header>
      <article class="wrap-card">
        <p class="date-text">완료 ${state.dailySession.completedCount}개</p>
        <h2>${activeEncounter ? "몬스터를 만났어요" : "오늘의 인카운터가 없어요"}</h2>
        ${
          activeEncounter
            ? `<img class="encounter-sprite" src="${creature.imageUrl}" alt="${creature.name}" />
               <strong>${creature.name}</strong>
               <p>포획 확률 ${Math.round(activeEncounter.captureChance * 100)}%</p>
               ${lastCaptureMessage ? `<div class="capture-message">${lastCaptureMessage}</div>` : ""}
               <button class="primary-button" data-action="capture" data-id="${activeEncounter.id}">포획 시도</button>`
            : `<p>완료한 할 일이 있으면 하루 마감 때 만남이 열려요.</p>`
        }
      </article>
      <section class="encounter-list">
        ${state.encounters.map(encounterChipTemplate).join("")}
      </section>
      <nav class="bottom-actions">
        <button class="secondary-button" data-action="collection">컬렉션 보기</button>
      </nav>
    </section>
  `;
}

function collectionTemplate() {
  return `
    <section class="screen collection-screen">
      <header class="detail-header">
        <button class="circle-button" data-action="today" aria-label="뒤로">${backIcon()}</button>
        <h1>컬렉션</h1>
      </header>
      <section class="collection-grid">
        ${state.creatures.map(collectionCardTemplate).join("")}
      </section>
      <button class="reset-button" data-action="reset">데모 초기화</button>
    </section>
  `;
}

function todoRowTemplate(todo) {
  const meta = taskMeta[todo.id] ?? todo;
  const category = categoryMeta[meta.category] ?? categoryMeta.hobby;
  const kind = kindMeta[todo.kind] ?? kindMeta.task;
  return `
    <article class="task-row" data-action="detail" data-id="${todo.id}" tabindex="0">
      <button class="check-box ${todo.completed ? "checked" : ""}" data-action="toggle" data-id="${todo.id}" aria-label="완료">
        ${todo.completed ? checkIcon() : ""}
      </button>
      <div class="task-title">
        <strong>${meta.title}</strong>
        <span class="kind-badge ${kind.tone}">${kind.label}</span>
      </div>
      <span class="tag ${category.tone}">${category.icon()} ${category.label}</span>
    </article>
  `;
}

function candidateCardTemplate(candidate, index) {
  const chance = Math.round(candidate.appearanceChance * 100);
  return `
    <button class="candidate-card ${candidate.selected ? "selected" : ""}" data-action="select-preference" data-id="${candidate.id}">
      <div class="sprite-ground">
        <img class="sprite silhouette" src="${candidate.imageUrl}" alt="실루엣 후보 ${index + 1}" />
      </div>
      <strong>${candidate.selected ? "선택됨" : "탭해서 선택"}</strong>
      <span>출현 확률 ${chance}%</span>
    </button>
  `;
}

function encounterChipTemplate(encounter) {
  const creature = creatureById(encounter.creatureId);
  return `
    <button class="encounter-chip ${encounter.id === activeEncounterId ? "active" : ""}" data-action="select-encounter" data-id="${encounter.id}">
      <img src="${creature.imageUrl}" alt="" />
      <span>${encounter.status === "pending" ? "대기" : encounter.status === "caught" ? "포획" : "도망"}</span>
    </button>
  `;
}

function collectionCardTemplate(creature) {
  const entry = state.collection.find((item) => item.creatureId === creature.id);
  return `
    <article class="collection-card ${entry ? "caught" : ""}">
      <img class="${entry ? "" : "silhouette"}" src="${creature.imageUrl}" alt="${creature.name}" />
      <strong>${entry ? creature.name : "???"}</strong>
      <span>${entry ? "포획 완료" : "미발견"}</span>
    </article>
  `;
}

function bindEvents(root) {
  root.querySelectorAll("[data-action]").forEach((node) => {
    node.addEventListener("click", (event) => {
      event.stopPropagation();
      handleAction(node.dataset.action, node.dataset.id);
    });
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleAction(node.dataset.action, node.dataset.id);
      }
    });
  });
}

function handleAction(action, id) {
  if (action === "noop") return;
  if (action === "today") {
    currentView = "today";
    selectedTodoId = null;
    render();
    return;
  }
  if (action === "detail") {
    selectedTodoId = id;
    currentView = "detail";
    render();
    return;
  }
  if (action === "collection") {
    currentView = "collection";
    render();
    return;
  }
  if (action === "toggle") {
    toggleTodo(id);
    render();
    return;
  }
  if (action === "select-preference") {
    selectPreferredCreature(id);
    render();
    return;
  }
  if (action === "wrap") {
    startWrap();
    render();
    return;
  }
  if (action === "select-encounter") {
    activeEncounterId = id;
    render();
    return;
  }
  if (action === "capture") {
    capture(id);
    render();
    return;
  }
  if (action === "reset") {
    localStorage.removeItem("poke-todo-state");
    state = loadState();
    currentView = "today";
    render();
  }
}

function toggleTodo(todoId) {
  const todo = state.todos.find((item) => item.id === todoId);
  const result = toggleChecklistItem({
    todos: state.todos,
    todoId,
    completed: !todo.completed,
  });
  if (!result.ok) return;
  state = {
    ...state,
    todos: result.data.todos,
    dailySession: {
      ...state.dailySession,
      completedCount: result.data.completedCount,
    },
  };
  saveState();
}

function selectPreferredCreature(creatureId) {
  const todo = state.todos.find((item) => item.id === selectedTodoId);
  if (!todo || todo.kind !== "habit") return;
  state = {
    ...state,
    todos: state.todos.map((item) =>
      item.id === todo.id ? { ...item, preferredCreatureId: creatureId } : { ...item }
    ),
  };
  saveState();
}

function startWrap() {
  const result = startDailyWrapUp({
    todos: state.todos,
    creatures: state.creatures,
    captureProgress: state.captureProgress,
  });
  if (!result.ok) return;
  state = {
    ...state,
    encounters: result.data.encounters,
    captureProgress: result.data.captureProgress,
    dailySession: {
      ...state.dailySession,
      ...result.data.dailySession,
    },
  };
  activeEncounterId = state.encounters[0]?.id ?? null;
  lastCaptureMessage = "";
  currentView = "wrap";
  saveState();
}

function capture(encounterId) {
  const randomValue = deterministicRandom(encounterId);
  const result = attemptCapture({
    encounters: state.encounters,
    encounterId,
    captureProgress: state.captureProgress,
    collection: state.collection,
    randomValue,
  });
  if (!result.ok) return;
  const creature = creatureById(result.data.encounter.creatureId);
  lastCaptureMessage =
    result.data.status === "caught"
      ? `${creature.name} 포획 성공!`
      : `${creature.name}이 도망갔어요. 다음 만남의 확률이 올라가요.`;
  state = {
    ...state,
    encounters: result.data.encounters,
    collection: result.data.collection,
  };
  activeEncounterId = state.encounters.find((item) => item.status === "pending")?.id ?? encounterId;
  saveState();
}

function getCandidates() {
  const todo = state.todos.find((item) => item.id === selectedTodoId);
  const result = selectCandidateCreatures({
    completedCount: Math.max(1, state.dailySession.completedCount),
    creatures: state.creatures,
    captureProgress: state.captureProgress,
    todo,
  });
  return result.ok ? result.data.candidates : [];
}

function habitComboDays(todo) {
  if (todo?.kind !== "habit") return 0;
  return Math.max(0, todo.habitStreak?.current ?? todo.streakDays ?? 0);
}

function creatureById(id) {
  return state.creatures.find((creature) => creature.id === id) ?? state.creatures[0];
}

function deterministicRandom(value) {
  const score = [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return (score % 100) / 100;
}

assertMvpDeferredFeaturesAbsent(state);

function icon(svgPath, viewBox = "0 0 24 24") {
  return `<svg viewBox="${viewBox}" aria-hidden="true">${svgPath}</svg>`;
}

function checkIcon() {
  return icon('<path d="M20 6 9 17l-5-5" />');
}
function backIcon() {
  return icon('<path d="M19 12H5" /><path d="m12 19-7-7 7-7" />');
}
function calendarIcon() {
  return icon('<rect x="3" y="4" width="18" height="18" rx="3" /><path d="M8 2v5" /><path d="M16 2v5" /><path d="M3 10h18" />');
}
function monsterBadgeIcon() {
  return icon('<path d="M7 11c0-4 2-7 5-7s5 3 5 7c2 1 3 3 3 5 0 4-4 6-8 6s-8-2-8-6c0-2 1-4 3-5Z" /><path d="M9 14h.01" /><path d="M15 14h.01" /><path d="M10 17c1.2 1 2.8 1 4 0" />');
}
function dropletIcon() {
  return icon('<path d="M12 2s6 6.4 6 11a6 6 0 1 1-12 0c0-4.6 6-11 6-11Z" />');
}
function shoeIcon() {
  return icon('<path d="M4 14c4 1 7 1 10-2l4 4c1 1 .3 3-1.2 3H7c-2 0-3-1-3-3v-2Z" /><path d="M14 12c-1-2-2-3-4-4" />');
}
function bookIcon() {
  return icon('<path d="M4 5c3-1 5-.5 8 1v15c-3-1.5-5-2-8-1V5Z" /><path d="M12 6c3-1.5 5-2 8-1v15c-3-1-5-.5-8 1V6Z" />');
}
function sparkleIcon() {
  return icon('<path d="M12 2 9 9l-7 3 7 3 3 7 3-7 7-3-7-3-3-7Z" />');
}
function targetIcon() {
  return icon('<circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v4" /><path d="M22 12h-4" />');
}
function noteIcon() {
  return icon('<path d="M6 3h10l4 4v14H6V3Z" /><path d="M16 3v5h5" /><path d="M9 13h6" /><path d="M9 17h4" />');
}
function starIcon() {
  return icon('<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z" />');
}
