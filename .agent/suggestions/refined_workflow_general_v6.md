---
description: Universal Development Protocol v6 (Auto-GitHub Issues + Setup Guide)
---

# ♾️ Universal Agent Protocol v6

## 1. Context & Initialization 🧠
*   **Deep Context Scan**: Read `PROJECT.md`, `planning-with-files/task_plan.md`, and `planning-with-files/current_state.md`.
*   **Skill Activation**: Use `.agent/skills/planning-with-files/SKILL.md`.

## 2. Mode Selection (The Fork) 🔀
Is the request **Execution** (Build this) or **Ideation** (Think about this)?

### A. Ideation / Brainstorming Mode 💡
*   **Trigger**: User says "Help me ideate", "Brainstorm", or expresses uncertainty.
*   **Protocol**:
    1.  Create `planning-with-files/ideation_<topic>.md`.
    2.  Iterate until Consensus.
    3.  **Auto-Issue Creation**: Once agreed, Agent must create GitHub Issues for the decided features.
    4.  Move to **Phase 2 (Planning)**.

### B. Execution Mode 🛠️
*   **Trigger**: User says "Implement this".
*   **Protocol (Auto-Issue)**:
    *   **Check**: Does a GitHub Issue exist?
    *   **No**: Agent creates the Issue *first* via GitHub MCP.
    *   **Yes**: Proceed to Planning.

## 3. Planning Phase 📝 (Monolithic Context)
*   **The Living Plan**: Maintain a **SINGLE** `task_plan.md`.
    *   **Format**: `## Phase X: [Issue #ID] Task Name` (Strictly linked to Issues).
    *   **Bugs**: Inject `## 🚨 CRITICAL: Fix [Issue #New]` at top.
*   **Scenario Handling**:
    *   **Feature Creep**: Create new Issue -> Add to Plan as future Phase.

## 4. Execution Phase ⚡
*   **Test-Driven**: Verify/compile code.
*   **Coding Standards**: Follow `PROJECT.md`.
*   **Progress Log**: Update `planning-with-files/progress.md`.

## 5. Zero-Touch Documentation Protocol 🤖
*   **Trigger: New Library/Tool** -> Update `PROJECT.md`.
*   **Trigger: Phase Complete** ->
    1.  Update `PROJECT.md` Status.
    2.  **Close GitHub Issue** via MCP.

## 6. Completion Protocol ✅
*   **The "Flush"**: Summarize `progress.md` to `CHANGELOG.md` (Unreleased).
*   **State Save**: Update `planning-with-files/current_state.md`.
*   **Commit**: `feat(scope): description (closes #ID)`.
