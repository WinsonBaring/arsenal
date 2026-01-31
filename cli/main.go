package main

import (

	"github.com/joho/godotenv"
	"github.com/winsonbaring/arsenal/cli/cmd"
)

func main() {
	// Load .env file if it exists
	if err := godotenv.Load(); err != nil {
		// It's okay if .env doesn't exist (e.g. in prod), but locally it's useful.
		// We could log it or ignore. For now, we'll just ignore or log verbose.
	}

	cmd.Execute()
}
