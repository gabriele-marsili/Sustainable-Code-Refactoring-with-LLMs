package markdown

import (
	"fmt"
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) (html string) {
	markdown = handleBold(markdown)
	markdown = handleItalic(markdown)
	lines := strings.Split(markdown, "\n")
	var sb strings.Builder
	for _, line := range lines {
		sb.WriteString(render(line))
	}
	return handleUnorderedList(sb.String())
}

func render(line string) (html string) {
	switch {
	case isHeader(line):
		return handleHeader(line)
	case isListItem(line):
		return handleListItem(line)
	default:
		return handleParagraph(line)
	}
}

func isListItem(line string) bool {
	return strings.HasPrefix(line, "*")
}

func isHeader(line string) bool {
	return strings.HasPrefix(line, "#")
}

func handleListItem(line string) string {
	return fmt.Sprintf("<li>%s</li>", strings.TrimSpace(line[1:]))
}

func handleHeader(line string) string {
	level := strings.IndexFunc(line, func(r rune) bool { return r != '#' })
	if level == -1 || level > 6 {
		panic("handleHeader called with a line that doesn't contain a valid header")
	}
	return handleHeaderWithLevel(line, level)
}

func handleHeaderWithLevel(markdown string, level int) string {
	content := strings.TrimSpace(markdown[level:])
	return fmt.Sprintf("<h%d>%s</h%d>", level, content, level)
}

func handleParagraph(line string) string {
	return fmt.Sprintf("<p>%s</p>", strings.TrimSpace(line))
}

func handleBold(markdown string) string {
	return strings.ReplaceAll(strings.ReplaceAll(markdown, "__", "<strong>"), "</strong>", "</strong>")
}

func handleItalic(markdown string) string {
	return strings.ReplaceAll(strings.ReplaceAll(markdown, "_", "<em>"), "</em>", "</em>")
}

func handleUnorderedList(line string) string {
	if strings.Contains(line, "<li>") {
		line = strings.Replace(line, "<li>", "<ul><li>", 1)
		line = replaceLast(line, "</li>", "</li></ul>")
	}
	return line
}

func replaceLast(line, search, replacement string) string {
	i := strings.LastIndex(line, search)
	if i == -1 {
		return line
	}
	return line[:i] + replacement + line[i+len(search):]
}