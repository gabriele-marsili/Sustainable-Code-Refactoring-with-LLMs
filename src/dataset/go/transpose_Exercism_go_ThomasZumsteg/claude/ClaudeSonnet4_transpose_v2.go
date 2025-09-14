package transpose

func Transpose(input []string) []string {
	if len(input) == 0 {
		return []string{}
	}
	
	// Find maximum column count
	maxCols := 0
	for _, row := range input {
		if len(row) > maxCols {
			maxCols = len(row)
		}
	}
	
	if maxCols == 0 {
		return []string{}
	}
	
	// Pre-allocate result slice
	result := make([]string, maxCols)
	
	// Pre-allocate builders for each column
	builders := make([][]byte, maxCols)
	for i := range builders {
		builders[i] = make([]byte, 0, len(input))
	}
	
	// Build transposed strings
	for r, row := range input {
		runes := []rune(row)
		for c := 0; c < maxCols; c++ {
			// Pad with spaces if needed
			for len(builders[c]) < r {
				builders[c] = append(builders[c], ' ')
			}
			
			if c < len(runes) {
				// Convert rune to UTF-8 bytes
				char := runes[c]
				if char < 128 {
					builders[c] = append(builders[c], byte(char))
				} else {
					builders[c] = append(builders[c], []byte(string(char))...)
				}
			}
		}
	}
	
	// Convert builders to strings
	for i, builder := range builders {
		result[i] = string(builder)
	}
	
	return result
}