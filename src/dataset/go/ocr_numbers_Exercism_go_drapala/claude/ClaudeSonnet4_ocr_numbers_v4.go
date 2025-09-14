package ocr

import (
	"strings"
	"unicode"
)

var digitPatterns = map[string]string{
	" _ | ||_|   ": "0",
	"     |  |   ": "1",
	" _  _||_    ": "2",
	" _  _| _|   ": "3",
	"   |_|  |   ": "4",
	" _ |_  _|   ": "5",
	" _ |_ |_|   ": "6",
	" _   |  |   ": "7",
	" _ |_||_|   ": "8",
	" _ |_| _|   ": "9",
}

func Recognize(input string) []string {
	if input == "" {
		return []string{}
	}
	
	lines := strings.Split(input, "\n")
	if len(lines) < 4 {
		return []string{}
	}
	
	numDigits := len(lines[0]) / 3
	if numDigits == 0 {
		return []string{}
	}
	
	result := make([]string, 0, 1)
	var builder strings.Builder
	builder.Grow(numDigits)
	
	for i := 0; i < numDigits; i++ {
		start := i * 3
		end := start + 3
		
		if end > len(lines[0]) {
			break
		}
		
		var pattern strings.Builder
		pattern.Grow(12)
		
		for j := 0; j < 4; j++ {
			if j < len(lines) && end <= len(lines[j]) {
				pattern.WriteString(lines[j][start:end])
			} else {
				pattern.WriteString("   ")
			}
		}
		
		if digit, exists := digitPatterns[pattern.String()]; exists {
			builder.WriteString(digit)
		} else {
			builder.WriteString("?")
		}
	}
	
	recognized := builder.String()
	if recognized != "" {
		result = append(result, recognized)
	}
	
	return result
}