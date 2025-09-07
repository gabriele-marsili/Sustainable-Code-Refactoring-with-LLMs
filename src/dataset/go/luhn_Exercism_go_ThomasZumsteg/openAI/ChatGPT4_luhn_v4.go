package luhn

import (
	"errors"
	"strconv"
	"unicode"
)

func Valid(code string) bool {
	t, err := checkSum(code)
	return err == nil && t%10 == 0
}

func AddCheck(code string) string {
	t, _ := checkSum(code + "0")
	finalDigit := byte('0' + (10-t%10)%10)
	if all(digitsAreFullWidth, code) {
		finalDigit += '０' - '0'
	}
	return code + string(finalDigit)
}

func all(condition func(rune) bool, items string) bool {
	for _, char := range items {
		if !condition(char) {
			return false
		}
	}
	return true
}

func digitsAreFullWidth(char rune) bool {
	return !unicode.IsDigit(char) || ('０' <= char && char <= '９')
}

func checkSum(code string) (int, error) {
	numDigits, total := 0, 0
	double := false
	for i := len(code) - 1; i >= 0; i-- {
		char := code[i]
		if char < '0' || char > '9' {
			continue
		}
		n := int(char - '0')
		if double {
			n *= 2
			if n > 9 {
				n -= 9
			}
		}
		total += n
		double = !double
		numDigits++
	}
	if numDigits == 0 {
		return 0, errors.New("There are no digits in \"" + code + "\"")
	}
	return total, nil
}