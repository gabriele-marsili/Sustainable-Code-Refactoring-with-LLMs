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
	return getEncoded(rectangle, numCols, numRows)
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
	}
	return x + 1, x + 1
}

func getRectangle(message string, numCols int, numRows int) [][]rune {
	rectangle := make([][]rune, numRows)
	for i := range rectangle {
		rectangle[i] = make([]rune, numCols)
	}
	index := 0
	for row := 0; row < numRows; row++ {
		for col := 0; col < numCols; col++ {
			if index < len(message) {
				rectangle[row][col] = rune(message[index])
				index++
			} else {
				rectangle[row][col] = ' '
			}
		}
	}
	return rectangle
}

func getEncoded(rectangle [][]rune, numCols int, numRows int) string {
	var builder strings.Builder
	for col := 0; col < numCols; col++ {
		if col > 0 {
			builder.WriteRune(' ')
		}
		for row := 0; row < numRows; row++ {
			if rectangle[row][col] != ' ' {
				builder.WriteRune(rectangle[row][col])
			}
		}
	}
	return builder.String()
}