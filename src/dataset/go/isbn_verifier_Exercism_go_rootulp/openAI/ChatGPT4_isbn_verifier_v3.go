package isbn

import (
	"strconv"
	"unicode"
)

func IsValidISBN(isbn string) bool {
	withoutDashes := strings.ReplaceAll(isbn, "-", "")
	return isValidISBN(withoutDashes) && calculateSum(withoutDashes)%11 == 0
}

func calculateSum(isbn string) int {
	sum := 0
	for index, digit := range isbn {
		value := 10
		if digit != 'X' {
			value = int(digit - '0')
		}
		sum += value * (10 - index)
	}
	return sum
}

func isValidISBN(isbn string) bool {
	return len(isbn) == 10 && isValidCheckDigit(isbn) && isValidPrefix(isbn)
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