package cryptosquare

import (
	"math"
	"strings"
	"unicode"
)

const TestVersion = 1

func Encode(text string) string {
	plainText := cleanText(text)
	if len(plainText) == 0 {
		return ""
	}
	
	l := int(math.Ceil(math.Sqrt(float64(len(plainText)))))
	var result strings.Builder
	
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

func cleanText(text string) string {
	var result strings.Builder
	result.Grow(len(text))
	
	for _, r := range text {
		if r >= 'A' && r <= 'Z' {
			result.WriteByte(byte(r + 32))
		} else if (r >= 'a' && r <= 'z') || (r >= '0' && r <= '9') {
			result.WriteByte(byte(r))
		}
	}
	
	return result.String()
}