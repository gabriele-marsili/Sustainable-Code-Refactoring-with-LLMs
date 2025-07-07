package raindrops

import "strconv"

// Convert returns a string generated based on the raindrops rules:
// - has 3 as a factor, add 'Pling'
// - has 5 as a factor, add 'Plang'
// - has 7 as a factor, add 'Plong'
// - otherwise, return the number as string.
func Convert(n int) string {
	var result string
	if n%3 == 0 {
		result += "Pling"
	}
	if n%5 == 0 {
		result += "Plang"
	}
	if n%7 == 0 {
		result += "Plong"
	}
	if result == "" {
		return strconv.Itoa(n)
	}
	return result
}
