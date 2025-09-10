package etl

func Transform(in map[int][]string) map[string]int {
	result := make(map[string]int, len(in)*len(in)) // Preallocate with an estimated size
	for score, letters := range in {
		for i := 0; i < len(letters); i++ {
			letter := letters[i]
			lowerLetter := letter
			if 'A' <= letter[0] && letter[0] <= 'Z' { // Inline lowercase conversion for ASCII letters
				lowerLetter = string(letter[0] + 32)
			}
			result[lowerLetter] = score
		}
	}
	return result
}