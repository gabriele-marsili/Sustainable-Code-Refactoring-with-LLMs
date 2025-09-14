package etl

/*Transform converst a map in an old format to the new format.
old format has numbers mapped to arrays of upper case letters
new format has lower case letters mapped to numbers*/
func Transform(oldMap map[int][]string) map[string]int {
	// Pre-calculate total capacity to avoid map reallocations
	totalEntries := 0
	for _, value := range oldMap {
		totalEntries += len(value)
	}
	
	newMap := make(map[string]int, totalEntries)
	for key, value := range oldMap {
		for _, v := range value {
			// Manual case conversion to avoid strings.ToLower allocation
			if len(v) == 1 && v[0] >= 'A' && v[0] <= 'Z' {
				newMap[string(v[0]+32)] = key
			} else {
				// Fallback for multi-character strings or non-ASCII
				newMap[strings.ToLower(v)] = key
			}
		}
	}
	return newMap
}