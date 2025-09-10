package ocr

import (
	"strings"
)

/*recognizeDigit checks if a pipes and bars character is a digit.*/
func recognizeDigit(digit string) (string, bool) {
	d, ok := digits[digit]
	return d, ok
}

/*Recognize reads pipes and bars characters from a string.
Characters are 3 wide and 4 high.*/
func Recognize(characters string) []string {
	lines := strings.Split(characters[1:], "\n")
	numLines := len(lines)
	numDigits := numLines / 4
	digits := make([]string, numDigits)

	for i := 0; i < numDigits; i++ {
		var sb strings.Builder
		for j := 0; j+3 <= len(lines[i*4]); j += 3 {
			var char strings.Builder
			for k := 0; k < 4; k++ {
				char.WriteString("\n")
				char.WriteString(lines[i*4+k][j : j+3])
			}
			digit, ok := recognizeDigit(char.String())
			if ok {
				sb.WriteString(digit)
			} else {
				sb.WriteString("?")
			}
		}
		digits[i] = sb.String()
	}

	return digits
}

//digits maps OCR digits to their string equivelent
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