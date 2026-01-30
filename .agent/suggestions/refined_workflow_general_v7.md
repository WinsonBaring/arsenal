---
description: Universal Development Protocol v7 (Humanized Instructions)
---

# Universal Agent Protocol v7 (The "Human" Version)

If you don't understand the context of the project, you can scan the standard files like `PROJECT.md` and the stuff inside `planning-with-files/` (specifically `task_plan.md` and `current_state.md`) because those contain information that can be crucial for your initial understanding.

When doing a task, I wanted you to always research before doing the task. Ask clarification questions, use context7 and research, and use the skill located in `.agent/skills/planning-with-files/SKILL.md` to start the task.

## 1. How to Handle My Requests (The Fork)
I wanted you to figure out if I'm just brainstorming or if I actually want you to build something.

*   **If I say "Help me ideate" or "Brainstorm"**: Don't just start planning phases. Create a scratchpad file like `planning-with-files/ideation_<topic>.md` and let's talk about it first. List the options, pros and cons. Once we agree on something, **I wanted you to automatically create the GitHub Issues for me** using the GitHub tool, and then move those decided points into the findings.
*   **If I say "Implement this"**: Check if there's already a GitHub issue. If not, create one for me first. Then start planning.

## 2. Planning Phase
For the planning, specifically note that the `findings`, `progress`, and `task_plan` are stored in the root of `planning-with-files/`.
*   **Keep it simple**: I wanted you to maintain just **ONE** `task_plan.md`. Don't create subfolders for tasks like `task-1/`, just keep it all in the main file.
*   **Link Issues**: When you add a phase, link it to the GitHub Issue ID (like `[Issue #12]`).
*   **Clarification**: If you are confused, create a `clarification_questions.md` inside `planning-with-files/` and **STOP**. Ask me for a go signal before you continue.

## 3. Execution & Auto-Docs
Before finishing the task, make sure to test if it's working, like compiling it. Also, **always update documentation**.
*   **Zero-Touch Rules**: I wanted you to strictly observe the project state. If you add a library or change the architecture, update `PROJECT.md` **automatically** without asking me. That file is your responsibility.
*   **Progress**: Update `progress.md` as you go.

## 4. Finishing Up
If you think the current task is not yet finished (like you are just improving or fixing things for the current task), don't create another task/phase, just keep working on the current one.

If you think you are done:
1.  **Flush**: Summarize what you did (user-facing stuff only) and put it in `CHANGELOG.md` under Unreleased.
2.  **Update Issue**: Do **NOT** close the GitHub issue yet. Instead, add a comment summarizing your changes and referencing the commit hash, then ask me if I want to close it.
3.  **Update State**: Update `planning-with-files/current_state.md` so the next agent knows what happened.
4.  **Commit**: This is something you should never forget—**always and always commit** before finishing your current actions. Your commit message should be proper (like `feat: ...`) and link to the issue (`closes #12`).

If you get a go signal to start implementing but another set of questions arose, you can continue asking questions. I wanted you to always observe the project coding patterns and follow them.
