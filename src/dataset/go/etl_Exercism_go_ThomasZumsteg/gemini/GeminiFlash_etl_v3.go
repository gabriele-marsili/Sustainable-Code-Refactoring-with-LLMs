package etl

import "strings"

/*Transform converst a map in an old format to the new format.
old format has numbers mapped to arrays of upper case letters
new format has lower case letters mapped to numbers*/
func Transform(oldMap map[int][]string) map[string]int {
	newMap := make(map[string]int, calculateMapSize(oldMap))
	for key, value := range oldMap {
		for _, v := range value {
			lowerV := strings.ToLower(v)
			newMap[lowerV] = key
		}
	}
	return newMap
}

func calculateMapSize(oldMap map[int][]string) int {
	size := 0
	for _, value := range oldMap {
		size += len(value)
	}
	return size
}