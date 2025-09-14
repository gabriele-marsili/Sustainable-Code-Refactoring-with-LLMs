package etl

import "strings"

func Transform(in map[int][]string) map[string]int {
	var totalItems int
	for _, value := range in {
		totalItems += len(value)
	}
	
	result := make(map[string]int, totalItems)

	for key, value := range in {
		for _, letter := range value {
			result[strings.ToLower(letter)] = key
		}
	}
	return result
}