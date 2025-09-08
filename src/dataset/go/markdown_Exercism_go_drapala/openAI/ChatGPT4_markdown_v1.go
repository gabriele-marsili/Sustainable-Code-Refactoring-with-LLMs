package markdown

import (
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) string {
	var html strings.Builder
	header := 0
	list := 0

	markdown = strings.ReplaceAll(markdown, "__", "<strong>")
	markdown = strings.ReplaceAll(markdown, "_", "<em>")
	markdown = strings.ReplaceAll(markdown, "</strong>", "</strong>")
	markdown = strings.ReplaceAll(markdown, "</em>", "</em>")

	for pos := 0; pos < len(markdown); {
		char := markdown[pos]

		switch char {
		case '#':
			header = 0
			for pos < len(markdown) && markdown[pos] == '#' {
				header++
				pos++
			}
			html.WriteString("<h")
			html.WriteString(strings.Repeat("1", header))
			html.WriteString(">")
			pos++ // Skip the space after the header
		case '*':
			if list == 0 {
				html.WriteString("<ul>")
			}
			html.WriteString("<li>")
			list++
			pos += 2 // Skip "* " sequence
		case '\n':
			if list > 0 {
				html.WriteString("</li>")
			}
			if header > 0 {
				html.WriteString("</h")
				html.WriteString(strings.Repeat("1", header))
				html.WriteString(">")
				header = 0
			}
			pos++
		default:
			html.WriteByte(char)
			pos++
		}
	}

	if header > 0 {
		html.WriteString("</h")
		html.WriteString(strings.Repeat("1", header))
		html.WriteString(">")
	}
	if list > 0 {
		html.WriteString("</li></ul>")
	}

	if html.Len() > 0 {
		return html.String()
	}
	return "<p>" + html.String() + "</p>"
}