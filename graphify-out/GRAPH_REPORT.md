# Graph Report - .  (2026-06-02)

## Corpus Check
- Corpus is ~17,635 words - fits in a single context window. You may not need a graph.

## Summary
- 478 nodes · 583 edges · 37 communities (32 shown, 5 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Browser UI State|Browser UI State]]
- [[_COMMUNITY_App Rendering Code|App Rendering Code]]
- [[_COMMUNITY_Model And Tests|Model And Tests]]
- [[_COMMUNITY_Subagent Tracking|Subagent Tracking]]
- [[_COMMUNITY_Notify Hook Turns|Notify Hook Turns]]
- [[_COMMUNITY_Deep Interview State|Deep Interview State]]
- [[_COMMUNITY_Harness Governance|Harness Governance]]
- [[_COMMUNITY_Performance Goal State|Performance Goal State]]
- [[_COMMUNITY_MVP Data Architecture|MVP Data Architecture]]
- [[_COMMUNITY_Thread Session Index|Thread Session Index]]
- [[_COMMUNITY_Active Skill Lock|Active Skill Lock]]
- [[_COMMUNITY_Skill Exit State|Skill Exit State]]
- [[_COMMUNITY_Interview Input Lock|Interview Input Lock]]
- [[_COMMUNITY_Package Metadata|Package Metadata]]
- [[_COMMUNITY_Graphify Detection|Graphify Detection]]
- [[_COMMUNITY_Tmux Hook Config|Tmux Hook Config]]
- [[_COMMUNITY_Stop Guard State|Stop Guard State]]
- [[_COMMUNITY_Goal Completion|Goal Completion]]
- [[_COMMUNITY_Prompt Routing|Prompt Routing]]
- [[_COMMUNITY_Prompt Routing Session|Prompt Routing Session]]
- [[_COMMUNITY_Tmux Hook State|Tmux Hook State]]
- [[_COMMUNITY_OMX Metrics|OMX Metrics]]
- [[_COMMUNITY_Native Session|Native Session]]
- [[_COMMUNITY_Recovery Runbook|Recovery Runbook]]
- [[_COMMUNITY_HUD State A|HUD State A]]
- [[_COMMUNITY_HUD State B|HUD State B]]
- [[_COMMUNITY_HUD State C|HUD State C]]
- [[_COMMUNITY_Notify Hook A|Notify Hook A]]
- [[_COMMUNITY_Notify Hook B|Notify Hook B]]
- [[_COMMUNITY_Static Server|Static Server]]
- [[_COMMUNITY_Team Nudge State|Team Nudge State]]
- [[_COMMUNITY_Deferred Scope|Deferred Scope]]
- [[_COMMUNITY_Task Baseline|Task Baseline]]
- [[_COMMUNITY_Session Notify Pair|Session Notify Pair]]
- [[_COMMUNITY_Current Notify Pair|Current Notify Pair]]
- [[_COMMUNITY_Interview Routing Pair|Interview Routing Pair]]
- [[_COMMUNITY_Build Check|Build Check]]

