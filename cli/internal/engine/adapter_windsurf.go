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
	rootRules := FindRootWith(a.fs, cwd, ".windsurfrules")
	rootDir := FindRootWith(a.fs, cwd, ".windsurf")
	return rootRules != "" || rootDir != ""
}

func (a *WindsurfAdapter) Inject(cwd string, prompts []api.Prompt) error {
	root := FindRootWith(a.fs, cwd, ".windsurfrules")
	if root == "" {
		// Try finding .windsurf dir
		root = FindRootWith(a.fs, cwd, ".windsurf")
	}
	if root == "" {
		root = cwd
	}
	target := filepath.Join(root, ".windsurfrules")
	injector := NewInjector(a.fs)
	return injector.Inject(target, prompts)
}

func (a *WindsurfAdapter) Clean(cwd string) error {
	root := FindRootWith(a.fs, cwd, ".windsurfrules")
	if root == "" {
		root = FindRootWith(a.fs, cwd, ".windsurf")
	}
	if root == "" {
		root = cwd
	}
	target := filepath.Join(root, ".windsurfrules")
	injector := NewInjector(a.fs)
	return injector.Clean(target)
}
