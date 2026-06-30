# Graph Report - .  (2026-06-02)

## Corpus Check
- Corpus is ~26,035 words - fits in a single context window. You may not need a graph.

## Summary
- 600 nodes · 699 edges · 49 communities (42 shown, 7 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.77)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Thread Session Index|Thread Session Index]]
- [[_COMMUNITY_App Rendering Code|App Rendering Code]]
- [[_COMMUNITY_Model And Tests|Model And Tests]]
- [[_COMMUNITY_Subagent Tracking|Subagent Tracking]]
- [[_COMMUNITY_MVP Reward Specs|MVP Reward Specs]]
- [[_COMMUNITY_Notify Hook Turns|Notify Hook Turns]]
- [[_COMMUNITY_Deep Interview State|Deep Interview State]]
- [[_COMMUNITY_Harness Governance|Harness Governance]]
- [[_COMMUNITY_Habit Combo UI|Habit Combo UI]]
- [[_COMMUNITY_Performance Goal State|Performance Goal State]]
- [[_COMMUNITY_MVP Data Architecture|MVP Data Architecture]]
- [[_COMMUNITY_Thread Tracking|Thread Tracking]]
- [[_COMMUNITY_Active Skill Lock|Active Skill Lock]]
- [[_COMMUNITY_Skill Exit State|Skill Exit State]]
- [[_COMMUNITY_Interview Input Lock|Interview Input Lock]]
- [[_COMMUNITY_Stop Guard State|Stop Guard State]]
- [[_COMMUNITY_Package Metadata|Package Metadata]]
- [[_COMMUNITY_Graphify Detection|Graphify Detection]]
- [[_COMMUNITY_Recent Notify Turns|Recent Notify Turns]]
- [[_COMMUNITY_Tmux Hook Config|Tmux Hook Config]]
- [[_COMMUNITY_OMX Runtime State|OMX Runtime State]]
- [[_COMMUNITY_Goal Completion|Goal Completion]]
- [[_COMMUNITY_Prompt Routing A|Prompt Routing A]]
- [[_COMMUNITY_Prompt Routing B|Prompt Routing B]]
- [[_COMMUNITY_Prompt Routing C|Prompt Routing C]]
- [[_COMMUNITY_Prompt Routing D|Prompt Routing D]]
- [[_COMMUNITY_Habit Detail Screenshot|Habit Detail Screenshot]]
- [[_COMMUNITY_Tmux Hook State|Tmux Hook State]]
- [[_COMMUNITY_OMX Metrics|OMX Metrics]]
- [[_COMMUNITY_Native Session|Native Session]]
- [[_COMMUNITY_Recovery Runbook|Recovery Runbook]]
- [[_COMMUNITY_HUD State A|HUD State A]]
- [[_COMMUNITY_HUD State B|HUD State B]]
- [[_COMMUNITY_HUD State C|HUD State C]]
- [[_COMMUNITY_HUD State D|HUD State D]]
- [[_COMMUNITY_Notify Hook A|Notify Hook A]]
- [[_COMMUNITY_Notify Hook C|Notify Hook C]]
- [[_COMMUNITY_Static Assets|Static Assets]]
- [[_COMMUNITY_Static Server|Static Server]]
- [[_COMMUNITY_Session HUD Pairs|Session HUD Pairs]]
- [[_COMMUNITY_Team Nudge State|Team Nudge State]]
- [[_COMMUNITY_Deferred Scope|Deferred Scope]]
- [[_COMMUNITY_Task Baseline|Task Baseline]]
- [[_COMMUNITY_Session Notify Pair|Session Notify Pair]]
- [[_COMMUNITY_Interview Routing Pair|Interview Routing Pair]]
- [[_COMMUNITY_Build Check|Build Check]]
- [[_COMMUNITY_Notify Pair Comparison|Notify Pair Comparison]]
- [[_COMMUNITY_Demo Todos|Demo Todos]]
- [[_COMMUNITY_Model Smoke Flow|Model Smoke Flow]]

