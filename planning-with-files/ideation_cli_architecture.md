# Ideation: Arsenal CLI Architecture & UX (Final Polish)

## 1. Core Philosophy
"Magical but Transparent". The CLI bridges the Web Marketplace and local IDEs.

## 2. Architecture & Patterns
| Layer | Strategy |
| :--- | :--- |
| **Auth** | **Stub (Option B)**. Real UI, fake token. Until backend is ready. |
| **API** | **Mock Client (Option B)**. Designed with `interface` for easy swap. |
| **Injection** | **Block Infile** (`# BEGIN ARSENAL`) + `spf13/afero` (File System Abstraction). |
| **Templating** | `Masterminds/sprig` (Go Templates). |

## 3. The "Smart Pull" Workflow
This addresses the challenge of different Agents having different rule paths.

### A. Configuration: `arsenal.json`
Located in the project root. Keeps track of what you are using *in this project*.
```json
{
  "remote_sets": ["react-guru", "clean-code"],
  "target_agent": "auto" 
}
```

### B. The Pull Logic
1.  **Load**: CLI reads `arsenal.json` + `~/.arsenal/config.yaml` (Global User Config).
2.  **Fetch**: CLI fetches the user's "subscribed" prompts from the (Mock) Web API.
3.  **Select (TUI)**: 
    *   Shows a checklist (Bubbletea). 
    *   Items in `arsenal.json` are pre-checked.
    *   User can toggle others.
4.  **Agent Detection (The "Middleground")**:
    *   The CLI scans for `.agent/` (Antigravity), `.claude/` (Claude Code), `.cursorrules` (Cursor).
    *   **Logic**:
        *   If `Antigravity`: Target -> `.agent/rules/<prompt_name>.md`.
        *   If `Claude`: Target -> `.claude/rules/<prompt_name>.md`.
        *   If `Cursor`: Target -> Append to `.cursorrules` (using Block Injection).
    *   **Override**: If detection is wrong, user can set `"target_agent": "antigravity"` in `arsenal.json` to force a path.

### C. Execution
*   CLI generates the files using Afero (in-memory).
*   CLI computes diff.
*   CLI asks for confirmation.
*   CLI writes to disk.
*   CLI updates `arsenal.json` to reflect the new selection (so next pull remembers).

## 4. Next Steps (Execution Plan)
1.  **Auto-Create Issue #1**: "Implement CLI Core (Cobra/Viper/Afero)".
2.  **Run Initialization**: `go mod init`, `go get` dependencies.
3.  **Scaffold**: Setup `cmd/`, `internal/adapters/`, `internal/engine/`.
