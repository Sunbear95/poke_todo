import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  addTodoItem,
  attemptCapture,
  captureChanceFor,
  createInitialState,
  selectCandidateCreatures,
  startDailyWrapUp,
  toggleChecklistItem,
} from "./src/model.mjs";
import { demoCreatures } from "./src/demoData.mjs";

const seedTodos = [
  {
    id: "water",
    title: "물 2L 마시기",
    kind: "habit",
    completed: true,
    category: "건강",
    icon: "water-outline",
    color: "green",
    goal: "수분 습관 만들기",
    memo: "아침, 점심, 저녁에 나눠 마시기",
    xp: 15,
    preferredCreatureId: "squirtle",
  },
  {
    id: "run",
    title: "러닝 20분",
    kind: "habit",
    completed: false,
    category: "운동",
    icon: "shoe-sneaker",
    color: "blue",
    goal: "운동 습관 만들기",
    memo: "오늘은 가볍게 20분만 뛰기\n끝나고 물 마시기\n페이스보다 꾸준함에 집중",
    xp: 18,
    preferredCreatureId: "pikachu",
  },
  {
    id: "read",
    title: "독서 15분",
    kind: "habit",
    completed: false,
    category: "공부",
    icon: "book-open-page-variant-outline",
    color: "blue",
    goal: "집중 루틴 만들기",
    memo: "읽은 부분 한 줄만 기억하기",
    xp: 12,
    preferredCreatureId: "bulbasaur",
  },
  {
    id: "project",
    title: "프로젝트 정리",
    kind: "task",
    completed: false,
    category: "취미",
    icon: "creation-outline",
    color: "violet",
    goal: "장기 프로젝트를 작게 쪼개기",
    memo: "다음 액션 3개만 정리하기",
    xp: 20,
    preferredCreatureId: "eevee",
  },
];

const initialState = createInitialState({
  todos: seedTodos,
  creatures: demoCreatures,
  date: "2026-06-02",
});

const initialCaptureProgress = [
  {
    creatureId: "bulbasaur",
    encounterCount: 2,
    currentCaptureChance: captureChanceFor(2),
    updatedAt: "2026-06-01T21:00:00.000Z",
  },
];

const KIND_OPTIONS = [
  { value: "task", label: "할 일" },
  { value: "habit", label: "습관" },
];

const CATEGORY_OPTIONS = [
  { value: "health", label: "건강", color: "green", icon: "heart-pulse" },
  { value: "exercise", label: "운동", color: "blue", icon: "shoe-sneaker" },
  { value: "study", label: "공부", color: "blue", icon: "book-open-page-variant-outline" },
  { value: "hobby", label: "취미", color: "violet", icon: "creation-outline" },
];

const CATEGORY_META = Object.fromEntries(
  CATEGORY_OPTIONS.map((option) => [option.value, option])
);

