package tui

import (
	"fmt"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/winsonbaring/arsenal/cli/pkg/api"
)

var (
	titleStyle    = lipgloss.NewStyle().Foreground(lipgloss.Color("205")).Bold(true)
	itemStyle     = lipgloss.NewStyle().PaddingLeft(2)
	selectedStyle = lipgloss.NewStyle().PaddingLeft(2).Foreground(lipgloss.Color("170"))
	cursorStyle   = lipgloss.NewStyle().Foreground(lipgloss.Color("212"))
)

type SelectionModel struct {
	Prompts  []api.Prompt
	Selected map[int]struct{}
	Cursor   int
	Quitting bool
	Done     bool
}

func initialModel(prompts []api.Prompt, preselected []string) SelectionModel {
	m := SelectionModel{
		Prompts:  prompts,
		Selected: make(map[int]struct{}),
	}
	
	// Pre-select based on IDs
	for i, p := range prompts {
		for _, pre := range preselected {
			if p.ID == pre {
				m.Selected[i] = struct{}{}
			}
		}
	}
	return m
}

func (m SelectionModel) Init() tea.Cmd {
	return nil
}

func (m SelectionModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.String() {
		case "ctrl+c", "q":
			m.Quitting = true
			return m, tea.Quit
		case "up", "k":
			if m.Cursor > 0 {
				m.Cursor--
			}
		case "down", "j":
			if m.Cursor < len(m.Prompts)-1 {
				m.Cursor++
			}
		case "enter", " ":
			_, ok := m.Selected[m.Cursor]
			if ok {
				delete(m.Selected, m.Cursor)
			} else {
				m.Selected[m.Cursor] = struct{}{}
			}
		case "d": // Done
			m.Done = true
			return m, tea.Quit
		}
	}
	return m, nil
}

func (m SelectionModel) View() string {
	s := titleStyle.Render("Select Prompts to Inject (Press 'd' when done)") + "\n\n"

	for i, p := range m.Prompts {
		cursor := " "
		if m.Cursor == i {
			cursor = cursorStyle.Render(">")
		}

		checked := "[ ]"
		if _, ok := m.Selected[i]; ok {
			checked = "[x]"
		}

	catStyle := lipgloss.NewStyle().Foreground(lipgloss.Color("240"))
		cat := p.Category
		if cat == "" {
			cat = "General"
		}
		label := fmt.Sprintf("%s %s %s %s", cursor, checked, p.Name, catStyle.Render("["+cat+"]"))
		if m.Cursor == i {
			s += selectedStyle.Render(label) + "\n"
		} else {
			s += itemStyle.Render(label) + "\n"
		}
	}

	return s
}

// SelectPrompts launches the TUI and returns the selected prompts
func SelectPrompts(prompts []api.Prompt, preselected []string) ([]api.Prompt, error) {
	p := tea.NewProgram(initialModel(prompts, preselected))
	finalModel, err := p.Run()
	if err != nil {
		return nil, err
	}

	m, ok := finalModel.(SelectionModel)
	if !ok {
		return nil, fmt.Errorf("internal tui error")
	}

	if m.Quitting && !m.Done {
		return nil, fmt.Errorf("selection cancelled")
	}

	var result []api.Prompt
	for i, p := range m.Prompts {
		if _, ok := m.Selected[i]; ok {
			result = append(result, p)
		}
	}
	return result, nil
}
