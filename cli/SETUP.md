# Arsenal CLI Setup Guide

## Prerequisites
- Node.js >= 16
- npm

## Installation
The CLI is part of the Arsenal monorepo.

1. Navigate to the CLI directory:
   ```bash
   cd cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Link the binary locally:
   ```bash
   npm link
   ```
   This exposes the `arsenal` command globally on your system.

## Usage
Run the CLI using:
```bash
arsenal [command]
```

Available commands:
- `login`: Authenticate with your Personal Access Token.
- `pull`: Fetch and inject prompts.
- `list`: Show prompt injection status.
- `clean`: Remove injected prompts.

## Development
- Watch mode: `npm run dev`
- Tests: `npm test`
