package engine

import "github.com/spf13/afero"

// GetPrioritizedAdapter returns the first detected adapter or the generic one
func GetPrioritizedAdapter(fs afero.Fs, cwd string) AgentAdapter {
	adapters := []AgentAdapter{
		NewAntigravityAdapter(fs),
		NewWindsurfAdapter(fs),
		NewCursorAdapter(fs),
	}

	for _, adapter := range adapters {
		if adapter.Detect(cwd) {
			return adapter
		}
	}

	return NewGenericAdapter(fs)
}
