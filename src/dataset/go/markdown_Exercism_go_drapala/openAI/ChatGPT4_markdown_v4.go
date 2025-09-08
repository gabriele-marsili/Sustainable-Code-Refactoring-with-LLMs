package markdown

import (
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) string {
	var sb strings.Builder
	header := 0
	list := false

	markdown = strings.NewReplacer(
		"__", "<strong>", 1,
		"__", "</strong>", 1,
		"_", "<em>", 1,
		"_", "</em>", 1,
	).Replace(markdown)

	for pos := 0; pos < len(markdown); pos++ {
		char := markdown[pos]

		switch char {
		case '#':
			if header == 0 {
				for pos < len(markdown) && markdown[pos] == '#' {
					header++
					pos++
				}
				sb.WriteString("<h")
				sb.WriteString(string('0' + header))
				sb.WriteString(">")
				pos++ // Skip space after header
			}
		case '*':
			if !list {
				sb.WriteString("<ul>")
				list = true
			}
			sb.WriteString("<li>")
			pos++ // Skip next char (assume '* ')
		case '\n':
			if list {
				sb.WriteString("</li>")
			}
			if header > 0 {
				sb.WriteString("</h")
				sb.WriteString(string('0' + header))
				sb.WriteString(">")
				header = 0
			}
		default:
			sb.WriteByte(char)
		}
	}

	if header > 0 {
		sb.WriteString("</h")
		sb.WriteString(string('0' + header))
		sb.WriteString(">")
	}
	if list {
		sb.WriteString("</li></ul>")
	}

	html := sb.String()
	if !strings.HasPrefix(html, "<h") && !strings.HasPrefix(html, "<ul>") {
		return "<p>" + html + "</p>"
	}
	return html
}