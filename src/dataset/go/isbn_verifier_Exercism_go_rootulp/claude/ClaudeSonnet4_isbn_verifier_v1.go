package isbn

import (
	"log"
)

func IsValidISBN(isbn string) bool {
	// Remove dashes in-place during validation
	cleaned := make([]byte, 0, len(isbn))
	for i := 0; i < len(isbn); i++ {
		if isbn[i] != '-' {
			cleaned = append(cleaned, isbn[i])
		}
	}
	
	if !isValidISBN(string(cleaned)) {
		return false
	}
	return sum(string(cleaned))%11 == 0
}

func sum(isbn string) (sum int) {
	for index := 0; index < len(isbn); index++ {
		value := valueForDigit(rune(isbn[index]))
		multiplier := 10 - index
		sum += value * multiplier
	}
	return sum
}

func valueForDigit(digit rune) int {
	if digit == 'X' {
		return 10
	}
	if digit >= '0' && digit <= '9' {
		return int(digit - '0')
	}
	log.Fatalf("failed to convert %v to int", digit)
	return 0
}

func isValidISBN(isbn string) bool {
	return isValidLength(isbn) && isValidCheckDigit(isbn) && isValidPrefix(isbn)
}

func isValidLength(isbn string) bool {
	return len(isbn) == 10
}

func isValidCheckDigit(isbn string) bool {
	if len(isbn) < 1 {
		return false
	}
	r := isbn[len(isbn)-1]
	return (r >= '0' && r <= '9') || r == 'X'
}

// Prefix in this context is the entire ISBN excluding the check digit
func isValidPrefix(isbn string) bool {
	for i := 0; i < len(isbn)-1; i++ {
		c := isbn[i]
		if c != '-' && (c < '0' || c > '9') {
			return false
		}
	}
	return true
}