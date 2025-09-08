package cryptosquare

import (
	"math"
	"strings"
	"unicode"
)

func normalize(in string) string {
	var sb strings.Builder
	sb.Grow(len(in))
	for _, r := range in {
		if unicode.IsLetter(r) || unicode.IsNumber(r) {
			sb.WriteRune(unicode.ToLower(r))
		}
	}
	return sb.String()
}

func findRectangleSpecs(area int) (int, int) {
	c := int(math.Ceil(math.Sqrt(float64(area))))
	r := (area + c - 1) / c
	return r, c
}

func createRectangle(text string, c int) []string {
	r := (len(text) + c - 1) / c
	rectangle := make([]string, r)
	for i := 0; i < r; i++ {
		start := i * c
		end := start + c
		if end > len(text) {
			end = len(text)
		}
		row := text[start:end]
		if len(row) < c {
			row += strings.Repeat(" ", c-len(row))
		}
		rectangle[i] = row
	}
	return rectangle
}

func createCipherFromRectangle(rectangle []string) string {
	r := len(rectangle)
	c := len(rectangle[0])
	var sb strings.Builder
	sb.Grow(r*c + r - 1)

	for col := 0; col < c; col++ {
		for row := 0; row < r; row++ {
			sb.WriteByte(rectangle[row][col])
		}
		if col < c-1 {
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
	if len(normalized) == 0 {
		return ""
	}

	r, c := findRectangleSpecs(len(normalized))
	rectangle := createRectangle(normalized, c)
	cipher := createCipherFromRectangle(rectangle)
	return cipher
}