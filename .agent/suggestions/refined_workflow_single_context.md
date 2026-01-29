# Refined Workflow Strategy: The "Monolithic Context" Approach

You are absolutely right. If you switch contexts frequently (fixing a bug while building a feature), fragmenting your files kills the flow. The Agent needs **one definitive history**.

## 1. The Single "Master Plan" Principle
Stop splitting tasks into folders. Use **One set of active files** in the root of `planning-with-files/` that evolves over time.

### Structure
```text
planning-with-files/
├── task_plan.md      # The "Living Roadmap"
├── progress.md       # The "Captain's Log" (Chronological History)
├── findings.md       # The "Knowledge Base" (Permanent Notes)
└── archive/          # Where old logs go to die (but remain searchable)
```

### The Strategy: "Append-Only" Logic
*   **Feature vs Bug? Doesn't Matter.** Use headings in `task_plan.md`.
    *   Instead of creating `bug-fix/task_plan.md`, just add `## [Bug] Fix Login Typo` to your main `task_plan.md`.
    *   Mark it as "Active" or "Paused".
*   **Benefit**: The Agent sees *everything* currently on your plate. It knows you paused the Feature to fix the Bug.

## 2. Solving the "New Session" Problem (Persistent Context)
You want the Agent to know "How did we get here?" even if you restart the chat.

### The "Session Handoff" Protocol 🤝
For the Agent to understand the *entire* history without reading a 5,000-line file (which hits context limits):

**A. The `progress.md` Summary Rule**
*   **The Problem**: `progress.md` grows infinitely.
*   **The Fix**: Implement a **"Milestone Summary"**.
    *   Every time a major Task is marked `[x] Done`, the Agent must write a summary into `findings.md` or a new `history_summary.md`.
    *   Example: *"On Jan 29, we scaffolded the CLI. We chose Cobra over Urfave because of Viper integration."*
    *   Then, you can *archive* the detailed `progress.md` logs to `archive/2026-01-29_scaffolding_log.md` and start fresh.

**B. The "State File" Concept**
Create a `current_state.md`. This is a high-level snapshot for a new Agent.
*   *Content*: "We are currently in Phase 3 (CLI Implementation). The CLI folder exists but `main.go` is empty. The Web interface is fully scaffolded."
*   *Mechanism*: The Agent reads this *first*. It acts as the "Save Game" file.

## 3. Handling "New Codebase / GitHub Issues" in this Model
*   **GitHub Issues**: Just copy the Issue URL/Description into `task_plan.md` as a new Phase.
    *   `## Phase 4: Fix GitHub Issue #12`
*   **New Codebase**:
    *   The first action in `progress.md` is `[Analysis] Mapped project structure`.
    *   Findings go into `findings.md`.

## 4. Modified `process-flow.md` Logic
Update your workflow instruction to enforce this:

> "Maintain a SINGLE `task_plan.md`. Do not create subfolders for tasks. If a new request comes in (feature/bug), ADD it to the existing plan.
>
> **Constraint**: To preserve history for future sessions, you must summarize completed milestones into `findings.md` before clearing detailed logs from `progress.md`.
>
> **Constraint**: Always maintain a `current_state.md` summary that explains WHERE we are in the project so a fresh Agent can resume instantly."

This solves both your problems:
1.  **No Fragmentation**: You can mix bugs/features in one file.
2.  **Persistent History**: Summaries + State Files allow "Infinite Context" across sessions.
