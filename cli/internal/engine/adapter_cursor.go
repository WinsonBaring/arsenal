package engine

import (
	"path/filepath"

	"github.com/spf13/afero"
	"github.com/winsonbaring/arsenal/cli/pkg/api"
)

type CursorAdapter struct {
	fs afero.Fs
}

func NewCursorAdapter(fs afero.Fs) *CursorAdapter {
	return &CursorAdapter{fs: fs}
}

func (a *CursorAdapter) Name() string {
	return "Cursor"
}

func (a *CursorAdapter) Detect(cwd string) bool {
	root := FindRootWith(a.fs, cwd, ".cursorrules")
	return root != ""
}

func (a *CursorAdapter) Inject(cwd string, prompts []api.Prompt) error {
	root := FindRootWith(a.fs, cwd, ".cursorrules")
	if root == "" {
		root = cwd
	}
	target := filepath.Join(root, ".cursorrules")
	injector := NewInjector(a.fs)
	return injector.Inject(target, prompts)
}

func (a *CursorAdapter) Clean(cwd string) error {
	root := FindRootWith(a.fs, cwd, ".cursorrules")
	if root == "" {
		root = cwd
	}
	target := filepath.Join(root, ".cursorrules")
	injector := NewInjector(a.fs)
	return injector.Clean(target)
}
