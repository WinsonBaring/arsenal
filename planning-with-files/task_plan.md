# Task Plan: Arsenal (Monorepo)

**Goal**: Build the "Arsenal" Monorepo (Go CLI + Vite Web) and create a portfolio-ready README.

## Phase 1: Context & Planning
- [x] Research prompt management tool features.
- [x] Initialize planning files.
- [x] Clarify requirements (CLI=Go, Web=Vite, Monorepo).
- [x] **Portfolio Ideation**: Defining the "Showcase" strategy.

## Phase 2: Project Structure Setup (Partially Complete)
- [x] Create directory structure (`cli/`, `web/`, `docs/`).
- [ ] Initialize `go.mod` for CLI in `/cli` (`github.com/winsonbaring/arsenal/cli`).
- [x] Initialize Vite project for Web (React + TS).
- [x] Install Tailwind CSS v4 for Web.
- [x] Commit scaffolding.

## Phase 3: [Issue #1] CLI Implementation (Go)
**Stack**: Cobra, Viper, Bubbletea.
- [x] **Setup**: Install dependencies (`cobra`, `viper`, `bubbletea`).
- [x] **Auth**: [Issue #2] Implement `arsenal login` (Device Flow + Token Storage).
- [x] **Logic**: [Issue #2] Implement `arsenal pull` with **Adapter Strategy**.
    - [x] `Adapter` Interface.
    - [x] `CursorAdapter` implementation.
    - [x] `WindsurfAdapter` implementation.
- [x] **UI**: [Issue #3] Build Interactive TUI (spinners, checklists).
- [x] **Persistance**: [Issue #3] Save local config to `arsenal.json`.
- [x] **Maintenance**: [Issue #3.5] Implement `arsenal clean` command.

## Phase 4: [Issue #4] Web Interface Implementation
- [x] **Setup**: Verify Vite + Tailwind v4 + Shadcn setup.
- [x] **Dashboard**: Build "My Library" view.
- [x] **Editor**: Build Markdown Editor with Frontmatter support.
- [x] **Marketplace**: Build "Public Prompts" view.

## Phase 5: Documentation & Polish
- [x] Draft `README.md` (Landing Page).
- [ ] Document the "Marketplace" vs "Local" workflow.
- [ ] Verify README for "Portfolio appeal".
