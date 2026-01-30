package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "arsenal",
	Short: "Managing Prompts as Code",
	Long: `Arsenal is a CLI tool that bridges your Web Marketplace of prompts
with your local development environment.`,
}

// Execute adds all child commands to the root command and sets flags appropriately.
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)
}

func initConfig() {
	home, err := os.UserHomeDir()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	// Search config in home directory with name ".arsenal" (without extension).
	viper.AddConfigPath(home)
	viper.SetConfigType("yaml")
	viper.SetConfigName(".arsenal")

	// If a config file is found, read it in.
	if err := viper.ReadInConfig(); err == nil {
		// Config loaded
	} else {
		// Create it if missing (simplified for Stub)
		os.Create(home + "/.arsenal.yaml")
	}
}
