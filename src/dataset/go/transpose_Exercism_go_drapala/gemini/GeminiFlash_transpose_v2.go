package transpose

func Transpose(input []string) []string {
	rows := len(input)
	if rows == 0 {
		return []string{}
	}

	cols := 0
	for _, s := range input {
		if len(s) > cols {
			cols = len(s)
		}
	}

	output := make([]string, cols)
	for c := 0; c < cols; c++ {
		rowBuilder := make([]byte, 0, rows)
		for r := 0; r < rows; r++ {
			if c < len(input[r]) {
				rowBuilder = append(rowBuilder, input[r][c])
			} else {
				rowBuilder = append(rowBuilder, ' ')
			}
		}
		output[c] = string(rowBuilder)
	}

	return output
}