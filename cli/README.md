# Arsenal CLI

The **Arsenal CLI** is your bridge between the Web Marketplace and your local development environment. It allows you to fetch, select, and inject prompt rules directly into your IDE configurations (Cursor, Windsurf, or generic Markdown).

## 🚀 Installation

```bash
# Clone the repo
git clone https://github.com/WinsonBaring/arsenal.git
cd arsenal/cli

# Build the binary
go build -o arsenal main.go

# (Optional) Move to your path
mv arsenal /usr/local/bin/
```

## 📚 Usage

### 1. Authenticate
Log in to your Arsenal account (Stubbed for now).
```bash
arsenal login
```
*   This will launch an interactive spinner.
*   It saves an auth token to `~/.arsenal.yaml`.

### 2. Pull Prompts
Fetch prompts from your library and inject them into your project.
```bash
arsenal pull
```
*   **Automatic Detection**: The CLI detects if you are in a **Cursor** project (`.cursorrules`), **Antigravity** project (`.agent/`), or **Claude** project (`.claude/`).
*   **Interactive TUI**: A checklist appears allowing you to select which prompts to inject.
*   **Safety**: Uses **Block Injection** (`# BEGIN ARSENAL ... # END ARSENAL`) to ensure it never overwrites your manual rules.
*   **Persistence**: Saves your selections to `arsenal.json` in the project root, so next time you run `pull`, your preferences are remembered.

### 3. List Configuration
See what prompts are currently installed in the project.
```bash
arsenal list
```

### 4. Clean/Reset
Remove all Arsenal-injected prompts from your project files. This is useful when you want to "eject" or simply clean up.
```bash
arsenal clean
```

## 🛠️ Architecture

*   **Language**: Go
*   **Frameworks**: Cobra (Commands), Viper (Config), Bubbletea (TUI).
*   **Injection Strategy**: Afero-based Block Replacement.

## 🤝 Contributing
1.  Run `go run main.go [command]` to test locally.
