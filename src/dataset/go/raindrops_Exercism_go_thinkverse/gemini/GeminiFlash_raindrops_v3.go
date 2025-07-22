package raindrops

import (
	"strconv"
)

// Convert takes an integer and returns a string based on its factors.
// If the number has 3 as a factor, "Pling" is added.
// If the number has 5 as a factor, "Plang" is added.
// If the number has 7 as a factor, "Plong" is added.
// If none of the above are true, the number itself is converted to a string.
func Convert(number int) string {
	var resultBuilder []byte

	if number%3 == 0 {
		resultBuilder = append(resultBuilder, "Pling"...)
	}
	if number%5 == 0 {
		resultBuilder = append(resultBuilder, "Plang"...)
	}
	if number%7 == 0 {
		resultBuilder = append(resultBuilder, "Plong"...)
	}

	if len(resultBuilder) > 0 {
		return string(resultBuilder)
	}

	return strconv.Itoa(number)
}
