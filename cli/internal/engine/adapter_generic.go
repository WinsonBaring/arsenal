package engine

import (
	"path/filepath"

	"github.com/spf13/afero"
	"github.com/winsonbaring/arsenal/cli/pkg/api"
)

type GenericAdapter struct {
	fs afero.Fs
}

func NewGenericAdapter(fs afero.Fs) *GenericAdapter {
	return &GenericAdapter{fs: fs}
}

func (a *GenericAdapter) Name() string {
	return "Generic (Markdown)"
}

func (a *GenericAdapter) Detect(cwd string) bool {
	return true
}

func (a *GenericAdapter) Inject(cwd string, prompts []api.Prompt) (string, error) {
	target := filepath.Join(cwd, "arsenal_prompts.md")
	injector := NewInjector(a.fs)
	err := injector.Inject(target, prompts)
	return target, err
}

func (a *GenericAdapter) Clean(cwd string) error {
	target := filepath.Join(cwd, "arsenal_prompts.md")
	injector := NewInjector(a.fs)
	return injector.Clean(target)
}
