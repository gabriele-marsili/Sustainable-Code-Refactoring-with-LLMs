package markdown

// Render translates markdown to HTML
func Render(markdown string) string {
	var (
		strong, em       bool
		header, list     int
		html             []byte
	)

	for pos := 0; pos < len(markdown); pos++ {
		char := markdown[pos]
		switch char {
		case '#':
			header = 0
			for pos < len(markdown) && markdown[pos] == '#' {
				header++
				pos++
			}
			html = append(html, fmt.Sprintf("<h%d>", header)...)
			pos-- // Adjust for the outer loop increment
		case '*':
			if list == 0 {
				html = append(html, "<ul>"...)
			}
			html = append(html, "<li>"...)
			list++
		case '\n':
			if list > 0 {
				html = append(html, "</li>"...)
			}
			if header > 0 {
				html = append(html, fmt.Sprintf("</h%d>", header)...)
				header = 0
			}
		case '_':
			if pos+1 < len(markdown) && markdown[pos+1] == '_' {
				strong = !strong
				if strong {
					html = append(html, "<strong>"...)
				} else {
					html = append(html, "</strong>"...)
				}
				pos++
			} else {
				em = !em
				if em {
					html = append(html, "<em>"...)
				} else {
					html = append(html, "</em>"...)
				}
			}
		default:
			html = append(html, char)
		}
	}

	if header > 0 {
		html = append(html, fmt.Sprintf("</h%d>", header)...)
	}
	if list > 0 {
		html = append(html, "</li></ul>"...)
	}

	if len(html) > 0 && (header == 0 && list == 0) {
		return "<p>" + string(html) + "</p>"
	}
	return string(html)
}