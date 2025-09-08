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
	return strings.Join(splitEveryN(encoded, numCols), " ")
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

func splitEveryN(s string, n int) []string {
	chunks := make([]string, 0, (len(s)+n-1)/n)
	for i := 0; i < len(s); i += n {
		end := i + n
		if end > len(s) {
			end = len(s)
		}
		chunks = append(chunks, s[i:end])
	}
	return chunks
}