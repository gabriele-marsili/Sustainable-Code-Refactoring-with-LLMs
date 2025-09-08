package markdown

import (
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) string {
	// Pre-process emphasis and strong tags using strings.Replacer for efficiency
	replacer := strings.NewReplacer(
		"__", "<strong>", "__", "</strong>",
		"_", "<em>", "_", "</em>",
	)
	markdown = replacer.Replace(markdown)
	
	var html strings.Builder
	html.Grow(len(markdown) * 2) // Pre-allocate capacity to reduce reallocations
	
	header := 0
	list := 0
	pos := 0
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
			html.WriteString("<h")
			html.WriteByte(byte('0' + header))
			html.WriteByte('>')
			if pos < length {
				pos++ // skip space after #
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
	
	// Handle unclosed tags
	if header > 0 {
		html.WriteString("</h")
		html.WriteByte(byte('0' + header))
		html.WriteByte('>')
		return html.String()
	}
	if list > 0 {
		html.WriteString("</li></ul>")
		return html.String()
	}
	
	result := html.String()
	return "<p>" + result + "</p>"
}