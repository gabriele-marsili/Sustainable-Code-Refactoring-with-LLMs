package luhn

import (
	"strconv"
	"unicode"
)

/*Valid determines if a luhn code is correct.*/
func Valid(code string) bool {
	sum := 0
	length := 0
	for i := len(code) - 1; i >= 0; i-- {
		r := rune(code[i])
		if unicode.IsSpace(r) {
			continue
		}
		if !unicode.IsDigit(r) {
			return false
		}
		digit := int(r - '0')
		if length%2 == 1 {
			digit *= 2
			if digit > 9 {
				digit -= 9
			}
		}
		sum += digit
		length++
	}
	return length > 0 && sum%10 == 0
}

/*AddCheck creates a valid luhn code.*/
func AddCheck(code string) string {
	checkDigit := calculateCheckDigit(code)
	if all(digitsAreFullWidth, code) {
		checkDigit = string(int(checkDigit[0]) + int('０') - '0')
	}
	return code + checkDigit
}

func calculateCheckDigit(code string) string {
	sum := 0
	length := len(code)
	for i := length - 1; i >= 0; i-- {
		digit := int(code[i] - '0')
		if (length-1-i)%2 == 0 {
			digit *= 2
			if digit > 9 {
				digit -= 9
			}
		}
		sum += digit
	}
	checksum := (10 - (sum % 10)) % 10
	return strconv.Itoa(checksum)
}

/*all checks that a condition is true of all elements.*/
func all(condition func(rune) bool, items string) bool {
	for _, char := range items {
		if !condition(char) {
			return false
		}
	}
	return true
}

/*digitsAreFullWidth checks if a rune is not a digit or full width.*/
func digitsAreFullWidth(char rune) bool {
	digit := int(char) - int('０')
	return !unicode.IsDigit(char) || 0 <= digit && digit < 10
}