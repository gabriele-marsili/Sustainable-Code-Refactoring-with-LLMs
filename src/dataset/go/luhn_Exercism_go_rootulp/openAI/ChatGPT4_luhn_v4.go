package luhn

import (
	"errors"
	"strconv"
)

// Valid returns whether the provided string represents a number that satisfies the Luhn algorithm.
func Valid(s string) bool {
	n := len(s)
	if n <= 1 {
		return false
	}

	sum, double := 0, false
	for i := n - 1; i >= 0; i-- {
		if s[i] == ' ' {
			continue
		}

		digit := int(s[i] - '0')
		if digit < 0 || digit > 9 {
			return false
		}

		if double {
			digit *= 2
			if digit > 9 {
				digit -= 9
			}
		}
		sum += digit
		double = !double
	}

	return sum%10 == 0
}

// checkSum returns the Luhn check sum of the provided string.
func checkSum(s string) (int, error) {
	n := len(s)
	sum, double := 0, false

	for i := n - 1; i >= 0; i-- {
		if s[i] == ' ' {
			continue
		}

		digit := int(s[i] - '0')
		if digit < 0 || digit > 9 {
			return 0, errors.New("Invalid digit")
		}

		if double {
			digit *= 2
			if digit > 9 {
				digit -= 9
			}
		}
		sum += digit
		double = !double
	}

	return sum, nil
}