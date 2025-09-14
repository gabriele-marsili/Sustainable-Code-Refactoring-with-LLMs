package ocr

import (
	"strings"
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
	if len(lines)%4 != 0 {
		return []string{}
	}
	
	numRows := len(lines) / 4
	result := make([]string, 0, numRows)
	
	for row := 0; row < numRows; row++ {
		startLine := row * 4
		line1 := lines[startLine]
		line2 := lines[startLine+1]
		line3 := lines[startLine+2]
		
		if len(line1)%3 != 0 {
			result = append(result, "")
			continue
		}
		
		numDigits := len(line1) / 3
		var rowResult strings.Builder
		rowResult.Grow(numDigits)
		
		for col := 0; col < numDigits; col++ {
			start := col * 3
			end := start + 3
			
			if end > len(line1) || end > len(line2) || end > len(line3) {
				rowResult.WriteByte('?')
				continue
			}
			
			pattern := line1[start:end] + line2[start:end] + line3[start:end]
			
			if digit, exists := digitPatterns[pattern]; exists {
				rowResult.WriteString(digit)
			} else {
				rowResult.WriteByte('?')
			}
		}
		
		result = append(result, rowResult.String())
	}
	
	return result
}