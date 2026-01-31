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
// SanitizeName converts a string to a safe directory/filename (e.g., "CI/CD Pipeline" -> "ci_cd_pipeline")
func SanitizeName(s string) string {
	// Simple replacement for now. Secure enough for trusted categories.
	// Replace non-alphanumeric with underscore, toLower.
	var result []rune
	for _, r := range s {
		if (r >= 'a' && r <= 'z') || (r >= '0' && r <= '9') {
			result = append(result, r)
		} else if r >= 'A' && r <= 'Z' {
			result = append(result, r+32) // toLower
		} else {
			result = append(result, '_')
		}
	}
	return string(result)
}
