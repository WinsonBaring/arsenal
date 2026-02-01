# Arsenal CLI

The command-line interface for Arsenal, built with TypeScript, React, and [Ink](https://github.com/vadimdemedes/ink).

## Installation

```bash
# Link locally
$ npm link
```

## Usage

```bash
$ arsenal [command]
```

### Commands

#### `login`
Interactively authenticates using your Personal Access Token.

```bash
$ arsenal login
```

#### `pull`
Fetches available prompts from your Arsenal library and lets you select which ones to inject into your project config (e.g., `.cursorrules`).

```bash
$ arsenal pull
```
*Note: Use Space to toggle selection, Enter to confirm.*

#### `list`
Checks the current status of injected prompts in your configuration file.

```bash
$ arsenal list
```

#### `clean`
Removes any Arsenal-injected prompt blocks from your configuration file.

```bash
$ arsenal clean
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
