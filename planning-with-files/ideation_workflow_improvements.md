# Ideation: Workflow v10 Improvements

## Objective
Refine the "Universal Agent Protocol v10" to be even more robust, covering edge cases and ensuring higher quality autonomous output.

## Potential Improvements

### 1. The "Self-Correction Loop" (Autonomous Debugging)
*   **Idea**: Explicitly define what happens when the "Autonomous Execution" fails.
*   **Current State**: Says "Verify, Don't Just Run".
*   **Improvement**: Add a "Try-Catch-Patch" rule. If verification fails, the agent must attempt to read the error, research/search, and fix it *at least twice* before escalating to the user.
*   **Pros**: Reduces noise. The agent fixes its own typos/config errors.
*   **Cons**: Might get stuck in a loop if the error is fundamental.

### 2. "Context-Aware Overrides" (Project Specifics)
*   **Idea**: Allow the workflow to adapt based on a local file.
*   **Improvement**: Add a step to check for `.agent/project_rules.md`. If it exists, those rules override the general v10 protocol.
*   **Pros**: One workflow for all projects, but flexible (e.g., "Always use TDD" for one repo, "Fast prototyping" for another).

### 3. "Pre-Commit Quality Gate"
*   **Idea**: Enforce a strict pre-commit checklist not just for us, but for the code.
*   **Improvement**: Before the "Commit" step, the agent *must* run the linter and fixer.
    *   `npm run lint --fix` or `go fmt`.
*   **Pros**: Ensures "Production Ready" code is also clean code.

### 4. "Visual Verification" (For Web Apps)
*   **Idea**: Since aesthetics are critical, how do we verify them autonomously?
*   **Improvement**: If building a UI, the "Verification" step must include taking a screenshot (if a browser tool is available) or at least validating that CSS files were generated/loaded.
*   **Pros**: catches "white screen of death" or missing styles.

### 5. "State Restoration" (Resilience)
*   **Idea**: What if the agent crashes/restarts?
*   **Improvement**: Explicit instruction to *read* `planning-with-files/progress.md` immediately upon waking up to restore context. (Already hinted at, but make it a strict startup routine).

### 6. "Standardized Communication Protocols"
*   **Idea**: Define exactly *how* to report success.
*   **Improvement**:
    *   Bad: "I ran the server."
    *   Good: "**Status**: Operational. **URL**: http://localhost:3000. **Logs**: Verified clean startup."

## Discussion Points
Which of these should we bake into v11 (or update v10)?
