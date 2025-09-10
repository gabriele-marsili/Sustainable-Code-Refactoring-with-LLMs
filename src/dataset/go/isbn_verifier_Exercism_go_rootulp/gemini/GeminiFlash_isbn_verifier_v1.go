package isbn

import (
	"unicode"
)

func IsValidISBN(isbn string) bool {
	isbn = removeDashes(isbn)
	if len(isbn) != 10 {
		return false
	}

	sum := 0
	for i := 0; i < 9; i++ {
		digit := isbn[i]
		if !unicode.IsDigit(rune(digit)) {
			return false
		}
		sum += int(digit-'0') * (10 - i)
	}

	lastDigit := isbn[9]
	if unicode.IsDigit(rune(lastDigit)) {
		sum += int(lastDigit-'0') * 1
	} else if lastDigit == 'X' {
		sum += 10
	} else {
		return false
	}

	return sum%11 == 0
}

func removeDashes(s string) string {
	n := 0
	for i := 0; i < len(s); i++ {
		if s[i] != '-' {
			s = s[:n] + string(s[i]) + s[n+1:]
			n++
		}
	}
	return s[:n]
}