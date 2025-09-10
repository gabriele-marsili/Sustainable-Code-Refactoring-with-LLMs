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
	for r := 0; r < rows; r++ {
		for c := 0; c < len(input[r]); c++ {
			if len(output[c]) < r {
				output[c] += " "
			}
			output[c] += string(input[r][c])
		}
		for c := len(input[r]); c < cols; c++ {
			if len(output[c]) < r {
				output[c] += " "
			}
			output[c] += " "
		}
	}

	return output
}