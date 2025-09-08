package cryptosquare

import (
	"math"
	"strings"
	"unicode"
)

func Encode(plainText string) (cipherText string) {
	stripped := stripFormatting(plainText)
	numCols, numRows := getRectangleDimensions(len(stripped))
	encoded := getEncoded(stripped, numCols, numRows)
	return strings.Join(splitEveryN(encoded, numCols), " ")
}

func stripFormatting(plainText string) string {
	var builder strings.Builder
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
	for col := 0; col < numCols; col++ {
		for row := 0; row < numRows; row++ {
			index := row*numCols + col
			if index < len(message) {
				builder.WriteByte(message[index])
			} else {
				builder.WriteByte(' ')
			}
		}
	}
	return builder.String()
}

func splitEveryN(message string, n int) []string {
	chunked := make([]string, 0, (len(message)+n-1)/n)
	for i := 0; i < len(message); i += n {
		upperBound := i + n
		if upperBound > len(message) {
			upperBound = len(message)
		}
		chunked = append(chunked, message[i:upperBound])
	}
	return chunked
}