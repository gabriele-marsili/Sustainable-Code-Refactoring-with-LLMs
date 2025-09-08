package cryptosquare

import (
	"math"
	"strings"
	"unicode"
)

//TestVersion is the unit tests that this program passes
const TestVersion = 1

/*Encode preforms square code encrytion on the alphanumeric parts of some text*/
func Encode(text string) string {
	plainText := cleanText(text)
	if len(plainText) == 0 {
		return ""
	}
	
	l := int(math.Ceil(math.Sqrt(float64(len(plainText)))))
	var result strings.Builder
	result.Grow(len(plainText) + l - 1)
	
	for i := 0; i < l; i++ {
		if i > 0 {
			result.WriteByte(' ')
		}
		for j := i; j < len(plainText); j += l {
			result.WriteByte(plainText[j])
		}
	}
	return result.String()
}

/*cleanText returns only the alphanumeric parts of a string*/
func cleanText(text string) string {
	var result strings.Builder
	result.Grow(len(text))
	
	for _, v := range strings.ToLower(text) {
		if unicode.IsLetter(v) || unicode.IsNumber(v) {
			result.WriteRune(v)
		}
	}
	return result.String()
}