# Edge Case & Scenario Analysis

This document outlines how **Protocol v4** handles every possible scenario you might encounter.

## 1. The "Indecisive" Scenario (Ideation Mode) 💡
*   **User**: "I'm not sure if I should use Supabase or Firebase."
*   **Protocol**:
    1.  Agent detects **Ideation Mode**.
    2.  Creates `planning-with-files/ideation_supabase_vs_firebase.md`.
    3.  Lists Pros/Cons.
    4.  **Loop**: Agent asks "Do you prefer SQL or NoSQL?"
    5.  **User**: "SQL".
    6.  **Resolution**: Merge decision ("Use Supabase") into `findings.md`. Switch to **Execution Mode**.

## 2. The "Context Overload" Scenario (Long Project) 🤯
*   **User**: (Returns after 2 weeks) "Continue work."
*   **Problem**: `process.md` is 5,000 lines long.
*   **Protocol**:
    1.  Agent reads `PROJECT.md` (Tech Stack) + `current_state.md` (Save Game).
    2.  Agent knows: "We are in Phase 3. CLI is scaffolded but Auth is missing."
    3.  **No Token Limit Hit**: Agent ignores the 5,000 line `archive/progress_old.md`.

## 3. The "Fire Drill" Scenario (Urgent Bug) 🚨
*   **User**: "STOP! The login is crashing on Windows."
*   **Protocol**:
    1.  Agent injects `## 🚨 CRITICAL: Fix Windows Login` at the TOP of `task_plan.md`.
    2.  Agent pauses `## Phase 3: Web Dashboard`.
    3.  Agent fixes bug.
    4.  Agent resumes Phase 3.
    *   **Result**: Context isn't lost, just paused.

## 4. The "Vague Requirement" Scenario (Clarification) ❓
*   **User**: "Add a button."
*   **Protocol**:
    1.  Agent enters **Execution Mode**.
    2.  Checks Requirements -> **Fail**.
    3.  Creates `planning-with-files/clarification_questions.md`: "Where? What does it do?"
    4.  **STOP**: Agent refuses to write code until User responds.

## 5. The "New Library" Scenario (Auto-Docs) 📦
*   **User**: "Install `gorm` for database."
*   **Protocol**:
    1.  Agent runs `go get gorm.io/gorm`.
    2.  **Zero-Touch Protocol triggers**: Agent updates `PROJECT.md` -> `Tech Stack: [Go, Cobra, GORM]`.
    3.  Agent updates `task_plan.md`.

## 6. The "Feature Creep" Scenario 📈
*   **User**: "Also add a payment gateway while you're at the auth screen."
*   **Protocol**:
    1.  Agent recognizes this is a *new* requirement.
    2.  Agent updates `task_plan.md`: Adds `## Phase 4: Payments`.
    3.  Agent continues with Auth (Phase 2), enforcing focus.

## 7. The "Release" Scenario 🚀
*   **User**: "Let's ship v1.0."
*   **Protocol**:
    1.  Agent reads all `progress.md` entries since last flush.
    2.  Summarizes: "Added Login, Added Dashboard."
    3.  Updates `CHANGELOG.md`.
    4.  Archives `progress.md`.
    5.  Bumps version.
