package markdown

import (
	"bytes"
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) (html string) {
	markdown = handleBold(markdown)
	markdown = handleItalic(markdown)
	lines := strings.Split(markdown, "\n")
	var htmlLines strings.Builder
	for _, line := range lines {
		htmlLines.WriteString(render(line))
	}
	result := htmlLines.String()
	return handleUnorderedList(result)
}

func render(line string) string {
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
	var buf bytes.Buffer
	buf.WriteString("<li>")
	buf.WriteString(line[2:])
	buf.WriteString("</li>")
	return buf.String()
}

func handleHeader(line string) string {
	lenLine := len(line)
	if lenLine > 5 && line[:6] == "######" {
		return handleHeaderWithLevel(line, 6)
	}
	if lenLine > 4 && line[:5] == "#####" {
		return handleHeaderWithLevel(line, 5)
	}
	if lenLine > 3 && line[:4] == "####" {
		return handleHeaderWithLevel(line, 4)
	}
	if lenLine > 2 && line[:3] == "###" {
		return handleHeaderWithLevel(line, 3)
	}
	if lenLine > 1 && line[:2] == "##" {
		return handleHeaderWithLevel(line, 2)
	}
	if lenLine > 0 && line[0] == '#' {
		return handleHeaderWithLevel(line, 1)
	}
	panic("handleHeader called with a line that doesn't contain a header")
}

func handleHeaderWithLevel(markdown string, level int) string {
	var buf bytes.Buffer
	buf.WriteString("<h")
	buf.WriteString(strings.Itoa(level))
	buf.WriteString(">")
	buf.WriteString(markdown[level+1:])
	buf.WriteString("</h")
	buf.WriteString(strings.Itoa(level))
	buf.WriteString(">")
	return buf.String()
}

func handleParagraph(line string) string {
	var buf bytes.Buffer
	buf.WriteString("<p>")
	buf.WriteString(line)
	buf.WriteString("</p>")
	return buf.String()
}

func handleBold(markdown string) string {
	markdown = strings.Replace(markdown, "__", "<strong>", 1)
	markdown = strings.Replace(markdown, "__", "</strong>", 1)
	return markdown
}

func handleItalic(markdown string) string {
	markdown = strings.Replace(markdown, "_", "<em>", 1)
	markdown = strings.Replace(markdown, "_", "</em>", 1)
	return markdown
}

func handleUnorderedList(line string) string {
	first := strings.Index(line, "<li>")
	last := strings.LastIndex(line, "</li>")

	if first == -1 {
		return line
	}

	var buf strings.Builder
	buf.WriteString(line[:first])
	buf.WriteString("<ul>")
	buf.WriteString(line[first:last+5])
	buf.WriteString("</ul>")
	buf.WriteString(line[last+5:])

	return buf.String()
}