package markdown

import (
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) (html string) {
	markdown = handleBold(markdown)
	markdown = handleItalic(markdown)
	lines := strings.Split(markdown, "\n")
	var sb strings.Builder
	inList := false

	for _, line := range lines {
		if isListItem(line) {
			if !inList {
				sb.WriteString("<ul>")
				inList = true
			}
			sb.WriteString(handleListItem(line))
		} else {
			if inList {
				sb.WriteString("</ul>")
				inList = false
			}
			sb.WriteString(render(line))
		}
	}

	if inList {
		sb.WriteString("</ul>")
	}

	return sb.String()
}

func render(line string) string {
	if isHeader(line) {
		return handleHeader(line)
	}
	return handleParagraph(line)
}

func isListItem(line string) bool {
	return strings.HasPrefix(line, "* ")
}

func isHeader(line string) bool {
	return strings.HasPrefix(line, "#")
}

func handleListItem(line string) string {
	return "<li>" + line[2:] + "</li>"
}

func handleHeader(line string) string {
	level := strings.Count(line, "#")
	if level > 6 {
		level = 6
	}
	return handleHeaderWithLevel(line, level)
}

func handleHeaderWithLevel(markdown string, level int) string {
	return "<h" + string('0'+level) + ">" + strings.TrimSpace(markdown[level+1:]) + "</h" + string('0'+level) + ">"
}

func handleParagraph(line string) string {
	return "<p>" + line + "</p>"
}

func handleBold(markdown string) string {
	return strings.ReplaceAll(strings.ReplaceAll(markdown, "__", "<strong>"), "</strong>", "</strong>")
}

func handleItalic(markdown string) string {
	return strings.ReplaceAll(strings.ReplaceAll(markdown, "_", "<em>"), "</em>", "</em>")
}