package cryptosquare

import (
	"math"
	"strings"
	"unicode"
)

func normalize(in string) string {
	var builder strings.Builder
	builder.Grow(len(in))
	for _, c := range in {
		if unicode.IsLetter(c) || unicode.IsNumber(c) {
			builder.WriteRune(unicode.ToLower(c))
		}
	}
	return builder.String()
}

func findRectangleSpecs(area int) (int, int) {
	if area == 0 {
		return 0, 0
	}
	sqrt := int(math.Sqrt(float64(area)))
	for c := sqrt; c <= area; c++ {
		if area <= c*c && (c-sqrt) <= 1 {
			r := (area + c - 1) / c // ceiling division
			return r, c
		}
	}
	return area, area
}

func createRectangle(text string, c int) []string {
	if c == 0 {
		return []string{}
	}
	
	textLen := len(text)
	rows := (textLen + c - 1) / c // ceiling division
	rectangle := make([]string, rows)
	
	for i := 0; i < rows; i++ {
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
	if len(rectangle) == 0 {
		return ""
	}
	
	r := len(rectangle)
	c := len(rectangle[0])
	var builder strings.Builder
	builder.Grow(r * c + c - 1) // pre-allocate for content + spaces
	
	for col := 0; col < c; col++ {
		for row := 0; row < r; row++ {
			builder.WriteByte(rectangle[row][col])
		}
		if col != c-1 {
			builder.WriteByte(' ')
		}
	}
	
	return builder.String()
}

func Encode(pt string) string {
	if len(pt) == 0 {
		return pt
	}
	
	normalized := normalize(pt)
	if len(normalized) == 0 {
		return ""
	}
	
	_, c := findRectangleSpecs(len(normalized))
	rectangle := createRectangle(normalized, c)
	return createCipherFromRectangle(rectangle)
}