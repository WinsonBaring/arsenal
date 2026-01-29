---
description: Enhanced Process Flow with GitHub Issue Sync & Persistent Context
---

# 🛡️ Arsenal Protocol v2 (Based on Planning-with-Files)

## 1. Context & Initialization 🧠
*   **Context Scan**: If you lack context, `tree planning-with-files/` and read `{task_plan.md, current_state.md, findings.md}`.
*   **Skill Activation**: You MUST use the skill at `.agent/skills/planning-with-files/SKILL.md`.
*   **Research First**: Before writing code, use `context7` or `search_web` to understand the domain.

## 2. Planning Phase 📝 (Monolithic Context)
*   **The Golden Rule**: Maintain a **SINGLE** `task_plan.md` in the root of `planning-with-files/`.
    *   **Do NOT** create subfolders for tasks (e.g., `task-1/`).
    *   **GitHub Issues**: Map issues to the plan. E.g., `## Phase 4: [Issue #12] Fix Login Typo`.
*   **Clarification**:
    *   If unsure, create `planning-with-files/clarification_questions.md` (this is the ONE exception for temp files).
    *   **STOP** and ask for a "Go Signal".

## 3. Execution Phase ⚡
*   **Test-Driven**: Always verify/compile code before finishing.
*   **Documentation**: Update `README.md` or `docs/` with every functional change.
*   **Iterative clarification**: If new unknowns arise, STOP and ask.
*   **Coding Standards**: Strictly observe Monorepo (Go CLI + Vite Web) patterns.

## 4. Persistent Memory Protocol 💾
To solve "New Session Amnesia":
1.  **Append-Only Log**: Write all actions to `progress.md`.
2.  **State Snapshot**: Update `current_state.md` at the end of every turn.
    *   *Format*: High-level summary of "Where we are" and "What's broken".
3.  **Archival**: If `progress.md` > 100 lines:
    *   Summarize key decisions into `findings.md`.
    *   Move raw logs to `archive/progress_YYYY-MM-DD.md`.
    *   Clear `progress.md`.

## 5. Completion Protocol ✅
*   **Commit Policy**: NEVER finish a turn without committing.
    *   `feat/fix/docs/chore: description`.
*   **Handoff**: Provide a summary of what changed and what needs testing.
