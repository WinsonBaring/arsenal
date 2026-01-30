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
- [ ] **Auth**: [Issue #2] Implement `arsenal login` (Device Flow + Token Storage).
- [ ] **Logic**: [Issue #2] Implement `arsenal pull` with **Adapter Strategy**.
    - [ ] `Adapter` Interface.
    - [ ] `CursorAdapter` implementation.
    - [ ] `WindsurfAdapter` implementation.
- [ ] **UI**: Build Interactive TUI (spinners, checklists).

## Phase 4: Web Interface Implementation
- [ ] **Dashboard**: Build "My Library" view.
- [ ] **Editor**: Build Markdown Editor with Frontmatter support.
- [ ] **Marketplace**: Build "Public Prompts" view.

## Phase 5: Documentation & Polish
- [x] Draft `README.md` (Landing Page).
- [ ] Document the "Marketplace" vs "Local" workflow.
- [ ] Verify README for "Portfolio appeal".
