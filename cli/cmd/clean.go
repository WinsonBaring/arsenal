package cmd

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/spf13/afero"
	"github.com/spf13/cobra"
	"github.com/winsonbaring/arsenal/cli/internal/engine"
	"github.com/winsonbaring/arsenal/cli/pkg/config"
)

var cleanCmd = &cobra.Command{
	Use:   "clean",
	Short: "Remove injected prompts from your project",
	Run: func(cmd *cobra.Command, args []string) {
		cwd, _ := os.Getwd()
		appFs := afero.NewOsFs()

		// 1. Detect Agent (Adapter Strategy)
		adapter := engine.GetPrioritizedAdapter(appFs, cwd)
		fmt.Printf("🔍 Detected Agent: %s\n", adapter.Name())

		// 2. Clean
		fmt.Println("🧹 Cleaning up injected prompts...")
		err := adapter.Clean(cwd)
		if err != nil {
			fmt.Printf("❌ Error cleaning up: %v\n", err)
			return
		}

		// 3. Reset Config (Optional? Yes, we should clear selection)
		configPath := filepath.Join(cwd, "arsenal.json")
		if exists, _ := afero.Exists(appFs, configPath); exists {
			fmt.Println("🔄 Resetting arsenal.json selection...")
			data, _ := afero.ReadFile(appFs, configPath)
			var cfg config.ProjectConfig
			json.Unmarshal(data, &cfg)
			
			// Clear selection but keep remote_sets if any (future proof)
			cfg.Selected = []string{}
			
			newData, _ := json.MarshalIndent(cfg, "", "  ")
			afero.WriteFile(appFs, configPath, newData, 0644)
		}

		fmt.Println("✅ Clean complete.")
	},
}

func init() {
	rootCmd.AddCommand(cleanCmd)
}
