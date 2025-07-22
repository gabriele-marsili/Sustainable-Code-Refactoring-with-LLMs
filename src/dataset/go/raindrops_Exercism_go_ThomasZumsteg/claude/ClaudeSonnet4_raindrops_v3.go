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
	div3 := num%3 == 0
	div5 := num%5 == 0
	div7 := num%7 == 0

	if !div3 && !div5 && !div7 {
		return strconv.Itoa(num)
	}

	var result []byte
	if div3 {
		result = append(result, "Pling"...)
	}
	if div5 {
		result = append(result, "Plang"...)
	}
	if div7 {
		result = append(result, "Plong"...)
	}

	return string(result)
}
