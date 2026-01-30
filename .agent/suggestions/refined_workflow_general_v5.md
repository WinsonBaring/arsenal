---
description: Universal Development Protocol v5 (Feature Complete + Edge Cases)
---

# ♾️ Universal Agent Protocol v5

## 1. Context & Initialization 🧠
*   **Deep Context Scan**: Read `PROJECT.md`, `planning-with-files/task_plan.md`, and `planning-with-files/current_state.md`.
*   **Skill Activation**: Use `.agent/skills/planning-with-files/SKILL.md`.

## 2. Mode Selection (The Fork) 🔀
Is the request **Execution** (Build this) or **Ideation** (Think about this)?

### A. Ideation / Brainstorming Mode 💡
*   **Trigger**: User says "Help me ideate", "Brainstorm", "How should we..." or expresses uncertainty.
*   **Protocol**:
    1.  **Create Scratchpad**: Create `planning-with-files/ideation_<topic>.md`.
    2.  **Consult**: List Options, Pros/Cons, and Recommendations in the scratchpad.
    3.  **Iterate**: discuss with User until consensus is reached.
    4.  **Converge**: Move decided points to `findings.md` and start **Phase 2 (Planning)**.
    5.  **Archive**: Move scratchpad to `planning-with-files/archive/`.

### B. Execution Mode 🛠️
*   **Trigger**: User says "Implement this", "Fix this" or Consensus from Ideation.
*   **Protocol**: Proceed to Phase 2.

## 3. Planning Phase 📝 (Monolithic Context)
*   **The Living Plan**: Maintain a **SINGLE** `task_plan.md`.
    *   **Features**: `## Phase X: Feature Name`
    *   **Bugs**: `## 🚨 CRITICAL: Fix [Issue #ID]` (Inject at top of plan)
    *   **Clarification**: If details are missing, create `planning-with-files/clarification_questions.md` and **STOP**.
*   **Scenario Handling**:
    *   **Context Overload**: If `progress.md` > 100 lines, summarize to `findings.md` and archive.
    *   **Feature Creep**: If User adds new unrelated request, add as `## Phase Next` (do not disrupt current phase).

## 4. Execution Phase ⚡
*   **Test-Driven**: Verify/compile code before finishing.
*   **Coding Standards**: Strictly follow `PROJECT.md` (Tech Stack).
*   **Progress Log**: Update `planning-with-files/progress.md`.

## 5. Zero-Touch Documentation Protocol 🤖
*   **Trigger: New Library/Tool** -> Update `PROJECT.md` (Tech Stack).
*   **Trigger: New Folder** -> Update `PROJECT.md` (Structure).
*   **Trigger: Phase Complete** -> Update `PROJECT.md` (Status).

## 6. Completion Protocol ✅
*   **The "Flush"**:
    *   Summarize `progress.md` to `CHANGELOG.md` (Unreleased).
    *   **Release Event**: If Phase is "Release", bump version and tag.
*   **State Save**: Update `planning-with-files/current_state.md` (The "Save Game" for next session).
*   **Commit**: `feat(scope): description`.
