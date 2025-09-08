package markdown

import (
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) (html string) {
	var htmlBuilder strings.Builder
	markdown = handleBold(markdown)
	markdown = handleItalic(markdown)
	lines := strings.Split(markdown, "\n")
	for _, line := range lines {
		htmlBuilder.WriteString(render(line))
	}
	result := htmlBuilder.String()
	return handleUnorderedList(result)
}

func render(line string) (html string) {
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
	return "<li>" + line[2:] + "</li>"
}

func handleHeader(line string) string {
	lenLine := len(line)
	if lenLine > 5 && strings.HasPrefix(line, "######") {
		return handleHeaderWithLevel(line, 6)
	}
	if lenLine > 4 && strings.HasPrefix(line, "#####") {
		return handleHeaderWithLevel(line, 5)
	}
	if lenLine > 3 && strings.HasPrefix(line, "####") {
		return handleHeaderWithLevel(line, 4)
	}
	if lenLine > 2 && strings.HasPrefix(line, "###") {
		return handleHeaderWithLevel(line, 3)
	}
	if lenLine > 1 && strings.HasPrefix(line, "##") {
		return handleHeaderWithLevel(line, 2)
	}
	if lenLine > 0 && strings.HasPrefix(line, "#") {
		return handleHeaderWithLevel(line, 1)
	}
	panic("handleHeader called with a line that doesn't contain a header")
}

func handleHeaderWithLevel(markdown string, level int) string {
	var sb strings.Builder
	sb.WriteString("<h")
	sb.WriteString(strings.Itoa(level))
	sb.WriteString(">")
	sb.WriteString(markdown[level+1:])
	sb.WriteString("</h")
	sb.WriteString(strings.Itoa(level))
	sb.WriteString(">")
	return sb.String()
}

func handleParagraph(line string) string {
	return "<p>" + line + "</p>"
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
	if !strings.Contains(html, "<li>") {
		return html
	}

	firstLi := strings.Index(html, "<li>")
	lastLi := strings.LastIndex(html, "</li>")

	var sb strings.Builder
	sb.WriteString(html[:firstLi])
	sb.WriteString("<ul>")
	sb.WriteString(html[firstLi:lastLi+5])
	sb.WriteString("</ul>")
	sb.WriteString(html[lastLi+5:])

	return sb.String()
}