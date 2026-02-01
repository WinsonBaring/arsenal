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

## Phase 3: [Issue #5] CLI Implementation (React/Ink)
**Stack**: React, Ink, TypeScript.
- [ ] **Setup**: Initialize Ink project in `/cli`.
- [ ] **Auth**: Port `login` command.
- [ ] **Logic**: Port `pull` command with Adapter Strategy.
- [ ] **UI**: Port Interactive TUI (spinners, checklists).
- [ ] **Persistance**: Port local config to `arsenal.json`.
- [ ] **Maintenance**: Port `clean` command.
- [ ] **Commands**: Port `list` command.

## Phase 4: [Issue #4] Web Interface Implementation
- [x] **Setup**: Verify Vite + Tailwind v4 + Shadcn setup.
- [x] **Dashboard**: Build "My Library" view.
- [x] **Editor**: Build Markdown Editor with Frontmatter support.
- [x] **Marketplace**: Build "Public Prompts" view.

## Phase 4.5: Integration & Infrastructure [Completed]
- [x] **Database**: Connect Web App to Neon Postgres (Production).
- [x] **API**: Connect CLI `pull` command to real `/api/prompts` endpoint.
- [x] **DevOps**: Fix Vercel/Vite port conflicts and Environment Variable loading.
- [x] **Robustness**: Ensure CLI detects Agents from nested subdirectories.

## Phase 5: Documentation & Polish
- [x] Draft `README.md` (Landing Page).
- [ ] Document the "Marketplace" vs "Local" workflow.
- [ ] Verify README for "Portfolio appeal".
