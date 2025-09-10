package isbn

import (
	"strconv"
	"unicode"
)

func IsValidISBN(isbn string) bool {
	withoutDashes := removeDashes(isbn)
	return isValidISBN(withoutDashes) && calculateSum(withoutDashes)%11 == 0
}

func removeDashes(isbn string) string {
	var b strings.Builder
	b.Grow(len(isbn))
	for _, c := range isbn {
		if c != '-' {
			b.WriteRune(c)
		}
	}
	return b.String()
}

func calculateSum(isbn string) int {
	sum := 0
	for index, digit := range isbn {
		value := valueForDigit(digit)
		sum += value * (10 - index)
	}
	return sum
}

func valueForDigit(digit rune) int {
	if digit == 'X' {
		return 10
	}
	return int(digit - '0') // Avoids using strconv and error handling
}

func isValidISBN(isbn string) bool {
	return len(isbn) == 10 && isValidCheckDigit(isbn) && isValidPrefix(isbn)
}

func isValidCheckDigit(isbn string) bool {
	r := rune(isbn[len(isbn)-1])
	return unicode.IsDigit(r) || r == 'X'
}

func isValidPrefix(isbn string) bool {
	for _, c := range isbn[:len(isbn)-1] {
		if !unicode.IsDigit(c) {
			return false
		}
	}
	return true
}