export default function App() {
  const [screen, setScreen] = useState("today");
  const [selectedTodoId, setSelectedTodoId] = useState("run");
  const [state, setState] = useState({
    ...initialState,
    captureProgress: initialCaptureProgress,
  });
  const selectedTodo = state.todos.find((todo) => todo.id === selectedTodoId);

  function toggleTodo(todoId, completed) {
    const result = toggleChecklistItem({ todos: state.todos, todoId, completed });
    if (!result.ok) return;
    setState((current) => ({
      ...current,
      todos: result.data.todos,
      dailySession: {
        ...current.dailySession,
        completedCount: result.data.completedCount,
      },
    }));
  }

  function addTodo({ title, kind, category }) {
    const result = addTodoItem({ todos: state.todos, title, kind, category });
    if (!result.ok) return result;
    setState((current) => ({
      ...current,
      todos: result.data.todos,
      dailySession: {
        ...current.dailySession,
        completedCount: result.data.completedCount,
      },
    }));
    setScreen("today");
    return result;
  }

  function selectPreferred(creatureId) {
    setState((current) => ({
      ...current,
      todos: current.todos.map((todo) =>
        todo.id === selectedTodoId && todo.kind === "habit"
          ? { ...todo, preferredCreatureId: creatureId }
          : { ...todo }
      ),
    }));
  }

  function openDetail(todoId) {
    setSelectedTodoId(todoId);
    setScreen("detail");
  }

  function beginWrapUp() {
    const result = startDailyWrapUp({
      todos: state.todos,
      creatures: state.creatures,
      captureProgress: state.captureProgress,
    });
    if (!result.ok) return;
    setState((current) => ({
      ...current,
      encounters: result.data.encounters,
      captureProgress: result.data.captureProgress,
      dailySession: {
        ...current.dailySession,
        ...result.data.dailySession,
      },
    }));
    setScreen("wrap");
  }

  function captureEncounter(encounterId) {
    const result = attemptCapture({
      encounters: state.encounters,
      encounterId,
      captureProgress: state.captureProgress,
      collection: state.collection,
      randomValue: stableRandom(encounterId),
    });
    if (!result.ok) return;
    setState((current) => ({
      ...current,
      encounters: result.data.encounters,
      collection: result.data.collection,
    }));
  }

  return (
    <SafeAreaView style={styles.shell}>
      <StatusBar barStyle="dark-content" />
      {screen === "today" && (
        <TodayScreen
          state={state}
          onOpenDetail={openDetail}
          onToggle={toggleTodo}
          onWrapUp={beginWrapUp}
          onAdd={() => setScreen("add")}
          onCollection={() => setScreen("collection")}
        />
      )}
      {screen === "add" && (
        <AddScreen onBack={() => setScreen("today")} onAdd={addTodo} />
      )}
      {screen === "detail" && selectedTodo && (
        <DetailScreen
          state={state}
          todo={selectedTodo}
          onBack={() => setScreen("today")}
          onToggle={toggleTodo}
          onSelectPreferred={selectPreferred}
        />
      )}
      {screen === "wrap" && (
        <WrapScreen
          state={state}
          onCapture={captureEncounter}
          onDone={() => setScreen("today")}
          onCollection={() => setScreen("collection")}
        />
      )}
      {screen === "collection" && (
        <CollectionScreen state={state} onBack={() => setScreen("today")} />
      )}
    </SafeAreaView>
  );
}

function TodayScreen({ state, onOpenDetail, onToggle, onWrapUp, onAdd, onCollection }) {
  const completedCount = state.todos.filter((todo) => todo.completed).length;

  return (
    <Screen>
      <View style={styles.heroHeader}>
        <CircleIcon name="calendar-blank-outline" />
        <View style={styles.titleBlock}>
          <Text style={styles.dateText}>6월 2일 (화)</Text>
          <Text style={styles.title}>오늘의 기록</Text>
        </View>
        <Pressable
          style={[styles.circleButton, styles.compactCircle]}
          onPress={onCollection}
          accessibilityLabel="컬렉션 보기"
        >
          <MaterialCommunityIcons name="bag-personal-outline" size={28} color="#39a24d" />
        </Pressable>
      </View>

      <View style={styles.taskList}>
        {state.todos.map((todo) => (
          <TaskRow
            key={todo.id}
            todo={todo}
            onPress={() => openTodo(todo, onOpenDetail)}
            onToggle={() => onToggle(todo.id, !todo.completed)}
          />
        ))}
        <Pressable style={styles.addRow} onPress={onAdd}>
          <MaterialCommunityIcons name="plus-circle-outline" size={28} color="#39a24d" />
          <Text style={styles.addRowText}>할 일 추가</Text>
        </Pressable>
      </View>

      <View style={styles.partnerStage}>
        <Mascot />
        <View style={styles.levelRow}>
          <Text style={styles.level}>Lv. 3</Text>
          <View style={styles.xpTrack}>
            <View style={styles.xpFill} />
          </View>
          <Text style={styles.xpText}>120 / 200 XP</Text>
        </View>
        <View style={styles.encourageCard}>
          <MaterialCommunityIcons name="star" size={34} color="#f7bb29" />
          <View>
            <Text style={styles.encourageTitle}>
              오늘도 멋진 하루를 만들 준비 완료!
            </Text>
            <Text style={styles.helperText}>
              완료 {completedCount}개, 작은 습관이 큰 변화를 만들어요.
            </Text>
          </View>
        </View>
      </View>

      <PrimaryButton label="하루 마감" onPress={onWrapUp} />
    </Screen>
  );
}

