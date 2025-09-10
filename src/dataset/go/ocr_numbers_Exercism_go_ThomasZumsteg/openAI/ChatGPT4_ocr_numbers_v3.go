package ocr

import "strings"

func recognizeDigit(digit string) (string, bool) {
	return digits[digit]
}

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
		digits[i] = parseGroup(group)
	}

	return digits
}

func parseGroup(lines []string) string {
	if len(lines) < 4 {
		return ""
	}
	var sb strings.Builder
	lineLen := len(lines[0])
	for c := 0; c+3 <= lineLen; c += 3 {
		var char strings.Builder
		for l := 0; l < 4; l++ {
			char.WriteString("\n")
			char.WriteString(lines[l][c : c+3])
		}
		if d, ok := recognizeDigit(char.String()); ok {
			sb.WriteString(d)
		} else {
			sb.WriteString("?")
		}
	}
	return sb.String()
}

var digits = map[string]string{
	zero: "0", one: "1", two: "2", three: "3", four: "4",
	five: "5", six: "6", seven: "7", eight: "8", nine: "9",
}

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