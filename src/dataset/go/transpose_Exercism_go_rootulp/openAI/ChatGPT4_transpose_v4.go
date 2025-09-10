package transpose

import (
	"strings"
)

func Transpose(input []string) []string {
	maxLen := maxLineLength(input)
	padded := make([]string, len(input))
	for i, line := range input {
		padded[i] = pad(line, maxLen)
	}

	transposed := make([][]rune, maxLen)
	for i := range transposed {
		transposed[i] = make([]rune, len(input))
	}

	for rowIdx, row := range padded {
		for colIdx, char := range row {
			transposed[colIdx][rowIdx] = char
		}
	}

	result := make([]string, len(transposed))
	for i, row := range transposed {
		result[i] = string(row)
	}
	return result
}

func pad(line string, lineLength int) string {
	if len(line) >= lineLength {
		return line
	}
	var sb strings.Builder
	sb.Grow(lineLength)
	sb.WriteString(line)
	sb.WriteString(strings.Repeat(" ", lineLength-len(line)))
	return sb.String()
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