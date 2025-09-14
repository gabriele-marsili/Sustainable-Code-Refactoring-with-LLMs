package etl

import "strings"

func Transform(in map[int][]string) map[string]int {
	// Pre-allocate map with estimated capacity to reduce reallocations
	totalElements := 0
	for _, value := range in {
		totalElements += len(value)
	}
	result := make(map[string]int, totalElements)

	// Loop through the keys and values inside in
	for key, value := range in {
		for _, letter := range value {
			result[strings.ToLower(letter)] = key
		}
	}
	return result
}