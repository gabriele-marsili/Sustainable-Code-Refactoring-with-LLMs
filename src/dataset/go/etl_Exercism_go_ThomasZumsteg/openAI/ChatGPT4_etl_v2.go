package etl

import "strings"

// Transform converts a map in an old format to the new format.
// Old format has numbers mapped to arrays of upper case letters.
// New format has lower case letters mapped to numbers.
func Transform(oldMap map[int][]string) map[string]int {
	newMap := make(map[string]int, len(oldMap)*2) // Preallocate with an estimated size
	for key, value := range oldMap {
		for i := 0; i < len(value); i++ { // Use index-based iteration for better performance
			newMap[strings.ToLower(value[i])] = key
		}
	}
	return newMap
}