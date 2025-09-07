package luhn

import (
	"strconv"
	"strings"
)

func Valid(number string) bool {
	number = strings.ReplaceAll(number, " ", "")
	n := len(number)

	if n <= 1 {
		return false
	}

	sum := 0
	double := false
	for i := n - 1; i >= 0; i-- {
		digit := number[i] - '0'
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