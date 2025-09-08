package markdown

import (
	"bytes"
	"fmt"
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) (html string) {
	markdown = handleBold(markdown)
	markdown = handleItalic(markdown)
	lines := strings.Split(markdown, "\n")
	var htmlLines bytes.Buffer
	for _, line := range lines {
		htmlLines.WriteString(render(line))
	}
	result := htmlLines.String()
	return handleUnorderedList(result)
}

func render(line string) (html string) {
	line = strings.TrimSpace(line)
	if isHeader(line) {
		return handleHeader(line)
	}
	if isListItem(line) {
		return handleListItem(line)
	}
	return handleParagraph(line)
}

func isListItem(line string) bool {
	return len(line) > 0 && line[0] == '*'
}

func isHeader(line string) bool {
	return len(line) > 0 && line[0] == '#'
}

func handleListItem(line string) string {
	return fmt.Sprintf("<li>%s</li>", strings.TrimSpace(line[1:]))
}

func handleHeader(line string) string {
	level := 0
	for i := 0; i < len(line); i++ {
		if line[i] == '#' {
			level++
		} else {
			break
		}
	}

	if level > 0 && level <= 6 {
		return handleHeaderWithLevel(line, level)
	}
	panic("handleHeader called with a line that doesn't contain a header")
}

func handleHeaderWithLevel(markdown string, level int) string {
	return fmt.Sprintf("<h%d>%s</h%d>", level, strings.TrimSpace(markdown[level:]), level)
}

func handleParagraph(line string) string {
	return fmt.Sprintf("<p>%s</p>", line)
}

func handleBold(markdown string) string {
	markdown = strings.ReplaceAll(markdown, "__", "<strong>")
	return markdown
}

func handleItalic(markdown string) string {
	markdown = strings.ReplaceAll(markdown, "_", "<em>")
	return markdown
}

func handleUnorderedList(html string) string {
	listItems := strings.Split(html, "<li>")
	if len(listItems) <= 1 {
		return html
	}

	var buf bytes.Buffer
	buf.WriteString("<ul><li>")
	buf.WriteString(strings.Join(listItems[1:], "<li>"))
	buf.WriteString("</ul>")

	return buf.String()
}