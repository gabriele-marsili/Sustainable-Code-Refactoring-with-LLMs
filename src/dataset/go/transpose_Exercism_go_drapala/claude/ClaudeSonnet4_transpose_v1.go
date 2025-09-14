package transpose

func Transpose(input []string) []string {
	if len(input) == 0 {
		return []string{}
	}

	// Find maximum column count
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

	// Pre-allocate output slice with exact capacity
	output := make([]string, cols)
	
	// Pre-allocate byte slice for building strings
	wordBytes := make([]byte, 0, rows)

	for c := 0; c < cols; c++ {
		wordBytes = wordBytes[:0] // Reset slice length, keep capacity
		
		// Find last row that has a character at column c
		lastValidRow := -1
		for r := rows - 1; r >= 0; r-- {
			if c < len(input[r]) {
				lastValidRow = r
				break
			}
		}

		// Build column string up to last valid row
		for r := 0; r <= lastValidRow; r++ {
			if c < len(input[r]) {
				wordBytes = append(wordBytes, input[r][c])
			} else {
				wordBytes = append(wordBytes, ' ')
			}
		}
		
		output[c] = string(wordBytes)
	}

	return output
}