## God Nodes (most connected - your core abstractions)
1. `recent_turns` - 23 edges
2. `icon()` - 14 edges
3. `detailTemplate()` - 10 edges
4. `goal` - 8 edges
5. `input_lock` - 8 edges
6. `input_lock` - 8 edges
7. `input_lock` - 8 edges
8. `Local Storage MVP State Model` - 8 edges
9. `render` - 8 edges
10. `startDailyWrapUp` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Failure Types and Responses` --conceptually_related_to--> `Daily Wrap-Up Test Contract`  [AMBIGUOUS]
  harness_ver2/docs/RUNBOOK.md → test/model.test.mjs
- `Candidate Selection Test Contract` --semantically_similar_to--> `detailTemplate`  [INFERRED] [semantically similar]
  test/model.test.mjs → public/app.mjs
- `Model Smoke Flow` --semantically_similar_to--> `startWrap`  [INFERRED] [semantically similar]
  test/smoke.mjs → public/app.mjs
- `loadState()` --calls--> `createInitialState()`  [INFERRED]
  public/app.mjs → src/model.mjs
- `toggleTodo()` --calls--> `toggleChecklistItem()`  [INFERRED]
  public/app.mjs → src/model.mjs

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Poke Todo Core Loop** — project_context_low_friction_reward_loop, prd_core_user_flow, architecture_core_flow_modules, interface_start_daily_wrapup, interface_attempt_capture, data_model_encounter, data_model_collection_entry [EXTRACTED 1.00]
- **Document-Driven Validation Harness** — agents_universal_agent_harness, agents_source_of_truth_order, agents_implementation_gate, agents_validation_evidence, task_queue_mvp_task_sequence, validation_report_command_evidence [EXTRACTED 1.00]
- **Scope and Risk Control System** — agents_scope_control, backlog_scope_creep_buffer, backlog_deferred_mvp_features, acceptance_criteria_negative_mvp, risk_register_scope_creep, risk_register_ip_risk [INFERRED 0.85]
- **Todo to Encounter Capture Flow** — model_toggleChecklistItem, model_selectCandidateCreatures, model_startDailyWrapUp, model_attemptCapture, model_collection_state [EXTRACTED 1.00]
- **Browser UI State Machine** — app_handleAction, app_render, app_application_state, app_todayTemplate, app_detailTemplate, app_wrapTemplate, app_collectionTemplate [EXTRACTED 1.00]
- **Recovery and Validation Practice** — RUNBOOK_general_recovery_rule, RUNBOOK_retry_policy, model_test_toggle_contract, model_test_capture_contract, smoke_model_flow [INFERRED 0.70]

## Communities (37 total, 5 thin omitted)

### Community 0 - "Browser UI State"
Cohesion: 0.08
Nodes (44): Browser Application State, bindEvents, capture, Category Metadata, collectionTemplate, creatureById, detailTemplate, deterministicRandom (+36 more)

### Community 1 - "App Rendering Code"
Cohesion: 0.12
Nodes (33): backIcon(), bindEvents(), bookIcon(), calendarIcon(), capture(), categoryMeta, checkIcon(), collectionTemplate() (+25 more)

### Community 2 - "Model And Tests"
Cohesion: 0.16
Nodes (23): demoCreatures, demoTodos, assertMvpDeferredFeaturesAbsent(), attemptCapture(), captureChanceFor(), clampChance(), clone(), countCompleted() (+15 more)

### Community 3 - "Subagent Tracking"
Cohesion: 0.07
Nodes (26): first_seen_at, kind, last_seen_at, last_turn_id, leader_thread_id, session_id, thread_id, threads (+18 more)

### Community 4 - "Notify Hook Turns"
Cohesion: 0.08
Nodes (24): last_event_at, recent_turns, 019e822e-7bba-7482-a268-c71229a0957e|019e822e-7cd7-7350-837a-bbd9ffcb1555|agent-turn-complete, 019e822e-7bba-7482-a268-c71229a0957e|019e8233-9307-7a60-90d0-935fba93e2b6|agent-turn-complete, 019e822e-7bba-7482-a268-c71229a0957e|019e8239-67c1-7820-ba23-bb7724e4243f|agent-turn-complete, 019e822e-7bba-7482-a268-c71229a0957e|019e823a-6cee-7741-9fb6-0a546945269e|agent-turn-complete, 019e822e-7bba-7482-a268-c71229a0957e|019e8242-c487-7be3-98f0-972805a52d55|agent-turn-complete, 019e822e-7bba-7482-a268-c71229a0957e|019e8244-7910-7892-884f-a9f34ccfb745|agent-turn-complete (+16 more)

### Community 5 - "Deep Interview State"
Cohesion: 0.08
Nodes (23): active, completed_at, current_phase, final_ambiguity, input_lock, acquired_at, active, blocked_inputs (+15 more)

### Community 6 - "Harness Governance"
Cohesion: 0.11
Nodes (24): P0 MVP Acceptance Criteria, Definition of Done, Implementation Gate, Scope Control, Source of Truth Order, Universal Agent Harness Operating Contract, Validation Evidence Requirement, Backlog Scope-Creep Buffer (+16 more)

### Community 7 - "Performance Goal State"
Cohesion: 0.10
Nodes (20): artifactPaths, evaluator, ledger, state, completedAt, createdAt, evaluator, command (+12 more)

### Community 8 - "MVP Data Architecture"
Cohesion: 0.16
Nodes (20): Core Flow Module Map, Deterministic Capture Testing Decision, Local-First Single-App Architecture, CaptureProgress Entity, CollectionEntry Entity, Creature Entity, DailySession Entity, Encounter Entity (+12 more)

### Community 9 - "Thread Session Index"
Cohesion: 0.11
Nodes (19): first_seen_at, kind, last_seen_at, last_turn_id, leader_thread_id, session_id, thread_id, threads (+11 more)

### Community 10 - "Active Skill Lock"
Cohesion: 0.11
Nodes (17): activated_at, active, active_skills, input_lock, acquired_at, active, blocked_inputs, exit_reason (+9 more)

### Community 11 - "Skill Exit State"
Cohesion: 0.12
Nodes (16): activated_at, active, input_lock, acquired_at, active, blocked_inputs, exit_reason, message (+8 more)

### Community 12 - "Interview Input Lock"
Cohesion: 0.12
Nodes (16): active, current_phase, input_lock, acquired_at, active, blocked_inputs, exit_reason, message (+8 more)

### Community 13 - "Package Metadata"
Cohesion: 0.13
Nodes (14): devDependencies, playwright, engines, node, name, private, scripts, build (+6 more)

### Community 14 - "Graphify Detection"
Cohesion: 0.14
Nodes (13): files, code, document, image, paper, video, graphifyignore_patterns, needs_graph (+5 more)

### Community 15 - "Tmux Hook Config"
Cohesion: 0.15
Nodes (12): allowed_modes, cooldown_ms, dry_run, enabled, log_level, marker, max_injections_per_session, prompt_template (+4 more)

### Community 16 - "Stop Guard State"
Cohesion: 0.26
Nodes (11): ordinary_no_progress_guard, ordinary_no_progress_guard, fingerprint, first_seen_at, last_seen_at, last_thread_id, last_turn_id, repeat_count (+3 more)

### Community 17 - "Goal Completion"
Cohesion: 0.18
Nodes (10): completionBudgetReport, goal, createdAt, objective, status, threadId, timeUsedSeconds, tokensUsed (+2 more)

### Community 18 - "Prompt Routing"
Cohesion: 0.20
Nodes (9): last_triage, created_at, destination, lane, prompt_signature, reason, turn_id, suppress_followup (+1 more)

### Community 19 - "Prompt Routing Session"
Cohesion: 0.20
Nodes (9): last_triage, created_at, destination, lane, prompt_signature, reason, turn_id, suppress_followup (+1 more)

### Community 20 - "Tmux Hook State"
Cohesion: 0.25
Nodes (7): last_event_at, last_injection_ts, last_reason, pane_counts, recent_keys, session_counts, total_injections

### Community 21 - "OMX Metrics"
Cohesion: 0.29
Nodes (6): last_activity, session_input_tokens, session_output_tokens, session_total_tokens, session_turns, total_turns

### Community 22 - "Native Session"
Cohesion: 0.29
Nodes (6): cwd, native_session_id, pid, platform, session_id, started_at

### Community 23 - "Recovery Runbook"
Cohesion: 0.33
Nodes (6): Failure Types and Responses, General Recovery Rule, Operational Recovery Manual, Recovery Task Template, Retry Policy, Status and Validation Report Contract

### Community 24 - "HUD State A"
Cohesion: 0.40
Nodes (4): last_agent_output, last_progress_at, last_turn_at, turn_count

### Community 25 - "HUD State B"
Cohesion: 0.40
Nodes (4): last_agent_output, last_progress_at, last_turn_at, turn_count

### Community 26 - "HUD State C"
Cohesion: 0.40
Nodes (4): last_agent_output, last_progress_at, last_turn_at, turn_count

### Community 27 - "Notify Hook A"
Cohesion: 0.50
Nodes (3): last_event_at, recent_turns, 019e8227-0337-7a53-ae16-4dc813b89e9c|019e8227-046b-7a53-b6d5-0c0dccf01ca3|agent-turn-complete

### Community 28 - "Notify Hook B"
Cohesion: 0.50
Nodes (3): last_event_at, recent_turns, 019e8552-5a29-7880-9642-ba1eeb438126|019e8552-5db1-7222-940f-4167f3b024bf|agent-turn-complete

### Community 29 - "Static Server"
Cohesion: 0.50
Nodes (3): port, root, types

### Community 30 - "Team Nudge State"
Cohesion: 0.50
Nodes (3): last_idle_nudged_by_team, last_nudged_by_team, progress_by_team

### Community 31 - "Deferred Scope"
Cohesion: 0.67
Nodes (3): Negative MVP Acceptance Criteria, Deferred MVP Features, Deferred AI Proof Analysis Contract

## Ambiguous Edges - Review These
- `Failure Types and Responses` → `Daily Wrap-Up Test Contract`  [AMBIGUOUS]
  harness_ver2/docs/RUNBOOK.md · relation: conceptually_related_to

## Knowledge Gaps
- **279 isolated node(s):** `code`, `document`, `paper`, `image`, `video` (+274 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Failure Types and Responses` and `Daily Wrap-Up Test Contract`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `sessions` connect `Subagent Tracking` to `Thread Session Index`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `019e822e-7bba-7482-a268-c71229a0957e` connect `Thread Session Index` to `Subagent Tracking`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `code`, `document`, `paper` to the rest of the system?**
  _279 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Browser UI State` be split into smaller, more focused modules?**
  _Cohesion score 0.080338266384778 - nodes in this community are weakly interconnected._
- **Should `App Rendering Code` be split into smaller, more focused modules?**
  _Cohesion score 0.12380952380952381 - nodes in this community are weakly interconnected._
- **Should `Subagent Tracking` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._