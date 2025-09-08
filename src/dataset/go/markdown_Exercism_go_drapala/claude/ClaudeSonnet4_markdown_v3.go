package markdown

import (
	"strings"
)

func Render(markdown string) string {
	if len(markdown) == 0 {
		return "<p></p>"
	}

	var html strings.Builder
	html.Grow(len(markdown) * 2)

	markdown = strings.NewReplacer(
		"__", "<strong>", 1,
		"__", "</strong>", 1,
		"_", "<em>", 1,
		"_", "</em>", 1,
	).Replace(markdown)

	var header, list, pos int
	length := len(markdown)

	for pos < length {
		char := markdown[pos]

		switch char {
		case '#':
			header = 0
			for pos < length && markdown[pos] == '#' {
				header++
				pos++
			}
			html.WriteByte('<')
			html.WriteByte('h')
			html.WriteByte(byte('0' + header))
			html.WriteByte('>')
			if pos < length {
				pos++
			}

		case '*':
			if list == 0 {
				html.WriteString("<ul>")
			}
			html.WriteString("<li>")
			list++
			pos += 2

		case '\n':
			if list > 0 {
				html.WriteString("</li>")
			}
			if header > 0 {
				html.WriteString("</h")
				html.WriteByte(byte('0' + header))
				html.WriteByte('>')
				header = 0
			}
			pos++

		default:
			html.WriteByte(char)
			pos++
		}
	}

	result := html.String()

	if header > 0 {
		return result + "</h" + string(byte('0'+header)) + ">"
	}
	if list > 0 {
		return result + "</li></ul>"
	}
	return "<p>" + result + "</p>"
}