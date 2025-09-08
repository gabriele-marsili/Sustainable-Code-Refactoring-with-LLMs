package cryptosquare

import (
	"math"
	"strings"
	"unicode"
)

func Encode(plainText string) (cipherText string) {
	stripped := stripFormatting(plainText)
	numCols, numRows := getRectangleDimensions(len(stripped))
	rectangle := getRectangle(stripped, numCols, numRows)
	encoded := getEncoded(rectangle, numCols, numRows)
	return strings.Join(splitEveryN(encoded, numRows), " ")
}

func stripFormatting(plainText string) (stripped string) {
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
	if messageLength == 0 {
		return 0, 0
	}
	x := int(math.Sqrt(float64(messageLength)))
	if x*x >= messageLength {
		return x, x
	} else if (x+1)*x >= messageLength {
		return x + 1, x
	} else {
		return x + 1, x + 1
	}
}

func getRectangle(message string, numCols int, numRows int) (rectangle [][]rune) {
	rectangle = initializeRectangle(numCols, numRows)
	messageRunes := []rune(message)
	index := 0
	for row := 0; row < numRows; row++ {
		for col := 0; col < numCols; col++ {
			if index >= len(messageRunes) {
				rectangle[row][col] = ' '
			} else {
				rectangle[row][col] = messageRunes[index]
				index++
			}
		}
	}
	return rectangle
}

func initializeRectangle(numCols int, numRows int) (rectangle [][]rune) {
	rectangle = make([][]rune, numRows)
	for i := range rectangle {
		rectangle[i] = make([]rune, numCols)
	}
	return rectangle
}

func getEncoded(rectangle [][]rune, numCols int, numRows int) (encoded string) {
	var builder strings.Builder
	builder.Grow(numCols * numRows)
	for col := 0; col < numCols; col++ {
		for row := 0; row < numRows; row++ {
			builder.WriteRune(rectangle[row][col])
		}
	}
	return builder.String()
}

func splitEveryN(message string, n int) (chunked []string) {
	if n <= 0 || len(message) == 0 {
		return chunked
	}
	chunked = make([]string, 0, (len(message)+n-1)/n)
	for i := 0; i < len(message); i += n {
		end := i + n
		if end > len(message) {
			end = len(message)
		}
		chunked = append(chunked, message[i:end])
	}
	return chunked
}