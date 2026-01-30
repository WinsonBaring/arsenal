package engine

import (
	"path/filepath"

	"github.com/spf13/afero"
)

// AgentType enum
type AgentType string

const (
	AgentAntigravity AgentType = "antigravity"
	AgentClaude      AgentType = "claude"
	AgentCursor      AgentType = "cursor"
	AgentUnknown     AgentType = "unknown"
)

type Detector struct {
	FS afero.Fs
}

func NewDetector(fs afero.Fs) *Detector {
	return &Detector{FS: fs}
}

// Detect determines which AI agent is active in the current directory
func (d *Detector) Detect(cwd string) AgentType {
	// Check for Antigravity (.agent folder)
	if exists, _ := afero.Exists(d.FS, filepath.Join(cwd, ".agent")); exists {
		return AgentAntigravity
	}

	// Check for Claude Code (.claude folder)
	if exists, _ := afero.Exists(d.FS, filepath.Join(cwd, ".claude")); exists {
		return AgentClaude
	}

	// Check for Cursor (.cursorrules file)
	if exists, _ := afero.Exists(d.FS, filepath.Join(cwd, ".cursorrules")); exists {
		return AgentCursor
	}

	return AgentUnknown
}

// GetRulesPath returns the target directory/file for rules based on agent type
func (d *Detector) GetRulesPath(cwd string, agent AgentType) string {
	switch agent {
	case AgentAntigravity:
		return filepath.Join(cwd, ".agent", "rules")
	case AgentClaude:
		return filepath.Join(cwd, ".claude", "rules")
	case AgentCursor:
		return filepath.Join(cwd, ".cursorrules")
	default:
		return filepath.Join(cwd, "arsenal_prompts.md") // Fallback
	}
}
