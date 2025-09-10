package isbn

import (
	"strconv"
	"strings"
)

func IsValidISBN(isbn string) bool {
	isbn = strings.ReplaceAll(isbn, "-", "")
	if len(isbn) != 10 {
		return false
	}

	sum := 0
	for i := 0; i < 9; i++ {
		digit := isbn[i]
		if digit < '0' || digit > '9' {
			return false
		}
		sum += int(digit-'0') * (10 - i)
	}

	lastDigit := isbn[9]
	var lastValue int
	if lastDigit == 'X' {
		lastValue = 10
	} else if lastDigit >= '0' && lastDigit <= '9' {
		lastValue = int(lastDigit - '0')
	} else {
		return false
	}

	sum += lastValue
	return sum%11 == 0
}