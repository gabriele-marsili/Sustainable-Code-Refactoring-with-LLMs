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

// isDivisibleByPlingPlangPlong is an internal helper and not part of the external interface.
// It's kept for API compatibility if other internal functions were using it,
// though its direct use is now redundant with the optimized Convert.
func isDivisibleByPlingPlangPlong(n int) bool {
	return n%3 == 0 || n%5 == 0 || n%7 == 0
}

// isPling is an internal helper and not part of the external interface.
// It's kept for API compatibility if other internal functions were using it.
func isPling(n int) bool {
	return n%3 == 0
}

// isPlang is an internal helper and not part of the external interface.
// It's kept for API compatibility if other internal functions were using it.
func isPlang(n int) bool {
	return n%5 == 0
}

// isPlong is an internal helper and not part of the external interface.
// It's kept for API compatibility if other internal functions were using it.
func isPlong(n int) bool {
	return n%7 == 0
}
