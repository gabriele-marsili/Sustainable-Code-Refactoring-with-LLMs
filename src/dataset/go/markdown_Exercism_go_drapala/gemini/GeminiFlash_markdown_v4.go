package markdown

import (
	"bytes"
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) string {
	var buf bytes.Buffer
	header := 0
	list := 0
	pos := 0
	length := len(markdown)

	markdown = strings.ReplaceAll(markdown, "__", "<strong>")
	markdown = strings.ReplaceAll(markdown, "_", "<em>")

	for pos < length {
		char := markdown[pos]

		switch char {
		case '#':
			header = 0
			for pos < length && markdown[pos] == '#' {
				header++
				pos++
			}
			buf.WriteString("<h")
			buf.WriteString(strings.Itoa(header))
			buf.WriteString(">")
			if pos < length && markdown[pos] == ' ' {
				pos++
			}

		case '*':
			if list == 0 {
				buf.WriteString("<ul>")
			}
			buf.WriteString("<li>")
			list++
			pos += 2

		case '\n':
			if list > 0 {
				buf.WriteString("</li>")
			}
			if header > 0 {
				buf.WriteString("</h")
				buf.WriteString(strings.Itoa(header))
				buf.WriteString(">")
				header = 0
			}
			pos++

		default:
			buf.WriteByte(char)
			pos++
		}
	}

	if header > 0 {
		buf.WriteString("</h")
		buf.WriteString(strings.Itoa(header))
		buf.WriteString(">")
	} else if list > 0 {
		buf.WriteString("</li></ul>")
	} else {
		return "<p>" + buf.String() + "</p>"
	}

	return buf.String()
}