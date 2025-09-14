package isbn

import (
	"strconv"
	"strings"
)

func IsValidISBN(isbn string) bool {
	withoutDashes := strings.ReplaceAll(isbn, "-", "")
	if len(withoutDashes) != 10 {
		return false
	}
	
	sum := 0
	for i := 0; i < 9; i++ {
		c := withoutDashes[i]
		if c < '0' || c > '9' {
			return false
		}
		sum += int(c-'0') * (10 - i)
	}
	
	lastChar := withoutDashes[9]
	if lastChar == 'X' {
		sum += 10
	} else if lastChar >= '0' && lastChar <= '9' {
		sum += int(lastChar-'0')
	} else {
		return false
	}
	
	return sum%11 == 0
}

func sum(isbn string) (sum int) {
	for index, digit := range isbn {
		value := valueForDigit(digit)
		multiplier := 10 - index
		sum += value * multiplier
	}
	return sum
}

func valueForDigit(digit rune) int {
	if digit == 'X' {
		return 10
	}
	if digit >= '0' && digit <= '9' {
		return int(digit - '0')
	}
	return 0
}

func isValidISBN(isbn string) bool {
	return isValidLength(isbn) && isValidCheckDigit(isbn) && isValidPrefix(isbn)
}

func isValidLength(isbn string) bool {
	return len(isbn) == 10
}

func isValidCheckDigit(isbn string) bool {
	if len(isbn) < 1 {
		return false
	}
	r := isbn[len(isbn)-1]
	return (r >= '0' && r <= '9') || r == 'X'
}

func isValidPrefix(isbn string) bool {
	for i := 0; i < len(isbn)-1; i++ {
		c := isbn[i]
		if c != '-' && (c < '0' || c > '9') {
			return false
		}
	}
	return true
}