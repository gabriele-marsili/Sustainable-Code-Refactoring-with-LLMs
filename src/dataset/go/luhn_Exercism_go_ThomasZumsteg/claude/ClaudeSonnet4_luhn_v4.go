package luhn

import (
	"errors"
	"strconv"
)

func Valid(code string) bool {
	t, err := checkSum(code)
	return err == nil && t%10 == 0
}

func AddCheck(code string) string {
	t, _ := checkSum(code + "0")
	finalDigit := (10 - (t % 10)) % 10
	
	if allDigitsAreFullWidth(code) {
		return code + string(rune('０'+finalDigit))
	}
	return code + string(rune('0'+finalDigit))
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
	if char >= '０' && char <= '９' {
		return true
	}
	return char < '0' || char > '9'
}

func allDigitsAreFullWidth(code string) bool {
	for _, char := range code {
		if char >= '0' && char <= '9' {
			return false
		}
		if char < '０' || char > '９' {
			continue
		}
	}
	return true
}

func checkSum(code string) (int, error) {
	numDigits := 0
	total := 0
	
	for i := len(code) - 1; i >= 0; i-- {
		char := code[i]
		var n int
		
		if char >= '0' && char <= '9' {
			n = int(char - '0')
		} else if char >= '０' && char <= '９' {
			n = int(char - '０')
		} else {
			continue
		}
		
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