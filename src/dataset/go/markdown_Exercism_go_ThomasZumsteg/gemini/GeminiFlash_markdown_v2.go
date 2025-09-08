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

	for i := 0; i < len(markdown); i++ {
		char := markdown[i]

		switch char {
		case '#':
			header = 0
			for ; i < len(markdown) && markdown[i] == '#'; i++ {
				header++
			}
			i-- // Correct the index after the header count
			buf.WriteString("<h")
			buf.WriteString(string('0' + header)) // Convert header int to string efficiently
			buf.WriteString(">")

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
				buf.WriteString(string('0' + header)) // Convert header int to string efficiently
				buf.WriteString(">")
				header = 0
			}

		case '_':
			if i+1 < len(markdown) && markdown[i+1] == '_' {
				strong = !strong
				if strong {
					buf.WriteString("<strong>")
				} else {
					buf.WriteString("</strong>")
				}
				i++
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
		headerEndBuf.WriteString(string('0' + header)) // Convert header int to string efficiently
		headerEndBuf.WriteString(">")
		result += headerEndBuf.String()
	} else if list > 0 {
		result += "</li></ul>"
	} else {
		result = "<p>" + result + "</p>"
	}

	return result
}