# Project Context: Arsenal

## 📖 Overview
**Arsenal** is a personal prompt storage and management system designed to treat "Prompts as Code". It allows developers to manage, version, and inject prompts into their AI agents (Cursor, Windsurf, Antigravity) via a unified toolchain.

## 🛠️ Tech Stack & Patterns

### 1. The CLI (Developer Experience)
*   **Language**: TypeScript (Node.js)
*   **Framework**: [Ink](https://github.com/vadimdemedes/ink) (React for CLIs)
*   **Key Libraries**: `zod` (Validation), `conf` (Config), `meow` (Args), `ink-text-input`, `ink-spinner`
*   **Role**: Fetches prompts from the API and injects them into the developer's workspace (e.g., `.cursorrules`).

### 2. The Web App (`/web`)
*   **Framework**: React, Vite
*   **Styling**: Tailwind CSS v4, Shadcn UI
*   **State**: React Query (likely)
*   **Database/Storage**: Neon Postgres (Primary)

## 📂 Key Directory Structure
*   `/cli`: TypeScript/Ink CLI application source
*   `/web`: Web application source
*   `/docs`: Documentation
*   `planning-with-files/`: Project intelligence and planning documents

## ⚡ Development Protocols
*   **Build CLI**: `cd cli && npm run build`
*   **Build Web**: `cd web && npm run build`
*   **Dev Web**: `cd web && npm run dev`

## 🧠 High-Level Status (Auto-Updated)
*   **Current Phase**: Phase 5: Documentation & Polish
*   **Latest Milestone**: Completed Web Interface (Phase 4).
*   **Known Critical Issues**:
    *   None currently.
