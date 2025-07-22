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
	var sounds [3]string
	var count int

	if num%3 == 0 {
		sounds[count] = "Pling"
		count++
	}
	if num%5 == 0 {
		sounds[count] = "Plang"
		count++
	}
	if num%7 == 0 {
		sounds[count] = "Plong"
		count++
	}

	if count == 0 {
		return strconv.Itoa(num)
	}

	// Pre-calculate total length to avoid reallocations
	totalLen := 0
	for i := 0; i < count; i++ {
		totalLen += len(sounds[i])
	}

	result := make([]byte, 0, totalLen)
	for i := 0; i < count; i++ {
		result = append(result, sounds[i]...)
	}

	return string(result)
}
