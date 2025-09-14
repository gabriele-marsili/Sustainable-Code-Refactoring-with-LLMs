package etl

import "strings"

func Transform(in map[int][]string) map[string]int {
	// Pre-calculate total capacity to avoid map reallocations
	totalItems := 0
	for _, value := range in {
		totalItems += len(value)
	}
	
	result := make(map[string]int, totalItems)

	// Loop through the keys and values inside in
	for key, value := range in {
		for _, letter := range value {
			result[strings.ToLower(letter)] = key
		}
	}
	return result
}