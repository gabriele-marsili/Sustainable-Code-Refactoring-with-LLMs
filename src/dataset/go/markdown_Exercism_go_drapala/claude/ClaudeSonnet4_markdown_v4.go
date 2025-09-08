package markdown

import (
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) string {
	if len(markdown) == 0 {
		return "<p></p>"
	}
	
	// Pre-process emphasis and strong tags
	markdown = strings.ReplaceAll(markdown, "__", "\x00STRONG\x00")
	markdown = strings.ReplaceAll(markdown, "_", "\x00EM\x00")
	
	var html strings.Builder
	html.Grow(len(markdown) * 2) // Pre-allocate capacity
	
	header := 0
	list := 0
	pos := 0
	strongCount := 0
	emCount := 0
	
	for pos < len(markdown) {
		char := markdown[pos]
		
		switch char {
		case '#':
			headerLevel := 0
			for pos < len(markdown) && markdown[pos] == '#' {
				headerLevel++
				pos++
			}
			header = headerLevel
			html.WriteByte('<')
			html.WriteByte('h')
			html.WriteByte(byte('0' + header))
			html.WriteByte('>')
			if pos < len(markdown) && markdown[pos] == ' ' {
				pos++
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
				html.WriteByte('<')
				html.WriteByte('/')
				html.WriteByte('h')
				html.WriteByte(byte('0' + header))
				html.WriteByte('>')
				header = 0
			}
			pos++
			
		case '\x00':
			if pos+8 < len(markdown) && markdown[pos:pos+9] == "\x00STRONG\x00" {
				if strongCount%2 == 0 {
					html.WriteString("<strong>")
				} else {
					html.WriteString("</strong>")
				}
				strongCount++
				pos += 9
			} else if pos+4 < len(markdown) && markdown[pos:pos+5] == "\x00EM\x00" {
				if emCount%2 == 0 {
					html.WriteString("<em>")
				} else {
					html.WriteString("</em>")
				}
				emCount++
				pos += 5
			} else {
				html.WriteByte(char)
				pos++
			}
			
		default:
			html.WriteByte(char)
			pos++
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