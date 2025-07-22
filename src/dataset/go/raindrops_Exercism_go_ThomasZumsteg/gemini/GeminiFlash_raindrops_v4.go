package raindrops

import (
	"fmt"
	"strings"
)

// TestVersion the version of the tests to run
const TestVersion = 1

// Convert converts a number to raindrop sounds
// Adds Pling if the number is divisible by 3
//
//	Plang if the number is divisible by 5
//	Plong if the number is divisible by 7
//	Otherwise returns the number as a string
func Convert(num int) string {
	var sb strings.Builder
	if num%3 == 0 {
		sb.WriteString("Pling")
	}
	if num%5 == 0 {
		sb.WriteString("Plang")
	}
	if num%7 == 0 {
		sb.WriteString("Plong")
	}
	if sb.Len() == 0 {
		return fmt.Sprintf("%d", num)
	}
	return sb.String()
}
