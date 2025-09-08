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
		for j := 0; j < rows; j++ {
			index := i + j*cols
			if index < textLength {
				sb.WriteByte(plainText[index])
			}
		}
		cipherText[i] = sb.String()
	}

	return strings.Join(cipherText, " ")
}

/*cleanText returns only the alphanumeric parts of a string*/
func cleanText(text string) string {
	var sb strings.Builder
	for _, r := range text {
		r = unicode.ToLower(r)
		if unicode.IsLetter(r) || unicode.IsNumber(r) {
			sb.WriteRune(r)
		}
	}
	return sb.String()
}