package isbn

import (
	"strconv"
	"strings"
)

func ContainsAllValidChars(isbn string) bool {
	for _, ch := range isbn {
		if (ch < '0' || ch > '9') && ch != 'X' {
			return false
		}
	}
	return true
}

func ValidISBNLength(isbn string) bool {
	return len(isbn) == 10
}

func ValidISBNChecksum(isbn string) bool {
	sum := 0
	for i := 0; i < 9; i++ {
		digit, err := strconv.Atoi(string(isbn[i]))
		if err != nil {
			return false
		}
		sum += digit * (10 - i)
	}

	x10 := 0
	if isbn[9] == 'X' {
		x10 = 10
	} else {
		digit, err := strconv.Atoi(string(isbn[9]))
		if err != nil {
			return false
		}
		x10 = digit
	}
	sum += x10

	return sum%11 == 0
}

func IsValidISBN(isbn string) bool {
	isbn = strings.ReplaceAll(isbn, "-", "")
	return ContainsAllValidChars(isbn) && ValidISBNLength(isbn) && ValidISBNChecksum(isbn)
}