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
		root = cwd
	}

	// Group prompts by category
	grouped := make(map[string][]api.Prompt)
	for _, p := range prompts {
		cat := p.Category
		if cat == "" {
			cat = "general"
		}
		grouped[cat] = append(grouped[cat], p)
	}

	var modifiedPaths []string
	injector := NewInjector(a.fs)

	for cat, subPrompts := range grouped {
		safeCat := SanitizeName(cat)
		// Structure: .agent/skills/<category>/SKILL.md
		skillDir := filepath.Join(root, ".agent", "skills", safeCat)
		
		if err := a.fs.MkdirAll(skillDir, 0755); err != nil {
			return "", err
		}

		target := filepath.Join(skillDir, "SKILL.md")
		if err := injector.Inject(target, subPrompts); err != nil {
			return "", err
		}
		modifiedPaths = append(modifiedPaths, target)
	}

	// Join all paths for the return message
	return filepath.Join(modifiedPaths...), nil
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
