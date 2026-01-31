# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### CLI
*   **Feat**: Implemented `arsenal pull` command with Smart Agent Detection (Antigravity, Cursor, Claude) and Block Injection logic.
*   **Feat**: Implemented `arsenal login` command (Stub) with TUI Spinner.
*   **Feat**: Initialized Go Module with Cobra, Viper, Afero, Sprig, Bubbletea.

### Documentation
*   **Docs**: Established Universal Agent Protocol v8 (Project Intelligence).
*   **Docs**: Created `PROJECT.md` and initial planning documents.
*   **Docs**: Added `ARCHITECTURE.md`, `CLI_REFERENCE.md`, `USER_GUIDE.md`.

### Web Interface
*   **Feat**: Complete React/Vite/Tailwind UI (Dashboard, Editor, Marketplace).
*   **Infra**: Migrated from Mock Local Storage to Production **Neon Postgres** Database.
*   **Backend**: Implemented **Vercel Serverless Functions** (TypeScript) for API.
*   **Feat**: Real-time CRUD operations via `/api/prompts`.
