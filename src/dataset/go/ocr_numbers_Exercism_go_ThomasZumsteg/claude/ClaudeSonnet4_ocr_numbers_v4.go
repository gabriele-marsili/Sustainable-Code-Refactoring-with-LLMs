package ocr

import (
	"strings"
)

var digits = map[string]string{
	"\n _ \n| |\n|_|\n   ": "0",
	"\n   \n  |\n  |\n   ": "1",
	"\n _ \n _|\n|_ \n   ": "2",
	"\n _ \n _|\n _|\n   ": "3",
	"\n   \n|_|\n  |\n   ": "4",
	"\n _ \n|_ \n _|\n   ": "5",
	"\n _ \n|_ \n|_|\n   ": "6",
	"\n _ \n  |\n  |\n   ": "7",
	"\n _ \n|_|\n|_|\n   ": "8",
	"\n _ \n|_|\n _|\n   ": "9",
}

func recognizeDigit(digit string) (string, bool) {
	d, ok := digits[digit]
	return d, ok
}

func Recognize(characters string) []string {
	if len(characters) == 0 {
		return nil
	}
	
	lines := strings.Split(characters[1:], "\n")
	if len(lines) == 0 {
		return nil
	}
	
	numGroups := (len(lines) + 3) / 4
	result := make([]string, 0, numGroups)
	
	for groupStart := 0; groupStart < len(lines); groupStart += 4 {
		groupEnd := groupStart + 4
		if groupEnd > len(lines) {
			groupEnd = len(lines)
		}
		
		if groupEnd-groupStart < 4 {
			break
		}
		
		lineWidth := len(lines[groupStart])
		numChars := lineWidth / 3
		
		var digitBuilder strings.Builder
		digitBuilder.Grow(numChars * 2)
		
		for charPos := 0; charPos < lineWidth-2; charPos += 3 {
			var charBuilder strings.Builder
			charBuilder.Grow(16)
			
			for lineIdx := groupStart; lineIdx < groupEnd; lineIdx++ {
				charBuilder.WriteByte('\n')
				if charPos+3 <= len(lines[lineIdx]) {
					charBuilder.WriteString(lines[lineIdx][charPos : charPos+3])
				}
			}
			
			char := charBuilder.String()
			if d, ok := digits[char]; ok {
				digitBuilder.WriteString(d)
			} else {
				digitBuilder.WriteByte('?')
			}
		}
		
		result = append(result, digitBuilder.String())
	}
	
	return result
}

func groupLines(str string) [][]string {
	lines := strings.Split(str, "\n")
	numGroups := (len(lines) + 3) / 4
	groups := make([][]string, 0, numGroups)
	
	for i := 0; i < len(lines); i += 4 {
		end := i + 4
		if end > len(lines) {
			end = len(lines)
		}
		groups = append(groups, lines[i:end])
	}
	
	return groups
}

func readLine(lines []string) []string {
	if len(lines) == 0 || len(lines[0]) < 3 {
		return nil
	}
	
	lineWidth := len(lines[0])
	numChars := lineWidth / 3
	chars := make([]string, 0, numChars)
	
	for c := 0; c <= lineWidth-3; c += 3 {
		var builder strings.Builder
		builder.Grow(16)
		
		for l := 0; l < len(lines) && l < 4; l++ {
			builder.WriteByte('\n')
			if c+3 <= len(lines[l]) {
				builder.WriteString(lines[l][c : c+3])
			}
		}
		
		chars = append(chars, builder.String())
	}
	
	return chars
}