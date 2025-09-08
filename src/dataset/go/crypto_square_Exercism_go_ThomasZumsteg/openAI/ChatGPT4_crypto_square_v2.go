package cryptosquare

import (
	"math"
	"strings"
	"unicode"
)

// TestVersion is the unit tests that this program passes
const TestVersion = 1

/* Encode performs square code encryption on the alphanumeric parts of some text */
func Encode(text string) string {
	plainText := cleanText(text)
	l := int(math.Ceil(math.Sqrt(float64(len(plainText)))))
	cipherText := make([]strings.Builder, l)

	for i, char := range plainText {
		cipherText[i%l].WriteRune(char)
	}

	result := make([]string, l)
	for i := range cipherText {
		result[i] = cipherText[i].String()
	}
	return strings.Join(result, " ")
}

/* cleanText returns only the alphanumeric parts of a string */
func cleanText(text string) string {
	var builder strings.Builder
	for _, v := range strings.ToLower(text) {
		if unicode.IsLetter(v) || unicode.IsNumber(v) {
			builder.WriteRune(v)
		}
	}
	return builder.String()
}