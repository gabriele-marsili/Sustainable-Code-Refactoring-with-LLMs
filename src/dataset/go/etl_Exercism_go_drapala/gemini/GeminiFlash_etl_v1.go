package etl

import "strings"

func Transform(in map[int][]string) map[string]int {
	result := make(map[string]int, calculateMapSize(in))

	for score, letters := range in {
		for _, letter := range letters {
			result[strings.ToLower(letter)] = score
		}
	}
	return result
}

func calculateMapSize(in map[int][]string) int {
	size := 0
	for _, letters := range in {
		size += len(letters)
	}
	return size
}