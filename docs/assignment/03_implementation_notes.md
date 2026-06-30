# 03. 구현 설명

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| 언어 | JavaScript ES Modules |
| 런타임 | Node.js 22 이상 (모델·테스트), Expo (앱 실행) |
| 모바일 앱 | Expo / React Native |
| 테스트 | Node.js 내장 테스트 러너 |
| 저장소 | 메모리 기반 React 상태 (로컬 데모) |

## 코드 구조

```txt
poke_todo/
  App.js
  app.json
  metro.config.cjs
  src/
    model.mjs
    demoData.mjs
  test/
    model.test.mjs
    smoke.mjs
  scripts/
    build-check.mjs
```

## 공통 모델 레이어

핵심 비즈니스 로직은 `src/model.mjs`에 모아 두었다. Expo 앱과 모델 테스트가 같은 모델 함수를 사용하므로, UI와 무관하게 보상 규칙이 일관된다.

주요 함수는 다음과 같다.

| 함수 | 역할 |
|---|---|
| `createInitialState` | 할 일, 캐릭터, 세션, 포획 진행 상태의 초기값 생성 |
| `addTodoItem` | 새 할 일을 추가하고 입력값을 검증 |
| `toggleChecklistItem` | 할 일 완료/미완료 상태와 완료 개수 갱신 |
| `selectCandidateCreatures` | 완료 상태와 습관 콤보를 바탕으로 후보 실루엣 선정 |
| `startDailyWrapUp` | 완료한 항목을 만남 목록으로 변환 |
| `attemptCapture` | 포획 성공/실패 판정과 컬렉션 갱신 |
| `captureChanceFor` | 반복 만남 횟수에 따른 포획 확률 계산 |
| `assertMvpDeferredFeaturesAbsent` | MVP에서 제외한 기능 상태가 섞이지 않았는지 확인 |

## 주요 데이터 모델

| 엔티티 | 설명 |
|---|---|
| `TodoItem` | 오늘 완료할 일 또는 습관 |
| `Creature` | 보상으로 만나는 캐릭터 |
| `Encounter` | 하루 마감 때 생성되는 포획 기회 |
| `CaptureProgress` | 캐릭터별 반복 만남 횟수와 포획 확률 |
| `CollectionEntry` | 포획에 성공한 캐릭터 기록 |
| `DailySession` | 현재 날짜, 마감 상태, 완료 개수 |

## 후보 선정 방식

후보 캐릭터는 희귀도, 기존 만남 횟수, 완료 개수, 습관 선호 보너스를 이용해 점수화된다. 후보는 2-3개로 제한되며, UI에서는 실루엣으로 보여준다.

습관 항목에는 `preferredCreatureId`를 둘 수 있고, 습관 콤보가 길수록 해당 캐릭터의 등장 가중치가 증가한다.

## 하루 마감 로직

`startDailyWrapUp`은 완료된 할 일만 필터링한 뒤, 각 완료 항목에 대해 하나의 `Encounter`를 만든다. 미완료 항목은 보상으로 이어지지 않는다.

이 방식은 과제의 핵심 규칙인 “완료 항목 1개는 만남 1개”를 코드 수준에서 직접 보장한다.

## 포획 로직

포획 확률은 다음 공식으로 계산한다.

```txt
포획 확률 = 0.20 + 이전 만남 횟수 * 0.15
최대 포획 확률 = 0.85
```

테스트에서는 `randomValue`를 직접 주입할 수 있게 해서 성공/실패를 결정적으로 검증한다. 데모 UI에서는 만남 ID를 기반으로 안정적인 난수를 만들어 같은 데모 흐름을 재현하기 쉽게 했다.

## Expo 앱 구현

`App.js`는 React Native 컴포넌트로 모바일 앱 셸을 구현하며, 이 프로젝트의 유일한 실행 앱이다. 모델 레이어(`src/model.mjs`)를 그대로 사용하므로 UI와 보상 규칙이 분리되어 있다.

화면은 오늘의 기록, 할 일 상세, 하루 마감을 중심으로 구성되어 있고, 포획 결과를 모아 보는 컬렉션 화면과 사용자가 직접 할 일을 추가하는 흐름을 이어서 보강한다. 상태는 메모리 기반 React 상태로 관리하며, Expo Go로 실제 휴대폰에서 바로 실행할 수 있다.

## 설계상 중요한 선택

- 서버 없이 로컬에서 동작하도록 만들었다.
- 외부 AI나 실시간 API에 의존하지 않는다.
- 테스트 가능한 순수 함수 중심으로 핵심 규칙을 구현했다.
- 포켓몬 스타일은 개인 데모 컨셉으로 사용하고, 공개 배포 시에는 오리지널 캐릭터로 교체해야 한다.
