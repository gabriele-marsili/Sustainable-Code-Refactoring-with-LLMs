package transpose

func Transpose(input []string) []string {
	if len(input) == 0 {
		return []string{}
	}
	
	maxCols := 0
	for _, row := range input {
		if len(row) > maxCols {
			maxCols = len(row)
		}
	}
	
	if maxCols == 0 {
		return []string{}
	}
	
	result := make([][]byte, maxCols)
	for c := 0; c < maxCols; c++ {
		result[c] = make([]byte, 0, len(input))
	}
	
	for r, row := range input {
		runes := []rune(row)
		for c := 0; c < maxCols; c++ {
			if c < len(runes) {
				result[c] = append(result[c], string(runes[c])...)
			} else {
				result[c] = append(result[c], ' ')
			}
		}
		
		for c := len(runes); c < maxCols; c++ {
			for len(result[c]) < r {
				result[c] = append(result[c], ' ')
			}
		}
	}
	
	output := make([]string, maxCols)
	for c := 0; c < maxCols; c++ {
		output[c] = string(result[c])
	}
	
	return output
}