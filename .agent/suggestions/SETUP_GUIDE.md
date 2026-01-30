# Universal Agent Protocol: Setup Guide

To use the **Universal Agent Protocol v6** (with Automatic GitHub Management), you must configure your environment first.

## 1. Prerequisites 🛠️

### A. GitHub MCP Server (Crucial) 🐙
The Agent needs permission to create/read Issues and PRs on your behalf.
*   **Requirement**: A GitHub Personal Access Token (PAT).
*   **Permissions Needed**: `repo` (Full control of private repositories).
*   **Config**: Add to your MCP configuration file (e.g., `claude_desktop_config.json` or `mcp_config.json`):
    ```json
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_pat_here"
      }
    }
    ```

### B. Context7 MCP Server (Research) 🧠
The Agent needs access to up-to-date documentation.
*   **Requirement**: Context7 API Key.
*   **Config**:
    ```json
    "context7": {
      "command": "npx",
      "args": ["-y", "context7-mcp"],
      "env": {
        "CONTEXT7_API_KEY": "your_key_here"
      }
    }
    ```

## 2. Directory Setup 📂
Ensure your project has the following "Brain" structure:
```text
.agent/
├── workflows/
│   └── process-flow.md   <-- Copy content from refined_workflow_general_v6.md here
├── skills/
│   └── planning-with-files/
```

## 3. First Run 🚀
1.  **Initialize**: Tell the agent "Initialize Project Intelligence".
2.  **Verify**: It should create `PROJECT.md` and `planning-with-files/`.
3.  **Test**: Ask "Create a feature for Dark Mode".
    *   *Success*: The Agent should say "I have created GitHub Issue #1 for Dark Mode. Starting planning..."

---
**Note**: Without the GitHub MCP server configured, the Agent will fall back to "Manual Mode" (asking you to create issues).
