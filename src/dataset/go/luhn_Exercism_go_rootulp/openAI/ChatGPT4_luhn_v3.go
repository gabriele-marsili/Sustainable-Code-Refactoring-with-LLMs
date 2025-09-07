package luhn

import (
	"strconv"
	"unicode"
)

// Valid returns whether the provided string represents a number that satisfies the Luhn algorithm.
func Valid(s string) bool {
	s = removeSpaces(s)
	if len(s) <= 1 {
		return false
	}
	checkDigit, err := checkSum(s)
	if err != nil {
		return false
	}
	return checkDigit%10 == 0
}

// checkSum returns the Luhn check sum of the provided string.
func checkSum(s string) (int, error) {
	sum := 0
	double := false
	for i := len(s) - 1; i >= 0; i-- {
		r := s[i]
		if !unicode.IsDigit(rune(r)) {
			return 0, strconv.ErrSyntax
		}
		digit := int(r - '0')
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

// removeSpaces removes all spaces from a string.
func removeSpaces(s string) string {
	var b []byte
	for i := 0; i < len(s); i++ {
		if s[i] != ' ' {
			b = append(b, s[i])
		}
	}
	return string(b)
}