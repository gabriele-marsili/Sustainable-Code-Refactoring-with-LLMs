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
	if len(characters) <= 1 {
		return nil
	}
	
	lines := strings.Split(characters[1:], "\n")
	if len(lines) == 0 {
		return nil
	}
	
	numGroups := (len(lines) + 3) / 4
	digits := make([]string, 0, numGroups)
	
	for groupStart := 0; groupStart < len(lines); groupStart += 4 {
		groupEnd := groupStart + 4
		if groupEnd > len(lines) {
			groupEnd = len(lines)
		}
		
		var result strings.Builder
		lineWidth := len(lines[groupStart])
		
		for c := 0; c+3 <= lineWidth; c += 3 {
			var char strings.Builder
			char.Grow(16) // Pre-allocate for typical digit size
			
			for l := groupStart; l < groupEnd; l++ {
				char.WriteByte('\n')
				if c+3 <= len(lines[l]) {
					char.WriteString(lines[l][c : c+3])
				}
			}
			
			if d, ok := digits[char.String()]; ok {
				result.WriteString(d)
			} else {
				result.WriteByte('?')
			}
		}
		digits = append(digits, result.String())
	}
	return digits
}

/*groupLines breaks a string into groups of lines 4 lines long.*/
func groupLines(str string) [][]string {
	lines := strings.Split(str, "\n")
	numGroups := (len(lines) + 3) / 4
	groups := make([][]string, 0, numGroups)
	
	for i := 0; i < len(lines); i += 4 {
		end := i + 4
		if end > len(lines) {
			end = len(lines)
		}
		group := make([]string, end-i)
		copy(group, lines[i:end])
		groups = append(groups, group)
	}
	return groups
}

/*readLine reads characters from a list of lines.*/
func readLine(lines []string) []string {
	if len(lines) == 0 {
		return nil
	}
	
	lineWidth := len(lines[0])
	numChars := lineWidth / 3
	chars := make([]string, 0, numChars)
	
	for c := 0; c+3 <= lineWidth; c += 3 {
		var char strings.Builder
		char.Grow(16) // Pre-allocate for typical digit size
		
		for l := 0; l < len(lines) && l < 4; l++ {
			char.WriteByte('\n')
			if c+3 <= len(lines[l]) {
				char.WriteString(lines[l][c : c+3])
			}
		}
		chars = append(chars, char.String())
	}
	return chars
}

//digits maps OCR digits to their string equivalent
var digits = map[string]string{
	zero: "0", one: "1", two: "2", three: "3", four: "4",
	five: "5", six: "6", seven: "7", eight: "8", nine: "9",
}

//zero, one, two, three, etc. define the OCR digits
const zero string = `
 _ 
| |
|_|
   `
const one string = `
   
  |
  |
   `
const two string = `
 _ 
 _|
|_ 
   `
const three string = `
 _ 
 _|
 _|
   `
const four string = `
   
|_|
  |
   `
const five string = `
 _ 
|_ 
 _|
   `
const six string = `
 _ 
|_ 
|_|
   `
const seven string = `
 _ 
  |
  |
   `
const eight string = `
 _ 
|_|
|_|
   `
const nine string = `
 _ 
|_|
 _|
   `