package etl

import "strings"

func Transform(in map[int][]string) map[string]int {
	result := make(map[string]int, len(in)*len(in)) // Preallocate with an estimated size

	for key, value := range in {
		for i := 0; i < len(value); i++ {
			result[strings.ToLower(value[i])] = key
		}
	}
	return result
}