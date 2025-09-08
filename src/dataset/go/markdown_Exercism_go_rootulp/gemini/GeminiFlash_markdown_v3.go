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
	var htmlLines strings.Builder
	for _, line := range lines {
		htmlLines.WriteString(render(line))
	}
	result := htmlLines.String()
	return handleUnorderedList(result)
}

func render(line string) (html string) {
	lineLength := len(line)
	if lineLength == 0 {
		return handleParagraph(line)
	}

	switch line[0] {
	case '#':
		if isHeader(line) {
			return handleHeader(line)
		}
		return handleParagraph(line)
	case '*':
		if isListItem(line) {
			return handleListItem(line)
		}
		return handleParagraph(line)
	default:
		return handleParagraph(line)
	}
}

func isListItem(line string) bool {
	return len(line) > 1 && line[0] == '*' && line[1] == ' '
}

func isHeader(line string) bool {
	return line[0] == '#'
}

func handleListItem(line string) string {
	return fmt.Sprintf("<li>%s</li>", line[2:])
}

func handleHeader(line string) string {
	lenLine := len(line)
	level := 0
	for i := 0; i < lenLine; i++ {
		if line[i] == '#' {
			level++
		} else {
			break
		}
	}

	switch level {
	case 1:
		return handleHeaderWithLevel(line, 1)
	case 2:
		return handleHeaderWithLevel(line, 2)
	case 3:
		return handleHeaderWithLevel(line, 3)
	case 4:
		return handleHeaderWithLevel(line, 4)
	case 5:
		return handleHeaderWithLevel(line, 5)
	case 6:
		return handleHeaderWithLevel(line, 6)
	default:
		panic("handleHeader called with a line that doesn't contain a header")
	}
}

func handleHeaderWithLevel(markdown string, level int) string {
	return fmt.Sprintf("<h%d>%s</h%d>", level, markdown[level+1:], level)
}

func handleParagraph(line string) string {
	return fmt.Sprintf("<p>%s</p>", line)
}

func handleBold(markdown string) string {
	var sb strings.Builder
	boldOpen := false
	for i := 0; i < len(markdown); i++ {
		if i+1 < len(markdown) && markdown[i:i+2] == "__" {
			if !boldOpen {
				sb.WriteString("<strong>")
			} else {
				sb.WriteString("</strong>")
			}
			boldOpen = !boldOpen
			i++
		} else {
			sb.WriteByte(markdown[i])
		}
	}
	return sb.String()
}

func handleItalic(markdown string) string {
	var sb strings.Builder
	italicOpen := false
	for i := 0; i < len(markdown); i++ {
		if markdown[i] == '_' {
			if !italicOpen {
				sb.WriteString("<em>")
			} else {
				sb.WriteString("</em>")
			}
			italicOpen = !italicOpen
		} else {
			sb.WriteByte(markdown[i])
		}
	}
	return sb.String()
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
	sb.WriteString(html[firstLi : lastLi+5])
	sb.WriteString("</ul>")
	sb.WriteString(html[lastLi+5:])

	return sb.String()
}