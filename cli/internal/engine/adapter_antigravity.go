package engine

import (
	"path/filepath"

	"github.com/spf13/afero"
	"github.com/winsonbaring/arsenal/cli/pkg/api"
)

type AntigravityAdapter struct {
	fs afero.Fs
}

func NewAntigravityAdapter(fs afero.Fs) *AntigravityAdapter {
	return &AntigravityAdapter{fs: fs}
}

func (a *AntigravityAdapter) Name() string {
	return "Antigravity"
}

func (a *AntigravityAdapter) Detect(cwd string) bool {
	root := FindRootWith(a.fs, cwd, ".agent")
	return root != ""
}

func (a *AntigravityAdapter) Inject(cwd string, prompts []api.Prompt) (string, error) {
	root := FindRootWith(a.fs, cwd, ".agent")
	if root == "" {
		root = cwd // Fallback to current dir if not found (shouldn't happen if Detect passed)
	}
	
	// Ensure skills directory exists
	skillsDir := filepath.Join(root, ".agent", "skills")
	if err := a.fs.MkdirAll(skillsDir, 0755); err != nil {
		return "", err
	}

	// We inject into .agent/skills/arsenal_generated_rules.md
	target := filepath.Join(skillsDir, "arsenal_generated_rules.md")
	injector := NewInjector(a.fs)
	err := injector.Inject(target, prompts)
	return target, err
}

func (a *AntigravityAdapter) Clean(cwd string) error {
	root := FindRootWith(a.fs, cwd, ".agent")
	if root == "" {
		root = cwd
	}
	target := filepath.Join(root, ".agent", "skills", "arsenal_generated_rules.md")
	injector := NewInjector(a.fs)
	return injector.Clean(target)
}
