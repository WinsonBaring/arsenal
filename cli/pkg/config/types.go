package config

// ProjectConfig represents the local .arsenal.json file content
type ProjectConfig struct {
	RemoteSets []string `json:"remote_sets"`
	Selected   []string `json:"selected_prompts"`
}
