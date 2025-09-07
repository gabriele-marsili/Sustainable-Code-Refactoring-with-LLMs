package luhn

import (
	"errors"
	"strconv"
	"unicode"
)

/*Valid determines if a luhn code is correct.*/
func Valid(code string) bool {
	t, err := checkSum(code)
	return err == nil && t%10 == 0
}

/*AddCheck creates a valid luhn code.*/
func AddCheck(code string) string {
	t, _ := checkSum(code + "0")
	finalDigit := (10 - (t % 10)) % 10
	
	if all(digitsAreFullWidth, code) {
		// Added digit should be full width if all the others are
		return code + string(rune(finalDigit + int('０')))
	}
	return code + string(rune(finalDigit + '0'))
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
	if !unicode.IsDigit(char) {
		return true
	}
	digit := int(char) - int('０')
	return 0 <= digit && digit < 10
}

/*checkSum computes the check sum of a luhn code*/
func checkSum(code string) (int, error) {
	numDigits := 0
	total := 0
	for i := len(code) - 1; i >= 0; i-- {
		char := code[i]
		if char < '0' || char > '9' {
			continue
		}
		n := int(char - '0')
		if numDigits%2 == 0 {
			total += n
		} else {
			doubled := n << 1
			if doubled > 9 {
				doubled -= 9
			}
			total += doubled
		}
		numDigits++
	}
	if numDigits <= 0 {
		return 0, errors.New("There are no digits in \"" + code + "\"")
	}
	return total, nil
}