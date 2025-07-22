package raindrops

import "strconv"

// Convert returns a string generated based on the raindrops rules below.
// The rules of raindrops are that if a given number:
// - has 3 as a factor, add 'Pling' to the result.
// - has 5 as a factor, add 'Plang' to the result.
// - has 7 as a factor, add 'Plong' to the result.
// - does not have any of 3, 5, or 7 as a factor, the result should be the digits of the number.
func Convert(n int) string {
	var result string
	divisible := false

	if n%3 == 0 {
		result += "Pling"
		divisible = true
	}
	if n%5 == 0 {
		result += "Plang"
		divisible = true
	}
	if n%7 == 0 {
		result += "Plong"
		divisible = true
	}

	if !divisible {
		return strconv.Itoa(n)
	}
	return result
}
