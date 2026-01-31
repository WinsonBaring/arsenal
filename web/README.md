# Arsenal Web Hub 🛡️

The **Arsenal Web Hub** is the management interface for your Prompt Engineering workflow. Ideally, you run this locally or deploy it to Vercel to manage your personal library of prompts.

## 🌟 Features
*   **My Library**: A dashboard of all your authored prompts.
*   **Editor**: A full-featured Markdown editor with YAML frontmatter support.
*   **Marketplace**: A "Community Hub" simulation where you can install shared prompts.
*   **Mock Persistence**: Uses `localStorage` to save your work, so it persists across reloads (but stays on your machine).

## 🚀 Getting Started

### Prerequisites
*   Node.js 18+
*   npm

### Installation

```bash
cd web
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📖 User Guide

### 1. Dashboard
*   Click **"New Prompt"** to start from scratch.
*   Click any existing prompt card to edit it.

### 2. The Editor
*   **Write Mode**: Edit the YAML header (for metadata) and the Markdown body.
*   **Preview Mode**: See how the prompt renders.
*   **Save**: Persists changes to your browser's local storage.

### 3. Marketplace
*   Browse the list of "community" prompts.
*   Click **Install** to copy them into your personal library.
*   Once installed, you can edit them as if they were your own.

## 🛠️ Tech Stack
*   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Shadcn UI
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Routing**: [React Router v7](https://reactrouter.com/)
