package luhn

import (
	"strconv"
	"strings"
)

// Valid returns whether the provided string represents a number that satisfies the Luhn algorithm.
func Valid(s string) bool {
	s = strings.ReplaceAll(s, " ", "")
	if len(s) <= 1 {
		return false
	}

	sum := 0
	double := false
	for i := len(s) - 1; i >= 0; i-- {
		digit := s[i] - '0'
		if digit < 0 || digit > 9 {
			return false
		}

		if double {
			digit *= 2
			if digit > 9 {
				digit -= 9
			}
		}
		sum += int(digit)
		double = !double
	}

	return sum%10 == 0
}