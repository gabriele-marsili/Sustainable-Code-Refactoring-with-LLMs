package etl

import "strings"

func Transform(in map[int][]string) map[string]int {
	result := make(map[string]int, len(in)*4) // Preallocate with an estimated size
	for score, letters := range in {
		for i := 0; i < len(letters); i++ {
			result[strings.ToLower(letters[i])] = score
		}
	}
	return result
}