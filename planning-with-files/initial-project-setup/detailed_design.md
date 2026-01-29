# Detailed Design & Ideation 🧠

## 1. Data Schema: The "Prompt as Code" Model
To make prompts "production ready" and versionable, we should define a strict Markdown schema.

**File Structure: `prompts/category/prompt-name.md`**

```markdown
---
title: "Senior React Engineer"
version: 1.2.0
author: "winsonbaring"
tags: ["coding", "react", "frontend"]
models: 
  - "claude-3-5-sonnet"
  - "gpt-4o"
params:
  temperature: 0.7
  stop_sequences: []
inputs:
  - name: "framework"
    description: "The framework to use (e.g., Next.js)"
    default: "Next.js"
---

# System Prompt
You are a Senior React Engineer specializing in {{framework}}.
...

# User Prompt
Please refactor the following component...
```

**Why this works:**
*   **Frontmatter**: Parsable by both the Web UI (for filtering/search) and the CLI (for configuring agents).
*   **Version**: Explicit versioning in the file.
*   **Inputs**: Allows the Web UI to generate a dynamic form for testing.

## 2. CLI Experience: The "Magic" Workflow
The goal is zero-friction.

**Step 1: Installation & Auth**
`npx arsenal login`
*   Opens browser to `arsenal.app/auth/cli?code=...`
*   User approves.
*   CLI saves JWT in `~/.arsenal/config.json`.

**Step 2: Pulling Configuration**
`arsenal pull`
*   **Interactive Menu**:
    ```text
    ? Which profile to sync?
    > [Personal Ops] (Selected)
      [Freelance]
    
    ? Target Environment?
    > [VS Code / Cursor] (.cursorrules)
      [Windsurf] (.windsurfrules)
      [Claude Desktop] (claude_desktop_config.json)
      [Raw Markdown] (./prompts)
    ```
*   **Action**:
    *   If `Cursor` is selected: It reads your `.md` prompts and compiles them into a single `.cursorrules` file or specific `.cursor/rules` files.
    *   If `Windsurf` is selected: Generates `.windsurfrules`.
    *   If `Antigravity` is selected: Updates `.agent/skills/...`.

## 3. Web Interface: The "Marketplace"
**Pages:**
1.  **The Hub (Dashboard)**:
    *   "Trending Prompts" (from the community/public).
    *   "My Library" (your private git-backed repo).
2.  **The Editor**:
    *   Split pane: Editor (Markdown) | Preview (Compiled Prompt).
    *   "Test Run" button: Execute against OpenAI/Anthropic keys.
3.  **Collections (Configs)**:
    *   Group prompts into "Sets" (e.g., "Frontend Dev Set", "DevOps Set").
    *   These "Sets" are what appear in the CLI `arsenal pull` menu.

## 4. Portfolio Presentation Strategy
To showcase this effectively:

**A. The "Hero" GIF**
*   Create a split-screen video.
*   **Left Side (Web)**: You editing a prompt called "Bug Smashing Expert" and hitting "Save (v2)".
*   **Right Side (Terminal)**: You typing `arsenal pull`, selecting "Cursor", and then opening VS Code to show the new "Bug Smashing Expert" rule is *immediately* available.
*   **Caption**: "From Ideation to IDE in 10 seconds."

**B. The Documentation Site**
*   Host the docs on the same domain as the web app (e.g., `arsenal.app/docs`).
*   Use the same design language.
*   Include a "Live Demo" section (read-only access to a sample library).

## 5. Deployment & Tech Stack Details
*   **CLI**: Go + Cobra (library for CLI commands) + Bubbletea (for TUI/pretty menus).
*   **Web**: React + Vite + Tailwind v4 + ShadcnUI (for premium feel).
*   **Backend**: 
    *   Option A: Supabase (Auth + DB) + RLS (Security).
    *   Option B: Local-first? If it's a "Git" workflow, maybe the Web App actually commits to a GitHub repo on your behalf?
    *   *Recommendation*: Start with Supabase for user mgmt/metadata, but treat the "content" as sync-able text.

**Question**: For the CLI "Target Environment" support (Cursor vs Windsurf), do you want to hardcode these integration or make them plugin-based?
