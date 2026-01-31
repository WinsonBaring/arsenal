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
	exists, _ := afero.Exists(a.fs, filepath.Join(cwd, ".agent"))
	return exists
}

func (a *AntigravityAdapter) Inject(cwd string, prompts []api.Prompt) error {
	// We inject into .agent/arsenal_generated_rules.md
	target := filepath.Join(cwd, ".agent", "arsenal_generated_rules.md")
	injector := NewInjector(a.fs)
	return injector.Inject(target, prompts)
}
