# Phase 2: Refinements, Clarifications & New Ideas

## ❓ Clarification Questions

### 1. The "Source of Truth" Paradox
You mentioned wanting **Git-like versioning** (`v1`, `v1.1`) and a **Web Interface** to manage it.
*   **Question**: When you save a prompt in the Web Interface, where does it legally live?
    *   **Option A (Database Driven)**: It saves to Supabase (Postgres). The "Version" is just a row in a database. `arsenal pull` downloads from the API. (Easier to build).
    *   **Option B (Git Driven)**: The Web App actually commits to a GitHub Repository. `arsenal pull` effectively does a `git pull` or downloads raw files from GitHub. (Harder to build, but "purer" Git).
    *   **Option C (Hybrid)**: Database for metadata/search, but the content is synced to a private repo.
    dont implement this one yet, this is not important for now

### 2. Authentication Strategy
*   **Question**: How do you want to log in via the CLI?
    *   **Device Flow (Recommended)**: Run `arsenal login`, it opens a browser, you click "Confirm", and the CLI automatically receives a token. 
    *   **API Key**: You generate a key in the Web Settings and paste it into the CLI.

    i wanted to use the device flow method

### 3. "Marketplace" Scope
*   **Question**: Is "Marketplace" intended for **Community Sharing** (others can see your prompts) or just a **Personal Library** (private "marketplace" of your own tools)?

i   i wnated to make it a community sharing place but i wanted us to have accounts so that we save our own setup
---

## 💡 New Ideas for "Arsenal"

### 1. The `arsenal.lock` File 🔒
*   **Concept**: Just like `package-lock.json` ensures everyone installs the exact same NPM packages, `arsenal.lock` ensures everyone on your team uses the **exact same prompt versions**.
*   **Why**: If you update the "Senior React Dev" prompt to v2.0 in the specific project, you don't want it breaking your teammate's workflow who is still on v1.0 until they explicitly upgrade.

### 2. "Agent Adapters" 🔌
*   **Concept**: Write the prompt *once* in the Web UI, deploy to *any* agent.
*   **Workflow**:
    *   You write a generic "Code Review" prompt.
    *   **Adapter: Cursor**: `arsenal pull` detects it's for Cursor and writes to `.cursorrules`.
    *   **Adapter: Windsurf**: `arsenal pull` detects Windsurf and writes to `.windsurfrules`.
    *   **Adapter: CI/CD**: `arsenal pull` detects a Github Action environment and exports it as an ENV VAR.
yes i wanted agent adapters 
### 3. "Prompt Injection" vs "Context Files"
*   **Concept**: Give the user control over *how* the prompt is consumed.
*   **CLI Option**: `arsenal pull --mode=system` vs `arsenal pull --mode=file`.
    *   **System**: Tries to hide it in the agent's system instruction.
    *   **File**: Just saves it as `docs/prompts/my-prompt.md` so you can manually reference it (e.g., `@my-prompt`).

### 4. Interactive "Dry Run" in CLI
*   **Concept**: Before overwriting your local configuration, the CLI shows a diff.
    ```text
    arsenal pull
    
    Update detected for 'React Expert':
    - System: "You are a React dev."
    + System: "You are a Senior React dev with Next.js expertise."
    
    Apply? [Y/n]
    ```

    no i dont wanted to overide my local config, if there is a conflict give option to the user to either overide or not continue the conflicts or skip the conflicts

### 5. "Arsenal Global" vs "Arsenal Local"
*   **Concept**: clearly separating *Environment* tools from *Project* tools.
    *   **Global**: "Explain this error", "Refactor this generic code" (Available everywhere).
    *   **Local**: "Project Architecture Guidelines", "Database Schema Context" (Only active in this folder).
