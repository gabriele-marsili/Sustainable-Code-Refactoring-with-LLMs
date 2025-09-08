package markdown

import (
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) string {
	var (
		html   strings.Builder
		strong bool
		em     bool
		header int
		list   bool
	)

	for pos := 0; pos < len(markdown); pos++ {
		char := markdown[pos]
		switch char {
		case '#':
			header = 0
			for pos < len(markdown) && markdown[pos] == '#' {
				header++
				pos++
			}
			html.WriteString("<h")
			html.WriteByte('0' + byte(header))
			html.WriteString(">")
			pos--
		case '*':
			if !list {
				html.WriteString("<ul>")
				list = true
			}
			html.WriteString("<li>")
		case '\n':
			if list {
				html.WriteString("</li>")
			}
			if header > 0 {
				html.WriteString("</h")
				html.WriteByte('0' + byte(header))
				html.WriteString(">")
				header = 0
			}
		case '_':
			if pos+1 < len(markdown) && markdown[pos+1] == '_' {
				strong = !strong
				if strong {
					html.WriteString("<strong>")
				} else {
					html.WriteString("</strong>")
				}
				pos++
			} else {
				em = !em
				if em {
					html.WriteString("<em>")
				} else {
					html.WriteString("</em>")
				}
			}
		default:
			html.WriteByte(char)
		}
	}

	if header > 0 {
		html.WriteString("</h")
		html.WriteByte('0' + byte(header))
		html.WriteString(">")
	}
	if list {
		html.WriteString("</li></ul>")
	}

	result := html.String()
	if !strings.HasPrefix(result, "<h") && !strings.HasPrefix(result, "<ul>") {
		return "<p>" + result + "</p>"
	}
	return result
}