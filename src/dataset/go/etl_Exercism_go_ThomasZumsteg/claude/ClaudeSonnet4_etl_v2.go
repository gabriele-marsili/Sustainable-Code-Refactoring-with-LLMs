package etl

import "strings"

/*Transform converst a map in an old format to the new format.
old format has numbers mapped to arrays of upper case letters
new format has lower case letters mapped to numbers*/
func Transform(oldMap map[int][]string) map[string]int {
	// Pre-calculate total capacity to avoid map reallocations
	totalElements := 0
	for _, value := range oldMap {
		totalElements += len(value)
	}
	
	newMap := make(map[string]int, totalElements)
	for key, value := range oldMap {
		for _, v := range value {
			// Use direct ASCII conversion instead of strings.ToLower for single characters
			if len(v) == 1 && v[0] >= 'A' && v[0] <= 'Z' {
				newMap[string(v[0]+32)] = key
			} else {
				newMap[strings.ToLower(v)] = key
			}
		}
	}
	return newMap
}