package transpose

import (
	"strings"
)

func Transpose(input []string) []string {
	maxLength := maxLineLength(input)
	transposed := make([]strings.Builder, maxLength)
	for i := range transposed {
		transposed[i].Grow(len(input))
	}

	for _, row := range input {
		for col, char := range row {
			transposed[col].WriteRune(char)
		}
		for col := len(row); col < maxLength; col++ {
			transposed[col].WriteByte(' ')
		}
	}

	result := make([]string, maxLength)
	for i := range transposed {
		result[i] = transposed[i].String()
	}
	return result
}

func maxLineLength(input []string) int {
	max := 0
	for _, line := range input {
		if len(line) > max {
			max = len(line)
		}
	}
	return max
}