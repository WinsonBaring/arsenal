# Findings

## Project Requirements (Updated 2026-01-29)

### Architecture: Monorepo
*   **CLI Tool (`/cli`)**:
    *   **Language**: Go (Golang).
    *   **Platforms**: Linux, Mac, Windows.
    *   **Functionality**:
        *   `npx arsenal`: Install/Login.
        *   `arsenal pull`: Fetch prompts/configs.
        *   **Interactive Selection**:
            *   Select Setup/Config (multiple selection).
            *   Select Agent (Antigravity, Claude, Windsurf, Cursor, etc.).
            *   Select Scope (Project vs User level).
*   **Web Interface (`/web`)**:
    *   **Framework**: Vite.
    *   **Concept**: "Marketplace" for prompts.
    *   **Functionality**:
        *   Create/Edit prompts.
        *   Manage configurations.
        *   **Storage**: Markdown (`.md`) files.
        *   **Versioning**: Git-like constraints (changing a prompt updates its version).
*   **Future**:
    *   Testable environment for prompts (compare outputs).

### Research: Personal Prompt Management Tools
**Date**: 2026-01-29
**Source**: Search Results

#### Key Features
*   **Centralized Repository**: Single source of truth.
*   **Organization**: Categories, tags, folders (e.g., by use-case, project).
*   **Metadata**: Model compatibility, author, cost, latency.
*   **Versioning**: Git-like version control for prompts is crucial.
*   **Templating**: Variables (e.g., `{{variable}}`) for dynamic prompts.
*   **Playground/Testing**: Ability to test prompts against models.

#### Best Practices
1.  **Treat Prompts as Code**: Version them, review them.
2.  **Clear Naming**: `Task-Description-Model` convention.
3.  **Examples**: Include few-shot examples in documentation.
