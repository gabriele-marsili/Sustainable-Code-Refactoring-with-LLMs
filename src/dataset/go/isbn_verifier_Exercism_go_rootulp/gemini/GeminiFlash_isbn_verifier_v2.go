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
		digit := isbn[i]
		if !unicode.IsDigit(rune(digit)) {
			return false
		}
		val := int(digit - '0')
		sum += val * (10 - i)
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