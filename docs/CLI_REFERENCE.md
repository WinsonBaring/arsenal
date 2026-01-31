# CLI Reference Manual

This document details the commands available in the **Arsenal CLI**.

## Global Flags
*   `--config`: Config file (default is `$HOME/.arsenal.yaml`)
*   `--help`: Help for any command.

---

## 1. Authentication
### `arsenal login`
Authenticates the CLI with your Arsenal account.
*   **Behavior**: Opens a browser window for OAuth flow or accepts a Personal Access Token (PAT).
*   **Storage**: Saves the session token securely to your local configuration.

---

## 2. Core Workflow
### `arsenal pull`
Downloads the selected prompts from your library and injects them into your project's AI configuration.

**How it works:**
1.  **Detection**: Scans the current directory to identify the active AI agent (Cursor, Windsurf, or Antigravity).
2.  **Selection**: Presents an interactive TUI to choose which prompt sets to install.
3.  **Injector**: Writes the prompts into the agent's specific rules file (e.g., `.cursorrules`) wrapped in a "Managed Block".

**Example Output:**
```text
$ arsenal pull
🔍 Detected Agent: Cursor
☁️  Fetching prompts...
? Select Configuration Set: ›
  [x] React Guidelines
  [ ] Python Scripts

💉 Injecting prompts...
✅ Successfully wrote prompts to disk.
```

### `arsenal clean`
Removes all Arsenal-injected prompts from the current project.

*   **Behavior**: Finds the "Managed Block" in your agent's rule file and deletes it, leaving your custom rules touched.
*   **Use Case**: Run this when switching projects or if you want to "eject" from Arsenal management.

---

## 3. Configuration
### `arsenal list`
Displays the list of prompts currently configured for this project (read from `arsenal.json`).

```text
$ arsenal list
📋 Current Project Prompts:
   ✅ React Guidelines
   ✅ TypeScript Best Practices
```
