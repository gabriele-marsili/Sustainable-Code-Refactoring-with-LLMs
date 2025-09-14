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
	
	var sb strings.Builder
	
	for groupIdx := 0; groupIdx < numGroups; groupIdx++ {
		start := groupIdx * 4
		end := start + 4
		if end > len(lines) {
			end = len(lines)
		}
		
		if start >= len(lines) || len(lines[start]) == 0 {
			break
		}
		
		sb.Reset()
		lineWidth := len(lines[start])
		
		for charPos := 0; charPos+3 <= lineWidth; charPos += 3 {
			sb.Reset()
			
			for lineOffset := 0; lineOffset < 4 && start+lineOffset < len(lines); lineOffset++ {
				sb.WriteByte('\n')
				line := lines[start+lineOffset]
				if charPos+3 <= len(line) {
					sb.WriteString(line[charPos : charPos+3])
				} else {
					sb.WriteString("   ")
				}
			}
			
			char := sb.String()
			if d, ok := digits[char]; ok {
				sb.Reset()
				sb.WriteString(d)
			} else {
				sb.Reset()
				sb.WriteByte('?')
			}
		}
		
		result = append(result, sb.String())
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
	if len(lines) == 0 || len(lines[0]) == 0 {
		return nil
	}
	
	lineWidth := len(lines[0])
	numChars := lineWidth / 3
	chars := make([]string, 0, numChars)
	
	var sb strings.Builder
	
	for c := 0; c+3 <= lineWidth; c += 3 {
		sb.Reset()
		for l := 0; l < 4 && l < len(lines); l++ {
			sb.WriteByte('\n')
			if c+3 <= len(lines[l]) {
				sb.WriteString(lines[l][c : c+3])
			} else {
				sb.WriteString("   ")
			}
		}
		chars = append(chars, sb.String())
	}
	
	return chars
}