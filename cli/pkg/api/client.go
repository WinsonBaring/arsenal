package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// Prompt represents a single prompt configuration/rule
type Prompt struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Content  string `json:"content"`
	Category string `json:"category"`
}

// PromptSet represents a collection of prompts user has subscribed to
type PromptSet struct {
	Prompts []Prompt `json:"prompts"`
}

type Client interface {
	FetchUserPrompts(token string) (PromptSet, error)
}

// HTTPClient connects to the Arsenal Web API (Vercel)
type HTTPClient struct {
	BaseURL string
	Client  *http.Client
}

func NewHTTPClient(baseURL string) *HTTPClient {
	if baseURL == "" {
		baseURL = "http://localhost:3000" // Default to local dev
	}
	return &HTTPClient{
		BaseURL: baseURL,
		Client: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (c *HTTPClient) FetchUserPrompts(token string) (PromptSet, error) {
	url := fmt.Sprintf("%s/api/prompts", c.BaseURL)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return PromptSet{}, err
	}

	// In the future: req.Header.Set("Authorization", "Bearer "+token)

	resp, err := c.Client.Do(req)
	if err != nil {
		return PromptSet{}, fmt.Errorf("failed to connect to API: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return PromptSet{}, fmt.Errorf("API returned error: %s", resp.Status)
	}

	var prompts []Prompt
	if err := json.NewDecoder(resp.Body).Decode(&prompts); err != nil {
		return PromptSet{}, fmt.Errorf("failed to decode response: %w", err)
	}

	return PromptSet{Prompts: prompts}, nil
}

