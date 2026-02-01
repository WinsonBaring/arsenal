# Arsenal CLI Setup Guide

## Prerequisites
- Node.js >= 16
- npm

## Usage (Zero-Install)
The recommended way to use Arsenal is via `npx`:

```bash
npx arsenal [command]
```

## Manual Installation
To install globally:

1. Build the project:
   ```bash
   cd cli
   npm install && npm run build
   ```

2. Link or Install:
   ```bash
   npm link
   # OR
   npm install -g .
   ```

## Commands
- `login`: Authenticate with your Personal Access Token.
- `pull`: **(Interactive)** Select your Agent (Cursor, Windsurf, etc.) and fetch prompts.
- `add`: Install remote skills via URL (`npx arsenal add <url> --skill <path>`).
- `list`: Show prompt injection status.
- `clean`: Remove injected prompts.

## Development
- Watch mode: `npm run dev`
- Tests: `npm test`

