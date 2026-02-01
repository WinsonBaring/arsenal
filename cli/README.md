# Arsenal CLI

The command-line interface for Arsenal, built with TypeScript, React, and [Ink](https://github.com/vadimdemedes/ink).

## Quick Start (Zero-Install)

Run Arsenal instantly without installing it globally:

```bash
npx arsenal <command>
```

## Installation (Optional)

If you use Arsenal frequently, you can install it globally:

```bash
npm install -g arsenal
```

## Usage

```bash
$ npx arsenal [command]
```

### Commands

#### `login`
Interactively authenticates using your Personal Access Token.

```bash
$ npx arsenal login
```

#### `pull`
Fetches available prompts and guides you through the Agent Wizard to select your target agent (e.g. Cursor, Windsurf) and inject rules.

```bash
$ npx arsenal pull
```
*Note: Follow the wizard to select your agent and prompts.*

#### `list`
Checks the current status of injected prompts in your configuration file.

```bash
$ npx arsenal list
```

#### `add`
Install a skill directly from a GitHub repository URL.

```bash
$ npx arsenal add <repo-url> --skill <path/to/skill>
```
*Example:*
```bash
$ npx arsenal add https://github.com/winsonbaring/arsenal --skill skills/react-expert
```

#### `clean`
Removes any Arsenal-injected prompt blocks from your configuration file.

```bash
$ npx arsenal clean
```

## Development

```bash
# Install dependencies
$ npm install

# Run locally
$ npm run dev -- [command]

# Build
$ npm run build
```

