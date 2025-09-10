package transpose

import (
	"strings"
)

func Transpose(input []string) []string {
	maxLength := maxLineLength(input)
	result := make([]string, maxLength)
	for i := 0; i < maxLength; i++ {
		var sb strings.Builder
		for _, row := range input {
			if i < len(row) {
				sb.WriteByte(row[i])
			} else {
				sb.WriteByte(' ')
			}
		}
		result[i] = sb.String()
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

func padInput(input []string) []string {
	maxLength := maxLineLength(input)
	padded := make([]string, len(input))
	for i, line := range input {
		padded[i] = pad(line, maxLength)
	}
	return padded
}

func pad(line string, lineLength int) string {
	if len(line) >= lineLength {
		return line
	}
	return line + strings.Repeat(" ", lineLength-len(line))
}

func transpose(input []string) [][]string {
	maxLength := maxLineLength(input)
	transposed := make([][]string, maxLength)
	for i := range transposed {
		transposed[i] = make([]string, 0, len(input))
	}

	for _, row := range input {
		for col, v := range row {
			transposed[col] = append(transposed[col], string(v))
		}
	}
	return transposed
}