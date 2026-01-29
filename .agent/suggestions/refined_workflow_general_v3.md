---
description: Universal Development Protocol (Git-Backed Planning + Auto-Documentation)
---

# ♾️ Universal Agent Protocol v3

## 1. Context & Initialization 🧠
*   **Deep Context Scan**: Before doing ANYTHING, read `PROJECT.md` (Project Intelligence) and `planning-with-files/task_plan.md` (Current Tactics).
*   **Skill Activation**: You MUST use the skill at `.agent/skills/planning-with-files/SKILL.md`.

## 2. Planning Phase 📝 (Monolithic Context)
*   **The Living Plan**: Maintain a **SINGLE** `task_plan.md` in `planning-with-files/`.
    *   **Features**: `## Phase X: Feature Name`
    *   **Bugs**: `## 🚨 CRITICAL: Fix [Issue #ID]` (Inject at top of plan)
    *   **Refactors**: `## Phase Y: Refactor [Module]`
*   **Clarification**:
    *   If requirements are vague, create `planning-with-files/clarification_questions.md`.
    *   **STOP** and ask for a "Go Signal".
    *   *Constraint*: Do NOT proceed until the User validates the plan.

## 3. Execution Phase ⚡
*   **Test-Driven**: Always verify/compile code before finishing.
*   **Coding Standards**: Strictly observe the patterns defined in `PROJECT.md` (Tech Stack section).
*   **Iterative State**: Update `planning-with-files/progress.md` with every significant action.

## 4. Zero-Touch Documentation Protocol 🤖
> **Crucial Rule**: You are responsible for keeping the project documentation alive. The User should never have to manually update `PROJECT.md`.

*   **Trigger: dependency change** (e.g., `npm install`, `go get`) -> Update **Tech Stack** in `PROJECT.md`.
*   **Trigger: new folder** -> Update **Directory Structure** in `PROJECT.md`.
*   **Trigger: phase completion** -> Update **High-Level Status** in `PROJECT.md`.
    *   Example: "Phase 1: Scaffolding [Completed]" -> Update `PROJECT.md` status to "Starting Phase 2".

## 5. Completion Protocol ✅
*   **The "Flush"**: If you completed a Phase, summarize user-facing changes into `CHANGELOG.md` (Unreleased section).
*   **Commit Policy**: NEVER finish a turn without committing.
    *   Format: `type(scope): description` (e.g., `feat(auth): implement login`).
*   **Handoff**: Provide a summary of what changed and the new status in `PROJECT.md`.
