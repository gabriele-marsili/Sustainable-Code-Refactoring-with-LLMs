package etl

import "strings"

/*Transform converst a map in an old format to the new format.
old format has numbers mapped to arrays of upper case letters
new format has lower case letters mapped to numbers*/
func Transform(oldMap map[int][]string) map[string]int {
	if len(oldMap) == 0 {
		return map[string]int{}
	}
	
	totalElements := 0
	for _, value := range oldMap {
		totalElements += len(value)
	}
	
	newMap := make(map[string]int, totalElements)
	
	for key, value := range oldMap {
		for _, v := range value {
			newMap[strings.ToLower(v)] = key
		}
	}
	return newMap
}