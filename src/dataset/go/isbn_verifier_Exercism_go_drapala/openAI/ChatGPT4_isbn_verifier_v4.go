package isbn

import (
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
	for i, ch := range isbn[:9] {
		digit := int(ch - '0')
		sum += digit * (10 - i)
	}
	x10 := 10
	if isbn[9] != 'X' {
		x10 = int(isbn[9] - '0')
	}
	sum += x10
	return sum%11 == 0
}

func IsValidISBN(isbn string) bool {
	isbn = strings.ReplaceAll(isbn, "-", "")
	return ContainsAllValidChars(isbn) && ValidISBNLength(isbn) && ValidISBNChecksum(isbn)
}