function DetailScreen({ state, todo, onBack, onToggle, onSelectPreferred }) {
  const candidates = useMemo(() => {
    const result = selectCandidateCreatures({
      completedCount: Math.max(1, state.dailySession.completedCount),
      captureProgress: state.captureProgress,
      creatures: state.creatures,
      todo,
    });
    return result.ok ? result.data.candidates : [];
  }, [state.captureProgress, state.creatures, state.dailySession.completedCount, todo]);
  const isHabit = todo.kind === "habit";

  return (
    <Screen>
      <View style={styles.detailHeader}>
        <Pressable style={styles.circleButton} onPress={onBack}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#39a24d" />
        </Pressable>
        <Text style={styles.detailTitle}>할 일 상세</Text>
        <View />
      </View>

      <View style={styles.detailCard}>
        <View style={styles.detailTitleRow}>
          <CheckBox checked={todo.completed} onPress={() => onToggle(todo.id, !todo.completed)} />
          <Text style={styles.detailTodoTitle}>{todo.title}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="target" size={24} color="#39a24d" />
          <Text style={styles.infoLabel}>오늘의 목표</Text>
          <Text style={styles.infoText}>{todo.goal}</Text>
          <Tag todo={todo} />
        </View>
        <View style={styles.line} />
        <View style={styles.memoBlock}>
          <View style={styles.memoTitle}>
            <MaterialCommunityIcons name="note-text-outline" size={24} color="#39a24d" />
            <Text style={styles.infoLabel}>메모</Text>
          </View>
          <Text style={styles.memoText}>{todo.memo}</Text>
        </View>
      </View>

      <View style={styles.sectionTitleRow}>
        <MaterialCommunityIcons name="alien-outline" size={24} color="#39a24d" />
        <Text style={styles.sectionTitle}>만날 수 있는 몬스터</Text>
      </View>
      <Text style={styles.previewHint}>
        {isHabit
          ? "탭해서 콤보로 키울 선호 몬스터를 골라보세요!"
          : "완료하면 몬스터를 만날 수 있어요!"}
      </Text>
      <View style={styles.candidateGrid}>
        {candidates.map((candidate) => (
          <Pressable
            key={candidate.id}
            style={[styles.candidateCard, candidate.selected && styles.candidateSelected]}
            onPress={() => isHabit && onSelectPreferred(candidate.id)}
            disabled={!isHabit}
          >
            <Image
              source={{ uri: candidate.imageUrl }}
              style={styles.silhouette}
              resizeMode="contain"
            />
            {isHabit && (
              <Text style={[styles.selectHint, candidate.selected && styles.selectHintOn]}>
                {candidate.selected ? "선택됨" : "탭해서 선택"}
              </Text>
            )}
            <View style={styles.chancePill}>
              <Text style={styles.chanceText}>
                발견 확률 {Math.round(candidate.appearanceChance * 100)}%
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.rewardStrip}>
        <MaterialCommunityIcons name="creation-outline" size={24} color="#1677f2" />
        <Text style={styles.rewardLabel}>완료 시 보상</Text>
        <Text style={styles.rewardXp}>+{todo.xp} XP</Text>
      </View>
      <PrimaryButton label="완료하기" onPress={() => onToggle(todo.id, true)} />
    </Screen>
  );
}

function WrapScreen({ state, onCapture, onDone, onCollection }) {
  const pending = state.encounters.find((encounter) => encounter.status === "pending");
  const activeEncounter = pending ?? state.encounters[state.encounters.length - 1];
  const creature = state.creatures.find((item) => item.id === activeEncounter?.creatureId);

  return (
    <Screen>
      <View style={styles.wrapHeader}>
        <Text style={styles.dateText}>하루 마감</Text>
        <Text style={styles.title}>오늘의 만남</Text>
      </View>
      <View style={styles.wrapCard}>
        {creature ? (
          <>
            <Image source={{ uri: creature.imageUrl }} style={styles.encounterSprite} />
            <Text style={styles.detailTodoTitle}>{creature.name}</Text>
            <Text style={styles.helperText}>
              포획 확률 {Math.round(activeEncounter.captureChance * 100)}%
            </Text>
            <PrimaryButton
              label={activeEncounter.status === "pending" ? "포획 시도" : "결과 확인 완료"}
              onPress={() =>
                activeEncounter.status === "pending"
                  ? onCapture(activeEncounter.id)
                  : onDone()
              }
            />
          </>
        ) : (
          <>
            <Text style={styles.detailTodoTitle}>오늘은 완료한 항목이 없어요</Text>
            <Text style={styles.helperText}>내일 다시 만남을 준비해봐요.</Text>
            <PrimaryButton label="돌아가기" onPress={onDone} />
          </>
        )}
      </View>
      <View style={styles.encounterList}>
        {state.encounters.map((encounter) => {
          const item = state.creatures.find((creatureItem) => creatureItem.id === encounter.creatureId);
          return (
            <View key={encounter.id} style={styles.encounterChip}>
              <Text style={styles.encounterChipText}>
                {item?.name ?? "Unknown"} · {encounterStatusLabel(encounter.status)}
              </Text>
            </View>
          );
        })}
      </View>
      <SecondaryButton label="컬렉션 보기" onPress={onCollection} />
    </Screen>
  );
}

function AddScreen({ onBack, onAdd }) {
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState("task");
  const [category, setCategory] = useState("hobby");
  const [error, setError] = useState("");

  function submit() {
    const result = onAdd({ title, kind, category });
    if (result && !result.ok) {
      setError(result.error?.message ?? "할 일을 추가하지 못했어요.");
    }
  }

  return (
    <Screen>
      <View style={styles.detailHeader}>
        <Pressable style={styles.circleButton} onPress={onBack}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#39a24d" />
        </Pressable>
        <Text style={styles.detailTitle}>할 일 추가</Text>
        <View />
      </View>

      <View style={styles.detailCard}>
        <Text style={styles.infoLabel}>무엇을 할까요?</Text>
        <TextInput
          style={styles.input}
          placeholder="예: 물 2L 마시기"
          placeholderTextColor="#9aa6b2"
          value={title}
          onChangeText={(value) => {
            setTitle(value);
            if (error) setError("");
          }}
          maxLength={80}
          returnKeyType="done"
          onSubmitEditing={submit}
        />

        <Text style={[styles.infoLabel, styles.fieldSpacer]}>종류</Text>
        <View style={styles.choiceRow}>
          {KIND_OPTIONS.map((option) => (
            <Choice
              key={option.value}
              label={option.label}
              active={kind === option.value}
              onPress={() => setKind(option.value)}
            />
          ))}
        </View>

        <Text style={[styles.infoLabel, styles.fieldSpacer]}>카테고리</Text>
        <View style={styles.choiceRow}>
          {CATEGORY_OPTIONS.map((option) => (
            <Choice
              key={option.value}
              label={option.label}
              active={category === option.value}
              onPress={() => setCategory(option.value)}
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <PrimaryButton label="추가하기" onPress={submit} />
    </Screen>
  );
}

function CollectionScreen({ state, onBack }) {
  const caughtCount = state.collection.length;

  return (
    <Screen>
      <View style={styles.detailHeader}>
        <Pressable style={styles.circleButton} onPress={onBack}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#39a24d" />
        </Pressable>
        <Text style={styles.detailTitle}>컬렉션</Text>
        <View />
      </View>
      <Text style={styles.previewHint}>
        {caughtCount} / {state.creatures.length} 마리를 만났어요.
      </Text>
      <View style={styles.collectionGrid}>
        {state.creatures.map((creature) => {
          const caught = state.collection.some((entry) => entry.creatureId === creature.id);
          return (
            <View key={creature.id} style={styles.collectionCard}>
              <Image
                source={{ uri: creature.imageUrl }}
                style={[styles.collectionSprite, !caught && styles.collectionDim]}
                resizeMode="contain"
              />
              <Text style={styles.collectionName}>{caught ? creature.name : "???"}</Text>
              <Text style={styles.collectionStatus}>{caught ? "포획 완료" : "미발견"}</Text>
            </View>
          );
        })}
      </View>
    </Screen>
  );
}

function Choice({ label, active, onPress }) {
  return (
    <Pressable
      style={[styles.choice, active && styles.choiceActive]}
      onPress={onPress}
    >
      <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{label}</Text>
    </Pressable>
  );
}

function SecondaryButton({ label, onPress }) {
  return (
    <Pressable style={styles.secondaryButton} onPress={onPress}>
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </Pressable>
  );
}

function TaskRow({ todo, onPress, onToggle }) {
  return (
    <Pressable style={styles.taskRow} onPress={onPress}>
      <CheckBox checked={todo.completed} onPress={onToggle} />
      <Text style={styles.taskTitle}>{todo.title}</Text>
      <Tag todo={todo} />
    </Pressable>
  );
}

function Tag({ todo }) {
  const meta = CATEGORY_META[todo.category];
  const color = todo.color ?? meta?.color ?? "green";
  const icon = todo.icon ?? meta?.icon ?? "tag-outline";
  const label = todo.color ? todo.category : meta?.label ?? todo.category;
  return (
    <View style={[styles.tag, styles[`${color}Tag`]]}>
      <MaterialCommunityIcons name={icon} size={21} color={tagColor(color)} />
      <Text style={[styles.tagText, { color: tagColor(color) }]}>{label}</Text>
    </View>
  );
}

function CheckBox({ checked, onPress }) {
  return (
    <Pressable
      style={[styles.checkBox, checked && styles.checkedBox]}
      onPress={(event) => {
        event.stopPropagation();
        onPress();
      }}
    >
      {checked && <MaterialCommunityIcons name="check" size={27} color="#fff" />}
    </Pressable>
  );
}

function CircleIcon({ name, compact = false }) {
  return (
    <View style={[styles.circleButton, compact && styles.compactCircle]}>
      <MaterialCommunityIcons name={name} size={28} color="#39a24d" />
    </View>
  );
}

function PrimaryButton({ label, onPress }) {
  return (
    <Pressable style={styles.primaryButton} onPress={onPress}>
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

function Mascot() {
  return (
    <View style={styles.mascot}>
      <View style={[styles.horn, styles.leftHorn]} />
      <View style={[styles.horn, styles.rightHorn]} />
      <View style={styles.face}>
        <View style={[styles.eye, styles.leftEye]} />
        <View style={[styles.eye, styles.rightEye]} />
        <View style={styles.smile} />
      </View>
      <View style={styles.body} />
      <View style={styles.ground} />
    </View>
  );
}

function Screen({ children }) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

function openTodo(todo, onOpenDetail) {
  onOpenDetail(todo.id);
}

function tagColor(color) {
  if (color === "blue") return "#1677f2";
  if (color === "violet") return "#6651d8";
  return "#21823a";
}

function encounterStatusLabel(status) {
  if (status === "caught") return "포획";
  if (status === "escaped") return "도망";
  return "대기";
}

function stableRandom(value) {
  return (
    [...value].reduce((sum, character) => sum + character.charCodeAt(0), 0) % 100
  ) / 100;
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: "#f7f9f8",
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 34,
  },
  heroHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    marginBottom: 34,
  },
  titleBlock: {
    alignItems: "center",
    flex: 1,
  },
  dateText: {
    color: "#3d8b59",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8,
  },
  title: {
    color: "#132232",
    fontSize: 33,
    fontWeight: "900",
  },
  circleButton: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 999,
    height: 54,
    justifyContent: "center",
    shadowColor: "#1b2e42",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    width: 54,
  },
  compactCircle: {
    backgroundColor: "#edf7ef",
    height: 46,
    width: 46,
  },
  taskList: {
    gap: 16,
  },
  taskRow: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    flexDirection: "row",
    gap: 20,
    minHeight: 78,
    padding: 18,
    shadowColor: "#1b2e42",
    shadowOpacity: 0.12,
    shadowRadius: 20,
  },
  taskTitle: {
    color: "#132232",
    flex: 1,
    fontSize: 22,
    fontWeight: "700",
  },
  checkBox: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#39a24d",
    borderRadius: 10,
    borderWidth: 2,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  checkedBox: {
    backgroundColor: "#39a24d",
  },
  tag: {
    alignItems: "center",
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    minHeight: 34,
    paddingHorizontal: 12,
  },
  greenTag: {
    backgroundColor: "#e9f7ea",
  },
  blueTag: {
    backgroundColor: "#eaf4ff",
  },
  violetTag: {
    backgroundColor: "#f0edff",
  },
  tagText: {
    fontSize: 16,
    fontWeight: "800",
  },
  partnerStage: {
    alignItems: "center",
    marginTop: 38,
  },
  mascot: {
    height: 224,
    marginBottom: 18,
    position: "relative",
    width: 188,
  },
  horn: {
    backgroundColor: "#f0dfc7",
    borderRadius: 18,
    height: 52,
    position: "absolute",
    top: 20,
    width: 24,
  },
  leftHorn: {
    left: 36,
    transform: [{ rotate: "-15deg" }],
  },
  rightHorn: {
    right: 36,
    transform: [{ rotate: "15deg" }],
  },
  face: {
    backgroundColor: "#8edcbb",
    borderRadius: 62,
    height: 126,
    left: 26,
    position: "absolute",
    top: 28,
    width: 136,
    zIndex: 2,
  },
  body: {
    backgroundColor: "#254535",
    borderRadius: 24,
    bottom: 8,
    height: 92,
    left: 36,
    position: "absolute",
    right: 36,
  },
  eye: {
    backgroundColor: "#1a3038",
    borderColor: "#fff",
    borderRadius: 999,
    borderWidth: 4,
    height: 34,
    position: "absolute",
    top: 44,
    width: 25,
  },
  leftEye: {
    left: 31,
  },
  rightEye: {
    right: 31,
  },
  smile: {
    borderBottomColor: "#24424b",
    borderBottomWidth: 3,
    borderRadius: 999,
    bottom: 35,
    height: 18,
    left: 50,
    position: "absolute",
    right: 50,
  },
  ground: {
    backgroundColor: "#e8dfcc",
    borderRadius: 999,
    bottom: 0,
    height: 20,
    left: 24,
    position: "absolute",
    right: 24,
  },
  levelRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    width: 270,
  },
  level: {
    color: "#39a24d",
    fontSize: 18,
    fontWeight: "800",
  },
  xpTrack: {
    backgroundColor: "#e4e8eb",
    borderRadius: 999,
    flex: 1,
    height: 8,
  },
  xpFill: {
    backgroundColor: "#39a24d",
    borderRadius: 999,
    height: 8,
    width: "58%",
  },
  xpText: {
    color: "#677483",
    fontSize: 15,
    fontWeight: "800",
  },
  encourageCard: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    flexDirection: "row",
    gap: 14,
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    width: 290,
  },
  encourageTitle: {
    color: "#132232",
    fontSize: 16,
    fontWeight: "800",
    maxWidth: 200,
  },
  helperText: {
    color: "#6f7b88",
    fontSize: 14,
    marginTop: 4,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#39a24d",
    borderRadius: 18,
    justifyContent: "center",
    marginTop: 26,
    minHeight: 58,
    width: "100%",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
  },
  detailHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 34,
  },
  detailTitle: {
    color: "#132232",
    fontSize: 29,
    fontWeight: "900",
  },
  detailCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    padding: 22,
    shadowColor: "#1b2e42",
    shadowOpacity: 0.12,
    shadowRadius: 20,
  },
  detailTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 22,
    marginBottom: 24,
  },
  detailTodoTitle: {
    color: "#132232",
    flex: 1,
    fontSize: 26,
    fontWeight: "900",
  },
  infoRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  infoLabel: {
    color: "#132232",
    fontSize: 17,
    fontWeight: "800",
  },
  infoText: {
    color: "#132232",
    flexGrow: 1,
    fontSize: 16,
  },
  line: {
    backgroundColor: "#e8ecef",
    height: 1,
    marginVertical: 24,
  },
  memoBlock: {
    gap: 8,
  },
  memoTitle: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  memoText: {
    color: "#132232",
    fontSize: 17,
    lineHeight: 28,
  },
  sectionTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 30,
  },
  sectionTitle: {
    color: "#132232",
    fontSize: 22,
    fontWeight: "900",
  },
  previewHint: {
    color: "#6f7b88",
    fontSize: 16,
    marginTop: 6,
  },
  candidateGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  candidateCard: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    flex: 1,
    padding: 10,
  },
  silhouette: {
    height: 88,
    opacity: 0.45,
    tintColor: "#24373b",
    width: 88,
  },
  chancePill: {
    backgroundColor: "#e9f7ea",
    borderRadius: 999,
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  chanceText: {
    color: "#21823a",
    fontSize: 12,
    fontWeight: "800",
  },
  candidateSelected: {
    borderColor: "#39a24d",
    borderWidth: 2,
  },
  selectHint: {
    color: "#6f7b88",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 6,
  },
  selectHintOn: {
    color: "#21823a",
  },
  addRow: {
    alignItems: "center",
    backgroundColor: "rgba(57,162,77,0.08)",
    borderColor: "#bfe0c6",
    borderRadius: 16,
    borderStyle: "dashed",
    borderWidth: 2,
    flexDirection: "row",
    gap: 14,
    justifyContent: "center",
    minHeight: 64,
    padding: 18,
  },
  addRowText: {
    color: "#21823a",
    fontSize: 20,
    fontWeight: "800",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#d7dee4",
    borderRadius: 14,
    borderWidth: 1,
    color: "#132232",
    fontSize: 18,
    marginTop: 12,
    minHeight: 54,
    paddingHorizontal: 16,
  },
  fieldSpacer: {
    marginTop: 22,
  },
  choiceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },
  choice: {
    backgroundColor: "#fff",
    borderColor: "#d7dee4",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  choiceActive: {
    backgroundColor: "#39a24d",
    borderColor: "#39a24d",
  },
  choiceText: {
    color: "#677483",
    fontSize: 16,
    fontWeight: "800",
  },
  choiceTextActive: {
    color: "#fff",
  },
  errorText: {
    color: "#d6453c",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 16,
  },
  collectionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 18,
  },
  collectionCard: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    paddingVertical: 16,
    width: "47%",
  },
  collectionSprite: {
    height: 96,
    width: 96,
  },
  collectionDim: {
    opacity: 0.4,
    tintColor: "#24373b",
  },
  collectionName: {
    color: "#132232",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 8,
  },
  collectionStatus: {
    color: "#6f7b88",
    fontSize: 14,
    marginTop: 2,
  },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: "#edf7ef",
    borderRadius: 18,
    justifyContent: "center",
    marginTop: 18,
    minHeight: 54,
    width: "100%",
  },
  secondaryButtonText: {
    color: "#21823a",
    fontSize: 20,
    fontWeight: "800",
  },
  rewardStrip: {
    alignItems: "center",
    backgroundColor: "#edf6ff",
    borderRadius: 14,
    flexDirection: "row",
    gap: 10,
    marginTop: 24,
    minHeight: 52,
    paddingHorizontal: 16,
  },
  rewardLabel: {
    color: "#1677f2",
    flex: 1,
    fontSize: 17,
    fontWeight: "800",
  },
  rewardXp: {
    color: "#1677f2",
    fontSize: 18,
    fontWeight: "900",
  },
  wrapHeader: {
    alignItems: "center",
    marginBottom: 28,
  },
  wrapCard: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    padding: 24,
  },
  encounterSprite: {
    height: 128,
    width: 128,
  },
  encounterList: {
    gap: 10,
    marginTop: 18,
  },
  encounterChip: {
    backgroundColor: "#e9f7ea",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  encounterChipText: {
    color: "#21823a",
    fontSize: 14,
    fontWeight: "800",
  },
});
