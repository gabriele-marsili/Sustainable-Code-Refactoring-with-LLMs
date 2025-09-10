package isbn

import (
	"strconv"
	"unicode"
)

func IsValidISBN(isbn string) bool {
	withoutDashes := removeDashes(isbn)
	if len(withoutDashes) != 10 || !isValidCheckDigit(withoutDashes) || !isValidPrefix(withoutDashes) {
		return false
	}
	return calculateSum(withoutDashes)%11 == 0
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
	for i, digit := range isbn {
		value := 0
		if digit == 'X' {
			value = 10
		} else {
			value = int(digit - '0')
		}
		sum += value * (10 - i)
	}
	return sum
}

func isValidCheckDigit(isbn string) bool {
	lastChar := isbn[len(isbn)-1]
	return unicode.IsDigit(rune(lastChar)) || lastChar == 'X'
}

func isValidPrefix(isbn string) bool {
	for _, c := range isbn[:len(isbn)-1] {
		if !unicode.IsDigit(c) {
			return false
		}
	}
	return true
}