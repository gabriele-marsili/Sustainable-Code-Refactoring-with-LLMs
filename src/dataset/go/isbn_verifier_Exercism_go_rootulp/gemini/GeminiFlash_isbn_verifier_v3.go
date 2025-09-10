package isbn

import (
	"strconv"
	"strings"
	"unicode"
)

func IsValidISBN(isbn string) bool {
	isbn = strings.ReplaceAll(isbn, "-", "")
	if len(isbn) != 10 {
		return false
	}

	sum := 0
	for i := 0; i < 9; i++ {
		digit := rune(isbn[i])
		if !unicode.IsDigit(digit) {
			return false
		}
		value := int(digit - '0')
		sum += value * (10 - i)
	}

	lastDigit := rune(isbn[9])
	if unicode.IsDigit(lastDigit) {
		sum += int(lastDigit-'0') * 1
	} else if lastDigit == 'X' {
		sum += 10
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
	value, err := strconv.Atoi(string(digit))
	if err != nil {
		return -1
	}
	return value
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
	r := rune(isbn[len(isbn)-1])
	return unicode.IsDigit(r) || r == 'X'
}

// Prefix in this context is the entire ISBN excluding the check digit
func isValidPrefix(isbn string) bool {
	for _, c := range isbn[0 : len(isbn)-1] {
		if c != '-' && !unicode.IsDigit(c) {
			return false
		}
	}
	return true
}