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
	pling := n%3 == 0
	plang := n%5 == 0
	plong := n%7 == 0
	if pling {
		result += "Pling"
	}
	if plang {
		result += "Plang"
	}
	if plong {
		result += "Plong"
	}
	if result == "" {
		return strconv.Itoa(n)
	}
	return result
}
func isDivisibleByPlingPlangPlong(n int) bool {
	return n%3 == 0 || n%5 == 0 || n%7 == 0
}
func isPling(n int) bool {
	return n%3 == 0
}
func isPlang(n int) bool {
	return n%5 == 0
}
func isPlong(n int) bool {
	return n%7 == 0
}
