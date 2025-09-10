package etl

func Transform(in map[int][]string) map[string]int {
	result := make(map[string]int, len(in)*len(in)) // Preallocate with an estimated size

	for key, value := range in {
		for i := 0; i < len(value); i++ {
			letter := value[i]
			lowerLetter := make([]byte, len(letter))
			for j := 0; j < len(letter); j++ {
				c := letter[j]
				if c >= 'A' && c <= 'Z' {
					c += 'a' - 'A'
				}
				lowerLetter[j] = c
			}
			result[string(lowerLetter)] = key
		}
	}
	return result
}