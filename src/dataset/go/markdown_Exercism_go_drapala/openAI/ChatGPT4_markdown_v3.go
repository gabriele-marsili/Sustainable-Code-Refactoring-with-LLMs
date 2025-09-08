package markdown

import (
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) string {
	var (
		header, list int
		html         strings.Builder
	)

	markdown = strings.NewReplacer(
		"__", "<strong>", "</strong>", "__",
		"_", "<em>", "</em>", "_",
	).Replace(markdown)

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
			html.WriteString(string('0' + header))
			html.WriteString(">")
			pos++ // Skip space after header
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
				html.WriteString(string('0' + header))
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
		html.WriteString(string('0' + header))
		html.WriteString(">")
	}
	if list > 0 {
		html.WriteString("</li></ul>")
	}

	if html.Len() == 0 {
		return "<p></p>"
	}
	return html.String()
}