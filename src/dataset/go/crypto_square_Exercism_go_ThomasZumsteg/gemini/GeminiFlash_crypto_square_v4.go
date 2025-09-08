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
	length := len(plainText)
	if length == 0 {
		return ""
	}

	cols := int(math.Ceil(math.Sqrt(float64(length))))
	rows := int(math.Floor(math.Sqrt(float64(length))))

	if rows*cols < length {
		rows = cols
	}

	cipherText := make([]byte, 0, cols*(rows+1)) // Pre-allocate with extra space for spaces

	for c := 0; c < cols; c++ {
		for r := c; r < length; r += cols {
			cipherText = append(cipherText, plainText[r])
		}
		if c < cols-1 {
			cipherText = append(cipherText, ' ')
		}
	}

	return string(cipherText)
}

/*cleanText returns only the alphanumeric parts of a string*/
func cleanText(text string) string {
	text = strings.ToLower(text)
	var cleanText strings.Builder
	cleanText.Grow(len(text)) // Pre-allocate memory

	for _, r := range text {
		if unicode.IsLetter(r) || unicode.IsNumber(r) {
			cleanText.WriteRune(r)
		}
	}
	return cleanText.String()
}