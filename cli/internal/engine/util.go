package engine

import (
	"path/filepath"

	"github.com/spf13/afero"
)

// FindRootWith checks the current directory and parent directories for a specific file or directory.
// Returns the directory path containing the target, or empty string if not found.
func FindRootWith(fs afero.Fs, startDir string, targetName string) string {
	curr := startDir
	for {
		path := filepath.Join(curr, targetName)
		exists, _ := afero.Exists(fs, path)
		if exists {
			return curr
		}

		parent := filepath.Dir(curr)
		if parent == curr {
			return "" // Reached root
		}
		curr = parent
	}
}
