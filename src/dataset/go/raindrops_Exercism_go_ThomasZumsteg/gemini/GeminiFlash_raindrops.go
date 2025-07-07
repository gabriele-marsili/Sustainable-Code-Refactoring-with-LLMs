package raindrops

import (
	"fmt"
	"strings"
)

// TestVersion the version of the tests to run
const TestVersion = 1

// rainSounds maps divisors to their corresponding sounds.
// This map is initialized once at package level for efficiency.
var rainSounds = map[int]string{
	3: "Pling",
	5: "Plang",
	7: "Plong",
}

/*
Convert converts a number to raindrop sounds.
Adds Pling if the number is divisible by 3.
Adds Plang if the number is divisible by 5.
Adds Plong if the number is divisible by 7.
Otherwise returns the number as a string.
*/
func Convert(num int) string {
	// Using strings.Builder for efficient string concatenation.
	var sb strings.Builder

	// Directly check for divisibility by 3, 5, and 7.
	// This approach is more efficient than iterating over a slice or map for a fixed, small set of rules.
	if num%3 == 0 {
		sb.WriteString(rainSounds[3])
	}
	if num%5 == 0 {
		sb.WriteString(rainSounds[5])
	}
	if num%7 == 0 {
		sb.WriteString(rainSounds[7])
	}

	// If no sounds were appended (i.e., the number is not divisible by 3, 5, or 7),
	// return the number as a string.
	if sb.Len() == 0 {
		return fmt.Sprintf("%d", num)
	}

	// Return the concatenated sounds.
	return sb.String()
}
