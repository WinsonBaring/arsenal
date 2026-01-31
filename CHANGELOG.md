# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### CLI
*   **Feat**: Implemented `arsenal pull` command with Smart Agent Detection (Antigravity, Cursor, Claude) and Block Injection logic.
*   **Fix**: Resolved Agent Detection failure in nested directories (Updated `Antigravity`, `Windsurf`, `Cursor` adapters).
*   **Feat**: Implemented `arsenal login` command (Stub) with TUI Spinner.
*   **Feat**: Initialized Go Module with Cobra, Viper, Afero, Sprig, Bubbletea.

### Infrastructure
*   **Fix**: Resolved Database Connection issues (Neon). Corrected `DATABASE_URL` propagation in Vercel.
*   **Fix**: Standardized Dev Environment ports (Vite: 5173, Vercel/API: 3000).
*   **Fix**: Removed conflicting debug logging from API routes.

### Documentation
*   **Docs**: Established Universal Agent Protocol v8 (Project Intelligence).
*   **Docs**: Created `PROJECT.md` and initial planning documents.
*   **Docs**: Added `ARCHITECTURE.md`, `CLI_REFERENCE.md`, `USER_GUIDE.md`.

### Web Interface
*   **Feat**: Complete React/Vite/Tailwind UI (Dashboard, Editor, Marketplace).
*   **Infra**: Migrated from Mock Local Storage to Production **Neon Postgres** Database.
*   **Backend**: Implemented **Vercel Serverless Functions** (TypeScript) for API.
*   **Feat**: Real-time CRUD operations via `/api/prompts`.
