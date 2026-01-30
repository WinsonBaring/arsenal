package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/afero"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"github.com/winsonbaring/arsenal/cli/internal/engine"
	"github.com/winsonbaring/arsenal/cli/pkg/api"
)

var pullCmd = &cobra.Command{
	Use:   "pull",
	Short: "Fetch and inject prompts into your project",
	Run: func(cmd *cobra.Command, args []string) {
		cwd, _ := os.Getwd()
		appFs := afero.NewOsFs() // Use Real FS (or Swap for Test)

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

		// 3. Dry Run / Logic
		targetPath := detector.GetRulesPath(cwd, agent)
		fmt.Printf("🎯 Target Path: %s\n", targetPath)

		for _, p := range promptSet.Prompts {
			fmt.Printf("   - Queued: %s (%s)\n", p.Name, p.ID)
		}

		// 4. Inject (Effect)
		injector := engine.NewInjector(appFs)
		err := injector.Inject(targetPath, promptSet.Prompts)
		if err != nil {
			fmt.Printf("❌ Error injecting prompts: %v\n", err)
			return
		}

		fmt.Println("\n✅ Successfully wrote prompts to disk.")
		if agent == engine.AgentUnknown {
			fmt.Println("   (Note: No Agent detected, saved to default markdown file)")
		}
	},
}

func init() {
	rootCmd.AddCommand(pullCmd)
}
