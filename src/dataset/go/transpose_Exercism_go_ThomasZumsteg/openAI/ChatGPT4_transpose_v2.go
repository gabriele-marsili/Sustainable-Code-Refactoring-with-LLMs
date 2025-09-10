package transpose

func Transpose(input []string) []string {
	if len(input) == 0 {
		return []string{}
	}

	maxLen := 0
	for _, row := range input {
		if len(row) > maxLen {
			maxLen = len(row)
		}
	}

	result := make([][]byte, maxLen)
	for i := range result {
		result[i] = make([]byte, len(input))
		for j := range result[i] {
			result[i][j] = ' '
		}
	}

	for r, row := range input {
		for c, char := range row {
			result[c][r] = byte(char)
		}
	}

	output := make([]string, len(result))
	for i, row := range result {
		output[i] = string(row)
	}

	return output
}