# Findings

## Project Requirements (Updated 2026-01-31)
*   **Architecture**: Monorepo (Go CLI + Vite Web).
*   **CLI Stack**: Cobra, Viper, Bubbletea, **Afero** (FS), **Sprig** (Templates).

### Strategic Decisions (CLI)
*   **Auth**: **Stub Implementation**. We will simulate the Device Flow UX but store a dummy token. Real auth requires the backend (Phase 6).
*   **API**: **Mock Client**. We will build a `Client` interface but use a `MockProvider` that returns hardcoded JSON. This allows us to perfect the "Injection Engine" immediately.
*   **Agent Path Resolution**:
    *   **Antigravity**: `.agent/rules/*.md`
    *   **Claude Code**: `.claude/rules/*.md`
    *   **Cursor**: `.cursorrules` (Block Injection)

### CLI Configuration
*   **Global**: `~/.arsenal/config.yaml` (Auth token).
*   **Local**: `arsenal.json` (Project-specific selections).
