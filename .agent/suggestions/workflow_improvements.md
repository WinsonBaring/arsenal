# Workflow Optimization & Lifecycle Strategy

## 1. The "Workflow Separation" Strategy
Instead of one giant "Process Flow" for everything, split your workflows into **Specialized Intents**. This reduces cognitive load and ensures the Agent focuses on the right constraints.

### Proposed Workflow Files
Create these in `.agent/workflows/`:

1.  **`/feature` (`feature-dev.md`)**:
    *   **Trigger**: When building something new.
    *   **Protocol**:
        1.  Create `planning-with-files/feat-<name>/task_plan.md`.
        2.  Mandatory "Architecture/Design" phase before coding.
        3.  Updates `CHANGELOG.md` (Unreleased section) upon completion.
2.  **`/bug` (`bug-fix.md`)**:
    *   **Trigger**: When fixing an issue.
    *   **Protocol**:
        1.  Create `planning-with-files/fix-<issue-id>/task_plan.md`.
        2.  **Mandatory Phase 1**: Create a Reproduction Case (test that fails).
        3.  **Mandatory Phase 2**: Fix code to pass test.
3.  **`/release` (`release-prep.md`)**:
    *   **Trigger**: When ready to ship.
    *   **Protocol**:
        1.  Scans all `CHANGELOG.md` unreleased entries.
        2.  Bumps version in `package.json`, `go.mod`, etc.
        3.  Generates a Git Tag summary.

## 2. GitHub Issue Integration 🐙
Don't let the "Task Plan" live only on your disk. Sync it with GitHub.

**The "Issue-First" Workflow:**
1.  **User**: Creates GitHub Issue #12 ("Add Windsurf Adapter").
2.  **Agent Start**:
    *   Agent creates `planning-with-files/issue-12-windsurf/`.
    *   Agent reads the Issue Body -> Converts to `task_plan.md`.
3.  **Agent Finish**:
    *   Agent updates `task_plan.md` with final status.
    *   Agent generates a PR Body content: "Closes #12. Implemented Windsurf adapter...".

## 3. Changelog & Release Automation 🚀
To make releases professional, use **Conventional Commits**.

*   **Rule**: All commit messages must follow `type(scope): description`.
    *   `feat(cli): add login command`
    *   `fix(web): resolve tailwind conflict`
    *   `docs(readme): update installation guide`

**Why?**
You can use a tool like `git-cliff` or Standard Version later.
**Agent Workflow**:
*   When you say "Commit this", the Agent should ask: "Is this a feature, fix, or chore?" to ensure the `git commit` message is parsable for the Changelog.

## 4. Edge Cases Handling ⚠️

### A. "Context Rot" (Task Plan gets too big)
*   **Problem**: You've been working on a feature for 3 days. `progress.md` is 500 lines long. The Agent forgets the original goal.
*   **Solution**: **The Archive Protocol**.
    *   If `progress.md` > 100 lines:
        1.  Agent summarizes key decisions into `findings.md`.
        2.  Moves old log to `planning-with-files/<task>/archive/progress_part1.md`.
        3.  Clears `progress.md` (keeping only active context).

### B. "Context Switching" (Urgent Bug interrupts Feature)
*   **Problem**: You are halfway through "CLI Login" but need to fix a "Web Typo" immediately.
*   **Solution**:
    *   Agent checks if `task_plan.md` has specific active tasks.
    *   Agent instructs: "I am stashing current planning files. Creating temporary `quick-fix` folder."
    *   *Constraint*: Never mix two tasks in one `task_plan.md` unless they are dependent.

### C. "New Codebase" Entry
How to handle a Repo you just cloned?
*   **Workflow**: `/onboarding`
    1.  Agent runs `tree -L 2` to map structure.
    2.  Agent searches for `README`, `CONTRIBUTING`, `package.json`.
    3.  Agent creates `planning-with-files/onboarding/analysis.md` (Architecture understanding).
    4.  *Only then* does it accept coding tasks.

## 5. Summary of Recommended Files to Create
1.  `.agent/workflows/feature.md`
2.  `.agent/workflows/bug.md`
3.  `.agent/workflows/release.md`
4.  `.agent/workflows/onboarding.md`

This transforms your "Process Flow" from a generic procedure into a **Specialized Expert System**.
