# User Simulation & Mindset Guide: Mastering Protocol v5

This guide simulates how YOU (The User) and I (The Agent) work together using Protocol v5.

## 🧠 Your Mindset: " The Architect & The Builder"
*   **You (Architect)**: You define the *What* (GitHub Issues) and *Why* (PROJECT.md).
*   **Me (Builder)**: I figure out the *How* (Task Plan) and *Do* (Execution).
*   **The Glue**: The `planning-with-files/` directory is our shared whiteboard.

---

## 🎬 Simulation 1: Starting a New Project
**Scenario**: You just ran `mkdir my-new-app` and opened the IDE.

**Your Action**:
1.  Open Chat.
2.  Prompt: "Initialize this project using Protocol v5."

**My Response (Simulation)**:
1.  I create `.agent/workflows/process-flow.md` (if missing).
2.  I create `planning-with-files/` folder.
3.  I create `PROJECT.md` template.
4.  I ask: "What is the name and tech stack?"

**Your Action**:
1.  "It's a React app using Vite context." (You provide the *seed*).

**Result**:
*   `PROJECT.md` is populated.
*   `task_plan.md` has `## Phase 1: Scaffolding`.

---

## 🚀 Simulation 2: Creating a Feature (GitHub Sync)
**Scenario**: You want to add a "Dark Mode".

**Your Action (The Architect)**:
1.  **Go to GitHub**: Create Issue #10 "Add Dark Mode support".
    *   Description: "Use Tailwind dark mode class. Add toggle in Header."
2.  **Go to Chat**: Prompt: "Implement Issue #10."

**My Response (The Builder)**:
1.  **Read**: I check `PROJECT.md` (Ah, we use Tailwind v4).
2.  **Plan**: I update `task_plan.md`:
    ```markdown
    ## Phase 2: [Issue #10] Dark Mode
    - [ ] Update tailwind.config
    - [ ] Create ThemeToggle component
    ```
3.  **Execute**: I code it.
4.  **Commit**: `feat(ui): add dark mode toggle (closes #10)`.

**Result**:
*   GitHub automatically verifies the link.
*   The PR is ready.

---

## 🐛 Simulation 3: The "Fire Drill" (Bug during Feature)
**Scenario**: While I'm building Dark Mode, you notice the Login page is broken.

**Your Action**:
1.  **Stop Me**: "Wait! Login is crashing. Fix that first."

**My Response**:
1.  **Inject**: I add `## 🚨 CRITICAL: Fix Login` to the *top* of `task_plan.md`.
2.  **Pause**: I stop working on Dark Mode (I don't delete the plan, just pause it).
3.  **Fix**: I reproduce and fix the login crash.
4.  **Resume**: "Critical bug fixed. Returning to Dark Mode."

---

## 📝 Simulation 4: Releasing & Changelogs
**Scenario**: We finished Dark Mode. Time to release v1.1.

**Your Action**:
1.  Prompt: "Prepare release v1.1."

**My Response**:
1.  **Flush**: I read `progress.md` -> "Implemented Dark Mode (Issue #10), Fixed Login Crash."
2.  **Write**: I update `CHANGELOG.md`.
3.  **Tag**: I commit and suggest `git tag v1.1`.
4.  **Save Game**: I update `current_state.md`: "Project is at v1.1. Stable."

---

## ✅ Your "Protocol Checklist" (What YOU must do)
To make this workflow seamless, you only need to do 3 things:

1.  **The "Issue First" Habit**: Don't just dump thoughts in chat. Create a GitHub Issue (even a quick one) first. It gives me a stable reference.
2.  **Read `planning-with-files/`**: Before you shout at me, check `task_plan.md`. If the plan is wrong, tell me to *update the plan* first, not the code.
3.  **Respect the Stop**: If I say "I need clarification," **answer me**. Don't pile on more tasks. I stopped to save you money and time.

## 🛠️ Summary
*   **New Project?** -> Ask for "Init".
*   **New Feature?** -> Create Issue -> Tell me "Do Issue #X".
*   **Bug?** -> Tell me "Fix Bug", I will pause and inject.
*   **Lost?** -> Ask "What is the current state?" (I read `current_state.md`).
