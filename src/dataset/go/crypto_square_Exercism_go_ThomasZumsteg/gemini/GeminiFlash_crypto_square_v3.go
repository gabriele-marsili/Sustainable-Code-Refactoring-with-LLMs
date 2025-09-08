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

	cipherText := make([]byte, 0, cols*(rows+1)) // Pre-allocate memory
	for i := 0; i < cols; i++ {
		for j := i; j < length; j += cols {
			cipherText = append(cipherText, plainText[j])
		}
		if i < cols-1 {
			cipherText = append(cipherText, ' ')
		}
	}

	return string(cipherText)
}

/*cleanText returns only the alphanumeric parts of a string*/
func cleanText(text string) string {
	runes := []rune(strings.ToLower(text))
	cleanRunes := make([]rune, 0, len(runes)) // Pre-allocate memory

	for _, r := range runes {
		if unicode.IsLetter(r) || unicode.IsNumber(r) {
			cleanRunes = append(cleanRunes, r)
		}
	}

	return string(cleanRunes)
}