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
	for i := range result {
		result[i] = make([]byte, 0, len(input))
	}
	
	for r, row := range input {
		runes := []rune(row)
		for c, char := range runes {
			for len(result[c]) < r {
				result[c] = append(result[c], ' ')
			}
			result[c] = append(result[c], string(char)...)
		}
		
		for c := len(runes); c < maxCols; c++ {
			for len(result[c]) < r {
				result[c] = append(result[c], ' ')
			}
		}
	}
	
	output := make([]string, maxCols)
	for i, col := range result {
		output[i] = string(col)
	}
	
	return output
}