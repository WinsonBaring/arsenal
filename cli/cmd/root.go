package cmd

import (
	"os"
	"github.com/spf13/cobra"
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "arsenal",
	Short: "Managing Prompts as Code",
	Long: `Arsenal is a CLI tool that bridges your Web Marketplace of prompts
with your local development environment (Cursor, Windsurf, generic Editors).

It allows you to 'pull' prompts directly into your IDE configurations.`,
}

// Execute adds all child commands to the root command and sets flags appropriately.
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}

func init() {
	// Here we will define flags and configuration settings.
}
