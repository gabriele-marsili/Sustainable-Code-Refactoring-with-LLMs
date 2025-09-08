package markdown

import (
	"bytes"
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) string {
	var htmlBuffer bytes.Buffer
	header := 0
	list := 0
	length := len(markdown)
	pos := 0

	for pos < length {
		char := markdown[pos]

		switch char {
		case '#':
			header = 0
			for pos < length && markdown[pos] == '#' {
				header++
				pos++
			}
			htmlBuffer.WriteString("<h")
			htmlBuffer.WriteString(strings.Itoa(header))
			htmlBuffer.WriteString(">")
			if pos < length && markdown[pos] == ' ' {
				pos++
			}
			continue

		case '*':
			if list == 0 {
				htmlBuffer.WriteString("<ul>")
			}
			htmlBuffer.WriteString("<li>")
			list++
			pos += 2
			continue

		case '_':
			if pos+1 < length && markdown[pos+1] == '_' {
				if strings.Contains(htmlBuffer.String(), "<strong>") {
					htmlBuffer.WriteString("</strong>")
				} else {
					htmlBuffer.WriteString("<strong>")
				}
				pos += 2
			} else {
				if strings.Contains(htmlBuffer.String(), "<em>") {
					htmlBuffer.WriteString("</em>")
				} else {
					htmlBuffer.WriteString("<em>")
				}
				pos++
			}
			continue

		case '\n':
			if list > 0 {
				htmlBuffer.WriteString("</li>")
			}
			if header > 0 {
				htmlBuffer.WriteString("</h")
				htmlBuffer.WriteString(strings.Itoa(header))
				htmlBuffer.WriteString(">")
				header = 0
			}
			pos++
			continue

		default:
			htmlBuffer.WriteByte(char)
			pos++
		}
	}

	html := htmlBuffer.String()

	if header > 0 {
		html += "</h" + strings.Itoa(header) + ">"
	}
	if list > 0 {
		html += "</li></ul>"
	}

	return "<p>" + html + "</p>"
}