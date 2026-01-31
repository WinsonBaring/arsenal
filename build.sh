#!/bin/bash

# Build the CLI
echo "🏗️  Building Arsenal CLI..."
cd cli
go build -o ../bin/arsenal main.go
cd ..

# Check if bin is in path (optional check, strictly for user info)
echo "✅ Build complete. Binary is at ./bin/arsenal"
echo "ℹ️  To run it globally, run: mv ./bin/arsenal /usr/local/bin/"
echo ""

# Run a test command
echo "🧪 Testing 'arsenal --help'..."
./bin/arsenal --help
