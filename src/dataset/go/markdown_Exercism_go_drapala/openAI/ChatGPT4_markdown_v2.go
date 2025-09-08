package markdown

import (
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) string {
	var sb strings.Builder
	header := 0
	list := 0

	markdown = strings.NewReplacer(
		"__", "<strong>", 1,
		"__", "</strong>", 1,
		"_", "<em>", 1,
		"_", "</em>", 1,
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
			sb.WriteString("<h")
			sb.WriteString(string('0' + header))
			sb.WriteString(">")
			pos++ // Skip the space after the header
		case '*':
			if list == 0 {
				sb.WriteString("<ul>")
			}
			sb.WriteString("<li>")
			list++
			pos += 2 // Skip "* " for list items
		case '\n':
			if list > 0 {
				sb.WriteString("</li>")
			}
			if header > 0 {
				sb.WriteString("</h")
				sb.WriteString(string('0' + header))
				sb.WriteString(">")
				header = 0
			}
			pos++
		default:
			sb.WriteByte(char)
			pos++
		}
	}

	if header > 0 {
		sb.WriteString("</h")
		sb.WriteString(string('0' + header))
		sb.WriteString(">")
	}
	if list > 0 {
		sb.WriteString("</li></ul>")
	}

	html := sb.String()
	if !strings.HasPrefix(html, "<h") && !strings.HasPrefix(html, "<ul>") {
		return "<p>" + html + "</p>"
	}
	return html
}