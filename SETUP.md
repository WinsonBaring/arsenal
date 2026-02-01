# Arsenal Project Setup Guide

## Overview
Arsenal is a monorepo containing a Web application and a CLI tool.

## Prerequisites
- Node.js >= 16
- Go (for legacy support, if applicable)
- npm

## Quick Start

### 1. Web App
Located in `/web`.
```bash
cd web
npm install
npm run dev
```

### 2. CLI
Located in `/cli`.
```bash
cd cli
npm install
npm run build
npm link
```

## Documentation
- [CLI README](cli/README.md)
- [Web README](web/README.md)
- [Project Context](PROJECT.md)
