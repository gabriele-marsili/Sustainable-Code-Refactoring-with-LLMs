package raindrops

import (
	"strconv"
)

// Convert converts a number to a string based on specific divisibility rules.
// If the number is divisible by 3, "Pling" is added.
// If the number is divisible by 5, "Plang" is added.
// If the number is divisible by 7, "Plong" is added.
// If none of the above, the number itself is returned as a string.
func Convert(number int) string {
	var result string

	if number%3 == 0 {
		result += "Pling"
	}
	if number%5 == 0 {
		result += "Plang"
	}
	if number%7 == 0 {
		result += "Plong"
	}

	if result != "" {
		return result
	}
	return strconv.Itoa(number)
}
