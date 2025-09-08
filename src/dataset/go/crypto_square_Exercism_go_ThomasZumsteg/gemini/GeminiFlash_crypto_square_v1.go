package cryptosquare

import (
	"math"
	"strings"
	"unicode"
)

// TestVersion is the unit tests that this program passes
const TestVersion = 1

/*Encode preforms square code encrytion on the alphanumeric parts of some text*/
func Encode(text string) string {
	plainText := cleanText(text)
	textLength := len(plainText)
	if textLength == 0 {
		return ""
	}

	l := int(math.Ceil(math.Sqrt(float64(textLength))))
	cols := l
	rows := (textLength + cols - 1) / cols // Equivalent to math.Ceil(float64(textLength) / float64(cols))

	cipherText := make([]string, cols)
	for i := 0; i < cols; i++ {
		var sb strings.Builder
		for j := i; j < textLength; j += cols {
			sb.WriteByte(plainText[j])
		}
		cipherText[i] = sb.String()
	}

	return strings.Join(cipherText, " ")
}

/*cleanText returns only the alphanumeric parts of a string*/
func cleanText(text string) string {
	var sb strings.Builder
	text = strings.ToLower(text)
	sb.Grow(len(text)) // Pre-allocate memory

	for _, v := range text {
		if unicode.IsLetter(v) || unicode.IsNumber(v) {
			sb.WriteRune(v)
		}
	}
	return sb.String()
}