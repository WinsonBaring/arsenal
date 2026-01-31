# System Architecture Review

**Arsenal** represents a modern approach to managing AI prompts, treating them as source code with versioning, dependency management, and automated injection.

## 1. High-Level Design

The system is a Monorepo composed of two primary artifacts:

1.  **Management Plane (Web)**: A React/Vite application for authoring and organizing prompts.
2.  **Consumption Plane (CLI)**: A Go-based command-line tool for developers to sync prompts into their local environments.

```mermaid
graph TD
    subgraph "Cloud / Storage"
        Repo[Prompt Repository\n(Git + Markdown)]
    end

    subgraph "Web Interface (Management)"
        Dashboard[My Library]
        Editor[Markdown Editor]
        Marketplace[Community Hub]
    end

    subgraph "CLI (Consumption)"
        PullCmd[arsenal pull]
        CleanCmd[arsenal clean]
        Adapter[Adapter Strategy]
    end

    subgraph "Target Environment"
        IDE_Cursor[.cursorrules]
        IDE_Windsurf[.windsurfrules]
        IDE_Antigravity[.agent/rules]
    end

    Dashboard -- Reads/Writes --> Repo
    Editor -- Authors --> Repo
    PullCmd -- Fetches --> Repo
    PullCmd -- Uses --> Adapter
    Adapter -- Detects --> IDE_Cursor & IDE_Windsurf & IDE_Antigravity
    Adapter -- "Injects" --> IDE_Cursor & IDE_Windsurf & IDE_Antigravity
    CleanCmd -- Removes --> IDE_Cursor & IDE_Windsurf & IDE_Antigravity
```

## 2. Core Components

### 2.1 Web Application
*   **Tech Stack**: React 19, Vite, Tailwind CSS v4, Shadcn/UI, Lucide Icons.
*   **State Management**: React Query (Planned) / LocalStorage (Current Mock).
*   **Routing**: React Router v7.
*   **Editor**: `react-markdown` + Frontmatter parsing.

### 2.2 CLI Tool
*   **Tech Stack**: Go 1.23+, Cobra (Command Structure), Viper (Config), Bubbletea (TUI).
*   **Pattern**: Adapter Design Pattern.
    *   **Goal**: Decouple the core "Pull" logic from the specific syntax required by different AI agents.
    *   **Interface**: `AgentAdapter` (Detect, Name, Inject, Clean).
*   **FileSystem**: `spf13/afero` abstraction for easy testing.

## 3. Data Model

Prompts are stored as **Markdown files** with YAML Frontmatter. The "Single Source of Truth" is the file itself.

**Schema:**
```markdown
---
id: string (uuid)
name: string
description: string
author: string
version: string (semver)
tags: string[]
lastUpdated: iso8601
---

# Prompt Content
...
```

## 4. Security
*   **Authentication**: Device Flow (OAuth 2.0) via generic provider (mocked currently as `dummy_token`).
*   **Local Storage**: Secrets stored in `~/.arsenal/config.yaml` (macOS/Linux) or `%APPDATA%/arsenal/config.yaml` (Windows).
*   **Injection Safety**: The CLI uses "Managed Blocks" (`# BEGIN ARSENAL` ... `# END ARSENAL`) to ensure it never overwrites user-defined rules outside its scope.
