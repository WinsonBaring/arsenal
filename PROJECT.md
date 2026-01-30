# Project Context: Arsenal

## 📖 Overview
**Arsenal** is a personal prompt storage and management system designed to treat "Prompts as Code". It allows developers to manage, version, and inject prompts into their AI agents (Cursor, Windsurf, Antigravity) via a unified toolchain.

## 🛠️ Tech Stack & Patterns
> **Auto-Update Trigger**: Update this when architecture changes.
*   **Core**: Monorepo
*   **CLI (`/cli`)**: Go, Cobra, Viper, Bubbletea, **Afero** (FS), **Sprig** (Templates), **Lipgloss** (Styles)
*   **Web (`/web`)**: TypeScript, React, Vite, Tailwind CSS v4, Shadcn UI
*   **Database/Storage**: Markdown Files (Frontmatter), Git-based Versioning
*   **Distribution**: `npx` wrapper for Go binaries

## 📂 Key Directory Structure
*   `/cli`: Go CLI application source
*   `/web`: Web application source
*   `/docs`: Documentation
*   `planning-with-files/`: Project intelligence and planning documents

## ⚡ Development Protocols
*   **Build CLI**: `cd cli && go build`
*   **Build Web**: `cd web && npm run build`
*   **Dev Web**: `cd web && npm run dev`

## 🧠 High-Level Status (Auto-Updated)
*   **Current Phase**: Phase 3: CLI Implementation (Polish)
*   **Latest Milestone**: Implemented Auth Stub and Smart Pull Logic (Injection).
*   **Known Critical Issues**:
    *   None currently.
