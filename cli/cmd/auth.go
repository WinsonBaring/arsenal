package cmd

import (
	"fmt"
	"time"

	"github.com/charmbracelet/bubbles/spinner"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var authCmd = &cobra.Command{
	Use:   "login",
	Short: "Authenticate with Arsenal",
	Run: func(cmd *cobra.Command, args []string) {
		p := tea.NewProgram(initialModel())
		if _, err := p.Run(); err != nil {
			fmt.Println("Error:", err)
		}
	},
}

func init() {
	rootCmd.AddCommand(authCmd)
}

// BUBBLETEA MODEL
type model struct {
	spinner  spinner.Model
	quitting bool
	authed   bool
}

func initialModel() model {
	s := spinner.New()
	s.Spinner = spinner.Dot
	s.Style = lipgloss.NewStyle().Foreground(lipgloss.Color("205"))
	return model{spinner: s}
}

func (m model) Init() tea.Cmd {
	return tea.Batch(m.spinner.Tick, simulateAuthDelay)
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		if msg.String() == "q" || msg.String() == "ctrl+c" {
			m.quitting = true
			return m, tea.Quit
		}
	case spinner.TickMsg:
		var cmd tea.Cmd
		m.spinner, cmd = m.spinner.Update(msg)
		return m, cmd
	case authSuccessMsg:
		m.authed = true
		m.quitting = true
		// SAVE DUMMY TOKEN
		viper.Set("auth_token", "dummy_token_12345")
		viper.WriteConfig() // This needs setup in root.go (Config Path)
		return m, tea.Quit
	}
	return m, nil
}

func (m model) View() string {
	if m.authed {
		return lipgloss.NewStyle().Foreground(lipgloss.Color("42")).Render("Authed successfully! 🔓Token saved.") + "\n"
	}
	if m.quitting {
		return "Auth cancelled.\n"
	}
	str := fmt.Sprintf("\n  %s Waiting for browser authentication... (Stub)\n\n", m.spinner.View())
	return str
}

type authSuccessMsg struct{}

func simulateAuthDelay() tea.Msg {
	time.Sleep(2 * time.Second)
	return authSuccessMsg{}
}
