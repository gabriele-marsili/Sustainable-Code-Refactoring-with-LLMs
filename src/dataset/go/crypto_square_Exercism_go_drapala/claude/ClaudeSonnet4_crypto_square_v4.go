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
	
	sqrtArea := int(math.Sqrt(float64(area)))
	for c := sqrtArea; c <= area; c++ {
		if area <= c*c && (c*c-area) <= c {
			r := (area + c - 1) / c
			if c-r <= 1 {
				return r, c
			}
		}
	}
	return -1, -1
}

func padWhitespace(text string, c int) string {
	if len(text) >= c {
		return text
	}
	return text + strings.Repeat(" ", c-len(text))
}

func createRectangle(text string, c int) []string {
	if c == 0 {
		return []string{}
	}
	
	rows := (len(text) + c - 1) / c
	rectangle := make([]string, 0, rows)
	
	for i := 0; i < len(text); i += c {
		end := i + c
		if end > len(text) {
			rectangle = append(rectangle, padWhitespace(text[i:], c))
		} else {
			rectangle = append(rectangle, text[i:end])
		}
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
	builder.Grow(r * c + c - 1)
	
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