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

	result := make([]string, maxLen)
	for r, row := range input {
		for c, char := range row {
			if len(result[c]) < r {
				result[c] += string(make([]byte, r-len(result[c])))
			}
			result[c] += string(char)
		}
	}

	for i := range result {
		if len(result[i]) < len(input) {
			result[i] += string(make([]byte, len(input)-len(result[i])))
		}
	}

	return result
}