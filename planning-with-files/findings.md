# Findings

## Project Requirements (Updated 2026-01-29)

### Architecture: Monorepo
*   **CLI Tool (`/cli`)**:
    *   **Language**: Go (Golang).
    *   **Platforms**: Linux, Mac, Windows.
    *   **Functionality**: `npx arsenal` (Install/Login), `arsenal pull`.
    *   **Interactive Selection**: Setup/Config, Agent (Antigravity, Cursor, etc.), Scope.
*   **Web Interface (`/web`)**:
    *   **Framework**: Vite + React + Tailwind v4 + Shadcn UI.
    *   **Concept**: "Marketplace" for prompts.
    *   **Storage**: Markdown (`.md`) files with Git-like versioning.

### CLI Implementation Details
*   **Tech Stack**:
    *   **Framework**: Cobra (Standard for Go CLIs).
    *   **Config**: Viper (Handles env vars + config files).
    *   **UI/UX**: Charmbracelet Stack (`bubbletea`, `lipgloss`) for "Premium" feel.
    *   **Auth**: Device Flow (Browser-based) -> Saves token to `~/.arsenal.yaml`.
*   **Architecture: Adapters**:
    ```go
    type Adapter interface {
        Name() string
        Detect(cwd string) bool
        Apply(config Config, prompts []Prompt) error
    }
    ```
*   **Directory Structure**:
    ```text
    /cli
    ├── cmd/arsenal/   # main.go + command definitions
    ├── internal/
    │   ├── auth/      # Login logic
    │   ├── config/    # Configuration handling
    │   ├── tui/       # Bubbletea models/views
    │   └── adapters/  # Cursor, Windsurf, generic adapters
    └── go.mod
    ```

### Research: Personal Prompt Management Tools
**Date**: 2026-01-29
**Source**: Search Results
#### Key Features
*   **Centralized Repository**: Single source of truth.
*   **Versioning**: Git-like version control for prompts is crucial.
*   **Templating**: Variables (e.g., `{{variable}}`) for dynamic prompts.
