package cmd

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/spf13/afero"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"github.com/winsonbaring/arsenal/cli/internal/engine"
	"github.com/winsonbaring/arsenal/cli/internal/tui"
	"github.com/winsonbaring/arsenal/cli/pkg/api"
)

// ProjectConfig represents arsenal.json
type ProjectConfig struct {
	RemoteSets []string `json:"remote_sets"`
	Selected   []string `json:"selected_prompts"`
}

var pullCmd = &cobra.Command{
	Use:   "pull",
	Short: "Fetch and inject prompts into your project",
	Run: func(cmd *cobra.Command, args []string) {
		cwd, _ := os.Getwd()
		appFs := afero.NewOsFs()

		// 1. Detect Agent
		detector := engine.NewDetector(appFs)
		agent := detector.Detect(cwd)
		fmt.Printf("🔍 Detected Agent: %s\n", agent)

		// 2. Fetch Prompts (Mock)
		client := &api.MockClient{}
		token := viper.GetString("auth_token")
		if token == "" {
			fmt.Println("❌ Not authenticated. Run 'arsenal login' first.")
			return
		}
		
		fmt.Println("☁️  Fetching prompts...")
		promptSet, _ := client.FetchUserPrompts(token)

		// 3. Load Local Config (arsenal.json)
		configPath := filepath.Join(cwd, "arsenal.json")
		var preselected []string
		if exists, _ := afero.Exists(appFs, configPath); exists {
			data, _ := afero.ReadFile(appFs, configPath)
			var cfg ProjectConfig
			json.Unmarshal(data, &cfg)
			preselected = cfg.Selected
		}

		// 4. Interactive Selection (TUI)
		selectedPrompts, err := tui.SelectPrompts(promptSet.Prompts, preselected)
		if err != nil {
			fmt.Println("❌", err)
			return
		}

		if len(selectedPrompts) == 0 {
			fmt.Println("⚠️  No prompts selected. Nothing to do.")
			return
		}

		// 5. Inject (Effect)
		targetPath := detector.GetRulesPath(cwd, agent)
		fmt.Printf("🎯 Target Path: %s\n", targetPath)
		
		injector := engine.NewInjector(appFs)
		err = injector.Inject(targetPath, selectedPrompts)
		if err != nil {
			fmt.Printf("❌ Error injecting prompts: %v\n", err)
			return
		}

		// 6. Save Config (Persistence)
		var newSelectedIDs []string
		for _, p := range selectedPrompts {
			newSelectedIDs = append(newSelectedIDs, p.ID)
		}
		newConfig := ProjectConfig{
			Selected: newSelectedIDs,
		}
		data, _ := json.MarshalIndent(newConfig, "", "  ")
		afero.WriteFile(appFs, configPath, data, 0644)

		fmt.Println("\n✅ Successfully wrote prompts to disk.")
		fmt.Println("💾 Saved selection to arsenal.json")
	},
}

func init() {
	rootCmd.AddCommand(pullCmd)
}
