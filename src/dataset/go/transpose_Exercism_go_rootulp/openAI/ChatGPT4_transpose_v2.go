package transpose

import (
	"strings"
)

func Transpose(input []string) []string {
	if len(input) == 0 {
		return []string{}
	}

	maxLen := maxLineLength(input)
	transposed := make([][]rune, maxLen)

	for _, line := range input {
		for col := 0; col < maxLen; col++ {
			if col < len(line) {
				if transposed[col] == nil {
					transposed[col] = make([]rune, 0, len(input))
				}
				transposed[col] = append(transposed[col], rune(line[col]))
			} else {
				transposed[col] = append(transposed[col], ' ')
			}
		}
	}

	result := make([]string, len(transposed))
	for i, row := range transposed {
		result[i] = strings.TrimRight(string(row), " ")
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