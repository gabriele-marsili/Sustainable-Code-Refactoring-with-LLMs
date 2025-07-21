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
	sounds := make([]byte, 0, 16)

	if num%3 == 0 {
		sounds = append(sounds, "Pling"...)
	}
	if num%5 == 0 {
		sounds = append(sounds, "Plang"...)
	}
	if num%7 == 0 {
		sounds = append(sounds, "Plong"...)
	}
	if len(sounds) == 0 {
		return strconv.Itoa(num)
	}
	return string(sounds)
}
