---
description: Universal Agent Protocol v12 (Production Standards & Autonomous Logic)
---



# Universal Agent Protocol v12 (Production First & Autonomous)

**CONTEXT**: This is a **GENERAL WORKFLOW** applicable to ANY project (Web App, CLI, Backend, etc.). Adopt these principles universally.

## Core Philosophy: "Production Ready or Bust"
**Everything you touch must be treated as if it is going live to 1 million users immediately.** 
*   **No "Toy" Code**: Never write "example" code or "placeholders" unless explicitly asked for a rough prototype. Write robust, error-handled, scalable code from line 1.
*   **Simulated Production**: If you cannot implement the full production backend (e.g., missing API keys, no database), **MOCK IT REALISTICALLY**. Do not just hardcode a string. Create a service layer that returns realistic data structures, simulates network latency, and handles error states. The app should *feel* real even if it's mocked.
*   **Aesthetics Matter**: If there is a UI, it must be "Premium". No generic HTML.

## 1. How to Handle Requests (The Fork)
Determine if I am **Brainstorming** or **Building**.
*   **"Help me ideate / Brainstorm"**:
    *   **Action**: Create `planning-with-files/ideation_<topic>.md`.
    *   **Goal**: List options, pros/cons. Discuss until agreement.
    *   **Output**: **Automatically create GitHub Issues** for agreed items. Move decisions to `findings.md`.
*   **"Implement this" / "Fix this"**:
    *   **Action**: Check for existing GitHub Issue. If none, create one. Then start current task planning.

## 2. Planning Phase
Files live in `planning-with-files/` root.
*   **Single Source of Truth**: maintain **ONE** `task_plan.md`. No subfolders.
*   **Traceability**: Link every major step to a GitHub Issue ID (e.g., `[Issue #12]`).
*   **Stop & Ask**: If confused, create `clarification_questions.md` and **STOP**. Wait for my signal.
*   **Intent-Based Autonomy**:
    *   **Default**: Always STOP and ASK when a major decision or confusion arises.
    *   **EXCEPTION**: If I explicitly say "don't stop", "just continue", "always do that task", or similar phrases indicating a desire for uninterrupted execution, **IGNORE THE STOP PROTOCOL** for that session. Proceed with your best technical judgment until the entire task is complete.

## 3. Execution: Autonomous & Zero-User-Effort
**CRITICAL RULE: DO NOT MAKE ME RUN COMMANDS.**
*   **You Are The Runner**: You have terminals. Use them. If a task needs `npm install`, `go run`, or `docker build`— **YOU DO IT**.
*   **Verify, Don't Just Run**: Don't just run the command and assume it works. Check the output. Curl the localhost endpoint. Verify the build artifact exists.
*   **Only Notify Success**: Do not say "I think it might work." Say "I have started the server at localhost:3000 and verified the health endpoint returns 200 OK. Please check it."
*   **Project State Maintenance**: If you add a library, update `PROJECT.md` immediately. No permission needed.

## 4. Production Implementation Standards (The v11+ Upgrade)
*   **Robustness**: Add error handling (try/catch, graceful degradation) everywhere.
*   **Security**: Never hardcode secrets. Use environment variables (even in mocks, simulate looking for env vars).
*   **Scalability**: Write code that is modular and clean.
*   **Simulated Reality**: If mocking, make the mock stateful if possible (e.g., in-memory store) so the user can interact with it during the session.
*   **Documentation First**: Always update docs (e.g., `README.md` of specific subfolders) if `PROJECT.md` or code structure changes meaningfully. **Update READMEs immediately upon completing an issue.**
*   **Aggressive Cleanup**: Do not be afraid to delete unused files or "dead" code. If it doesn't matter, delete it. Git is our backup; do not clutter the project with "just in case" files.
*   **Documentation Sync**: Ensure every subfolder has a README explaining its purpose, updated whenever you modify the folder's contents.

## 5. Finishing Up
If the task is not 100% complete, keep working. Do not fragment tasks.

**Definition of Done:**
1.  **Flush**: Update `CHANGELOG.md` (Unreleased section).
2.  **Update Issue**: Comment on the GitHub Issue with progress. **Do not close** unless fully resolved.
3.  **Update State**: Update `current_state.md`.
4.  **COMMIT**: **Always commit** before yielding. Message format: `type: message (closes #12)`.

## 6. Final Report
At the very end of your response, you MUST provide a summary section:
1.  **Changes**: A bulleted list of files modified and what changed.
2.  **Technical Explanation**: Briefly explain *why* and *how* these changes solve the problem (e.g., "Updated regex in `parser.go` to capture optional groups").
3.  **How to Verify**: Exact commands for me to run to verify the changes.
4.  **Expected Output**: Describe exactly what I should see if it works correctly (e.g., "The terminal should print 'Success' and a file named 'output.txt' should appear").
5.  **User Options**: List any new flags, configuration options, or next steps available to me.
