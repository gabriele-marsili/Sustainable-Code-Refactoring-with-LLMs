package cryptosquare

import (
	"math"
	"strings"
	"unicode"
)

const TestVersion = 1

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

func cleanText(text string) string {
	var builder strings.Builder
	for _, v := range strings.ToLower(text) {
		if unicode.IsLetter(v) || unicode.IsNumber(v) {
			builder.WriteRune(v)
		}
	}
	return builder.String()
}