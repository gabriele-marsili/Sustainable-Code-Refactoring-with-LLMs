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
	var b []byte
	if num%3 == 0 {
		b = append(b, "Pling"...)
	}
	if num%5 == 0 {
		b = append(b, "Plang"...)
	}
	if num%7 == 0 {
		b = append(b, "Plong"...)
	}
	if len(b) == 0 {
		return strconv.Itoa(num)
	}
	return string(b)
}
