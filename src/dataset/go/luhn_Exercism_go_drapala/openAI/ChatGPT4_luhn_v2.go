package luhn

import (
	"strings"
	"unicode"
)

func Valid(number string) bool {
	// Remove spaces and validate input
	clean := strings.ReplaceAll(number, " ", "")
	if len(clean) <= 1 {
		return false
	}

	sum := 0
	double := false

	// Process digits from right to left
	for i := len(clean) - 1; i >= 0; i-- {
		r := clean[i]
		if !unicode.IsDigit(rune(r)) {
			return false
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

	return sum%10 == 0
}