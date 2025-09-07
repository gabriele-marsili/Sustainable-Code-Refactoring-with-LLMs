package luhn

import (
	"errors"
	"strconv"
	"unicode"
)

/*Valid determines if a luhn code is correct.*/
func Valid(code string) bool {
	sum, err := checkSum(code)
	return err == nil && sum%10 == 0
}

/*AddCheck creates a valid luhn code.*/
func AddCheck(code string) string {
	sum, _ := checkSum(code + "0")
	mod := sum % 10
	finalDigit := 0
	if mod != 0 {
		finalDigit = 10 - mod
	}

	finalDigitStr := strconv.Itoa(finalDigit)

	if allDigitsAreFullWidth(code) {
		finalDigitStr = string(rune(int(finalDigitStr[0]) + int('０') - '0'))
	}

	return code + finalDigitStr
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

func allDigitsAreFullWidth(s string) bool {
	for _, r := range s {
		if !digitsAreFullWidth(r) {
			return false
		}
	}
	return true
}

/*checkSum computes the check sum of a luhn code*/
func checkSum(code string) (int, error) {
	numDigits := 0
	total := 0
	runes := []rune(code)
	for i := len(runes) - 1; i >= 0; i-- {
		r := runes[i]
		if !unicode.IsDigit(r) {
			continue
		}

		n := int(r - '0')

		if numDigits%2 == 1 {
			n *= 2
			if n > 9 {
				n -= 9
			}
		}
		total += n
		numDigits++
	}

	if numDigits == 0 {
		return 0, errors.New("There are no digits in \"" + code + "\"")
	}

	return total, nil
}