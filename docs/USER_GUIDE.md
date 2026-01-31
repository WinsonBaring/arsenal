# User Guide: Web Interface

Welcome to the **Arsenal Web Hub**. This portal allows you to build, manage, and discover prompts for your AI engineering workflows.

## 1. The Dashboard ("My Library")
Your personal command center. Here you can see all the prompts you have authored or installed.

*   **View Details**: Click on any prompt card to view its content and metadata.
*   **Version History**: See the current version (e.g., `v1.2.0`) and last updated date.
*   **Search**: Filter your library by tags or name (Coming Soon).

## 2. The Editor
A powerful Markdown-based editor designed for "Prompt Engineering".

### Features:
*   **Dual Mode**: Switch between **Write** (Source) and **Preview** (Rendered) modes.
*   **Frontmatter Support**: Manage metadata like `name`, `category`, and `version` directly in the YAML header.
*   **Live Preview**: See exactly how your prompt will look when rendered by an LLM-aware tool.

### Creating a New Prompt:
1.  Click **"New Prompt"** on the Dashboard.
2.  Edit the YAML frontmatter to set the Name and Category.
3.  Write your instructions in the body.
4.  Click **Save**.

## 3. The Marketplace
Browse high-quality prompts created by the community.

*   **Installation**: Click the **"Install"** button to copy a prompt into your personal library.
*   **Modification**: Once installed, you own the copy. You can tweak it to fit your specific needs without affecting the original.

## 4. Connecting to CLI
Once you have organized your library in the Web Hub, switch to your terminal:

1.  Navigate to your coding project.
2.  Run `arsenal pull`.
3.  Select the prompts you created in the Web Hub.
4.  Enjoy your supercharged AI agent!
