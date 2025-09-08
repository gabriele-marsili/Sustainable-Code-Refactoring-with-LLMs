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
	var htmlBuilder strings.Builder
	for _, line := range lines {
		htmlBuilder.WriteString(render(line))
	}
	return handleUnorderedList(htmlBuilder.String())
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
	return "<li>" + line[2:] + "</li>"
}

func handleHeader(line string) string {
	level := strings.Count(line[:strings.Index(line, " ")], "#")
	return handleHeaderWithLevel(line, level)
}

func handleHeaderWithLevel(markdown string, level int) string {
	content := strings.TrimSpace(markdown[level:])
	return fmt.Sprintf("<h%d>%s</h%d>", level, content, level)
}

func handleParagraph(line string) string {
	return "<p>" + line + "</p>"
}

func handleBold(markdown string) string {
	return strings.ReplaceAll(strings.ReplaceAll(markdown, "__", "<strong>", 1), "__", "</strong>", 1)
}

func handleItalic(markdown string) string {
	return strings.ReplaceAll(strings.ReplaceAll(markdown, "_", "<em>", 1), "_", "</em>", 1)
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