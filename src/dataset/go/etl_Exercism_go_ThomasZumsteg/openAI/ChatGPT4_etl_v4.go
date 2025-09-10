package etl

import "strings"

func Transform(oldMap map[int][]string) map[string]int {
	newMap := make(map[string]int, len(oldMap)*2)
	for key, value := range oldMap {
		for i := 0; i < len(value); i++ {
			newMap[strings.ToLower(value[i])] = key
		}
	}
	return newMap
}