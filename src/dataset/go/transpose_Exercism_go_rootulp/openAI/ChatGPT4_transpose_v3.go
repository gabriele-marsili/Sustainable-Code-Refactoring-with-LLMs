package transpose

import (
	"strings"
)

func Transpose(input []string) (result []string) {
	maxLen := maxLineLength(input)
	transposed := make([][]rune, maxLen)
	for i := range transposed {
		transposed[i] = make([]rune, len(input))
		for j := range input {
			if i < len(input[j]) {
				transposed[i][j] = rune(input[j][i])
			} else {
				transposed[i][j] = ' '
			}
		}
	}

	result = make([]string, len(transposed))
	for i, row := range transposed {
		result[i] = strings.TrimRight(string(row), " ")
	}
	return result
}

func maxLineLength(input []string) (max int) {
	for _, line := range input {
		if len(line) > max {
			max = len(line)
		}
	}
	return max
}