package markdown

import (
	"bytes"
)

// Render translates markdown to HTML
func Render(markdown string) string {
	var buf bytes.Buffer
	strong := false
	em := false
	header := 0
	list := 0

	for pos := 0; pos < len(markdown); pos++ {
		char := markdown[pos]
		switch char {
		case '#':
			header = 0
			for ; pos < len(markdown) && markdown[pos] == '#'; pos++ {
				header++
			}
			pos-- // Correct the position after the loop
			buf.WriteString("<h")
			buf.WriteString(string(header+'0'))
			buf.WriteString(">")

		case '*':
			if list == 0 {
				buf.WriteString("<ul>")
			}
			buf.WriteString("<li>")
			list++
			pos++ // Skip the '*'
		case '\n':
			if list > 0 {
				buf.WriteString("</li>")
			}
			if header > 0 {
				buf.WriteString("</h")
				buf.WriteString(string(header+'0'))
				buf.WriteString(">")
				header = 0
			}
		case '_':
			if pos+1 < len(markdown) && pos+1 < len(markdown) && markdown[pos+1] == '_' {
				strong = !strong
				if strong {
					buf.WriteString("<strong>")
				} else {
					buf.WriteString("</strong>")
				}
				pos++
			} else {
				em = !em
				if em {
					buf.WriteString("<em>")
				} else {
					buf.WriteString("</em>")
				}
			}
		default:
			buf.WriteByte(char)
		}
	}

	if header > 0 {
		buf.WriteString("</h")
		buf.WriteString(string(header+'0'))
		buf.WriteString(">")
	}
	if list > 0 {
		buf.WriteString("</li></ul>")
	}

	result := buf.String()
	return "<p>" + result + "</p>"
}