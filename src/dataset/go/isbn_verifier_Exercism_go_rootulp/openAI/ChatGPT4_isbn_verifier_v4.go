package isbn

import (
	"strconv"
	"unicode"
)

func IsValidISBN(isbn string) bool {
	withoutDashes := make([]rune, 0, 10)
	for _, r := range isbn {
		if r != '-' {
			withoutDashes = append(withoutDashes, r)
		}
	}
	if len(withoutDashes) != 10 || !isValidCheckDigit(withoutDashes) || !isValidPrefix(withoutDashes) {
		return false
	}
	return calculateSum(withoutDashes)%11 == 0
}

func calculateSum(isbn []rune) int {
	sum := 0
	for i, r := range isbn {
		value := 10
		if r != 'X' {
			value = int(r - '0')
		}
		sum += value * (10 - i)
	}
	return sum
}

func isValidCheckDigit(isbn []rune) bool {
	last := isbn[len(isbn)-1]
	return unicode.IsDigit(last) || last == 'X'
}

func isValidPrefix(isbn []rune) bool {
	for _, r := range isbn[:len(isbn)-1] {
		if !unicode.IsDigit(r) {
			return false
		}
	}
	return true
}