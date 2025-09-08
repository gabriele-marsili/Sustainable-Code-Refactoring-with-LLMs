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

func getRectangleDimensions(messageLength int) (numCols int, numRows int) {
	root := int(math.Sqrt(float64(messageLength)))
	if root*root >= messageLength {
		return root, root
	} else if (root+1)*root >= messageLength {
		return root + 1, root
	}
	return root + 1, root + 1
}

func getEncoded(message string, numCols int, numRows int) string {
	encodedLength := numCols * numRows
	var sb strings.Builder
	sb.Grow(encodedLength)

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