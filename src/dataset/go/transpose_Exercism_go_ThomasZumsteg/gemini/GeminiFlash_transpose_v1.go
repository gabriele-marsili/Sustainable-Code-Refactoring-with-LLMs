package transpose

func Transpose(input []string) []string {
	if len(input) == 0 {
		return []string{}
	}

	maxRowLen := 0
	for _, row := range input {
		if len(row) > maxRowLen {
			maxRowLen = len(row)
		}
	}

	result := make([]string, maxRowLen)
	for i := range result {
		result[i] = ""
	}

	for r, row := range input {
		for c, char := range row {
			for len(result[c]) < r {
				result[c] += " "
			}
			result[c] += string(char)
		}
	}

	return result
}