## God Nodes (most connected - your core abstractions)
1. `recent_turns` - 23 edges
2. `icon()` - 14 edges
3. `recent_turns` - 11 edges
4. `detailTemplate()` - 11 edges
5. `Select Candidate Creatures` - 9 edges
6. `goal` - 8 edges
7. `input_lock` - 8 edges
8. `input_lock` - 8 edges
9. `input_lock` - 8 edges
10. `selectCandidateCreatures()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `loadState()` --calls--> `createInitialState()`  [INFERRED]
  public/app.mjs → src/model.mjs
- `toggleTodo()` --calls--> `toggleChecklistItem()`  [INFERRED]
  public/app.mjs → src/model.mjs
- `startWrap()` --calls--> `startDailyWrapUp()`  [INFERRED]
  public/app.mjs → src/model.mjs
- `capture()` --calls--> `attemptCapture()`  [INFERRED]
  public/app.mjs → src/model.mjs
- `getCandidates()` --calls--> `selectCandidateCreatures()`  [INFERRED]
  public/app.mjs → src/model.mjs

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Document-Driven Validation Harness** — agents_universal_agent_harness, agents_source_of_truth_order, agents_implementation_gate, agents_validation_evidence, task_queue_mvp_task_sequence, validation_report_command_evidence [EXTRACTED 1.00]
- **Scope and Risk Control System** — agents_scope_control, backlog_scope_creep_buffer, backlog_deferred_mvp_features, acceptance_criteria_negative_mvp, risk_register_scope_creep, risk_register_ip_risk [INFERRED 0.85]
- **Poke Todo Core Loop** — project_context_low_friction_reward_loop, prd_core_user_flow, architecture_core_flow_modules, interface_start_daily_wrapup, interface_attempt_capture, data_model_encounter, data_model_collection_entry [EXTRACTED 1.00]
- **Recovery and Validation Practice** — RUNBOOK_general_recovery_rule, RUNBOOK_retry_policy, smoke_model_flow [INFERRED 0.70]
- **MVP Reward Capture Loop** — deep_interview_spec_task_habit_checklist, deep_interview_spec_candidate_silhouettes, interviews_delayed_daily_wrapup_rewards, deep_interview_spec_encounter_generation, deep_interview_spec_capture_attempt, deep_interview_spec_collection_pokedex_view [EXTRACTED 1.00]
- **Performance Goal Verification Chain** — evaluator_mvp_model_evaluator, package_node_test_script, state_last_validation_pass, codex_goal_complete_performance_goal_completion [EXTRACTED 1.00]
- **OMX Runtime State Machine** — deep_interview_state_deep_interview_runtime_state, skill_active_state_skill_activation_state, subagent_tracking_leader_subagent_threads, tmux_hook_tmux_injection_hook, tmux_hook_state_tmux_hook_runtime_state, prompt_routing_state_autopilot_triage [INFERRED 0.82]
- **Habit Combo Preference Probability Flow** — model_habit_streak_for, model_habit_preference_bonus, model_appearance_weight_for, model_appearance_probability_normalization [EXTRACTED 1.00]
- **Task Kind Badge Rendering** — app_kind_meta, app_detail_template, app_todo_row_template [EXTRACTED 1.00]
- **Preferred Candidate UI Model Loop** — app_select_preferred_creature, app_get_candidates, model_select_candidate_creatures, app_candidate_card_template [INFERRED 0.86]
- **Detail Completion Flow** — chunk03_task_summary_card, chunk03_completion_reward_bar, chunk03_complete_button [INFERRED 0.90]
- **Habit Combo Monster Bonus Loop** — chunk03_habit_combo_panel, chunk03_monster_selection_section, chunk03_gamified_habit_flow [INFERRED 0.88]
- **Mobile Detail Screen Composition** — chunk03_task_detail_screen, chunk03_task_summary_card, chunk03_mobile_card_layout [EXTRACTED 0.94]

## Communities (49 total, 7 thin omitted)

### Community 0 - "Thread Session Index"
Cohesion: 0.05
Nodes (40): first_seen_at, kind, last_seen_at, last_turn_id, leader_thread_id, session_id, thread_id, threads (+32 more)

### Community 1 - "App Rendering Code"
Cohesion: 0.11
Nodes (36): backIcon(), bindEvents(), bookIcon(), calendarIcon(), capture(), categoryMeta, checkIcon(), collectionTemplate() (+28 more)

### Community 2 - "Model And Tests"
Cohesion: 0.14
Nodes (26): demoCreatures, demoTodos, assertMvpDeferredFeaturesAbsent(), attemptCapture(), captureChanceFor(), clampChance(), clone(), countCompleted() (+18 more)

### Community 3 - "Subagent Tracking"
Cohesion: 0.07
Nodes (26): first_seen_at, kind, last_seen_at, last_turn_id, leader_thread_id, session_id, thread_id, threads (+18 more)

### Community 4 - "MVP Reward Specs"
Cohesion: 0.10
Nodes (26): Performance Goal Completion, Collection Motivation Loop, Pokemon Bullet Journal Context Snapshot, Candidate Pokemon Silhouettes, User Triggered Capture Attempt, Collection Pokedex View, Deferred MVP Features, Completed Item Encounter Generation (+18 more)

### Community 5 - "Notify Hook Turns"
Cohesion: 0.08
Nodes (24): last_event_at, recent_turns, 019e822e-7bba-7482-a268-c71229a0957e|019e822e-7cd7-7350-837a-bbd9ffcb1555|agent-turn-complete, 019e822e-7bba-7482-a268-c71229a0957e|019e8233-9307-7a60-90d0-935fba93e2b6|agent-turn-complete, 019e822e-7bba-7482-a268-c71229a0957e|019e8239-67c1-7820-ba23-bb7724e4243f|agent-turn-complete, 019e822e-7bba-7482-a268-c71229a0957e|019e823a-6cee-7741-9fb6-0a546945269e|agent-turn-complete, 019e822e-7bba-7482-a268-c71229a0957e|019e8242-c487-7be3-98f0-972805a52d55|agent-turn-complete, 019e822e-7bba-7482-a268-c71229a0957e|019e8244-7910-7892-884f-a9f34ccfb745|agent-turn-complete (+16 more)

### Community 6 - "Deep Interview State"
Cohesion: 0.08
Nodes (23): active, completed_at, current_phase, final_ambiguity, input_lock, acquired_at, active, blocked_inputs (+15 more)

### Community 7 - "Harness Governance"
Cohesion: 0.11
Nodes (24): P0 MVP Acceptance Criteria, Definition of Done, Implementation Gate, Scope Control, Source of Truth Order, Universal Agent Harness Operating Contract, Validation Evidence Requirement, Backlog Scope-Creep Buffer (+16 more)

### Community 8 - "Habit Combo UI"
Cohesion: 0.14
Nodes (21): Candidate Card Template, Habit Combo Panel, Detail Template, Get Candidates, Habit Combo Days, Task Kind Badge Metadata, Select Preferred Creature, Todo Row Template (+13 more)

### Community 9 - "Performance Goal State"
Cohesion: 0.10
Nodes (20): artifactPaths, evaluator, ledger, state, completedAt, createdAt, evaluator, command (+12 more)

### Community 10 - "MVP Data Architecture"
Cohesion: 0.16
Nodes (20): Core Flow Module Map, Deterministic Capture Testing Decision, Local-First Single-App Architecture, CaptureProgress Entity, CollectionEntry Entity, Creature Entity, DailySession Entity, Encounter Entity (+12 more)

### Community 11 - "Thread Tracking"
Cohesion: 0.11
Nodes (19): first_seen_at, kind, last_seen_at, last_turn_id, leader_thread_id, session_id, thread_id, threads (+11 more)

### Community 12 - "Active Skill Lock"
Cohesion: 0.11
Nodes (17): activated_at, active, active_skills, input_lock, acquired_at, active, blocked_inputs, exit_reason (+9 more)

### Community 13 - "Skill Exit State"
Cohesion: 0.12
Nodes (16): activated_at, active, input_lock, acquired_at, active, blocked_inputs, exit_reason, message (+8 more)

### Community 14 - "Interview Input Lock"
Cohesion: 0.12
Nodes (16): active, current_phase, input_lock, acquired_at, active, blocked_inputs, exit_reason, message (+8 more)

### Community 15 - "Stop Guard State"
Cohesion: 0.28
Nodes (15): ordinary_no_progress_guard, ordinary_no_progress_guard, ordinary_no_progress_guard, ordinary_no_progress_guard, fingerprint, first_seen_at, last_seen_at, last_thread_id (+7 more)

### Community 16 - "Package Metadata"
Cohesion: 0.13
Nodes (14): devDependencies, playwright, engines, node, name, private, scripts, build (+6 more)

### Community 17 - "Graphify Detection"
Cohesion: 0.14
Nodes (13): files, code, document, image, paper, video, graphifyignore_patterns, needs_graph (+5 more)

### Community 18 - "Recent Notify Turns"
Cohesion: 0.15
Nodes (12): last_event_at, recent_turns, 019e8552-0cb6-7320-8d1f-5d5a0e1727aa|019e8552-5a3e-7c53-9e83-9943fe6f3534|agent-turn-complete, 019e8552-0cb6-7320-8d1f-5d5a0e1727aa|019e8618-1902-7a21-a657-5e3b53eb2d4c|agent-turn-complete, 019e8552-0cb6-7320-8d1f-5d5a0e1727aa|019e861b-7160-7f42-ad54-48e783e27cb7|agent-turn-complete, 019e8552-0cb6-7320-8d1f-5d5a0e1727aa|019e8856-b005-72c3-82b2-a65564f0d561|agent-turn-complete, 019e8552-0cb6-7320-8d1f-5d5a0e1727aa|019e885c-cdc2-7f01-9ed0-462dbb45a13a|agent-turn-complete, 019e8552-0cb6-7320-8d1f-5d5a0e1727aa|019e885f-5798-7340-9036-76727f006de4|agent-turn-complete (+4 more)

### Community 19 - "Tmux Hook Config"
Cohesion: 0.15
Nodes (12): allowed_modes, cooldown_ms, dry_run, enabled, log_level, marker, max_injections_per_session, prompt_template (+4 more)

### Community 20 - "OMX Runtime State"
Cohesion: 0.17
Nodes (12): Active Worktree Branches, HUD Turn State, Session Metrics, Ordinary No Progress Guard, Agent Turn Notification State, Autopilot Prompt Triage, Workspace Session, Leader and Subagent Thread Tracking (+4 more)

### Community 21 - "Goal Completion"
Cohesion: 0.18
Nodes (10): completionBudgetReport, goal, createdAt, objective, status, threadId, timeUsedSeconds, tokensUsed (+2 more)

### Community 22 - "Prompt Routing A"
Cohesion: 0.20
Nodes (9): last_triage, created_at, destination, lane, prompt_signature, reason, turn_id, suppress_followup (+1 more)

### Community 23 - "Prompt Routing B"
Cohesion: 0.20
Nodes (9): last_triage, created_at, destination, lane, prompt_signature, reason, turn_id, suppress_followup (+1 more)

### Community 24 - "Prompt Routing C"
Cohesion: 0.20
Nodes (9): last_triage, created_at, destination, lane, prompt_signature, reason, turn_id, suppress_followup (+1 more)

### Community 25 - "Prompt Routing D"
Cohesion: 0.20
Nodes (9): last_triage, created_at, destination, lane, prompt_signature, reason, turn_id, suppress_followup (+1 more)

### Community 26 - "Habit Detail Screenshot"
Cohesion: 0.36
Nodes (8): Complete Button, Completion Reward Bar, Gamified Habit Flow, Habit Combo Panel, Mobile Card Layout, Monster Selection Section, Task Detail Screen, Task Summary Card

### Community 27 - "Tmux Hook State"
Cohesion: 0.25
Nodes (7): last_event_at, last_injection_ts, last_reason, pane_counts, recent_keys, session_counts, total_injections

### Community 28 - "OMX Metrics"
Cohesion: 0.29
Nodes (6): last_activity, session_input_tokens, session_output_tokens, session_total_tokens, session_turns, total_turns

### Community 29 - "Native Session"
Cohesion: 0.29
Nodes (6): cwd, native_session_id, pid, platform, session_id, started_at

### Community 30 - "Recovery Runbook"
Cohesion: 0.33
Nodes (6): Failure Types and Responses, General Recovery Rule, Operational Recovery Manual, Recovery Task Template, Retry Policy, Status and Validation Report Contract

### Community 31 - "HUD State A"
Cohesion: 0.40
Nodes (4): last_agent_output, last_progress_at, last_turn_at, turn_count

### Community 32 - "HUD State B"
Cohesion: 0.40
Nodes (4): last_agent_output, last_progress_at, last_turn_at, turn_count

### Community 33 - "HUD State C"
Cohesion: 0.40
Nodes (4): last_agent_output, last_progress_at, last_turn_at, turn_count

### Community 34 - "HUD State D"
Cohesion: 0.40
Nodes (4): last_agent_output, last_progress_at, last_turn_at, turn_count

### Community 35 - "Notify Hook A"
Cohesion: 0.50
Nodes (3): last_event_at, recent_turns, 019e8227-0337-7a53-ae16-4dc813b89e9c|019e8227-046b-7a53-b6d5-0c0dccf01ca3|agent-turn-complete

### Community 36 - "Notify Hook C"
Cohesion: 0.50
Nodes (3): last_event_at, recent_turns, 019e876e-4ce7-7653-8876-1ca63580a442|019e876e-4d93-7bd1-8cc2-f2a28f837864|agent-turn-complete

### Community 37 - "Static Assets"
Cohesion: 0.67
Nodes (4): Build Check Required Files, Demo Creatures, HTML App Shell, Static Dev Server

### Community 38 - "Static Server"
Cohesion: 0.50
Nodes (3): port, root, types

### Community 39 - "Session HUD Pairs"
Cohesion: 0.50
Nodes (4): Session 019e8552 Hud State, Session 019e8552 Prompt Routing State, Session 019e876e Hud State, Session 019e876e Prompt Routing State

### Community 40 - "Team Nudge State"
Cohesion: 0.50
Nodes (3): last_idle_nudged_by_team, last_nudged_by_team, progress_by_team

### Community 41 - "Deferred Scope"
Cohesion: 0.67
Nodes (3): Negative MVP Acceptance Criteria, Deferred MVP Features, Deferred AI Proof Analysis Contract

## Knowledge Gaps
- **364 isolated node(s):** `code`, `document`, `paper`, `image`, `video` (+359 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `sessions` connect `Subagent Tracking` to `Thread Session Index`, `Thread Tracking`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `019e8552-0cb6-7320-8d1f-5d5a0e1727aa` connect `Thread Session Index` to `Subagent Tracking`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `code`, `document`, `paper` to the rest of the system?**
  _364 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Thread Session Index` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `App Rendering Code` be split into smaller, more focused modules?**
  _Cohesion score 0.11336032388663968 - nodes in this community are weakly interconnected._
- **Should `Model And Tests` be split into smaller, more focused modules?**
  _Cohesion score 0.13709677419354838 - nodes in this community are weakly interconnected._
- **Should `Subagent Tracking` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._