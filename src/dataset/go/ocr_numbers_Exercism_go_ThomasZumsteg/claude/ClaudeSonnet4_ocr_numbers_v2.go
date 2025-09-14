package ocr

import "strings"

/*recognizeDigit checks if a pipes and bars character is a digit.*/
func recognizeDigit(digit string) (string, bool) {
	d, ok := digits[digit]
	return d, ok
}

/*Recognize reads pipes and bars characters from a string.
Characters are 3 wide and 4 high.*/
func Recognize(characters string) []string {
	lines := strings.Split(characters[1:], "\n")
	numGroups := (len(lines) + 3) / 4
	digits := make([]string, 0, numGroups)
	
	for groupIdx := 0; groupIdx < numGroups; groupIdx++ {
		start := groupIdx * 4
		end := start + 4
		if end > len(lines) {
			end = len(lines)
		}
		
		groupLines := lines[start:end]
		if len(groupLines) == 0 || len(groupLines[0]) == 0 {
			continue
		}
		
		var result strings.Builder
		result.Grow(len(groupLines[0]) / 3)
		
		for c := 0; c+3 <= len(groupLines[0]); c += 3 {
			var char strings.Builder
			char.Grow(16) // 4 lines * 4 chars per line
			
			for l := 0; l < len(groupLines) && l < 4; l++ {
				char.WriteByte('\n')
				if c+3 <= len(groupLines[l]) {
					char.WriteString(groupLines[l][c : c+3])
				}
			}
			
			if d, ok := recognizeDigit(char.String()); ok {
				result.WriteString(d)
			} else {
				result.WriteByte('?')
			}
		}
		digits = append(digits, result.String())
	}
	return digits
}

//digits maps OCR digits to their string equivalent
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