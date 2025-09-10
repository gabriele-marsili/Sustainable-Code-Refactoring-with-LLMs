package etl

import "strings"

func Transform(in map[int][]string) map[string]int {
	result := make(map[string]int, calculateMapSize(in))

	for key, values := range in {
		for _, value := range values {
			result[strings.ToLower(value)] = key
		}
	}
	return result
}

func calculateMapSize(in map[int][]string) int {
	size := 0
	for _, values := range in {
		size += len(values)
	}
	return size
}