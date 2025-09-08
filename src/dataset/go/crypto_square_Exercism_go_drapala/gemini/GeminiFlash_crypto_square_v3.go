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
	textLen := len(text)
	r := (textLen + c - 1) / c
	rectangle := make([]string, r)

	for i := 0; i < r; i++ {
		start := i * c
		end := start + c
		if end > textLen {
			end = textLen
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
	if r == 0 {
		return ""
	}
	c := len(rectangle[0])
	var sb strings.Builder
	sb.Grow(r * c + c - 1)

	for col := 0; col < c; col++ {
		for row := 0; row < r; row++ {
			if col < len(rectangle[row]) {
				sb.WriteByte(rectangle[row][col])
			}
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
	textLen := len(normalized)

	r, c := findRectangleSpecs(textLen)
	rectangle := createRectangle(normalized, c)
	cipher := createCipherFromRectangle(rectangle)

	return cipher
}