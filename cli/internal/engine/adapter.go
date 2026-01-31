package engine

import "github.com/winsonbaring/arsenal/cli/pkg/api"

type AgentAdapter interface {
	// Name returns the display name of the agent (e.g. "Cursor", "Antigravity")
	Name() string
	
	// Detect returns true if this agent is active in the given directory
	Detect(cwd string) bool
	
	// Inject writes the prompts to the agent's specific configuration file(s)
	Inject(cwd string, prompts []api.Prompt) error

	// Clean removes any injected prompts
	Clean(cwd string) error
}
