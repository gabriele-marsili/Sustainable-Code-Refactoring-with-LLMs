package luhn

import (
	"strconv"
	"unicode"
)

// Valid determines if a luhn code is correct.
func Valid(code string) bool {
	sum, valid := checksum(code)
	return valid && sum%10 == 0
}

// AddCheck creates a valid luhn code.
func AddCheck(code string) string {
	sum := checksumAddend(code + "0")
	finalDigit := (10 - (sum % 10)) % 10
	finalDigitStr := strconv.Itoa(finalDigit)

	if allFullWidthDigits(code) {
		finalDigitStr = string(rune(int(finalDigitStr[0]) + int('０') - '0'))
	}
	return code + finalDigitStr
}

// allFullWidthDigits checks if all characters are full-width digits.
func allFullWidthDigits(s string) bool {
	for _, r := range s {
		if !isFullWidthDigit(r) {
			return false
		}
	}
	return true
}

// isFullWidthDigit checks if a rune is a full-width digit.
func isFullWidthDigit(r rune) bool {
	return unicode.IsDigit(r) && r >= '０' && r <= '９'
}

// checksum computes the checksum of a luhn code.
func checksum(code string) (int, bool) {
	sum := 0
	numDigits := 0
	for i := len(code) - 1; i >= 0; i-- {
		r := rune(code[i])
		if unicode.IsSpace(r) {
			continue
		}
		if !unicode.IsDigit(r) {
			return 0, false
		}

		digit := int(r - '0')
		if numDigits%2 == 1 {
			digit *= 2
			if digit > 9 {
				digit -= 9
			}
		}
		sum += digit
		numDigits++
	}

	return sum, numDigits > 0
}

// checksumAddend computes the checksum of a luhn code for AddCheck without validation.
func checksumAddend(code string) int {
	sum := 0
	numDigits := 0
	for i := len(code) - 1; i >= 0; i-- {
		r := rune(code[i])
		if !unicode.IsDigit(r) {
			continue // Skip non-digit characters
		}

		digit := int(r - '0')
		if numDigits%2 == 1 {
			digit *= 2
			if digit > 9 {
				digit -= 9
			}
		}
		sum += digit
		numDigits++
	}
	return sum
}