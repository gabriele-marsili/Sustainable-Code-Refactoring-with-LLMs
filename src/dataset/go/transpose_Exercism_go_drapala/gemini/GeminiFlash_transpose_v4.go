package transpose

func Transpose(input []string) []string {
	rows := len(input)
	var cols int
	for _, s := range input {
		if len(s) > cols {
			cols = len(s)
		}
	}

	output := make([]string, cols)
	for c := 0; c < cols; c++ {
		var buf []byte
		for r := 0; r < rows; r++ {
			if c < len(input[r]) {
				buf = append(buf, input[r][c])
			} else {
				hasChar := false
				for i := r + 1; i < rows; i++ {
					if len(input[i]) > c {
						hasChar = true
						break
					}
				}
				if hasChar {
					buf = append(buf, ' ')
				}
			}
		}
		output[c] = string(buf)
	}
	return output
}