package cryptosquare

import (
	"math"
	"strings"
	"unicode"
)

func Encode(plainText string) string {
	stripped := stripFormatting(plainText)
	numCols, numRows := getRectangleDimensions(len(stripped))
	encoded := getEncoded(stripped, numCols, numRows)
	return strings.Join(splitEveryN(encoded, numRows), " ")
}

func stripFormatting(plainText string) string {
	var sb strings.Builder
	sb.Grow(len(plainText))
	for _, r := range plainText {
		r = unicode.ToLower(r)
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			sb.WriteRune(r)
		}
	}
	return sb.String()
}

func getRectangleDimensions(messageLength int) (int, int) {
	sqrt := int(math.Sqrt(float64(messageLength)))
	if sqrt*sqrt >= messageLength {
		return sqrt, sqrt
	}
	if (sqrt+1)*sqrt >= messageLength {
		return sqrt + 1, sqrt
	}
	return sqrt + 1, sqrt + 1
}

func getEncoded(message string, numCols int, numRows int) string {
	var sb strings.Builder
	sb.Grow(numCols * numRows)
	for col := 0; col < numCols; col++ {
		for row := 0; row < numRows; row++ {
			index := row*numCols + col
			if index < len(message) {
				sb.WriteByte(message[index])
			} else {
				sb.WriteByte(' ')
			}
		}
	}
	return sb.String()
}

func splitEveryN(message string, n int) []string {
	numChunks := (len(message) + n - 1) / n
	chunks := make([]string, numChunks)
	for i := 0; i < numChunks; i++ {
		start := i * n
		end := start + n
		if end > len(message) {
			end = len(message)
		}
		chunks[i] = message[start:end]
	}
	return chunks
}