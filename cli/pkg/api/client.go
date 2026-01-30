package api

// Prompt represents a single prompt configuration/rule
type Prompt struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Content  string `json:"content"`
	Category string `json:"category"`
}

// PromptSet represents a collection of prompts user has subscribed to (e.g. "React Bundle")
type PromptSet struct {
	Prompts []Prompt `json:"prompts"`
}

type Client interface {
	FetchUserPrompts(token string) (PromptSet, error)
}

// MockClient is used for current development phase
type MockClient struct{}

func (m *MockClient) FetchUserPrompts(token string) (PromptSet, error) {
	// Stub Response
	return PromptSet{
		Prompts: []Prompt{
			{
				ID:       "rule-typescript",
				Name:     "TypeScript Strict",
				Category: "Coding Standards",
				Content:  "Always use strict typing. No 'any'.",
			},
			{
				ID:       "rule-react",
				Name:     "React Performance",
				Category: "Frameworks",
				Content:  "Use React.memo only when necessary. Prefer composition.",
			},
		},
	}, nil
}
