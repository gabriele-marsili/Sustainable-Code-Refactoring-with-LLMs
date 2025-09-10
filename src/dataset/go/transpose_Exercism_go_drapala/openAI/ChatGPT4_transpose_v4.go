package transpose

func Transpose(input []string) []string {
	rows := len(input)
	cols := 0
	for _, c := range input {
		if len(c) > cols {
			cols = len(c)
		}
	}

	output := make([]string, cols)
	for c := 0; c < cols; c++ {
		word := make([]byte, rows)
		hasChar := false
		for r := 0; r < rows; r++ {
			if c < len(input[r]) {
				word[r] = input[r][c]
				hasChar = true
			} else {
				word[r] = ' '
			}
		}
		if hasChar {
			output[c] = string(word)
		} else {
			output[c] = ""
		}
	}
	return output
}