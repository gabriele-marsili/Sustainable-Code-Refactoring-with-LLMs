package transpose

func Transpose(input []string) []string {
	if len(input) == 0 {
		return []string{}
	}

	rows := len(input)
	cols := 0
	for _, s := range input {
		if len(s) > cols {
			cols = len(s)
		}
	}

	if cols == 0 {
		return []string{}
	}

	output := make([]string, cols)
	
	for c := 0; c < cols; c++ {
		word := make([]byte, 0, rows)
		
		for r := 0; r < rows; r++ {
			if c < len(input[r]) {
				word = append(word, input[r][c])
			} else {
				hasChar := false
				for i := r + 1; i < rows; i++ {
					if c < len(input[i]) {
						hasChar = true
						break
					}
				}
				if hasChar {
					word = append(word, ' ')
				}
			}
		}
		output[c] = string(word)
	}
	
	return output
}