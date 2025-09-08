package cryptosquare

import (
	"strings"
	"unicode"
)

func normalize(in string) string {
	var sb strings.Builder
	for _, c := range in {
		if unicode.IsLetter(c) || unicode.IsNumber(c) {
			sb.WriteRune(unicode.ToLower(c))
		}
	}
	return sb.String()
}

func findRectangleSpecs(area int) (int, int) {
	c := 1
	for c*c < area {
		c++
	}
	r := c - 1
	if r*c >= area {
		return r, c
	}
	return c, c
}

func padWhitespace(text string, c int) string {
	return text + strings.Repeat(" ", c-len(text))
}

func createRectangle(text string, c int) []string {
	rectangle := make([]string, 0, (len(text)+c-1)/c)
	for i := 0; i < len(text); i += c {
		end := i + c
		if end > len(text) {
			end = len(text)
		}
		rectangle = append(rectangle, padWhitespace(text[i:end], c))
	}
	return rectangle
}

func createCipherFromRectangle(rectangle []string) string {
	var sb strings.Builder
	r := len(rectangle)
	c := len(rectangle[0])
	for col := 0; col < c; col++ {
		for row := 0; row < r; row++ {
			sb.WriteByte(rectangle[row][col])
		}
		if col != c-1 {
			sb.WriteByte(' ')
		}
	}
	return sb.String()
}

func Encode(pt string) string {
	if len(pt) == 0 {
		return pt
	}
	normalized := normalize(pt)
	_, c := findRectangleSpecs(len(normalized))
	rectangle := createRectangle(normalized, c)
	return createCipherFromRectangle(rectangle)
}