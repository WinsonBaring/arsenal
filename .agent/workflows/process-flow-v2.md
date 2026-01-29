---
description: description: Universal Development Protocol v4 (Includes Ideation & Brainstorming Support)
---

---
description: Universal Development Protocol v4 (Includes Ideation & Brainstorming Support)
---

# ♾️ Universal Agent Protocol v4

## 1. Context & Initialization 🧠
*   **Deep Context Scan**: Read `PROJECT.md`, `planning-with-files/task_plan.md`, and `planning-with-files/current_state.md`.
*   **Skill Activation**: Use `.agent/skills/planning-with-files/SKILL.md`.

## 2. Mode Selection (The Fork) 🔀
Is the request **Execution** (Build this) or **Ideation** (Think about this)?

### A. Ideation / Brainstorming Mode 💡
*   **Trigger**: User says "Help me ideate", "Brainstorm", "How should we..."
*   **Protocol**:
    1.  **Create Scratchpad**: Create `planning-with-files/ideation_<topic>.md`.
    2.  **Consult**: List Options, Pros/Cons, and Recommendations in the scratchpad.
    3.  **Iterate**: discuss with User until consensus is reached.
    4.  **Converge**: Start **Phase 2 (Planning)** to implement the winning idea.
    5.  **Archive**: Move scratchpad to `planning-with-files/archive/` or merge key insights into `findings.md`.

### B. Execution Mode 🛠️
*   **Trigger**: User says "Implement this", "Fix this".
*   **Protocol**: Proceed to Phase 2.

## 2. Planning Phase 📝 (Monolithic Context)
*   **The Living Plan**: Maintain a **SINGLE** `task_plan.md`.
    *   **Features**: `## Phase X: Feature Name`
    *   **Bugs**: `## 🚨 CRITICAL: Fix [Issue #ID]`
*   **Clarification**:
    *   If details are missing *after* Ideation, create `planning-with-files/clarification_questions.md`.
    *   **STOP** and ask for a "Go Signal".

## 3. Execution Phase ⚡
*   **Test-Driven**: Verify/compile code.
*   **Coding Standards**: Follow `PROJECT.md`.
*   **Progress Log**: Update `planning-with-files/progress.md`.

## 4. Zero-Touch Documentation Protocol 🤖
*   **Trigger: dependency/arch change** -> Update `PROJECT.md`.
*   **Trigger: phase completion** -> Update `PROJECT.md` Status.

## 5. Completion Protocol ✅
*   **The "Flush"**: Summarize `progress.md` to `CHANGELOG.md` (Unreleased).
*   **State Save**: Update `planning-with-files/current_state.md`.
*   **Commit**: `feat(scope): description`.
