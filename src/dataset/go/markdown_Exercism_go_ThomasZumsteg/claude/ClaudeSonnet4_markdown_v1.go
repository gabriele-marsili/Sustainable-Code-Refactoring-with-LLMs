package markdown

import "strings"

// Render translates markdown to HTML
func Render(markdown string) string {
	if len(markdown) == 0 {
		return "<p></p>"
	}
	
	strong := false
	em := false
	header := 0
	list := 0
	
	var html strings.Builder
	html.Grow(len(markdown) * 2) // Pre-allocate capacity
	
	for pos := 0; pos < len(markdown); pos++ {
		char := markdown[pos]
		switch char {
		case '#':
			for pos < len(markdown) && markdown[pos] == '#' {
				header++
				pos++
			}
			pos-- // Adjust for loop increment
			html.WriteString("<h")
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
	
	result := html.String()
	if header > 0 {
		return result + "</h" + string(byte('0'+header)) + ">"
	}
	if list > 0 {
		return result + "</li></ul>"
	}
	return "<p>" + result + "</p>"
}