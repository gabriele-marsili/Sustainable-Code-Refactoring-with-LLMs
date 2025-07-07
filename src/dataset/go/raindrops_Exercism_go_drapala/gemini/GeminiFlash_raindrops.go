package raindrops

import (
	"strconv"
)

// Convert converts a number to a string based on specific divisibility rules.
// If the number is divisible by 3, "Pling" is added.
// If the number is divisible by 5, "Plang" is added.
// If the number is divisible by 7, "Plong" is added.
// If none of the above, the number itself is returned as a string.
func Convert(x int) string {
	s := ""
	if x%3 == 0 {
		s += "Pling"
	}
	if x%5 == 0 {
		s += "Plang"
	}
	if x%7 == 0 {
		s += "Plong"
	}

	if s == "" {
		return strconv.Itoa(x)
	}
	return s
}
