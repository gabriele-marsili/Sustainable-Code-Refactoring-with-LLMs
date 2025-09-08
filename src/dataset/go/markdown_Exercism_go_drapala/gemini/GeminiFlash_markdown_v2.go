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
	inParagraph := false

	markdown = strings.ReplaceAll(markdown, "__", "<strong>")
	markdown = strings.ReplaceAll(markdown, "_", "<em>")

	for i := 0; i < len(markdown); i++ {
		char := markdown[i]

		switch char {
		case '#':
			header = 0
			for i < len(markdown) && markdown[i] == '#' {
				header++
				i++
			}
			htmlBuf.WriteString("<h")
			htmlBuf.WriteString(string('0' + header)) // Convert header level to string
			htmlBuf.WriteString(">")
			i-- // Adjust index after header count
			inParagraph = false
		case '*':
			if list == 0 {
				htmlBuf.WriteString("<ul>")
			}
			htmlBuf.WriteString("<li>")
			list++
			i++ // Skip space after asterisk
			inParagraph = false
		case '\n':
			if list > 0 {
				htmlBuf.WriteString("</li>")
			}
			if header > 0 {
				htmlBuf.WriteString("</h")
				htmlBuf.WriteString(string('0' + header)) // Convert header level to string
				htmlBuf.WriteString(">")
				header = 0
			}
			inParagraph = false
		default:
			if !inParagraph && header == 0 && list == 0 {
				htmlBuf.WriteString("<p>")
				inParagraph = true
			}
			htmlBuf.WriteByte(char)
		}
	}

	if header > 0 {
		htmlBuf.WriteString("</h")
		htmlBuf.WriteString(string('0' + header)) // Convert header level to string
		htmlBuf.WriteString(">")
	} else if list > 0 {
		htmlBuf.WriteString("</li></ul>")
	} else if inParagraph {
		htmlBuf.WriteString("</p>")
	} else if htmlBuf.Len() == 0 {
		return "<p></p>"
	}

	return htmlBuf.String()
}