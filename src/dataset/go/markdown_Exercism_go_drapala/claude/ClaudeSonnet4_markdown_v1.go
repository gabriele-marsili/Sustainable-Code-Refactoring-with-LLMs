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
			html.WriteByte('<')
			html.WriteByte('h')
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
			pos += 2 // skip "* "
			
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
			
		case '\x00':
			// Handle pre-processed emphasis tags
			if pos+8 < length && markdown[pos:pos+9] == "\x00STRONG\x00" {
				if strings.Count(html.String(), "<strong>") == strings.Count(html.String(), "</strong>") {
					html.WriteString("<strong>")
				} else {
					html.WriteString("</strong>")
				}
				pos += 9
			} else if pos+4 < length && markdown[pos:pos+5] == "\x00EM\x00" {
				if strings.Count(html.String(), "<em>") == strings.Count(html.String(), "</em>") {
					html.WriteString("<em>")
				} else {
					html.WriteString("</em>")
				}
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