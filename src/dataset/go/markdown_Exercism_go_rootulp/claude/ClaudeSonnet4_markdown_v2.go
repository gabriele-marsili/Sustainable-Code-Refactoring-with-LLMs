package markdown

import (
	"fmt"
	"strings"
)

// Render translates markdown to HTML
func Render(markdown string) (html string) {
	markdown = handleBold(markdown)
	markdown = handleItalic(markdown)
	lines := strings.Split(markdown, "\n")
	
	var builder strings.Builder
	builder.Grow(len(markdown) * 2) // Pre-allocate capacity
	
	for _, line := range lines {
		builder.WriteString(render(line))
	}
	result := builder.String()
	return handleUnorderedList(result)
}

func render(line string) (html string) {
	if len(line) == 0 {
		return handleParagraph(line)
	}
	
	switch line[0] {
	case '#':
		return handleHeader(line)
	case '*':
		return handleListItem(line)
	default:
		return handleParagraph(line)
	}
}

func isListItem(line string) bool {
	return len(line) > 0 && line[0] == '*'
}

func isHeader(line string) bool {
	return len(line) > 0 && line[0] == '#'
}

func handleListItem(line string) string {
	if len(line) < 2 {
		return "<li></li>"
	}
	return fmt.Sprintf("<li>%s</li>", line[2:])
}

func handleHeader(line string) string {
	level := 0
	for i := 0; i < len(line) && i < 6 && line[i] == '#'; i++ {
		level++
	}
	
	if level == 0 {
		panic("handleHeader called with a line that doesn't contain a header")
	}
	
	return handleHeaderWithLevel(line, level)
}

func handleHeaderWithLevel(markdown string, level int) string {
	if len(markdown) <= level+1 {
		return fmt.Sprintf("<h%d></h%d>", level, level)
	}
	return fmt.Sprintf("<h%d>%s</h%d>", level, markdown[level+1:], level)
}

func handleParagraph(line string) string {
	return fmt.Sprintf("<p>%s</p>", line)
}

func handleBold(markdown string) string {
	first := strings.Index(markdown, "__")
	if first == -1 {
		return markdown
	}
	
	second := strings.Index(markdown[first+2:], "__")
	if second == -1 {
		return markdown
	}
	
	return markdown[:first] + "<strong>" + markdown[first+2:first+2+second] + "</strong>" + markdown[first+2+second+2:]
}

func handleItalic(markdown string) string {
	first := strings.Index(markdown, "_")
	if first == -1 {
		return markdown
	}
	
	// Skip if this is part of a bold marker
	if first > 0 && markdown[first-1] == '_' {
		return markdown
	}
	if first < len(markdown)-1 && markdown[first+1] == '_' {
		return markdown
	}
	
	second := strings.Index(markdown[first+1:], "_")
	if second == -1 {
		return markdown
	}
	
	// Skip if the closing marker is part of a bold marker
	closePos := first + 1 + second
	if closePos < len(markdown)-1 && markdown[closePos+1] == '_' {
		return markdown
	}
	
	return markdown[:first] + "<em>" + markdown[first+1:closePos] + "</em>" + markdown[closePos+1:]
}

func handleUnorderedList(line string) string {
	// HACKHACK this assumes there is only one consecutive unordered list in the input
	first := strings.Index(line, "<li>")
	if first == -1 {
		return line
	}
	
	last := strings.LastIndex(line, "</li>")
	if last == -1 {
		return line
	}
	
	return line[:first] + "<ul>" + line[first:last+5] + "</ul>" + line[last+5:]
}

func replaceLast(line string, search string, replacement string, occurences int) string {
	i := strings.LastIndex(line, search)
	if i == -1 {
		return line
	}
	return line[:i] + strings.Replace(line[i:], search, replacement, 1)
}