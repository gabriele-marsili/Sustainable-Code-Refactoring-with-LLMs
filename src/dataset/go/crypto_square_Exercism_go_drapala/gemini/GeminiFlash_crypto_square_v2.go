package cryptosquare

import (
	"strings"
	"unicode"
)

func normalize(in string) string {
	var sb strings.Builder
	sb.Grow(len(in))
	for _, c := range in {
		if unicode.IsLetter(c) || unicode.IsNumber(c) {
			sb.WriteRune(unicode.ToLower(c))
		}
	}
	return sb.String()
}

func findRectangleSpecs(area int) (int, int) {
	r := 1
	for c := 1; c <= area; c++ {
		if r*c >= area && c-r <= 1 {
			return r, c
		}
		if r*c < area {
			r++
		}
	}
	return -1, -1
}

func createRectangle(text string, c int) []string {
	textLen := len(text)
	rowCount := (textLen + c - 1) / c
	rectangle := make([]string, rowCount)

	for i := 0; i < rowCount; i++ {
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
	sb.Grow(r*c + r) // Pre-allocate space for the cipher text

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
	textLen := len(normalized)

	r, c := findRectangleSpecs(textLen)
	if r == -1 && c == -1 {
		return "" // Or handle the error as appropriate
	}

	rectangle := createRectangle(normalized, c)
	cipher := createCipherFromRectangle(rectangle)
	return cipher
}