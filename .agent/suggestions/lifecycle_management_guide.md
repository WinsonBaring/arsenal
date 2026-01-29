# SDLC in the Monolithic Context: A Practical Guide

This guide explains how to handle Bugs, Issues, Releases, and Changelogs strictly using the **Single `task_plan.md`** approach.

## 1. Handling Bugs 🐞

When a bug arises in the middle of a session, do **not** create a new file. Instead, **Interject and Prioritize**.

**Action**: The Agent modifies `task_plan.md`.

**Before:**
```markdown
## Phase 2: CLI Implementation [Active]
- [ ] Implement Login
- [ ] Implement Pull
```

**After (Bug Injection):**
```markdown
## 🚨 CRITICAL: Fix Login Crash [Active]
- [ ] Reproduce crash on macOS (Findings in progress.md)
- [ ] Fix nil pointer dereference in auth.go
- [ ] Verify fix

## Phase 2: CLI Implementation [Paused]
- [ ] Implement Login
```

*   **Why**: The Agent sees the "CRITICAL" section at the top and knows priority #1 is the bug. Once checked off, it resumes Phase 2.

## 2. GitHub Issues & Features 🐙

Map external context (GitHub) to internal planning.

**Action**: Use the `[Issue #ID]` tag in your plan.

**`task_plan.md` Example:**
```markdown
## Phase 3: Web Dashboard
- [ ] Scaffold Layout
- [ ] [Issue #12] Add Dark Mode Toggle
    - [ ] Create ThemeProvider
    - [ ] Update Tailwind config
- [ ] [Issue #15] Fix Mobile Responsive Layout
```

*   **Benefit**: When you commit, the Agent generates the message `feat: add dark mode toggle (closes #12)` automatically because it sees the link in the plan.

## 3. Changelog & "The Flush" 📝

Don't manually update `CHANGELOG.md` every 5 minutes. Use a **"Flush Protocol"**.

**Step 1: Track in `progress.md`**
The Agent logs work as usual.

**Step 2: The "Release" Phase**
When you decide to release, add a Release Phase to `task_plan.md`.

```markdown
## Phase 4: Release v1.0.0
- [ ] **Flush Protocol**:
    - [ ] Scan `progress.md` for `[Completed]` features.
    - [ ] Summarize strictly user-facing changes.
    - [ ] Append to `CHANGELOG.md` under `## [Unreleased]`.
- [ ] Bump version in `package.json` / `go.mod`.
- [ ] Tag commit `v1.0.0`.
```

**Step 3: Execution**
The Agent reads its own memory (`progress.md`), summarizes "Added Dark Mode" and "Fixed Login Crash", and writes a clean Changelog entry.

## 4. Summary: The "Living Document"

Your `task_plan.md` is not a static list. It is a dynamic board.

| Scenario | Action in `task_plan.md` |
| :--- | :--- |
| **New Feature** | Add `## Phase X: Feature Name`. |
| **Bug Report** | Insert `## [Bug] Description` *above* the current phase. |
| **Release** | Add `## Phase Z: Release` at the bottom. |
| **Issue** | Rename task to `[Issue #12] Task Name`. |

**Context7 / Research**:
When researching a bug (`findings.md`):
*   Header: `### Bug: Login Crash (Issue #40)`
*   Content: Logs, stack traces, hypotheses.
