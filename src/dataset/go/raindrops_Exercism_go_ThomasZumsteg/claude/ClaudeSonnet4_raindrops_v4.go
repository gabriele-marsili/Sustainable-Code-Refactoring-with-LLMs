package raindrops

import "strconv"

// TestVersion the version of the tests to run
const TestVersion = 1

// Convert converts a number to raindrop sounds
// Adds Pling if the number is divisible by 3
//
//	Plang if the number is divisible by 5
//	Plong if the number is divisible by 7
//	Otherwise returns the number as a string
func Convert(num int) string {
	var result []byte

	if num%3 == 0 {
		result = append(result, "Pling"...)
	}
	if num%5 == 0 {
		result = append(result, "Plang"...)
	}
	if num%7 == 0 {
		result = append(result, "Plong"...)
	}

	if len(result) == 0 {
		return strconv.Itoa(num)
	}

	return string(result)
}
