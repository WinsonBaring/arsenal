# Implementation Plan - CLI Migration to React (Ink)

## Goal
Replace the deprecated Go-based CLI with a fully functional TypeScript/React CLI using Ink. The new CLI will support `login`, `pull`, `list`, and `clean` commands with feature parity to the original design.

## User Review Required
> [!IMPORTANT]
> **Authentication Method**: I will implement a "Personal Access Token" (PAT) flow first, where the user pastes a token from the web dashboard. Full "Device Flow" (oauth2) requires backend support which might be complex to mock/verify in this session.
>
> **API URL**: I will default to `http://localhost:3000/api` but verify against the deployed URL if available or provide a flag/env var.

## Proposed Changes

### CLI Component (`/cli`)
Architecture: React (Ink) + TypeScript + Zod + Conf.

#### [MODIFY] [cli/source/commands/Login.tsx](file:///Users/winsonbaring/Documents/GitHub/arsenal/cli/source/commands/Login.tsx)
-   Remove mock timeout and token.
-   Implement an interactive form to paste an API Token (using `ink-text-input`).
-   Verify the token by hitting a `/api/me` or similar endpoint (or just saving it first if verification endpoint missing).
-   Save token using `lib/config.ts`.

#### [MODIFY] [cli/source/lib/config.ts](file:///Users/winsonbaring/Documents/GitHub/arsenal/cli/source/lib/config.ts)
-   Ensure `authToken` persistence is working.

#### [MODIFY] [cli/source/lib/api.ts](file:///Users/winsonbaring/Documents/GitHub/arsenal/cli/source/lib/api.ts)
-   Update `fetchPrompts` to read `authToken` from config.
-   Add `Authorization: Bearer <token>` header to requests.
-   Add error handling for 401/403 (prompt to re-login).

#### [MODIFY] [cli/source/commands/Pull.tsx](file:///Users/winsonbaring/Documents/GitHub/arsenal/cli/source/commands/Pull.tsx)
-   Connect to real `fetchPrompts`.
-   Handle network errors gracefully.
-   Ensure `injectPrompts` writes correctly to `.cursorrules` or target file.

#### [MODIFY] [cli/source/commands/List.tsx](file:///Users/winsonbaring/Documents/GitHub/arsenal/cli/source/commands/List.tsx)
-   Parse the `<!-- BEGIN ARSENAL -->` block to list *specific* installed prompts by name.

## Verification Plan

### Automated Tests
-   **Unit Tests**: Run `npm test` in `cli/`.
    -   I will add a test case in `cli/test.tsx` (or new test file) to verify `injectPrompts` logic using a temp file.
    -   Test `config` persistence (mocking `conf`).

### Manual Verification
1.  **Build**: Run `npm run build` in `cli/`.
2.  **Login**: Run `node dist/cli.js login`, paste a mock token, verify it saves.
3.  **Pull**: Run `node dist/cli.js pull`.
    -   Requires `API_URL` to be reachable (I can mock the API response if the real server isn't running, or start the real server).
4.  **List**: Run `node dist/cli.js list` and check output.
5.  **Clean**: Run `node dist/cli.js clean` and verify file is cleaned.
