package ocr

import (
	"strings"
	"unicode"
)

// Recognize attempts to recognize text from a string representing an OCR grid.
// It returns a slice of strings, where each string represents a recognized character.
// If recognition fails, it returns an empty slice.
func Recognize(ocrString string) []string {
	lines := strings.Split(ocrString, "\n")
	if len(lines) == 0 || len(lines)%4 != 0 {
		return []string{} // Invalid input: must have at least 4 lines and a multiple of 4
	}

	numChars := len(lines[0]) / 3
	if len(lines[0])%3 != 0 || numChars == 0 {
		return []string{} // Invalid input: each line must be a multiple of 3 wide
	}

	characters := make([]string, numChars)
	for i := 0; i < numChars; i++ {
		charLines := make([]string, 4)
		for j := 0; j < 4; j++ {
			startIndex := i * 3
			endIndex := startIndex + 3
			if endIndex > len(lines[j]) {
				return []string{} // Invalid input: line length mismatch
			}
			charLines[j] = lines[j][startIndex:endIndex]
		}
		characters[i] = strings.Join(charLines, "\n")
	}

	recognizedChars := make([]string, numChars)
	for i, char := range characters {
		recognizedChars[i] = recognizeCharacter(char)
	}

	return recognizedChars
}

// recognizeCharacter attempts to match a single character's OCR representation
// to a known character and returns the corresponding character string.
// If no match is found, it returns "?".
func recognizeCharacter(char string) string {
	switch char {
	case " _ \n| |\n|_|\n   ":
		return "0"
	case "   \n  |\n  |\n   ":
		return "1"
	case " _ \n _|\n|_ \n   ":
		return "2"
	case " _ \n _|\n _|\n   ":
		return "3"
	case "   \n|_|\n  |\n   ":
		return "4"
	case " _ \n|_ \n _|\n   ":
		return "5"
	case " _ \n|_ \n|_|\n   ":
		return "6"
	case " _ \n  |\n  |\n   ":
		return "7"
	case " _ \n|_|\n|_|\n   ":
		return "8"
	case " _ \n|_|\n _|\n   ":
		return "9"
	default:
		return "?"
	}
}

//SanitizeString removes leading and trailing whitespace and converts the string to lowercase
func SanitizeString(s string) string {
	s = strings.TrimSpace(s)
	s = strings.ToLower(s)
	return s
}

//IsAlphaNumeric checks if a string is alphanumeric
func IsAlphaNumeric(s string) bool {
	for _, r := range s {
		if !unicode.IsLetter(r) && !unicode.IsNumber(r) {
			return false
		}
	}
	return true
}