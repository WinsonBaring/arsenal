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
	exists, _ := afero.Exists(a.fs, filepath.Join(cwd, ".cursorrules"))
	return exists
}

func (a *CursorAdapter) Inject(cwd string, prompts []api.Prompt) error {
	target := filepath.Join(cwd, ".cursorrules")
	injector := NewInjector(a.fs)
	return injector.Inject(target, prompts)
}
