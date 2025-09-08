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
	lenMarkdown := len(markdown)

	for pos := 0; pos < lenMarkdown; pos++ {
		char := markdown[pos]
		switch char {
		case '#':
			header = 1
			for pos++; pos < lenMarkdown && markdown[pos] == '#'; pos++ {
				header++
			}
			buf.WriteString("<h")
			buf.WriteString(string(header+'0')) // Convert header int to string efficiently
			buf.WriteString(">")
			pos-- // Correct position after header count
		case '*':
			if list == 0 {
				buf.WriteString("<ul>")
			}
			buf.WriteString("<li>")
			list++
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
			if pos+1 < lenMarkdown && markdown[pos+1] == '_' {
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

	result := buf.String()

	if header > 0 {
		var headerEndBuf bytes.Buffer
		headerEndBuf.WriteString("</h")
		headerEndBuf.WriteString(string(header+'0'))
		headerEndBuf.WriteString(">")
		result += headerEndBuf.String()
	}
	if list > 0 {
		result += "</li></ul>"
	}
	return "<p>" + result + "</p>"
}