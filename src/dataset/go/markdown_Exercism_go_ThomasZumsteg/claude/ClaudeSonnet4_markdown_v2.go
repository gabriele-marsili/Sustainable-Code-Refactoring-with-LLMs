package markdown

import "strings"

// Render translates markdown to HTML
func Render(markdown string) string {
	strong := false
	em := false
	header := 0
	list := 0
	var html strings.Builder
	html.Grow(len(markdown) * 2) // Pre-allocate capacity
	
	for pos := 0; pos < len(markdown); pos++ {
		switch char := markdown[pos]; char {
		case '#':
			for ; char == '#'; char = markdown[pos] {
				header++
				pos++
			}
			html.WriteByte('<')
			html.WriteByte('h')
			html.WriteByte(byte('0' + header))
			html.WriteByte('>')
		case '*':
			if list == 0 {
				html.WriteString("<ul>")
			}
			html.WriteString("<li>")
			list++
			pos++
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
	
	result := strings.Builder{}
	result.Grow(html.Len() + 7) // "<p>" + content + "</p>"
	result.WriteString("<p>")
	result.WriteString(html.String())
	result.WriteString("</p>")
	return result.String()
}