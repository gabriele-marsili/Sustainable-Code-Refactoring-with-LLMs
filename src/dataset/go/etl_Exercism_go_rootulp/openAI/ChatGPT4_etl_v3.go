package etl

import "strings"

func Transform(in map[int][]string) map[string]int {
	result := make(map[string]int, len(in)*len(in)) // Preallocate with an estimated size
	for score, letters := range in {
		for i := 0; i < len(letters); i++ {
			letter := letters[i]
			result[strings.ToLower(letter)] = score
		}
	}
	return result
}