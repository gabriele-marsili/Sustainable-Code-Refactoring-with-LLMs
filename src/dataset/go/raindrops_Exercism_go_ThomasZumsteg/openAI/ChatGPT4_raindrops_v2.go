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
	if num%3 == 0 && num%5 == 0 && num%7 == 0 {
		return "PlingPlangPlong"
	}
	if num%3 == 0 && num%5 == 0 {
		return "PlingPlang"
	}
	if num%3 == 0 && num%7 == 0 {
		return "PlingPlong"
	}
	if num%5 == 0 && num%7 == 0 {
		return "PlangPlong"
	}
	if num%3 == 0 {
		return "Pling"
	}
	if num%5 == 0 {
		return "Plang"
	}
	if num%7 == 0 {
		return "Plong"
	}
	return strconv.Itoa(num)
}
