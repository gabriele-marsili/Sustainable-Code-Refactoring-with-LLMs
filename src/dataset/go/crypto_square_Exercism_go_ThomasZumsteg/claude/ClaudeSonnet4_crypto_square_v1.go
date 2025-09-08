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
	cipherText := make([]strings.Builder, l)
	
	for i := 0; i < l; i++ {
		for j := i; j < len(plainText); j += l {
			cipherText[i].WriteByte(plainText[j])
		}
	}
	
	result := make([]string, l)
	for i := 0; i < l; i++ {
		result[i] = cipherText[i].String()
	}
	
	return strings.Join(result, " ")
}

/*cleanText returns only the alphanumeric parts of a string*/
func cleanText(text string) string {
	if len(text) == 0 {
		return ""
	}
	
	var builder strings.Builder
	builder.Grow(len(text))
	
	for _, v := range strings.ToLower(text) {
		if unicode.IsLetter(v) || unicode.IsNumber(v) {
			builder.WriteRune(v)
		}
	}
	
	return builder.String()
}