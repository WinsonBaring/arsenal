# Clarification Questions (Phase 3: CLI)

We are ready to start Execution, but I need to define the boundaries of "Phase 3" to avoid over-engineering.

## 1. Auth Implementation Scope 🔐
The plan calls for "Device Flow" (`arsenal login`).
*   **Option A (Full)**: I implement the actual polling logic against a (non-existent) backup. This might be blocked by the lack of a backend.
*   **Option B (Stub)**: I implement the *User Interface* (Spinner, "Press Enter to Login") but it just writes a dummy token to `~/.arsenal/config.yaml` for now.
*   **Recommendation**: **Option B**. We can implement the real Auth logic when we build the Web Backend.
*   **Question**: Do you agree with **Option B** (Stub Auth)?
I wanted you to choose the bset option knowing that i would later be using a database for all

## 2. Web API Integration 🌐
The CLI needs to fetch prompts. The Web API doesn't exist yet.
*   **Option A**: I build a `pkg/api` client that tries to hit `localhost:3000`.
*   **Option B**: I build a `pkg/api` interface and a `MockClient` that returns hardcoded JSON prompts for testing the CLI logic.
*   **Recommendation**: **Option B**. This allows us to perfect the CLI's "Injection Logic" (Afero/Block Pattern) without waiting for the Web Team.
*   **Question**: Do you agree with **Option B** (Mock API)?

use mockapi for now, but design the api client in a way that it can be easily replaced with a real api client later.