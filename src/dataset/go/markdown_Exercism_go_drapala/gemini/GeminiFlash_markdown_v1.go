package markdown

import (
	"bytes"
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) string {
	var htmlBuf bytes.Buffer
	header := 0
	list := 0
	length := len(markdown)
	pos := 0

	// Pre-allocate a reasonable size for the buffer to reduce allocations
	htmlBuf.Grow(length + 32)

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
			htmlBuf.WriteString("<h")
			htmlBuf.WriteString(string('0' + header)) // Convert header int to string efficiently
			htmlBuf.WriteString(">")
			if pos < length && markdown[pos] == ' ' { // Skip space after header
				pos++
			}
			continue

		case '*':
			if list == 0 {
				htmlBuf.WriteString("<ul>")
			}
			htmlBuf.WriteString("<li>")
			list++
			pos += 2 // Skip "* "
			continue

		case '\n':
			if list > 0 {
				htmlBuf.WriteString("</li>")
			}
			if header > 0 {
				htmlBuf.WriteString("</h")
				htmlBuf.WriteString(string('0' + header))
				htmlBuf.WriteString(">")
				header = 0
			}
			pos++
			continue

		default:
			htmlBuf.WriteByte(char)
			pos++
		}
	}

	html := htmlBuf.String()

	if header > 0 {
		html += "</h" + string('0'+header) + ">"
	}
	if list > 0 {
		html += "</li></ul>"
	}

	if !strings.HasPrefix(html, "<h") && !strings.HasPrefix(html, "<ul") && !strings.HasPrefix(html, "<p") {
		html = "<p>" + html + "</p>"
	}

	return html
}