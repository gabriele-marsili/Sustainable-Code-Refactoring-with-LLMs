package markdown

import (
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) string {
	var (
		html    strings.Builder
		strong  bool
		em      bool
		header  int
		list    bool
		inList  bool
	)

	for pos := 0; pos < len(markdown); pos++ {
		char := markdown[pos]
		switch char {
		case '#':
			header = 1
			for pos+1 < len(markdown) && markdown[pos+1] == '#' {
				header++
				pos++
			}
			html.WriteString("<h")
			html.WriteByte('0' + byte(header))
			html.WriteByte('>')
		case '*':
			if !list {
				html.WriteString("<ul>")
				list = true
			}
			if !inList {
				html.WriteString("<li>")
				inList = true
			}
		case '\n':
			if inList {
				html.WriteString("</li>")
				inList = false
			}
			if header > 0 {
				html.WriteString("</h")
				html.WriteByte('0' + byte(header))
				html.WriteByte('>')
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

	if inList {
		html.WriteString("</li>")
	}
	if list {
		html.WriteString("</ul>")
	}
	if header > 0 {
		html.WriteString("</h")
		html.WriteByte('0' + byte(header))
		html.WriteByte('>')
	}

	result := html.String()
	if !strings.HasPrefix(result, "<h") && !strings.HasPrefix(result, "<ul>") {
		return "<p>" + result + "</p>"
	}
	return result
}