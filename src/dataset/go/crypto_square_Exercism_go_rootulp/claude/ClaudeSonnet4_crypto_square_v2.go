package cryptosquare

import (
	"math"
	"strings"
	"unicode"
)

func Encode(plainText string) (cipherText string) {
	stripped := stripFormatting(plainText)
	if len(stripped) == 0 {
		return ""
	}
	numCols, numRows := getRectangleDimensions(len(stripped))
	encoded := getEncoded(stripped, numCols, numRows)
	return strings.Join(splitEveryN(encoded, numRows), " ")
}

func stripFormatting(plainText string) string {
	var builder strings.Builder
	builder.Grow(len(plainText))
	for _, r := range strings.ToLower(plainText) {
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			builder.WriteRune(r)
		}
	}
	return builder.String()
}

func getRectangleDimensions(messageLength int) (numCols int, numRows int) {
	x := int(math.Sqrt(float64(messageLength)))
	if x*x >= messageLength {
		return x, x
	} else if (x+1)*x >= messageLength {
		return x + 1, x
	} else {
		return x + 1, x + 1
	}
}

func getEncoded(message string, numCols int, numRows int) string {
	var builder strings.Builder
	builder.Grow(len(message))
	
	messageRunes := []rune(message)
	
	for col := 0; col < numCols; col++ {
		for row := 0; row < numRows; row++ {
			index := row*numCols + col
			if index < len(messageRunes) {
				builder.WriteRune(messageRunes[index])
			} else {
				builder.WriteRune(' ')
			}
		}
	}
	return builder.String()
}

func splitEveryN(message string, n int) []string {
	if n <= 0 || len(message) == 0 {
		return []string{}
	}
	
	numChunks := (len(message) + n - 1) / n
	chunked := make([]string, 0, numChunks)
	
	for i := 0; i < len(message); i += n {
		end := i + n
		if end > len(message) {
			end = len(message)
		}
		chunked = append(chunked, message[i:end])
	}
	return chunked
}