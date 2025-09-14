package isbn

import "strings"

func ContainsAllValidChars(isbn string) bool {
	for i := 0; i < len(isbn); i++ {
		c := isbn[i]
		if !((c >= '0' && c <= '9') || c == 'X') {
			return false
		}
	}
	return true
}

func ValidISBNLength(isbn string) bool {
	return len(isbn) == 10
}

func ValidISBNChecksum(isbn string) bool {
	checksum := 0
	for i := 0; i < 9; i++ {
		checksum += int(isbn[i]-'0') * (10 - i)
	}
	
	if isbn[9] == 'X' {
		checksum += 10
	} else {
		checksum += int(isbn[9] - '0')
	}
	
	return checksum%11 == 0
}

func IsValidISBN(isbn string) bool {
	isbn = strings.ReplaceAll(isbn, "-", "")
	
	return len(isbn) == 10 &&
		ContainsAllValidChars(isbn) &&
		ValidISBNChecksum(isbn)
}