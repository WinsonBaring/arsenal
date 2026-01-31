package cmd

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/spf13/afero"
	"github.com/spf13/cobra"
	"github.com/winsonbaring/arsenal/cli/pkg/config"
)

var listCmd = &cobra.Command{
	Use:   "list",
	Short: "List currently selected prompts from arsenal.json",
	Run: func(cmd *cobra.Command, args []string) {
		cwd, _ := os.Getwd()
		appFs := afero.NewOsFs()
		configPath := filepath.Join(cwd, "arsenal.json")

		if exists, _ := afero.Exists(appFs, configPath); !exists {
			fmt.Println("❌ No arsenal.json found. Run 'arsenal pull' first.")
			return
		}

		data, _ := afero.ReadFile(appFs, configPath)
		var cfg config.ProjectConfig
		if err := json.Unmarshal(data, &cfg); err != nil {
			fmt.Println("❌ Error reading arsenal.json:", err)
			return
		}

		fmt.Println("📋 Current Project Prompts:")
		if len(cfg.Selected) == 0 {
			fmt.Println("   (No prompts selected)")
			return
		}

		for _, id := range cfg.Selected {
			fmt.Printf("   ✅ %s\n", id)
		}
	},
}

func init() {
	rootCmd.AddCommand(listCmd)
}
