package etl

func Transform(in map[int][]string) map[string]int {
	result := make(map[string]int, len(in)*len(in)) // Preallocate with an estimated size
	for score, letters := range in {
		for i := 0; i < len(letters); i++ { // Use index-based iteration for better performance
			letter := letters[i]
			lowerLetter := strings.ToLower(letter)
			if _, exists := result[lowerLetter]; !exists { // Avoid redundant overwrites
				result[lowerLetter] = score
			}
		}
	}
	return result
}