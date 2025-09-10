package etl

import "strings"

func Transform(in map[int][]string) map[string]int {
	result := make(map[string]int, len(in)*4) // Preallocate with an estimated size

	for key, value := range in {
		for i := 0; i < len(value); i++ {
			letter := value[i]
			result[strings.ToLower(letter)] = key
		}
	}
	return result
}