package engine

import (
	"path/filepath"

	"github.com/spf13/afero"
	"github.com/winsonbaring/arsenal/cli/pkg/api"
)

type WindsurfAdapter struct {
	fs afero.Fs
}

func NewWindsurfAdapter(fs afero.Fs) *WindsurfAdapter {
	return &WindsurfAdapter{fs: fs}
}

func (a *WindsurfAdapter) Name() string {
	return "Windsurf"
}

func (a *WindsurfAdapter) Detect(cwd string) bool {
	existsRules, _ := afero.Exists(a.fs, filepath.Join(cwd, ".windsurfrules"))
	existsDir, _ := afero.Exists(a.fs, filepath.Join(cwd, ".windsurf"))
	return existsRules || existsDir
}

func (a *WindsurfAdapter) Inject(cwd string, prompts []api.Prompt) error {
	target := filepath.Join(cwd, ".windsurfrules")
	injector := NewInjector(a.fs)
	return injector.Inject(target, prompts)
}

func (a *WindsurfAdapter) Clean(cwd string) error {
	target := filepath.Join(cwd, ".windsurfrules")
	injector := NewInjector(a.fs)
	return injector.Clean(target)
}
