package luhn

import (
	"strconv"
	"strings"
)

// Valid returns whether the provided string represents a number that satisfies the Luhn algorithm.
func Valid(s string) bool {
	s = strings.ReplaceAll(s, " ", "")
	n := len(s)
	if n <= 1 {
		return false
	}

	sum := 0
	double := false
	for i := n - 1; i >= 0; i-- {
		digit := s[i] - '0'
		if digit < 0 || digit > 9 {
			return false
		}

		num := int(digit)
		if double {
			num *= 2
			if num > 9 {
				num -= 9
			}
		}
		sum += num
		double = !double
	}

	return sum%10 == 0
}