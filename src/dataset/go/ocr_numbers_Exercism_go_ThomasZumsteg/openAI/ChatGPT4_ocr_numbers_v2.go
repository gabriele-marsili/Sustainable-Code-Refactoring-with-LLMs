package ocr

import "strings"

/*recognizeDigit checks if a pipes and bars character is a digit.*/
func recognizeDigit(digit string) (string, bool) {
	return digits[digit]
}

/*Recognize reads pipes and bars characters from a string.
Characters are 3 wide and 4 high.*/
func Recognize(characters string) []string {
	lines := strings.Split(characters[1:], "\n")
	numGroups := (len(lines) + 3) / 4
	digits := make([]string, numGroups)

	for i := 0; i < numGroups; i++ {
		start := i * 4
		end := start + 4
		if end > len(lines) {
			end = len(lines)
		}
		group := lines[start:end]
		digits[i] = processGroup(group)
	}
	return digits
}

func processGroup(group []string) string {
	if len(group) < 4 {
		return strings.Repeat("?", len(group[0])/3)
	}
	var result strings.Builder
	for c := 0; c+3 <= len(group[0]); c += 3 {
		var char strings.Builder
		for l := 0; l < 4; l++ {
			char.WriteString("\n")
			char.WriteString(group[l][c : c+3])
		}
		if d, ok := recognizeDigit(char.String()); ok {
			result.WriteString(d)
		} else {
			result.WriteString("?")
		}
	}
	return result.String()
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