package etl

func Transform(in map[int][]string) map[string]int {
	result := make(map[string]int, len(in)*2) // Preallocate with an estimated size

	for key, value := range in {
		for i := 0; i < len(value); i++ { // Use indexed loop to avoid range overhead
			letter := value[i]
			lowerLetter := make([]byte, len(letter))
			for j := 0; j < len(letter); j++ { // Inline strings.ToLower for efficiency
				char := letter[j]
				if char >= 'A' && char <= 'Z' {
					lowerLetter[j] = char + 32
				} else {
					lowerLetter[j] = char
				}
			}
			result[string(lowerLetter)] = key
		}
	}
	return result
}