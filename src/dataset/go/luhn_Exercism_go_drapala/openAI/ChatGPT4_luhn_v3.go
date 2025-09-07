package luhn

import (
	"strconv"
	"unicode"
)

func Valid(number string) bool {
	clean := ""
	for _, r := range number {
		if r == ' ' {
			continue
		}
		if !unicode.IsDigit(r) {
			return false
		}
		clean += string(r)
	}

	if len(clean) <= 1 {
		return false
	}

	sum := 0
	double := false

	for i := len(clean) - 1; i >= 0; i-- {
		digit := int(clean[i] - '0')
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