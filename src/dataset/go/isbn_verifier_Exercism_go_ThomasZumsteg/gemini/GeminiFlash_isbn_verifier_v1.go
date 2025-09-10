package isbn

import "unicode"

func IsValidISBN(isbn string) bool {
	isbn = removeHyphens(isbn)
	if len(isbn) != 10 {
		return false
	}

	checksum := 0
	for i, r := range isbn {
		digit := 0
		switch {
		case unicode.IsDigit(r):
			digit = int(r - '0')
		case r == 'X' && i == 9:
			digit = 10
		default:
			return false
		}
		checksum += digit * (10 - i)
	}

	return checksum%11 == 0
}

func removeHyphens(s string) string {
	b := make([]byte, 0, len(s))
	for i := range s {
		if s[i] != '-' {
			b = append(b, s[i])
		}
	}
	return string(b)
}