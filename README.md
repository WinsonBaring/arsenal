# Arsenal 🛡️

> **The Definitive Prompt Management System for AI Engineers.**
> *Manage, Version, and Deploy Production-Ready Prompts across any Agent.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Go Version](https://img.shields.io/github/go-mod/go-version/winsonbaring/arsenal)](https://golang.org/doc/devel/release.html)
[![Vite](https://img.shields.io/badge/Frontend-Vite-646CFF?logo=vite)](https://vitejs.dev/)

**Arsenal** is a full-stack monorepo tool designed to bridge the gap between prompt ideation and development. It combines a **Marketplace-style Web Interface** for managing prompt versions with a powerful **Go-based CLI** for pulling configurations directly into your workflow.

---

## 🌟 Features

### 💻 CLI Tool (`/cli`)
*   **Instant Setup**: `npx arsenal` handles installation and secure authentication.
*   **One-Command Sync**: Run `arsenal pull` to fetch your latest configurations.
*   **Smart Agent Detection**: Automatically detects if you are using Cursor, Windsurf, or Antigravity and configures the environment accordingly.
*   **Scoped Configuration**: Install prompts at the **Project** level (local `.arsenal`) or **User** level (global).
*   **Full Lifecycle**: Use `arsenal clean` to remove injected prompts when done.

### 🌐 Web Interface (`/web`)
*   **Prompt Marketplace**: Browse, organize, and manage your personal prompt library.
*   **Git-like Versioning**: Every edit to a prompt creates a new version, ensuring stability for production apps.
*   **Markdown Storage**: All prompts are stored as `.md` files for maximum portability.
*   **Visual Diffing**: (Coming Soon) Compare prompt versions side-by-side.

---

## 🚀 Getting Started

### 1. The Web Experience (Manager)
Start by organizing your prompts in the Arsenal Web Hub.
*(Link to deployed web app would go here)*

### 2. The CLI Experience (Developer)

The CLI is now built with **React & Ink**, allowing for a rich TUI experience using web technologies.

#### Prerequisites
- Node.js 16+

#### Installation & Usage

```bash
# 1. Enter the CLI directory
cd cli

# 2. Install dependencies & Build
npm install
npm run build

# 3. Link globally (Optional but recommended)
npm link

# 4. Use the CLI
arsenal login
arsenal pull
arsenal list
```

**Interactive Demo:**
*(Place an asciinema or GIF recording here of the 'arsenal pull' command)*

```text
? Select Configuration Set: ›
  [x] Production Prompts
  [ ] Experimental
  [x] Debugging Tools

🔍 Detected Agent: Cursor
💉 Injecting prompts into .cursorrules...
✅ Successfully wrote prompts to disk.
```

---

## 🏗️ Architecture

Arsenal is built as a **Monorepo** to ensure tight integration between the management layer and the consumption layer.

```mermaid
graph TD
    User[Developer]
    Web[Web Interface (Vite)]
    CLI[CLI Tool (Go)]
    Repo[Prompt Vault (Markdown)]

    User -->|Creates/Edits| Web
    Web -->|Saves Versions| Repo
    User -->|Runs 'arsenal pull'| CLI
    CLI -->|Fetches Config| Repo
    CLI -->|Configures| IDE[Agent/IDE (Cursor, etc.)]
```

*   **CLI**: Built with **Go** for cross-platform performance (Linux, Mac, Windows).
*   **Frontend**: Built with **Vite** for a fast, responsive graphical management interface.

---

## 🗺️ Roadmap

- [ ] **Test Playground**: An environment in the Web App to run prompts against APIs (OpenAI, Anthropic) and compare outputs.
- [ ] **Team Sharing**: Share prompt configurations with your team organizations.
- [ ] **Analytics**: Track token usage and performance metrics for specific prompt versions.

---

## 👨‍💻 Author

Built by **Winson Baring**.
*Check out the [Web Interface](#) or the [CLI Source Code](/cli).*
