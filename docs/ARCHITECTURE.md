# System Architecture Review

**Arsenal** represents a modern approach to managing AI prompts, treating them as source code with versioning, dependency management, and automated injection.

## 1. High-Level Design

The system is a Monorepo composed of two primary artifacts:

1.  **Management Plane (Web)**: A React/Vite application for authoring and organizing prompts.
2.  **Consumption Plane (CLI)**: A Go-based command-line tool for developers to sync prompts into their local environments.

```mermaid
graph TD
    subgraph "Cloud Infrastructure"
        Neon[Neon Postgres DB]
        VercelFn[Vercel Functions\n(/api/prompts)]
    end

    subgraph "Web Interface"
        Dashboard[My Library]
        Editor[Markdown Editor]
    end

    subgraph "CLI"
        PullCmd[arsenal pull]
    end

    Dashboard -- HTTPS --> VercelFn
    Editor -- HTTPS --> VercelFn
    PullCmd -- HTTPS --> VercelFn
    VercelFn -- SQL --> Neon
```

## 2. Core Components

### 2.1 Web Application
*   **Tech Stack**: React 19, Vite, Tailwind CSS v4, Shadcn/UI, Lucide Icons.
*   **Backend**: Vercel Serverless Functions (`/api`).
*   **Database**: Neon Serverless Postgres.
*   **Routing**: React Router v7.

### 2.2 CLI Tool
*   **Tech Stack**: Go 1.23+, Cobra, Viper, Bubbletea.
*   **API Client**: Fetches prompts from the Vercel-deployed API (Production) or localhost (Dev).
*   **Pattern**: Adapter Design Pattern.
    *   **Goal**: Decouple the core "Pull" logic from the specific syntax required by different AI agents.
    *   **Interface**: `AgentAdapter` (Detect, Name, Inject, Clean).
*   **FileSystem**: `spf13/afero` abstraction for easy testing.

## 3. Data Model

Prompts are stored in **PostgreSQL (Neon)**.

**Schema (`prompts` table):**
```sql
CREATE TABLE prompts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    category TEXT,
    author TEXT,
    version TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 4. Security
*   **Authentication**: Device Flow (OAuth 2.0) via generic provider (mocked currently as `dummy_token`).
*   **Local Storage**: Secrets stored in `~/.arsenal/config.yaml` (macOS/Linux) or `%APPDATA%/arsenal/config.yaml` (Windows).
*   **Injection Safety**: The CLI uses "Managed Blocks" (`# BEGIN ARSENAL` ... `# END ARSENAL`) to ensure it never overwrites user-defined rules outside its scope.
