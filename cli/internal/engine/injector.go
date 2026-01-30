package engine

import (
	"fmt"
	"strings"

	"github.com/spf13/afero"
	"github.com/winsonbaring/arsenal/cli/pkg/api"
)

const (
	BlockStart = "# BEGIN ARSENAL MANAGED BLOCK"
	BlockEnd   = "# END ARSENAL MANAGED BLOCK"
)

type Injector struct {
	FS afero.Fs
}

func NewInjector(fs afero.Fs) *Injector {
	return &Injector{FS: fs}
}

// Inject writes the prompts to the target file using Block Pattern
func (i *Injector) Inject(targetPath string, prompts []api.Prompt) error {
	// 1. Generate Content Block
	var sb strings.Builder
	sb.WriteString(BlockStart + "\n")
	sb.WriteString("# Do not edit this block manually. It will be overwritten.\n\n")

	for _, p := range prompts {
		sb.WriteString(fmt.Sprintf("### %s\n", p.Name))
		sb.WriteString(p.Content + "\n\n")
	}
	sb.WriteString(BlockEnd + "\n")
	newBlock := sb.String()

	// 2. Read Existing File
	exists, _ := afero.Exists(i.FS, targetPath)
	var content string
	if exists {
		b, err := afero.ReadFile(i.FS, targetPath)
		if err != nil {
			return err
		}
		content = string(b)
	}

	// 3. Replace or Append
	startIdx := strings.Index(content, BlockStart)
	endIdx := strings.Index(content, BlockEnd)

	if startIdx != -1 && endIdx != -1 {
		// Replace logic
		endIdx += len(BlockEnd)
		// Handle potential newline after block
		if endIdx+1 < len(content) && content[endIdx] == '\n' {
			endIdx++
		}
		content = content[:startIdx] + newBlock + content[endIdx:]
	} else {
		// Append logic
		if content != "" && !strings.HasSuffix(content, "\n") {
			content += "\n"
		}
		content += newBlock
	}

	// 4. Write Back
	return afero.WriteFile(i.FS, targetPath, []byte(content), 0644)
}
