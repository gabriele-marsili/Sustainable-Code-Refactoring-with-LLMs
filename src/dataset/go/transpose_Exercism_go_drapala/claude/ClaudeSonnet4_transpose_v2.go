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
	output := make([]string, 0, cols)

	// Use byte slice builder for efficient string construction
	word := make([]byte, 0, rows)

	for c := 0; c < cols; c++ {
		word = word[:0] // Reset slice length while keeping capacity

		// First pass: build the column string
		for r := 0; r < rows; r++ {
			if c < len(input[r]) {
				word = append(word, input[r][c])
			} else {
				word = append(word, ' ')
			}
		}

		// Trim trailing spaces
		for len(word) > 0 && word[len(word)-1] == ' ' {
			word = word[:len(word)-1]
		}

		output = append(output, string(word))
	}

	return output
}